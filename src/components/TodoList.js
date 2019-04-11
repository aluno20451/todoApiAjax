import React from "react";

export class TodoList extends React.Component {
  render() {
    return <ul className="lista-todos">{this.props.children}</ul>;
  }
}
