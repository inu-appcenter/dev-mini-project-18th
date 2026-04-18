import Portal from "./Portal";
import React, { ReactNode } from "react";
import { DivProps, ComponentPropsWithRef } from "@/types/Props";
import { cn } from "@/utils/cn";
import { useDialog } from "@/store/useDialog";
import { useShallow } from "zustand/shallow";
import { AnimatePresence, motion } from "framer-motion";

export interface DialogProps extends DivProps {
    PositionerProps?: ComponentPropsWithRef<typeof motion.div>;
    children?: ReactNode;
}

export const Dialog = React.memo(({ PositionerProps, children, ...rest }: DialogProps) => {
    const [state, actions] = useDialog(useShallow((store) => [store.state, store.actions]));

    return (
        <Portal
            {...rest}
            mount={typeof window === "undefined" ? null : document.body}
            className={cn(
                "absolute top-0 left-0 h-full w-full",
                state.open ? "z-100" : "pointer-events-none",
                rest.className,
            )}
            onClick={(e) => {
                actions.setOpen(false);
                rest.onClick?.(e);
            }}
        >
            <AnimatePresence>
                {state.open && (
                    <motion.div
                        {...PositionerProps}
                        className={cn(
                            "pointer-events-none flex h-full w-full flex-col items-center justify-center",
                            PositionerProps?.className,
                        )}
                        initial={{ backgroundColor: "transparent" }}
                        animate={{ backgroundColor: "rgba(0, 0, 0, 0.36)" }}
                        exit={{ backgroundColor: "transparent" }}
                    >
                        <motion.div
                            className={cn(
                                "pointer-events-auto",
                                "z-101 box-content h-fit w-[51%] rounded-2xl px-5 pt-5 pb-3",
                                "flex flex-col items-center gap-5 bg-white",
                            )}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
});
