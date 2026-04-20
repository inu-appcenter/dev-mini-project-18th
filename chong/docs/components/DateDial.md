# DateDial 컴포넌트

## 개요

`DateDial`은 가로 스크롤 방식의 날짜 선택 다이얼
한 번에 5개의 날짜 셀을 화면에 보여주며, 사용자는 드래그 또는 클릭으로 날짜를 선택할 수 있음
선택된 날짜는 URL(`/read/:date/:index`)로 반영됨(router.push)

---

## Props

| 이름 | 타입 | 설명 |
|------|------|------|
| `date` | `dayjs.Dayjs` | 다이얼의 기준이 되는 날짜. 왼쪽 첫 칸(anchor)에 위치함. |
| `index` | `number` | 현재 선택된 셀의 ary 내 인덱스. 하이라이트 표시에 사용됨. |

---

## 시각 구조

### 셀 구성

다이얼은 내부적으로 **13개의 날짜 셀 배열(`ary`)** 을 유지하며, 그 중 **5개**만 화면에 보임.

```
ary index:  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
날짜 offset: [-4,-3,-2,-1, 0,+1,+2,+3,+4,+5, +6, +7, +8]
                         ↑
                       anchor (ANCHOR_INDEX = 4)
                       → 화면 왼쪽 첫 칸
```

- `ARY_LEN = 13`: 전체 셀 개수
- `VISIBLE_COUNT = 5`: 한 화면에 보이는 셀 수 (각 셀은 컨테이너의 20% 너비)
- `ANCHOR_INDEX = 4`: `date` prop이 매핑되는 ary 인덱스. 이 셀이 **항상 왼쪽 첫 칸**에 보이도록 scrollLeft가 유지됩니다.

### DateCell 렌더링

각 셀(`DateCell`)은 다음을 표시합니다.

- **요일 한글명** (`KorDateAry[day.day()]`) — 예: "월", "화" ...
- **일(day of month)** (`day.date()`)
- `selected === true`이면 브랜드 컬러 배경 + 흰색 텍스트로 강조

`DateCell`은 `React.memo`로 감싸져 있으며, `selected` 값과 `day`가 같은 날짜이면 리렌더링을 건너뜀.

---

## 상태 관리

### 핵심 상태(state)

| 이름 | 역할 |
|------|------|
| `ary` | 화면에 그릴 13개의 `dayjs.Dayjs` 날짜 배열 |

### ref 목록

| ref | 역할 |
|-----|------|
| `aryRef` | 최신 `ary`를 항상 참조하기 위한 미러. 비동기 핸들러에서 state stale 문제 방지 |
| `containerRef` | 스크롤 컨테이너 DOM 참조 |
| `startX` | pointer down/move 직전의 clientX (드래그 델타 계산용) |
| `isDown` | 현재 pointer가 눌린 상태인지 |
| `moveDistance` | pointer down 이후 누적 이동 거리. 클릭/드래그 판별에 사용 |
| `shiftedRef` | `ary` shift가 일어났을 때 scrollLeft를 얼마나 역보정해야 하는지 |
| `indexRef` | 최신 `index` prop 미러 |
| `itemWidthRef` | 셀 하나의 너비(px). reflow 방지를 위해 캐시 |
| `anchorScrollLeftRef` | anchor 위치에 해당하는 scrollLeft 값. 캐시 |
| `pendingDxRef` | 아직 scroll에 반영되지 않은 누적 pointer 델타 |
| `rafIdRef` | `requestAnimationFrame` id. pointer move 쓰로틀링 |
| `settleTimerRef` | snap 애니메이션 후 실행되는 `setTimeout` id |

---

## 동작 원리

### 1. 초기 렌더

1. `initialAry(date)`가 `date`를 기준으로 `-4 ~ +8` 일 범위의 배열을 생성.
2. `useLayoutEffect`에서 `measure(el)`을 호출해 셀 너비와 anchor scrollLeft를 측정.
   - `itemWidth = clientWidth / 5`
   - `anchorScrollLeft = itemWidth * 4`
3. `scrollLeft`를 `anchorScrollLeft`로 설정해, `ary[4]` 셀이 화면 왼쪽 첫 칸에 오도록 정렬.

> paint 이전에 동기적으로 scrollLeft를 맞춰야 깜빡임이 없으므로 `useEffect`가 아닌 `useLayoutEffect`를 사용.

### 2. 드래그 (pointer move)

pointer move 이벤트마다 매번 스크롤을 갱신하지 않고, **rAF 기반으로 프레임당 1회만** 반영합니다.

```
onPointerMove → pendingDxRef 누적 → requestAnimationFrame(flushPointerMove)
                                    └→ scrollLeft -= pendingDx
                                       normalizeDuringDrag(el)
```

이로써 같은 프레임 내에 들어오는 여러 pointer move 이벤트가 하나로 병합됨.

#### `normalizeDuringDrag` — 무한 스크롤 구현의 핵심

드래그로 인해 scrollLeft가 anchor에서 한 셀 이상 벗어나면:

1. 벗어난 **칸 수(steps)** 를 계산
2. `ary`의 모든 날짜를 `steps`만큼 `add(steps, "day")` 하여 **새 배열 생성**
3. 동시에 `scrollLeft`를 `steps * itemWidth` 만큼 역보정

결과적으로 사용자는 연속적으로 스크롤되는 것처럼 느끼지만, 내부적으로는 **anchor 기준 ±몇 칸** 범위에서만 scrollLeft가 움직이고, 날짜만 계속 갱신됨. 이 방식으로 **과거/미래 양방향 무한 스크롤**을 구현.

> `useLayoutEffect`의 `shiftedRef` 보정 로직은 이 경로에서는 사용되지 않습니다(`shiftedRef.current = 0` 유지). 해당 보정은 아래 `settle` 경로에서만 활성화됨.

### 3. 드래그 종료 (pointer up)

pointer up 시점에 다음 순서로 처리합니다.

1. **미반영된 rAF flush**: 아직 처리되지 않은 `pendingDxRef`가 있으면 즉시 scrollLeft에 반영하고 `normalizeDuringDrag` 호출 — settle이 최신 상태를 기준으로 동작하도록 보장.
2. **클릭 판별**: `moveDistance < CLICK_THRESHOLD_PX(5)`이면 드래그가 아닌 **클릭**으로 간주.
   - 클릭 위치를 `itemWidth`로 나눠 몇 번째 visible 셀이 클릭됐는지 계산
   - `/read/:anchorDate/:clickedAryIndex`로 라우팅
3. 그렇지 않으면 `settle(el)` 호출.

### 4. `settle` — 스냅 동작

드래그가 끝났을 때 현재 스크롤 위치를 가장 가까운 칸 경계로 **snap** 시키는 함수

- `diff = scrollLeft - anchor`
- **반 칸 미만** (`|diff| < itemWidth / 2`):
  - `scrollTo({ left: anchor, behavior: "smooth" })`로 원위치 복귀
  - 현재 `ary[ANCHOR_INDEX]` 날짜로 라우팅
- **반 칸 이상**:
  1. `scrollTo({ left: anchor ± itemWidth, behavior: "smooth" })`로 한 칸 이동 애니메이션 시작
  2. `SETTLE_MS(220ms)` 후 `setTimeout` 콜백에서
     - `shiftedRef.current = dir` 지정
     - `ary`를 `dir`만큼 shift한 새 배열로 `setAry` 호출
     - 새 `ary[ANCHOR_INDEX]` 날짜로 라우팅

이후 `ary` 변경으로 트리거된 `useLayoutEffect`가 **paint 직전에**
```
scrollLeft -= shiftedRef.current * itemWidth
```
를 실행하여 scrollLeft를 다시 anchor로 되돌림. 사용자 눈에는 **부드러운 슬라이드 → 새 날짜가 제자리에 고정**된 것처럼 보임.

### 5. pointer cancel / leave

드래그 중에 pointer가 컨테이너를 벗어나거나 취소되면, pointer up과 동일하게 rAF flush 후 `settle`을 호출. 단, 클릭 판별 로직X

### 6. 리사이즈 대응

`window.resize`가 발생하면 `measure`로 `itemWidth`와 `anchorScrollLeft`를 재계산하고, scrollLeft를 새 anchor로 재조정

### 7. 언마운트 정리

`useEffect` cleanup에서 대기중인 `setTimeout`과 `requestAnimationFrame`을 취소하여 메모리 누수를 방지

---

## 성능 최적화 포인트

| 기법 | 설명 |
|------|------|
| `React.memo` + 커스텀 비교 | `DateCell`은 `selected`와 `day`가 같으면 리렌더링 생략 |
| rAF 쓰로틀링 | pointer move를 프레임당 1회만 반영 → 스크롤 jank 방지 |
| layout 측정 캐시 | `itemWidth`, `anchorScrollLeft`를 pointer down / resize / mount 시점에만 측정 → pointer move마다 `clientWidth`를 읽어 reflow가 발생하는 것을 차단 |
| `useLayoutEffect`로 scrollLeft 보정 | paint 이전에 scrollLeft를 조정해 깜빡임 제거 |
| `useCallback` / `useMemo` | 핸들러와 className 재생성 최소화 |
| `aryRef` 미러 | 비동기 콜백(`setTimeout`)에서 stale closure 문제 회피 |

---

## 상수 정리

| 상수 | 값 | 의미 |
|------|----|----|
| `ARY_LEN` | 13 | 내부 ary 길이 |
| `VISIBLE_COUNT` | 5 | 화면에 동시에 보이는 셀 수 |
| `ANCHOR_INDEX` | 4 | anchor로 사용하는 ary 인덱스 (왼쪽 첫 칸) |
| `CLICK_THRESHOLD_PX` | 5 | 클릭/드래그 판별 임계 이동량(px) |
| `SETTLE_MS` | 220 | snap 애니메이션 후 ary shift를 반영할 때까지의 지연(ms) |

---

## 라우팅 동작 요약

모든 사용자 인터랙션은 아래 경로로 라우팅을 유발

```
/read/{ary[ANCHOR_INDEX].format(DateFormat1)}/{selectedIndex}
```

| 상황 | anchor 날짜 | selectedIndex |
|------|------------|---------------|
| 클릭 | 현재 `ary[4]` | 클릭한 셀의 ary 인덱스 |
| 반 칸 미만 드래그 후 snap | 현재 `ary[4]` | 기존 `index` (변화 없음) |
| 반 칸 이상 드래그 후 snap | shift된 새 `ary[4]` | 기존 `index` (변화 없음) |


## 작성 일자
4월 20일