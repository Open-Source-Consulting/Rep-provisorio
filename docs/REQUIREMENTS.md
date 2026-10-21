# Requisitos da Sprint 4

Fonte: [ATT.md](ATT.md), preservado como recebido. O enunciado reúne critérios de FrontEnd Design e Web Development. Estado conferido em 14/10/2026.

## Requisitos do enunciado

| Requisito | Estado | Onde está |
|---|---|---|
| Evoluir o projeto da Sprint 03 e manter a solução da Challenge | **Feito.** Mesmo produto, textos, telas, equipe e identidade visual (decisão da equipe: evoluir a identidade atual) | `src/components/landing/`, `src/assets/`; versão anterior em `docs/legado-sprint3/` |
| React, componentização e props | **Feito.** Página dividida em componentes com props (ex.: `CartaoReceita`, `Botao`, `Selo`, `CabecalhoSecao`, `CartaoIntegrante`, campos de formulário) | `src/components/`, `src/pages/` |
| Rotas públicas e privadas | **Feito.** Públicas: `/`, `/entrar`, 404. Privadas: `/estudio`, `/estudio/favoritos`, `/estudio/nova`, `/estudio/receitas/:id`, `/estudio/receitas/:id/editar`. Sem login, redireciona para `/entrar` e volta à rota pedida. **Proteção apenas demonstrativa** (sem segurança real) | `src/rotas.jsx`, `src/components/rotas/RotaPrivada.jsx` |
| Hooks nativos e hooks customizados separando lógica e visual | **Feito.** Nativos: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`, `useEffectEvent`. Customizados: `useApi`, `useReceitas`, `useReceita`, `useSugestaoReceita`, `useDebounce`, `useAuth`, `useFormularioReceita`, `useMenuMobile`, `useLightbox`, `useTituloPagina`, `useRolagemDeRota`, `useAvisoDaRota` | `src/hooks/` |
| Tailwind CSS | **Feito.** Tailwind v4 com tema próprio (cores, fontes, sombras e tipografia da identidade JOVI) | `src/index.css`, classes nos componentes |
| Responsividade (desktop, tablet e mobile) | **Feito e verificado** em 390, 768 e 1440 px no navegador | todos os componentes |
| Consumo de API própria, pública ou mockada | **Feito.** MockAPI, recurso `Receitas`: listar, buscar, filtrar, paginar, detalhar, criar, editar, favoritar, anotar e apagar, com estados de carregando, erro e vazio | `src/services/`, `src/hooks/`, [API.md](API.md) |
| Git e deploy na Vercel | **Pendente com a equipe.** App pronta para deploy (`vercel.json` com rewrite de SPA). Esta cópia do projeto não tem pasta `.git`; o colega responsável faz o commit, o push e o deploy | ver [HANDOFF.md](HANDOFF.md) |
| README final (tecnologias, instalação, execução, servidores, IA, credenciais, deploy) | **Pendente com a equipe.** Informações prontas em [HANDOFF.md](HANDOFF.md); o README da raiz ainda descreve a versão estática e será reescrito pelo colega responsável | [HANDOFF.md](HANDOFF.md) |
| `INTEGRANTES.TXT` dentro do ZIP | Presente na raiz, sem alterações. **Confirmar o nome completo do integrante "Leonardo"** | `INTEGRANTES.TXT` |
| Entrega única para as disciplinas | Depende do ZIP final (sem `node_modules` e `dist`) | [HANDOFF.md](HANDOFF.md) |

## Decisões de implementação

O enunciado não especifica qual API usar nem o desenho da rota privada. As decisões foram tomadas com a equipe em 14/10/2026 e estão em [API.md](API.md): MockAPI com o recurso `Receitas`, rotas privadas sob `/estudio` e login apenas demonstrativo. A única mudança feita durante a implementação foi a rota de edição, `/estudio/receitas/:id/editar` (o formulário é o mesmo de `/estudio/nova`).

O enunciado inclui um marcador de requisito vazio (`• .`); não há informação suficiente para deduzir um critério adicional.

## Como verificar

```bash
npm install
npm test        # testes automatizados (Vitest)
npm run lint    # ESLint
npm run build   # build de produção em dist/
npm run dev     # http://localhost:5173
```

Login de demonstração: `demo@jovi.ai` / `jovi2026` (também mostrado na tela `/entrar`).

## Critério de conclusão

Cada requisito acima deve estar implementado ou ter seu bloqueio claramente identificado. README, documentação, código, instruções de execução, arquivos de entrega e links precisam descrever o mesmo estado final.
