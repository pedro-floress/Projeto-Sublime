/* ============================================================
   Sublime Ambientes Planejados — scripts do site
   Carrossel: baseado no script.js original de pedro-floress
   (branch Bloco-1), com indicadores, autoplay e teclado.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Carrossel do hero ---------------- */
  const carrossel = document.querySelector('.carrossel');

  if (carrossel) {
    const imagens = carrossel.querySelectorAll('img');
    const setaEsquerda = document.querySelector('.seta-esquerda');
    const setaDireita = document.querySelector('.seta-direita');
    const indicadores = document.querySelector('.hero-indicadores');

    let indiceAtual = 0;
    let autoplay = null;

    // Cria um indicador por imagem
    imagens.forEach(function (_, i) {
      const ponto = document.createElement('button');
      ponto.setAttribute('aria-label', 'Ir para a imagem ' + (i + 1));
      if (i === 0) ponto.classList.add('ativo');
      ponto.addEventListener('click', function () {
        trocarImagem(i);
        reiniciarAutoplay();
      });
      indicadores.appendChild(ponto);
    });

    const pontos = indicadores.querySelectorAll('button');

    function trocarImagem(novoIndice) {
      imagens[indiceAtual].classList.remove('ativa');
      pontos[indiceAtual].classList.remove('ativo');

      indiceAtual = novoIndice;

      imagens[indiceAtual].classList.add('ativa');
      pontos[indiceAtual].classList.add('ativo');
    }

    function proxima() {
      trocarImagem((indiceAtual + 1) % imagens.length);
    }

    function anterior() {
      trocarImagem((indiceAtual - 1 + imagens.length) % imagens.length);
    }

    setaDireita.addEventListener('click', function () {
      proxima();
      reiniciarAutoplay();
    });

    setaEsquerda.addEventListener('click', function () {
      anterior();
      reiniciarAutoplay();
    });

    // Navegação por teclado quando o hero está em foco
    document.querySelector('.hero').addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { proxima(); reiniciarAutoplay(); }
      if (e.key === 'ArrowLeft')  { anterior(); reiniciarAutoplay(); }
    });

    // Autoplay — respeita quem prefere menos movimento
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function iniciarAutoplay() {
      if (semMovimento || imagens.length < 2) return;
      autoplay = setInterval(proxima, 6000);
    }

    function reiniciarAutoplay() {
      clearInterval(autoplay);
      iniciarAutoplay();
    }

    // Pausa quando o mouse está sobre o hero
    const hero = document.querySelector('.hero');
    hero.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    hero.addEventListener('mouseleave', iniciarAutoplay);

    iniciarAutoplay();
  }

  /* ---------------- Menu mobile ---------------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.site-header__nav');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function () {
      const aberto = menu.classList.toggle('aberto');
      menuToggle.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });

    // Fecha o menu ao clicar em um link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('aberto');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  /* ---------------- Máscara de WhatsApp ---------------- */
  const campoWhatsapp = document.getElementById('whatsapp');

  if (campoWhatsapp) {
    campoWhatsapp.addEventListener('input', function () {
      let v = campoWhatsapp.value.replace(/\D/g, '').slice(0, 11);

      if (v.length > 6) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      } else if (v.length > 2) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      } else if (v.length > 0) {
        v = '(' + v;
      }

      campoWhatsapp.value = v;
    });
  }

  /* ---------------- Formulário de orçamento ----------------
     ATENÇÃO: o formulário ainda NÃO envia para lugar nenhum.
     Falta decidir o destino (e-mail, Formspree, back-end...).
     Por ora ele só valida e monta uma mensagem de WhatsApp.
     --------------------------------------------------------- */
  const form = document.getElementById('form-orcamento');
  const aviso = document.getElementById('form-aviso');

  // TODO: trocar pelo número real de WhatsApp da Sublime
  const WHATSAPP = '5547999999999';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = form.nome.value.trim();
      const whats = form.whatsapp.value.trim();
      const email = form.email.value.trim();
      const ambiente = form.ambiente.value;
      const projeto = form.projeto.value.trim();

      aviso.className = 'form-aviso';

      if (!nome || !whats || !email || !ambiente) {
        aviso.classList.add('form-aviso--erro');
        aviso.textContent = 'Preencha nome, WhatsApp, e-mail e tipo de ambiente.';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        aviso.classList.add('form-aviso--erro');
        aviso.textContent = 'Confira o e-mail digitado.';
        return;
      }

      const texto =
        'Olá! Gostaria de um orçamento.\n\n' +
        'Nome: ' + nome + '\n' +
        'WhatsApp: ' + whats + '\n' +
        'E-mail: ' + email + '\n' +
        'Ambiente: ' + ambiente +
        (projeto ? '\nProjeto: ' + projeto : '');

      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank');

      aviso.classList.add('form-aviso--ok');
      aviso.textContent = 'Tudo certo! Abrimos o WhatsApp com a sua solicitação.';
      form.reset();
    });
  }

});
