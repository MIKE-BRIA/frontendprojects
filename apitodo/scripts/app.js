const TodosApp = {
  data() {
    return {
      newTodo: "Learning vue.js",
    };
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
