// API 명세서

// TodoRequestDto
// {
//   "content": "string",
//   "dueDate": "2026-04-04",
//   "category": "string",
//   "completed": true
// }

// TodoResponseDto
// {
//   "id": 9007199254740991,
//   "content": "string",
//   "dueDate": "2026-04-04",
//   "category": "string",
//   "completed": true,
//   "createdAt": "2026-04-04T16:03:34.418Z",
//   "updatedAt": "2026-04-04T16:03:34.418Z"
// }

export interface TodoRequestDto {
  content: string;
  dueDate: string;
  category: 'IMPORTANT' | 'STUDY' | 'MEETING';
  completed: boolean;
}

export interface TodoResponseDto {
  id: number;
  content: string;
  category: 'IMPORTANT' | 'STUDY' | 'MEETING';
  dueDate: string; // dueDate = 하기로 한 날
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const testData: TodoResponseDto[] = [
  {
    id: 1,
    content: '중요한 일',
    category: 'IMPORTANT',
    dueDate: '2026-03-29',
    completed: false,
    createdAt: '2026-04-01T12:37:00',
    updatedAt: '2026-04-01T12:37:00',
  },
  {
    id: 2,
    content: '회의가 있어요',
    category: 'MEETING',
    dueDate: '2026-03-29',
    completed: false,
    createdAt: '2026-04-01T12:37:00',
    updatedAt: '2026-04-01T12:37:00',
  },
  {
    id: 3,
    content: 'Basic 스터디 참관하기',
    category: 'STUDY',
    dueDate: '2026-03-30',
    completed: false,
    createdAt: '2026-04-01T12:37:00',
    updatedAt: '2026-04-01T12:37:00',
  },
  {
    id: 4,
    content: '일정',
    category: 'STUDY',
    dueDate: '2026-03-31',
    completed: false,
    createdAt: '2026-04-01T12:37:00',
    updatedAt: '2026-04-01T12:37:00',
  },
];
