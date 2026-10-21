// Rodar com: npm run seed
// ATENÇÃO: APAGA todos os registros do recurso Receitas no MockAPI e cadastra de novo as
// receitas de scripts/receitas.seed.json. Serve para popular a API ou voltar a demo ao início.
// Usa a variável VITE_API_URL do .env ou, se ela não existir, o endereço padrão do projeto.

import { readFile } from 'node:fs/promises';
import { validarReceita } from '../src/lib/receita.js';
import { semAcentos } from '../src/lib/texto.js';

// Mesmo endereço de src/services/api.js. Não dá para importar de lá porque
// o import.meta.env só existe dentro do Vite.
const URL_PADRAO = 'https://6acef518f338359cf1c3c7f6.mockapi.io';
const URL_BASE = (process.env.VITE_API_URL || URL_PADRAO).trim().replace(/\/+$/, '');
const URL_RECURSO = `${URL_BASE}/Receitas`;

const CAMPOS_TEXTO = [
  'titulo', 'categoria', 'nivel', 'descricao', 'palavrasChave',
  'iso', 'exposicao', 'foco', 'flash', 'modoCamera', 'resumoAutomatico',
];

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Faz a requisição e tenta de novo (até 3 vezes) se o MockAPI responder 429 ou 5xx.
async function chamar(url, opcoes = {}, tentativa = 1) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: { 'Content-Type': 'application/json' },
  });
  if ((resposta.status === 429 || resposta.status >= 500) && tentativa < 3) {
    await esperar(1000 * tentativa);
    return chamar(url, opcoes, tentativa + 1);
  }
  return resposta;
}

// Confere o arquivo ANTES de apagar qualquer coisa na API.
// Usa as mesmas regras do formulário do Estúdio (validarReceita) e mais algumas do docs/API.md.
function validarSeed(receitas) {
  if (!Array.isArray(receitas) || receitas.length === 0) {
    throw new Error('receitas.seed.json precisa ser uma lista com pelo menos uma receita.');
  }
  receitas.forEach((r, i) => {
    const nome = r.titulo || `#${i + 1}`;
    for (const campo of CAMPOS_TEXTO) {
      if (typeof r[campo] !== 'string' || r[campo].trim() === '') {
        throw new Error(`Receita "${nome}": campo "${campo}" vazio ou inválido.`);
      }
    }
    if (typeof r.hdr !== 'boolean') throw new Error(`Receita "${nome}": "hdr" deve ser true ou false.`);
    if (semAcentos(r.palavrasChave) !== r.palavrasChave) {
      throw new Error(`Receita "${nome}": "palavrasChave" não pode ter acento.`);
    }
    if (!Array.isArray(r.passosGuiado) || r.passosGuiado.some((passo) => typeof passo !== 'string' || !passo.trim())) {
      throw new Error(`Receita "${nome}": "passosGuiado" deve ser uma lista de textos não vazios.`);
    }
    // Categoria, nível, quantidade de passos, tamanhos etc.
    const erros = validarReceita(r);
    const primeiro = Object.keys(erros)[0];
    if (primeiro) throw new Error(`Receita "${nome}": ${primeiro}: ${erros[primeiro]}`);
  });
}

async function listarTodas() {
  const resposta = await chamar(URL_RECURSO);
  if (resposta.status === 404) return []; // o MockAPI responde 404 quando não acha nada
  if (!resposta.ok) throw new Error(`GET /Receitas respondeu ${resposta.status}.`);
  return resposta.json();
}

async function main() {
  const conteudo = await readFile(new URL('./receitas.seed.json', import.meta.url), 'utf8');
  const receitas = JSON.parse(conteudo);
  validarSeed(receitas);

  console.log(`API: ${URL_RECURSO}`);

  const existentes = await listarTodas();
  console.log(`Apagando ${existentes.length} registro(s)...`);
  for (const registro of existentes) {
    const resposta = await chamar(`${URL_RECURSO}/${registro.id}`, { method: 'DELETE' });
    if (!resposta.ok && resposta.status !== 404) {
      throw new Error(`DELETE /Receitas/${registro.id} respondeu ${resposta.status}.`);
    }
    await esperar(120);
  }

  console.log(`Cadastrando ${receitas.length} receita(s)...`);
  const agora = Date.now();
  for (const [indice, receita] of receitas.entries()) {
    const corpo = {
      ...receita,
      origem: 'jovi',
      favorita: false,
      nota: '',
      criadoEm: new Date(agora + indice * 1000).toISOString(),
    };
    const resposta = await chamar(URL_RECURSO, { method: 'POST', body: JSON.stringify(corpo) });
    if (!resposta.ok) throw new Error(`POST "${receita.titulo}" respondeu ${resposta.status}.`);
    console.log(`  ok  ${receita.titulo}`);
    await esperar(120);
  }

  const final = await listarTodas();
  console.log(`Pronto: a API tem ${final.length} receita(s).`);
  if (final.length !== receitas.length) {
    console.warn('Atenção: a quantidade final é diferente do seed. Rode o comando de novo.');
    process.exitCode = 1;
  }
}

main().catch((erro) => {
  console.error(`Falha no seed: ${erro.message}`);
  process.exitCode = 1;
});
