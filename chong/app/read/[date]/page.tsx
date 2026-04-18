import { redirect } from "next/navigation";
import dayjs from "@constants/dayjs";
import { DateFormat1 } from "@/constants/Date";

export default async function Read({ params }: { params: Promise<{ date: string }> }) {
    const { date } = await params;
    //date가 잘못된 형식이면 home으로 이동
    if (!dayjs(date, DateFormat1, true).isValid()) return redirect("/");
    //그냥 date만 있는 페이지로 왔을때에는 index를 0으로해서 redirect
    return redirect(`/read/${date}/0`);
}
