"use client";

import { DivProps } from "@/types/Props";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps extends DivProps {
    /**렌더링 되길 원하는 상위 컴포넌트 */
    mount?: HTMLElement | null;
}

export function Portal({ mount, children, ...rest }: PortalProps) {
    const [mounted, setMounted] = useState<boolean>(false);

    //client에서 mounted를 true로 설정
    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted
        ? createPortal(<div {...rest}>{children}</div>, mount ?? document.documentElement)
        : undefined;
};

export default Portal;
