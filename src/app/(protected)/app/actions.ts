'use server'

import { GoogleGenAI, Type } from "@google/genai";
import { GoalWithTasks } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

type GeminiResponseSchema = GoalWithTasks[];

// Define the schema structure using the new Type enum
const goalResponseSchema = {
    type: Type.ARRAY,
    description: "A list of goals, each potentially including associated tasks.",
    items: {
      type: Type.OBJECT,
      description: "Represents a goal with its associated tasks.",
      properties: {
        id: { type: Type.NUMBER, description: "Unique identifier for the goal." },
        name: { type: Type.STRING, description: "Name of the goal." },
        description: { type: Type.STRING, nullable: true, description: "Optional description of the goal." },
        bestTimeTitle: { type: Type.STRING, nullable: true, description: "Optional title for the best time to work on the goal." },
        bestTimeDescription: { type: Type.STRING, nullable: true, description: "Optional description for the best time to work on the goal." },
        createdAt: { type: Type.STRING, description: "Timestamp when the goal was created (ISO 8601 format)." },
        updatedAt: { type: Type.STRING, description: "Timestamp when the goal was last updated (ISO 8601 format)." },
        startDate: { type: Type.STRING, nullable: true, description: "Optional start date for the goal (ISO 8601 format)." },
        endDate: { type: Type.STRING, nullable: true, description: "Optional end date for the goal (ISO 8601 format)." },
        frequency: { type: Type.STRING, nullable: true, description: "Optional frequency for the goal (e.g., daily, weekly)." },
        userId: { type: Type.STRING, description: "Identifier of the user who owns the goal." },
        tasks: {
          type: Type.ARRAY,
          description: "A list of tasks associated with this goal.",
          items: {
            type: Type.OBJECT,
            description: "Represents a task.",
            properties: {
              id: { type: Type.NUMBER, description: "Unique identifier for the task." },
              title: { type: Type.STRING, description: "Title of the task." },
              difficulty: { type: Type.STRING, nullable: true, description: "Optional difficulty level (e.g., Simpler, Medium, Hard)." },
              goalId: { type: Type.NUMBER, nullable: true, description: "Identifier of the goal this task belongs to (null if it's a plan task)." },
              userId: { type: Type.STRING, description: "Identifier of the user who owns the task." },
              frequency: { type: Type.STRING, nullable: true, description: "Optional frequency for the task." },
              duration: { type: Type.STRING, nullable: true, description: "Optional estimated duration for the task (e.g., 5 mins)." },
              createdAt: { type: Type.STRING, description: "Timestamp when the task was created (ISO 8601 format)." },
              updatedAt: { type: Type.STRING, description: "Timestamp when the task was last updated (ISO 8601 format)." },
              completed: { type: Type.BOOLEAN, description: "Whether the task is completed." },
              completedAt: { type: Type.STRING, nullable: true, description: "Timestamp when the task was completed (ISO 8601 format), null if not completed." },
              description: { type: Type.STRING, nullable: true, description: "Optional description of the task." },
              isInFocus: { type: Type.BOOLEAN, description: "Whether the task is currently marked as 'in focus'." }
            },
            required: ["id", "title", "userId", "createdAt", "updatedAt", "completed", "isInFocus"]
          }
        }
      },
      required: ["id", "name", "createdAt", "updatedAt", "userId", "tasks"]
    }
};

const systemInstruction = "You are an AI assistant designed to help users set meaningful goals and break them down into actionable tasks based on their self-described personality, lifestyle, and habits.\n\nYour task is to analyze the user's input description and generate exactly two distinct goal suggestions, each accompanied by relevant tasks.\n\nThe output MUST be a JSON array containing exactly two objects. Each object in the array must strictly adhere to the `GoalWithTasks` structure:\n\n1.  **Goal Object:** Contains fields like `id`, `name`, `description`, `userId`, `createdAt`, `updatedAt`, and other optional fields defined in the `Goal` schema. The `name` and `description` should reflect a relevant goal derived from the user's input. Assign placeholder IDs (e.g., 1, 2) and use the current date/time for timestamps. `userId` should be a placeholder like \"user_placeholder\".\n2.  **Tasks Array:** Contains an array of `Task` objects associated with the goal. Each task object must include fields like `id`, `title`, `goalId` (matching the parent goal's ID), `userId` (matching the parent goal's `userId`), `createdAt`, `updatedAt`, `completed` (default to `false`), `isInFocus` (default to `false`), and other optional fields like `description`, `difficulty`, `frequency`, `duration`. The task `title` should represent a specific, actionable step towards achieving the parent goal. Assign sequential placeholder IDs for tasks within each goal (e.g., 101, 102 for goal 1; 201, 202 for goal 2).\n\nGenerate goals and tasks that are directly relevant to the user's provided description. Ensure the output is valid JSON conforming to the specified structure. Do not include any explanatory text outside the JSON structure.";

export async function generateGoalsFromInput(userInput: string): Promise<GeminiResponseSchema> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userInput,
      config: {
        systemInstruction,
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: goalResponseSchema,
      },
    });

    const responseText = response.text || '[]';
    const parsedResponse: GeminiResponseSchema = JSON.parse(responseText);
    revalidatePath("/plans")
    return parsedResponse;

  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error instanceof Error ? error.message : error);
    throw new Error("Failed to generate goals from input.");
  }
}

// Define schema for simplified task response
const simplifiedTaskSchema = {
    type: Type.ARRAY,
    description: "A list of simplified versions of the task.",
    items: {
        type: Type.OBJECT,
        description: "A simplified version of the task.",
        properties: {
            title: { type: Type.STRING, description: "Simplified version of the task title." },
            description: { type: Type.STRING, nullable: true, description: "Optional description of the simplified task." },
            difficulty: { type: Type.STRING, description: "Difficulty level of the simplified task (Simpler, Medium, Hard)." }
        },
        required: ["title", "difficulty"]
    }
};

const taskSimplificationInstruction = "You are an AI assistant designed to help users break down complex tasks into simpler, more manageable steps.\n\nYour task is to analyze the user's task and generate exactly one simplified version of it.\n\nThe output MUST be a JSON array containing exactly one object with the following structure:\n\n1. title: A simpler version of the task\n2. description: An optional description explaining how this version is simpler\n3. difficulty: The difficulty level (Simpler, Medium, Hard)\n\nGenerate a version that is genuinely simpler and more manageable than the original task.";

export async function simplifyTask(taskTitle: string): Promise<{ title: string; description?: string; difficulty: string }> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Simplify this task: ${taskTitle}`,
            config: {
                systemInstruction: taskSimplificationInstruction,
                temperature: 0.7,
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 1024,
                responseMimeType: "application/json",
                responseSchema: simplifiedTaskSchema,
            },
        });

        const responseText = response.text || '[]';
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
