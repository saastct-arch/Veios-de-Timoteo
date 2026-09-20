/* Veios de Timóteo — circuito de patrimônio
   Mapa Leaflet + OpenStreetMap, rota com paradas numeradas. */
(function () {
  'use strict';

  var PONTOS = window.PONTOS || [];
  var CATS = ['imaterial', 'potencial', 'reconhecido'];
  var ROTULO = {
    imaterial: 'Imaterial',
    potencial: 'Material — potencial',
    reconhecido: 'Material — reconhecido'
  };

  var ativos = {};
  CATS.forEach(function (c) { ativos[c] = true; });

  var mapa, camadaRota, marcadores = {}, selecionado = null;

  /* ---------- utilidades ---------- */
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function visiveis() {
    return PONTOS.filter(function (p) { return ativos[p.cat]; });
  }

  /* Bloco de imagem: foto real ou identificador de pendência. */
  function figura(p) {
    var fig = el('figure');
    if (p.foto) {
      var img = el('img');
      img.src = 'assets/img/' + encodeURIComponent(p.foto);
      img.alt = p.nome;
      img.loading = 'lazy';
      fig.appendChild(img);
    } else {
      var f = el('div', 'falta');
      f.appendChild(el('span', null, 'Falta fotografia'));
      f.appendChild(el('small', null, 'parada ' + p.n + ' · ' + p.nome));
      fig.appendChild(f);
    }
    return fig;
  }

  /* ---------- mapa ---------- */
  function iniciaMapa() {
    mapa = L.map('mapa', { scrollWheelZoom: false, zoomControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; colaboradores do <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapa);
    camadaRota = L.layerGroup().addTo(mapa);

    PONTOS.forEach(function (p) {
      var icone = L.divIcon({
        className: '',
        html: '<div class="pino ' + p.cat + '" data-id="' + p.id + '"><b>' + p.n + '</b></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -28]
      });
      var m = L.marker([p.lat, p.lng], { icon: icone, title: p.nome, alt: p.nome });
      m.bindPopup('<b>' + p.nome + '</b>' + ROTULO[p.cat]);
      m.on('click', function () { seleciona(p.id, false); });
      marcadores[p.id] = m;
    });

    desenha();
    var todos = PONTOS.map(function (p) { return [p.lat, p.lng]; });
    if (todos.length) mapa.fitBounds(todos, { padding: [44, 44] });
  }

  /* Redesenha pinos e a linha da rota conforme os filtros. */
  function desenha() {
    camadaRota.clearLayers();
    var vis = visiveis();
    if (vis.length > 1) {
      L.polyline(vis.map(function (p) { return [p.lat, p.lng]; }), {
        color: '#D29C71', weight: 2, opacity: .55, dashArray: '5 7'
      }).addTo(camadaRota);
    }
    vis.forEach(function (p) { camadaRota.addLayer(marcadores[p.id]); });
  }

  /* ---------- painel de detalhe ---------- */
  function seleciona(id, moverMapa) {
    var p = PONTOS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    selecionado = id;

    var painel = document.getElementById('painel');
    painel.innerHTML = '';
    painel.appendChild(figura(p));

    var corpo = el('div', 'painel-corpo');
    var topo = el('div');
    topo.appendChild(el('span', 'num', 'Parada ' + p.n));
    topo.appendChild(document.createTextNode(' '));
    topo.appendChild(el('span', 'selo ' + p.cat, ROTULO[p.cat]));
    corpo.appendChild(topo);
    corpo.appendChild(el('h3', null, p.nome));

    if (p.resumo) corpo.appendChild(el('p', 'resumo', p.resumo));
    if (p.endereco) corpo.appendChild(el('p', 'end', p.endereco));

    if (p.porque && p.porque.length) {
      var ul = el('ul');
      p.porque.forEach(function (t) { ul.appendChild(el('li', null, t)); });
      corpo.appendChild(ul);
    }
    if (p.tags && p.tags.length) {
      var tg = el('div', 'tags');
      p.tags.forEach(function (t) { tg.appendChild(el('span', 'tag', t)); });
      corpo.appendChild(tg);
    }
    if (p.pendente) {
      var av = el('div', 'aviso-texto');
      av.appendChild(el('b', null, 'Texto pendente'));
      av.appendChild(document.createTextNode(
        'Este bem ainda não tem descrição de valor levantada. Falta pesquisa documental antes de publicar.'));
      corpo.appendChild(av);
    }
    if (p.fontes && p.fontes.length) {
      var fo = el('div', 'fontes');
      fo.appendChild(el('b', null, p.fontes.length > 1 ? 'Fontes' : 'Fonte'));
      p.fontes.forEach(function (f) {
        if (f.u) {
          var a = el('a', null, f.t);
          a.href = f.u;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          fo.appendChild(a);
        } else {
          fo.appendChild(el('span', null, f.t));
        }
      });
      corpo.appendChild(fo);
    }
    painel.appendChild(corpo);

    document.querySelectorAll('.pino').forEach(function (n) {
      n.classList.toggle('ativo', n.dataset.id === id);
    });
    if (moverMapa) {
      mapa.flyTo([p.lat, p.lng], Math.max(mapa.getZoom(), 16), { duration: .8 });
      document.getElementById('mapa-sec').scrollIntoView({ block: 'start' });
    }
  }

  /* ---------- grade de fichas ---------- */
  function montaGrade() {
    var g = document.getElementById('grade');
    g.innerHTML = '';
    var vis = visiveis();
    vis.forEach(function (p, i) {
      var b = el('button', 'ficha');
      b.type = 'button';
      b.style.animationDelay = Math.min(i * 28, 400) + 'ms';
      b.appendChild(figura(p));
      var c = el('div', 'ficha-corpo');
      var topo = el('div');
      topo.appendChild(el('span', 'num', 'Parada ' + p.n));
      c.appendChild(topo);
      c.appendChild(el('h3', null, p.nome));
      c.appendChild(el('p', null, p.resumo
        ? p.resumo.slice(0, 104) + (p.resumo.length > 104 ? '…' : '')
        : 'Descrição de valor ainda não levantada.'));
      c.appendChild(el('span', 'selo ' + p.cat, ROTULO[p.cat]));
      b.appendChild(c);
      b.addEventListener('click', function () { seleciona(p.id, true); });
      g.appendChild(b);
    });
    if (!vis.length) {
      g.appendChild(el('p', null, 'Nenhuma categoria selecionada.'));
    }
  }

  /* ---------- filtros ---------- */
  function ligaFiltros() {
    document.querySelectorAll('.filtro').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var c = btn.dataset.cat;
        ativos[c] = !ativos[c];
        btn.setAttribute('aria-pressed', String(ativos[c]));
        desenha();
        montaGrade();
      });
    });
  }


  /* ---------- contadores ---------- */
  function contadores() {
    var c = { imaterial: 0, potencial: 0, reconhecido: 0 };
    PONTOS.forEach(function (p) { c[p.cat]++; });
    document.getElementById('n-total').textContent = PONTOS.length;
    document.getElementById('n-imaterial').textContent = c.imaterial;
    document.getElementById('n-reconhecido').textContent = c.reconhecido;
  }

  /* ---------- entrada em cena ---------- */
  function revela() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('anim'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.cab, .ibge, .tw').forEach(function (n) { io.observe(n); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    contadores();
    iniciaMapa();
    montaGrade();
    ligaFiltros();
    revela();
  });
})();
