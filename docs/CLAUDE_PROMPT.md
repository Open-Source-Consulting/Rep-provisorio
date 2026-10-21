# Instruções de execução para Claude

Este arquivo é a solicitação de trabalho. Se você é o Claude lendo este documento com o repositório aberto, leia os arquivos indicados, inspecione a implementação real e execute o trabalho até deixar a evolução implementada e documentada. Não peça ao usuário para copiar este texto nem encerre sua atuação depois de apresentar um plano.

Você vai continuar o projeto acadêmico **JOVI AI** neste repositório. Leia primeiro `README.md`, `docs/README.md`, `docs/PROJECT_CONTEXT.md`, `docs/REQUIREMENTS.md`, `docs/API.md` e `docs/ATT.md`; depois inspecione os arquivos e a estrutura reais antes de alterar qualquer coisa.

## Decisões já tomadas com a equipe

Estas decisões foram alinhadas antes da implementação e não devem ser reabertas sem motivo técnico concreto:

- **API:** MockAPI.io, recurso único `Receitas` (catálogo de receitas de foto com CRUD). Endereço, schema, comportamento verificado, rotas, hooks, login de demonstração e seed estão em [`API.md`](API.md) — siga esse documento.
- **Stack:** React + Vite + Tailwind CSS + React Router. Ambiente confirmado em 14/10/2026: Node 24.19.0 e npm 11.17.0; não havia `package.json`.
- **Rotas:** públicas `/`, `/entrar` e 404; privadas sob `/estudio` (ver `API.md`).
- **Login:** apenas demonstração, local, com `demo@jovi.ai` / `jovi2026`.
- **Repositório remoto:** `origin` aponta para `https://github.com/fishpedrol/landingpage-front-JOVI.git`. Não faça push nem deploy.

## Objetivo

Evolua a landing page existente da proposta JOVI AI para atender à Sprint 4 conjunta de FrontEnd Design e Web Development. Este trabalho deve continuar a mesma solução da Challenge: um assistente de fotografia que ajuda pessoas a chegar à foto desejada por texto ou voz, com experiência nos modos Guiado e Automático. Não substitua o produto por um projeto genérico ou independente.

## Estado inicial conhecido

A base existente é uma landing page em `index.html`, `style.css` e `script.js`, em português, com identidade própria, galeria de telas conceituais, seção da equipe e formulário demonstrativo. As referências visuais estão em `assets/screenshots/`; as fontes estão em `assets/fonts/`. Não há React, Tailwind, API, backend, rotas ou autenticação no estado documentado. Confirme esses fatos no checkout atual antes de confiar neles.

## Requisitos obrigatórios

Implemente e demonstre todos os requisitos do enunciado em `docs/ATT.md`, acompanhando a tabela de `docs/REQUIREMENTS.md`:

1. Migrar a experiência para React, com componentes e passagem de props.
2. Incluir rotas públicas e privadas com um fluxo de acesso protegido demonstrável, apropriado para uma entrega acadêmica. Deixe explícito se a proteção é somente demonstrativa e nunca a descreva como segurança de produção.
3. Usar hooks nativos e criar pelo menos um hook customizado que mantenha lógica reutilizável fora da camada visual.
4. Configurar e usar Tailwind CSS.
5. Manter boa experiência responsiva em desktop, tablet e mobile.
6. Consumir a API definida em [`API.md`](API.md) (MockAPI, recurso `Receitas`) numa parte visível e coerente com a proposta, criando o seed e o script `npm run seed` descritos lá. Trate carregamento, erro e ausência de dados conforme as regras do documento. Não afirme que uma API ou IA controla a câmera real.
7. Deixar as informações técnicas da aplicação organizadas para o handoff: stack, comandos de instalação e execução, backend (se houver), uso de IA e usuários de demonstração (se houver). **Outro aluno da equipe é responsável pelo README final de entrega e pelo deploy na Vercel. Não edite o README da raiz nem tente publicar; prepare um resumo objetivo para o colega preencher o README e concluir o deploy.** Não invente URLs, nomes completos, credenciais ou resultados.
8. Preservar `INTEGRANTES.TXT` e as telas/fonte úteis. O último integrante está listado apenas como “Leonardo”; sinalize a necessidade de confirmação do nome completo, sem completá-lo por suposição.

## Direção de produto e conteúdo

Preserve o nome JOVI AI, a ideia de fotografia acessível sem jargão, os modos Guiado e Automático, os screenshots e a equipe. A página atual informa que formulário é apenas demonstração: mantenha essa transparência se não houver backend. Diferencie visualmente as capacidades conceituais da proposta das interações que realmente funcionam neste projeto. Não solicite nem exponha dados pessoais ou credenciais reais.

Mantenha idioma `pt-BR`, acessibilidade de teclado, rótulos e estados acessíveis e alternativa para movimento reduzido. A identidade atual — Montserrat, Source Sans 3, tons escuros e claros e acento ciano/verde-azulado — é uma referência que pode ser refinada ou substituída se isso ajudar a entregar um resultado mais profissional.

## Direção visual

Avalie a landing page existente como uma experiência de apresentação e persuasão. Você tem liberdade para redesenhar o layout e a linguagem visual se a solução atual limitar a clareza, a credibilidade ou o acabamento profissional. Se fizer um redesign, trate a aparência atual como referência, não como obrigação: proponha uma direção visual coesa e aplique-a de ponta a ponta, em vez de acumular pequenos enfeites sobre uma estrutura que não funciona.

Preserve a verdade do produto, o nome JOVI AI, o conteúdo útil, os screenshots que continuem pertinentes, a equipe e as funções que já funcionam. Você pode reorganizar seções, hierarquia, tipografia, cores, composição, espaçamento, navegação, componentes e microinterações. Mantenha a interface responsiva, acessível e consistente; não invente capacidades reais de câmera ou IA. Se a skill Impeccable estiver disponível no ambiente, use a etapa de planejamento visual (`shape`) antes de implementar mudanças visuais.

## Como trabalhar

- Comece resumindo o estado do repositório, as lacunas contra o enunciado e uma sequência curta de implementação; em seguida prossiga para implementar, sem parar apenas no plano.
- Inspecione os arquivos de configuração e recursos antes de instalar dependências; confirme que o ambiente ainda corresponde ao registrado acima.
- Mantenha as alterações focadas, preserve recursos válidos e remova duplicações só quando necessário para a migração.
- Se um requisito depender de dado externo, indisponibilidade de conta ou informação que apenas a equipe pode confirmar, avance no que for independente e deixe um item objetivo para a equipe.
- Não altere `docs/ATT.md`, que é o enunciado-fonte. Atualize `README.md`, `docs/PROJECT_CONTEXT.md` e `docs/REQUIREMENTS.md` para refletir a implementação real.

## Entrega esperada desta sessão

Implemente a evolução no repositório, resuma os arquivos e decisões alterados, indique como executar a aplicação e relacione os requisitos concluídos e os bloqueios restantes. Ao final, inclua um handoff conciso para o aluno responsável pelo README final e pela publicação na Vercel, com os comandos, configurações e fatos confirmados. Deixe links de Git/Vercel para esse aluno preencher após concluir essas tarefas.

