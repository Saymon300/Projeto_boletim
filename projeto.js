let aluno = {
    nome: "Aluno(a)",
    idade: 15,
    notas: [8.5, 6.0, 7.2],

    calcularMedia() {
        let soma = this.notas.reduce((acc, num) => acc + num, 0);
        return soma / this.notas.length;
    }
};

const listaNotasEl = document.getElementById("listaNotas");
const mediaEl = document.getElementById("media");
const situacaoEl = document.getElementById("situacao");

document.getElementById("nomeAluno").textContent = aluno.nome;
document.getElementById("idadeAluno").textContent = aluno.idade;

document.getElementById("btnAdicionarNota").addEventListener("click", adicionarNota);

function verificarSituacao(media) {
    return media >= 7 ? "Aprovado(a)" : "Reprovado(a)";
}

function renderizar() {
    listaNotasEl.innerHTML = "";

    aluno.notas.forEach((nota, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = nota.toFixed(1);
        li.appendChild(span);

        let remover = document.createElement("button");
        remover.type = "button";
        remover.textContent = "Remover";
        remover.addEventListener("click", () => {
            aluno.notas.splice(index, 1);
            renderizar();
        });

        li.appendChild(remover);
        listaNotasEl.appendChild(li);
    });

    if (aluno.notas.length === 0) {
        mediaEl.textContent = "—";
        situacaoEl.textContent = "—";
        return;
    }

    let media = aluno.calcularMedia();
    mediaEl.textContent = media.toFixed(2);
    situacaoEl.textContent = verificarSituacao(media);
}

function adicionarNota() {
    let input = document.getElementById("txtNota");
    let valor = Number(input.value);

    if (input.value.trim() === "" || isNaN(valor) || valor < 0 || valor > 10) {
        alert("Digite uma nota válida entre 0 e 10.");
        return;
    }

    aluno.notas.push(valor);
    input.value = "";
    renderizar();
}

renderizar();
