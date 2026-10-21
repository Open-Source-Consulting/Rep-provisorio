# Jecky Cossio

Você é o **3º** a fazer os commits (depois do Daniel Ribeiro). São 2, um logo depois do outro.

```bash
git pull
```

## Commit 1: Consumo da API

Comunicação com o MockAPI (listar, ver, criar, editar e apagar receitas), as regras das receitas e o script que cadastra o catálogo na API.

```bash
git add src/services/ src/lib/receita.js src/lib/receita.test.js src/lib/texto.js src/lib/texto.test.js scripts/
git commit -m "Adiciona o consumo da API de receitas"
```

## Commit 2: Páginas do Estúdio

Catálogo, favoritos, detalhe da receita e o formulário para criar e editar receitas, com os hooks que buscam os dados.

```bash
git add src/components/estudio/ src/pages/estudio/ src/hooks/useReceitas.js src/hooks/useReceita.js src/hooks/useFormularioReceita.js src/hooks/useDebounce.js src/hooks/useDebounce.test.js src/hooks/useAvisoDaRota.js
git commit -m "Adiciona as páginas do Estúdio"
git push
```

Depois avise o **Felipi Godoy**, que é o próximo.
