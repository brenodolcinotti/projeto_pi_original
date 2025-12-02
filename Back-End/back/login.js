// SISTEMA DE AUTENTICAÇÃO - VERSÃO GARANTIDA
class SimpleAuthSystem {
    constructor() {
        console.log('🔧 Inicializando sistema de autenticação...');
        // SEMPRE FORÇA RECRIAÇÃO DOS USUÁRIOS PARA GARANTIR
        this.forceResetUsersGuaranteed();
        this.users = this.loadUsersFromStorage();
    }

    loadUsersFromStorage() {
        try {
            const storedUsers = localStorage.getItem('system_users');
            if (storedUsers) {
                const users = JSON.parse(storedUsers);
                console.log('📦 Usuários carregados:', users.map(u => u.username));
                return users;
            }
        } catch (error) {
            console.error('❌ Erro ao carregar usuários:', error);
        }
        return [];
    }

    saveUsersToStorage() {
        try {
            localStorage.setItem('system_users', JSON.stringify(this.users));
            console.log('💾 Usuários salvos:', this.users.map(u => u.username));
        } catch (error) {
            console.error('❌ Erro ao salvar usuários:', error);
        }
    }

    // FUNÇÃO GARANTIDA - SEMPRE CRIA OS 4 USUÁRIOS
    forceResetUsersGuaranteed() {
        console.log('🔄 Garantindo criação dos 4 usuários...');
        
        const defaultUsers = [
            {
                id: 1,
                username: "funcionario",
                password: "123456",
                type: "employee",
                name: "João Silva",
                email: "funcionario@empresa.com",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                username: "gerente",
                password: "123456",
                type: "manager",
                name: "Maria Santos",
                email: "gerente@empresa.com",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                username: "admin",
                password: "123456",
                type: "admin",
                name: "Administrador",
                email: "admin@empresa.com",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                username: "manutencao",
                password: "123456",
                type: "maintenance",
                name: "Carlos Técnico",
                email: "manutencao@empresa.com",
                createdAt: new Date().toISOString()
            }
        ];

        // SEMPRE SALVA OS 4 USUÁRIOS
        localStorage.setItem('system_users', JSON.stringify(defaultUsers));
        console.log('✅ 4 usuários garantidos no localStorage');
        return defaultUsers;
    }

    authenticate(username, password) {
        console.log(`🔐 Autenticando: ${username}`);
        
        // Carrega usuários do localStorage (sempre atual)
        this.users = this.loadUsersFromStorage();
        const user = this.users.find(u => u.username === username);
        
        if (!user) {
            console.log(`❌ Usuário "${username}" não encontrado. Usuários disponíveis:`, this.users.map(u => u.username));
            return { success: false, message: "Usuário não encontrado" };
        }

        if (user.password === password) {
            console.log(`✅ Login bem-sucedido para: ${username} (${user.type})`);
            return { 
                success: true, 
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    type: user.type,
                    email: user.email
                }
<<<<<<< HEAD
                
                console.log('✅ Dados salvos no localStorage:', {
                    loggedIn: localStorage.getItem('loggedIn'),
                    userType: localStorage.getItem('userType'),
                    username: localStorage.getItem('username')
                });
                
                alert('✅ Login realizado com sucesso!');
                
                // Redirecionar para a página principal
                window.location.href = 'funcionario.html';
            } else {
                console.log('❌ Falha no login:', result.message);
                alert('❌ Erro no login: ' + result.message);
            }
=======
            };
        } else {
            console.log('❌ Senha incorreta');
            return { success: false, message: "Senha incorreta" };
>>>>>>> 1663993bb96824305256f58854dd6ae5e4658c67
        }
    }
}

// INICIALIZAÇÃO GARANTIDA
const authSystem = new SimpleAuthSystem();

function login(username, password) {
    console.log(`🚀 Login solicitado: ${username}`);
    
    const result = authSystem.authenticate(username, password);
    
    if (result.success) {
        // Limpa e salva dados
        localStorage.clear();
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userType', result.user.type);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('userId', result.user.id);
        
        console.log('✅ Dados salvos. userType:', result.user.type);
        
        // Redirecionamento
        switch(result.user.type) {
            case 'manager':
            case 'admin':
                console.log('👔 Redirecionando para gerente.html');
                window.location.href = 'gerente.html';
                break;
            case 'employee':
                console.log('👷 Redirecionando para funcionario.html');
                window.location.href = 'funcionario.html';
                break;
            case 'maintenance':
                console.log('🔧 Redirecionando para manutencao.html');
                window.location.href = 'manutencao.html';
                break;
            default:
                console.log('❓ Redirecionando padrão para funcionario.html');
                window.location.href = 'funcionario.html';
        }
    } else {
        console.log('❌ Falha no login');
        alert('❌ ' + result.message);
    }
}

function fillDemoAccount(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
}

function updateDebugInfo() {
    const debugContent = document.getElementById('debug-content');
    const users = authSystem.loadUsersFromStorage();
    
    debugContent.innerHTML = `
        <div>Usuários: ${users.length}</div>
        <div>${users.map(u => `<div>${u.username} (${u.type})</div>`).join('')}</div>
        <div>Storage: ${localStorage.getItem('system_users') ? 'OK' : 'Vazio'}</div>
    `;
}

// QUANDO A PÁGINA CARREGAR
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Login carregado');
    
    // Mostra debug info
    updateDebugInfo();
    
    // Preenche com manutencao automaticamente
    fillDemoAccount('manutencao', '123456');
    
    // Configura formulário
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('⚠️ Preencha todos os campos!');
            return;
        }
        
        login(username, password);
    });

    // Configura contas demo
    document.querySelectorAll('.demo-account').forEach(account => {
        account.addEventListener('click', function() {
            const username = this.getAttribute('data-user');
            const password = this.getAttribute('data-pass');
            fillDemoAccount(username, password);
        });
    });

    // Botão de reset
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Forçar Recriação de Usuários';
    resetBtn.className = 'btn btn-secondary';
    resetBtn.style.cssText = 'margin-top:10px; font-size:0.8rem; padding:0.5rem 1rem; width:100%;';
    resetBtn.addEventListener('click', function() {
        localStorage.clear();
        authSystem.forceResetUsersGuaranteed();
        updateDebugInfo();
        alert('🔄 Usuários recriados! Agora tente login com "manutencao" / "123456"');
        fillDemoAccount('manutencao', '123456');
    });
    document.getElementById('debug-info').appendChild(resetBtn);
    
    console.log('✅ Login pronto para uso');
    console.log('🔧 Use: manutencao / 123456');
});