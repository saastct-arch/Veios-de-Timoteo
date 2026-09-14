# Veios de Timóteo — Circuito de Patrimônio

Site do circuito de patrimônio material e imaterial de Timóteo (MG).
Trabalho da disciplina **Estúdio Patrimônio e Planejamento Regional** — Ap2. Entrega: **19/10/2026**.

## Como rodar

Site estático, sem build. Qualquer servidor HTTP serve:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir o `index.html` direto pelo `file://` não funciona — o navegador bloqueia o carregamento de `data/pontos.js`.

## Estrutura

```
index.html                  página única
data/pontos.js              os 26 bens georreferenciados
assets/css/styles.css       tokens do design system "Veios de Timóteo"
assets/js/app.js            mapa, rota, filtros e painel de detalhe
assets/img/                 19 fotografias do acervo do grupo
assets/vendor/leaflet/      Leaflet 1.9.4 (local, sem CDN)
```

## Como adicionar ou editar um bem

Tudo vive em `data/pontos.js`. Cada ponto:

```js
{
 "n": 12,                                  // número da parada na rota
 "id": "igreja-sao-jose",                  // usado como âncora
 "nome": "Igreja São José",
 "cat": "potencial",                       // imaterial | potencial | reconhecido
 "lat": -19.549258, "lng": -42.6447167,
 "foto": "Igreja São José.jpg",            // nome do arquivo em assets/img/ — ou null
 "endereco": "",
 "resumo": "Um dos espaços de fé...",      // 2-3 linhas, linguagem de visitante
 "porque": ["...", "..."],                 // por que é patrimônio
 "tags": ["histórico", "religioso"],
 "pendente": false                         // true = sem texto de valor levantado
}
```

A ordem da rota é o campo `n`, hoje de norte a sul. Para reordenar, altere `n` — o mapa, a linha
da rota e a grade seguem esse número.

### Marcações de pendência

O site mostra o que falta, em vez de esconder:

- **sem `foto`** → o cartão exibe o aviso `FALTA FOTOGRAFIA` com o número e o nome da parada;
- **`pendente: true`** → a ficha exibe `TEXTO PENDENTE`.

## Estado do conteúdo

| | |
|---|---|
| Bens no mapa | 26 |
| Com fotografia | 18 |
| **Sem fotografia** | **8** |
| Com texto de valor | 11 |
| **Sem texto de valor** | **15** |
| Não pinados no My Maps | 13 |


### Falta fotografar

1º Cartório de Notas de Timóteo · Escola Municipal Virgínia de Souza Reis ·
Escritório Central da Aperam · Praça do Coliseu · Igreja do Ana Moura ·
Sede da Prefeitura de Timóteo · Centro de Vivência Trajano Quirino Bicalho ·
Chafariz e Olho d'Água — Biquinha

Horizontal, mínimo 1600px, luz da manhã ou fim de tarde, fachada inteira de frente.
Anotar o crédito de cada foto. Rostos identificáveis exigem autorização de uso de imagem.

### Falta pesquisa documental

Os 15 bens marcados `pendente: true`. Textos de valor não foram escritos porque não há fonte
documental — em inventário de patrimônio, informação não verificada compromete o registro.
Os 11 textos existentes derivam integralmente do levantamento do Ap2.

### Bens ainda não pinados no My Maps

Não aparecem no site — entram assim que ganharem coordenada no My Maps:

Fundação Acesita (antiga Casa de Hóspedes) · Colégio Macedo Soares ·
Antigo Clube dos Operários (Associação dos Aposentados) · Bica das Bromélias ·
Sede da Fazenda Boa Vista · Biquinha · Conjunto Residencial do Bairro Alphaville ·
Conjunto Residencial do Bairro Recanto Verde · Fazenda dos Maia ·
Escola Municipal Infantil Ana Moura · Escola Estadual João Cotta de Figueiredo Barcelos ·
Antiga tubulação de água do Morro Bela Vista · Praça 29 de Abril

Dois registros do KML foram descartados por não trazerem informação alguma: uma entrada
chamada apenas "Residência" e uma duplicata do Centro de Vivência.

### Dados do IBGE

Preenchidos na seção "Timóteo em números", com o ano de referência ao lado de cada
indicador. Fonte: IBGE Cidades@ — Panorama de Timóteo (MG). Código do município: **3168705**.

## Design system

Tokens extraídos do bundle **Veios de Timóteo — Rota Patrimonial**:

- **Marcellus** (títulos) · **Archivo** (texto) · **IBM Plex Mono** (rótulos)
- Verdes `#122018 → #3E5E49`, fundo `#1B2B22`
- Cobre `#5E3A23 → #F2DFCE`, acento `#D29C71`

Cores das categorias no mapa: imaterial `#BD7F4F` · potencial `#7FA98C` · reconhecido `#E3C2A4`.

## Publicação

Site estático — publica direto na Vercel sem configuração.

## Créditos

Mapa © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright).
Fotografias do acervo do grupo.
