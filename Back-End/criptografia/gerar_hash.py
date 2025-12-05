import bcrypt

#senha_plain = "almoxarifado123"
#hash_da_senha = bcrypt.hashpw(senha_plain.encode(), bcrypt.gensalt())
#print(hash_da_senha.decode())

#senha_plain = "manutencao123"
#hash_da_senha = bcrypt.hashpw(senha_plain.encode(), bcrypt.gensalt())
#print(hash_da_senha.decode())

#senha_plain = "rh123"
#hash_da_senha = bcrypt.hashpw(senha_plain.encode(), bcrypt.gensalt())
#print(hash_da_senha.decode())

senha_plain = "gerente123"
hash_da_senha = bcrypt.hashpw(senha_plain.encode(), bcrypt.gensalt())
print(hash_da_senha.decode())
