import merge from 'merge';
import C from '../helpers/filterHelper'

let initialState = {
    filterObject: C.defaultValue
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case C.ACTIONS.CHANGE_FILTER_VALUE: {
            return merge(true, state, {filterObject: payload});
        }
    }
    return state;
}