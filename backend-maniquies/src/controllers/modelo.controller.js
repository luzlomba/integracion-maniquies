import modeloService from '../services/modelo.service.js'

const getModelos = async (req, res) => {
  try {
    const modelos = await modeloService.getAllModelos(req.tipo)
    res.json(modelos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getModelo = async (req, res) => {
  try {
    const modelo = await modeloService.getModeloById(req.tipo, req.params.id)
    res.json(modelo)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createModelo = async (req, res) => {
  try {
    const modelo = await modeloService.createModelo(req.tipo, req.body)
    res.status(201).json(modelo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateModelo = async (req, res) => {
  try {
    const modelo = await modeloService.updateModelo(req.tipo, req.params.id, req.body)
    res.json(modelo)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteModelo = async (req, res) => {
  try {
    await modeloService.deleteModelo(req.tipo, req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getModelos, getModelo, createModelo, updateModelo, deleteModelo }