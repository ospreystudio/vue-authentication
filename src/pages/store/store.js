import { createStore } from "vuex";
import devModule from './devs/states'
import requestModule from './requests/states'
import authModel from './auth/states'

const store = createStore({
        modules: {
            devModule,
            requestModule,
            authModel
        },
})


export default store