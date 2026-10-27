# Sublime Ambientes Planejados

Landing page institucional da Sublime Ambientes Planejados (móveis planejados sob medida).
Projeto externo da **Integre Jr**.

HTML, CSS e JavaScript puros — sem build, sem dependências. Basta abrir o `index.html`.

## Créditos

O site foi feito em blocos, cada um por um integrante do time:

| Bloco | Seção | Autor | Branch original |
|---|---|---|---|
| 1 | Navbar + Hero com carrossel | pedro-floress | `Bloco-1` |
| 2 | Quem Somos | tomazhardt | `Bloco-2` |
| 3 | Coleções | LucasSampaio2005 | `Bloco-3` |
| 4 | Depoimentos | LucasSampaio2005 | `Bloco-3` (pasta `blocos 4 e 5/`) |
| 5 | Contato + Rodapé | LucasSampaio2005 | `Bloco-3` (pasta `blocos 4 e 5/`) |

## Estrutura

```
site/
├── index.html          Página única, com as 5 seções na ordem
├── css/
│   ├── base.css        Reset, tokens da marca e tipografia
│   ├── header-hero.css Bloco 1
│   ├── sobre.css       Bloco 2
│   ├── colecoes.css    Bloco 3
│   └── contato.css     Blocos 4 e 5
├── js/script.js        Carrossel, menu mobile, máscara e validação
└── assets/imagens/     Imagens tratadas e renomeadas
```

## Regras do CSS

Para os blocos conviverem sem se atropelar:

1. **Só o `base.css` tem reset global e regras em elementos soltos** (`body`, `a`, `img`, `h1..h4`).
   Os demais arquivos estilizam apenas classes dentro da sua seção.
2. **Nada de seletor de elemento sem escopo.** No original havia um
   `img { width:100%; height:100% }` global no Bloco 3 que deformava o logo do
   navbar e as imagens do Quem Somos. Hoje é `.card__img-wrap img`.
3. **Cores e fontes só via tokens** (`var(--dourado)`, `var(--fonte-titulo)`...).
   Não escreva hex direto no CSS de seção.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--marrom-escuro` | `#3C1D0C` | Navbar, depoimentos, rodapé |
| `--marrom-medio` | `#5C3D1E` | Gradientes, detalhes |
| `--dourado` | `#BA8B2A` | Botões, destaques, eyebrows |
| `--dourado-claro` | `#E6B86A` | Destaques sobre fundo escuro |
| `--creme` | `#FCF9F5` | Fundo das seções claras |
| `--creme-escuro` | `#F5F0E8` | Fundo da seção de contato |
| `--texto` | `#2C1F0E` | Texto principal |
| `--texto-medio` | `#5A4030` | Texto secundário |

> `#3C1D0C` **não pode mudar**: é a cor exata do fundo embutido no
> `logo-claro.png`. Qualquer outro marrom no navbar faz aparecer um
> retângulo destoante atrás do logo.

Tipografia: **Playfair Display** (títulos e, em itálico, a palavra de destaque),
**Montserrat** (corpo). A Great Vibes foi usada no destaque até out/2026 e saiu para
igualar à versão que o cliente aprovou.

## Conteúdo validado pelo cliente (out/2026)

- O dono trabalha sozinho: nada de "nossa equipe" nos textos.
- Trabalha só com **MDF**: não mencionar madeira maciça, nobre ou natural.
- Hero: **+1000** ambientes e **20** anos de experiência (do dono no ramo); a empresa é de 2018.
- Horário: Seg a Sex 7h–19h, Sábado 7h–13h. Não prometer prazo de resposta.
- Rodapé sem a coluna Atendimento (prazo, garantia, financiamento, FAQ) e sem "Casa e Comércio".

## Pendências

- [ ] URL real do Instagram (hoje aponta para `instagram.com` genérico)
- [ ] Número real de WhatsApp (hoje é o placeholder `5547999999999`, em dois lugares:
      `index.html` e a constante `WHATSAPP` no `js/script.js`)
- [ ] **Destino do formulário de orçamento.** Hoje ele valida os campos e abre o
      WhatsApp com a mensagem montada — não grava nem envia e-mail para ninguém.
      Decidir entre Formspree, EmailJS ou um back-end.
- [x] Confirmar com o cliente os números do hero (feito em out/2026: +1000 e 20 anos)
- [ ] **Depoimentos são fictícios.** O cliente pediu avaliações reais do Google. Falta
      receber o link do perfil e escolher as avaliações; trocar os 3 cards e o `href`
      do botão "Ver mais avaliações no Google" (hoje aponta para google.com/maps genérico)
- [ ] Confirmar que www.sublimeambientes.com.br está no ar (botão ao lado do Instagram)
