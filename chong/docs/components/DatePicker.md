# DatePicker 컴포넌트

## 개요

`DatePicker`는 텍스트 입력 + 캘린더 팝업 방식의 날짜 선택 컴포넌트.
사용자가 직접 날짜를 타이핑하거나, 캘린더 아이콘을 눌러 팝업 달력에서 날짜를 선택할 수 있음.
선택된 날짜는 `onChange` 콜백으로 상위 컴포넌트에 전달됨.

- 위치: [src/components/DatePicker.tsx](../../src/components/DatePicker.tsx)
- 타입: Client Component (`"use client"`)
- `React.memo`로 감싸져 있어 props가 바뀌지 않으면 리렌더링 생략

---

## Props

| 이름 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `defaultOpen` | `boolean` | `false` | 초기 마운트 시 캘린더 팝업을 열어둘지 여부 |
| `defaultValue` | `dayjs.Dayjs` | `dayjs()` | 초기 선택 날짜 |
| `onChange` | `(value: dayjs.Dayjs) => void` | - | 날짜가 변경될 때마다 호출되는 콜백 |
| `format` | `"YYYY"` \| `"YYYY{sep}MM"` \| `"YYYY{sep}MM{sep}DD"` | `"YYYY년 MM월"` | 팝업 헤더에 표시할 날짜 포맷 |
| `ControlProps` | `DivProps` | - | 입력 영역 래퍼(`control`) div에 전달할 props |
| `ShowerProps` | `DivProps` | - | 입력창 영역(`shower`) div에 전달할 props |
| `TrgProps` | `ButtonProps` | - | (예약) 트리거 버튼에 전달할 props |
| `InputProps` | `InputProps` | - | 텍스트 input의 `defaultValue` 등 전달 |
| `...rest` | `DivProps` | - | 루트 div에 전달할 나머지 props |

---

## 내부 상태

| 상태 | 타입 | 설명 |
|------|------|------|
| `mounted` | `boolean` | 캘린더 팝업의 열림/닫힘 여부 |
| `value` | `dayjs.Dayjs` | 현재 **선택된** 날짜 |
| `view` | `dayjs.Dayjs` | 캘린더 팝업에서 **보고 있는** 월. 팝업을 탐색해도 `value`는 바뀌지 않음 |
| `inputRef` | `RefObject<HTMLInputElement>` | 텍스트 input DOM 참조. 날짜 선택 시 input 값을 직접 갱신하는 데 사용 |

---

## 구조

```
root (div)
├── control (div)
│   └── shower (div)
│       ├── input (text)          ← 날짜 직접 입력
│       └── Button (CalenderIcon) ← 팝업 토글
└── AnimatePresence
    └── motion.div (positioner)   ← 캘린더 팝업 (mounted일 때만 렌더)
        ├── 월 이동 헤더
        │   ├── Button (ArrowBack)
        │   ├── 현재 view 월 표시
        │   └── Button (ArrowForward)
        ├── 요일 헤더 (일~토)
        └── 날짜 그리드 (7열)
            ├── prev: 이전 달 날짜 (opacity-50)
            ├── curr: 현재 달 날짜
            └── next: 다음 달 날짜 (opacity-50)
```

---

## 동작 원리

### 1. 초기화

- `value` = `defaultValue ?? dayjs()` 로 초기화. `dayjs.locale("ko")`를 적용해 한국어 요일/포맷 사용.
- `view` = `value`와 동일한 날짜로 초기화. 팝업에서 몇 월을 보여줄지를 독립적으로 관리함.
- `mounted` = `defaultOpen ?? false`.

### 2. 달력에 표시할 날짜 계산 (`content`)

`useMemo`로 `view`가 바뀔 때만 재계산.

```
content = { prev: number[], curr: number[], next: number[] }
```

- **prev**: 이번 달 1일의 요일(0=일, 1=월...)만큼 이전 달 날짜를 채움.
  - `PrevDate = 이전달 마지막날 - CurrDay` 를 기준으로 `CurrDay`개 생성.
- **curr**: `1 ~ view.daysInMonth()`.
- **next**: 이번 달 마지막날의 요일을 기준으로 `6 - LastDay`개 채움. 달력을 항상 7열로 맞추기 위한 여백.

### 3. 캘린더 팝업 열기/닫기

- 캘린더 아이콘 버튼 클릭 → `setMounted((m) => !m)` 으로 토글.
- 팝업이 열리거나 닫힐 때마다 `view`를 현재 `value`로 리셋함.
  - 팝업에서 다른 달을 탐색하다 닫으면, 다음에 열 때 선택된 날짜의 달부터 다시 시작.

### 4. 월 이동

팝업 헤더의 `<` / `>` 버튼으로 `view`만 이동시킴. `value`는 변하지 않음.

```
← : setView(v => v.subtract(1, "month"))
→ : setView(v => v.add(1, "month"))
```

### 5. 날짜 셀 클릭 (`setValueWhenClick`)

```
setValueWhenClick(d: dayjs.Dayjs)
  1. setValue(d)          → value 갱신 → onChange 콜백 발동
  2. setMounted(false)    → 팝업 닫기
  3. inputRef.current.value = d.format("YYYY년 MM월 DD일")
                          → input 표시 값을 직접 갱신
```

- **prev/next 셀**을 클릭하면 이전/다음 달의 해당 날짜로 이동.
  - `view.subtract(1, "month").set("date", d)` / `view.add(1, "month").set("date", d)`

### 6. onChange 콜백

`value` 상태가 바뀔 때마다 `useEffect`에서 `onChange?.(value)` 호출.

### 7. 텍스트 입력

input에서 날짜를 직접 타이핑할 수 있음.

| 이벤트 | 동작 |
|--------|------|
| `onFocus` | 한글 등 비숫자 문자를 제거해 숫자만 남김 |
| `onBeforeInput` | 숫자(`[0-9]`)가 아니거나 8자리 초과면 입력 차단 |
| `onBlur` | `dayjs(입력값)`으로 파싱 → 유효하지 않으면 `dayjs()`(오늘)로 폴백 → `setValue` + input 표시값 갱신 |

### 8. 팝업 애니메이션

`framer-motion`의 `AnimatePresence` + `motion.div`를 사용.

```
진입: y: 5 → 0, opacity: 0 → 1  (0.2s easeInOut)
퇴장: y: 0 → 5, opacity: 1 → 0  (0.2s easeInOut)
```

---

## `view` vs `value` 구분

| | `view` | `value` |
|---|---|---|
| 역할 | 캘린더 팝업에서 현재 보고 있는 월 | 실제 선택된 날짜 |
| 변경 시점 | 월 이동 버튼 클릭, 팝업 열릴 때 리셋 | 날짜 셀 클릭, 텍스트 input blur |
| onChange 발동 | X | O |

---

## 작성 일자

2026년 4월 20일
