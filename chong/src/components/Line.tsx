import { DivProps } from "@/types/Props";
import { cn } from "@/utils/cn";

export function Line({ className, ...rest }: DivProps) {
    return (
        <div
            {...rest}
            className={cn(
                "h-[76px] w-px text-base",
                "bg-[repeating-linear-gradient(var(--stroke-primary),var(--stroke-primary)_1px,transparent_1px,transparent_2px)]",
                className,
            )}
        ></div>
    );
}
