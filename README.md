# Veios de Timóteo

Rota patrimonial urbana de Timóteo (MG). Site estático que implementa, em HTML/CSS/JS puro, o design entregue pelo Claude Design ("Site Veios de Timóteo — handoff").

## Como rodar

Site estático, sem build. Qualquer servidor HTTP serve:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir `index.html` direto pelo `file://` não funciona — o navegador bloqueia o carregamento de `data/rota.js`.

## Origem do conteúdo

Este site substitui uma versão anterior baseada no KML do My Maps. A versão atual segue **o handoff de design entregue** (`Veios de Timóteo — Site.dc.html` + componentes), que por sua vez já veio com dados mais completos:

- **25 pontos numerados** (28 entradas — alguns números cobrem duas entradas na mesma parada, ex.: Praça do Coreto/Carnaval Tradicional dividem a parada 4), com coordenadas extraídas de um `.gpx` real (rota otimizada, não estimada).
- Texto curto, texto longo e links "para saber mais" por ponto, pesquisados em fontes públicas (ipatrimônio, Wikipédia, Aperam, prefeitura e câmara de Timóteo, imprensa regional).
- Tempo e distância de carro até a próxima parada, por trecho.
- Uma seção "Timóteo em números" com 6 indicadores (população, área, densidade, PIB per capita, fundação da Acesita, altitude do Pico do Ana Moura).

## Estrutura

```
index.html                       página única
data/rota.js                     window.ROTA / PILARES / NUMEROS_TIMOTEO — do handoff, sem alterações
assets/tokens/                   tokens do design system "Veios de Timóteo" (cores, tipografia, espaçamento,
                                  efeitos, motion) — copiados do bundle, sem alterações
assets/css/site.css              estilos do site, construídos sobre os tokens acima
assets/js/app.js                 NavBar (troca de tom no scroll) + mapa da rota (Leaflet) + painel de detalhe
assets/js/icons.js               ícones Lucide usados (subconjunto do design system)
assets/img/                      fotografias (ver abaixo)
assets/vendor/leaflet/           Leaflet 1.9.4 (local, sem CDN)
```

## Fotografias

O handoff trouxe as imagens **do próprio site** (capa, figura da seção "A história", figura do manifesto) e as 5 fotos circulares da linha do tempo — todas usadas como vieram, sem edição.

Os **26 slots de imagem por ponto da rota** (imagem principal + 4 extras) vieram vazios no design — o time ainda não tinha fotos quando fez o mockup. Preenchi o slot principal em **18 dos 25 pontos** com fotografias reais já levantadas em campo numa rodada anterior, casando por nome exato de assunto (mesma igreja, mesma praça, mesmo prédio) — nenhuma foto foi adivinhada ou usada para um lugar diferente do que mostra. A tabela de correspondência está em `assets/js/app.js` (objeto `FOTOS`). Os 7 pontos sem foto — e as 4 imagens extras de cada um dos 25 — continuam marcados **"Imagem a ser inserida"**, exatamente como o design deixou.

**Sem foto ainda:** 1º Cartório de Notas · Escritório Central da Aperam · Fundação Aperam (prédio) · Igreja do Ana Moura · Praça do Coliseu · Sede da Prefeitura · Chafariz e Olho-D'Água (Biquinha) · Centro de Vivência Trajano Quirino Bicalho · Escola Municipal Virgínia de Souza Reis · E.E. João Cotta de Figueiredo Barcelos.

## Duas pequenas completudes além do design

O handoff é um protótipo ("recrie com fidelidade visual, não copie a estrutura interna"). Duas peças ficaram deliberadamente inacabadas no mockup e completei por usabilidade mínima, sem alterar nada visual:

1. **Menu mobile.** O botão de menu do NavBar existia no design mas ficava sempre oculto (`display:none`), e os links do menu não quebram linha — em telas estreitas eles simplesmente sairiam da tela. Adicionei um menu suspenso funcional abaixo de 780px, reaproveitando o mesmo botão.
2. **Botão "Saiba mais sobre a rota" no rodapé.** No design não tinha destino (`onClick`/`href` ausentes). Apontei para `#mapa`, a leitura óbvia do próprio texto do botão.

Nada de conteúdo, cor, tipografia ou layout foi alterado em relação ao handoff.

## Seção "A intervenção urbana"

O próprio design deixa essa seção como `Em desenvolvimento.` — é assim que está aqui também. O bundle de design (`assets/tokens/design-system-readme.md`) descreve o conceito completo (totens em aço corten, bancos interativos, linha do tempo no piso, iluminação cênica), mas essa seção do site ainda não foi desenhada.

## Design system

Tokens do bundle **Veios de Timóteo**, copiados sem alteração em `assets/tokens/`:

- **Marcellus** (títulos monumentais) · **Source Serif 4** (corpo de texto) · **Archivo** (rótulos, navegação, botões) · **IBM Plex Mono** (não usado nesta página, reservado pelo sistema)
- Verde institucional `#122018 → #F1F5F2`, base do site (70% do layout)
- Cobre — **só o Veio**: a linha da rota no mapa, os números das paradas, o divisor animado (25%→5% do layout, nunca em botão ou link)
- Proporção de cor pretendida pelo sistema: 70% papel/branco, 25% verde, 5% cobre

Ver `assets/tokens/design-system-readme.md` para os fundamentos completos de voz, tipografia e cor.

## Publicação

Site estático — publica direto na Vercel ou GitHub Pages sem configuração.

## Créditos

Mapa © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright). Fotografias de capa, história e manifesto do acervo do design. Fotografias dos pontos da rota do acervo de campo do grupo.
