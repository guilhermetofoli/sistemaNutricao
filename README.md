# SISTEMA DE GESTÃO DE NUTRIÇÃO#

Este documento contém a documentação completa, guia de instalação e o código-fonte consolidado para o sistema desenvolvido em **NestJS**, **Sequelize (MySQL)** e **Autenticação JWT**.

---

## EQUIPE DO PROJETO ##

> Abner Cardoso


> Guilherme Tófoli


> Matheus Coronado

##  1. GUIA DE INSTALAÇÃO E AMBIENTE

### Comandos para Instalação de Dependências
Execute estes comandos na raiz do projeto para garantir que todos os módulos necessários estejam presentes:


# Core e Banco de Dados (MySQL/Sequelize)
` npm install --save @nestjs/sequelize sequelize sequelize-typescript mysql2 `

# Autenticação e Segurança (JWT/Bcrypt)
`npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt`

# Validação e Utilitários (DTOs)
`npm install --save class-validator class-transformer @nestjs/mapped-types`

# Tipagens de Desenvolvimento (TypeScript)
`npm install --save-dev @types/bcrypt @types/passport-jwt @types/passport-local`

# Configuração do Banco de Dados (MySQL)
Certifique-se de que o MySQL está rodando (XAMPP/Docker) e crie o banco:


##  2. GUIA DE TESTES (THUNDER CLIENT / POSTMAN)

Para validar o funcionamento da API, siga a ordem de execução abaixo para garantir que o fluxo de autenticação e integridade de dados seja respeitado.

###  2.1 Autenticação e Usuários

#### **Cadastrar Usuário**
* **Método:** `POST`
* **URL:** `http://localhost:3000/users`
* **Body (JSON):**
    ```json
    {
      "nome": "Guilherme Silva",
      "email": "guilherme@teste.com",
      "senha": "123",
      "tipo": "NUTRI"
    }
    ```

#### **Realizar Login (Obter Token)**
* **Método:** `POST`
* **URL:** `http://localhost:3000/auth/login`
* **Body (JSON):**
    ```json
    {
      "email": "guilherme@teste.com",
      "senha": "123"
    }
    ```
* **Ação:** Copie o valor de `access_token` retornado no JSON.

---

###  2.2 Gestão de Nutricionistas (Rotas Privadas)

> **OBSERVAÇÃO:** Para todas as rotas abaixo, você deve ir na aba **Auth** do Thunder Client, selecionar **Bearer Token** e colar o token obtido no login.

#### **Vincular Perfil de Nutricionista**
* **Método:** `POST`
* **URL:** `http://localhost:3000/nutritionists`
* **Body (JSON):**
    ```json
    {
      "crn": "12345/SP",
      "especialidade": "Nutrição Esportiva",
      "valor_consulta": 150.00,
      "endereco_atendimento": "Av. Principal, 1000",
      "userId": 1
    }
    ```

#### **Listar Todos (Com Relacionamento)**
* **Método:** `GET`
* **URL:** `http://localhost:3000/nutritionists`
* **Resultado:** O sistema deve retornar o perfil do nutricionista com os dados do usuário ("Guilherme Silva") incorporados.

#### **Atualizar Dados (PATCH)**
* **Método:** `PATCH`
* **URL:** `http://localhost:3000/nutritionists/1`
* **Body (JSON):**
    ```json
    {
      "valor_consulta": 180.00,
      "especialidade": "Nutrição Funcional"
    }
    ```

#### **Remover Registro (DELETE)**
* **Método:** `DELETE`
* **URL:** `http://localhost:3000/nutritionists/1`
* **Resultado:** Status `200 OK` ou `204 No Content`. Uma nova tentativa de `GET` deve retornar `404 Not Found`.

---

###  2.3 Códigos de Resposta Esperados
* **200/201:** Sucesso na operação.
* **401 Unauthorized:** Token ausente, inválido ou expirado.
* **404 Not Found:** Recurso (ID) não existe no banco de dados.
* **500 Internal Server Error:** Falha de conexão com o MySQL ou erro de lógica.