document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container-card-whey");
  const mensagemVazio = document.getElementById("sem-produtos");

  // Carrega todos os produtos salvos no admin
  const todosProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

  // Filtra apenas os produtos de whey protein
  const produtosWhey = todosProdutos.filter(prod =>
    prod.categoria.toLowerCase() === "whey" ||
    prod.categoria.toLowerCase() === "whey protein"
  );

  // Se não houver produtos, mostra mensagem
  if (produtosWhey.length === 0) {
    mensagemVazio.style.display = "block";
    return;
  }

  mensagemVazio.style.display = "none";

  // Renderizar cards
  produtosWhey.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card-whey");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>

      <!-- ESSENCIAL: botão com DATA-ID para abrir detalhes -->
      <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
    `;

    container.appendChild(card);
  });
});
