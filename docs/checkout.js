
// Carregar dados do carrinho

let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// Seletores
const resumoProdutosEl = document.getElementById("resumo-produtos");
const resumoFreteEl = document.getElementById("resumo-frete");
const resumoTotalEl = document.getElementById("resumo-total");

const revImg = document.getElementById("rev-img");
const revNome = document.getElementById("rev-nome");
const revQtd = document.getElementById("rev-quantidade");
const revPreco = document.getElementById("rev-preco");

// Endereço
const enderecoTexto = document.getElementById("endereco");
const cepTexto = document.getElementById("cep-texto");

// Pegar endereço salvo

const enderecoSalvo = sessionStorage.getItem("enderecoFinal");
const cepSalvo = sessionStorage.getItem("cepFinal");

if (enderecoSalvo) enderecoTexto.textContent = enderecoSalvo;
if (cepSalvo) cepTexto.textContent = "CEP: " + cepSalvo;

// Mostrar item na revisão

function preencherRevisao() {
    if (carrinho.length === 0) return;

    const item = carrinho[0];

    revImg.src = item.imagem;
    revNome.textContent = item.nome;
    revQtd.textContent = `Quantidade: ${item.quantidade}`;
    revPreco.textContent = `Preço: R$ ${(item.preco * item.quantidade).toFixed(2)}`;
}

preencherRevisao();

// Calcular Resumo

let freteSelecionado = 0;

function atualizarResumo() {
    let subtotal = 0;

    carrinho.forEach(p => {
        subtotal += p.preco * p.quantidade;
    });

    resumoProdutosEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    resumoFreteEl.textContent = `R$ ${freteSelecionado.toFixed(2)}`;
    resumoTotalEl.textContent = `R$ ${(subtotal + freteSelecionado).toFixed(2)}`;
}

atualizarResumo();

// Frete

document.querySelectorAll("input[name='frete']").forEach(r => {
    r.addEventListener("change", () => {
        freteSelecionado = Number(r.value);
        atualizarResumo();
    });
});


const botoesTipo = document.querySelectorAll(".tipo-btn");

botoesTipo.forEach(btn => {
    btn.addEventListener("click", () => {
        botoesTipo.forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");

        let tipo = btn.dataset.tipo;

        document.getElementById("form-credito").classList.add("oculto");
        document.getElementById("form-debito").classList.add("oculto");
        document.getElementById("form-pix").classList.add("oculto");

        if (tipo === "credito") document.getElementById("form-credito").classList.remove("oculto");
        if (tipo === "debito") document.getElementById("form-debito").classList.remove("oculto");
        if (tipo === "pix") document.getElementById("form-pix").classList.remove("oculto");
    });
});


// Parcelamento

const parcelasSelect = document.getElementById("parcelas");

parcelasSelect.addEventListener("change", () => {
    let vezes = Number(parcelasSelect.value);

    let subtotal = 0;

    carrinho.forEach(p => {
        subtotal += p.preco * p.quantidade;
    });

    let parcelado = subtotal / vezes;

    // Atualiza o preço na revisão
    revPreco.textContent = `Preço por parcela: R$ ${parcelado.toFixed(2)}`;

    // Atualiza total
    resumoProdutosEl.textContent = `R$ ${parcelado.toFixed(2)} x ${vezes}`;
    resumoTotalEl.textContent = `R$ ${(parcelado * vezes + freteSelecionado).toFixed(2)}`;
});

// PIX – GERAR QRCODE

document.getElementById("gerarPix").addEventListener("click", () => {
    document.querySelector(".qrcode-area").classList.remove("oculto");
    document.querySelector(".pix-aviso").textContent = "Use o QR Code abaixo para pagar:";
});

// FINALIZAR COMPRA

document.getElementById("btn-finalizar").addEventListener("click", () => {
    alert("Compra finalizada com sucesso!");
});

// Buscar CEP diretamente no checkout

document.getElementById("cep-input")?.addEventListener("blur", async () => {

    const cep = document.getElementById("cep-input").value.replace(/\D/g, "");

    if (cep.length !== 8) {
        enderecoTexto.textContent = "CEP inválido.";
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
        const data = await response.json();

        if (data && data.street) {

            const enderecoFormatado =
                `${data.street}, ${data.neighborhood}, ${data.city} - ${data.state}`;

            enderecoTexto.textContent = enderecoFormatado;
            cepTexto.textContent = `CEP: ${cep}`;

            // salvar para reabrir depois
            sessionStorage.setItem("enderecoFinal", enderecoFormatado);
            sessionStorage.setItem("cepFinal", cep);
        } else {
            enderecoTexto.textContent = "Endereço não encontrado.";
        }

    } catch (error) {
        enderecoTexto.textContent = "Erro ao buscar CEP.";
    }
});
