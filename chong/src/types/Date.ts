/**DateFormat: Dayjs객체를 string으로 변환하기 위해 사용
 * 사용법 : dayjs().format(DateFormat) 
 * 사용하는 이유 : 나중에 위 형식으로 변환된 string을 dayjs함수에 넘겨줄 경우 
 * Dayjs타입으로 변환가능
 * ex) dayjs("2026-03-31 00:59:12")
 * 이렇게 하면 set메서드를 굳이 길게 늘어쓰지 않아도 돼서 가독성이 좋아짐.*/
export const DateFormat = "YYYY-MM-DD hh:mm:ss"
//dayjs.Dayjs객체의 day메서드의 반환값(0~6)을 한국어 요일로 바꾸기 위해 사용
export const KorDateAry = ["일", "월", "화", "수", "목", "금", "토"];