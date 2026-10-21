(function () {
  'use strict';

  var cabecalho = document.querySelector('.cabecalho');
  var botaoMenu = document.getElementById('btn-menu');
  var navegacao = document.getElementById('nav-principal');

  function definirMenu(aberto) {
    if (!cabecalho || !botaoMenu) return;

    cabecalho.classList.toggle('esta-aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute(
      'aria-label',
      aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );

    var uso = botaoMenu.querySelector('use');
    if (uso) uso.setAttribute('href', aberto ? '#i-fechar' : '#i-menu');
  }

  if (botaoMenu && navegacao) {
    botaoMenu.addEventListener('click', function () {
      var aberto = botaoMenu.getAttribute('aria-expanded') === 'true';
      definirMenu(!aberto);
    });

    navegacao.addEventListener('click', function (evento) {
      if (evento.target.closest('.nav__link')) definirMenu(false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
        definirMenu(false);
        botaoMenu.focus();
      }
    });

    var consultaDesktop = window.matchMedia('(min-width: 900px)');
    var aoMudarLargura = function (evento) {
      if (evento.matches) definirMenu(false);
    };

    if (typeof consultaDesktop.addEventListener === 'function') {
      consultaDesktop.addEventListener('change', aoMudarLargura);
    } else if (typeof consultaDesktop.addListener === 'function') {
      consultaDesktop.addListener(aoMudarLargura);
    }
  }


  var modal = document.getElementById('lightbox');
  var modalImg = document.getElementById('lightbox-img');
  var modalLegenda = document.getElementById('lightbox-legenda');
  var botaoFechar = document.getElementById('btn-fechar-lightbox');
  var botoesTela = document.querySelectorAll('.tela__botao');
  var origemFoco = null;

  var modalDisponivel =
    modal && modalImg && modalLegenda && typeof modal.showModal === 'function';

  if (modalDisponivel) {
    botoesTela.forEach(function (botao) {
      botao.addEventListener('click', function () {
        var imagem = botao.querySelector('img');

        origemFoco = botao;
        modalImg.src = botao.dataset.img;
        modalImg.alt = imagem ? imagem.alt : '';
        modalLegenda.textContent = botao.dataset.legenda || '';
        modal.showModal();
      });
    });

    if (botaoFechar) {
      botaoFechar.addEventListener('click', function () {
        modal.close();
      });
    }

    modal.addEventListener('click', function (evento) {
      if (evento.target === modal) modal.close();
    });

    modal.addEventListener('close', function () {
      if (origemFoco) {
        origemFoco.focus();
        origemFoco = null;
      }
    });
  } else {
    botoesTela.forEach(function (botao) {
      botao.style.cursor = 'default';
    });
  }


  var querMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !querMenosMovimento) {
    var alvos = document.querySelectorAll(
      '.secao__cabecalho, .painel, .etapa, .modo, .publico__intro, .beneficio,' +
      '.recurso, .tela, .integrante, .contato__principal, .contato__info'
    );

    var contagemPorSecao = {};

    alvos.forEach(function (elemento, indice) {
      var secao = elemento.closest('section, footer');
      var chave = secao ? (secao.id || 'secao-' + indice) : 'solta';
      var ordem = contagemPorSecao[chave] || 0;

      contagemPorSecao[chave] = ordem + 1;
      elemento.style.setProperty('--atraso', Math.min(ordem, 5) * 70 + 'ms');
      elemento.classList.add('revelar');
    });

    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('revelar-pronto');
        observador.unobserve(entrada.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.1 });

    alvos.forEach(function (elemento) {
      observador.observe(elemento);
    });
  }


  var formulario = document.getElementById('form-contato');
  var retorno = document.getElementById('retorno-form');

  if (formulario && retorno) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
      }

      var nome = document.getElementById('nome').value.trim();

      retorno.textContent =
        'Obrigado, ' + nome + '. Esta página é uma demonstração acadêmica e não ' +
        'possui servidor, portanto sua mensagem não foi enviada nem armazenada.';
      retorno.hidden = false;

      formulario.reset();
    });
  }

})();
