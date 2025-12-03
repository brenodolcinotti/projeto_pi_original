let dadosManutencao = [];
let solicitacoes = [];

async function buscarDados() {

    try{
        const response = await fetch("http://localhost:1111/manutencao");
        const data = await response.json();

        const response1 = await fetch("http://localhost:1111/nova-solicitacao");
        const data1 = await response1.json();

        solicitacoes = data1
        dadosManutencao = data

        const pendentes = solicitacoes.filter(s => s.status === "PENDENTE").length;
        const concluidas = solicitacoes.filter(s => s.status === "CONCLUIDA").length;

        document.getElementById("manutencao-concluida").innerHTML = concluidas
        document.getElementById("manutencao-pendente").innerHTML = pendentes

        console.log(dadosManutencao)
    } catch (error) {
        console.log(error)
    }
}

function atualizarTabelas(){
    const tbody1 = document.getElementById("maintenance-history-body");
    if(!tbody1) return;
    const tbody2 = document.getElementById("maintenance-pending-body");
    if(!tbody2) return;

    tbody1.innerHTML = '';
    tbody2.innerHTML = '';

    const solicitacoesConcluidas = solicitacoes.filter(s => s.status === "CONCLUIDA");
    const solicitacoesPendentes = solicitacoes.filter(s => s.status === "PENDENTE");

    console.log(solicitacoesConcluidas)

    solicitacoesConcluidas.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.item}</td>
                    <td>${s.resposavel}</td>
                    <td>${s.data_solicitacao}</td>
                    <td>${s.setor}</td>
                    <td>${s.observacao}</td>
                    <td><span class="status-badge status-low">${s.status}</span></td>
                `;
                tbody1.appendChild(row);
            });

        solicitacoesPendentes.forEach(s => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${s.id}</td>
                    <td>${s.item}</td>
                    <td>${s.resposavel}</td>
                    <td>${s.data_solicitacao}</td>
                    <td>${s.setor}</td>
                    <td>${s.observacao}</td>
                    <td><span class="status-badge status-low">${s.status}</span></td>
                `;
                tbody2.appendChild(row);
            });
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("maintenance-register-form").addEventListener("submit", function(e) {
        e.preventDefault();

        inserirManutencao = [];

        const item = document.getElementById('maintenance-os-number').value;
        const tipo = document.getElementById("maintenance-type").value;
        const data_manutencao = document.getElementById("maintenance-date").value;
        const responsavel = document.getElementById("maintenance-technician").value.trim();
        const tempo_manutencao = document.getElementById("maintenance-duration").value;
        const observacao = document.getElementById("maintenance-problem").value;
        const setor = document.getElementById("maintenance-status").value;

        if(!responsavel){
                alert("Preencha o campo");
                document.getElementById("maintenance-technician").focus();
                return;
        }

        inserirManutencao = {
            item: item,
            tempo_manutencao: tempo_manutencao,
            data_manutencao: data_manutencao,
            setor: setor,
            observacao: observacao,
            responsavel: responsavel,
            tipo:tipo
    }
        async function cadastrarDados(){

        try {
        const response = await fetch("http://localhost:1111/manutencao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inserirManutencao)
        })
        } catch (error) {
            console.log(error)   
        }
        }

    cadastrarDados();

    })
})


buscarDados()