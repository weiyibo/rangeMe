import C from "../helpers/busyHelper"

export const isBusyLoaderShow = (isBusy) => {
    return {type: C.ACTIONS.CHANGE_BUSY_LOADER, payload: isBusy};
}
