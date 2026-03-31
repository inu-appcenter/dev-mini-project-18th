export interface TestData {
  id: number;
  title: string;
  date: Date;
  category: "중요한 일" | "스터디" | "회의";
  isCompleted: boolean;
}

// 임시 더미 데이터
export const testData: TestData[] = [
  {
    id: 1,
    title: "중요한 일",
    date: new Date(),
    category: "중요한 일",
    isCompleted: false,
  },
  {
    id: 2,
    title: "회의가 있어요",
    date: new Date(),
    category: "회의",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Basic 스터디 참관하기",
    date: new Date(),
    category: "스터디",
    isCompleted: false,
  },
  {
    id: 4,
    title: "일정",
    date: new Date(),
    category: "스터디",
    isCompleted: false,
  },
];
