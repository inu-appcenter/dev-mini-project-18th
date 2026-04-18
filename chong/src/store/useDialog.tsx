import { create } from "zustand";

interface DialogStoreStateI {
    state: {
        open: boolean;
    };
}

interface DialogStoreActionI {
    actions: {
        toggleOpen: VoidFunction;
        setOpen: (open: boolean) => void;
    };
}

interface DialogStoreI extends DialogStoreStateI, DialogStoreActionI {}

export const useDialog = create<DialogStoreI>((set) => {
    return {
        state: {
            open: false,
        },
        actions: {
            toggleOpen() {
                set(({ state }) => ({ state: { ...state, open: !state.open } }));
            },
            setOpen(open: boolean) {
                set(({state: {open}}));
            }
        },
    };
});
