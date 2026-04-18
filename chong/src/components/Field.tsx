import { DivProps, InputProps, LabelProps } from "@/types/Props";
import { cn } from "@/utils/cn";
import React from "react";

export interface FieldProps extends DivProps {
    LabelProps?: LabelProps;
    Label?: React.ReactNode;
    InputProps?: InputProps;
}

export const Field = React.memo(({ LabelProps, Label, InputProps, ...rest }: FieldProps) => {
    return (
        <div {...rest} className={cn("flex w-full max-w-full flex-col gap-1", rest.className)}>
            <label {...LabelProps} className={cn("inline-block max-w-full", LabelProps?.className)}>
                {Label}
            </label>

            <input
                {...InputProps}
                className={cn("", InputProps?.className)}
                type={InputProps?.type ?? "text"}
                inputMode={InputProps?.inputMode ?? "text"}
            />
        </div>
    );
});
