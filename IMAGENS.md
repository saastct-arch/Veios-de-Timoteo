# Inventário e auditoria das fotografias

Auditoria feita em 12/10/2026 sobre **todas** as imagens do site. A lista das fotos por ponto fica em `window.FOTOS` (`data/rota.js`): é a única fonte do painel de detalhes e da galeria. Este arquivo registra a origem, a qualidade e o que ainda falta verificar em cada uma.

## Como ler

- **Ação:** *manter* (adequada) · *substituir* (resolução ou enquadramento insuficientes; buscar uma original melhor) · *complementar* (adequada, mas com uma só imagem) · *investigar* (dúvida sobre o local retratado ou sobre a licença).
- **Origem e licenças:** as fotos dos pontos são do acervo de campo do grupo. A equipe do projeto **confirmou as licenças de uso** de todas as fotos em uso (12/10/2026). Onde a própria imagem traz assinatura ou marca-d'água, o crédito aparece no site (campo `credit`).
- **Moldura:** a foto principal ocupa toda a largura do painel (cerca de 290 a 560 px, conforme a tela). A altura acompanha a proporção da própria imagem, sem cortes e sem faixas vazias. Uma foto de 1200×1600 exibida a 400 px de largura fica com 533 px de altura. Abaixo de ~400 px de largura de origem, a foto aparece ampliada e perde nitidez.

## Pontos da rota

Em 12/10/2026, a equipe enviou um pacote com 37 fotos (`Imagens.zip`). Foram incorporadas 33 delas, sem nova compressão (JPEG original, só renomeado para o id do ponto). Ficaram fora:

- **`E.E. Getúlio Vargas 1.jpg` e `E.M. Virgínia de Souza Reis 2.jpg`:** são o mesmo arquivo, byte a byte. O quadro-negro da foto diz **"Escola Municipal Profª Maria Lúcia — Salvador, BA"**, ou seja, é outra escola, em outro estado. Não representa nenhum dos dois pontos.
- **`Antiga Escola de Metalurgia 3.jpg`:** tem 141×101 px, pequena demais até para miniatura, e mostra só uma quadra, sem identificação do lugar.

| # | Ponto | Arquivo(s) | Qtd. | Resolução (principal) | Observações | Ação |
|---|---|---|---|---|---|---|
| 1 | Estação Mário Carvalho | `estacao-mario-carvalho{,-2..-5}.webp` | 5 | 960×640 | A nº 5 tem a assinatura **"Becam Produções"** (crédito no site). Convertidas de PNG para WebP (de 2,2 MB para 0,3 MB). | manter |
| 2 | 1º Cartório de Notas | `cartorio.jpg` | 1 | 447×447 | Fachada com a placa "1º Cartório de Notas". | manter |
| 3 | Igreja São José | `igreja-sao-jose{,-2,-3}.jpg` | 3 | 547×365 | Capela branca com portas em arco (fachada, lateral e interior). A igreja com cúpula, que é a Igreja Católica São José, saiu deste ponto. O interior (250×187) aparece só como miniatura. | manter |
| 3 | Tapetes de Corpus Christi | `tapetes-corpus-christi.jpg` | 1 | 900×881 | Confecção de tapete de serragem. | manter |
| 4 | Praça do Coreto | `praca-coreto{,-2..-4}.jpg` | 4 | 738×411 | O coreto (2 fotos) e duas vistas aéreas. A aérea antiga, de 246 px, foi trocada pela versão de 678×452 do mesmo enquadramento. | manter |
| 4 | Carnaval Tradicional | `carnaval{,-2,-3}.jpg` | 3 | 686×446 | Carro alegórico, bloco na rua e palco. Substitui a foto antiga de 246 px. | manter |
| 5 | Escritório Central da Aperam | `aperam-escritorio{,-2,-3}.jpg` | 3 | 738×414 | Fachada com a placa da empresa, espelho d'água e ambiente interno. | manter |
| 6 | Ginásio José York | `ginasio-jose-york.jpg` | 1 | 738×414 | Vista aérea do ginásio circular. | manter |
| 7 | Fundação Aperam | `cantata-natal.jpg` (reutilizada) | 1 | 597×335 | Fachada do prédio histórico iluminada para a Cantata. | complementar (foto diurna) |
| 7 | Cantata de Natal | `cantata-natal.jpg` | 1 | 597×335 | — | manter |
| 8 | Antiga Escola Técnica de Metalurgia | `escola-metalurgia{,-2,-3}.jpg` | 3 | 638×480 | Prédio de dois pavimentos com estudantes, portal do CEFET-MG Campus Timóteo e edifício do campus. Substituem a foto antiga de 246 px. | manter |
| 9 | E.E. Percival Farquhar | `ee-percival-farquhar{,-2,-3}.jpg` | 3 | 547×365 | Fachada e volumes em arco de tijolo maciço. A foto de grupo é a mesma de antes, agora em 540×370 (antes 246 px). | manter |
| 10 | Pico do Ana Moura | `pico-ana-moura.jpg` | 1 | 515×388 | — | manter |
| 11 | Igreja do Ana Moura | `igreja-ana-moura.jpg` | 1 | 399×501 | Fachada azul-clara com cruz. | manter |
| 12 | E.E. Getúlio Vargas | `ee-getulio-vargas.jpg` | 1 | 447×447 | Fachada; substitui a de 246 px. A foto de sala de aula do pacote foi recusada (ver acima). | complementar |
| 13 | Estátua Carlos Drummond | `estatua-drummond.jpg` | 1 | 512×599 | — | manter |
| 14 | Praça do Coliseu | `praca-coliseu{,-2,-3}.jpg` | 3 | 554×554 | Arquibancada circular, arcos e vista aérea. | manter |
| 15 | Feira do Timirim | `feira-timirim.jpg` | 1 | 515×388 | — | manter |
| 16 | Sede da Prefeitura | `prefeitura.jpg` | 1 | 554×554 | Edifício entre palmeiras. | manter |
| 17 | Casa de Memória do Legislativo | `casa-memoria-legislativo.jpg` | 1 | **246×164** | Resolução muito baixa; não veio substituta no pacote. | **substituir** |
| 18 | Igreja Matriz de São Sebastião | `igreja-sao-sebastiao.jpg` | 1 | **194×259** | Resolução muito baixa; não veio substituta no pacote. | **substituir** |
| 19 | Chafariz e Olho-D'Água (Biquinha) | `biquinha.jpg` | 1 | 408×306 | Enviada como "Praça da Biquinha": pérgola e muros junto à encosta. | manter |
| 20 | Centro de Vivência Trajano Quirino Bicalho | `centro-vivencia{,-2}.jpg` | 2 | 680×383 | Fachada com letreiro (que diz "Centro de **Con**vivência") e prédio com arcos. | manter |
| 21 | Oikós | `oikos.jpg` | 1 | 515×388 | — | manter |
| 22 | Forno Hoffmann | `forno-hoffmann.jpg` | 1 | 515×388 | — | manter |
| 23 | E.M. Virgínia de Souza Reis | `escola-virginia-reis{,-2}.jpg` | 2 | 515×388 | Vista aérea e pátio. A foto de sala de aula do pacote foi recusada (ver acima). | manter |
| 24 | Ponte Mauá | `ponte-maua.jpg` | 1 | 567×352 | Marca-d'água do *Diário do Aço*, com crédito no site. | manter |
| 25 | E.E. João Cotta de Figueiredo Barcelos | `ee-joao-cotta{,-2,-3}.jpg` | 3 | 546×366 | Prédio na encosta, fachada vista da rua e reunião em sala. | manter |

**Resumo:** os 28 pontos têm fotografia, com 51 fotos no total. Restam 2 fotos em baixa resolução (Casa de Memória e Matriz de São Sebastião), e Fundação Aperam e E.E. Getúlio Vargas podem ganhar fotos complementares. A placa "Fotografia em levantamento" continua no código como proteção: aparece se uma imagem falhar ao carregar ou se um ponto novo entrar sem foto.

## Imagens editoriais (página inicial)

| Arquivo | Uso | Resolução | Observação | Ação |
|---|---|---|---|---|
| `hero-bg.webp` | Capa | 1200×799 | Vista aérea do centro. Vem do handoff de design. | manter |
| `historia-figure.webp` | História, capítulo 03 (vertical) | 335×557 | Faixa preta de 40 px removida do topo do arquivo. **Igreja Católica São José** (confirmado pela equipe; o design a atribuía, por engano, à Matriz de São Sebastião). Legenda e texto alternativo corrigidos. | manter |
| `historia-figure-2.webp` | História, capítulo 01 | 516×387 | "Monumento da Paragem do Ribeirão do Timóteo", conforme o design. | manter (confirmar) |
| `historia-figure-3.webp` | História, capítulo 02 | 640×480 | Igreja Católica São José, vista aérea. Legenda e texto alternativo corrigidos. | manter |
| `manifesto-figure.webp` | Manifesto | 978×550 | Vista aérea com o Ginásio José York. | manter |

## Candidatas externas (para as 2 fotos ainda em baixa resolução)

Nenhuma foto externa foi incorporada: o ambiente de trabalho bloqueava o acesso a Wikimedia Commons e à Prefeitura. Se o pacote da equipe não trouxer versões melhores, estas candidatas, encontradas por busca textual, podem servir. É preciso abri-las e conferir a licença antes de usar:

| Ponto | Candidata | Licença a confirmar |
|---|---|---|
| Igreja Matriz de São Sebastião | [Commons — Fachada da Igreja Matriz de São Sebastião, Timóteo MG.JPG](https://commons.wikimedia.org/wiki/File:Fachada_da_Igreja_Matriz_de_S%C3%A3o_Sebasti%C3%A3o,_Tim%C3%B3teo_MG.JPG) (há também uma versão de 2025, com 2869×3825 px) | Commons (geralmente CC BY-SA; conferir na página) |
| Casa de Memória do Legislativo | Página [Casa de Memória — Câmara Municipal](https://www.timoteo.mg.leg.br/institucional/noticias/casa-de-memoria-conta-a-historia-da-cidade-por-meio-da-vida-dos-timotenses) | Câmara: pedir autorização |
| Vários pontos | Categoria do município no Wikimedia Commons e página [Pontos turísticos da Prefeitura](https://www.timoteo.mg.gov.br/14/pontos-turisticos) | Prefeitura: pedir autorização |

### Como incorporar uma foto nova

1. Salve o arquivo em `assets/img/` com o id do ponto no nome (WebP para fotos grandes; mantenha o JPEG original quando ele já for pequeno, para não perder qualidade em uma nova compressão).
2. Acrescente a entrada em `window.FOTOS` (`data/rota.js`) com `src`, `w`, `h` (tamanho real), `alt` (descreva o que se vê) e `credit` (autor/licença, quando exigido).
3. Registre neste arquivo a URL da página de origem, o autor, a licença, o crédito exigido e a data da consulta.
