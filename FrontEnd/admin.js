// =========================
//  SIMULAÇÃO DE API (localStorage)
// =========================
const STORAGE_KEY = "produtos";

function apiGetProdutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function apiSaveProdutos(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function gerarNovoId() {
  const produtos = apiGetProdutos();
  if (produtos.length === 0) return 1;
  return produtos[produtos.length - 1].id + 1;
}

// =========================
//  LÓGICA DO FORMULÁRIO
// =========================
const form = document.getElementById("form-produto");
const tabelaBody = document.querySelector("#tabela-produtos tbody");
const semProdutosDiv = document.getElementById("sem-produtos");

const campoId = document.getElementById("produto-id");
const campoNome = document.getElementById("nome");
const campoPreco = document.getElementById("preco");
const campoCat = document.getElementById("categoria");
const campoEstoque = document.getElementById("estoque");
const campoImg = document.getElementById("imagem");
const campoDesc = document.getElementById("descricao");
const btnLimpar = document.getElementById("btn-limpar");
const btnLogout = document.getElementById("btn-logout");

// =========================
//  RENDERIZAR TABELA
// =========================
function renderTabela() {
  const produtos = apiGetProdutos();
  tabelaBody.innerHTML = "";

  if (produtos.length === 0) {
    semProdutosDiv.style.display = "block";
    return;
  }

  semProdutosDiv.style.display = "none";

  produtos.forEach(produto => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${produto.id}</td>
      <td><img src="${produto.imagem}" alt="${produto.nome}" width="50"/></td>
      <td>${produto.nome}</td>
      <td>R$ ${produto.preco.toFixed(2)}</td>
      <td>${produto.categoria}</td>
      <td>${produto.estoque}</td>
      <td>
        <button class="btn-editar" data-id="${produto.id}">Editar</button>
        <button class="btn-excluir" data-id="${produto.id}">Excluir</button>
      </td>
    `;

    tabelaBody.appendChild(tr);
  });

  // Eventos dos botões (deve ficar DENTRO da renderTabela)
  tabelaBody.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      excluirProduto(id);
    });
  });

  tabelaBody.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      editarProduto(id);
    });
  });
}

// =========================
//  EXCLUIR PRODUTO
// =========================
function excluirProduto(id) {
  let produtos = apiGetProdutos();
  produtos = produtos.filter(p => p.id !== id);
  apiSaveProdutos(produtos);
  renderTabela();
}

// =========================
//  EDITAR PRODUTO
// =========================
function editarProduto(id) {
  const produtos = apiGetProdutos();
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  campoId.value = produto.id;
  campoNome.value = produto.nome;
  campoPreco.value = produto.preco;
  campoCat.value = produto.categoria;
  campoEstoque.value = produto.estoque;
  campoImg.value = produto.imagem;
  campoDesc.value = produto.descricao;
}

// =========================
//  SALVAR FORMULÁRIO
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const produtos = apiGetProdutos();
  const idExistente = campoId.value;

  const novoProduto = {
    id: idExistente ? Number(idExistente) : gerarNovoId(),
    nome: campoNome.value.trim(),
    preco: parseFloat(campoPreco.value),
    categoria: campoCat.value,
    estoque: parseInt(campoEstoque.value),
    imagem: campoImg.value.trim(),
    descricao: campoDesc.value.trim()
  };

  if (idExistente) {
    const idx = produtos.findIndex(p => p.id == idExistente);
    produtos[idx] = novoProduto;
  } else {
    produtos.push(novoProduto);
  }

  apiSaveProdutos(produtos);
  renderTabela();
  limparFormulario();
});

// =========================
//  LIMPAR FORMULÁRIO
// =========================
function limparFormulario() {
  campoId.value = "";
  campoNome.value = "";
  campoPreco.value = "";
  campoCat.value = "whey";
  campoEstoque.value = "1";
  campoImg.value = "";
  campoDesc.value = "";
}

btnLimpar.addEventListener("click", limparFormulario);

// =========================
//  LOGOUT
// =========================
btnLogout.addEventListener("click", () => {
  window.location.href = "login.html";
});

// =========================
//  INICIALIZAÇÃO
// =========================
renderTabela();
