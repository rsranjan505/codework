
import HomeVue from "@/components/Home.vue";
import http from "../http-common";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default function useTodos() {

    const todos = ref([]);
    const todo = ref({});
    const errors = ref({});
    const router = useRouter();

   
    const getAllTodos = async () => {
        const response = await http.get("/todos");
        todos.value = response.data.data;
    }

    const getTodo = async (id) => {
        const response = await http.get("/todos/" +id);
        todo.value = response.data.data;
    }

    const storeTodo = async(data) => {
        try {
            await http.post("todos", data);
            await router.push({name:"todos"});
        } catch (error) {
            if(error.response.status ===422){
                errors.value = error.response.data.errors;
            }
        }
    }

    const updateTodo = async(id,data=null) => {
        try {
           
            await http.patch("todos/"+id, data ? data : todo);
            await router.push({name:"todos"});
            getAllTodos();
        } catch (error) {
            if(error.response.status ===422){
                errors.value = error.response.data.errors;
            }
        }
    }

    const destroyTodo = async(id) =>{
        if(!window.confirm("Are you sure:")){
            return;
        }
        await http.delete("todos/"+id);
        await getAllTodos();
    }

    return {
        todos,
        todo,
        getAllTodos,
        getTodo,
        storeTodo,
        updateTodo,
        errors,
        destroyTodo
    }
}
