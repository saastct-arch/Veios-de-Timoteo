/* Veios de Timóteo — site behaviour.
   Two independent pieces:
   1. NavBar: sticky header that swaps tone (dark-green vs. white) depending
      on which section sits behind it, and tracks the active nav link —
      ported from the orchestrator script in the design handoff's .dc.html.
   2. RotaSection: the Leaflet route map and the point list / detail panel,
      built from window.ROTA (data/rota.js, verbatim from the handoff). */
(function () {
  'use strict';

  /* -------------------------- real photos we have -------------------------
     The handoff's per-point image slots were all empty ("Imagem a ser
     inserida") — the designer didn't have photos yet. We do, for 18 of the
     25 stops, from an earlier round of fieldwork matched by exact subject
     name. Only the "main" slot is filled; the four secondary slots stay as
     designed. Nothing here is invented — every entry is the same building,
     church, square or person the design names. */
  var FOTOS = {
    'estacao': 'estacao.jpg',
    'igreja-sao-jose': 'igreja-sao-jose.jpg',
    'praca-coreto': 'praca-coreto.jpg',
    'carnaval': 'carnaval.jpg',
    'ginasio-jose-york': 'ginasio-jose-york.jpg',
    'cantata-natal': 'cantata-natal.jpg',
    'escola-metalurgia': 'escola-metalurgia.jpg',
    'ee-percival-farquhar': 'ee-percival-farquhar.jpg',
    'pico-ana-moura': 'pico-ana-moura.jpg',
    'ee-getulio-vargas': 'ee-getulio-vargas.jpg',
    'estatua-drummond': 'estatua-drummond.jpg',
    'feira-timirim': 'feira-timirim.jpg',
    'casa-memoria-legislativo': 'casa-memoria-legislativo.jpg',
    'igreja-sao-sebastiao': 'igreja-sao-sebastiao.jpg',
    'tapetes-corpus-christi': 'tapetes-corpus-christi.jpg',
    'oikos': 'oikos.jpg',
    'forno-hoffmann': 'forno-hoffmann.jpg',
    'ponte-maua': 'ponte-maua.jpg'
  };

  /* ============================== NavBar ============================== */
  var SECTION_TONES = [
    { id: 'top', tone: 'light' },
    { id: 'historia', tone: 'dark' },
    { id: 'mapa', tone: 'light' },
    { id: 'intervencoes', tone: 'dark' },
    { id: 'manifesto', tone: 'light' },
    { id: 'rodape', tone: 'light' }
  ];
  var LINK_IDS = ['historia', 'mapa', 'intervencoes'];

  function initNav() {
    var nav = document.getElementById('navbar');
    var links = nav.querySelectorAll('.navbar__link');
    var toggle = document.getElementById('navbar-toggle');
    var linksWrap = document.getElementById('navbar-links');
    var state = { tone: 'light', active: 'historia' };

    function apply() {
      nav.dataset.tone = state.tone;
      links.forEach(function (a) {
        a.setAttribute('aria-current', a.dataset.section === state.active ? 'true' : 'false');
      });
    }

    function onScroll() {
      var line = 40;
      var tone = state.tone;
      for (var i = 0; i < SECTION_TONES.length; i++) {
        var el = document.getElementById(SECTION_TONES[i].id);
        if (!el) continue;
        var r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) { tone = SECTION_TONES[i].tone; break; }
      }
      var active = state.active;
      var hit = LINK_IDS
        .map(function (id) { return document.getElementById(id); })
        .filter(function (el) { return el && el.getBoundingClientRect().top < 220; });
      if (hit.length) active = hit[hit.length - 1].id;
      if (tone !== state.tone || active !== state.active) {
        state.tone = tone; state.active = active; apply();
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    apply();

    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.dataset.section;
        var target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
          linksWrap.classList.remove('is-open');
        }
      });
    });

    if (toggle) {
      toggle.addEventListener('click', function () {
        linksWrap.classList.toggle('is-open');
      });
    }
  }

  /* ============================= RotaSection ============================ */
  function mapsHref(p) {
    return 'https://www.google.com/maps/search/?api=1&query=' + p.coords[0] + ',' + p.coords[1];
  }

  function fmtTime(t) { return t.replace(/^00:/, ''); }
  function fmtKm(km) { return String(km).replace('.', ','); }

  function imgSlotHTML(id, extraClass) {
    var src = FOTOS[id];
    if (src) return '<div class="rota__img-slot ' + extraClass + '"><img src="assets/img/' + src + '" alt=""></div>';
    return '<div class="rota__img-slot ' + extraClass + '"><span>Imagem a ser inserida</span></div>';
  }

  function pointDetailHTML(point) {
    var ROTA = window.ROTA;
    var html = '';
    html += '<button class="rota__back" type="button" data-action="clear">' + window.icon('chevron-left', { size: 14 }) + ' Todos os pontos</button>';
    html += '<div class="rota__detail-head"><span class="tag-number tag-number--active">' + point.number + '</span><h3 class="rota__detail-name">' + point.name + '</h3></div>';
    html += '<div class="rota__imgs">';
    html += imgSlotHTML(point.id, 'rota__img-main');
    for (var i = 2; i <= 5; i++) html += '<div class="rota__img-slot"><span>Imagem a ser inserida</span></div>';
    html += '</div>';
    html += '<p class="rota__long">' + (point.long || point.short) + '</p>';
    html += '<a class="btn btn--inverse btn--sm" href="' + mapsHref(point) + '" target="_blank" rel="noreferrer">Ver no Google Maps ' + window.icon('arrow-up-right', { size: 14 }) + '</a>';
    if (point.links && point.links.length) {
      html += '<div><span class="rota__links-label">PARA SABER MAIS</span><div class="rota__links" style="margin-top:var(--space-3)">';
      point.links.forEach(function (l) {
        html += '<a class="btn btn--inverse btn--sm" href="' + l.url + '" target="_blank" rel="noreferrer">' + l.label + ' ' + window.icon('arrow-up-right', { size: 14 }) + '</a>';
      });
      html += '</div></div>';
    }
    if (point.next) {
      var nextPoint = ROTA.filter(function (p) { return p.id === point.next.id; })[0];
      html += '<div class="rota__next">' + window.icon('arrow-up-right', { size: 16, color: 'var(--copper-300)' }) +
        '<div><span class="rota__next-name">Próximo: ' + nextPoint.name + '</span>' +
        '<span class="rota__next-meta">' + fmtTime(point.next.time) + ' (min:seg) de carro · ' + fmtKm(point.next.km) + ' km</span></div>' +
        '<button class="rota__next-go" type="button" data-action="goto" data-id="' + point.next.id + '">IR</button></div>';
    } else {
      html += '<div class="rota__end">Este é o ponto final da rota.</div>';
    }
    return html;
  }

  function listHTML() {
    var html = '<p class="eyebrow eyebrow--inverse">Conheça os patrimônios e atrações da rota</p><div class="rota__list">';
    window.ROTA.forEach(function (p) {
      html += '<button class="rota__list-item" type="button" data-action="goto" data-id="' + p.id + '">' +
        '<span class="tag-number tag-number--active">' + p.number + '</span>' +
        '<span><span class="rota__list-name">' + p.name + '</span><span class="rota__list-short">' + p.short + '</span></span>' +
        '</button>';
    });
    html += '</div>';
    return html;
  }

  function initRota() {
    var ROTA = window.ROTA;
    var panel = document.getElementById('rota-panel');
    var selected = null;
    var map, markers = {}, routeLayer;

    function renderPanel() {
      var point = ROTA.filter(function (p) { return p.id === selected; })[0];
      panel.innerHTML = point ? pointDetailHTML(point) : listHTML();
      panel.querySelectorAll('[data-action="goto"]').forEach(function (btn) {
        btn.addEventListener('click', function () { select(btn.dataset.id, true); });
      });
      var clearBtn = panel.querySelector('[data-action="clear"]');
      if (clearBtn) clearBtn.addEventListener('click', function () { select(null, false); });
    }

    function updateMarkerStyles() {
      Object.keys(markers).forEach(function (id) {
        var m = markers[id];
        var el = m.getElement && m.getElement();
        if (!el) return;
        var dot = el.firstElementChild;
        if (!dot) return;
        var on = id === selected;
        dot.style.background = on ? '#BD7F4F' : '#1B2B22';
        dot.style.boxShadow = on ? '0 0 16px rgba(210,156,113,.95), 0 0 0 2px rgba(255,255,255,.95)' : '0 0 0 2px rgba(255,255,255,.9)';
        dot.style.transform = on ? 'scale(1.18)' : 'scale(1)';
        dot.style.transition = 'all 160ms cubic-bezier(.22,.61,.36,1)';
      });
    }

    function select(id, flyTo) {
      selected = id;
      renderPanel();
      updateMarkerStyles();
      if (flyTo && id && map) {
        var p = ROTA.filter(function (x) { return x.id === id; })[0];
        if (p) map.flyTo(p.coords, Math.max(map.getZoom(), 16), { duration: 1.1 });
      }
    }

    renderPanel();

    if (typeof L === 'undefined') return; // Leaflet failed to load — panel still works without the map.

    var host = document.getElementById('rota-map-host');
    map = L.map(host, { zoomControl: false, scrollWheelZoom: true, attributionControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);
    host.classList.add('tile-plate');

    var line = ROTA.map(function (p) { return p.coords; });
    routeLayer = L.layerGroup().addTo(map);
    L.polyline(line, { color: '#122018', weight: 9, opacity: .55, lineCap: 'round' }).addTo(routeLayer);
    L.polyline(line, { color: '#BD7F4F', weight: 3.5, opacity: 1, lineCap: 'round' }).addTo(routeLayer);

    ROTA.forEach(function (p) {
      var html = '<span style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#1B2B22;color:#FFFFFF;font:600 12px/1 Archivo,sans-serif;box-shadow:0 0 0 2px rgba(255,255,255,.9)">' + p.number + '</span>';
      var m = L.marker(p.coords, {
        icon: L.divIcon({ html: html, className: 'veio-pin', iconSize: [30, 30], iconAnchor: [15, 15] }),
        title: p.name
      }).addTo(map);
      m.on('click', function () { select(p.id, false); });
      markers[p.id] = m;
    });
    map.fitBounds(line, { padding: [56, 56] });
    setTimeout(function () { map.invalidateSize(); }, 60);

    document.getElementById('map-zoom-in').addEventListener('click', function () { map.setZoom(map.getZoom() + 1); });
    document.getElementById('map-zoom-out').addEventListener('click', function () { map.setZoom(map.getZoom() - 1); });
    document.getElementById('map-zoom-reset').addEventListener('click', function () { map.fitBounds(line, { padding: [56, 56] }); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initRota();
  });
})();
