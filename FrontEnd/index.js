// =========================
// Recupera produtos do localStorage
// =========================
const STORAGE_KEY = "produtos";

function apiGetProdutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// =========================
// Renderiza cards no index
// =========================
function renderCards() {
  const produtos = apiGetProdutos();

  const containerSuplementos = document.querySelector(".container-card-suplementos");
  const containerPromocoes = document.querySelector(".container-card-promocoes");

  containerSuplementos.innerHTML = "";
  containerPromocoes.innerHTML = "";

  produtos.forEach(produto => {
    // Cria card
    const card = document.createElement("div");
    card.classList.add("card-produto");
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button class="btn-compra">Comprar</button>
    `;

    // Coloca no container correto
    if (produto.categoria.toLowerCase() === "promocoes") {
      containerPromocoes.appendChild(card);
    } else if (produto.categoria.toLowerCase() === "suplementos") {
      containerSuplementos.appendChild(card);
    }
  });

  if (containerSuplementos.children.length === 0) {
    containerSuplementos.innerHTML = "<p>Nenhum produto cadastrado em Suplementos.</p>";
  }
  if (containerPromocoes.children.length === 0) {
    containerPromocoes.innerHTML = "<p>Nenhum produto cadastrado em Promoções.</p>";
  }
}

// =========================
// Inicialização
// =========================
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

/*Garantir Sempre ter uma Imagem*/

const imgSrc = produto.imagem && produto.imagem.trim() !== "" 
               ? produto.imagem 
               : "https://via.placeholder.com/150";
card.innerHTML = `
  <img src="${imgSrc}" alt="${produto.nome}">
  <h3>${produto.nome}</h3>
  <p>R$ ${produto.preco.toFixed(2)}</p>
  <button class="btn-compra">Comprar</button>
`;

