// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // ===================================================================
    // --- CÓDIGO GERAL PARA TODO O SITE ---
    // ===================================================================

    // --- LÓGICA PARA O MENU MOBILE (HAMBÚRGUER) ---
    const btnMobile = document.getElementById('btn-mobile');
    if (btnMobile) {
        function toggleMenu(event) {
            if (event.type === 'touchstart') event.preventDefault();
            const cabecalho = document.getElementById('cabecalho-principal');
            cabecalho.classList.toggle('active');
            const menuAtivo = cabecalho.classList.contains('active');
            event.currentTarget.setAttribute('aria-expanded', menuAtivo);
            event.currentTarget.setAttribute('aria-label', menuAtivo ? 'Fechar Menu' : 'Abrir Menu');
        }
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu);
    }
    
    // --- LÓGICA DO BOTÃO "VOLTAR" (Ex: página de contato) ---
    const btnVoltar = document.getElementById('btn-voltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            history.back();
        });
    }

    // --- LÓGICA DO BOTÃO "VOLTAR AO TOPO" ---
    const btnVoltarTopo = document.getElementById("btnVoltarTopo");
    if (btnVoltarTopo) {
        window.onscroll = function() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                btnVoltarTopo.style.display = "block";
            } else {
                btnVoltarTopo.style.display = "none";
            }
        };
        btnVoltarTopo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===================================================================
    // --- CÓDIGO ESPECÍFICO DA PÁGINA INDEX.HTML ---
    // ===================================================================
    if (document.getElementById('btnInfoPaoFrances')) {

        const modalProduto = document.getElementById('modalProduto');
        const modalGaleria = document.getElementById('modalGaleria');
        
        const btnAbrirModalProduto = document.getElementById('btnInfoPaoFrances');
        const btnFecharModalProduto = document.getElementById('fecharModalProduto');
        const btnFecharModalGaleria = document.getElementById('fecharModalGaleria');

        const imagemModal = document.getElementById('imagemModal');
        const imagensGaleria = document.querySelectorAll('.galeria-item img');
        
        const abrirModal = (modal) => modal.style.display = 'flex';
        const fecharModal = (modal) => modal.style.display = 'none';

        btnAbrirModalProduto.addEventListener('click', () => abrirModal(modalProduto));
        btnFecharModalProduto.addEventListener('click', () => fecharModal(modalProduto));

        imagensGaleria.forEach(img => {
            img.addEventListener('click', () => {
                imagemModal.src = img.src;
                imagemModal.alt = img.alt;
                abrirModal(modalGaleria);
            });
        });
        btnFecharModalGaleria.addEventListener('click', () => fecharModal(modalGaleria));
        
        window.addEventListener('click', (event) => {
            if (event.target === modalProduto) fecharModal(modalProduto);
            if (event.target === modalGaleria) fecharModal(modalGaleria);
        });
    }


    // ===================================================================
    // --- CÓDIGO ESPECÍFICO E AVANÇADO DA PÁGINA DE PEDIDOS ---
    // ===================================================================
    if (document.getElementById('pagina-pedidos')) {
        
        // --- 1. SELEÇÃO DE ELEMENTOS DO DOM ---
        const listaProdutosEl = document.getElementById('lista-produtos');
        const carrinhoItensEl = document.getElementById('carrinho-itens');
        const subtotalEl = document.getElementById('subtotal-carrinho');
        const descontoEl = document.getElementById('desconto-carrinho');
        const percentualDescontoEl = document.getElementById('percentual-desconto');
        const impostosEl = document.getElementById('impostos-carrinho');
        const entregaEl = document.getElementById('entrega-carrinho');
        const totalGeralEl = document.getElementById('total-geral-carrinho');
        const msgConfirmacaoEl = document.getElementById('mensagem-confirmacao');
        const limparCarrinhoBtn = document.getElementById('limpar-carrinho-btn');
        const buscaInput = document.getElementById('busca-produto-input');
        
        const formCheckout = document.getElementById('form-checkout');
        const nomeClienteInput = document.getElementById('nome-cliente-input');
        const welcomeMessageEl = document.getElementById('welcome-message');
        const emailClienteInput = document.getElementById('email-cliente-input');
        const senhaInput = document.getElementById('senha-input');
        const barraForcaSenha = document.getElementById('barra-forca-senha');
        const feedbackForcaSenha = document.getElementById('feedback-forca-senha');
        const observacoesInput = document.getElementById('observacoes-input');
        const contadorCaracteresEl = document.getElementById('contador-caracteres');
        const distanciaInput = document.getElementById('distancia-input');

        const modalDetalhe = document.getElementById('modalProdutoDetalhe');
        const fecharModalDetalheBtn = document.getElementById('fecharModalProdutoDetalhe');
        const imagemModalDetalheEl = document.getElementById('imagemModalDetalhe');
        const detalhesModalProdutoEl = document.getElementById('detalhesModalProduto');

        // NOVOS ELEMENTOS
        const pontosFidelidadeSpan = document.getElementById('pontos-fidelidade');
        const valorConvertidoDolarSpan = document.getElementById('valor-convertido-dolar');
        const valorConvertidoEuroSpan = document.getElementById('valor-convertido-euro');
        const valorPagoInput = document.getElementById('valor-pago-input');
        const calcularTrocoBtn = document.getElementById('calcular-troco-btn');
        const resultadoTrocoEl = document.getElementById('resultado-troco');


        // --- 2. DADOS E ESTADO DA APLICAÇÃO ---
        let carrinho = [];
        let totalGeralNumerico = 0; // Variável para guardar o valor total
        const produtos = [
            { id: 1, nome: "Pão Francês", preco: 0.80, img: "images/produtos/pao-frances.jpg", imgHover: "images/produtos/pao_frances_hover.jpg", desc: "Clássico pão francês, casca crocante e miolo macio.", ing: "Farinha de trigo, água, sal e fermento." },
            { id: 2, nome: "Bolo de Chocolate", preco: 8.50, img: "images/produtos/bolo_chocolate.jpg", imgHover: "images/produtos/bolo_chocolate_hover.jpg", desc: "Bolo fofinho com cobertura cremosa de brigadeiro.", ing: "Chocolate, farinha, ovos, açúcar, manteiga." },
            { id: 3, nome: "Coxinha de Frango", preco: 7.00, img: "images/produtos/coxinhadefrango.jpg", imgHover: "images/produtos/coxinhadefrango_hover.jpg", desc: "Salgado clássico com recheio de frango desfiado e catupiry.", ing: "Massa de batata, frango, catupiry, temperos." },
            { id: 4, nome: "Café Expresso", preco: 5.00, img: "images/produtos/cafe.jpg", imgHover: "images/ambiente/cafe_hover.jpg", desc: "Café tirado na hora, aromático e encorpado.", ing: "Grãos de café selecionados." },
            { id: 5, nome: "Sonho de Creme", preco: 6.50, img: "images/produtos/sonhodecreme.jpg", imgHover: "images/produtos/sonhodecreme_hover.jpg", desc: "Massa fofinha e açucarada com recheio de creme de baunilha.", ing: "Farinha, ovos, creme de baunilha, açúcar." },
            { id: 6, nome: "Torta de Frango com Catupiry", preco: 20.00, img: "images/produtos/tortadefrango.jpg", imgHover: "images/produtos/torta_frango_hover.jpg", desc: "Fatia generosa de torta cremosa com recheio de frango e catupiry.", ing: "Massa podre, frango, catupiry, milho, azeitona." },
            { id: 7, nome: "Esfirra Aberta de Carne", preco: 8.00, img: "images/produtos/esfirra.jpg", imgHover: "images/produtos/esfirra_hover.jpg", desc: "Esfirra assada com recheio de carne moída e temperos árabes.", ing: "Massa de pão, carne moída, tomate, cebola, especiarias." },
            { id: 8, nome: "Rosca de Côco", preco: 18.00, img: "images/produtos/rosca_coco.jpg", imgHover: "images/produtos/rosca_coco_hover.jpg", desc: "Rosca doce e macia com cobertura de leite condensado e côco ralado.", ing: "Farinha, leite, ovos, côco, leite condensado." },
            { id: 9, nome: "Torta Holandesa", preco: 18.00, img: "images/produtos/torta_holandesa.jpg", imgHover: "images/produtos/torta_holandesa_hover.jpg", desc: "Clássica torta com base de biscoito, creme holandês e cobertura de chocolate.", ing: "Biscoito, manteiga, creme de leite, chocolate." },
            { id: 10, nome: "Bolo de Aniversário (kg)", preco: 60.00, img: "images/produtos/bolo3.jpg", imgHover: "images/produtos/bolo3_hover.jpg", desc: "Bolo por quilo para festas. Sabor e recheio a combinar.", ing: "A combinar." }
        ];

        // --- 3. FUNÇÕES PRINCIPAIS ---

        // NOVAS FUNÇÕES AUXILIARES
        /**
         * Converte um valor em Reais para outra moeda.
         * As taxas são fixas e apenas para demonstração.
         */
        function converterMoeda(valorEmReais, moeda) {
            const taxas = {
                dolar: 5.25, // 1 USD = 5.25 BRL
                euro: 5.70   // 1 EUR = 5.70 BRL
            };
            if (!taxas[moeda]) return 0;
            return valorEmReais / taxas[moeda];
        }

        /**
         * Calcula pontos de fidelidade (Ex: 1 ponto a cada R$10).
         */
        function calcularPontosFidelidade(valorTotal) {
            return Math.floor(valorTotal / 10);
        }

        function renderizarProdutos(produtosParaRenderizar = produtos) {
            if (!listaProdutosEl) return;
            listaProdutosEl.innerHTML = '';
            if(produtosParaRenderizar.length === 0){
                listaProdutosEl.innerHTML = '<p class="text-center">Nenhum produto encontrado com este nome.</p>';
                return;
            }
            produtosParaRenderizar.forEach((produto) => {
                const card = document.createElement('div');
                card.className = 'produto-card-interativo';
                card.setAttribute('tabindex', '0');
                card.dataset.id = produto.id;
                card.innerHTML = `
                    <img src="${produto.img}" data-alt-src="${produto.imgHover}" alt="${produto.nome}" class="produto-imagem img-fluid rounded mb-3">
                    <h4>${produto.nome}</h4>
                    <h5>R$ ${produto.preco.toFixed(2)}</h5>
                    <button class="btn btn-sm btn-info w-100 mb-2 btn-detalhes">Ver Detalhes</button>
                    <div class="produto-detalhes">
                        <p><strong>Descrição:</strong> ${produto.desc}</p>
                        <p><strong>Ingredientes:</strong> <small>${produto.ing}</small></p>
                    </div>
                    <div class="contador-quantidade">
                        <button class="contador-btn" data-action="decrease" aria-label="Diminuir quantidade">-</button>
                        <input type="number" value="1" min="1" class="quant-input form-control text-center" aria-label="Quantidade">
                        <button class="contador-btn" data-action="increase" aria-label="Aumentar quantidade">+</button>
                    </div>
                    <button class="btn btn-warning w-100 btn-adicionar">Adicionar ao Carrinho 🛒</button>
                `;
                listaProdutosEl.appendChild(card);
            });
            adicionarListenersAosCards();
        }
        function adicionarAoCarrinho(produtoId, quantidade) {
            const produto = produtos.find(p => p.id === produtoId);
            const itemExistente = carrinho.find(item => item.id === produtoId);
            if (itemExistente) {
                itemExistente.quantidade += quantidade;
            } else {
                carrinho.push({ ...produto, quantidade });
            }
            exibirMensagemConfirmacao(`${quantidade}x ${produto.nome} adicionado(s)!`);
            calcularTotais();
        }
        function exibirMensagemConfirmacao(mensagem) {
            if (!msgConfirmacaoEl) return;
            msgConfirmacaoEl.textContent = mensagem;
            msgConfirmacaoEl.style.display = 'block';
            setTimeout(() => {
                msgConfirmacaoEl.style.display = 'none';
            }, 2500);
        }
        function limparCarrinho() {
            if (confirm("Você tem certeza que deseja limpar o carrinho e reiniciar o pedido?")) {
                carrinho = [];
                calcularTotais();
                exibirMensagemConfirmacao("Carrinho limpo!");
            }
        }
        function calcularTotais() {
            if (!carrinhoItensEl) return;
            let subtotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
            let percentualDesconto = subtotal > 100 ? 10 : subtotal > 50 ? 5 : 0;
            let valorDesconto = (subtotal * percentualDesconto) / 100;
            let subtotalComDesconto = subtotal - valorDesconto;
            let valorImpostos = subtotalComDesconto * 0.08;
            let distancia = parseFloat(distanciaInput.value) || 0;
            let taxaEntrega = subtotal >= 80 ? 0 : distancia * 1.25;
            
            totalGeralNumerico = subtotalComDesconto + valorImpostos + taxaEntrega; // Atualiza a variável global
            
            subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
            percentualDescontoEl.textContent = percentualDesconto;
            descontoEl.textContent = `- R$ ${valorDesconto.toFixed(2)}`;
            impostosEl.textContent = `+ R$ ${valorImpostos.toFixed(2)}`;
            entregaEl.textContent = `+ R$ ${taxaEntrega.toFixed(2)}`;
            totalGeralEl.textContent = `R$ ${totalGeralNumerico.toFixed(2)}`;
            
            // ATUALIZA OS NOVOS CAMPOS
            pontosFidelidadeSpan.textContent = calcularPontosFidelidade(totalGeralNumerico);
            valorConvertidoDolarSpan.textContent = `US$ ${converterMoeda(totalGeralNumerico, 'dolar').toFixed(2)}`;
            valorConvertidoEuroSpan.textContent = `€ ${converterMoeda(totalGeralNumerico, 'euro').toFixed(2)}`;

            atualizarDisplayItensCarrinho();
        }
        function atualizarDisplayItensCarrinho() {
            if (carrinho.length === 0) {
                carrinhoItensEl.innerHTML = '<li class="list-group-item">Aguardando itens...</li>';
                return;
            }
            carrinhoItensEl.innerHTML = '';
            carrinho.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div>${item.nome} <span class="badge bg-secondary">x${item.quantidade}</span></div>
                    <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                `;
                carrinhoItensEl.appendChild(li);
            });
        }

        // --- 4. FUNÇÕES DE VALIDAÇÃO E EVENTOS DE FORMULÁRIO ---
        function validarFormulario() {
            const nomeValido = validarCampo(nomeClienteInput, nomeClienteInput.value.trim().length >= 3);
            const emailValido = validarCampo(emailClienteInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClienteInput.value));
            const senhaValida = validarCampo(senhaInput, verificarForcaSenha(senhaInput.value) > 0);
            return nomeValido && emailValido && senhaValida;
        }
        function validarCampo(input, condicao) {
            const errorMsg = input.nextElementSibling;
            if (condicao) {
                input.classList.remove('invalido');
                input.classList.add('valido');
                if (errorMsg && errorMsg.tagName === 'SMALL') errorMsg.style.display = 'none';
                return true;
            } else {
                input.classList.remove('valido');
                input.classList.add('invalido');
                if (errorMsg && errorMsg.tagName === 'SMALL') errorMsg.style.display = 'block';
                return false;
            }
        }
        function verificarForcaSenha(senha) {
            let forca = 0;
            if (senha.length > 7) forca++;
            if (senha.match(/[a-z]/) && senha.match(/[A-Z]/)) forca++;
            if (senha.match(/\d/)) forca++;
            if (senha.match(/[^a-zA-Z0-9]/)) forca++;
            barraForcaSenha.style.width = (forca * 25) + '%';
            if (forca <= 1) {
                barraForcaSenha.style.backgroundColor = '#dc3545';
                feedbackForcaSenha.textContent = 'Senha fraca';
                feedbackForcaSenha.style.color = '#dc3545';
            } else if (forca <= 3) {
                barraForcaSenha.style.backgroundColor = '#ffc107';
                feedbackForcaSenha.textContent = 'Senha média';
                feedbackForcaSenha.style.color = '#ffc107';
            } else {
                barraForcaSenha.style.backgroundColor = '#198754';
                feedbackForcaSenha.textContent = 'Senha forte';
                feedbackForcaSenha.style.color = '#198754';
            }
            return forca;
        }
        function atualizarContadorCaracteres() {
            if (!contadorCaracteresEl) return;
            const max = 250;
            const restantes = max - observacoesInput.value.length;
            contadorCaracteresEl.textContent = `${restantes} caracteres restantes`;
        }

        // --- 5. ADIÇÃO DE EVENT LISTENERS ---
        function abrirModalDetalhe(produto) {
            imagemModalDetalheEl.src = produto.img;
            imagemModalDetalheEl.alt = produto.nome;
            detalhesModalProdutoEl.innerHTML = `
                <h4>${produto.nome}</h4>
                <p>${produto.desc}</p>
                <p><strong>Ingredientes:</strong> <small>${produto.ing}</small></p>
            `;
            modalDetalhe.style.display = 'flex';
        }
        function fecharModalDetalhe() {
            modalDetalhe.style.display = 'none';
        }
        function adicionarListenersAosCards() {
            const cards = document.querySelectorAll('.produto-card-interativo');
            cards.forEach(card => {
                const img = card.querySelector('.produto-imagem');
                const originalSrc = img.src;
                const hoverSrc = img.dataset.altSrc;
                if(img) {
                    img.addEventListener('mouseover', () => { if (hoverSrc) img.src = hoverSrc; });
                    img.addEventListener('mouseout', () => { img.src = originalSrc; });
                }
                card.addEventListener('click', (e) => {
                    const target = e.target;
                    
                    if (target.classList.contains('produto-imagem')) {
                        const produtoId = parseInt(card.dataset.id);
                        const produto = produtos.find(p => p.id === produtoId);
                        abrirModalDetalhe(produto);
                        return;
                    }

                    const quantInput = card.querySelector('.quant-input');
                    let quantidade = parseInt(quantInput.value);

                    if (target.classList.contains('btn-detalhes')) {
                        const detalhes = card.querySelector('.produto-detalhes');
                        const isVisible = detalhes.style.display === 'block';
                        detalhes.style.display = isVisible ? 'none' : 'block';
                        target.textContent = isVisible ? 'Ocultar Detalhes' : 'Ver Detalhes';
                    }
                    if(target.dataset.action === 'increase') quantInput.value = ++quantidade;
                    if(target.dataset.action === 'decrease' && quantidade > 1) quantInput.value = --quantidade;
                    if(target.classList.contains('btn-adicionar')){
                        adicionarAoCarrinho(parseInt(card.dataset.id), quantidade);
                    }
                });
                card.addEventListener('keydown', (e) => {
                    if(e.ctrlKey && e.key === 'Enter'){
                        e.preventDefault();
                        const quantidade = parseInt(card.querySelector('.quant-input').value);
                        adicionarAoCarrinho(parseInt(card.dataset.id), quantidade);
                    }
                });
            });
        }
        
        if (limparCarrinhoBtn) limparCarrinhoBtn.addEventListener('click', limparCarrinho);
        if (distanciaInput) distanciaInput.addEventListener('input', calcularTotais);
        if (buscaInput) buscaInput.addEventListener('input', () => {
            const termoBusca = buscaInput.value.toLowerCase();
            const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(termoBusca));
            renderizarProdutos(produtosFiltrados);
        });
        
        if (nomeClienteInput) {
            nomeClienteInput.addEventListener('input', () => {
                const nomeValido = validarCampo(nomeClienteInput, nomeClienteInput.value.trim().length >= 3);
                if (nomeValido) {
                    const primeiroNome = nomeClienteInput.value.split(' ')[0];
                    welcomeMessageEl.textContent = `${primeiroNome}, seja bem-vindo(a)!`;
                    welcomeMessageEl.style.display = 'block';
                } else {
                    welcomeMessageEl.style.display = 'none';
                }
            });
        }
        
        if (emailClienteInput) emailClienteInput.addEventListener('input', () => validarCampo(emailClienteInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailClienteInput.value)));
        if (senhaInput) senhaInput.addEventListener('input', () => verificarForcaSenha(senhaInput.value));
        if (observacoesInput) observacoesInput.addEventListener('input', atualizarContadorCaracteres);
        
        // NOVO EVENT LISTENER PARA O BOTÃO DE CALCULAR TROCO
        if(calcularTrocoBtn) {
            calcularTrocoBtn.addEventListener('click', () => {
                const valorPago = parseFloat(valorPagoInput.value);

                resultadoTrocoEl.style.display = 'block'; // Mostra o campo de resultado
                resultadoTrocoEl.classList.remove('troco-ok', 'troco-falta');

                if (isNaN(valorPago) || valorPago <= 0) {
                    resultadoTrocoEl.textContent = 'Por favor, insira um valor válido.';
                    return;
                }

                if (valorPago >= totalGeralNumerico) {
                    const troco = valorPago - totalGeralNumerico;
                    resultadoTrocoEl.textContent = `Troco: R$ ${troco.toFixed(2)}`;
                    resultadoTrocoEl.classList.add('troco-ok');
                } else {
                    const falta = totalGeralNumerico - valorPago;
                    resultadoTrocoEl.textContent = `Valor insuficiente. Faltam R$ ${falta.toFixed(2)}`;
                    resultadoTrocoEl.classList.add('troco-falta');
                }
            });
        }

        if (formCheckout) formCheckout.addEventListener('submit', (e) => {
            e.preventDefault();
            if(validarFormulario()){
                if(carrinho.length > 0){
                    alert(`Pedido realizado com sucesso para ${nomeClienteInput.value}!\nTotal: ${totalGeralEl.textContent}\nEm breve você receberá uma confirmação no email ${emailClienteInput.value}.`);
                    location.reload();
                } else {
                    alert("Seu carrinho está vazio! Adicione produtos antes de finalizar o pedido.");
                }
            } else {
                alert("Por favor, corrija os erros no formulário antes de continuar.");
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const focado = document.activeElement;
                if (focado && focado.classList.contains('produto-card-interativo')) {
                    const proximo = e.key === 'ArrowDown' ? focado.nextElementSibling : focado.previousElementSibling;
                    if (proximo && proximo.classList.contains('produto-card-interativo')) {
                        proximo.focus();
                    }
                }
            }
        });

        if(fecharModalDetalheBtn) fecharModalDetalheBtn.addEventListener('click', fecharModalDetalhe);
        if(modalDetalhe) modalDetalhe.addEventListener('click', (event) => {
            if (event.target === modalDetalhe) {
                fecharModalDetalhe();
            }
        });
        
        // --- 6. INICIALIZAÇÃO ---
        renderizarProdutos();
        calcularTotais();
        atualizarContadorCaracteres();
    }
});
