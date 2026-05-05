# SISTEMA DE GESTÃO DE NUTRIÇÃO #

Este documento contém a documentação completa, guia de instalação e o código-fonte consolidado para o sistema desenvolvido em **NestJS**, **React (Vite)**, **Sequelize (MySQL)** e **Autenticação JWT**.

---

## EQUIPE DO PROJETO ##

> Abner Cardoso

> Guilherme Tófoli

> Matheus Coronado

##  1. GUIA DE INSTALAÇÃO E AMBIENTE

### Comandos para Instalação de Dependências
Execute estes comandos na raiz do projeto para garantir que todos os módulos necessários estejam presentes:

#### **Core e Banco de Dados (NestJS)**
`npm install --save @nestjs/sequelize sequelize sequelize-typescript mysql2`

#### **Autenticação e Segurança**
`npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt`

#### **Interface e Comunicação (React/Vite)**
`npm install axios react-router-dom @vitejs/plugin-react`

#### **Validação e Tipagens**
`npm install --save class-validator class-transformer @nestjs/mapped-types`
`npm install --save-dev @types/bcrypt @types/passport-jwt`

---

##  2. COMO EXECUTAR O SISTEMA

O projeto agora funciona de forma integrada. Você deve manter **dois terminais** abertos simultaneamente:

### **2.1 Servidor Backend (API)**
* **Comando:** `npm run start:dev`
* **URL:** `http://localhost:3000`
* **Função:** Gerencia a conexão com o MySQL e as regras de negócio.

### **2.2 Interface Frontend (Web)**
* **Comando:** `npx vite --port 5173`
* **URL:** `http://localhost:5173`
* **Função:** Interface gráfica para o usuário final.

---

##  3. GUIA DE TESTES E FLUXO PRINCIPAL

Com a interface ativa, você pode realizar os testes diretamente no navegador:

#### **Passo 1: Criar Conta**
* Acesse a tela de **Register** no navegador.
* Preencha os dados (o sistema criará o registro no MySQL automaticamente).

#### **Passo 2: Autenticação**
* Realize o **Login** com o e-mail cadastrado.
* O sistema armazenará o Token JWT e liberará o acesso ao Dashboard.

#### **Passo 3: Gestão de Nutricionistas**
* Dentro do sistema, você poderá cadastrar CRN, especialidade e valores.
* O frontend enviará o Token automaticamente em todas as requisições privadas.

---

##  4. ENDPOINTS DA API (REFERÊNCIA)

Se precisar validar manualmente via **Thunder Client**, utilize os caminhos abaixo:

* **POST** `/users` -> Cadastro de usuário.
* **POST** `/auth/login` -> Login (gera o Token).
* **GET** `/nutritionists` -> Lista todos (Requer Token).
* **POST** `/nutritionists` -> Cadastra perfil (Requer Token).

---

##  5. CHECKLIST DE AMBIENTE (XAMPP)

* [ ] MySQL rodando na porta **3306**.
* [ ] Banco de dados **`sistema_nutricao`** criado.
* [ ] Usuário: **`root`** / Senha: **`(vazio)`**.
* [ ] **CORS** habilitado no arquivo `main.ts` do backend.