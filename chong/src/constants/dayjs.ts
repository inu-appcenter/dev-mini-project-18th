import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.locale("ko");

export type Dayjs = dayjs.Dayjs;
export default dayjs;