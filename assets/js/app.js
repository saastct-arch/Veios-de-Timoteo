/* Veios de Timóteo — site behaviour.
   Three independent pieces:
   1. NavBar: sticky header that swaps tone (dark-green vs. white) depending
      on which section sits behind it, and tracks the active nav link —
      ported from the orchestrator script in the design handoff's .dc.html.
   2. RotaSection: the Leaflet route map and the point list / detail panel,
      built from window.ROTA, window.ROTAS_TEMATICAS and window.FOTOS
      (data/rota.js — the single source for points, routes and photos).
   3. Lightbox: the <dialog> that enlarges a point's photographs. */
(function () {
  'use strict';

  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function scrollBehavior() { return motionQuery && motionQuery.matches ? 'auto' : 'smooth'; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Height of the sticky header, read live: it is the one fixed element
     that can cover content scrolled to the top of the viewport. */
  function headerOffset() {
    var nav = document.getElementById('navbar');
    return nav ? nav.getBoundingClientRect().height : 0;
  }

  /* Bring `el` into the comfortable reading zone of the window — just below
     the sticky header — but only when it is not already there. Used after
     the route panel swaps content, so the visitor lands on the new title
     instead of wherever the previous point's text left the page. */
  function revealInViewport(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top;
    var limit = headerOffset() + 16;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (top >= limit && top <= vh * 0.45) return;
    window.scrollTo({ top: Math.max(0, window.pageYOffset + top - limit), behavior: scrollBehavior() });
  }

  /* ============================== NavBar ============================== */
  var SECTION_TONES = [
    { id: 'top', tone: 'light' },
    { id: 'mapa', tone: 'light' },
    { id: 'historia', tone: 'dark' },
    { id: 'intervencoes', tone: 'dark' },
    { id: 'manifesto', tone: 'light' },
    { id: 'rodape', tone: 'light' }
  ];
  var LINK_IDS = ['mapa', 'historia', 'intervencoes'];

  function initNav() {
    var nav = document.getElementById('navbar');
    var links = nav.querySelectorAll('.navbar__link');
    var toggle = document.getElementById('navbar-toggle');
    var linksWrap = document.getElementById('navbar-links');
    var state = { tone: 'light', active: null };

    function apply() {
      nav.dataset.tone = state.tone;
      links.forEach(function (a) {
        if (a.dataset.section === state.active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
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
      var active = null;
      LINK_IDS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 220) active = id;
      });
      if (tone !== state.tone || active !== state.active) {
        state.tone = tone; state.active = active; apply();
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    apply();

    function closeMenu() {
      linksWrap.classList.remove('is-open');
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); }
    }

    // Anchors scroll natively; html's scroll-padding-top keeps targets
    // clear of the sticky header. Only the mobile menu needs closing.
    linksWrap.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = linksWrap.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && linksWrap.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
      });
    }
  }

  /* ============================== Lightbox ============================= */
  function initLightbox() {
    var dlg = document.getElementById('photo-dialog');
    if (!dlg || typeof dlg.showModal !== 'function') {
      // No <dialog> support: open the file itself instead.
      return { open: function (photos, i) { window.open(photos[i].src, '_blank', 'noopener'); } };
    }
    var img = dlg.querySelector('.lightbox__img');
    var cap = dlg.querySelector('.lightbox__caption');
    var count = dlg.querySelector('.lightbox__count');
    var prevBtn = dlg.querySelector('[data-lightbox="prev"]');
    var nextBtn = dlg.querySelector('[data-lightbox="next"]');
    var list = [], idx = 0, title = '';

    function show() {
      var p = list[idx];
      img.src = p.src; img.alt = p.alt || '';
      img.width = p.w || 0; img.height = p.h || 0;
      cap.innerHTML = '<strong>' + esc(title) + '</strong> ' + esc(p.alt || '') +
        (p.credit ? ' <span class="lightbox__credit">Foto: ' + esc(p.credit) + '</span>' : '');
      count.textContent = list.length > 1 ? (idx + 1) + ' de ' + list.length : '';
      prevBtn.hidden = nextBtn.hidden = list.length < 2;
    }
    function step(d) { idx = (idx + d + list.length) % list.length; show(); }

    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    dlg.querySelector('[data-lightbox="close"]').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (list.length < 2) return;
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    return {
      open: function (photos, i, name) {
        list = photos; idx = i || 0; title = name || '';
        show();
        dlg.showModal();
      }
    };
  }

  /* ============================= RotaSection ============================ */
  function mapsHref(p) {
    // The postal address, when the point has one, is the most reliable
    // destination for a visitor; coordinates otherwise.
    var q = p.address ? p.address.replace(/\s+—\s+/g, ', ') : p.coords[0] + ',' + p.coords[1];
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }

  function sameSpot(a, b) { return a.coords[0] === b.coords[0] && a.coords[1] === b.coords[1]; }

  /* "00:07:00" + 3.132 → "7 min de carro · 3,1 km". Only real measured
     hops reach this (see showTiming in stepsHTML). */
  function fmtHop(hop) {
    var t = hop.time.split(':').map(Number);
    var secs = t[0] * 3600 + t[1] * 60 + t[2];
    var time = secs < 60 ? 'menos de 1 min' : Math.round(secs / 60) + ' min';
    var dist = hop.km < 1 ? Math.round(hop.km * 1000) + ' m' : String(Math.round(hop.km * 10) / 10).replace('.', ',') + ' km';
    return time + ' de carro · ' + dist;
  }

  /* Long texts arrive as one block; break them into paragraphs of about
     two sentences so they read with some air. Abbreviations such as "E.E."
     or "nº." never end a sentence here. */
  function paragraphs(text) {
    // (No lookbehind: older Safari can't parse it and would drop the script.)
    var parts = text.replace(/([.!?])\s+(?=[A-ZÀ-Ý“"])/g, '$1\u0000').split('\u0000');
    var sentences = [];
    parts.forEach(function (s) {
      var prev = sentences[sentences.length - 1];
      var lastWord = prev ? prev.split(/\s+/).pop() : '';
      if (prev && lastWord.replace(/[^.]/g, '').length && lastWord.length <= 4) sentences[sentences.length - 1] = prev + ' ' + s;
      else sentences.push(s);
    });
    var out = [], cur = '';
    sentences.forEach(function (s) {
      cur = cur ? cur + ' ' + s : s;
      if (cur.length >= 220) { out.push(cur); cur = ''; }
    });
    if (cur) {
      if (out.length && cur.length < 90) out[out.length - 1] += ' ' + cur;
      else out.push(cur);
    }
    return out;
  }

  /* Great-circle distance in km, used only to rank candidates — matches the
     design's own haversine helper in RotaSection.jsx. */
  function haversine(a, b) {
    var R = 6371, toRad = function (d) { return (d * Math.PI) / 180; };
    var dLat = toRad(b[0] - a[0]), dLng = toRad(b[1] - a[1]);
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  /* Greedy nearest-neighbor ordering for the thematic routes: keeps the
     first listed point as the start, then always visits whichever
     remaining point is closest. Ported verbatim from RotaSection.jsx. */
  function orderByProximity(points) {
    if (points.length < 3) return points;
    var remaining = points.slice(1);
    var ordered = [points[0]];
    var current = points[0];
    while (remaining.length) {
      var bestIdx = 0, bestDist = Infinity;
      remaining.forEach(function (p, i) {
        var d = haversine(current.coords, p.coords);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      current = remaining.splice(bestIdx, 1)[0];
      ordered.push(current);
    }
    return ordered;
  }

  /* Real street-following geometry between two stops, via the public OSRM
     demo router — same endpoint RotaSection.jsx calls. Each pair is asked
     for once per page view (cached), so switching routes back and forth
     doesn't repeat requests. Resolves to null when unavailable; the caller
     keeps the straight line. */
  var segmentCache = {};
  function fetchRouteSegment(coords1, coords2) {
    var key = coords1.join(',') + ';' + coords2.join(',');
    if (segmentCache[key]) return segmentCache[key];
    var url = 'https://router.project-osrm.org/route/v1/car/' +
      coords1[1] + ',' + coords1[0] + ';' + coords2[1] + ',' + coords2[0] +
      '?geometries=geojson&overview=full';
    segmentCache[key] = fetch(url).then(function (res) { return res.json(); }).then(function (data) {
      var coords = data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates;
      return coords ? coords.map(function (c) { return [c[1], c[0]]; }) : null;
    }).catch(function () {
      if (!fetchRouteSegment.warned) { fetchRouteSegment.warned = true; console.warn('Roteador OSRM indisponível — trajeto desenhado em linha reta.'); }
      return null;
    });
    return segmentCache[key];
  }

  var VEIO_MARK = '<svg viewBox="0 0 84 200" width="34" height="80" aria-hidden="true" style="overflow:visible">' +
    '<g fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round">' +
    '<path d="M18 30C6 60 28 78 16 108c-11 28 11 44 1 62"/><path d="M42 26C28 60 54 76 40 110c-13 32 10 46 1 60"/>' +
    '<path d="M66 32C54 62 76 80 64 108c-11 26 10 42 1 58"/></g></svg>';

  function galleryHTML(point) {
    var photos = (window.FOTOS || {})[point.id] || [];
    if (!photos.length) {
      // Deliberate state, not a broken slot: no verified photograph of this
      // place yet, and the project does not stand in another place's image.
      return '<div class="rota__photo-empty" role="img" aria-label="Ainda não há fotografia verificada deste ponto.">' +
        VEIO_MARK + '<span class="rota__photo-empty-title">Fotografia em levantamento</span>' +
        '<span class="rota__photo-empty-note">Ainda não há imagem verificada deste ponto. Visite o local e conheça-o pessoalmente.</span></div>';
    }
    var main = photos[0];
    var html = '<figure class="rota__gallery">';
    html += '<button class="rota__photo rota__photo--main" type="button" data-action="photo" data-index="0" aria-label="Ampliar fotografia: ' + esc(main.alt) + '">' +
      '<img src="' + esc(main.src) + '" width="' + main.w + '" height="' + main.h + '" alt="' + esc(main.alt) + '" decoding="async"></button>';
    if (photos.length > 1) {
      html += '<div class="rota__thumbs">';
      photos.slice(1).forEach(function (p, i) {
        html += '<button class="rota__photo" type="button" data-action="photo" data-index="' + (i + 1) + '" aria-label="Ampliar fotografia ' + (i + 2) + ' de ' + photos.length + ': ' + esc(p.alt) + '">' +
          '<img src="' + esc(p.src) + '" width="' + p.w + '" height="' + p.h + '" alt="" loading="lazy" decoding="async"></button>';
      });
      html += '</div>';
    }
    var credits = photos.filter(function (p) { return p.credit; }).map(function (p) { return p.credit; });
    html += '<figcaption class="rota__photo-caption">' +
      (photos.length > 1 ? photos.length + ' fotografias · toque para ampliar' : 'Toque para ampliar') +
      (credits.length ? ' · Créditos: ' + esc(credits.filter(function (c, i) { return credits.indexOf(c) === i; }).join(', ')) : '') +
      '</figcaption></figure>';
    return html;
  }

  function stepsHTML(point, prev, next, routeLabel) {
    var html = '<nav class="rota__steps" aria-label="Navegar entre os pontos do roteiro">';
    if (prev) {
      html += '<button class="rota__step-prev" type="button" data-action="goto" data-id="' + prev.id + '" aria-label="Voltar ao ponto anterior: ' + esc(prev.name) + '">' +
        window.icon('arrow-left', { size: 16 }) + '<span><span class="rota__step-label">Anterior</span><span class="rota__step-name">' + esc(prev.name) + '</span></span></button>';
    }
    if (next) {
      // Timing/distance only when the next stop in the *active* route is
      // the measured next hop of the master sequence — never estimated.
      var meta = '';
      if (sameSpot(point, next)) meta = 'No mesmo local';
      else if (point.next && point.next.id === next.id) meta = fmtHop(point.next);
      html += '<div class="rota__next">' +
        '<div class="rota__next-text"><span class="rota__step-label">Próximo</span><span class="rota__next-name">' + esc(next.name) + '</span>' +
        (meta ? '<span class="rota__next-meta">' + meta + '</span>' : '') + '</div>' +
        '<button class="rota__next-go" type="button" data-action="goto" data-id="' + next.id + '" aria-label="Ir para o próximo ponto: ' + esc(next.name) + '">IR ' + window.icon('arrow-right', { size: 16 }) + '</button></div>';
    } else {
      html += '<div class="rota__end"><span>Você chegou ao ponto final do roteiro ' + esc(routeLabel) + '.</span>' +
        '<button class="rota__end-btn" type="button" data-action="clear">Ver todos os pontos</button></div>';
    }
    return html + '</nav>';
  }

  function pointDetailHTML(point, idx, total, prev, next, route, otherRoutes) {
    var html = '<article class="rota__detail" aria-labelledby="rota-detail-title">';
    html += '<button class="rota__back" type="button" data-action="clear">' + window.icon('chevron-left', { size: 14 }) + ' Todos os pontos</button>';
    html += '<header class="rota__detail-head">' +
      '<p class="rota__progress"><span>Ponto <strong>' + (idx + 1) + '</strong> de ' + total + '</span> · ' + esc(route.label) + '</p>' +
      '<div class="rota__progress-veio" aria-hidden="true"><span style="width:' + ((idx + 1) / total * 100).toFixed(2) + '%"></span></div>' +
      '<div class="rota__detail-title"><span class="tag-number tag-number--active' + (point.tipo === 'manifestacao' ? ' tag-number--event' : '') + '" aria-hidden="true">' + (idx + 1) + '</span>' +
      '<h3 class="rota__detail-name" id="rota-detail-title" tabindex="-1">' + esc(point.name) + '</h3></div>' +
      (point.tipo === 'manifestacao' ? '<p class="rota__kind">Manifestação cultural</p>' : '') +
      '</header>';
    html += galleryHTML(point);
    html += '<div class="rota__text">' + paragraphs(point.long || point.short).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
    if (point.address) {
      html += '<p class="rota__address">' + window.icon('map-pin', { size: 16, color: 'var(--copper-300)' }) +
        '<span><span class="rota__links-label">' + (point.tipo === 'manifestacao' ? 'Endereço de referência' : 'Endereço') + '</span>' + esc(point.address) + '</span></p>';
    }
    html += '<div class="rota__actions">' +
      '<a class="btn btn--inverse btn--sm" href="' + mapsHref(point) + '" target="_blank" rel="noreferrer">Abrir no Google Maps ' + window.icon('arrow-up-right', { size: 14 }) + '</a>' +
      '<button class="btn btn--inverse btn--sm rota__to-map" type="button" data-action="show-map">' + window.icon('map', { size: 14 }) + ' Ver no mapa</button></div>';
    if (otherRoutes.length) {
      html += '<div class="rota__also"><span class="rota__links-label">Também nos roteiros</span><div class="rota__links">';
      otherRoutes.forEach(function (r) {
        html += '<button class="rota__chip" type="button" data-action="route" data-route="' + r.id + '">' + window.icon(r.icon, { size: 13, color: 'var(--copper-300)' }) + esc(r.label) + '</button>';
      });
      html += '</div></div>';
    }
    if (point.links && point.links.length) {
      html += '<div><span class="rota__links-label">Para saber mais</span><div class="rota__links">';
      point.links.forEach(function (l) {
        html += '<a class="btn btn--inverse btn--sm" href="' + esc(l.url) + '" target="_blank" rel="noreferrer">' + esc(l.label) + ' ' + window.icon('arrow-up-right', { size: 14 }) + '</a>';
      });
      html += '</div></div>';
    }
    html += stepsHTML(point, prev, next, route.label);
    return html + '</article>';
  }

  function listHTML(points, heading) {
    var html = '<h3 class="rota__list-heading eyebrow eyebrow--inverse">' + esc(heading) + '</h3><ol class="rota__list">';
    points.forEach(function (p, i) {
      var event = p.tipo === 'manifestacao';
      html += '<li><button class="rota__list-item" type="button" data-action="goto" data-id="' + p.id + '">' +
        '<span class="tag-number tag-number--active' + (event ? ' tag-number--event' : '') + '" aria-hidden="true">' + (i + 1) + '</span>' +
        '<span><span class="rota__list-name">' + esc(p.name) + '</span>' +
        (event ? '<span class="rota__list-kind">Manifestação cultural</span>' : '') +
        '<span class="rota__list-short">' + esc(p.short) + '</span></span>' +
        '</button></li>';
    });
    return html + '</ol>';
  }

  function initRota(lightbox) {
    var ROTA = window.ROTA;
    var ROTAS_TEMATICAS = window.ROTAS_TEMATICAS || [];
    var principal = { id: 'principal', label: 'Rota Principal', icon: 'route', pointIds: ROTA.map(function (p) { return p.id; }) };
    var routes = [principal].concat(ROTAS_TEMATICAS);
    var byId = {};
    ROTA.forEach(function (p) { byId[p.id] = p; });

    var panel = document.getElementById('rota-panel');
    var pillsWrap = document.getElementById('rota-pills');
    var countEl = document.getElementById('rota-count');
    var mapEl = document.getElementById('rota-map');
    var routeId = 'principal';
    var selected = null;
    var points = [];
    var map, markers = {}, lineLayer, segmentsById = {}, fetchToken = 0;

    function activeRoute() {
      for (var i = 0; i < routes.length; i++) if (routes[i].id === routeId) return routes[i];
      return routes[0];
    }

    /* The Rota Principal follows its planned stop sequence (`number`, the
       order of the measured .gpx hops); thematic routes are re-ordered by
       proximity, as in the design. Stable sort keeps entries that share a
       stop in data order. */
    function recomputePoints() {
      var raw = activeRoute().pointIds.map(function (id) { return byId[id]; }).filter(Boolean);
      points = routeId === 'principal'
        ? raw.slice().sort(function (a, b) { return Number(a.number) - Number(b.number); })
        : orderByProximity(raw);
      if (countEl) {
        var stops = {};
        points.forEach(function (p) { stops[p.coords.join(',')] = 1; });
        var nStops = Object.keys(stops).length;
        countEl.textContent = points.length + ' pontos' + (nStops !== points.length ? ' em ' + nStops + ' paradas' : '');
      }
    }

    function renderPills() {
      pillsWrap.innerHTML = '';
      routes.forEach(function (r) {
        var active = r.id === routeId;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rota__pill';
        btn.setAttribute('aria-pressed', String(active));
        btn.innerHTML = window.icon(r.icon, { size: 14 }) + '<span>' + esc(r.label) + '</span>' +
          '<span class="rota__pill-count" aria-label="' + r.pointIds.length + ' pontos">' + r.pointIds.length + '</span>';
        btn.addEventListener('click', function () { selectRoute(r.id, null); });
        pillsWrap.appendChild(btn);
      });
    }

    function renderPanel() {
      var route = activeRoute();
      var point = selected ? byId[selected] : null;
      var idx = point ? points.indexOf(point) : -1;
      if (point && idx >= 0) {
        var others = routes.filter(function (r) { return r.id !== route.id && r.id !== 'principal' && r.pointIds.indexOf(point.id) >= 0; });
        panel.innerHTML = pointDetailHTML(point, idx, points.length,
          idx > 0 ? points[idx - 1] : null,
          idx < points.length - 1 ? points[idx + 1] : null,
          route, others);
      } else {
        panel.innerHTML = listHTML(points, route.id === 'principal' ? 'Conheça os patrimônios e atrações da rota' : 'Roteiro ' + route.label);
      }
    }

    // One delegated handler survives every re-render of the panel.
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn || !panel.contains(btn)) return;
      var action = btn.dataset.action;
      if (action === 'goto') select(btn.dataset.id, { fly: true, focus: true });
      else if (action === 'clear') select(null, { focus: true });
      else if (action === 'route') selectRoute(btn.dataset.route, selected);
      else if (action === 'photo') {
        var point = byId[selected];
        lightbox.open((window.FOTOS || {})[selected] || [], Number(btn.dataset.index), point ? point.name : '');
      } else if (action === 'show-map') {
        revealInViewport(mapEl);
        var p = byId[selected];
        if (map && p) map.flyTo(p.coords, Math.max(map.getZoom(), 16), { duration: motionQuery && motionQuery.matches ? 0 : 1.1 });
      }
    });

    // A photo that fails to load must not leave a broken card behind.
    panel.addEventListener('error', function (e) {
      if (e.target.tagName !== 'IMG') return;
      var btn = e.target.closest('.rota__photo');
      if (!btn) return;
      if (btn.classList.contains('rota__photo--main')) {
        btn.outerHTML = galleryHTML({ id: '__none__' });
      } else {
        btn.remove();
      }
    }, true);

    function markerEl(id) {
      var m = markers[id];
      return m && m.getElement ? m.getElement() : null;
    }

    function updateMarkerStyles() {
      Object.keys(markers).forEach(function (id) {
        var el = markerEl(id);
        var on = id === selected;
        if (el) el.classList.toggle('is-active', on);
        markers[id].setZIndexOffset(on ? 1000 : 0);
      });
    }

    /* Markers closer than a pin's width are fanned out around their shared
       spot (a dot keeps the true position), so stops with two entries —
       e.g. Igreja São José and the Tapetes de Corpus Christi — stay
       individually visible and clickable at every zoom. */
    function spreadMarkers() {
      if (!map) return;
      var groups = [];
      points.forEach(function (p) {
        var pt = map.latLngToLayerPoint(p.coords);
        var g = null;
        for (var i = 0; i < groups.length; i++) if (groups[i].c.distanceTo(pt) < 26) { g = groups[i]; break; }
        if (g) g.ids.push(p.id); else groups.push({ c: pt, ids: [p.id] });
      });
      groups.forEach(function (g) {
        var n = g.ids.length;
        g.ids.forEach(function (id, i) {
          var el = markerEl(id);
          if (!el) return;
          var dx = 0, dy = 0;
          if (n > 1) {
            var ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
            var r = 12 + 3 * n;
            dx = Math.round(r * Math.cos(ang)); dy = Math.round(r * Math.sin(ang));
          }
          el.style.setProperty('--dx', dx + 'px');
          el.style.setProperty('--dy', dy + 'px');
          el.classList.toggle('is-spread', n > 1);
        });
      });
    }

    function select(id, opts) {
      opts = opts || {};
      var previous = selected;
      selected = id;
      renderPanel();
      updateMarkerStyles();
      drawSegments();
      // The panel is replaced wholesale, synchronously, so the new title is
      // already in the DOM here; photos have reserved dimensions, so nothing
      // below shifts as they load. Reset the panel's own scroll (it scrolls
      // independently on wide screens), then make sure the window shows the
      // new title just under the sticky header.
      panel.scrollTop = 0;
      if (id) {
        var head = panel.querySelector('.rota__detail-head');
        revealInViewport(head);
        if (opts.focus) {
          var h = document.getElementById('rota-detail-title');
          if (h) h.focus({ preventScroll: true });
        }
        if (opts.fly && map) {
          var p = byId[id];
          if (p) map.flyTo(p.coords, Math.max(map.getZoom(), 16), { duration: motionQuery && motionQuery.matches ? 0 : 1.1 });
        }
      } else if (previous) {
        // Back to the list: return to the row the visitor came from.
        var item = panel.querySelector('[data-id="' + previous + '"]');
        if (item) {
          panel.scrollTop = Math.max(0, item.offsetTop - panel.clientHeight / 3);
          revealInViewport(item);
          if (opts.focus) item.focus({ preventScroll: true });
        }
      }
    }

    function drawMarkers() {
      if (!map) return;
      Object.keys(markers).forEach(function (id) { map.removeLayer(markers[id]); });
      markers = {};
      points.forEach(function (p, i) {
        var event = p.tipo === 'manifestacao';
        var m = L.marker(p.coords, {
          icon: L.divIcon({
            html: '<span class="veio-pin__dot">' + (i + 1) + '</span>',
            className: 'veio-pin' + (event ? ' veio-pin--event' : ''),
            iconSize: [30, 30], iconAnchor: [15, 15]
          }),
          title: (i + 1) + '. ' + p.name + (event ? ' (manifestação cultural)' : ''),
          alt: p.name,
          keyboard: true
        }).addTo(map);
        m.on('click', function () { select(p.id, { fly: false }); });
        // Leaflet makes markers focusable; Enter/Space should act like a click.
        m.on('keypress', function (ev) {
          var k = ev.originalEvent && ev.originalEvent.key;
          if (k === 'Enter' || k === ' ') select(p.id, { fly: false, focus: true });
        });
        markers[p.id] = m;
      });
      updateMarkerStyles();
      fitRoute();
    }

    function fitRoute() {
      if (map && points.length) map.fitBounds(points.map(function (p) { return p.coords; }), { padding: [48, 48] });
      spreadMarkers();
    }

    /* The copper Veio between stops; the hop leaving the selected point is
       drawn brighter and wider so the next leg of the walk stands out. */
    function drawSegments() {
      if (!lineLayer) return;
      lineLayer.clearLayers();
      var activeLine = null;
      for (var i = 0; i < points.length - 1; i++) {
        var line = segmentsById[points[i].id];
        if (!line) continue;
        L.polyline(line, { color: '#1B2B22', weight: 9, opacity: .5, lineCap: 'round', interactive: false }).addTo(lineLayer);
        L.polyline(line, { color: '#C79A4B', weight: 3.5, opacity: 1, lineCap: 'round', interactive: false }).addTo(lineLayer);
        if (points[i].id === selected) activeLine = line;
      }
      if (activeLine) {
        L.polyline(activeLine, { color: '#F2DFCE', weight: 6, opacity: .95, lineCap: 'round', interactive: false }).addTo(lineLayer);
      }
    }

    /* Real street-following segments, fetched one hop at a time from OSRM
       (RotaSection.jsx's fetchRoute) and drawn progressively as each
       resolves; a straight line stands in immediately so the route is never
       empty while requests are in flight. Superseded requests (route
       switched again before finishing) are dropped via `fetchToken`. */
    function loadSegments() {
      var token = ++fetchToken;
      segmentsById = {};
      for (var i = 0; i < points.length - 1; i++) {
        segmentsById[points[i].id] = [points[i].coords, points[i + 1].coords];
      }
      drawSegments();
      points.forEach(function (p, i) {
        if (i >= points.length - 1 || sameSpot(p, points[i + 1])) return;
        fetchRouteSegment(p.coords, points[i + 1].coords).then(function (geom) {
          if (token !== fetchToken || !geom) return;
          segmentsById[p.id] = geom;
          drawSegments();
        });
      });
    }

    function selectRoute(id, keepId) {
      routeId = id;
      recomputePoints();
      renderPills();
      var keep = keepId && points.some(function (p) { return p.id === keepId; });
      selected = keep ? keepId : null;
      if (map) { drawMarkers(); loadSegments(); }
      if (keep) {
        select(keepId, { focus: true });
      } else {
        renderPanel();
        panel.scrollTop = 0;
      }
    }

    recomputePoints();
    renderPills();
    renderPanel();

    if (typeof L === 'undefined') return; // Leaflet failed to load — panel still works without the map.

    var host = document.getElementById('rota-map-host');
    map = L.map(host, { zoomControl: false, scrollWheelZoom: false, attributionControl: true });
    // Real satellite imagery, unfiltered — the design dropped the dark
    // grayscale-plate treatment used in the first handoff.
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Imagery &copy; Esri',
      maxZoom: 19
    }).addTo(map);
    lineLayer = L.layerGroup().addTo(map);
    map.on('zoomend', spreadMarkers);
    // Wheel zoom only after the visitor engages with the map, so scrolling
    // the page past it never gets captured.
    map.on('focus click', function () { map.scrollWheelZoom.enable(); });
    host.addEventListener('mouseleave', function () { map.scrollWheelZoom.disable(); });

    drawMarkers();
    loadSegments();
    // The map may be laid out after first paint (fonts, grid); keep its
    // size in sync with its container rather than guessing a delay.
    if (window.ResizeObserver) new ResizeObserver(function () { map.invalidateSize(); }).observe(host);

    document.getElementById('map-zoom-in').addEventListener('click', function () { map.setZoom(map.getZoom() + 1); });
    document.getElementById('map-zoom-out').addEventListener('click', function () { map.setZoom(map.getZoom() - 1); });
    document.getElementById('map-zoom-reset').addEventListener('click', fitRoute);
  }

  /* "Timóteo em números": each figure with its reference date and source. */
  function initNumbers() {
    var wrap = document.getElementById('numbers');
    var sources = document.getElementById('numbers-sources');
    if (!wrap || !window.NUMEROS_TIMOTEO) return;
    var F = window.NUMEROS_FONTES || {};
    wrap.innerHTML = window.NUMEROS_TIMOTEO.map(function (n) {
      var f = F[n.fonte];
      return '<div class="numbers-grid__card"><dt class="numbers-grid__label">' + esc(n.label) + '</dt>' +
        '<dd class="numbers-grid__value">' + esc(n.value) + '</dd>' +
        '<dd class="numbers-grid__note">' + esc(n.note) + '</dd>' +
        '<dd class="numbers-grid__ref">' + esc(n.ref) + (f ? ' · ' + esc(f.label.split(' — ')[0]) : '') + '</dd></div>';
    }).join('');
    if (sources) {
      sources.innerHTML = 'Fontes: ' + Object.keys(F).map(function (k) {
        return '<a href="' + esc(F[k].url) + '" target="_blank" rel="noreferrer">' + esc(F[k].label) + '</a>';
      }).join(' · ') + '. Consulta em outubro de 2026.';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initNumbers();
    initRota(initLightbox());
  });
})();
