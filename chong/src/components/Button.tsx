import { ButtonProps } from "@/types/Props";
import { twMerge } from "tailwind-merge";
import React from "react";

const Button = React.memo(({ className, children, ...rest }: ButtonProps) => {
    return (
        <button {...rest} className={twMerge("cursor-pointer", className)}>
            {children}
        </button>
    );
});

export default Button;
