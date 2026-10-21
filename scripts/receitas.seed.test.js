import { describe, expect, it } from 'vitest';
import receitas from './receitas.seed.json';
import { CATEGORIAS, NIVEIS, validarReceita } from '../src/lib/receita.js';
import { extrairTermos } from '../src/lib/sugestao.js';
import { semAcentos } from '../src/lib/texto.js';

const casos = receitas.map((receita) => [receita.titulo, receita]);

describe('seed de receitas', () => {
  it('tem pelo menos 12 receitas com títulos diferentes', () => {
    expect(receitas.length).toBeGreaterThanOrEqual(12);
    expect(new Set(receitas.map((r) => r.titulo)).size).toBe(receitas.length);
  });

  it.each(casos)('"%s" passa na validação do formulário', (_titulo, receita) => {
    expect(validarReceita(receita)).toEqual({});
    expect(CATEGORIAS.map((c) => c.valor)).toContain(receita.categoria);
    expect(NIVEIS.map((n) => n.valor)).toContain(receita.nivel);
  });

  it.each(casos)('"%s" tem palavras-chave sem acento e com as palavras do título', (_titulo, receita) => {
    expect(receita.palavrasChave).toBe(semAcentos(receita.palavrasChave));
    const palavras = receita.palavrasChave.split(' ');
    for (const termo of extrairTermos(receita.titulo)) {
      expect(palavras).toContain(termo);
    }
  });
});
