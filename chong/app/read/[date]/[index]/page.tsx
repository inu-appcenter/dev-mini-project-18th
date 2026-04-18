import { redirect } from "next/navigation";
import ReadClient from "./client";

export default async function Read({
    params,
}: {
    params: Promise<{ date: string; index: string }>;
}) {
    const { date, index } = await params;
    //index가 잘못된 형식이면 home으로 이동
    if (!/\d/.test(index)) return redirect("/");
    return <ReadClient date={date} index={Number(index)} />;
}
