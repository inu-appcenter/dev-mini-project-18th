import { ButtonProps } from "@/types/Props";
import { twMerge } from "tailwind-merge";

export function Btn({className, children, ...rest}: ButtonProps) {
    return (
        <button {...rest} className={twMerge("cursor-pointer", className)}>
            {children}
        </button>
    )
}

export default Btn;