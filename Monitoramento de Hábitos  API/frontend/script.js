const API_URL = "http://localhost:3000/habitos";

const formularioHabito = document.getElementById("habit-form");
const listaHabitos = document.querySelector(".habit-list ul");

async function buscarHabitos() {
    try {
        const resposta = await fetch(API_URL);
        const habitos = await resposta.json();
        exibirHabitos(habitos);
    } catch (erro) {
        console.error("Erro ao buscar hábitos:", erro);
    }
}

function exibirHabitos(habitos) {
    listaHabitos.innerHTML = "";
    habitos.forEach(habito => {
        const item = document.createElement("li");
        item.textContent = `${habito.habito} - Meta: ${habito.meta}`;
        
        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.addEventListener("click", () => excluirHabito(habito.id));
        
        item.appendChild(botaoExcluir);
        listaHabitos.appendChild(item);
    });
}

async function adicionarHabito(evento) {
    evento.preventDefault();
    const habito = document.getElementById("habit-name").value;
    const meta = document.getElementById("habit-goal").value;

    if (!habito || !meta) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novoHabito = { habito, meta };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoHabito),
        });

        if (resposta.ok) {
            buscarHabitos();
            formularioHabito.reset();
        } else {
            alert("Erro ao adicionar hábito.");
        }
    } catch (erro) {
        alert("Erro na requisição.");
    }
}

async function excluirHabito(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (resposta.ok) {
            buscarHabitos();
        } else {
            alert("Erro ao excluir hábito.");
        }
    } catch (erro) {
        alert("Erro na requisição.");
    }
}

formularioHabito.addEventListener("submit", adicionarHabito);
document.addEventListener("DOMContentLoaded", buscarHabitos);


