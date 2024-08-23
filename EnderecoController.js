const axios = require('axios'); 
const { Endereco } = require('./models'); 

module.exports = {
  async buscarCepSalvarEndereco(req, res) {
    const { cep } = req.body;

    try {
      const cleanCep = cep.replace(/\D/g, '');

      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

      if (response.data.erro) {
        return res.status(404).json({ error: 'CEP não encontrado' });
      }

      const { logradouro, bairro, localidade, uf } = response.data;

      const endereco = await Endereco.create({
        cep: cleanCep,
        logradouro,
        bairro,
        cidade: localidade,
        estado: uf,
      });

      return res.status(201).json(endereco);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar ou salvar o endereço' });
    }
  },
};
