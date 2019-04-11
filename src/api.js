let linkApi = "https://ipt-ti2-todo.azurewebsites.net";

export function getTodos() {
  return fetch(linkApi + "/api/todos/afecarvalho", {
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

// main
// TO DO -- ler tarefas através de AJAX e apresentar no ecrã
getTodos()
  .then((arrayTarefas) => {
    mostraTarefas(arrayTarefas);
  })
  .catch((erro) => {
    console.error("És um nabo do caraças", erro);
  });

document.querySelector("#addTodoForm").addEventListener("submit", (evt) => {
  // TO DO -- adicionar uma tarefa através de AJAX e apresentar no ecrã
  evt.preventDefault();

  let texto = document.querySelector("#todoText").value;

  addTodo(texto).then((novaTarefa) => {
    let lista = document.querySelector("#listaTarefas");

    adicionaTarefa(lista, novaTarefa);
  });
});

function mostraTarefas(tarefas) {
  let lista = document.querySelector("#listaTarefas");
  for (let tarefa of tarefas) {
    adicionaTarefa(lista, tarefa);
  }
}

function adicionaTarefa(lista, tarefa) {
  let liAux = document.createElement("li");
  liAux.textContent = tarefa.description;
  lista.appendChild(liAux);
}
