# Bloom Balloons: estado do projeto (19 nov 2026)

Site de teste publicado: https://emberpierettiai.github.io/bloom-balloons/
Site oficial (pausado no Netlify da dona): https://shopbloomballoons.com

## Como reconstruir
Os arquivos na raiz do repositório são gerados. As fontes ficam nesta pasta `source/`.

    python3 source/build.py source/handoff /tmp/bloom-site /tmp/bloom-out
    python3 source/pages_copy.py /tmp/bloom-site .

- `build.py` monta todas as páginas a partir de `src/` e de `handoff/reference/` (script e CSS originais do site).
- `src/data.json`: categorias, produtos, preços, ocasiões e temas de hélio. É aqui que se adiciona produto.
- `src/shop.js`: loja (categorias, produto, carrinho, pedido por texto). `src/*.css`: estilos.
- `src/img-extra/`: imagens novas. As fotos originais já estão em `assets/img/` na raiz.
- A primeira execução precisa de `assets/img` dentro da pasta de saída: copie `assets/img` da raiz para `/tmp/bloom-site/assets/img` antes de rodar.
- `pages_copy.py` copia o resultado para a raiz e marca as páginas com `noindex`. Na versão oficial o `noindex` não deve existir.

## O que já está feito
- Estrutura de loja inspirada em ready4yourparty.com: início, categorias, produto, carrinho, busca, filtros.
- Início: 7 cards de categoria (ícones natalinos), bloco "Beautiful Balloons", Shop by Occasion em carrossel automático, fileiras de produtos.
- Arches & Garlands no início: Garland to Go (retirada, $20/ft) x Garland + Installation ($25/ft).
- Categorias: garlands, columns, sculptures, bouquets, helium, centerpieces (vazia), numbers (oculta, só em ocasiões).
- Ocasiões: Birthdays, Corporate Events, Holidays & Seasonal, Numbers (from $55).
- Hélio: página de temas (13 temas), balão avulso $3.50 cada, páginas por tema.
- Carrinho termina em "Send Order by Text". Square: só o encaixe (`PAY.endpoint` em shop.js), desligado.

## Pendências
- Confirmar preços: buquês de flores, arranjos de hélio novos (circo, Make a wish, Feel better) estão "Ask for a quote".
- Inventário de hélio por tema (nome, tamanho, cores, preço, foto); fotos de capa para os temas ainda com desenho.
- Balão avulso: foto mostra 12 balões e o preço é por unidade; decidir aviso ou produto "buquê de 12".
- Taxa de instalação separada de $25 existe? Hoje só "From $25/ft, travel fee not included".
- Pagamento online com Square: precisa de preços fechados, regra de entrega, chave do Square e um servidor para a cobrança.
- Publicação oficial: tirar `noindex`, manter `googleb4bad141569fb441.html`, fazer um único deploy no Netlify da dona.
- Centerpieces sem produtos. Campo "Which number?" nos produtos de número.
