# Felipe Pedrol

Você é o **1º** a fazer os commits. São 2, um logo depois do outro.

## Antes de tudo (só você)

Você cria o repositório. Troque o link pelo link do repositório no GitHub:

```bash
git init
git branch -M main
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
```

## Commit 1: Configuração do projeto

Arquivos de configuração (Vite, Tailwind, ESLint, Vercel), o ponto de entrada do React e a lista de rotas.

```bash
git add package.json package-lock.json vite.config.js eslint.config.js index.html vercel.json .gitignore .env.example src/main.jsx src/App.jsx src/rotas.jsx src/testes/
git commit -m "Adiciona a configuração do projeto e as rotas"
```

## Commit 2: Login e rotas privadas

Login de demonstração, proteção das páginas do Estúdio e os layouts das páginas.

```bash
git add src/contexts/ src/components/rotas/ src/layouts/ src/lib/auth-demo.js src/hooks/useAuth.js src/hooks/useAuth.test.jsx src/hooks/useRolagemDeRota.js src/hooks/useTituloPagina.js src/pages/PaginaEntrar.jsx
git commit -m "Adiciona o login de demonstração e as rotas privadas"
git push -u origin main
```

Depois avise o **Daniel Ribeiro**, que é o próximo.
