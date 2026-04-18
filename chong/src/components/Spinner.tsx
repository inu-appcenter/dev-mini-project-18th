import { DivProps } from "@/types/Props";
import { cn } from "@/utils/cn";
import React from "react";

export const Spinner = React.memo(({ className, ...rest }: DivProps) => {
    return (
        <div
            {...rest}
            className={cn(
                "aspect-square w-5 rounded-full border-2 border-solid border-zinc-950",
                "animate-spinner border-s-transparent border-be-transparent",
                className,
            )}
        />
    );
});

export default Spinner;
