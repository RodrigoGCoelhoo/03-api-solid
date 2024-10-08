# Teoria
## RFs (Requisitos funcionais)
- O que vai ser possível de fazer na aplicação

## RNs (Regra de negócio)
- Quais regras o RF vai seguir
- Sempre atrelada a um RF

## RNFs (Requisitos não funcionais)
- Requisitos mais técnicos do que a nível de funcionalidade


# App
## RFs 
- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academia próximas (até 10km)
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs
- [x] O usuário não deve poder se cadastrar com um e-email duplicado
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver perto (<100m) da academia
- [x] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs
- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT