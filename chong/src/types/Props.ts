import React from "react";
type ComponentProps<T extends React.ElementType> = React.ComponentPropsWithRef<T>;

export type DivProps = ComponentProps<"div">;
export type ButtonProps = ComponentProps<"button">;
export type InputProps = ComponentProps<"input">;
export interface SvgProps {
    width?: string;
    height?: string;
}

export type TableProps = ComponentProps<"table">;
export type TheadProps = ComponentProps<"thead">;
export type TrProps = ComponentProps<"tr">;
export type ThProps = ComponentProps<"th">;
export type TdProps = ComponentProps<"td">;