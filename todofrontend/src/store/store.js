

import http from '@/http-common';
import axios from 'axios';
import {createStore } from 'vuex';

const store =  createStore ({
    state() {
        return {
            status: '',
            token: localStorage.getItem('token') || '',
            user: {},
            error:''
        }
    },
mutations: {
    auth_request(state){
        state.status = 'loading';
    },
    auth_success(state, token){
        state.status = 'success';
        state.token = token;
    },
    set_user(state, user){
        state.user = user;
    },
    handle_error(state, error){
        state.error = error;
    },
    logout(state){
        state.status = '';
        state.token = '';
    },
},
actions: {
    login({commit}, resp){
      
        return new Promise((resolve, reject) => {
            commit('auth_request')
            // axios({url:'http://127.0.0.1:8000/api/login',data:user,method:'post'})
            // .then(resp => {
               
                const token = 'Bearer '+resp.data.data.authorisation.token
                const user = resp.data.data.user
                localStorage.setItem('token',token);
                axios.defaults.headers.common['Authorization'] = token;
                commit('auth_success', token, user);
                commit('set_user',user);
                commit('handle_error','');
                
                resolve(resp);
            // })
            // .catch(err => {
            //     localStorage.removeItem('token');
            //     reject(err);
            // })
        });
    },
    logout({commit}){
        console.log('ssss');
        return new Promise((resolve, reject) => {
            commit('logout');
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    },
},

getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getError: state => state.error
}
});

export default store;