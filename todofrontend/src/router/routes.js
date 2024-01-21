import { createWebHistory, createRouter } from "vue-router";
import HomeVue from "@/components/Home.vue";
import TodoCreateVue from "@/components/todos/TodoCreate.vue";
import TodoListVue from "@/components/todos/TodoList.vue";
import TodoEditVue from "@/components/todos/TodoEdit.vue";
import UserSignInVue from "@/components/users/UserSignIn.vue";
import UserSignUpVue from "@/components/users/UserSignUp.vue";
import store from "@/store/store";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: HomeVue,
            meta: {guest: false}
        },
        {
            name: 'login',
            path: '/login',
            component: UserSignInVue,
            meta: {guest: false}
        },
        {
            name: 'register',
            path: '/register',
            component: UserSignUpVue,
            meta: {guest: false}
        },
        {
            name: 'todos',
            path: '/todos',
            component: TodoListVue,
            meta: {guest: false}
        },
        {
            name: 'create',
            path: '/create',
            component: TodoCreateVue,
            meta: {requiredAuth: true}
    
        },
        {
            name: 'edit',
            path: '/edit/:id',
            component: TodoEditVue,
            meta: {requiredAuth: true}
        }
    
    ]
}) 


  //middleware
router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.requiredAuth)){
        if(store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    }else{
        next();
    }
});


router.beforeEach((to, from, next) => {
    if(to.matched.some((record) => record.meta.guest)){
        if(store.getters.isLoggedIn) {
            next('todos');
            return;
        }
        next();
    }else{
        next();
    }
});

export default router