"use client";

import { useCallback, useEffect, useState } from "react";

export function useIsMobile() {
    if (typeof window === "undefined") return;
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(() => {
        if (typeof window === "undefined") return;

        const isMobileVar = getComputedStyle(document.documentElement)
            .getPropertyValue("--is-mobile")
            .trim();

        setIsMobile(isMobileVar === "true");
    }, []);

    return isMobile;
}
