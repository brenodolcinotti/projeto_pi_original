import bcrypt
import mysql.connector

# --- Conexão com o banco ---
conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password="aluno",
    database="projeto-integrador"
)

cursor = conexao.cursor()

usuario = input("Usuário: ")
senha_digitada = input("Senha: ").encode()

# Buscar hash no banco
cursor.execute("SELECT senha FROM login WHERE usuario = %s", (usuario,))
resultado = cursor.fetchone()

if resultado:
    hash_do_banco = resultado[0].encode()

    if bcrypt.checkpw(senha_digitada, hash_do_banco):
        print("✅ Login realizado com sucesso!")
    else:
        print("❌ Senha inválida!")
else:
    print("❌ Usuário não encontrado.")

cursor.close()
conexao.close()
