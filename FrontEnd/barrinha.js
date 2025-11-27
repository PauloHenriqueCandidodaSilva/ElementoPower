document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container-card-barrinha");
  const msgVazio = document.getElementById("sem-produtos");

  // Carrega todos os produtos gerados no admin
  const todosProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Filtrar somente da categoria Barrinha
  const produtosBarrinha = todosProdutos.filter(prod =>
    prod.categoria.toLowerCase() === "barrinha" ||
    prod.categoria.toLowerCase() === "barrinhas"
  );

  // Se não houver produtos
  if (produtosBarrinha.length === 0) {
    msgVazio.style.display = "block";
    return;
  }

  msgVazio.style.display = "none";

  produtosBarrinha.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card-whey");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
      <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
    `;

    container.appendChild(card);
  });
});
