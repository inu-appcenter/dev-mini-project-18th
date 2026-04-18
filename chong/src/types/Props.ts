import React from "react";

export type ComponentPropsWithRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>;

export type DivProps = ComponentPropsWithRef<"div">;
export type ButtonProps = ComponentPropsWithRef<"button">;
export type InputProps = ComponentPropsWithRef<"input">;
export type LabelProps = ComponentPropsWithRef<"label">;

export type TableProps = ComponentPropsWithRef<"table">;
export type TheadProps = ComponentPropsWithRef<"thead">;
export type TrProps = ComponentPropsWithRef<"tr">;
export type ThProps = ComponentPropsWithRef<"th">;
export type TdProps = ComponentPropsWithRef<"td">;
