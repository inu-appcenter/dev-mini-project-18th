import { DivProps } from "@/types/Props";
import { createPortal } from "react-dom";

export interface PortalProps extends DivProps {
    /**렌더링 되길 원하는 상위 컴포넌트 */
    mount?: HTMLElement;
}

export function Portal({mount, ...rest}: PortalProps) {
    return createPortal(<div {...rest}></div>, mount ?? document.body);
}

export default Portal;