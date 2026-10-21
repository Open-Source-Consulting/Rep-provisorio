# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + Vite + Tailwind CSS + React Router, decidido pela equipe em 14/10/2026 (ver `docs/CLAUDE_PROMPT.md`). Deploy previsto na Vercel, feito por outro integrante. Sem backend próprio: os dados vêm do MockAPI (`docs/API.md`).

## Users

- **Público da proposta:** estudantes full-time, usuários ativos de smartphone, iniciantes ou intermediários em fotografia, que têm dificuldade com os modos da câmera e querem gastar menos tempo configurando.
- **Público real deste site:** professores e banca da FIAP avaliando a Sprint 4 (FrontEnd Design + Web Development), que precisam entender a proposta, entrar na área privada e testar o consumo de API em poucos minutos, inclusive em outra máquina.

## Product Purpose

JOVI AI é a proposta de um assistente de fotografia integrado à câmera do smartphone JOVI: a pessoa descreve a foto que quer (por texto ou voz) e o assistente orienta passo a passo (Modo Guiado) ou configura a câmera com autorização (Modo Automático). Este repositório é a apresentação dessa proposta e, na Sprint 4, ganha um Estúdio funcional com um catálogo de "receitas de foto" vindo de uma API mockada.

## Positioning

A intenção declarada pelo usuário é prioritária e o produto explica cada ajuste em linguagem simples, para que a pessoa aprenda enquanto usa, em vez de depender da automação. Dois níveis de controle (Guiado e Automático) com transparência sobre o que seria alterado.

## Operating Context

Projeto acadêmico do Challenge JOVI (equipe Open Source Consulting). A entrega é um ZIP com código, README e `INTEGRANTES.TXT`, mais links do repositório Git e do deploy na Vercel.

## Capabilities and Constraints

- **Funciona de verdade nesta demo:** catálogo de receitas (listar, buscar, filtrar, paginar), detalhe com alternância Modo Guiado / Modo Automático, favoritar, anotar, criar/editar/apagar receitas próprias, "Descreva a foto" com sugestão por palavras-chave, login de demonstração.
- **Apenas conceito da proposta:** entrada por voz, análise de cena por imagem, IA interpretando intenção, aplicação real de ajustes na câmera.
- Login é só demonstração local (`demo@jovi.ai` / `jovi2026`), sem segurança real. Dados do MockAPI são compartilhados entre todos que usam o site.
- Nunca afirmar que uma API ou IA controla a câmera real. A correspondência do "Descreva a foto" deve ser chamada de sugestão por palavras-chave, nunca de IA.
- Idioma `pt-BR`.

## Brand Commitments

- Nome **JOVI AI**; marca circular (anel ciano com núcleo translúcido).
- Identidade incumbente mantida por decisão do usuário em 14/10/2026 ("evoluir a identidade atual"): fundos escuros e claros alternados, acento ciano/verde-azulado, marca circular.
- Tipografia: o usuário liberou trocar as fontes da Sprint 3 (Montserrat e Source Sans 3), desde que não sejam "fontes com cara de IA". Escolhidas: Archivo (títulos, largura semiexpandida) e Atkinson Hyperlegible Next (texto), via pacotes @fontsource. As fontes antigas ficaram em `docs/legado-sprint3/assets/fonts/`.
- Voz: direta, sem jargão técnico, transparente sobre o que é demonstração.

## Evidence on Hand

- Telas conceituais do aplicativo em `src/assets/screenshots/` (câmera principal, menu JOVI AI, chatbot de dúvidas, objetivo e passos do Modo Guiado, objetivo e otimização do Modo Automático, modos extras).
- Equipe e RMs em `INTEGRANTES.TXT`. O último integrante consta apenas como "Leonardo": não completar o sobrenome.
- Não existem depoimentos, clientes, métricas, preços ou parceiros reais; não inventar.

## Product Principles

1. A intenção do usuário vem primeiro; o produto ajuda, não decide sozinho.
2. Explicar sem jargão: cada ajuste vem com o porquê.
3. Transparência sobre o que é conceito e o que funciona nesta demonstração.
4. Quem avalia deve conseguir testar tudo sem instruções escondidas.

## Accessibility & Inclusion

Navegação completa por teclado, rótulos e estados acessíveis (carregando, erro, vazio anunciados), contraste adequado nos fundos claros e escuros, alternativa para movimento reduzido.
