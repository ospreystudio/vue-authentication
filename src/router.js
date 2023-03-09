import {createRouter, createWebHistory} from "vue-router";

import DevDetail from "./pages/devs/DevDetail";
import DevRegistration from "./pages/devs/DevRegistration";
import NotFound from "./pages/NotFound";
import RequestsReceived from "./pages/requests/RequestsReceived";
import DevsList from "./pages/devs/DevsList";
import ContactDev from "./pages/requests/ContactDev";
import UserAuth from "./pages/Auth/UserAuth";
import store from './pages/store/store'




const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/devs'},
        {path: '/devs', component: DevsList},
        {path: '/devs/:id',
            component: DevDetail,
            props: true,
            children: [ // devs/c1
                {path: 'contact', component: ContactDev}  //  /devs/1c/contact
            ]},
        {path: '/register', component: DevRegistration, meta: {requiredAuth: true}},
        {path: '/requests', component: RequestsReceived, meta: {requiredAuth: true} },
        {path: '/auth', component: UserAuth, meta: {requiredUnuth: true}},
        {path: '/:notFound(.*)', component: NotFound},
    ]
});

router.beforeEach(function (to, _,next) {
    if (to.meta.requiredAuth && !store.getters.isAuthenticated) {
        next('/auth')
    }else if (to.meta.requiredAuth && store.getters.requiredUnuth) {
        next('devs')
    } else {
        next()
    }
})

export default router

