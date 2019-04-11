let linkApi = "https://ipt-ti2-todo.azurewebsites.net";

export function getTodos() {
  return fetch(linkApi + "/api/todos/aluno20451", {
    method: "GET",
    headers: {
      //Quero json
      Accept: "application/json"
    }
  }).then((resposta) => {
    if (resposta.status === 200) {
      return resposta.json();
    } else {
      return Promise.reject(resposta);
    }
  });
}

export async function addTodo(description) {
  let tarefa = {
    description: description
  };

  let resposta = await fetch(linkApi + "/api/todos/aluno20451", {
    method: "POST",
    headers: {
      //enviar json
      "Content-Type": "application/json",
      //quero json
      Accept: "application/json"
    },
    body: JSON.stringify(tarefa)
  });

  //resposta.ok substitui o resposta.status
  if (resposta.ok) {
    let novaTarefa = await resposta.json();

    return novaTarefa;
  } else {
    throw resposta;
  }
}
