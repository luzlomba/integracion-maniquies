import piezaService from '../services/pieza.service.js'

const getPiezas = async (req, res) => {
  try {
    const piezas = await piezaService.getAllPiezas(req.tipo)
    res.json(piezas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPieza = async (req, res) => {
  try {
    const pieza = await piezaService.getPiezaById(req.tipo, req.params.id)
    res.json(pieza)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createPieza = async (req, res) => {
  try {
    const pieza = await piezaService.createPieza(req.tipo, req.body)
    res.status(201).json(pieza)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updatePieza = async (req, res) => {
  try {
    const pieza = await piezaService.updatePieza(req.tipo, req.params.id, req.body)
    res.json(pieza)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deletePieza = async (req, res) => {
  try {
    await piezaService.deletePieza(req.tipo, req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getPiezas, getPieza, createPieza, updatePieza, deletePieza }