# Contexto do projeto

## Produto

**JOVI AI** é uma proposta de assistente de fotografia integrado à câmera de um smartphone JOVI. A pessoa descreve a captura desejada por texto ou voz; a proposta prevê analisar a cena e ajudar a preparar a câmera. O produto apresenta dois níveis de controle: **Modo Guiado**, com explicações e instruções que a pessoa aplica, e **Modo Automático**, com ajustes sugeridos ou aplicados pela IA mediante autorização.

O repositório contém a apresentação dessa proposta e, a partir da Sprint 4, um **Estúdio** funcional com um catálogo de "receitas de foto" vindo de uma API mockada. Não contém o aplicativo de câmera nem um serviço de IA.

## Implementação atual (Sprint 4)

Aplicação React (SPA) criada com Vite, estilizada com Tailwind CSS e roteada com React Router. Ver [API.md](API.md) para API, rotas, hooks, login e seed.

- `src/rotas.jsx` — rotas públicas (`/`, `/entrar`, 404) e privadas (`/estudio/...`), protegidas por `RotaPrivada`.
- `src/pages/` — páginas; `src/pages/estudio/` — páginas da área privada.
- `src/components/landing/` — seções da landing (hero, solução, como funciona, modos, experimente, público, proposta x demonstração, galeria, equipe, contato, cabeçalho e rodapé).
- `src/components/estudio/` — partes do Estúdio (descreva a foto, filtros, alternador de modos, painéis Guiado/Automático, nota, formulário, diálogo de confirmação).
- `src/components/ui/` — componentes reutilizáveis (botão, ícone, selo, campos, estados de erro/vazio, cartão de receita).
- `src/hooks/` — lógica fora da camada visual: `useApi`, `useReceitas`, `useReceita`, `useSugestaoReceita`, `useDebounce`, `useAuth` e hooks de interface.
- `src/services/` — chamadas HTTP ao MockAPI, sem JSX.
- `src/lib/` — regras puras (normalização de texto, sugestão por palavras-chave, validação de receita, login de demonstração).
- `src/data/` — conteúdo estático (equipe e telas do protótipo).
- `src/assets/screenshots/` — telas do protótipo, herdadas da Sprint 3. Fontes: Archivo (títulos) e Atkinson Hyperlegible Next (texto), instaladas via npm (`@fontsource-variable`).
- `scripts/seed.mjs` e `scripts/receitas.seed.json` — `npm run seed` popula/restaura a API.
- Testes com Vitest em arquivos `*.test.js(x)` ao lado do código.
- `docs/legado-sprint3/` — a versão estática da Sprint 3 (HTML/CSS/JS), guardada como referência porque esta cópia do projeto não tem histórico Git. Serve para ler o código e os textos: as imagens foram movidas para `src/assets/screenshots/`, então elas não abrem se o `index.html` antigo for aberto dessa pasta.

## O que funciona e o que é conceito

| Funciona nesta demonstração | Apenas proposta do produto |
|---|---|
| Busca de receitas na landing (bloco "Experimente", API real) | Entrada por voz |
| Catálogo com busca, filtro por categoria e "Carregar mais" | Análise de cena por imagem |
| "Descreva a foto": sugestão por palavras-chave (sem IA) | IA interpretando a intenção |
| Detalhe com Modo Guiado (passos) e Modo Automático (resumo do que seria feito) | Aplicação real de ajustes na câmera |
| Favoritar e anotar receitas | Chatbot de dúvidas |
| Criar, editar e apagar receitas próprias | |
| Login de demonstração e rotas privadas | |
| Formulário de contato com validação (não envia nada) | |

A interface marca essa diferença com selos "Funciona nesta demo" e "Conceito".

## Limites conhecidos

- O login é só de demonstração: credenciais no código do front e sessão no `localStorage`. Não há segurança real.
- Os dados do MockAPI são públicos e compartilhados: favoritos, notas e receitas criadas aparecem para todos. `npm run seed` restaura o estado inicial.
- O MockAPI ignora `?search=` quando há filtro de campo, e o `?search=` não acha frases quando o título tem acento; nesses casos (busca + filtro, ou busca com mais de uma palavra) a busca é feita no front (ver API.md).
- Se o MockAPI estiver fora do ar, só as áreas que usam a API mostram erro; o resto da landing continua funcionando.
- O formulário de contato não envia nem guarda mensagens.

Para os requisitos acadêmicos, consulte [ATT.md](ATT.md) e o checklist em [REQUIREMENTS.md](REQUIREMENTS.md).
