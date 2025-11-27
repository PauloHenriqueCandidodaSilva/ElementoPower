// detalhes.js
// Lógica para carregar produto por id, controlar quantidade e adicionar ao carrinho

const STORAGE_KEY = "produtos";
const CART_KEY = "cart";

// helper: pega query param ?id=123
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// helper: formata preço número -> "R$ X,XX"
function formatMoney(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function apiGetProdutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function apiGetProductById(id) {
  const produtos = apiGetProdutos();
  return produtos.find(p => String(p.id) === String(id));
}

// salva item no carrinho (cart é array de {id, nome, preco, quantidade, imagem})
function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  const idx = cart.findIndex(ci => ci.id === item.id);
  if (idx > -1) {
    cart[idx].quantidade += item.quantidade;
  } else {
    cart.push(item);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// renderiza placeholder usando imagem enviada (arquivo local recebido)
const PLACEHOLDER_IMG = "/mnt/data/afe24e1f-6a93-4b3a-b846-fbc08a70e2e4.png";

document.addEventListener("DOMContentLoaded", () => {
  const id = getQueryParam("id");
  const produto = id ? apiGetProductById(id) : null;

  // elementos
  const imagemContainer = document.getElementById("imagem-produto");
  const nomeEl = document.getElementById("produto-nome");
  const descricaoEl = document.getElementById("descricao");
  const precoUnitEl = document.getElementById("preco-unitario");
  const precoTotalEl = document.getElementById("preco-total");
  const quantidadeInput = document.getElementById("quantidade");
  const btnIncrease = document.getElementById("btn-increase");
  const btnDecrease = document.getElementById("btn-decrease");
  const btnAddCart = document.getElementById("btn-add-cart");

  // se não encontrou produto, tenta pegar o primeiro produto como fallback
  const produtoParaRender = produto || (apiGetProdutos()[0] || null);

  if (!produtoParaRender) {
    imagemContainer.innerHTML = "<p>Nenhum produto disponível.</p>";
    nomeEl.textContent = "Produto não encontrado";
    descricaoEl.value = "";
    precoUnitEl.textContent = formatMoney(0);
    precoTotalEl.textContent = formatMoney(0);
    btnAddCart.disabled = true;
    return;
  }

  // preencher info
  const imgSrc = produtoParaRender.imagem && produtoParaRender.imagem.trim() !== "" ? produtoParaRender.imagem : PLACEHOLDER_IMG;
  imagemContainer.innerHTML = `<img src="${imgSrc}" alt="${produtoParaRender.nome}">`;

  nomeEl.textContent = produtoParaRender.nome;
  descricaoEl.value = produtoParaRender.descricao || "";
  precoUnitEl.textContent = formatMoney(Number(produtoParaRender.preco) || 0);

  // atualiza total baseado na quantidade
  function atualizarTotal() {
    const q = Number(quantidadeInput.value) || 1;
    const total = (Number(produtoParaRender.preco) || 0) * q;
    precoTotalEl.textContent = formatMoney(total);
  }

  // eventos quantidade
  btnIncrease.addEventListener("click", () => {
    quantidadeInput.value = Number(quantidadeInput.value) + 1;
    atualizarTotal();
  });

  btnDecrease.addEventListener("click", () => {
    const atual = Number(quantidadeInput.value);
    if (atual > 1) {
      quantidadeInput.value = atual - 1;
      atualizarTotal();
    }
  });

  quantidadeInput.addEventListener("input", () => {
    let val = Number(quantidadeInput.value);
    if (!Number.isFinite(val) || val < 1) val = 1;
    quantidadeInput.value = val;
    atualizarTotal();
  });

  // adicionar ao carrinho
  btnAddCart.addEventListener("click", () => {
    const quantidade = Number(quantidadeInput.value) || 1;
    const cartItem = {
      id: produtoParaRender.id,
      nome: produtoParaRender.nome,
      preco: Number(produtoParaRender.preco),
      quantidade,
      imagem: imgSrc
    };

    addToCart(cartItem);

    // pequeno feedback visual (pode ser substituído por mensagem na tela)
    btnAddCart.textContent = "ADICIONADO ✓";
    btnAddCart.disabled = true;

    setTimeout(() => {
      btnAddCart.textContent = "IR PARA CARRINHO";
      btnAddCart.disabled = false;
      // opcional: redirecionar para cart.html se desejar:
      // window.location.href = "cart.html";
    }, 900);
  });

  // inicializa total
  atualizarTotal();
});

