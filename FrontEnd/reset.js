document.getElementById("reset-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const novaSenha = document.getElementById("senha-nova").value;
    const confirmacao = document.getElementById("senha-confirmacao").value;
    const mensagem = document.getElementById("mensagem");

    // Função para mostrar mensagens
    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.style.color = tipo === "erro" ? "red" : "green";
    }

    // --- Buscar usuário no localStorage ---
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioIndex = usuarios.findIndex(user => user.email === email);

    if (usuarioIndex === -1) {
        mostrarMensagem("Email não encontrado! Utilize um email cadastrado.", "erro");
        return;
    }

    // --- Validar nova senha ---
    if (novaSenha.length < 6) {
        mostrarMensagem("A nova senha deve ter no mínimo 6 caracteres.", "erro");
        return;
    }

    if (novaSenha !== confirmacao) {
        mostrarMensagem("As senhas não coincidem!", "erro");
        return;
    }

    // --- Atualizar senha ---
    usuarios[usuarioIndex].senha = novaSenha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensagem("Senha alterada com sucesso! Redirecionando...", "sucesso");

    // --- Redireciona ---
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});
