==================================================
PROJETO: Website da Padaria do Bairro 
Link GitHub Pages: https://m4rc0z4n1.github.io/Projeto_Padaria_do_Bairro/
==================================================
README.txt (Revisado em 03 de Agosto de 2025)


1. VISÃO GERAL DO PROJETO
Este projeto consiste na criação de um website institucional e interativo para a "Padaria do Bairro". 
O site foi desenvolvido com a abordagem Mobile-First, garantindo uma experiência de usuário otimizada em dispositivos móveis, que se aprimora progressivamente em telas maiores. 
Além das seções institucionais e formulários, o projeto inclui uma página de pedidos online (`pedidosonline.html`) com um carrinho de compras e ferramentas de cálculo em tempo real. 
Para componentes como o carrossel de imagens, o projeto utiliza o framework Bootstrap 5. 


2. ESTRUTURA DE ARQUIVOS E PASTAS
* /index.html: A página principal (homepage) e ponto de entrada do site.
* /pedidosonline.html: Página interativa para clientes montarem seus pedidos, com visualização de produtos, carrinho de compras e formulário de checkout.
* /pedidos.html: Formulário simples para encomendas de produtos especiais (geralmente via `iframe`).
* /contato.html: Formulário para contato geral. 
* /cadastro.html: Formulário para cadastro de clientes e assinatura de newsletter. 
* /feedback.html: Formulário para coleta de feedback dos clientes.
* /css/: Pasta contendo as folhas de estilo. 
    * style.css: Folha de estilos principal do projeto.
    * reset.css: Normaliza os estilos padrão dos navegadores para garantir consistência visual. 
* /js/: Pasta contendo os scripts.
    * scripts.js: Arquivo único com todas as lógicas de interatividade do site. 
* /images/: Pasta para armazenar todas as imagens utilizadas no site.
* /videos/: Pasta para armazenar arquivos de vídeo, como o da `index.html`. 
* /README.txt: Este documento de explicação.


3. ESTRUTURA HTML E SEMÂNTICA
As páginas utilizam as tags semânticas do HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) para uma estrutura clara e acessível. 
* A página `pedidosonline.html` foi estruturada com um layout de duas colunas em telas maiores, contendo o formulário de dados do cliente, a área de seleção de produtos e o carrinho de compras flutuante (`sticky`).
* A tabela de cardápio na `index.html` usa atributos `data-label` nas células (`<td>`) para criar um layout responsivo e legível em telas de celular. 
* Os formulários utilizam tipos de `input` apropriados (ex: `type="email"`, `type="number"`) e atributos de validação (`required`, `minlength`) para melhorar a experiência do usuário e a integridade dos dados.


4. ESTRATÉGIA DE RESPONSIVIDADE E DESIGN
A principal diretriz do projeto foi a metodologia Mobile-First. Os estilos base são definidos para a menor tela, e `@media queries` são usadas para aprimorar o layout em telas maiores, com o principal breakpoint para desktop definido a partir de `1024px`.  O layout da página de pedidos se adapta de uma única coluna em celulares para duas colunas em desktops, com o carrinho se tornando flutuante para fácil acesso.


5. INTERATIVIDADE COM JAVASCRIPT
O arquivo `scripts.js` gerencia toda a interatividade do site de forma organizada, utilizando "blocos de proteção" (`if (document.getElementById(...))`) para garantir que cada script seja executado apenas na página correta, prevenindo erros. 

---
**Funcionalidades Implementadas (Página de Pedidos Online):**

* **Renderização Dinâmica de Produtos:** Os produtos são carregados a partir de um array de objetos no JavaScript e renderizados dinamicamente na tela como cards interativos.
* **Carrinho de Compras Interativo:**
    * **Cálculos em Tempo Real:** Subtotal, descontos progressivos, impostos (8%), taxa de entrega baseada em distância e o total geral são recalculados a cada interação. 
    * **Funções Adicionais:** O carrinho também exibe o total de pontos de fidelidade ganhos (1 ponto a cada R$10) e a conversão do valor total para Dólar (USD) e Euro (EUR) com taxas de câmbio fixas.
    * **Calculadora de Troco:** Uma ferramenta auxiliar permite que o usuário insira o valor a ser pago e veja o troco correspondente.
* **Validação de Formulário:**
    * **Feedback em Tempo Real:** Os campos do formulário de checkout são validados enquanto o usuário digita.
    * **Mensagem de Boas-Vindas:** Uma saudação ("Nome, seja bem-vindo(a)!") aparece dinamicamente abaixo do campo de nome.
    * **Medidor de Força de Senha:** Uma barra visual indica a força da senha digitada pelo usuário.
* **Experiência do Usuário (UX):**
    * **Modal de Detalhes:** Ao clicar na imagem de um produto, um modal estilo "moldura" exibe a foto ampliada e os detalhes do item.
    * **Busca de Produtos:** Um campo de busca permite filtrar a lista de produtos em tempo real.
    * **Atalhos de Teclado:** É possível navegar entre os produtos com as setas do teclado e adicionar ao carrinho com `Ctrl + Enter`.

---
**Funcionalidades Gerais do Site**
* **Menu Hamburger:** Totalmente funcional em dispositivos móveis, criado com CSS e JavaScript.
***Modais:** O site possui um modal para informações de produto e um modal estilo lightbox para a galeria de imagens na página inicial. 
***Botão "Voltar ao Topo":** Aparece durante a rolagem da página para facilitar a navegação. 
