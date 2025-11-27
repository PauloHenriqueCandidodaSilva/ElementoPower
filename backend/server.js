const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// CONFIGURAÇÃO DA API
const API_TOKEN = "23151|35ZTQuOYHOUl7b7EGXVMpoeby1eR3x1j"; 
const BASE_URL = "https://api.invertexto.com/v1/cep/";

// ROTA DO CEP 
app.get("/api-cep/:cep", async (req, res) => {
    const cep = req.params.cep;

    try {
        const response = await axios.get(`${BASE_URL}${cep}`, {
            params: { token: API_TOKEN }
        });

        res.json(response.data);
    } catch (error) {
        res.json({ error: "CEP inválido ou não encontrado" });
    }
});

// SUBIR SERVIDOR
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
