document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const botao = e.target.closest(".btn-comprar");
        if (!botao) return; // clicou em outra coisa

        const productId = botao.getAttribute("data-id");

        if (!productId) {
            console.warn("Botão de compra sem data-id configurado!");
            return;
        }

        // Redireciona para página de detalhes
        window.location.href = `detalhes.html?id=${productId}`;
    });
});
