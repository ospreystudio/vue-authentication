export default {
    devs(state) {
        return state.devs;
    },
    hasDevs(state) {
        return state.devs && state.devs.length > 0;
    },
    isDev(_, getters, _2, rootGetters) {
        const devs = getters.devs;
        const userId = rootGetters.userId;
        return devs.some(dev => dev.id === userId);
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};