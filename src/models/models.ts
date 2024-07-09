export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
  deadline?: string;
  priority?: "low" | "medium" | "high"; // Only allow these specific strings
}
