// SISTEMA DE AUTENTICAÇÃO CORRIGIDO
class SimpleAuthSystem {
    constructor() {
        console.log('🔧 Inicializando sistema de autenticação...');
        this.users = this.loadUsersFromStorage();
        
        if (this.users.length === 0) {
            console.log('📝 Nenhum usuário encontrado. Criando usuários padrão...');
            this.initializeDefaultUsers();
        } else {
            console.log(`✅ ${this.users.length} usuário(s) carregado(s) do storage`);
        }
    }

    loadUsersFromStorage() {
        try {
            const storedUsers = localStorage.getItem('system_users');
            if (storedUsers) {
                const users = JSON.parse(storedUsers);
                console.log('📦 Usuários carregados:', users);
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
            console.log('💾 Usuários salvos no storage:', this.users);
        } catch (error) {
            console.error('❌ Erro ao salvar usuários:', error);
        }
    }

    initializeDefaultUsers() {
        console.log('👥 Criando usuários padrão...');
        
        // USUÁRIOS PADRÃO - CORRIGIDOS
        this.users = [
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
                type: "admin", // MUDEI PARA "admin" EM VEZ DE "manager"
                name: "Administrador",
                email: "admin@empresa.com",
                createdAt: new Date().toISOString()
            }
        ];

        this.saveUsersToStorage();
        console.log("✅ Usuários padrão criados com sucesso!");
        console.log("📋 Lista de usuários:", this.users);
    }

    authenticate(username, password) {
        console.log(`🔐 Tentando autenticar: ${username}`);
        
        const user = this.users.find(u => u.username === username);
        console.log('👤 Usuário encontrado:', user);

        if (!user) {
            console.log('❌ Usuário não encontrado');
            return { success: false, message: "Usuário não encontrado" };
        }

        if (user.password === password) {
            console.log('✅ Senha correta! Login bem-sucedido');
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

    // Método para forçar recriação dos usuários (para debug)
    forceResetUsers() {
        console.log('🔄 Forçando reset dos usuários...');
        localStorage.removeItem('system_users');
        this.initializeDefaultUsers();
    }
}

// Inicializar sistema
const authSystem = new SimpleAuthSystem();

function login(username, password) {
    console.log(`🚀 Iniciando login para: ${username}`);
    
    const result = authSystem.authenticate(username, password);
    
    if (result.success) {
        // Limpar qualquer sessão anterior
        localStorage.clear();
        
        // Salvar dados do usuário no localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userType', result.user.type);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('userName', result.user.name);
        localStorage.setItem('userId', result.user.id);
        
        if (result.user.email) {
            localStorage.setItem('userEmail', result.user.email);
        }
        
        console.log('✅ Dados salvos no localStorage:', {
            loggedIn: localStorage.getItem('loggedIn'),
            userType: localStorage.getItem('userType'),
            username: localStorage.getItem('username'),
            userName: localStorage.getItem('userName')
        });
        
        alert('✅ Login realizado com sucesso!');
        
        // REDIRECIONAMENTO CORRIGIDO - Baseado no tipo de usuário
        const userType = result.user.type;
        console.log(`🎯 Redirecionando usuário tipo: ${userType}`);
        
        switch(userType) {
            case 'manager':
            case 'admin':
                console.log('👔 Redirecionando para dashboard de gerente/admin');
                window.location.href = 'gerente.html';
                break;
            case 'employee':
                console.log('👷 Redirecionando para dashboard de funcionário');
                window.location.href = 'funcionario.html';
                break;
            default:
                console.log('❓ Tipo de usuário desconhecido, redirecionando para página padrão');
                window.location.href = 'funcionario.html';
        }
    } else {
        console.log('❌ Falha no login:', result.message);
        alert('❌ Erro no login: ' + result.message);
    }
}

function fillDemoAccount(username, password) {
    document.getElementById('username').value = username;
    document.getElementById('password').value = password;
    console.log(`📝 Preenchendo dados: ${username} / ${password}`);
}

function updateDebugInfo() {
    const debugContent = document.getElementById('debug-content');
    const users = authSystem.loadUsersFromStorage();
    
    let debugHTML = `
        <div>Usuários no sistema: ${users.length}</div>
        <div>Usuários: ${users.map(u => u.username).join(', ')}</div>
        <div>Storage key: ${localStorage.getItem('system_users') ? 'Presente' : 'Ausente'}</div>
        <div>Current loggedIn: ${localStorage.getItem('loggedIn')}</div>
        <div>Current userType: ${localStorage.getItem('userType')}</div>
    `;
    
    debugContent.innerHTML = debugHTML;
}

// Configurar eventos quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Sistema de login carregado!');
    
    // Mostrar informações de debug
    updateDebugInfo();
    
    // Preencher automaticamente com a conta do gerente para facilitar
    fillDemoAccount('gerente', '123456');
    
    // Evento do formulário de login
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            alert('⚠️ Por favor, preencha todos os campos!');
            return;
        }
        
        console.log(`📤 Submetendo login: ${username}`);
        login(username, password);
    });

    // Eventos para as contas de demonstração
    const demoAccounts = document.querySelectorAll('.demo-account');
    demoAccounts.forEach(account => {
        account.addEventListener('click', function() {
            const username = this.getAttribute('data-user');
            const password = this.getAttribute('data-pass');
            fillDemoAccount(username, password);
        });
    });

    // Botão de reset (para debug)
    const debugDiv = document.getElementById('debug-info');
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Resetar Usuários';
    resetBtn.className = 'btn btn-secondary';
    resetBtn.style.marginTop = '10px';
    resetBtn.style.fontSize = '0.8rem';
    resetBtn.style.padding = '0.5rem 1rem';
    resetBtn.addEventListener('click', function() {
        authSystem.forceResetUsers();
        updateDebugInfo();
        alert('🔄 Usuários resetados! Use: funcionario/123456 ou gerente/123456');
        // Preencher com gerente após reset
        fillDemoAccount('gerente', '123456');
    });
    debugDiv.appendChild(resetBtn);

    console.log('✅ Sistema pronto!');
    console.log('👔 Use: gerente / 123456 para acesso de gerente');
    console.log('👤 Use: funcionario / 123456 para acesso de funcionário');
});