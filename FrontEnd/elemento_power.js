document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("userLogin").value.trim();
    const senha = document.getElementById("userSenha").value;
    const mensagem = document.getElementById("mensagem");

    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.style.color = tipo === "erro" ? "red" : "green";
    }

    // Buscar usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
        user => user.login === usuario && user.senha === senha
    );

    if (!usuarioEncontrado) {
        mostrarMensagem("Login ou senha incorretos!", "erro");
        return;
    }

    // Sucesso
    mostrarMensagem("Login realizado com sucesso! Redirecionando...", "sucesso");

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
});

