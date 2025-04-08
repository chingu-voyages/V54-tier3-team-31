'use server'

import {
    GoogleGenerativeAI,
    GenerateContentResult,
    Part,
    SchemaType,
    GenerationConfig, // Import GenerationConfig type
    ArraySchema       // Import specific ArraySchema type
} from "@google/generative-ai";
import fs from "node:fs";
import mime from "mime-types";
import { GoalWithTasks } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

type GeminiResponseSchema = GoalWithTasks[];

// Define the schema structure explicitly matching the SDK's expected types
const goalResponseSchema: ArraySchema = {
    type: SchemaType.ARRAY, // Use SchemaType.ARRAY
    description: "A list of goals, each potentially including associated tasks.",
    items: {
      type: SchemaType.OBJECT, // Use SchemaType.OBJECT
      description: "Represents a goal with its associated tasks.",
      properties: {
        id: { type: SchemaType.NUMBER, description: "Unique identifier for the goal." }, // Use SchemaType.NUMBER
        name: { type: SchemaType.STRING, description: "Name of the goal." }, // Use SchemaType.STRING
        description: { type: SchemaType.STRING, nullable: true, description: "Optional description of the goal." }, // Use SchemaType.STRING
        bestTimeTitle: { type: SchemaType.STRING, nullable: true, description: "Optional title for the best time to work on the goal." }, // Use SchemaType.STRING
        bestTimeDescription: { type: SchemaType.STRING, nullable: true, description: "Optional description for the best time to work on the goal." }, // Use SchemaType.STRING
        createdAt: { type: SchemaType.STRING, description: "Timestamp when the goal was created (ISO 8601 format)." }, // Use SchemaType.STRING
        updatedAt: { type: SchemaType.STRING, description: "Timestamp when the goal was last updated (ISO 8601 format)." }, // Use SchemaType.STRING
        startDate: { type: SchemaType.STRING, nullable: true, description: "Optional start date for the goal (ISO 8601 format)." }, // Use SchemaType.STRING
        endDate: { type: SchemaType.STRING, nullable: true, description: "Optional end date for the goal (ISO 8601 format)." }, // Use SchemaType.STRING
        frequency: { type: SchemaType.STRING, nullable: true, description: "Optional frequency for the goal (e.g., daily, weekly)." }, // Use SchemaType.STRING
        userId: { type: SchemaType.STRING, description: "Identifier of the user who owns the goal." }, // Use SchemaType.STRING
        tasks: {
          type: SchemaType.ARRAY, // Use SchemaType.ARRAY
          description: "A list of tasks associated with this goal.",
          items: {
            type: SchemaType.OBJECT, // Use SchemaType.OBJECT
            description: "Represents a task.",
            properties: {
              id: { type: SchemaType.NUMBER, description: "Unique identifier for the task." }, // Use SchemaType.NUMBER
              title: { type: SchemaType.STRING, description: "Title of the task." }, // Use SchemaType.STRING
              difficulty: { type: SchemaType.STRING, nullable: true, description: "Optional difficulty level (e.g., Simpler, Medium, Hard)." }, // Use SchemaType.STRING
              goalId: { type: SchemaType.NUMBER, nullable: true, description: "Identifier of the goal this task belongs to (null if it's a plan task)." }, // Use SchemaType.NUMBER
              userId: { type: SchemaType.STRING, description: "Identifier of the user who owns the task." }, // Use SchemaType.STRING
              frequency: { type: SchemaType.STRING, nullable: true, description: "Optional frequency for the task." }, // Use SchemaType.STRING
              duration: { type: SchemaType.STRING, nullable: true, description: "Optional estimated duration for the task (e.g., 5 mins)." }, // Use SchemaType.STRING
              createdAt: { type: SchemaType.STRING, description: "Timestamp when the task was created (ISO 8601 format)." }, // Use SchemaType.STRING
              updatedAt: { type: SchemaType.STRING, description: "Timestamp when the task was last updated (ISO 8601 format)." }, // Use SchemaType.STRING
              completed: { type: SchemaType.BOOLEAN, description: "Whether the task is completed." }, // Use SchemaType.BOOLEAN
              completedAt: { type: SchemaType.STRING, nullable: true, description: "Timestamp when the task was completed (ISO 8601 format), null if not completed." }, // Use SchemaType.STRING
              description: { type: SchemaType.STRING, nullable: true, description: "Optional description of the task." }, // Use SchemaType.STRING
              isInFocus: { type: SchemaType.BOOLEAN, description: "Whether the task is currently marked as 'in focus'." } // Use SchemaType.BOOLEAN
            },
            required: ["id", "title", "userId", "createdAt", "updatedAt", "completed", "isInFocus"]
          }
        }
      },
      required: ["id", "name", "createdAt", "updatedAt", "userId", "tasks"]
    }
};


const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: "You are an AI assistant designed to help users set meaningful goals and break them down into actionable tasks based on their self-described personality, lifestyle, and habits.\n\nYour task is to analyze the user's input description and generate exactly two distinct goal suggestions, each accompanied by relevant tasks.\n\nThe output MUST be a JSON array containing exactly two objects. Each object in the array must strictly adhere to the `GoalWithTasks` structure:\n\n1.  **Goal Object:** Contains fields like `id`, `name`, `description`, `userId`, `createdAt`, `updatedAt`, and other optional fields defined in the `Goal` schema. The `name` and `description` should reflect a relevant goal derived from the user's input. Assign placeholder IDs (e.g., 1, 2) and use the current date/time for timestamps. `userId` should be a placeholder like \"user_placeholder\".\n2.  **Tasks Array:** Contains an array of `Task` objects associated with the goal. Each task object must include fields like `id`, `title`, `goalId` (matching the parent goal's ID), `userId` (matching the parent goal's `userId`), `createdAt`, `updatedAt`, `completed` (default to `false`), `isInFocus` (default to `false`), and other optional fields like `description`, `difficulty`, `frequency`, `duration`. The task `title` should represent a specific, actionable step towards achieving the parent goal. Assign sequential placeholder IDs for tasks within each goal (e.g., 101, 102 for goal 1; 201, 202 for goal 2).\n\nGenerate goals and tasks that are directly relevant to the user's provided description. Ensure the output is valid JSON conforming to the specified structure. Do not include any explanatory text outside the JSON structure.",
});

// Explicitly type generationConfig
const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: goalResponseSchema, // Assign the typed schema here
};

export async function generateGoalsFromInput(userInput: string): Promise<GeminiResponseSchema> {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Type the result as GenerateContentResult
    const result: GenerateContentResult = await chatSession.sendMessage(userInput);

    // Access the response object from the result
    const response = result.response;

    // --- Handling potential inline data ---
    // Type candidates as Candidate[] | undefined
    const candidates  = response.candidates; // Changed from Candidate
    if (candidates) {
      for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
        const candidate = candidates[candidate_index];
        // Access content safely
        if (candidate?.content?.parts) {
            for (let part_index = 0; part_index < candidate.content.parts.length; part_index++) {
                const part: Part = candidate.content.parts[part_index];
                if (part.inlineData?.data && part.inlineData?.mimeType) {
                    try {
                        const extension = mime.extension(part.inlineData.mimeType) || 'bin';
                        const filename = `output_${candidate_index}_${part_index}.${extension}`;
                        const outputDir = './outputs';
                        if (!fs.existsSync(outputDir)){
                            fs.mkdirSync(outputDir, { recursive: true });
                        }
                        fs.writeFileSync(`${outputDir}/${filename}`, Buffer.from(part.inlineData.data, 'base64'));
                        console.log(`Output written to: ${outputDir}/${filename}`);
                    } catch (err: unknown) {
                        console.error("Error writing inline data to file:", err instanceof Error ? err.message : err);
                    }
                }
            }
        }
      }
    }
    // --- End of inline data handling ---

    // Get text from the response object
    const responseText = response.text();
    const parsedResponse: GeminiResponseSchema = JSON.parse(responseText);
    revalidatePath("/plans")
    return parsedResponse;

  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error instanceof Error ? error.message : error);
    throw new Error("Failed to generate goals from input.");
  }
}

// Define schema for simplified task response
const simplifiedTaskSchema: ArraySchema = {
    type: SchemaType.ARRAY,
    description: "A list of simplified versions of the task.",
    items: {
        type: SchemaType.OBJECT,
        description: "A simplified version of the task.",
        properties: {
            title: { type: SchemaType.STRING, description: "Simplified version of the task title." },
            description: { type: SchemaType.STRING, nullable: true, description: "Optional description of the simplified task." },
            difficulty: { type: SchemaType.STRING, description: "Difficulty level of the simplified task (Simpler, Medium, Hard)." }
        },
        required: ["title", "difficulty"]
    }
};

// Create a new model instance for task simplification
const taskSimplificationModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: "You are an AI assistant designed to help users break down complex tasks into simpler, more manageable steps.\n\nYour task is to analyze the user's task and generate exactly one simplified version of it.\n\nThe output MUST be a JSON array containing exactly one object with the following structure:\n\n1. title: A simpler version of the task\n2. description: An optional description explaining how this version is simpler\n3. difficulty: The difficulty level (Simpler, Medium, Hard)\n\nGenerate a version that is genuinely simpler and more manageable than the original task.",
});

// Explicitly type generationConfig for task simplification
const taskSimplificationConfig: GenerationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
    responseMimeType: "application/json",
    responseSchema: simplifiedTaskSchema,
};

export async function simplifyTask(taskTitle: string): Promise<{ title: string; description?: string; difficulty: string }> {
    try {
        const chatSession = taskSimplificationModel.startChat({
            generationConfig: taskSimplificationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(`Simplify this task: ${taskTitle}`);
        const response = result.response;
        const responseText = response.text();
        const parsedResponse = JSON.parse(responseText);
        
        if (Array.isArray(parsedResponse) && parsedResponse.length > 0) {
            return parsedResponse[0];
        }
        
        throw new Error("Invalid response format from Gemini API");
    } catch (error) {
        console.error("Error simplifying task:", error);
        throw new Error("Failed to simplify task.");
    }
}