import catalogoService from '../services/catalogo.service.js'

const getItems = async (req, res) => {
  try {
    const items = await catalogoService.getAllItems(req.tipo)
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getItem = async (req, res) => {
  try {
    const item = await catalogoService.getItemById(req.tipo, req.params.id)
    res.json(item)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createItem = async (req, res) => {
  try {
    const item = await catalogoService.createItem(req.tipo, req.body)
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateItem = async (req, res) => {
  try {
    const item = await catalogoService.updateItem(req.tipo, req.params.id, req.body)
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteItem = async (req, res) => {
  try {
    await catalogoService.deleteItem(req.tipo, req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getItems, getItem, createItem, updateItem, deleteItem }