import { z } from "zod";
import { TaskFormSchema } from "./validations";

export type TaskFormValues = z.infer<typeof TaskFormSchema>