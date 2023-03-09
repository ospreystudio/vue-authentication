export default {
    registerDev(state, payload) {
        state.devs.push(payload)
    },
    setDevs(state, payload) {
            state.devs = payload
    },
    setFetchTimeStamp(state) {
        state.lastFetch = new Date().getTime()
    }
}