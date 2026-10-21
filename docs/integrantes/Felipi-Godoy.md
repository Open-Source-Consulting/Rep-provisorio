# Felipi Godoy

Você é o **4º** a fazer os commits (depois do Jecky Cossio). São 2, um logo depois do outro.

```bash
git pull
```

## Commit 1: Seções de texto da landing

As seções que explicam a proposta (problema e solução, como funciona, os dois modos, público-alvo, proposta x demo) e a página inicial que junta todas.

```bash
git add src/pages/PaginaInicial.jsx src/components/landing/SecaoSolucao.jsx src/components/landing/SecaoComoFunciona.jsx src/components/landing/SecaoModos.jsx src/components/landing/SecaoPublico.jsx src/components/landing/SecaoPropostaDemo.jsx
git commit -m "Adiciona as seções de texto da landing"
```

## Commit 2: Busca e sugestão de receitas

A seção "Experimente" da landing, que busca receitas na API, e a sugestão por palavras-chave usada no "Descreva a foto".

```bash
git add src/components/landing/SecaoExperimente.jsx src/lib/sugestao.js src/lib/sugestao.test.js src/hooks/useSugestaoReceita.js
git commit -m "Adiciona a busca e a sugestão de receitas"
git push
```

Depois avise o **Leonardo**, que é o próximo.
