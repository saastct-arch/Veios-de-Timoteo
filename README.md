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

- **28 entradas de rota** cobrindo **25 paradas** numeradas (alguns números cobrem duas entradas na mesma parada, ex.: Praça do Coreto/Carnaval Tradicional dividem a parada 4), com coordenadas extraídas de um `.gpx` real (rota otimizada, não estimada).
- Texto curto, texto longo e links "para saber mais" por ponto, pesquisados em fontes públicas (ipatrimônio, Wikipédia, Aperam, prefeitura e câmara de Timóteo, imprensa regional).
- Tempo e distância de carro até a próxima parada, por trecho, na Rota Principal.
- **6 roteiros temáticos** (Memória, Fé, Cultura, Industrialização, Lazer, Educação), cada um um subconjunto curado dos 28 pontos — ver "Roteiros temáticos" abaixo.
- Uma seção "Timóteo em números" com 5 indicadores (população, área, densidade, PIB per capita, fundação da Acesita).
- Uma narrativa histórica mais longa e específica (povos indígenas, a Paragem do Ribeirão do Timóteo, Manoel Timóteo, a chegada da Acesita, a autonomia político-administrativa nos anos 1960), com duas fotos aéreas novas ilustrando o texto.

Uma segunda rodada do handoff (a atual) trouxe essas mudanças por cima da primeira — a seção anterior deste README que descrevia 5 pilares e uma linha do tempo circular ("Os veios de Timóteo") não existe mais: o design removeu os dois blocos da `HistoriaSection` nesta rodada.

## Roteiros temáticos

Acima do mapa, um seletor troca entre a **Rota Principal** (os 28) e 6 recortes temáticos definidos em `window.ROTAS_TEMATICAS` (`data/rota.js`). Trocar de roteiro reordena os pontos por proximidade geográfica — um algoritmo guloso de vizinho mais próximo (`orderByProximity` em `assets/js/app.js`, portado linha a linha do `RotaSection.jsx` do handoff): começa no primeiro ponto listado para aquele roteiro e sempre visita o mais próximo ainda não visitado. A numeração exibida nos pinos e na lista é a **posição no roteiro atual**, não o campo `number` de `data/rota.js` — outra fidelidade ao comportamento do handoff, não uma escolha minha.

O texto de tempo/distância até o próximo ponto só aparece quando o próximo ponto do roteiro *atual* coincide com o próximo hop *original* da Rota Principal (`point.next`) — nos roteiros temáticos, quase sempre não coincide, e o painel mostra só o nome do próximo ponto e o botão "IR".

## O mapa

Trocou de base: a primeira rodada usava tiles de rua do OpenStreetMap com um filtro CSS escurecendo tudo; esta usa **imagens de satélite reais** (Esri World Imagery), sem filtro. A linha da rota também deixou de ser reta entre coordenadas — agora é o **caminho real de carro** entre cada par de paradas, buscado em tempo de execução no roteador público [OSRM](http://project-osrm.org/) (`router.project-osrm.org`). Cada trecho pede sua própria geometria de forma assíncrona; enquanto não chega, uma linha reta ocupa o lugar, e o desenho vai sendo substituído trecho a trecho conforme cada resposta volta.

## Estrutura

```
index.html                       página única
data/rota.js                     window.ROTA / PILARES / NUMEROS_TIMOTEO / ROTAS_TEMATICAS — do handoff, sem alterações
                                  (PILARES existe no arquivo mas não é mais renderizado por nenhuma seção —
                                  o design parou de usá-lo nesta rodada; deixado como está, por fidelidade)
assets/tokens/                   tokens do design system "Veios de Timóteo" (cores, tipografia, espaçamento,
                                  efeitos, motion) — copiados do bundle, sem alterações
assets/css/site.css              estilos do site, construídos sobre os tokens acima
assets/js/app.js                 NavBar (troca de tom no scroll) + mapa da rota (Leaflet) + painel de detalhe
assets/js/icons.js               ícones Lucide usados (subconjunto do design system)
assets/img/                      fotografias (ver abaixo)
assets/vendor/leaflet/           Leaflet 1.9.4 (local, sem CDN)
```

## Fotografias

O handoff trouxe as imagens **do próprio site**: a capa, e agora **quatro** figuras na seção "A história" (a original mais duas novas, `historia-figure-2`/`-3`, encaixadas entre os parágrafos que contam a fundação e a emancipação do município) e a figura do manifesto — todas usadas como vieram, sem edição. A linha do tempo circular que existia na rodada anterior foi removida pelo próprio design; as 5 fotos que ela usava (`arq-*.png`) saíram do repositório por não terem mais onde entrar.

Os **slots de imagem por ponto da rota** (principal + 4 extras, por parada) vieram vazios no design — com **uma exceção deliberada**: a Estação Mário Carvalho ganhou **5 fotos reais** nesta rodada, escritas diretamente no `RotaSection.jsx` do handoff (`point.id === 'estacao' ? window.photo('estacao-mario-carvalho...') : undefined`) como exemplo de como as demais deveriam ficar. Reproduzi esse mesmo condicional em `assets/js/app.js`.

Para os outros pontos, mantive o que já tinha: o slot principal de **17 paradas** (a Estação saiu dessa lista, agora com tratamento próprio) recebe uma fotografia real levantada em campo numa rodada anterior, casando por nome exato de assunto — tabela em `assets/js/app.js` (objeto `FOTOS`). O restante segue **"Imagem a ser inserida"**, exatamente como o design deixou.

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
