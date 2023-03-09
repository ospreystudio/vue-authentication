export default {
    requests(state, _, _2, rootGetters) {
        const devId = rootGetters.userId
        return state.requests.filter(req => req.devId === devId)
    },
    hasRequests(state, getters) {
        return getters.requests && getters.requests.length > 0
    }
}