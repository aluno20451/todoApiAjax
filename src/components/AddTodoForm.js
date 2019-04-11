import React from "react";

/**
 * @augments React.Component<{ onNewTodo(newTodoText: string): void }>
 */
export class AddTodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoText: ""
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.props.onNewTodo(this.state.newTodoText);

    this.setState({ newTodoText: "" });
  }

  handleNewTodoTextChange(evt) {
    this.setState({ newTodoText: evt.target.value });
  }

  render() {
    return (
      <form onSubmit={(evt) => this.handleSubmit(evt)}>
        <input
          type="text"
          value={this.state.newTodoText}
          onChange={(evt) => this.handleNewTodoTextChange(evt)}
          required
        />
        <button type="submit">
          <span role="img" aria-label="Adicionar">
            ➕
          </span>
        </button>
      </form>
    );
  }
}
