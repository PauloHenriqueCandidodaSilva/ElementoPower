document.getElementById("form-cadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const login = document.getElementById("login").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;
    const cep = document.getElementById("cep").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    const mensagem = document.getElementById("mensagem");

    function mostrarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.style.color = tipo === "erro" ? "red" : "green";
    }

    // Validações básicas
    if (!nome || !login || !email || !senha || !confirmarSenha || !cep || !telefone) {
        mostrarMensagem("Preencha todos os campos!", "erro");
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem("A senha deve ter pelo menos 6 caracteres!", "erro");
        return;
    }

    if (senha !== confirmarSenha) {
        mostrarMensagem("As senhas não coincidem!", "erro");
        return;
    }

    // Recuperar registros existentes
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se login ou email já existem
    const usuarioExistente = usuarios.find(
        user => user.login === login || user.email === email
    );

    if (usuarioExistente) {
        mostrarMensagem("Login ou email já cadastrados!", "erro");
        return;
    }

    // Criar novo usuário
    const novoUsuario = {
        nome,
        login,
        email,
        senha,
        cep,
        telefone
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarMensagem("Cadastro realizado com sucesso! Redirecionando...", "sucesso");

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});
