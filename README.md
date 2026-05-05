# NutriSystem — Frontend

Interface gráfica do sistema de nutrição, desenvolvida em **React + Vite**.

## Tecnologias

- React 18
- React Router DOM 6
- Axios (comunicação com a API NestJS)
- CSS Modules (estilização)
- Vite (bundler)

## Pré-requisitos

- Node.js 18+
- Backend NestJS rodando em `http://localhost:3001`

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:3000`.

> O Vite está configurado para fazer proxy das chamadas `/api` para `http://localhost:3001`.

## Build

```bash
npm run build
```

## Estrutura

```
src/
├── context/       # AuthContext (estado de autenticação)
├── pages/         # Páginas da aplicação
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Users.jsx / UserForm.jsx
│   └── Nutritionists.jsx / NutritionistForm.jsx
├── components/    # Layout + Sidebar
├── services/      # api.js (axios + interceptors)
└── index.css      # Variáveis CSS globais
```

## Rotas

| Rota                       | Descrição                  | Protegida |
|----------------------------|----------------------------|-----------|
| `/login`                   | Login                      | ❌        |
| `/register`                | Cadastro                   | ❌        |
| `/`                        | Dashboard                  | ✅        |
| `/users`                   | Listagem de usuários       | ✅        |
| `/users/new`               | Criar usuário              | ✅        |
| `/users/:id/edit`          | Editar usuário             | ✅        |
| `/nutritionists`           | Listagem de nutricionistas | ✅        |
| `/nutritionists/new`       | Criar nutricionista        | ✅        |
| `/nutritionists/:id/edit`  | Editar nutricionista       | ✅        |
