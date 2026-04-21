import { z } from "zod";
import dayjs from "@constants/Date";
import { DateFormat1 } from "@/constants/Date";

const TodoSchema = z.object({
    id: z.number(),
    content: z.string(),
    dueDate: z.iso.date().transform((v) => dayjs(v, DateFormat1, true)),
    category: z.enum(["IMPORTANT", "MEETING", "STUDY"]),
    completed: z.boolean(),
    createdAt: z.string().transform((v) => dayjs(v)),
});

export type TodoI = z.infer<typeof TodoSchema>;

export const TodoRawSchema = TodoSchema.safeExtend({
    updatedAt: z.string(),
});

export const TodoRawArySchema = z.array(TodoRawSchema);
export type TodoRawI = z.infer<typeof TodoRawSchema>;
