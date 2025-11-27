// CONFIGURAÇÕES
let freteCalculado = false;
const FRETE_FIXO = 13.00;

// SELETORES
const listaCarrinho = document.getElementById("lista-carrinho");
const totalProdutosEl = document.getElementById("total-produtos");
const valorFreteEl = document.getElementById("valor-frete");
const totalGeralEl = document.getElementById("total-geral");
const btnContinuar = document.getElementById("btn-continuar");

// CARREGAR CARRINHO DO LOCALSTORAGE
let carrinho = JSON.parse(localStorage.getItem("cart")) || [];

// FUNÇÃO PARA SALVAR CARRINHO
function salvarCarrinho() {
  localStorage.setItem("cart", JSON.stringify(carrinho));
}

// RENDERIZAR ITENS DO CARRINHO
function renderCarrinho() {
  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<p>Produto não encontrado</p>";
    atualizarResumo();
    return;
  }

  carrinho.forEach((item, index) => {
    const divItem = document.createElement("div");
    divItem.classList.add("cart-item");
    divItem.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="cart-item-details">
        <h3>${item.nome}</h3>
        <p>R$ ${item.preco.toFixed(2)}</p>
        <div class="quantity-control">
          <button class="btn-decrease" data-index="${index}">-</button>
          <input type="number" min="1" value="${item.quantidade}" data-index="${index}">
          <button class="btn-increase" data-index="${index}">+</button>
          <button class="btn-remove" data-index="${index}">Remover</button>
        </div>
      </div>
      <p class="subtotal">Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
    `;
    listaCarrinho.appendChild(divItem);
  });

  atualizarResumo();
}

// ATUALIZAR RESUMO
function atualizarResumo() {
  let totalProdutos = 0;

  carrinho.forEach(item => {
    totalProdutos += item.preco * item.quantidade;
  });

  const frete = freteCalculado ? FRETE_FIXO : 0;
  const totalGeral = totalProdutos + frete;

  totalProdutosEl.textContent = `R$ ${totalProdutos.toFixed(2)}`;
  valorFreteEl.textContent = `R$ ${frete.toFixed(2)}`;
  totalGeralEl.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

// EVENTOS DE INTERAÇÃO
listaCarrinho.addEventListener("click", (e) => {
  const index = e.target.dataset.index;
  if (index === undefined) return;

  if (e.target.classList.contains("btn-increase")) {
    carrinho[index].quantidade += 1;
    salvarCarrinho();
    renderCarrinho();
  }

  if (e.target.classList.contains("btn-decrease")) {
    if (carrinho[index].quantidade > 1) {
      carrinho[index].quantidade -= 1;
      salvarCarrinho();
      renderCarrinho();
    }
  }

  if (e.target.classList.contains("btn-remove")) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    renderCarrinho();
  }
});

// ALTERAÇÃO DIRETA NO INPUT
listaCarrinho.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT" && e.target.type === "number") {
    const index = e.target.dataset.index;
    let valor = parseInt(e.target.value);
    if (isNaN(valor) || valor < 1) valor = 1;
    carrinho[index].quantidade = valor;
    salvarCarrinho();
    renderCarrinho();
  }
});

// BOTÃO CONTINUAR
btnContinuar.addEventListener("click", () => {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const isLogged = sessionStorage.getItem("logged") === "true";

  if (isLogged) {
    window.location.href = "checkout.html";
  } else {
    // envia o destino como parâmetro
    window.location.href = "login.html?next=checkout.html";
  }
});
 

// ======== INICIALIZAÇÃO ========
renderCarrinho();


/*Chamando API CEP no FronEnd*/

async function buscarCep() {
    const cep = document.getElementById("cep").value;

    const response = await fetch(`http://localhost:3000/api-cep/${cep}`);
    const data = await response.json();

    if (data.error) {
        alert("CEP não encontrado!");
        return;
    }

    document.getElementById("endereco-entrega").textContent =
        `${data.street}, ${data.neighborhood}, ${data.city} - ${data.state}`;

        freteCalculado = true;
atualizarResumo();

    // Exibir frete fixo R$ 13,00 abaixo
    document.getElementById("frete-valor-exibicao").textContent = "R$ 13,00";
}

