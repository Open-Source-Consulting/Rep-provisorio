# Handoff: README final e deploy na Vercel

Para o integrante responsável pelo README de entrega e pela publicação. Tudo aqui foi conferido no código e executado em 14/10/2026. Os itens marcados com **[preencher]** dependem de você ou da equipe.

## 1. O que mudou na Sprint 4

A landing estática da Sprint 3 (HTML/CSS/JS) virou uma aplicação **React** com **Vite**, **Tailwind CSS** e **React Router**, com:

- landing pública com as seções da Sprint 3 e um bloco "Experimente" que consulta a API;
- login de demonstração (`/entrar`) e área privada (`/estudio`) com rotas protegidas;
- Estúdio de receitas de foto: catálogo com busca, filtro e "Carregar mais"; "Descreva a foto" (sugestão por palavras-chave); detalhe com Modo Guiado e Modo Automático; favoritos; notas; criar, editar e apagar receitas próprias;
- API mockada no MockAPI, com script de seed;
- testes automatizados (Vitest) e lint (ESLint).

A versão antiga está guardada em `docs/legado-sprint3/`.

## 2. Tecnologias (versões instaladas)

| Item | Versão |
|---|---|
| React / React DOM | 19.3 |
| React Router | 8.4 (pacote `react-router`) |
| Vite | 8.3 |
| Tailwind CSS | 4.3 (plugin `@tailwindcss/vite`) |
| Vitest + Testing Library | 5.0 / 16.3 |
| ESLint | 10.12 |
| Fontes | Archivo e Atkinson Hyperlegible Next (`@fontsource-variable`, hospedadas junto com o site) |
| Node.js | **22.22 ou mais novo** (exigência do React Router 8). Testado com Node 24.19 e npm 11.17 |

## 3. Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # build de produção na pasta dist/
npm run preview    # serve o build em http://localhost:4173
npm test           # testes automatizados (59 testes)
npm run lint       # ESLint
npm run seed       # APAGA e recria as 15 receitas do catálogo no MockAPI
```

## 4. Backend e API

- Não existe servidor próprio. Os dados vêm do **MockAPI**: `https://6acef518f338359cf1c3c7f6.mockapi.io/Receitas` (recurso `Receitas`, com R maiúsculo).
- Variável opcional `VITE_API_URL` (ver `.env.example`). Sem ela, o código usa o endereço acima. Não é segredo.
- `npm run seed` apaga todos os registros e cadastra as 15 receitas de `scripts/receitas.seed.json`. **Rode antes da apresentação** para limpar favoritos, notas e receitas criadas por outras pessoas.
- Conta do MockAPI: criada por um integrante. **[preencher: nome de quem é o responsável pela conta]**.
- Detalhes, testes da API e limitações: [API.md](API.md).

## 5. Login de demonstração

```
E-mail: demo@jovi.ai
Senha:  jovi2026
```

A tela `/entrar` mostra essas credenciais e tem um botão "Preencher dados de demonstração". O login é **apenas demonstrativo**: as credenciais estão no código do front e a sessão fica no `localStorage`. Não há segurança real.

## 6. Deploy na Vercel

1. Envie o código para o repositório Git. **Atenção:** esta cópia do projeto não tem pasta `.git`. O `docs/CLAUDE_PROMPT.md` registra o remoto `https://github.com/fishpedrol/landingpage-front-JOVI.git`. Confirme que é esse e faça o commit e o push a partir de um clone dele.
2. Na Vercel: **Add New → Project → Import** do repositório.
3. Configurações (a Vercel detecta Vite sozinha):
   - Framework Preset: **Vite**
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version (Settings → Build and Deployment): **22.x ou 24.x**
   - Environment Variables: nenhuma obrigatória (opcional `VITE_API_URL` com o endereço do item 4)
4. O arquivo `vercel.json` já redireciona todas as rotas para o `index.html`. Sem isso, abrir `/estudio` direto daria 404 na Vercel.
5. Depois do deploy, teste:
   - abrir `<url>/estudio` direto, que deve levar ao login;
   - entrar com as credenciais;
   - abrir uma receita;
   - abrir `<url>/qualquer-coisa`, que deve mostrar a página 404 do site.

Links para registrar no README e na entrega:

- Repositório Git: **[preencher]**
- Deploy na Vercel: **[preencher]**

## 7. Uso de IA no projeto (fatos para o parágrafo do README)

- **Na proposta do produto:** a JOVI AI é um conceito. Nesta entrega não há modelo de IA, reconhecimento de voz nem análise de imagem. O "Descreva a foto" usa comparação de palavras-chave, e o site diz isso na tela.
- **No desenvolvimento:**
  - o **Codex** foi usado antes para reorganizar a documentação e preparar o prompt de continuidade (registrado no README antigo);
  - nesta Sprint, o **Claude Code** (Anthropic, modelo Claude Opus 5.5) foi usado para planejar e implementar a migração para React + Vite + Tailwind, as rotas, os hooks, a integração com o MockAPI, o seed, os testes e esta documentação, seguindo as decisões da equipe registradas em `docs/API.md`.
  - **[preencher: como a equipe revisou e o que mais foi feito com ou sem IA]**

## 8. Checklist do README final (exigido pelo `docs/ATT.md`)

O README da raiz **ainda descreve a versão estática** (diz para abrir o `index.html`) e precisa ser reescrito. Ele deve ter:

- [ ] Tecnologias utilizadas (item 2)
- [ ] Como instalar as dependências (`npm install`)
- [ ] Como executar (`npm run dev`; build com `npm run build` e `npm run preview`)
- [ ] Servidores: não há backend próprio; API no MockAPI (item 4) e `npm run seed`
- [ ] Parágrafo sobre onde e como a IA foi usada (item 7)
- [ ] Usuário e senha de teste (item 5), dizendo que é só demonstração
- [ ] Link do deploy na Vercel e do repositório (item 6)
- [ ] Limitações: dados compartilhados, login sem segurança, MockAPI fora do ar só afeta as áreas de receitas

## 9. Pendências da equipe

- [ ] **Nome completo do integrante "Leonardo" (RM 571311).** Atualizar em `INTEGRANTES.TXT` e em `src/data/equipe.js` (aparece na seção Equipe e no rodapé).
- [ ] Nome do responsável pela conta do MockAPI (item 4).
- [ ] Commit/push e deploy (item 6), depois preencher os links.
- [ ] Rodar `npm run seed` antes da apresentação.
- [ ] Montar o ZIP **sem** `node_modules/` e `dist/`, **com** `INTEGRANTES.TXT`, `README.md` e o restante do projeto. O professor roda `npm install` para recriar as dependências.
