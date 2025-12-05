import bcrypt
import mysql.connector

usuario = input("Usuário: ")
senha = input("Nova senha: ").encode()

hash_da_senha = bcrypt.hashpw(senha, bcrypt.gensalt()).decode()

conexao = mysql.connector.connect(
    host="localhost",
    user="root",
    password="aluno",
    database="projeto-integrador"
)

cursor = conexao.cursor()

cursor.execute(
    "UPDATE login SET senha = %s WHERE usuario = %s",
    (hash_da_senha, usuario)
)

conexao.commit()

print("Senha atualizada com sucesso!")

cursor.close()
conexao.close()
