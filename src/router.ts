import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: () => import('./pages/Login.vue')
    },
    {
        path: '/',
        component: () => import('./layouts/Main.vue'),
        children: [
            {
                path: '/',
                component: () => import('./pages/Home.vue')
            },
            {
                path: '/product',
                component: () => import('./pages/Product/Index.vue')
            }
        ]
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router