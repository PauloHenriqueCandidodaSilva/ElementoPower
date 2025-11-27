// helper: pega query param ?next=...
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("userLogin").value.trim();
    const senha = document.getElementById("userSenha").value;
    const mensagem = document.getElementById("mensagem");

    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.style.color = tipo === "erro" ? "red" : "green";
    }

    // Verificação especial: administrador
    if (usuario === "admin" && senha === "admin123") {
        localStorage.setItem("logged", "true");
        localStorage.setItem("loggedUser", "admin");

        mostrarMensagem("Login como administrador! Redirecionando...", "sucesso");

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1500);

        return;
    }

    // Buscar usuários cadastrados no localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        user => user.login === usuario && user.senha === senha
    );

    if (!usuarioEncontrado) {
        mostrarMensagem("Login ou senha incorretos!", "erro");
        return;
    }

    //  Se chegou aqui, login foi validado
    sessionStorage.setItem("logged", "true");
    sessionStorage.setItem("loggedUser", usuarioEncontrado.email); // ou login, como preferir

    mostrarMensagem("Login realizado com sucesso! Redirecionando...", "sucesso");

    // pega parâmetro next (ou default para index.html)
    const nextPage = getQueryParam("next") || "index.html";

    setTimeout(() => {
        window.location.href = nextPage;
    }, 1500);
});
