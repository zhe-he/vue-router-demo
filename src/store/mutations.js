export const showLoad = (state, status) => {
    state.loadStatus = status || 1;
};

export const hideLoad = state => {
    state.loadStatus = 0;
};

export const showMsg = (state, msg) => {
    state.toast.status = 1;
    state.toast.msg = msg;
};

export const setMsgTimer = (state, {fn}) => {
    clearTimeout(state.toast.timer);
    state.toast.timer = fn;
};

export const hideMsg = (state) => {
    state.toast.status = 2;
};
