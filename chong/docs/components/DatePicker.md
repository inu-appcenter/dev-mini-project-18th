# DatePicker 컴포넌트란?

## 주요기능

- 캘린더 아이콘을 누르면 뜨는 Dialog에서 날짜를 선택할 수 있음.

## 각 state들

- Mounted, Open : Dialog의 나타냄 여부를 결정하는 state. 추후에 data-attribute(data-open)를 통해 Dialog의 등장/삭제 애니메이션을 추가해야함.
- Value : 실제 선택된 날짜
- View : Dialog에 있는 캘린더에서의 현재 달(month)
