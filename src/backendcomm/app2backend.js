import axios from 'axios';

const BASE_URL = "http://localhost:5000";
const BASE_TODO_V1_URL = BASE_URL + "/api/v1/todos/";

const HEADERS = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class BackendApi {
    getAllTodos = () => {
        let promise = axios.get(BASE_TODO_V1_URL, HEADERS);
        return promise;
        /* promise.then((res) => {
            callback(res);
        }).catch((err) => {
            callback(err);
        }); */
    };

    createTodo = (todoCredential) => {
        let promise = axios.post(BASE_TODO_V1_URL, { task: todoCredential }, HEADERS);
        return promise;
    };

    getSelectedTodo = (todoId) => {
        let promise = axios.get(BASE_TODO_V1_URL + todoId, HEADERS);
        return promise;
    };

    updateSelectedTodo = (todoId, todoCredential) => {
        let promise = axios.put(BASE_TODO_V1_URL + todoId, { task: todoCredential }, HEADERS);
        return promise;
    };

    deleteSelectedTodo = (todoId) => {
        let promise = axios.delete(BASE_TODO_V1_URL + todoId, HEADERS);
        return promise;
    };
}

export default new BackendApi();