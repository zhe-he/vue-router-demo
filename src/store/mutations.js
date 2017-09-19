const showLoad = (state,status) => {
	state.loadStatus = status || 1;
};

const hideLoad = state => {
    state.loadStatus = false;
};

const showMsg = (state,msg) => {
    state.status = 1;
    state.msg = msg;
};

const setMsgTimer = (state,{fn}) => {
    clearTimeout(state.timer);
    state.timer = fn;
};

const hideMsg = (state) => {
    state.status = 2;
};

export {
    showLoad,
    hideLoad,
    showMsg,
    setMsgTimer,
    hideMsg
}