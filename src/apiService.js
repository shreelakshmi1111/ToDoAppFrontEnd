const baseUrl = 'http://localhost:7036/api/todo';

const apiService = {
    async getTodos() {
        const response = await fetch(baseUrl);
        const data = await response.json();
        return data;
    },

    async createTodo(todo) {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        return data;
    },

    async updateTodo(id, todo) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        const data = await response.json();
        return data;
    },

    async deleteTodo(id) {
        await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE'
        });
    }
};

export default apiService;