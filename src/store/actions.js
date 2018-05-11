export const setTestSync = ({commit}, {value, time}) => {
    setTimeout(() => {
        commit('setTest', value);
    }, time);
}