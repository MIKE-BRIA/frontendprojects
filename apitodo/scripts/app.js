const TodosApp = {
  data() {
    return {
      todos: [],
      enteredTodoText: "",
      editedTodoid: null,
    };
  },
  methods: {
    //saving todos
    saveTodo(e) {
      //updating an existing todo
      e.preventDefault();

      if (this.editedTodoId) {
        const todoIndex = this.todos.findIndex((todoItem) => {
          return todoItem.id === this.editedTodoId;
        });

        const updatedTodoItem = {
          id: this.todos[todoIndex].id,
          text: this.enteredTodoText,
        };

        this.todos[todoIndex] = updatedTodoItem;
      } else {
        //creating a new todo item
        const newTodo = {
          text: this.enteredTodoText,
          id: new Date().toISOString,
        };
        this.todos.push(newTodo);
      }
      this.enteredTodoText = "";
    },

    //editing todo item
    startEditTodo(todoId) {
      this.editedTodoid = todoId;

      const todo = this.todos.find((todoItem) => {
        return todoItem.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
