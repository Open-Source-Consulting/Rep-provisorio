# API do JOVI AI — Receitas de foto

Definição acordada com a equipe em 14/10/2026, antes da implementação. Este documento é a fonte de verdade sobre a API; o código deve segui-lo e, se algo mudar, este arquivo deve ser atualizado junto.

## Decisão

- **Fonte:** [MockAPI.io](https://mockapi.io), plano gratuito, sem chave nem segredo. O enunciado (`ATT.md`) cita o MockAPI como exemplo de API mockada aceita.
- **Função no produto:** catálogo de **receitas de foto** — cenários (retrato à noite, pôr do sol, comida…) com os ajustes sugeridos e os passos do Modo Guiado / resumo do Modo Automático. É a forma honesta de demonstrar o "descreva a foto" sem afirmar que existe IA real ou controle da câmera.
- **Por que não outras:** `json-server` só roda na máquina local (não existiria no deploy estático da Vercel); `my-json-server` não persiste escrita; Supabase/Firebase exigem chave e regras, desproporcional ao escopo; JSON local seria só leitura e perderia o CRUD.
- **Conta:** o projeto MockAPI foi criado por um integrante da equipe (registrar no README quem é o responsável). Se a conta for perdida, recrie um projeto com um recurso `Receitas` e rode `npm run seed` (ver abaixo).

## Endereço

```
Base:     https://6acef518f338359cf1c3c7f6.mockapi.io
Recurso:  https://6acef518f338359cf1c3c7f6.mockapi.io/Receitas
```

- O projeto **não tem prefixo** `/api/v1`.
- O nome do recurso é **`Receitas` com R maiúsculo**; o caminho diferencia maiúsculas (`/receitas` responde 404).
- No código: variável `VITE_API_URL` com o endereço base, **com fallback** para o valor acima, para que o deploy funcione mesmo sem configurar a variável. Não é segredo.

## Comportamento verificado em 14/10/2026

Testado com `curl` (registro criado, lido, editado, buscado e apagado; recurso deixado vazio):

| Teste | Resultado |
|---|---|
| `GET /Receitas` vazio | `200 []` |
| `POST` com campos fora do schema | **guardados normalmente** — o limite do schema não restringe o que o código envia |
| `GET /Receitas/:id` | `200`, registro completo |
| `PUT /Receitas/:id` com só alguns campos | mescla no 1º nível (campos não enviados são mantidos); um campo objeto/array enviado é **substituído inteiro** |
| `?search=termo` | busca por trecho, sem diferenciar maiúsculas, **apenas em campos de 1º nível** (não entra em objetos) |
| `?search=` com acento (`pôr`) | **não encontra** (404) mesmo com o título acentuado → normalizar a busca sem acentos |
| `?categoria=noite`, `?favorita=true` | filtram corretamente |
| filtro/busca **sem resultado** | **`404 "Not found"`** → tratar como lista vazia, não como erro |
| `?page=1&limit=6` | pagina corretamente |
| CORS | `Access-Control-Allow-Origin: *`, métodos GET/PUT/POST/DELETE |
| `DELETE /Receitas/:id` | `200` |

Testes adicionais em 14/10/2026, já com as 15 receitas do seed (`GET` apenas):

| Teste | Resultado | Como o front trata |
|---|---|---|
| `?search=retrato&categoria=noite` | **a busca é ignorada**: volta tudo de `noite` | com busca **e** filtro (`categoria` ou `favorita`), o serviço pede só o filtro e faz a busca e a paginação no front (`listarReceitas` em `src/services/receitas.js`). O mesmo vale para busca de **mais de uma palavra**: o `?search=` procura o trecho exato com acento, então "retrato a noite" não acharia "Retrato à noite" |
| `?search=ative` | encontra 9 receitas: a busca **também entra em arrays de texto** (`passosGuiado`) | a busca local (`receitaContemTermo`) olha todos os campos de texto, inclusive `passosGuiado` |
| `?categoria=noi` | encontra `noite`: filtros de campo são **por trecho** | as categorias são palavras distintas, sem conflito |
| `?search=por%20do%20sol` | encontra "Pôr do sol" pelo campo `palavrasChave` | normalização sem acentos funciona |
| `?page=4&limit=6` (além do fim) | `200 []` | "Carregar mais" some quando a página vem incompleta |

Limites do plano gratuito observados pela equipe: apenas **um recurso** e schema com `id` + **3 campos**. Por isso tudo fica em um único recurso e os demais campos são enviados pelo código. Limite de quantidade de registros não verificado.

## Schema do recurso `Receitas`

No painel do MockAPI o schema tem `id`, `titulo`, `categoria` e um terceiro campo — isso só afeta dados gerados pelo próprio MockAPI. A estrutura real, enviada pelo seed e pelo front, é **plana** (todos os campos no 1º nível, para que a busca e os filtros alcancem):

| Campo | Tipo | Valores / exemplo |
|---|---|---|
| `id` | string | gerado pelo MockAPI |
| `titulo` | string | "Retrato à noite" |
| `categoria` | string | `retrato` · `paisagem` · `noite` · `comida` · `movimento` · `contraluz` |
| `nivel` | string | `facil` · `intermediario` |
| `descricao` | string | "Rosto nítido com fundo desfocado em pouca luz" |
| `palavrasChave` | string | termos **sem acento**, separados por espaço, incluindo as palavras do título: "retrato noite pessoa rosto festa bokeh" |
| `iso` | string | "Auto, até 1600" |
| `exposicao` | string | "+0,3" |
| `foco` | string | "Toque no rosto" |
| `hdr` | boolean | `true` |
| `flash` | string | "Desligado" |
| `modoCamera` | string | "Retrato" |
| `passosGuiado` | string[] | ["Ative o modo Retrato", "Toque no rosto para focar", …] |
| `resumoAutomatico` | string | "A JOVI ativaria Retrato, HDR e foco no rosto" |
| `origem` | string | `jovi` (receita do catálogo, do seed) · `usuario` (criada no Estúdio) |
| `favorita` | boolean | `false` por padrão |
| `nota` | string | anotação pessoal; `""` por padrão |
| `criadoEm` | string | ISO 8601, enviado pelo front: "2026-10-14T18:30:00Z" |

Os textos de ajustes descrevem **sugestões**; a interface não deve dizer que a câmera foi configurada.

## Operações

| Operação | Chamada | Onde |
|---|---|---|
| Prévia pública | `GET /Receitas?search=<termo>&limit=3` | landing `/`, bloco "Experimente" |
| Catálogo | `GET /Receitas?search=&categoria=&page=&limit=6` | `/estudio` |
| Detalhe | `GET /Receitas/:id` | `/estudio/receitas/:id` |
| Favoritar / anotar | `PUT /Receitas/:id` com `{ favorita }` ou `{ nota }` | detalhe |
| Favoritos | `GET /Receitas?favorita=true` | `/estudio/favoritos` |
| Criar receita própria | `POST /Receitas` com `origem: "usuario"` | `/estudio/nova` |
| Editar receita própria | `PUT /Receitas/:id` | `/estudio/receitas/:id/editar`, só quando `origem === "usuario"` |
| Apagar receita própria | `DELETE /Receitas/:id` | só quando `origem === "usuario"`; pedir confirmação |

Receitas `origem: "jovi"` podem ser favoritadas e anotadas, mas a interface não oferece editar nem apagar.

### "Descreva a foto"

A busca da API é por trecho exato, então uma frase livre ("quero fotografar meu cachorro correndo") não casaria. Para o campo "Descreva a foto que você quer", o front busca o catálogo (`GET /Receitas`) e faz a correspondência por palavras-chave num hook customizado (`useSugestaoReceita`): remove acentos e palavras vazias, pontua cada receita pelas palavras de `palavrasChave` encontradas e ordena. A interface deve chamar isso de **sugestão por palavras-chave**, nunca de IA analisando a cena. O campo de busca do catálogo usa `?search=` normalmente (termo curto, sem acentos), exceto quando há categoria selecionada: aí a busca é feita no front (ver "Testes adicionais" acima).

Pontuação implementada em `src/lib/sugestao.js`: palavra igual a uma palavra-chave vale 2 pontos; palavra que começa igual (pelo menos 4 letras, ex.: "corria" e "correr") vale 1. As 3 receitas com mais pontos aparecem com as palavras que combinaram.

## Regras de tratamento no front

- **Carregando:** placeholders com o formato dos cards.
- **Erro** (rede ou status ≠ 2xx, exceto o 404 de lista): mensagem clara + botão "Tentar novamente".
- **Vazio:** `[]` ou `404` em listagem/busca → "Nenhuma receita para esse objetivo", com ação para limpar filtros.
- **404 no detalhe** (`/Receitas/:id`): estado "Receita não encontrada" com link de volta ao catálogo.
- **Normalização:** remover acentos e espaços extras do termo antes de enviar `search`.
- **Debounce** de ~300 ms na busca.
- **Cancelamento:** abortar requisições (`AbortController`) ao trocar de filtro ou sair da página.
- **Escrita:** bloquear o botão durante o envio (com `aria-disabled`, para não perder o foco), mostrar confirmação e atualizar a lista sem recarregar a página.

## Hooks

Implementados em `src/hooks/`:

- `useApi(buscar, dependencias)` — requisição genérica: `{ dados, carregando, erro, recarregar }`, com `AbortController`.
- `useReceitas(filtros)` — listagem, busca, filtro e paginação com "Carregar mais".
- `useReceita(id)` — detalhe + `favoritar`, `salvarNota`, `remover`. A edição chama `atualizarReceita` direto (igual à criação), para mostrar a mensagem de erro da API.
- `useSugestaoReceita(texto)` — correspondência por palavras-chave do "Descreva a foto".
- `useDebounce(valor, atraso)`.
- `useAuth()` — login de demonstração (abaixo).
- Hooks de interface: `useTituloPagina`, `useRolagemDeRota`, `useMenuMobile`, `useLightbox`, `useFormularioReceita`, `useAvisoDaRota` (lê o aviso mandado pelo `navigate` e apaga do histórico).

A camada HTTP fica isolada em `src/services/api.js` e `src/services/receitas.js`, sem JSX. O tratamento do `404` de lista fica no serviço (`listarReceitas`), porque é uma particularidade do MockAPI.

## Rotas

| Rota | Acesso | Conteúdo |
|---|---|---|
| `/` | pública | landing JOVI AI + bloco "Experimente" |
| `/entrar` | pública | login de demonstração |
| `/estudio` | **privada** | catálogo + "Descreva a foto" |
| `/estudio/receitas/:id` | **privada** | detalhe, alternância Modo Guiado / Modo Automático, favoritar, nota |
| `/estudio/favoritos` | **privada** | receitas favoritas |
| `/estudio/nova` | **privada** | formulário de receita própria |
| `/estudio/receitas/:id/editar` | **privada** | o mesmo formulário, preenchido, para editar uma receita própria |
| `*` | pública | página 404 |

Acesso a rota privada sem login redireciona para `/entrar` e, após o login, volta à rota pedida.

## Login de demonstração

Não usa a API (o plano só tem um recurso e senha não deve ficar numa API pública). Fica em `useAuth` + `localStorage`:

```
E-mail: demo@jovi.ai
Senha:  jovi2026
```

A tela de login e o README devem dizer que é **apenas demonstração**, sem segurança real. Essas credenciais precisam constar no README final.

## Seed

- Arquivo de dados: `scripts/receitas.seed.json` com 15 receitas `origem: "jovi"` (o script completa `origem`, `favorita`, `nota` e `criadoEm`). Executado em 14/10/2026: a API ficou com as 15 receitas.
- Script `npm run seed` (Node, `fetch` nativo): **apaga todos os registros** do recurso e cadastra o seed. Serve para popular a API e para restaurar o estado da demonstração antes da apresentação.
- Temas sugeridos: retrato à noite, retrato com luz de janela, selfie em grupo, pôr do sol, paisagem com céu, cidade à noite, fogos e luzes, comida no restaurante, produto para vender online, pet em movimento, esporte e crianças correndo, contraluz, documento e texto, lua, chuva e reflexos.

## Limitações a documentar no README

- Os dados são **compartilhados**: favoritos, notas e receitas criadas aparecem para qualquer pessoa que usar o site. É uma demonstração.
- Qualquer pessoa com o endereço pode alterar o recurso; `npm run seed` restaura o estado inicial.
- Se o MockAPI estiver fora do ar, as áreas que usam a API exibem o estado de erro; o restante da landing continua funcionando.
