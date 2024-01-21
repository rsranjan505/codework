<script setup>
import { reactive } from 'vue';
import useUsers from '../../services/userServices';

const { storeUser, errors } = useUsers();

const formdata = reactive({
    name: "",
    email: "",
    password: ""
});

</script>
<template>
    <div class="max-w-sm mx-auto bg-white rounded-md shadow-md px-6 py-6">
        <h1 class="mb-2 flex justify-center font-bold">Sign Up</h1>
        <form @submit.prevent="storeUser(formdata)">
        <div class="mb-5">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input v-model="formdata.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter name" required>
            <div v-if="errors.name">
                <span class="text-sm text-red-600">{{ errors.name[0] }}</span>
            </div>
        </div>
        
        <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input v-model="formdata.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter email" required>
            <div v-if="errors.email">
                <span class="text-sm text-red-600">{{ errors.email[0] }}</span>
            </div>
        </div>
       
        <div class="mb-5">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input v-model="formdata.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <div v-if="errors.password">
                <span class="text-sm text-red-600">{{ errors.password[0] }}</span>
            </div>
        </div>
       
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
        <div class="flex py-3">
            <p class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Have Account? </p>
            <router-link to="/login" class="ml-2 text-blue-500 font-medium"> Login</router-link>
        </div>
        
    </div>
</template>