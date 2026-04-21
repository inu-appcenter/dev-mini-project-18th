export async function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const dayjs = (await import("@constants/Date")).default;
        dayjs.locale("ko");
    }
}
