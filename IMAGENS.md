# Inventário e auditoria das fotografias

Auditoria feita em 12/10/2026 sobre **todas** as imagens do site. A lista das fotos por ponto fica em `window.FOTOS` (`data/rota.js`): é a única fonte do painel de detalhes e da galeria. Este arquivo registra a origem, a qualidade e o que ainda falta verificar em cada uma.

## Como ler

- **Ação:** *manter* (adequada) · *substituir* (resolução ou enquadramento insuficientes; buscar uma original melhor) · *complementar* (adequada, mas com uma só imagem) · *investigar* (dúvida sobre o local retratado ou sobre a licença).
- **Origem e licenças:** as fotos dos pontos são do acervo de campo do grupo. A equipe do projeto **confirmou as licenças de uso** de todas as fotos em uso (12/10/2026). Onde a própria imagem traz assinatura ou marca-d'água, o crédito aparece no site (campo `credit`).
- **Moldura:** a foto principal ocupa toda a largura do painel (cerca de 290 a 560 px, conforme a tela). A altura acompanha a proporção da própria imagem, sem cortes e sem faixas vazias. Uma foto de 1200×1600 exibida a 400 px de largura fica com 533 px de altura. Abaixo de ~400 px de largura de origem, a foto aparece ampliada e perde nitidez.

## Pontos da rota

| # | Ponto | Arquivo(s) | Qtd. | Resolução | Correspondência / observações | Ação |
|---|---|---|---|---|---|---|
| 1 | Estação Mário Carvalho | `estacao-mario-carvalho{,-2..-5}.webp` | 5 | 960×640 · 500×375 · 500×333 · 515×388 · 500×326 | Plataforma, placa da estação e trilhos da EFVM: corresponde. A nº 5 tem a assinatura **"Becam Produções"** (crédito no site; licença confirmada). Convertidas de PNG para WebP (de 2,2 MB para 0,3 MB). | manter |
| 2 | 1º Cartório de Notas | — | 0 | — | Sem fotografia. | buscar |
| 3 | Igreja São José | — (removida) | 0 | — | A antiga `igreja-sao-jose.jpg` mostrava a igreja com cúpula, que é a **Igreja Católica São José**, um edifício diferente da capela de 1947 descrita no ponto (confirmado pela equipe). A foto foi retirada do ponto e do repositório. | **buscar** foto da capela de 1947 |
| 3 | Tapetes de Corpus Christi | `tapetes-corpus-christi.jpg` | 1 | 900×881 | Confecção de tapete de serragem: corresponde à manifestação. A rua não é identificável na imagem. | manter |
| 4 | Praça do Coreto | `praca-coreto.jpg` | 1 | **246×164** | Vista aérea da praça; resolução muito baixa. | **substituir** |
| 4 | Carnaval Tradicional | `carnaval.jpg` | 1 | **246×164** | Desfile noturno; resolução muito baixa. | **substituir** |
| 5 | Escritório Central da Aperam | — | 0 | — | Sem fotografia. | buscar |
| 6 | Ginásio José York | `ginasio-jose-york.jpg` | 1 | 738×414 | Vista aérea do ginásio circular; o mesmo edifício aparece na foto do manifesto. | manter |
| 7 | Fundação Aperam | `cantata-natal.jpg` (reutilizada) | 1 | 597×335 | A Cantata é encenada na fachada do prédio histórico da Fundação, que é o que a foto mostra. O texto alternativo diz que o prédio está iluminado para a Cantata. | complementar (foto diurna) |
| 7 | Cantata de Natal | `cantata-natal.jpg` | 1 | 597×335 | Corresponde. | manter |
| 8 | Antiga Escola Técnica de Metalurgia | `escola-metalurgia.jpg` | 1 | **246×164** | Prédio com a placa do CEFET-MG. Resolução muito baixa; falta confirmar se é o prédio tombado em 2008. | **substituir / investigar** |
| 9 | E.E. Percival Farquhar | `ee-percival-farquhar.jpg` | 1 | **246×168** | Foto de grupo diante dos arcos de tijolo (tem caráter documental). Resolução muito baixa, e o prédio aparece pouco. | complementar (fachada) |
| 10 | Pico do Ana Moura | `pico-ana-moura.jpg` | 1 | 515×388 | Paredão com antenas: corresponde. | manter |
| 11 | Igreja do Ana Moura | — | 0 | — | Sem fotografia. | buscar |
| 12 | E.E. Getúlio Vargas | `ee-getulio-vargas.jpg` | 1 | **246×164** | Fachada; resolução muito baixa. | **substituir** |
| 13 | Estátua Carlos Drummond | `estatua-drummond.jpg` | 1 | 512×599 (retrato) | Corresponde. Por ser vertical, aparece inteira (`contain`), sem corte. | manter |
| 14 | Praça do Coliseu | — | 0 | — | Sem fotografia. | buscar |
| 15 | Feira do Timirim | `feira-timirim.jpg` | 1 | 515×388 | Corresponde. | manter |
| 16 | Sede da Prefeitura | — | 0 | — | Sem fotografia. | buscar |
| 17 | Casa de Memória do Legislativo | `casa-memoria-legislativo.jpg` | 1 | **246×164** | Casarão térreo: corresponde à descrição (casarão de 1922). Resolução muito baixa. | **substituir** |
| 18 | Igreja Matriz de São Sebastião | `igreja-sao-sebastiao.jpg` | 1 | **194×259** | Torre de tijolos e escadaria. Resolução muito baixa. | **substituir** |
| 19 | Chafariz e Olho-D'Água (Biquinha) | — | 0 | — | Sem fotografia. | buscar |
| 20 | Centro de Vivência Trajano Quirino Bicalho | — | 0 | — | Sem fotografia. | buscar |
| 21 | Oikós | `oikos.jpg` | 1 | 515×388 | Alameda arborizada com visitantes: corresponde. | manter |
| 22 | Forno Hoffmann | `forno-hoffmann.jpg` | 1 | 515×388 | Chaminé e estrutura de tijolos: corresponde. | manter |
| 23 | E.M. Virgínia de Souza Reis | — | 0 | — | Sem fotografia. | buscar |
| 24 | Ponte Mauá | `ponte-maua.jpg` | 1 | 567×352 | Ponte em arco: corresponde. Tem a marca-d'água **"DA"** (*Diário do Aço*), com crédito no site; licença confirmada. A marca não foi removida. | manter |
| 25 | E.E. João Cotta de Figueiredo Barcelos | — | 0 | — | Sem fotografia. | buscar |

**Resumo:** são 28 entradas. 18 têm fotografia (a Estação com 5) e 10 exibem o estado "Fotografia em levantamento". 7 imagens estão em baixa resolução (≤ 246 px de largura) e devem ser substituídas.

## Imagens editoriais (página inicial)

| Arquivo | Uso | Resolução | Observação | Ação |
|---|---|---|---|---|
| `hero-bg.webp` | Capa | 1200×799 | Vista aérea do centro. Vem do handoff de design. | manter |
| `historia-figure.webp` | História, capítulo 03 (vertical) | 335×557 | Faixa preta de 40 px removida do topo do arquivo. **Igreja Católica São José** (confirmado pela equipe; o design a atribuía, por engano, à Matriz de São Sebastião). Legenda e texto alternativo corrigidos. | manter |
| `historia-figure-2.webp` | História, capítulo 01 | 516×387 | "Monumento da Paragem do Ribeirão do Timóteo", conforme o design. | manter (confirmar) |
| `historia-figure-3.webp` | História, capítulo 02 | 640×480 | Igreja Católica São José, vista aérea. Legenda e texto alternativo corrigidos. | manter |
| `manifesto-figure.webp` | Manifesto | 978×550 | Vista aérea com o Ginásio José York. | manter |

## Pontos sem fotografia: o que o site mostra

Os 10 pontos sem imagem verificada exibem uma placa intencional: o símbolo do Veio, "Fotografia em levantamento" e um convite à visita. O site **não** usa fotos de outros lugares, fotos parecidas nem imagens geradas por IA. A antiga grade com quatro quadros tracejados "Imagem a ser inserida" foi removida: a galeria mostra só as fotos que existem.

## Busca de substitutas: limitação deste ciclo

O ambiente em que este trabalho foi feito **bloqueia o acesso de rede** a Wikimedia Commons, Wikipedia, ao site da Prefeitura e a outros acervos. Só a busca textual funcionou, e não foi possível baixar nem inspecionar nenhuma imagem externa. Por isso, **nenhuma foto externa foi incorporada**. As candidatas encontradas na busca estão abaixo e precisam ser abertas, conferidas e baixadas por quem tiver acesso:

| Ponto | Candidata | Licença a confirmar |
|---|---|---|
| Igreja Matriz de São Sebastião | [Commons — Fachada da Igreja Matriz de São Sebastião, Timóteo MG.JPG](https://commons.wikimedia.org/wiki/File:Fachada_da_Igreja_Matriz_de_S%C3%A3o_Sebasti%C3%A3o,_Tim%C3%B3teo_MG.JPG) (há também uma versão de 2025, com 2869×3825 px) | Commons (geralmente CC BY-SA; conferir na página) |
| Igreja São José (capela de 1947) | [Commons — Igreja São José Operário de Acesita com a nova Igreja Matriz de São José ao fundo, Timóteo MG.JPG](https://commons.wikimedia.org/wiki/File:Igreja_S%C3%A3o_Jos%C3%A9_Oper%C3%A1rio_de_Acesita_com_a_nova_Igreja_Matriz_de_S%C3%A3o_Jos%C3%A9_ao_fundo,_Tim%C3%B3teo_MG.JPG) (usuário HVL, set/2024) | idem |
| Contexto (Timirim / Praça do Coliseu) | [Commons — Vista parcial do B. Timirim, Timóteo MG.JPG](https://commons.wikimedia.org/wiki/File:Vista_parcial_do_B._Timirim,_Tim%C3%B3teo_MG.JPG) | idem |
| Vários pontos | Categoria do município no Wikimedia Commons e página [Pontos turísticos da Prefeitura](https://www.timoteo.mg.gov.br/14/pontos-turisticos) | Prefeitura: pedir autorização |

### Como incorporar uma foto nova

1. Salve o arquivo em `assets/img/` com o id do ponto no nome (WebP para fotos grandes; mantenha o JPEG original quando ele já for pequeno, para não perder qualidade em uma nova compressão).
2. Acrescente a entrada em `window.FOTOS` (`data/rota.js`) com `src`, `w`, `h` (tamanho real), `alt` (descreva o que se vê) e `credit` (autor/licença, quando exigido).
3. Registre neste arquivo a URL da página de origem, o autor, a licença, o crédito exigido e a data da consulta.
