"use client";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ reset }: GlobalErrorProps) {
    return (
        <html lang="ko">
            <body>
                <h2>문제가 발생했습니다.</h2>
                <button onClick={() => reset()}>다시 시도</button>
            </body>
        </html>
    );
}
