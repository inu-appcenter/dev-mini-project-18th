import { TodoRawArySchema } from "@/schema/TodoSchema";

export async function getPosts(date: string) {
    const res = await fetch(`/api/proxy/todos?sort=createdAt&date=${date}`, {
        next: {revalidate: 0}
    });

    if(res.status !== 200) {
        console.error(res);
        console.error("status : ", res.status);
        console.error("statusText : ", res.statusText);
        throw new Error("res의 status가 200이 아님");
    }

    const data = TodoRawArySchema.safeDecode(await res.json());
    if(!data.success) {
        console.log(data.data);
        console.error(data.error.issues);
        throw new Error("dto가 다름");
    }

    return data.data;
}