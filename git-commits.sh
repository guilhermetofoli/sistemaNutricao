#!/bin/bash
# Script para inicializar o repositório e criar os commits do frontend

echo "🌿 Iniciando repositório Git..."
git init
git checkout -b main

echo ""
echo "📦 Commit 1: Setup inicial do projeto React + Vite"
git add package.json vite.config.js index.html .gitignore README.md
git commit -m "feat: setup inicial do projeto React + Vite

- Configura projeto com React 18 e Vite
- Adiciona dependências: react-router-dom, axios
- Configura proxy para API NestJS em localhost:3001
- Adiciona .gitignore padrão"

echo ""
echo "🎨 Commit 2: Design system e estilos globais"
git add src/index.css src/main.jsx
git commit -m "feat: adiciona design system e estilos globais

- Define paleta de cores (verde profundo, creme, acentos)
- Configura fontes: Playfair Display + DM Sans
- Adiciona variáveis CSS, animações e utilitários
- Estilos de scrollbar customizados"

echo ""
echo "🔐 Commit 3: Camada de serviços e autenticação"
git add src/services/ src/context/
git commit -m "feat: implementa serviços de API e contexto de autenticação

- Configura axios com interceptors para JWT
- Implementa redirecionamento automático em caso de 401
- Cria AuthContext com login/logout e persistência no localStorage
- Serviços: authApi, usersApi, nutritionistsApi"

echo ""
echo "🗂️ Commit 4: Layout e navegação com sidebar"
git add src/components/ src/App.jsx
git commit -m "feat: cria layout principal com sidebar e roteamento

- Implementa sidebar responsiva com navegação
- Configura React Router com rotas protegidas (PrivateRoute)
- Adiciona topbar com saudação e botão de logout
- Overlay para sidebar em mobile"

echo ""
echo "🔑 Commit 5: Páginas de autenticação (Login e Cadastro)"
git add src/pages/Login.jsx src/pages/Register.jsx src/pages/Auth.module.css
git commit -m "feat: implementa páginas de login e cadastro

- Tela de login com validação e feedback de erro
- Tela de cadastro com seleção de tipo de conta
- Layout split: painel verde esquerdo + formulário direito
- Responsivo para mobile"

echo ""
echo "📊 Commit 6: Dashboard com estatísticas"
git add src/pages/Dashboard.jsx src/pages/Dashboard.module.css
git commit -m "feat: cria dashboard com estatísticas e acesso rápido

- Cards de contagem: usuários, nutricionistas, pacientes
- Saudação dinâmica baseada no horário
- Atalhos para as principais ações do sistema
- Carregamento assíncrono com tratamento de erro"

echo ""
echo "👥 Commit 7: CRUD de Usuários"
git add src/pages/Users.jsx src/pages/UserForm.jsx src/pages/ListPage.module.css src/pages/FormPage.module.css
git commit -m "feat: implementa CRUD completo de usuários

- Listagem com busca por nome e email
- Badges coloridos por tipo (ADMIN, NUTRI, PACIENTE)
- Formulário de criação e edição com validação
- Exclusão com confirmação
- Tabela responsiva com avatar inicial"

echo ""
echo "🥗 Commit 8: CRUD de Nutricionistas"
git add src/pages/Nutritionists.jsx src/pages/NutritionistForm.jsx src/pages/Nutritionists.module.css
git commit -m "feat: implementa CRUD completo de nutricionistas

- Listagem em cards com informações do perfil
- Exibe CRN, especialidade, valor de consulta e endereço
- Formulário com vínculo ao usuário (tipo NUTRI)
- Busca por especialidade ou CRN
- Exclusão com confirmação"

echo ""
echo "✅ Todos os commits criados com sucesso!"
echo ""
echo "Para subir no GitHub:"
echo "  git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git"
echo "  git push -u origin main"
