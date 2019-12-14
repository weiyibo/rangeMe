import C from "../helpers/filterHelper"

export const changeFilter = (filterObj) => {
    return {type: C.ACTIONS.CHANGE_FILTER_VALUE, payload: filterObj};
}
