import { create } from 'zustand';
import { format } from 'date-fns';

export interface TodoInterface {
  id: number;
  content: string;
  dueDate: string;
  category: 'IMPORTANT' | 'STUDY' | 'MEETING';
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  // state 목록
  todos: TodoInterface[];
  selectedDate: string;
  isAscending: boolean; // 오름차순&내림차순 상태

  // 액션함수
  setTodos: (todo: TodoInterface[]) => void;
  setSelectedDate: (date: string) => void;
  toggleSortOrder: () => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  selectedDate: format(new Date(), 'yyyy-MM-dd'), // 초기값은 오늘로 설정해서 DateSection에서 맨 왼쪽이 활성화되도록
  isAscending: false, // 기본값: 최신순

  // API 데이터 fetch 후 저장
  // setTodos: (todos) => set({
  //   todos: todos,
  // })
  // 를 아래와 같이 축약 가능 (key와 value의 이름이 같으면 축약 가능)
  setTodos: (todos) => set({ todos }),

  // 날짜 선택 시 정렬 순서를 강제로 최신순(false)으로 초기화
  // 여기서 selectedDate는 포맷팅 안되어 있음!
  setSelectedDate: (date) => set({ selectedDate: date, isAscending: false }),

  // 정렬 버튼 클릭 시 오름차순/내림차순 토글
  toggleSortOrder: () => set((store) => ({ isAscending: !store.isAscending })),
}));

// 커스텀 훅 설정
// 컴포넌트에서 커스텀 훅을 사용하면 좋은 점? -> 스토어 내부가 바뀌었을때 스토어 내부만 수정하면 됨

// setTodos 커스텀 훅
export const useSetTodos = () => {
  const setTodos = useTodoStore((store) => store.setTodos);
  return setTodos;
};

// setSelectedDate 커스텀 훅
export const useSetSelectedDate = () => {
  const setSelectedDate = useTodoStore((store) => store.setSelectedDate);
  return setSelectedDate;
};

// isAscending 커스텀 훅
export const useIsAscending = () => {
  const isAscending = useTodoStore((store) => store.isAscending);
  return isAscending;
};

// toggleSortOrder 커스텀 훅
export const useToggleSortOrder = () => {
  const toggleSortOrder = useTodoStore((store) => store.toggleSortOrder);
  return toggleSortOrder;
};

// todos 커스텀 훅
export const useTodos = () => {
  const todos = useTodoStore((store) => store.todos);
  return todos;
};

// selectedDate 커스텀 훅 (YYYY-MM-DD 형식으로 포맷팅 후 반환)
export const useSelectedDate = () => {
  const rawSelectedDate = useTodoStore((store) => store.selectedDate);
  const selectedDate = rawSelectedDate.split('T')[0]; // ex) 2026-04-06
  return selectedDate;
};
