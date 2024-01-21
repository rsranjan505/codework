<script setup>
import useUsers from './services/userServices';

const { logout } = useUsers();

</script>

<template>
 
    <header>
      <div class="fixed w-full  max-w-8xl mx-auto bg-blue-300 h-12 rounded-sm shadow-md ">
          <nav>
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                  <router-link to="/" class="px-2 py-4 mr-4 font-bold hover:text-white">Home</router-link>
                  <router-link to="/todos" class="px-2 py-4 mr-4 font-bold  hover:text-white">Todos</router-link>
              </div>
              <div class="flex items-center space-x-6 rtl:space-x-reverse">
              
                <button v-if="$store.getters.isLoggedIn" @click="logout()"  class="text-md  text-blue-600 dark:text-blue-500 hover:underline pr-6">Logout</button>
                <router-link v-else to="/login" class="text-md  text-blue-600 dark:text-blue-500 hover:underline mr-3">Login</router-link>
              </div>
            </div>
          </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto min-h-screen pt-12">
      <router-view />
    </main>
</template>