const express = require("express");
const axios = require("axios");
const router = express.Router();

// CONFIGURAÇÕES IMPORTANTES

const API_TOKEN = "23151|35ZTQuOYHOUl7b7EGXVMpoeby1eR3x1j"; // seu token Invertexto
const BASE_URL = "https://api.invertexto.com/v1/cep/";

// ROTA PARA CONSULTAR CEP

router.get("/:cep", async (req, res) => {
    try {
        const cep = req.params.cep.replace(/\D/g, ""); // remove caracteres inválidos

        if (cep.length !== 8) {
            return res.status(400).json({ error: "CEP inválido. Deve conter 8 dígitos." });
        }

        // Chamada à API externa da Invertexto
        const response = await axios.get(`${BASE_URL}${cep}`, {
            params: { token: API_TOKEN }
        });

        return res.json(response.data);
    } catch (error) {
        console.error("Erro ao consultar CEP:", error);

        // Caso a Invertexto retorne erro
        return res.status(500).json({
            error: "Não foi possível buscar o CEP no momento.",
            details: error.response?.data || null
        });
    }
});

module.exports = router;