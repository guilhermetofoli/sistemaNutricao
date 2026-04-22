# SISTEMA DE GESTÃO DE NUTRIÇÃO#

Este documento contém a documentação completa, guia de instalação e o código-fonte consolidado para o sistema desenvolvido em **NestJS**, **Sequelize (MySQL)** e **Autenticação JWT**.

---

## EQUIPE DO PROJETO ##

> Abner Cardoso


> Guilherme Tófoli


> Matheus Coronado

## 🛠️ 1. GUIA DE INSTALAÇÃO E AMBIENTE

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
