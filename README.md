# Gomes Móveis Personalizados — Landing Page

Landing page desenvolvida como **projeto dev solidário** para a Gomes Móveis Personalizados, marcenaria familiar que cria móveis planejados e peças sob medida.

## Seções

- **Início:** apresentação com chamada para os projetos
- **Projetos:** carrossel de fotos com ampliação (lightbox), arraste no celular e navegação por teclado
- **Sobre Nós**
- **Diferenciais**
- **Contato:** WhatsApp, Instagram, telefone e mapa

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, mobile-first)
- JavaScript puro (sem frameworks)
- Google Fonts (Poppins) e Font Awesome

## Estrutura

```
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── img/
    ├── hero.jpg            # fundo da tela inicial
    ├── og-image.jpg        # prévia ao compartilhar o link (1200x630)
    ├── favicon-*.png
    └── ...                 # fotos dos projetos
```

## Como rodar

Abra o `index.html` no navegador. Não é preciso instalar nada.

## Adicionar um projeto ao carrossel

1. Coloque a foto em `img/`, com nome em minúsculas e sem espaços, e no máximo 1600 px no lado maior.
2. No `index.html`, copie uma das linhas `<img ... class="carousel-slide">` e troque o `src` e o `alt`.

Os pontinhos de navegação são criados automaticamente.

## Publicação

Pensado para o GitHub Pages: Settings → Pages → Branch `master` / pasta raiz.
Depois de publicar, confira se as URLs de `og:url` e `og:image` no `index.html` apontam para o endereço final.
