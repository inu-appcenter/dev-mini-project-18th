type Category = "text" | "brand" | "stroke" | "bg";
type Priority = "primary" | "secondary" | "color";
type CategoryPriority = `${Category}-${Priority}`;
type ColCategoryPriorityColor =
  | "#171717"
  | "#8B8B8B"
  | "#7975E6"
  | "#D9D9D9"
  | "#FDFDFD";

// 카테고리 및 우선순위 별 색상표
export const color: Partial<
  Record<CategoryPriority, ColCategoryPriorityColor>
> = {
  "text-primary": "#171717",
  "text-secondary": "#8B8B8B",
  "brand-color": "#7975E6",
  "stroke-primary": "#D9D9D9",
  "bg-primary": "#FDFDFD",
};

type TodoContentColor = "#D65A5E" | "#8ECA89" | "#F7E096";
type TodoContentCategory = "ImportantThing" | "Meeting" | "Study";

// 할일 색상표
export const todoColor: Record<TodoContentCategory, TodoContentColor> = {
  ImportantThing: "#D65A5E",
  Meeting: "#8ECA89",
  Study: "#F7E096",
};
