import merge from 'merge';

const initialState = {
    busy: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    if(type.endsWith('_FULFILLED') || type.endsWith('REJECTED')) {
        return merge(true, state, { busy: false });
    }
    if(type.startsWith('FETCH_') || type.startsWith('UPDATE_') || type.startsWith("ACCEPT_JOB_") || type.startsWith("REJECT_JOB_")) {
        return merge(true, state, { busy: true });
    }
    return state;
}