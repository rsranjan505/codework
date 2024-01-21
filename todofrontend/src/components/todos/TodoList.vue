<script setup>
import { onMounted } from "vue";
import useTodos from "../../services/todoServices";

const { todos, getAllTodos,destroyTodo, updateTodo } = useTodos();

onMounted(() => getAllTodos())

</script>
<template>
    

<div class="max-w-md mx-auto bg-white rounded-md sm:rounded-lg">
    <a href="/create" class="p-4 bg-blue-600 rounded-sm text-white float-end">
        Add New
    </a>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
       
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Completed
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="todo in todos" :key="todo.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white {{ todo.isCompleted == true ? 'line-through' : '' }}">
                 {{todo.name}}
                </td>
                <td  class="px-6 py-4 text-right">
                    <div class="flex items-center h-5">
                        <input id="isCompleted" v-bind:checked="todo.isCompleted" v-bind:disabled="!$store.getters.isLoggedIn" type="checkbox" @change="updateTodo(todo.id)" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
                    </div>
                </td>
                <td v-if="$store.getters.isLoggedIn" class="px-6 py-4 text-right">
                    <a v-if="todo.isCompleted"  href="#" @click="destroyTodo(todo.id)" class="font-small text-white  hover:bg-red-700 bg-red-600 rounded-sm p-2 mr-2">Delete</a>
                    <router-link :to="{ name: 'edit', params: { id: todo.id}}" class="font-small text-white  hover:bg-green-700 bg-green-600 rounded-sm p-2 mr-2">Edit</router-link>
                   
                </td>
            </tr>

        </tbody>
    </table>
</div>

</template>