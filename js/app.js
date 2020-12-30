const todoList = [
    {
        id: 0,
        label: 'Complete online JavaScript course',
        done: true
    },
    {
        id: 1,
        label: 'Jog around the park 3x',
        done: false
    },
    {
        id: 2,
        label: '10 minutes meditation',
        done: false
    },
    {
        id: 3,
        label: 'Read for 1 hour',
        done: false
    },
    {
        id: 4,
        label: 'Pickup groceries',
        done: false
    },
    {
        id: 5,
        label: 'Complete Todo App on Frontend Mentor',
        done: false
    },
];

const app = new Vue({
    el: "#app",
    data: {
        darkMode: false,
        todos: [],
        nextTodoId: 0,
        filter: null,
        addTodoLabel: '',
        addTodoDone: false,
        showAttribution: false
    },
    computed: {
        filteredTodos () {
            const self = this;
            let filteredTodos = this.todos;

            if (this.filter !== null) {
                filteredTodos = this.todos.filter(function(todo) {
                    return todo.done === self.filter;
                })
            }

            return filteredTodos;
        },
        activeTodos () {
            return this.todos.filter(function(todo) {
                return todo.done === false;
            })
        },
        doneTodos () {
            return this.todos.filter(function(todo) {
                return todo.done === true;
            })
        }
    },
    methods: {
        addTodo(e) {
            e.preventDefault()
            this.todos.unshift({
              id: this.nextTodoId,
              label: this.addTodoLabel,
              done: this.addTodoDone
            });
            this.nextTodoId += 1;
            this.addTodoLabel = '';
            this.addTodoDone = false;
        },
        removeTodo (targetTodo) {
            this.todos = this.todos.filter(function(todo) {
                return todo.id !== targetTodo.id;
            })
        },
        removeDoneTodos () {
            if(confirm('You are about to delete ' + this.doneTodos.length + ' item' + (this.doneTodos.length > 1 ? 's' : '') + '.\nAre you sure you want to proceed ?')) {
                this.todos = this.activeTodos;
            }
        },
        setFilter(filter) {
            this.filter = filter;
        },
    },
    mounted () {
        // Load fake todos
        this.todos = todoList
        // Find highest todo id and set nextToDoId
        const ids = this.todos.map(function(todo) {
            return todo.id;
        })
        this.nextTodoId = ids.reduce(function(a,b) {
            return Math.max(a,b);
        }) + 1
    }
});