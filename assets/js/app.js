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
    /* 'estacao' isn't listed here — it now gets 5 real photos through the
       dedicated branch in imgSlotHTML() below, matching RotaSection.jsx's
       own hardcoded `point.id === 'estacao'` check. */
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

  /* Great-circle distance in km, used only to rank candidates — matches the
     design's own haversine helper in RotaSection.jsx. */
  function haversine(a, b) {
    var R = 6371, toRad = function (d) { return (d * Math.PI) / 180; };
    var dLat = toRad(b[0] - a[0]), dLng = toRad(b[1] - a[1]);
    var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  /* Greedy nearest-neighbor ordering: keeps the first point as the start,
     then always visits whichever remaining point is closest. Ported
     verbatim from RotaSection.jsx so a thematic route (and the Rota
     Principal, re-run through the same pass) orders identically to what
     the design produces. */
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
     demo router — same endpoint RotaSection.jsx calls. Falls back to null
     (caller draws a straight line) if the request fails. */
  function fetchRouteSegment(coords1, coords2) {
    var url = 'https://router.project-osrm.org/route/v1/car/' +
      coords1[1] + ',' + coords1[0] + ';' + coords2[1] + ',' + coords2[0] +
      '?geometries=geojson&overview=full';
    return fetch(url).then(function (res) { return res.json(); }).then(function (data) {
      var coords = data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates;
      return coords ? coords.map(function (c) { return [c[1], c[0]]; }) : null;
    }).catch(function (e) { console.error('Route fetch failed:', e); return null; });
  }

  function imgSlotHTML(pointId, slot, extraClass) {
    var src = null;
    if (pointId === 'estacao') {
      // The design wires 5 real photos for this one point as a worked
      // example — see RotaSection.jsx's inline `point.id === 'estacao'` check.
      src = 'estacao-mario-carvalho' + (slot === 1 ? '' : '-' + slot) + '.png';
    } else if (slot === 1 && FOTOS[pointId]) {
      src = FOTOS[pointId];
    }
    if (src) return '<div class="rota__img-slot ' + extraClass + '"><img src="assets/img/' + src + '" alt=""></div>';
    return '<div class="rota__img-slot ' + extraClass + '"><span>Imagem a ser inserida</span></div>';
  }

  function pointDetailHTML(point, indexInRoute, nextInRoute) {
    var html = '';
    html += '<button class="rota__back" type="button" data-action="clear">' + window.icon('chevron-left', { size: 14 }) + ' Todos os pontos</button>';
    html += '<div class="rota__detail-head"><span class="tag-number tag-number--active">' + (indexInRoute + 1) + '</span><h3 class="rota__detail-name">' + point.name + '</h3></div>';
    html += '<div class="rota__imgs">';
    html += imgSlotHTML(point.id, 1, 'rota__img-main');
    for (var i = 2; i <= 5; i++) html += imgSlotHTML(point.id, i, '');
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
    if (nextInRoute) {
      // Timing/distance only shown when the next stop in the *currently
      // active* (possibly reordered, possibly thematic) route happens to
      // match the master route's own hardcoded next-hop — same guard as
      // RotaSection.jsx.
      var showTiming = point.next && point.next.id === nextInRoute.id;
      html += '<div class="rota__next">' + window.icon('move-right', { size: 16, color: 'var(--copper-300)' }) +
        '<div><span class="rota__next-name">Próximo: ' + nextInRoute.name + '</span>' +
        (showTiming ? '<span class="rota__next-meta">' + fmtTime(point.next.time) + ' (min:seg) de carro · ' + fmtKm(point.next.km) + ' km</span>' : '') +
        '</div><button class="rota__next-go" type="button" data-action="goto" data-id="' + nextInRoute.id + '">IR</button></div>';
    } else {
      html += '<div class="rota__end">Este é o ponto final de ' + '{{ROUTE_LABEL}}' + '.</div>';
    }
    return html;
  }

  function listHTML(points, heading) {
    var html = '<p class="eyebrow eyebrow--inverse">' + heading + '</p><div class="rota__list">';
    points.forEach(function (p, i) {
      html += '<button class="rota__list-item" type="button" data-action="goto" data-id="' + p.id + '">' +
        '<span class="tag-number tag-number--active">' + (i + 1) + '</span>' +
        '<span><span class="rota__list-name">' + p.name + '</span><span class="rota__list-short">' + p.short + '</span></span>' +
        '</button>';
    });
    html += '</div>';
    return html;
  }

  function initRota() {
    var ROTA = window.ROTA;
    var ROTAS_TEMATICAS = window.ROTAS_TEMATICAS || [];
    var routes = [{ id: 'principal', label: 'Rota Principal', icon: 'route', pointIds: ROTA.map(function (p) { return p.id; }) }]
      .concat(ROTAS_TEMATICAS);

    var panel = document.getElementById('rota-panel');
    var pillsWrap = document.getElementById('rota-pills');
    var countEl = document.getElementById('rota-count');
    var routeId = 'principal';
    var selected = null;
    var points = [];
    var map, markers = {}, lineLayer, segmentsById = {}, fetchToken = 0;

    function activeRoute() {
      for (var i = 0; i < routes.length; i++) if (routes[i].id === routeId) return routes[i];
      return routes[0];
    }

    function recomputePoints() {
      var raw = activeRoute().pointIds
        .map(function (id) { return ROTA.filter(function (p) { return p.id === id; })[0]; })
        .filter(Boolean);
      points = orderByProximity(raw);
      if (countEl) countEl.textContent = points.length;
    }

    function renderPills() {
      pillsWrap.innerHTML = '';
      routes.forEach(function (r) {
        var active = r.id === routeId;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rota__pill';
        btn.setAttribute('aria-pressed', String(active));
        btn.innerHTML = window.icon(r.icon, { size: 14, color: active ? 'var(--green-900)' : 'var(--copper-300)' }) + '<span>' + r.label + '</span>';
        btn.addEventListener('click', function () { selectRoute(r.id); });
        pillsWrap.appendChild(btn);
      });
    }

    function renderPanel() {
      var point = points.filter(function (p) { return p.id === selected; })[0];
      var idx = point ? points.indexOf(point) : -1;
      var nextInRoute = idx >= 0 && idx < points.length - 1 ? points[idx + 1] : null;
      if (point) {
        panel.innerHTML = pointDetailHTML(point, idx, nextInRoute)
          .replace('{{ROUTE_LABEL}}', activeRoute().label.toLowerCase());
      } else {
        var heading = activeRoute().id === 'principal' ? 'Conheça os patrimônios e atrações da rota' : activeRoute().label;
        panel.innerHTML = listHTML(points, heading);
      }
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
        dot.style.background = on ? '#C79A4B' : '#1B2B22';
        dot.style.boxShadow = on ? '0 0 16px rgba(199,154,75,.95), 0 0 0 2px rgba(255,255,255,.95)' : '0 0 0 2px rgba(255,255,255,.9)';
        dot.style.transform = on ? 'scale(1.18)' : 'scale(1)';
        dot.style.transition = 'all 160ms cubic-bezier(.22,.61,.36,1)';
      });
    }

    function select(id, flyTo) {
      selected = id;
      renderPanel();
      updateMarkerStyles();
      if (flyTo && id && map) {
        var p = points.filter(function (x) { return x.id === id; })[0];
        if (p) map.flyTo(p.coords, Math.max(map.getZoom(), 16), { duration: 1.1 });
      }
    }

    function drawMarkers() {
      if (!map) return;
      Object.keys(markers).forEach(function (id) { map.removeLayer(markers[id]); });
      markers = {};
      points.forEach(function (p, i) {
        var html = '<span style="display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#1B2B22;color:#FFFFFF;font:600 12px/1 Archivo,sans-serif;box-shadow:0 0 0 2px rgba(255,255,255,.9)">' + (i + 1) + '</span>';
        var m = L.marker(p.coords, {
          icon: L.divIcon({ html: html, className: 'veio-pin', iconSize: [30, 30], iconAnchor: [15, 15] }),
          title: p.name
        }).addTo(map);
        m.on('click', function () { select(p.id, false); });
        markers[p.id] = m;
      });
      if (points.length) map.fitBounds(points.map(function (p) { return p.coords; }), { padding: [56, 56] });
    }

    function drawSegments() {
      if (!lineLayer) return;
      lineLayer.clearLayers();
      for (var i = 0; i < points.length - 1; i++) {
        var line = segmentsById[points[i].id];
        if (!line) continue;
        L.polyline(line, { color: '#1B2B22', weight: 9, opacity: .5, lineCap: 'round' }).addTo(lineLayer);
        L.polyline(line, { color: '#C79A4B', weight: 3.5, opacity: 1, lineCap: 'round' }).addTo(lineLayer);
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
        if (i >= points.length - 1 || p.id === points[i + 1].id) return;
        fetchRouteSegment(p.coords, points[i + 1].coords).then(function (geom) {
          if (token !== fetchToken || !geom) return;
          segmentsById[p.id] = geom;
          drawSegments();
        });
      });
    }

    function selectRoute(id) {
      routeId = id;
      selected = null;
      recomputePoints();
      renderPills();
      renderPanel();
      if (map) { drawMarkers(); loadSegments(); }
    }

    recomputePoints();
    renderPills();
    renderPanel();

    if (typeof L === 'undefined') return; // Leaflet failed to load — panel still works without the map.

    var host = document.getElementById('rota-map-host');
    map = L.map(host, { zoomControl: false, scrollWheelZoom: true, attributionControl: true });
    // Real satellite imagery, unfiltered — the design dropped the dark
    // grayscale-plate treatment used in the first handoff.
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Imagery &copy; Esri',
      maxZoom: 19
    }).addTo(map);
    lineLayer = L.layerGroup().addTo(map);

    drawMarkers();
    loadSegments();
    setTimeout(function () { map.invalidateSize(); }, 60);

    document.getElementById('map-zoom-in').addEventListener('click', function () { map.setZoom(map.getZoom() + 1); });
    document.getElementById('map-zoom-out').addEventListener('click', function () { map.setZoom(map.getZoom() - 1); });
    document.getElementById('map-zoom-reset').addEventListener('click', function () {
      if (points.length) map.fitBounds(points.map(function (p) { return p.coords; }), { padding: [56, 56] });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initRota();
  });
})();
