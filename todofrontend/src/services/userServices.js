
import http from "../http-common";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";
import { useStore } from "vuex";

export default function useUsers() {

    const users = ref([]);
    const unauthorised = ref([]);
    const errors = ref({});
    const router = useRouter();

    const store = useStore();

    const storeUser = async(data) => {
        try {
            await http.post("users", data);
            await router.push({name:"login"});
        } catch (error) {
            if(error.response.status ===422){
                errors.value = error.response.data.errors;
            }
        }
    }

    const loginUser = async(data) => {
        try {
           await http.post("login", data)
           .then(res => {
                store.dispatch('login',res);
                router.push({name:"todos"});
           });
          
        } catch (error) {

            if(error.response.status ===422){
                errors.value = error.response.data.errors;
            }else if(error.response.status ===400) {
               
                unauthorised.value = error.response.data.message;
            }
        }
    }

    const logout = async() => {
        try {
       
            store.dispatch('logout');
            router.push({name:"login"});
     
        } catch (error) {

        }
    }
    return {
        users,
        storeUser,
        errors,
        loginUser,
        logout,
        unauthorised
    }
}
