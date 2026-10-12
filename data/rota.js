/* Plain-script mirror of the route data. 25 numbered points (28 entries —
   some numbers cover two entries at the same stop). Coordinates from the
   route's .gpx; long text, links and next-stop timing from
   rota_patrimonios_timoteo_descricoes.md and Italo's travel-time table.

   Optional fields per point:
   - address: postal address, shown in the detail panel and used as the
     Google Maps destination (falls back to coords when absent).
   - tipo: 'manifestacao' marks intangible heritage (celebrations held at a
     place) as opposed to a building/space; the UI labels and draws them
     differently. Absent = lugar.
   A point can belong to any number of thematic routes (ROTAS_TEMATICAS)
   without being duplicated here. */

/* Paróquia São José de Acesita — Praça 1.º de Maio, 89. Shared by the
   church and by the Tapetes de Corpus Christi, whose reference address it
   is. Coordinates for both come from the route .gpx (stop 3). */
var ENDERECO_PRACA_1_MAIO = 'Praça 1.º de Maio, 89 — Centro, Timóteo - MG, 35180-018';

window.ROTA = [
  { id: 'estacao', number: '1', name: 'Estação Mário Carvalho', coords: [-19.52597, -42.64429],
    short: 'Antiga estação ferroviária que representa a importância da Estrada de Ferro Vitória a Minas para a formação e o desenvolvimento de Timóteo.',
    long: 'A Estação Mário Carvalho é um dos principais marcos ferroviários de Timóteo e integra a Estrada de Ferro Vitória a Minas (EFVM). A atual estação entrou em operação no final da década de 1970/início de 1980, acompanhando a transferência do traçado ferroviário para a margem de Timóteo do rio Piracicaba. Recebeu o nome de Mário Carvalho de Azevedo Barros, profissional ligado à engenharia e à topografia ferroviária da antiga Vale. A ferrovia possui importância histórica para o Vale do Aço por ter contribuído para a circulação de pessoas, matérias-primas e produtos, estando diretamente relacionada ao processo de industrialização regional.',
    links: [ { label: 'Estações Ferroviárias do Brasil', url: 'https://www.estacoesferroviarias.com.br/efvm/mario.htm' }, { label: 'Wikipédia', url: 'https://pt.wikipedia.org/wiki/Esta%C3%A7%C3%A3o_M%C3%A1rio_Carvalho' } ],
    next: { id: 'cartorio', time: '00:07:00', km: 3.132 } },
  { id: 'cartorio', number: '2', name: '1º Cartório de Notas de Timóteo', coords: [-19.53973, -42.64636],
    short: 'Espaço ligado à história administrativa e documental do município, preservando registros importantes da vida de Timóteo.',
    long: 'O 1º Cartório de Notas de Timóteo está relacionado à história documental e administrativa do município. Registros cartoriais são fundamentais para a organização da vida civil, imobiliária e jurídica de uma cidade, preservando documentos que ajudam a compreender a evolução da sociedade e do território. O ofício possui registro de instalação em 24 de junho de 1939, entre as instituições mais antigas ligadas à documentação formal da região.',
    links: [ { label: 'Cartório Judicial — informações', url: 'https://cartoriojudicial.com.br/cartorios/mg/timoteo/1-cartorio-de-notas-de-timoteo' } ],
    next: { id: 'igreja-sao-jose', time: '00:01:02', km: 0.232 } },
  { id: 'igreja-sao-jose', number: '3', name: 'Igreja São José', coords: [-19.53962, -42.64661],
    address: ENDERECO_PRACA_1_MAIO,
    short: 'Templo que representa a tradição religiosa e a formação das comunidades que acompanharam o crescimento de Timóteo.',
    long: 'Também conhecida como Igreja São José Operário ou Igreja São José de Acesita, o templo foi construído pela antiga Acesita em 1947, durante os primeiros anos de implantação da indústria siderúrgica em Timóteo, para atender religiosamente os moradores da vila operária. Tornou-se um dos primeiros e principais espaços religiosos do núcleo urbano ligado à empresa. Em 2014, o Ministério Público de Minas Gerais destacou sua importância para a memória do município e sua inclusão no Inventário de Proteção do Acervo Cultural de Timóteo.',
    links: [ { label: 'Ministério Público de MG', url: 'https://www.mpmg.mp.br/portal/menu/comunicacao/noticias/liminar-proibe-intervencao-na-igreja-sao-jose-edificacao-de-valor-historico-e-cultural-de-timoteo-no-vale-do-aco.shtml' }, { label: 'Wikipédia', url: 'https://pt.wikipedia.org/wiki/Igreja_S%C3%A3o_Jos%C3%A9_Oper%C3%A1rio_%28Tim%C3%B3teo%29' } ],
    next: { id: 'praca-coreto', time: '00:00:18', km: 0.026 } },
  { id: 'tapetes-corpus-christi', number: '3', name: 'Tapetes de Corpus Christi', coords: [-19.53962, -42.64661],
    address: ENDERECO_PRACA_1_MAIO, tipo: 'manifestacao',
    short: 'Manifestação religiosa e cultural que transforma as ruas em um grande cenário de fé, arte e participação comunitária.',
    long: 'A confecção dos tapetes de Corpus Christi é uma manifestação religiosa e cultural que mobiliza a comunidade para a criação de desenhos e caminhos ornamentais nas ruas durante a celebração católica. Além do significado religioso, a tradição envolve trabalho coletivo, criatividade e transmissão de costumes entre gerações.',
    links: [ { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'praca-coreto', time: '00:00:18', km: 0.026 } },
  { id: 'praca-coreto', number: '4', name: 'Praça do Coreto', coords: [-19.53942, -42.64673],
    short: 'Espaço tradicional de convivência, encontros e manifestações culturais, marcado pela presença do coreto.',
    long: 'A Praça do Coreto é um espaço público de convivência e de realização de atividades culturais e comunitárias em Timóteo, utilizado como palco para eventos, apresentações musicais, ações sociais e atividades promovidas pelo município e por instituições parceiras. Sua importância está menos associada a uma única edificação histórica e mais ao papel que a praça desempenha na vida urbana. Em anos recentes, o local recebeu festivais culturais, apresentações musicais e ações públicas.',
    links: [ { label: 'Prefeitura — Festival Tambatuques', url: 'https://www.timoteo.mg.gov.br/noticias/32229/festival-tambatuques-agita-timoteo-na-praca-do-coreto' }, { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'aperam-escritorio', time: '00:00:46', km: 0.213 } },
  { id: 'carnaval', number: '4', name: 'Carnaval Tradicional', coords: [-19.53942, -42.64673], tipo: 'manifestacao',
    short: 'Manifestação cultural que preserva a tradição carnavalesca e reúne a comunidade em momentos de celebração e confraternização.',
    long: 'O Carnaval Tradicional representa uma das manifestações culturais populares associadas à identidade de Timóteo. Mais do que uma festa, reúne música, participação comunitária e ocupação dos espaços públicos. A tradição carnavalesca faz parte do conjunto de manifestações culturais que ajudam a preservar costumes e fortalecer os vínculos entre gerações, contribuindo também para a movimentação cultural e turística do município.',
    links: [ { label: 'Centro Turístico Mata Atlântica de Minas', url: 'https://ctmam.org.br/cidade/timoteo/' }, { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'aperam-escritorio', time: '00:00:46', km: 0.213 } },
  { id: 'aperam-escritorio', number: '5', name: 'Escritório Central da Aperam', coords: [-19.53848, -42.64513],
    short: 'Edificação ligada à trajetória da indústria siderúrgica e à história da empresa que teve papel fundamental na formação de Timóteo.',
    long: 'O Escritório Central está ligado à trajetória da antiga Acesita, empresa que desempenhou papel central na industrialização de Timóteo e na formação do Vale do Aço. A Acesita foi fundada em 31 de outubro de 1944 e iniciou sua produção industrial em Timóteo nos anos seguintes. Sua presença transformou profundamente o município, influenciando a ocupação urbana, a criação da vila operária, a infraestrutura e a educação. Atualmente, a Aperam South America mantém em Timóteo uma de suas principais unidades industriais.',
    links: [ { label: 'Aperam — Nossa História', url: 'https://brasil.aperam.com/institucional/aperam/nossa-historia/' }, { label: 'Aperam South America', url: 'https://www.aperam.com/pt-br/' } ],
    next: { id: 'ginasio-jose-york', time: '00:01:36', km: 0.390 } },
  { id: 'ginasio-jose-york', number: '6', name: 'Ginásio Poliesportivo José York', coords: [-19.53771, -42.64601],
    short: 'Importante espaço esportivo e comunitário, palco de atividades, competições e eventos que integram a população.',
    long: 'O Ginásio Poliesportivo José York é um equipamento esportivo e comunitário utilizado para atividades físicas, competições e eventos. Espaços desse tipo têm papel importante na formação esportiva e na convivência social, oferecendo à população um local para a prática de diferentes modalidades, integrando esporte, educação e comunidade.',
    links: [ { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'fundacao-aperam', time: '00:01:18', km: 0.255 } },
  { id: 'fundacao-aperam', number: '7', name: 'Fundação Aperam', coords: [-19.53654, -42.64615],
    short: 'Instituição que promove ações culturais, sociais e educacionais, contribuindo para o desenvolvimento da comunidade local.',
    long: 'A Fundação Aperam Acesita foi criada em junho de 1994 e atua no desenvolvimento das comunidades onde a Aperam mantém suas principais atividades, com programas de educação, cultura, meio ambiente e promoção social. Sua sede histórica foi construída na década de 1950 e originalmente funcionava como residência para empregados vindos de outras cidades para trabalhar na Acesita. O Centro Cultural foi inaugurado em 31 de outubro de 1994 e tornou-se referência cultural para Timóteo e para o Vale do Aço.',
    links: [ { label: 'Fundação Aperam Acesita', url: 'https://brasil.aperam.com/sustentabilidade/social/fundacao-aperam-acesita/' }, { label: 'Centro Cultural', url: 'https://brasil.aperam.com/sustentabilidade/social/fundacao-aperam-acesita/centro-cultural/' } ],
    next: { id: 'escola-metalurgia', time: '00:01:50', km: 0.702 } },
  { id: 'cantata-natal', number: '7', name: 'Cantata de Natal', coords: [-19.53654, -42.64615], tipo: 'manifestacao',
    short: 'Tradicional celebração natalina que reúne música, cultura e comunidade em um dos períodos mais simbólicos do ano.',
    long: 'A Cantata de Natal da Fundação Aperam é uma das manifestações culturais mais tradicionais do calendário de Timóteo. O evento utiliza a fachada do histórico prédio da Fundação como cenário para apresentações musicais, iluminação e outras atrações natalinas. A tradição já possui décadas de história — em 2018, por exemplo, foi realizada a 24ª edição — reunindo moradores de Timóteo e de outras cidades do Vale do Aço.',
    links: [ { label: 'Aperam — Cantata de Natal', url: 'https://brasil.aperam.com/cantata-de-natal-da-fundacao-aperam-acesita-promove-espetaculo-de-luz-cor-e-som/' }, { label: 'Portal Minas Gerais', url: 'https://www.minasgerais.com.br/pt/eventos/timoteo/cantata-de-natal-fundacao-aperam' } ],
    next: { id: 'escola-metalurgia', time: '00:01:50', km: 0.702 } },
  { id: 'escola-metalurgia', number: '8', name: 'Antiga Escola Técnica de Metalurgia', coords: [-19.53884, -42.65009],
    short: 'Criada para formar profissionais para a indústria, representa a importância da educação técnica no desenvolvimento de Timóteo.',
    long: 'A Escola Técnica de Metalurgia foi criada pela Acesita entre 1952 e 1953, em parceria com o SENAI, para atender à crescente demanda por mão de obra qualificada. Em 1963 foi inaugurado o prédio que posteriormente se tornaria patrimônio histórico. As atividades foram encerradas em 1994 e o prédio passou para a administração municipal, sendo tombado pelo Decreto nº 3.856, de 10 de abril de 2008.',
    links: [ { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' }, { label: 'Revista CEFETIANDO', url: 'https://www.revistacefetiando.cefetmg.br/wp-content/uploads/sites/251/2023/09/cefetiando_V3_N1_v2-1-2.pdf' } ],
    next: { id: 'ee-percival-farquhar', time: '00:06:17', km: 2.465 } },
  { id: 'ee-percival-farquhar', number: '9', name: 'E.E. Percival Farquhar', coords: [-19.55316, -42.66601],
    short: 'Instituição de ensino que integra a história educacional do município e a formação de diferentes gerações de timotenses.',
    long: 'A Escola Estadual Percival Farquhar integra o patrimônio arquitetônico e educacional de Timóteo. O prédio foi projetado pelo arquiteto mineiro Éolo Maia em 1983, a partir de uma proposta para o Grupo Escolar Vale Verde, utilizando estruturas autoportantes de tijolos maciços. Foi tombado pelo município pelo Decreto nº 3.857, de 15 de abril de 2008.',
    links: [ { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' } ],
    next: { id: 'pico-ana-moura', time: '00:30:52', km: 9.553 } },
  { id: 'pico-ana-moura', number: '10', name: 'Pico do Ana Moura', coords: [-19.58361, -42.69417],
    short: 'Um dos pontos de destaque da paisagem de Timóteo, oferecendo uma vista privilegiada da cidade e de seu entorno.',
    long: 'Com cerca de 864 metros de altitude, o Pico do Ana Moura é o ponto mais elevado de Timóteo e um dos elementos naturais mais marcantes da paisagem do município, podendo ser observado de diferentes áreas do Vale do Aço. Seu nome homenageia Ana Maria Moura, que se estabeleceu nas proximidades com o marido João Rufino de Souza em 1906, desenvolvendo atividades rurais na região. Atualmente é um importante atrativo paisagístico, com acesso ao topo, mirante e estrutura para a prática de voo livre.',
    links: [ { label: 'Wikipédia', url: 'https://pt.wikipedia.org/wiki/Pico_do_Ana_Moura' }, { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' } ],
    next: { id: 'igreja-ana-moura', time: '00:25:38', km: 6.765 } },
  { id: 'igreja-ana-moura', number: '11', name: 'Igreja do Ana Moura', coords: [-19.5722, -42.67045],
    short: 'Espaço de fé e convivência que representa a tradição religiosa e a história da comunidade do bairro Ana Moura.',
    long: 'A Igreja do Ana Moura representa a presença da tradição religiosa na comunidade que se desenvolveu no entorno do Pico do Ana Moura, região com relação histórica com a ocupação rural que antecedeu a expansão urbana de Timóteo. O bairro Ana Moura surgiu em um período de expansão urbana do município, especialmente a partir da década de 1970, e a igreja tornou-se um dos espaços de referência comunitária e religiosa da região.',
    links: [ { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' }, { label: 'Wikipédia — Ana Moura', url: 'https://pt.wikipedia.org/wiki/Ana_Moura_%28Tim%C3%B3teo%29' } ],
    next: { id: 'ee-getulio-vargas', time: '00:07:35', km: 4.790 } },
  { id: 'ee-getulio-vargas', number: '12', name: 'E.E. Getúlio Vargas', coords: [-19.54489, -42.64791],
    short: 'Tradicional instituição de ensino que faz parte da trajetória educacional e social de Timóteo.',
    long: 'O Grupo Escolar Getúlio Vargas foi criado em 1948, inicialmente destinado ao ensino primário, em um momento de forte transformação do município, quando a Acesita se consolidava e havia necessidade de infraestrutura educacional para os filhos dos trabalhadores. O prédio apresenta características típicas das construções escolares do período e foi tombado pelo Decreto nº 3.857, de 15 de abril de 2008.',
    links: [ { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' } ],
    next: { id: 'estatua-drummond', time: '00:01:21', km: 0.908 } },
  { id: 'estatua-drummond', number: '13', name: 'Estátua Carlos Drummond', coords: [-19.55061, -42.64487],
    short: 'Homenagem ao poeta Carlos Drummond de Andrade, cuja presença na história e na cultura mineira é celebrada pelo município.',
    long: 'A homenagem a Carlos Drummond de Andrade integra o conjunto de referências culturais da cidade. O poeta mineiro é uma das figuras mais importantes da literatura brasileira e sua memória está fortemente relacionada à identidade cultural de Minas Gerais. O ponto funciona como referência cultural e simbólica, aproximando o visitante da literatura e da tradição artística mineira.',
    links: [ { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' }, { label: 'Instituto Moreira Salles', url: 'https://ims.com.br/titular-autor/carlos-drummond-de-andrade/' } ],
    next: { id: 'praca-coliseu', time: '00:00:43', km: 0.218 } },
  { id: 'praca-coliseu', number: '14', name: 'Praça do Coliseu', coords: [-19.55054, -42.64424],
    short: 'Espaço público de convivência e lazer, marcado por sua importância na vida comunitária e urbana da cidade.',
    long: 'A Praça do Coliseu, no bairro Timirim, é um dos espaços urbanos mais marcantes da cidade, com arquitetura associada ao trabalho do arquiteto Éolo Maia. Além de sua característica arquitetônica, tornou-se um espaço de convivência e de manifestações culturais, recebendo grupos artísticos e diferentes eventos.',
    links: [ { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' } ],
    next: { id: 'feira-timirim', time: '00:01:30', km: 0.738 } },
  { id: 'feira-timirim', number: '15', name: 'Feira do Timirim', coords: [-19.55176, -42.64622],
    short: 'Tradicional espaço de comércio e convivência, onde produtos, sabores e costumes locais se encontram.',
    long: 'A Feira do Timirim representa a dimensão cotidiana e comunitária da rota. Feiras livres funcionam como espaços de comércio, encontro e circulação de produtos, aproximando produtores, comerciantes e consumidores, ajudando a preservar hábitos alimentares e costumes locais.',
    links: [ { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'prefeitura', time: '00:04:28', km: 3.543 } },
  { id: 'prefeitura', number: '16', name: 'Sede da Prefeitura de Timóteo', coords: [-19.57715, -42.64299],
    short: 'Centro do poder executivo municipal e um dos espaços que representam a administração e a história política da cidade.',
    long: 'A sede da Prefeitura representa o centro administrativo do município e está relacionada à organização política e institucional de Timóteo. A história administrativa da cidade acompanha seu processo de emancipação e transformação de antigo povoado em município industrial. Atualmente, o edifício concentra atividades do Poder Executivo e funciona como referência para a vida administrativa e política local.',
    links: [ { label: 'Prefeitura Municipal', url: 'https://www.timoteo.mg.gov.br/' }, { label: 'Câmara Municipal', url: 'https://www.timoteo.mg.leg.br/' } ],
    next: { id: 'casa-memoria-legislativo', time: '00:01:14', km: 0.542 } },
  { id: 'casa-memoria-legislativo', number: '17', name: 'Casa de Memória e Pesquisa do Legislativo', coords: [-19.58049, -42.6457],
    short: 'Espaço dedicado à preservação da história política e institucional de Timóteo e à memória do Poder Legislativo.',
    long: 'A Casa de Memória e Pesquisa do Legislativo foi criada em 29 de abril de 2004, por iniciativa do então vereador e presidente da Câmara Roberto de Araújo Paiva, para preservar e divulgar a história de Timóteo por meio de documentos, fotografias, objetos, jornais e relatos da comunidade. Funciona em um casarão construído em 1922, considerado pela Prefeitura como a edificação mais antiga de Timóteo ainda preservada, com paredes de pau a pique, piso e esquadrias de madeira.',
    links: [ { label: 'Câmara Municipal — Casa de Memória', url: 'https://www.timoteo.mg.leg.br/institucional/noticias/casa-de-memoria-conta-a-historia-da-cidade-por-meio-da-vida-dos-timotenses' }, { label: 'MuseusBr', url: 'https://cadastro.museus.gov.br/museus/casa-de-memoria-e-pesquisa-do-legislativo-de-timoteo/' } ],
    next: { id: 'igreja-sao-sebastiao', time: '00:01:40', km: 0.675 } },
  { id: 'igreja-sao-sebastiao', number: '18', name: 'Igreja Matriz de São Sebastião', coords: [-19.58242, -42.64452],
    short: 'Um dos principais símbolos religiosos de Timóteo, reunindo fé, tradição e memória da comunidade.',
    long: 'A Igreja Matriz de São Sebastião está ligada à tradição religiosa e à formação do núcleo urbano de Timóteo — São Sebastião é o padroeiro do município. A história da comunidade remonta ao antigo núcleo conhecido como São Sebastião do Alegre: em 1907 foi doado um terreno para a construção de uma pequena igreja de madeira na região que corresponde à atual Praça 29 de Abril. A atual igreja matriz representa a continuidade dessa tradição.',
    links: [ { label: 'Prefeitura — São Sebastião', url: 'https://www.timoteo.mg.gov.br/15/localizacao.aspx' }, { label: 'Wikipédia — Timóteo', url: 'https://pt.wikipedia.org/wiki/Tim%C3%B3teo' } ],
    next: { id: 'biquinha', time: '00:01:10', km: 0.479 } },
  { id: 'biquinha', number: '19', name: 'Chafariz e Olho-D’Água – Biquinha', coords: [-19.58082, -42.64375],
    short: 'Fonte histórica ligada à memória da cidade e ao uso das águas, preservando uma importante referência do passado de Timóteo.',
    long: 'Conhecido como Biquinha, o Chafariz e Olho-D\'Água é um dos elementos mais antigos ligados ao abastecimento e à vida cotidiana da população de Timóteo. Segundo registros históricos e depoimentos de antigos moradores, o local possuía nascentes e bicas utilizadas pela comunidade numa época sem abastecimento de água encanada nas residências. Foi tombado pela Prefeitura pelo Decreto nº 1.285, de 22 de abril de 1988.',
    links: [ { label: 'iPatrimônio', url: 'https://www.ipatrimonio.org/timoteo-chafariz-e-olho-dagua/' } ],
    next: { id: 'centro-vivencia', time: '00:00:59', km: 0.386 } },
  { id: 'centro-vivencia', number: '20', name: 'Centro de Vivência Trajano Quirino Bicalho', coords: [-19.57829, -42.64263],
    short: 'Espaço voltado à convivência, cultura e preservação das tradições e da memória da comunidade.',
    long: 'O Centro de Vivência Trajano Quirino Bicalho é um espaço comunitário voltado à convivência, integração e realização de atividades para a população. Equipamentos como este cumprem função importante ao oferecer locais para atividades sociais, culturais, educativas e de lazer, fortalecendo os vínculos entre moradores.',
    links: [ { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: { id: 'oikos', time: '00:02:27', km: 1.505 } },
  { id: 'oikos', number: '21', name: 'Oikós', coords: [-19.57012, -42.6372],
    short: 'Espaço dedicado à educação ambiental e à valorização da natureza, aproximando a comunidade da preservação ambiental.',
    long: 'O Oikós é o Centro de Educação Ambiental da Aperam South America e está inserido em uma área de aproximadamente 989 hectares de Mata Atlântica dentro do município de Timóteo, com matas secundárias, nascentes e grande diversidade de espécies. Sua localização, próxima ao Parque Estadual do Rio Doce, reforça a importância ambiental do local. Além da preservação, desenvolve atividades de educação ambiental para a comunidade.',
    links: [ { label: 'Aperam — Oikós', url: 'https://brasil.aperam.com/sustentabilidade/social/fundacao-aperam-acesita/oikos/' }, { label: 'IEF/MG — Parque Estadual do Rio Doce', url: 'https://www.ief.mg.gov.br/' } ],
    next: { id: 'forno-hoffmann', time: '00:04:12', km: 3.085 } },
  { id: 'forno-hoffmann', number: '22', name: 'Forno Hoffmann', coords: [-19.54926, -42.63496],
    short: 'Estrutura histórica relacionada à produção de carvão vegetal e à antiga atividade industrial que marcou a região.',
    long: 'O Forno Hoffmann foi construído em 1945, no atual bairro Novo Horizonte, para a fabricação de tijolos utilizados na construção das instalações e residências associadas à então Acesita. Sua existência está diretamente ligada aos primeiros anos da industrialização de Timóteo. Atualmente é reconhecido como patrimônio histórico e referência da paisagem urbana da cidade.',
    links: [ { label: 'Diário do Aço', url: 'https://www.diariodoaco.com.br/noticia/0118756-documentario-resgata-historia-da-boate-hoffman-em-timoteo' }, { label: 'Prefeitura — Pontos Turísticos', url: 'https://www.timoteo.mg.gov.br/14/pontos-turisticos' } ],
    next: { id: 'escola-virginia-reis', time: '00:04:36', km: 3.056 } },
  { id: 'escola-virginia-reis', number: '23', name: 'Escola Municipal Virgínia de Souza Reis', coords: [-19.53779, -42.62291],
    short: 'Instituição que representa a importância da educação pública na formação e no desenvolvimento da comunidade local.',
    long: 'A Escola Municipal Virgínia de Souza Reis integra a rede municipal de educação e está localizada no bairro Alegre, atendendo à educação infantil e ao ensino fundamental. Em 2023, a escola completou 55 anos de existência e passou por uma ampla reforma, com investimentos em melhorias estruturais, instalações, cobertura, pintura, acessibilidade e áreas externas.',
    links: [ { label: 'Prefeitura — lista telefônica', url: 'https://www.timoteo.mg.gov.br/23/lista-telefonica' }, { label: 'Prefeitura — reforma da escola', url: 'https://www.timoteo.mg.gov.br/Jornal_Junho.pdf' } ],
    next: { id: 'ponte-maua', time: '00:12:12', km: 8.640 } },
  { id: 'ponte-maua', number: '24', name: 'Ponte Mauá', coords: [-19.52425, -42.65525],
    short: 'Estrutura histórica que integra a paisagem e a memória de Timóteo, conectando diferentes áreas e caminhos da cidade.',
    long: 'A Ponte Mauá integra a infraestrutura viária de Timóteo e possui importância para a ligação da região do Cachoeira do Vale com outras áreas do município e do Vale do Aço. Em 2026, a ponte foi reinaugurada após obras em parceria entre Bemisa, Aperam e Prefeitura de Timóteo, com investimento de R$ 10 milhões, associadas à implantação de uma rota alternativa para o transporte de minério, retirando parte do tráfego pesado do perímetro urbano.',
    links: [ { label: 'Prefeitura — reinauguração da Ponte Mauá', url: 'https://timoteo.mg.gov.br/noticias/32258/nova-rota-logistica-da-bemisa-fortalece-mobilidade-e-qualidade-de-vida-em-timoteo' } ],
    next: { id: 'ee-joao-cotta', time: '00:10:17', km: 8.340 } },
  { id: 'ee-joao-cotta', number: '25', name: 'E.E. João Cotta de Figueiredo Barcelos', coords: [-19.53218, -42.66385],
    short: 'Instituição tradicional de ensino que contribui para a história educacional e para a formação de gerações de estudantes de Timóteo.',
    long: 'A Escola Estadual João Cotta de Figueiredo Barcelos integra a rede pública de ensino de Timóteo e representa a presença da educação como parte da formação social do município. Instituições escolares têm papel importante na construção da memória local, pois atravessam gerações e registram mudanças na população, nos bairros e nas políticas educacionais.',
    links: [ { label: 'Secretaria de Estado de Educação de MG', url: 'https://www.educacao.mg.gov.br/' }, { label: 'Portal da Prefeitura', url: 'https://www.timoteo.mg.gov.br/' } ],
    next: null },
];

window.PILARES = [
  { icon: 'mountain', label: 'Território', description: 'o início' },
  { icon: 'factory', label: 'Indústria', description: 'o impulso' },
  { icon: 'users', label: 'Comunidade', description: 'a força' },
  { icon: 'landmark', label: 'Memória', description: 'o que permanece' },
  { icon: 'leaf', label: 'Futuro', description: 'o que vem' },
];

/* Every figure carries its reference date and source; checked against
   IBGE Cidades@ and Aperam on 2026-10-12. */
window.NUMEROS_FONTES = {
  ibge: { label: 'IBGE Cidades@ — Timóteo', url: 'https://www.ibge.gov.br/cidades-e-estados/mg/timoteo.html' },
  aperam: { label: 'Aperam — Nossa História', url: 'https://brasil.aperam.com/institucional/aperam/nossa-historia/' }
};
window.NUMEROS_TIMOTEO = [
  { value: '81,6 mil', label: 'habitantes', note: '81.579 pessoas recenseadas.', ref: 'Censo 2022', fonte: 'ibge' },
  { value: '144,4 km²', label: 'área territorial', note: '144,377 km² de território municipal.', ref: '2025', fonte: 'ibge' },
  { value: '565 hab./km²', label: 'densidade demográfica', note: '565,03 habitantes por km².', ref: 'Censo 2022', fonte: 'ibge' },
  { value: 'R$ 57,0 mil', label: 'PIB per capita', note: 'R$ 56.987,61 por habitante.', ref: '2023', fonte: 'ibge' },
  { value: '1944', label: 'fundação da Acesita', note: 'A siderúrgica, fundada em 31 de outubro, impulsionou a formação da cidade.', ref: '31/10/1944', fonte: 'aperam' },
];

/* Thematic sub-routes — curated subsets of window.ROTA, in visiting order.
   'all' (Rota Principal) is synthesized in RotaSection from the full list. */
window.ROTAS_TEMATICAS = [
  { id: 'memoria', label: 'Memória', icon: 'landmark',
    pointIds: ['cartorio', 'casa-memoria-legislativo', 'prefeitura', 'estatua-drummond', 'centro-vivencia'] },
  { id: 'fe', label: 'Fé', icon: 'church',
    pointIds: ['igreja-sao-jose', 'igreja-ana-moura', 'igreja-sao-sebastiao', 'tapetes-corpus-christi'] },
  { id: 'cultura', label: 'Cultura', icon: 'users',
    pointIds: ['carnaval', 'tapetes-corpus-christi', 'feira-timirim', 'cantata-natal'] },
  { id: 'industrializacao', label: 'Industrialização', icon: 'factory',
    pointIds: ['fundacao-aperam', 'aperam-escritorio', 'forno-hoffmann', 'escola-metalurgia', 'ponte-maua', 'estacao'] },
  { id: 'lazer', label: 'Lazer', icon: 'trees',
    pointIds: ['oikos', 'feira-timirim', 'praca-coliseu', 'carnaval', 'praca-coreto', 'ginasio-jose-york', 'pico-ana-moura', 'biquinha'] },
  { id: 'educacao', label: 'Educação', icon: 'graduation-cap',
    pointIds: ['escola-virginia-reis', 'ee-joao-cotta', 'ee-getulio-vargas', 'ee-percival-farquhar'] },
];

/* Photographs per point, in display order (first = main). Single source
   for the detail panel and its gallery — see IMAGENS.md for the audit,
   provenance and pending checks of every file. `w`/`h` are the file's
   real pixel size (reserves layout space before the image loads).
   `credit` is shown under the photo; set only when the author is known
   (here: signatures visible in the image itself). Points absent from this
   map get the "fotografia em levantamento" plate instead of an empty slot. */
window.FOTOS = {
  'estacao': [
    { src: 'assets/img/estacao-mario-carvalho.webp', w: 960, h: 640, alt: 'Plataforma coberta da Estação Mário Carvalho, com a placa de identificação da estação.' },
    { src: 'assets/img/estacao-mario-carvalho-2.webp', w: 500, h: 375, alt: 'Composições de minério e trem de passageiros nos trilhos da Estrada de Ferro Vitória a Minas, com morros ao fundo.' },
    { src: 'assets/img/estacao-mario-carvalho-3.webp', w: 500, h: 333, alt: 'Área de embarque da estação sob a cobertura metálica, com a placa “Estação Mário Carvalho”.' },
    { src: 'assets/img/estacao-mario-carvalho-4.webp', w: 515, h: 388, alt: 'Acesso à estação, com a cobertura de concreto entre árvores.' },
    { src: 'assets/img/estacao-mario-carvalho-5.webp', w: 500, h: 326, alt: 'Passageiros na plataforma ao lado do trem de passageiros da Vitória a Minas.', credit: 'Becam Produções' }
  ],
  'tapetes-corpus-christi': [{ src: 'assets/img/tapetes-corpus-christi.jpg', w: 900, h: 881, alt: 'Moradores confeccionam um tapete de serragem colorida na rua para a celebração de Corpus Christi.' }],
  'ginasio-jose-york': [{ src: 'assets/img/ginasio-jose-york.jpg', w: 738, h: 414, alt: 'Vista aérea do Ginásio Poliesportivo José York, edifício circular à margem de uma avenida.' }],
  /* Same file as the Cantata: the event is staged on this building's
     façade, so the photo genuinely shows the Fundação's historic seat. */
  'fundacao-aperam': [{ src: 'assets/img/cantata-natal.jpg', w: 597, h: 335, alt: 'Fachada do prédio histórico da Fundação Aperam, iluminada durante a Cantata de Natal.' }],
  'cantata-natal': [{ src: 'assets/img/cantata-natal.jpg', w: 597, h: 335, alt: 'Fachada da Fundação Aperam iluminada para a Cantata de Natal, entre palmeiras e fogos de artifício.' }],
  'pico-ana-moura': [{ src: 'assets/img/pico-ana-moura.jpg', w: 515, h: 388, alt: 'Paredão rochoso do Pico do Ana Moura com antenas no topo.' }],
  'estatua-drummond': [{ src: 'assets/img/estatua-drummond.jpg', w: 512, h: 599, alt: 'Estátua de bronze de Carlos Drummond de Andrade sentado em um banco.' }],
  'feira-timirim': [{ src: 'assets/img/feira-timirim.jpg', w: 515, h: 388, alt: 'Bancas de hortaliças e frequentadores sob a cobertura da Feira do Timirim.' }],
  'casa-memoria-legislativo': [{ src: 'assets/img/casa-memoria-legislativo.jpg', w: 246, h: 164, alt: 'Casarão térreo branco de janelas verdes que abriga a Casa de Memória e Pesquisa do Legislativo.' }],
  'igreja-sao-sebastiao': [{ src: 'assets/img/igreja-sao-sebastiao.jpg', w: 194, h: 259, alt: 'Torre de tijolos da Igreja Matriz de São Sebastião e a escadaria de acesso.' }],
  'oikos': [{ src: 'assets/img/oikos.jpg', w: 515, h: 388, alt: 'Visitantes em alameda arborizada do Oikós.' }],
  'forno-hoffmann': [{ src: 'assets/img/forno-hoffmann.jpg', w: 515, h: 388, alt: 'Chaminé e estrutura de tijolos do Forno Hoffmann, com escadaria à frente.' }],
  'ponte-maua': [{ src: 'assets/img/ponte-maua.jpg', w: 567, h: 352, alt: 'Ponte Mauá, em arco de concreto, sobre trecho pedregoso do rio.', credit: 'Diário do Aço' }],
  /* Photos supplied by the project team (licences confirmed), 10/2026. */
  'cartorio': [{ src: 'assets/img/cartorio.jpg', w: 447, h: 447, alt: 'Fachada do 1º Cartório de Notas, com a placa de serviços ao lado da porta de vidro.' }],
  'igreja-sao-jose': [
    { src: 'assets/img/igreja-sao-jose.jpg', w: 547, h: 365, alt: 'Capela São José, de fachada branca, com portas em arco e cruz no alto.' },
    { src: 'assets/img/igreja-sao-jose-2.jpg', w: 675, h: 338, alt: 'Fachada e lateral da capela, com a nave de telhado comprido.' },
    { src: 'assets/img/igreja-sao-jose-3.jpg', w: 250, h: 187, alt: 'Interior da capela, com bancos de madeira e janelas em arco.' }
  ],
  'praca-coreto': [
    { src: 'assets/img/praca-coreto.jpg', w: 738, h: 411, alt: 'O coreto da praça, com pilares escuros e cobertura branca.' },
    { src: 'assets/img/praca-coreto-2.jpg', w: 447, h: 447, alt: 'Coreto entre árvores, com bancos de concreto em primeiro plano.' },
    { src: 'assets/img/praca-coreto-3.jpg', w: 678, h: 452, alt: 'Vista aérea da Praça do Coreto, arborizada, com caminhos e área central.' },
    { src: 'assets/img/praca-coreto-4.jpg', w: 515, h: 388, alt: 'Vista aérea do entorno da praça, com quadras arborizadas e um edifício circular.' }
  ],
  'carnaval': [
    { src: 'assets/img/carnaval.jpg', w: 686, h: 446, alt: 'Carro alegórico com plumas e passistas fantasiadas no desfile noturno.' },
    { src: 'assets/img/carnaval-2.jpg', w: 678, h: 452, alt: 'Foliões de camiseta amarela do mesmo bloco cantando na rua.' },
    { src: 'assets/img/carnaval-3.jpg', w: 738, h: 414, alt: 'Show em palco iluminado diante do público durante o carnaval.' }
  ],
  'aperam-escritorio': [
    { src: 'assets/img/aperam-escritorio.jpg', w: 738, h: 414, alt: 'Fachada do Escritório Central da Aperam, com jardim e a placa da empresa.' },
    { src: 'assets/img/aperam-escritorio-2.jpg', w: 515, h: 388, alt: 'Prédio do escritório com mastros de bandeiras e espelho d’água.' },
    { src: 'assets/img/aperam-escritorio-3.jpg', w: 638, h: 480, alt: 'Ambiente interno de trabalho do escritório.' }
  ],
  'escola-metalurgia': [
    { src: 'assets/img/escola-metalurgia.jpg', w: 638, h: 480, alt: 'Estudantes reunidos no gramado diante do prédio de dois pavimentos da antiga escola.' },
    { src: 'assets/img/escola-metalurgia-2.jpg', w: 515, h: 388, alt: 'Portal de entrada do CEFET-MG, Campus Timóteo.' },
    { src: 'assets/img/escola-metalurgia-3.jpg', w: 597, h: 335, alt: 'Edifício branco de um pavimento no campus, com pista e gramado à frente.' }
  ],
  'ee-percival-farquhar': [
    { src: 'assets/img/ee-percival-farquhar.jpg', w: 547, h: 365, alt: 'Fachada de tijolos aparentes da E.E. Percival Farquhar, com arcos e janelas.' },
    { src: 'assets/img/ee-percival-farquhar-2.jpg', w: 598, h: 450, alt: 'Volumes em arco de tijolo maciço do prédio da escola.' },
    { src: 'assets/img/ee-percival-farquhar-3.jpg', w: 540, h: 370, alt: 'Fotografia de grupo de estudantes diante dos arcos de tijolo da escola.' }
  ],
  'igreja-ana-moura': [{ src: 'assets/img/igreja-ana-moura.jpg', w: 399, h: 501, alt: 'Fachada azul-clara da Igreja do Ana Moura, com cruz e escadaria florida.' }],
  'ee-getulio-vargas': [{ src: 'assets/img/ee-getulio-vargas.jpg', w: 447, h: 447, alt: 'Prédio térreo branco da E.E. Getúlio Vargas, com janelas azuis e a encosta verde ao fundo.' }],
  'praca-coliseu': [
    { src: 'assets/img/praca-coliseu.jpg', w: 554, h: 554, alt: 'Arquibancada circular da Praça do Coliseu, com arcos vermelhos e brancos ao fundo.' },
    { src: 'assets/img/praca-coliseu-2.jpg', w: 515, h: 388, alt: 'Arcos coloridos da Praça do Coliseu, com pérgola e piso de pedra.' },
    { src: 'assets/img/praca-coliseu-3.jpg', w: 738, h: 411, alt: 'Vista aérea da Praça do Coliseu, com o círculo de arcos e as ruas do entorno.' }
  ],
  'prefeitura': [{ src: 'assets/img/prefeitura.jpg', w: 554, h: 554, alt: 'Edifício da Sede da Prefeitura de Timóteo, entre palmeiras e pinheiros.' }],
  'biquinha': [{ src: 'assets/img/biquinha.jpg', w: 408, h: 306, alt: 'Praça da Biquinha, com pérgola de madeira e muros brancos junto à encosta.' }],
  'centro-vivencia': [
    { src: 'assets/img/centro-vivencia.jpg', w: 680, h: 383, alt: 'Fachada com o letreiro “Centro de Convivência Trajano Quirino Bicalho”.' },
    { src: 'assets/img/centro-vivencia-2.jpg', w: 680, h: 383, alt: 'Prédio do centro com arcos de tijolo vazado e cobertura metálica.' }
  ],
  'escola-virginia-reis': [
    { src: 'assets/img/escola-virginia-reis.jpg', w: 515, h: 388, alt: 'Vista aérea da Escola Municipal Virgínia de Souza Reis, com pátio central.' },
    { src: 'assets/img/escola-virginia-reis-2.jpg', w: 547, h: 365, alt: 'Pátio da escola, com paredes brancas e faixas azuis.' }
  ],
  'ee-joao-cotta': [
    { src: 'assets/img/ee-joao-cotta.jpg', w: 546, h: 366, alt: 'Prédio da escola na encosta, com fachada colorida.' },
    { src: 'assets/img/ee-joao-cotta-2.jpg', w: 515, h: 388, alt: 'Fachada da E.E. João Cotta de Figueiredo Barcelos vista da rua.' },
    { src: 'assets/img/ee-joao-cotta-3.jpg', w: 738, h: 414, alt: 'Reunião em sala da escola, com participantes sentados em roda.' }
  ]
};
