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

- **28 entradas de rota** em **25 paradas** numeradas. Alguns números reúnem duas entradas na mesma parada; por exemplo, Praça do Coreto e Carnaval Tradicional dividem a parada 4, e Igreja São José e Tapetes de Corpus Christi dividem a parada 3. As coordenadas vêm de um `.gpx` real, com a rota otimizada, e não foram estimadas.
- Texto curto, texto longo e links "para saber mais" por ponto, pesquisados em fontes públicas (ipatrimônio, Wikipédia, Aperam, prefeitura e câmara de Timóteo, imprensa regional).
- Tempo e distância de carro até a próxima parada, por trecho, na Rota Principal.
- **6 roteiros temáticos** (Memória, Fé, Cultura, Industrialização, Lazer, Educação), cada um um subconjunto curado dos 28 pontos — ver "Roteiros temáticos" abaixo.
- Uma seção "Timóteo em números" com 5 indicadores (população, área, densidade, PIB per capita, fundação da Acesita), cada um com data de referência e fonte.
- Uma narrativa histórica mais longa e específica (povos indígenas, a Paragem do Ribeirão do Timóteo, Manoel Timóteo, a chegada da Acesita, a autonomia político-administrativa nos anos 1960), com duas fotos aéreas novas ilustrando o texto.

Uma segunda rodada do handoff (a atual) trouxe essas mudanças por cima da primeira — a seção anterior deste README que descrevia 5 pilares e uma linha do tempo circular ("Os veios de Timóteo") não existe mais: o design removeu os dois blocos da `HistoriaSection` nesta rodada.

## Roteiros temáticos

Acima do mapa, um seletor alterna entre a **Rota Principal** (as 28 entradas) e 6 roteiros temáticos definidos em `window.ROTAS_TEMATICAS` (`data/rota.js`). Um ponto pode participar de vários roteiros sem ser duplicado: o roteiro guarda apenas os ids.

- **Rota Principal:** segue a sequência planejada das paradas (campo `number`, a ordem dos trechos medidos no `.gpx`). Assim, o tempo e a distância de carro até a próxima parada (`point.next`) aparecem em quase todos os trechos.
- **Roteiros temáticos:** são reordenados por proximidade geográfica, como no handoff: `orderByProximity` em `assets/js/app.js` começa no primeiro ponto listado e segue sempre para o mais próximo ainda não visitado.

A numeração dos pinos, da lista e do indicador "Ponto X de N" é a **posição no roteiro atual**, calculada a partir dos dados. O tempo e a distância só aparecem quando o próximo ponto do roteiro coincide com o próximo trecho medido; quando dois pontos ficam no mesmo local, o painel mostra "No mesmo local". Nada é estimado.

### Tapetes de Corpus Christi ("Tapetes C.C.")

- **Endereço de referência:** Praça 1.º de Maio, 89 — Centro, Timóteo - MG, 35180-018 (o endereço da Paróquia São José de Acesita). Ele aparece no painel e é usado como destino do link do Google Maps.
- **Coordenadas:** as mesmas da Igreja São José na parada 3 do `.gpx` (a igreja fica na Praça 1.º de Maio). As coordenadas antigas, da Matriz de São Sebastião, foram removidas. O ponto passou para a parada 3 da Rota Principal, e o trecho até a Praça do Coreto usa a medição da própria parada.
- **Roteiros:** Cultura (novo) e Fé (já existente), sem cadastro duplicado.
- **Tipo:** `tipo: 'manifestacao'`, como o Carnaval e a Cantata. Manifestações culturais aparecem com marcador e etiqueta quadrados e o rótulo "Manifestação cultural", para se distinguirem dos lugares.

## O mapa

O mapa trocou de base: a primeira rodada usava tiles de rua do OpenStreetMap com um filtro CSS escurecendo tudo; esta usa **imagens de satélite reais** (Esri World Imagery), sem filtro. A linha da rota também deixou de ser reta entre coordenadas — agora é o **caminho real de carro** entre cada par de paradas, buscado em tempo de execução no roteador público [OSRM](http://project-osrm.org/) (`router.project-osrm.org`). Cada trecho pede sua própria geometria de forma assíncrona; enquanto não chega, uma linha reta ocupa o lugar, e o desenho vai sendo substituído trecho a trecho conforme cada resposta volta.

## Navegação entre pontos ("IR")

Ao trocar de ponto (botão **IR**, **Anterior**, item da lista, marcador do mapa, teclado ou troca de roteiro mantendo o ponto), `select()` em `assets/js/app.js` faz o seguinte:

1. Substitui o conteúdo do painel de forma síncrona. As fotos já têm dimensões reservadas, então o layout não salta quando elas carregam.
2. Zera a rolagem própria do painel. No desktop, o painel rola de forma independente ao lado do mapa.
3. Chama `revealInViewport()`: se o título do novo ponto não estiver logo abaixo do cabeçalho fixo (altura medida na hora), a janela rola até ele. Se o título já estiver visível, a página não se move.
4. Move o foco para o título do ponto, para quem navega por teclado ou leitor de tela.

Não há temporizadores: a rolagem acontece depois da atualização real do DOM. A animação respeita `prefers-reduced-motion`. A barra **Anterior / Próximo · IR** fica fixa no rodapé do painel (no desktop) ou da tela (no celular), ao alcance do polegar. "Todos os pontos" devolve o visitante ao item de onde ele saiu.

## Estrutura

```
index.html                       página única: capa → mapa da rota → história e números → intervenção → manifesto
data/rota.js                     window.ROTA (pontos), ROTAS_TEMATICAS, FOTOS (fotos por ponto),
                                  NUMEROS_TIMOTEO + NUMEROS_FONTES (indicadores com data e fonte)
IMAGENS.md                       inventário e auditoria das fotografias, fontes e pendências
assets/tokens/                   tokens do design system "Veios de Timóteo" (sem alterações)
assets/css/site.css              estilos do site, construídos sobre os tokens
assets/js/app.js                 NavBar · números · mapa (Leaflet) + painel de detalhe · galeria ampliada
assets/js/icons.js               ícones Lucide usados
assets/img/                      fotografias (ver IMAGENS.md)
assets/vendor/leaflet/           Leaflet 1.9.4 (local, sem CDN)
```

## Fotografias

A auditoria completa (resolução, correspondência, origem e ação por imagem) está em **[IMAGENS.md](IMAGENS.md)**. Resumo:

- As fotos ficam em `window.FOTOS` (`data/rota.js`), que é a única fonte do painel. Cada foto tem tamanho real, texto alternativo descritivo e crédito quando ele é conhecido.
- A galeria mostra só fotos reais (miniaturas com carregamento tardio). Ao tocar, a foto abre ampliada em um `<dialog>`, com legenda e crédito. Uma imagem que falhe ao carregar é trocada pela placa abaixo, sem deixar quadro quebrado.
- Se um ponto ficar sem foto verificada, ou se uma imagem falhar ao carregar, o painel exibe a placa "Fotografia em levantamento" com o símbolo do Veio, em vez de um quadro vazio.
- As 5 fotos da Estação foram convertidas de PNG para WebP (de 2,2 MB para 0,3 MB). Os JPEGs pequenos foram mantidos como estavam, para não perder qualidade em uma nova compressão.
- A foto principal tem largura fixa (a do painel) e altura proporcional à imagem: não há corte nem faixas vazias.
- A equipe confirmou as licenças de todas as fotos em uso. A igreja com cúpula é a **Igreja Católica São José**, e não a capela de 1947 do ponto "Igreja São José". Por isso a foto saiu desse ponto, e as figuras da história receberam legendas corretas.
- Com o pacote de fotos enviado pela equipe (10/2026), **os 28 pontos têm fotografia** (51 fotos ao todo). Uma foto do pacote foi recusada porque mostra uma escola de Salvador (BA).
- **Pendências:** Casa de Memória e Matriz de São Sebastião ainda estão em baixa resolução (ver IMAGENS.md).

## Estrutura da página e conteúdo

- **O mapa vem logo depois da capa.** A experiência principal não fica mais atrás da narrativa institucional. A história vem em seguida e contextualiza a rota.
- **A história** está organizada em três capítulos (as origens; a indústria e a autonomia; os veios da cidade). Texto e foto alternam de lado, ligados por um Veio de cobre no centro. As fotos mantêm a proporção original, com legenda, e ficam visíveis ao lado do texto durante a leitura (no celular, ficam empilhadas).
- **"Timóteo em números"** mostra 5 indicadores conferidos no IBGE Cidades@ e na Aperam (consulta em 10/2026), cada um com rótulo, valor exato, data de referência e fonte com link. O PIB per capita foi corrigido de "R$ 56,9 mil" para "R$ 57,0 mil" (R$ 56.987,61 em 2023).
- **"A intervenção urbana"** deixou de ser um "Em desenvolvimento." solto. Agora apresenta a proposta física descrita no próprio design system (Veio no piso, totens em aço corten, bancos com áudio, linha do tempo no piso, iluminação cênica), com o selo "Em desenvolvimento" e a explicação de que os elementos ainda não foram instalados.
- **Menu mobile:** o botão tem `aria-expanded` e fecha com Esc. As âncoras usam `scroll-padding-top` para não ficarem sob o cabeçalho fixo.
- **Mapa:** marcadores próximos ou no mesmo local se abrem em leque (um ponto cobre marca a posição real). O marcador ativo fica por cima e em cobre. O trecho que sai do ponto selecionado é destacado. A roda do mouse só dá zoom depois que o visitante clica no mapa, para não prender a rolagem da página. As geometrias do OSRM ficam em cache durante a visita. A legenda distingue lugares, manifestações e ponto selecionado.
- **Acessibilidade:** link "Pular para o mapa", `h1` na capa, foco visível em cobre sobre fundos verdes, áreas de toque de 44 a 48 px, marcadores acionáveis por teclado e estados que não dependem só de cor.

## Design system

Tokens do bundle **Veios de Timóteo**, copiados sem alteração em `assets/tokens/`:

- **Marcellus** (títulos monumentais) · **Source Serif 4** (corpo de texto) · **Archivo** (rótulos, navegação, botões) · **IBM Plex Mono** (não usado nesta página, reservado pelo sistema)
- Verde institucional `#122018 → #F1F5F2`, base do site (70% do layout)
- Cobre — **só o Veio**: a linha da rota no mapa, os números das paradas, o divisor animado (25%→5% do layout, nunca em botão ou link)
- Proporção de cor pretendida pelo sistema: 70% papel/branco, 25% verde, 5% cobre

Ver `assets/tokens/design-system-readme.md` para os fundamentos completos de voz, tipografia e cor.

## Publicação

Site estático — publica direto na Vercel ou GitHub Pages sem configuração.

## Ícone da aba e prévia de link

`assets/icons/` — gerados a partir do próprio mark do Logo (as três linhas onduladas), não do handoff:

- **Ícone da aba** (favicon): o mark sozinho, cor cobre (`#D29C71`) sobre o verde institucional (`#1B2B22`). SVG como formato principal (`favicon.svg`, nítido em qualquer tamanho), com `.ico`/PNG em 16/32/48/180px como fallback para navegadores que não leem favicon em SVG.
- **Prévia de link** (Open Graph/Twitter, `og-image.png`, 1200×630): a logo completa — mark + "VEIOS DE TIMÓTEO" — centralizada sobre o mesmo verde, com o eyebrow do Hero ("Patrimônio também se vive no caminho") como assinatura.

`og:image`, `twitter:image` e `og:url` usam URL absoluta no domínio publicado (`https://veios-de-timoteo.vercel.app/`). Se o domínio mudar, atualize essas três linhas.

## Créditos

Imagens de satélite © Esri. Trajeto calculado pelo [OSRM](http://project-osrm.org/) sobre dados © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright). Fotografias de capa, história e manifesto do acervo do design. Fotografias dos pontos da rota do acervo de campo do grupo; créditos individuais em [IMAGENS.md](IMAGENS.md).
