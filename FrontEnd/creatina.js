document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container-card-creatina");
  const msgVazio = document.getElementById("sem-produtos");

  // Carrega todos os produtos gerados no admin
  const todosProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Filtrar somente da categoria Barrinha
  const produtosCreatina = todosProdutos.filter(prod =>
    prod.categoria.toLowerCase() === "creatina" ||
    prod.categoria.toLowerCase() === "Creatinas"
  );

  // Se não houver produtos
  if (produtosCreatina.length === 0) {
    msgVazio.style.display = "block";
    return;
  }

  msgVazio.style.display = "none";

  produtosCreatina.forEach((produto) => {
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
