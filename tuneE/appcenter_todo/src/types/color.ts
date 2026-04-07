export type Category = 'text' | 'brand' | 'stroke' | 'bg';
type Priority = 'primary' | 'secondary' | 'color';
type CategoryPriority = `${Category}-${Priority}`;
type ColCategoryPriorityColor =
  | '#171717'
  | '#8B8B8B'
  | '#7975E6'
  | '#D9D9D9'
  | '#FDFDFD';

// 카테고리 및 우선순위 별 색상표
export const color: Partial<
  Record<CategoryPriority, ColCategoryPriorityColor>
> = {
  'text-primary': '#171717',
  'text-secondary': '#8B8B8B',
  'brand-color': '#7975E6',
  'stroke-primary': '#D9D9D9',
  'bg-primary': '#FDFDFD',
};

type TodoContentColor = '#D65A5E' | '#8ECA89' | '#F7E096';
export type TodoContentCategory = 'IMPORTANT' | 'MEETING' | 'STUDY';

// 할일 색상표
export const todoColor: Record<TodoContentCategory, TodoContentColor> = {
  IMPORTANT: '#D65A5E',
  MEETING: '#8ECA89',
  STUDY: '#F7E096',
};
