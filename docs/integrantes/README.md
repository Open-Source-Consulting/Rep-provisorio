# Divisão do projeto por integrante

Cada integrante faz 2 commits, um logo depois do outro. Depois passa a vez para o próximo da lista.

| Vez | Integrante | Commits |
| --- | --- | --- |
| 1º | [Felipe Pedrol](Felipe-Pedrol.md) | Configuração do projeto · Login e rotas privadas |
| 2º | [Daniel Ribeiro](Daniel-Ribeiro.md) | Estilos e componentes visuais · Cabeçalho, rodapé, hero e galeria |
| 3º | [Jecky Cossio](Jecky-Cossio.md) | Consumo da API · Páginas do Estúdio |
| 4º | [Felipi Godoy](Felipi-Godoy.md) | Seções de texto da landing · Busca e sugestão de receitas |
| 5º | [Leonardo](Leonardo.md) | Equipe, contato e páginas de erro · Documentação |

## Como fazer

1. Na sua vez, rode `git pull` para pegar os commits de quem veio antes.
2. Rode os comandos do seu arquivo: eles adicionam os arquivos inteiros e fazem os 2 commits.
3. No fim, rode `git push`.

Para o commit sair no seu nome, configure o seu nome e e-mail do GitHub antes (só precisa uma vez por computador):

```bash
git config user.name "Seu Nome"
git config user.email "seu-email-do-github@exemplo.com"
```

Se todos fizerem os commits no mesmo computador, troque o nome e o e-mail antes de cada integrante começar.

## O que não entra

- `node_modules/` e `dist/`: são gerados pelo `npm install` e pelo `npm run build` (já estão no `.gitignore`).
- `docs/`: material de apoio da equipe, incluindo estes arquivos de divisão dos commits. Fica só no computador de vocês.
- `.impeccable/` e `PRODUCT.md`: arquivos da ferramenta de design usada com a IA.

No repositório provisório da equipe eles podem ir normalmente. No repositório de entrega, use o `.gitignore` que está comentado no fim do arquivo `.gitignore`: ele faz o Git ignorar essas pastas mesmo se alguém rodar `git add .` por engano.
