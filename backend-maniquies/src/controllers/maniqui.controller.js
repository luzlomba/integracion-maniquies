import maniquiService from '../services/maniqui.service.js'

const getManiquies = async (req, res) => {
  try {
    const maniquies = await maniquiService.getAllManiquies()
    res.json(maniquies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getManiqui = async (req, res) => {
  try {
    const maniqui = await maniquiService.getManiquiById(req.params.id)
    res.json(maniqui)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const createManiqui = async (req, res) => {
  try {
    const maniqui = await maniquiService.createManiqui(req.body)
    res.status(201).json(maniqui)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateManiqui = async (req, res) => {
  try {
    const maniqui = await maniquiService.updateManiqui(req.params.id, req.body)
    res.json(maniqui)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteManiqui = async (req, res) => {
  try {
    await maniquiService.deleteManiqui(req.params.id)
    res.status(204).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { getManiquies, getManiqui, createManiqui, updateManiqui, deleteManiqui }