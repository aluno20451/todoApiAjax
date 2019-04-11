import React from "react";

/**
 *
 * @param {{ count: number, currentFilter: "all" | "todo" | "done" }} props
 */
export function TodoCounter(props) {
  switch (props.currentFilter) {
    case "all":
      return (
        <p>
          {props.count === 0
            ? "Não existem tarefas!"
            : "Tens um total de " + props.count + " tarefas!"}
        </p>
      );
    case "done":
      return (
        <p>
          {props.count === 0
            ? "Não está nada feito!"
            : "Tens " + props.count + " tarefas feitas!"}
        </p>
      );
    case "todo":
      return (
        <p>
          {props.count === 0
            ? "Não tens nada para fazer!"
            : "Tens " + props.count + " tarefas por fazer!"}
        </p>
      );
    default:
      return <p>Hmmm.....</p>;
  }
}
