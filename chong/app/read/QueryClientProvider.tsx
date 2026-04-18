"use client";

import { QueryClient, QueryClientProvider as Provider } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
}

export default function QueryClientProvider({ children }: Props) {
    const [client] = useState(() => new QueryClient());

    return <Provider client={client}>{children}</Provider>;
}
