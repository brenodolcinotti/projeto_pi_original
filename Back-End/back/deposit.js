var entradaMaterial = false;
var saidaMaterial = false;
let solicitacoes = [];

// VERIFICAR LOGIN E CONFIGURAR INTERFACE
        document.addEventListener('DOMContentLoaded', function() {
            console.log('=== VERIFICANDO LOGIN ===');
            
            // Para teste, defina manualmente no console:
            // localStorage.setItem('loggedIn', 'true');
            // localStorage.setItem('userType', 'employee'); // ou 'manager'
            // localStorage.setItem('username', 'João Silva');
            
            if (localStorage.getItem('loggedIn') !== 'true') {
                alert('⚠️ Você precisa fazer login primeiro!');
                window.location.href = './login.html';
                return;
            }

            const username = localStorage.getItem('username') || 'Usuário';
            const userType = localStorage.getItem('userType') || 'employee';

            console.log('Configurando interface para:', username, 'tipo:', userType);

            // Atualizar informações do usuário
            document.getElementById('user-name').textContent = username;
            
            const userTypeDisplay = userType === 'manager' ? 'Gerente' : 'Funcionário';
            document.getElementById('user-type-display').textContent = userTypeDisplay;
            document.getElementById('welcome-user').textContent = `Bem-vindo, ${username}!`;
            document.getElementById('welcome-employee').textContent = `Bem-vindo, ${username}!`;

            // Configurar interface baseada no tipo de usuário
            if (userType === 'manager') {
                console.log('🎯 Ativando modo GERENTE');
                activateManagerMode();
                initializeManagerCharts();
                setupManagerEventListeners();
            } else {
                console.log('👤 Ativando modo FUNCIONÁRIO');
                activateEmployeeMode();
            }

            setupCommonEventListeners();
        });

        function activateManagerMode() {
            const header = document.getElementById('main-header');
            const logoIcon = document.getElementById('logo-icon');
            const userInfo = document.getElementById('user-info');
            const userTypeDisplay = document.getElementById('user-type-display');
            
            header.classList.add('manager-mode');
            logoIcon.classList.add('manager');
            userInfo.classList.add('manager');
            userTypeDisplay.classList.add('manager');
            
            document.getElementById('manager-dashboard').style.display = 'block';
            document.getElementById('employee-dashboard').style.display = 'none';
            document.getElementById('employee-interface').style.display = 'none';
            
            console.log('✅ Modo gerente ativado com sucesso!');
        }

     function activateEmployeeMode() {
            const header = document.getElementById('main-header');
            const logoIcon = document.getElementById('logo-icon');
            const userInfo = document.getElementById('user-info');
            const userTypeDisplay = document.getElementById('user-type-display');
            
            header.classList.add('employee-mode');
            logoIcon.classList.add('employee');
            userInfo.classList.add('employee');
            userTypeDisplay.classList.add('employee');
            
            document.getElementById('manager-dashboard').style.display = 'none';
            document.getElementById('employee-dashboard').style.display = 'block';
            document.getElementById('employee-interface').style.display = 'none';
            
            setupEmployeeEventListeners();
            // 🎯 ADIÇÃO AQUI: Define 'movimentacao' como a seção inicial ao carregar
            // (Assumindo que 'movimentacao' é a seção principal do funcionário)
            switchEmployeeSection('manutencao'); 
            
            console.log('✅ Modo funcionário ativado com sucesso!');
        }

// ... o restante do seu código permanece o mesmo.

        function initializeManagerCharts() {
            // Gráfico de movimentações por categoria
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            if (categoryCtx) {
                new Chart(categoryCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Ferramentas', 'Eletrônicos', 'Escritório', 'Equipamentos'],
                        datasets: [{
                            label: 'Entradas',
                            data: [65, 59, 80, 81],
                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        }, {
                            label: 'Saídas',
                            data: [28, 48, 40, 19],
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        }
                    }
                });
            }

            // Gráfico de status do estoque
            const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
            if (inventoryCtx) {
                new Chart(inventoryCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Normal', 'Atenção', 'Crítico'],
                        datasets: [{
                            data: [65, 25, 10],
                            backgroundColor: [
                                'rgba(16, 185, 129, 0.8)',
                                'rgba(245, 158, 11, 0.8)',
                                'rgba(239, 68, 68, 0.8)'
                            ],
                        }]
                    }
                });
            }
        }

        function setupManagerEventListeners() {
            // Controles do dashboard do gerente
            document.getElementById('btn-movimentacoes').addEventListener('click', function() {
                switchSection('movimentacoes');
            });

            // Botões de transação do gerente
            document.getElementById('manager-deposit-btn').addEventListener('click', function() {
                setManagerTransactionType('deposit');
            });
            
            document.getElementById('manager-withdrawal-btn').addEventListener('click', function() {
                setManagerTransactionType('withdrawal');
            });

            // Formulário de transação do gerente
            document.getElementById('manager-transaction-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const material = document.getElementById('manager-material').value;
                const quantity = document.getElementById('manager-quantity').value;
                const location = document.getElementById('manager-location').value;
                const responsible = document.getElementById('manager-responsible').value;
                const priority = document.getElementById('manager-priority').value;
                const cost = document.getElementById('manager-cost').value;
                
                if (!material || !quantity || !location || !responsible || !cost) {
                    alert('Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                const transactionType = document.getElementById('manager-deposit-btn').classList.contains('active') ? 'Entrada' : 'Retirada';
                const totalCost = (quantity * cost).toFixed(2);
                
                alert(`✅ ${transactionType} de material registrada com sucesso!\n\nMaterial: ${material}\nQuantidade: ${quantity}\nCusto Total: R$ ${totalCost}\nPrioridade: ${priority.toUpperCase()}`);
                this.reset();
            });

            // Formulário de manutenção do gerente
            document.getElementById('maintenance-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const equipment = document.getElementById('maintenance-equipment').value;
                const type = document.getElementById('maintenance-type').value;
                const priority = document.getElementById('maintenance-priority').value;
                const description = document.getElementById('maintenance-description').value;
                
                if (!equipment || !type || !priority || !description) {
                    alert('Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                alert(`✅ Ordem de Serviço criada com sucesso!\n\nEquipamento: ${equipment}\nTipo: ${type}\nPrioridade: ${priority.toUpperCase()}`);
                this.reset();
            });

            // Botão de gerar PDF
            document.getElementById('generate-pdf-btn').addEventListener('click', function() {
                generatePDF();
            });
        }

        function setupEmployeeEventListeners() {
            // Controles do dashboard do funcionário

            document.getElementById('employee-btn-movimentacao').addEventListener('click', function() {
                switchEmployeeSection('movimentacao');
            });

            document.getElementById('employee-btn-manutencao').addEventListener('click', function() {
                switchEmployeeSection('manutencao');
                alert("manuta");
            });

            // Botões de transação do funcionário
            document.getElementById('employee-deposit-btn').addEventListener('click', function() {
                entradaMaterial = true;
                setEmployeeTransactionType('deposit');
            });
            
            document.getElementById('employee-withdrawal-btn').addEventListener('click', function() {
                entradaMaterial = false;
                setEmployeeTransactionType('withdrawal');
            });

            // Formulário de transação do funcionário
           document.getElementById('employee-transaction-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome_produto = document.getElementById('employee-transaction-name').value;
        const quantidade = document.getElementById('employee-transaction-quantity').value;
        const local = document.getElementById('employee-transaction-location').value;
        const date = document.getElementById('employee-transaction-date').value;
        const observacao = document.getElementById('employee-transaction-notes').value;
        
        // Corrigido para verificar apenas campos obrigatórios (produto, quantidade, local)
        if (!nome_produto.trim() || !quantidade.trim() || !local.trim()|| !date.trim()) {
            alert('Por favor, preencha os campos obrigatórios: Produto, Quantidade e Local!');
            return;
        }
        
        const transactionType = document.getElementById('employee-deposit-btn').classList.contains('active') ? 'Entrada' : 'Retirada';
        
        // Estruturando os dados como Objeto JSON (melhor prática para APIs)
        const dadosEntrada = {
            nome_produto: nome_produto, 
            quantidade: quantidade, 
            setor: local, 
            data_entrada: date, 
            observacao: observacao,
            // tipo_transacao: transactionType // Adicionando o tipo de transação
        };

        const dadosSaida = {
            nome_produto: nome_produto, 
            quantidade: quantidade, 
            setor: local, 
            data_saida: date, 
            observacao: observacao
        }

        const formElement = this; // Captura o elemento do formulário para resetar depois

       const handleSubmit = async () => {

    // Inicializar como null garante que a variável existe, mas tem um valor seguro
    let response = null; // Alteração mínima aqui

    try {
        if (entradaMaterial) {
            response = await fetch("http://localhost:1111/entrada-estoque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosEntrada)
            });
        } else {
            response = await fetch("http://localhost:1111/saida-estoque", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosSaida)
            });
        }

        // Se a requisição foi feita, mas o status HTTP é de erro (4xx ou 5xx)
        if (!response.ok) {
            // Lemos a mensagem de erro do servidor para dar um feedback melhor
            const erroData = await response.json().catch(() => ({})); 
            const mensagemErro = erroData.message || `Erro de servidor: ${response.status}`;
            
            // Forçamos a exceção, que será capturada pelo bloco catch
            throw new Error(mensagemErro);
        }

        // Se response.ok for true (status 2xx)
        const data = await response.json();
        console.log('Resposta da API:', data);
        alert(`Sucesso! Transação registrada.`);

        // Redefine o formulário APÓS o sucesso do envio
        // Nota: Garanta que 'formElement' esteja no escopo, ou use e.target.reset() 
        // se a função for chamada a partir de um evento de formulário.
        if (formElement) formElement.reset();

    } catch (error) {
        // Este bloco captura:
        // 1. Erros de rede (fetch falhou totalmente)
        // 2. Erros de status HTTP (4xx/5xx) que foram jogados pelo 'throw new Error'
        
        console.error('Erro ao enviar a transação:', error);
        
        // Exibe a mensagem de erro capturada (que pode ser a mensagem do servidor)
        alert(`Falha ao registrar a transação. Detalhes: ${error.message || 'Verifique o console e o status do servidor.'}`);
    }
}

        // 3. CHAMA A FUNÇÃO DIRETAMENTE (Remove useEffect)
        handleSubmit();
    });
            // Formulário de manutenção do funcionário
            document.getElementById('employee-maintenance-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const equipment = document.getElementById('employee-maintenance-equipment').value;
                const type = document.getElementById('employee-maintenance-type').value;
                const priority = document.getElementById('employee-maintenance-priority').value;
                const description = document.getElementById('employee-maintenance-description').value;
                
                if (!equipment || !type || !priority || !description) {
                    alert('Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                alert(`✅ Solicitação de manutenção enviada com sucesso!\n\nEquipamento: ${equipment}\nTipo: ${type}\nPrioridade: ${priority.toUpperCase()}`);
                this.reset();
            });

            // Formulário de solicitação do funcionário
            document.getElementById('employee-request-form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const material = document.getElementById('employee-material').value;
                const quantity = document.getElementById('employee-quantity').value;
                const project = document.getElementById('employee-project').value;
                const urgency = document.getElementById('employee-urgency').value;
                const justification = document.getElementById('employee-justification').value;
                
                if (!material || !quantity || !project || !justification) {
                    alert('Por favor, preencha todos os campos obrigatórios!');
                    return;
                }
                
                alert(`✅ Solicitação enviada com sucesso!\n\nMaterial: ${material}\nQuantidade: ${quantity}\nProjeto: ${project}\nUrgência: ${urgency.toUpperCase()}`);
                this.reset();
            });

            // Busca no estoque
            document.getElementById('employee-search-stock').addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const inventoryItems = document.querySelectorAll('.inventory-item');
                
                inventoryItems.forEach(item => {
                    const label = item.querySelector('.inventory-label').textContent.toLowerCase();
                    if (label.includes(searchTerm)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        }

        function setupCommonEventListeners() {
            // Logout
            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.clear();
                window.location.href = './login.html';
            });
        }

        function switchSection(sectionName) {
            // Desativar todas as seções
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Desativar todos os botões
            document.querySelectorAll('.control-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ativar seção e botão correspondentes
            document.getElementById(`section-${sectionName}`).classList.add('active');
            document.getElementById(`btn-${sectionName}`).classList.add('active');
        }


        function switchEmployeeSection(sectionName) {
            // Desativar todas as seções
            document.querySelectorAll('.employee-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Desativar todos os botões
            document.querySelectorAll('.employee-control-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Ativar seção e botão correspondentes
            document.getElementById(`employee-section-${sectionName}`).classList.add('active');
            document.getElementById(`employee-btn-${sectionName}`).classList.add('active');
        
            // ✅ CONTROLE DOS DOIS CARDS
            const cardNova = document.getElementById("card-nova-solicitacao");
            const cardMinhas = document.getElementById("card-minhas-solicitacoes");
        
            if (sectionName === "movimentacao") {
                cardNova.style.display = "none";     // esconde Nova Solicitação
                cardMinhas.style.display = "none";   // esconde Minhas Solicitações ✅
            } else {
                cardNova.style.display = "block";    // mostra Nova Solicitação
                cardMinhas.style.display = "block";  // mostra Minhas Solicitações ✅
            }
        
            // sua regra original continua intacta ✅
            if (sectionName === "solicitacoes") {
                loadEmployeeMetrics();
            }
        }



        function setManagerTransactionType(type) {
            const depositBtn = document.getElementById('manager-deposit-btn');
            const withdrawalBtn = document.getElementById('manager-withdrawal-btn');
            const submitBtn = document.getElementById('manager-submit-btn');
            
            if (type === 'deposit') {
                depositBtn.classList.remove('btn-secondary');
                depositBtn.classList.add('active');
                withdrawalBtn.classList.remove('active');
                withdrawalBtn.classList.add('btn-secondary');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Entrada</span>';
                submitBtn.className = 'btn btn-block btn-success';
            } else {
                depositBtn.classList.remove('active');
                depositBtn.classList.add('btn-secondary');
                withdrawalBtn.classList.remove('btn-secondary');
                withdrawalBtn.classList.add('active');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Retirada</span>';
                submitBtn.className = 'btn btn-block btn-danger';
            }
        }

        function setEmployeeTransactionType(type) {
            const depositBtn = document.getElementById('employee-deposit-btn');
            const withdrawalBtn = document.getElementById('employee-withdrawal-btn');
            const submitBtn = document.getElementById('employee-transaction-submit-btn');
            
            if (type === 'deposit') {
                depositBtn.classList.remove('btn-secondary');
                depositBtn.classList.add('active');
                withdrawalBtn.classList.remove('active');
                withdrawalBtn.classList.add('btn-secondary');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Entrada</span>';
                submitBtn.className = 'btn btn-block btn-success';
            } else {
                depositBtn.classList.remove('active');
                depositBtn.classList.add('btn-secondary');
                withdrawalBtn.classList.remove('btn-secondary');
                withdrawalBtn.classList.add('active');
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i><span>Registrar Retirada</span>';
                submitBtn.className = 'btn btn-block btn-danger';
            }
        }

        function solicitarMaterial(material) {
            document.getElementById('employee-material').value = material;
            document.getElementById('employee-quantity').value = 1;
            switchEmployeeSection('nova-solicitacao');
            document.getElementById('employee-justification').focus();
        }

        function solicitarManutencao(tipo) {
            document.getElementById('employee-maintenance-equipment').value = tipo.toLowerCase();
            document.getElementById('employee-maintenance-priority').value = 'alta';
            switchEmployeeSection('manutencao');
            document.getElementById('employee-maintenance-description').focus();
        }

        // Função para gerar PDF
        function generatePDF() {
            // Verificar se jsPDF está disponível
            if (typeof window.jspdf !== 'undefined') {
                const { jsPDF } = window.jspdf;
                
                // Criar um novo documento PDF
                const doc = new jsPDF();
                
                // Adicionar título
                doc.setFontSize(20);
                doc.setTextColor(40, 40, 40);
                doc.text('Relatório do Sistema de Logística', 20, 30);
                
                // Adicionar data e hora
                const now = new Date();
                const dateTime = now.toLocaleString('pt-BR');
                doc.setFontSize(12);
                doc.setTextColor(100, 100, 100);
                doc.text(`Gerado em: ${dateTime}`, 20, 45);
                
                // Adicionar informações do usuário
                const username = localStorage.getItem('username') || 'Usuário';
                doc.text(`Gerado por: ${username}`, 20, 55);
                
                // Adicionar métricas principais
                doc.setFontSize(16);
                doc.setTextColor(40, 40, 40);
                doc.text('Métricas Principais', 20, 75);
                
                doc.setFontSize(12);
                doc.text(`• Valor Total em Estoque: R$ 284.500,00`, 25, 90);
                doc.text(`• Giro de Estoque: 3.2x`, 25, 100);
                doc.text(`• Itens em Estoque: 1.247`, 25, 110);
                doc.text(`• Solicitações de Manutenção: 12`, 25, 120);
                
                // Adicionar alertas
                doc.setFontSize(16);
                doc.setTextColor(40, 40, 40);
                doc.text('Alertas do Sistema', 20, 140);
                
                doc.setFontSize(12);
                doc.setTextColor(220, 50, 50);
                doc.text(`• Estoque Crítico: Componentes Eletrônicos abaixo do nível mínimo`, 25, 155);
                
                // Adicionar movimentações recentes
                doc.setFontSize(16);
                doc.setTextColor(40, 40, 40);
                doc.text('Movimentações Recentes', 20, 175);
                
                doc.setFontSize(10);
                doc.setTextColor(40, 40, 40);
                doc.text('Data/Hora', 25, 190);
                doc.text('Usuário', 60, 190);
                doc.text('Tipo', 90, 190);
                doc.text('Material', 115, 190);
                doc.text('Quantidade', 150, 190);
                doc.text('Status', 175, 190);
                
                // Linha divisória
                doc.line(20, 195, 190, 195);
                
                // Dados da tabela
                doc.text('15/10/2023 14:30', 25, 205);
                doc.text('João Silva', 60, 205);
                doc.setTextColor(0, 150, 0);
                doc.text('Entrada', 90, 205);
                doc.setTextColor(40, 40, 40);
                doc.text('Ferramentas', 115, 205);
                doc.text('50', 150, 205);
                doc.setTextColor(0, 150, 0);
                doc.text('Concluído', 175, 205);
                
                doc.setTextColor(40, 40, 40);
                doc.text('15/10/2023 11:15', 25, 215);
                doc.text('Maria Santos', 60, 215);
                doc.setTextColor(220, 50, 50);
                doc.text('Saída', 90, 215);
                doc.setTextColor(40, 40, 40);
                doc.text('Componentes Eletrônicos', 115, 215);
                doc.text('25', 150, 215);
                doc.setTextColor(220, 50, 50);
                doc.text('Pendente', 175, 215);
                
                // Adicionar rodapé
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text('SLA - Sistema de Logística e Armazenamento', 105, 280, null, null, 'right');
                
                // Salvar o PDF
                doc.save('relatorio_sistema_logistica.pdf');
                
                alert('✅ Relatório PDF gerado com sucesso!');
            } else {
                alert('❌ Erro ao gerar PDF. A biblioteca jsPDF não está disponível.');
            }
        }

        // get para pegar os dados de entrada e saida de estoque

async function carregarDadosEntrada() {
    let arrayEntradaMateria = [];
    let arraySaidaMaterial = [];
    let quantidadeEntrada = 0;

    try {
        const response = await fetch("http://localhost:1111/entrada-estoque");
        const response1 = await fetch("http://localhost:1111/saida-estoque")
        if (!response.ok) {
            throw new Error(`Erro de rede: Status ${response.status}`);
        }
         if (!response1.ok) {
            throw new Error(`Erro de rede: Status ${response.status}`);
        }
        const data1 = await response.json(); 
        const data2 = await response1.json();
        
        arrayEntradaMateria = data1;
        arraySaidaMaterial = data2;

        quantidadeEntrada = arrayEntradaMateria.length;
        quantidadeSaida = arraySaidaMaterial.length;

        console.log("Dados carregados com sucesso:", arrayEntradaMateria);
        console.log("Dados carregados com sucesso:", arraySaidaMaterial);
    
        document.getElementById('card-entrada-material').innerHTML = quantidadeEntrada; 
        document.getElementById('card-saida-material').innerHTML = quantidadeSaida; 
        
    } catch (error) {
        console.error(error);
        document.getElementById('card-entrada-material').innerHTML = "-";
        document.getElementById('card-saida-material').innerHTML = "-"; 
    }
}
carregarDadosEntrada();

        //função para puxar do banco 
        async function loadEmployeeMetrics() {
             try {
                const response = await fetch("http://localhost:1111/nova-solicitacao");
                const solicitacoes = await response.json();

                const pendentes = solicitacoes.filter(s => s.status === "PENDENTE").length;
                const aprovadas = solicitacoes.filter(s => s.status === "CONCLUIDA").length;

                console.log(pendentes)
                console.log(aprovadas)

                document.getElementById("metric-pendentes").innerHTML = pendentes;
                document.getElementById("metric-concluidas").innerHTML = aprovadas;

            } catch (error) {
                console.error("Erro ao carregar métricas:", error);
            }
}
loadEmployeeMetrics();
// async function buscarDados() {

//     try{

//         const response1 = await fetch("http://localhost:1111/nova-solicitacao");
//         const data1 = await response1.json();

//         solicitacoes = data1
//         console.log(solicitacoes)
        
//     } catch (error) {
//         console.log(error)
//     }
// }

async function atualizarTabelas() {
    let solicitacoes = []; // Renomeei para 'solicitacoes' para consistência
    try {
        const response1 = await fetch("http://localhost:1111/nova-solicitacao");

        if (!response1.ok) {
            throw new Error("Erro ao buscar dados da API");
        }

        const data1 = await response1.json();
        solicitacoes = data1;

        console.log("Dados recebidos:", solicitacoes);

    } catch (error) {
        console.log("Erro no fetch:", error);
        return; 
    }

    // Corrigido o ID do tbody
    const tbody1 = document.getElementById("solicitacao-funcionario"); 

    if (!tbody1) {
        console.log("ERRO: Tbody não encontrado!");
        return;
    }

    // 1. LIMPAR A TABELA ANTES DE INSERIR NOVOS DADOS
    tbody1.innerHTML = ''; 

    // 2. Filtro (Opcional, se precisar mostrar APENAS 'CONCLUIDA's)
    // const solicitacoesConcluidas = solicitacoes.filter(s => s.status === "CONCLUIDA");
    
    solicitacoes.forEach(s => { // Usa 'solicitacoes' ou 'solicitacoesConcluidas'
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
}

atualizarTabelas();
// buscarDados();

        