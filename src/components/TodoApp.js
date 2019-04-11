import React from "react";

import { TodoList } from "./TodoList";
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { AddTodoForm } from "./AddTodoForm";
import { TodoListActions } from "./TodoListActions";

import { addTodo, getTodos } from "../api";

export class TodoApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      taskList: [],
      filter: "all"
    };
  }

  //"Onload" - ler dados em Ajax
  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({ taskList: todos });
      })
      .catch((erro) => {
        console.error("Erro ao obter as tarefas", erro);
      });
  }

  render() {
    let todoItemsAux = [];

    for (let i = 0; i < this.state.taskList.length; i++) {
      let t = this.state.taskList[i];

      if (
        this.state.filter === "all" ||
        (this.state.filter === "done" && t.isComplete === true) ||
        (this.state.filter === "todo" && t.isComplete === false)
      ) {
        todoItemsAux.push(
          <TodoItem
            task={t}
            onDeleteTodo={() => this.handleDeleteTodo(i)}
            onEditTodo={(newText) => this.handleEditTodo(i, newText)}
            onToggleCompleteTodo={() => this.handleToggleComplete(i)}
          />
        );
      }
    }

    return (
      <div>
        <AddTodoForm
          onNewTodo={(newTodoText) => this.handleNewTodo(newTodoText)}
        />

        <TodoCounter
          currentFilter={this.state.filter}
          count={todoItemsAux.length}
        />

        <TodoList>{todoItemsAux}</TodoList>

        <TodoListActions
          currentFilter={this.state.filter}
          onDeleteDone={() => this.handleDeleteDone()}
          onFilterChange={(type) => this.handleSetFilter(type)}
        />
      </div>
    );
  }

  handleSetFilter(type) {
    this.setState({ filter: type });
  }

  handleDeleteDone() {
    this.setState({
      taskList: this.state.taskList.filter((t) => t.isComplete === false)
    });
  }

  handleToggleComplete(index) {
    let aux = this.state.taskList.slice();

    aux[index] = {
      description: aux[index].description,
      isComplete: !aux[index].isComplete
    };

    this.setState({ taskList: aux });
  }

  async handleNewTodo(newTodoText) {
    try {
      let novaTarefa = await addTodo(newTodoText);
      this.setState({
        taskList: [...this.state.taskList, novaTarefa]
      });
    } catch (e) {
      console.error("Erro ao inserir", e);
    }
  }

  handleDeleteTodo(index) {
    let aux = this.state.taskList.slice();

    aux.splice(index, 1);

    this.setState({
      taskList: aux
    });
  }

  handleEditTodo(index, novoTexto) {
    let aux = this.state.taskList.slice();

    aux[index] = {
      description: novoTexto,
      isComplete: aux[index].isComplete
    };

    this.setState({ taskList: aux });
  }
}
