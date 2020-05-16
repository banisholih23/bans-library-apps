const modelGenre = require('../models/genres')

module.exports = {
  getGenres: async (requset, response) => {
    try {
      const result = await modelGenre.getGenre()
      return response.status(200).json({
        status: 200,
        msg: 'list all genres',
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: error,
        data: []
      })
    }
  },
  
  postGenres: async (request, response) => {
    try {
      const data = request.body
      const result = await modelGenre.postGenre(data)

      return response.status(200).json({
        status: 200,
        msg: 'Success',
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: error,
        data: []
      })
    }
  },
  putGenres: async (request, response) => {
    try {
      const data = request.body
      const id = request.params.id
      const result = await modelGenre.putGenre(data, id)

      return response.status(200).json({
        status: 200,
        msg: 'Success',
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: error,
        data: []
      })
    }
  },
  deleteGenres: async (request, response) => {
    try {
      const id = request.params.id
      const result = await modelGenre.deleteGenre(id)

      return response.status(200).json({
        status: 200,
        msg: 'Success',
        data: result
      })
    } catch (error) {
      return response.status(500).json({
        status: 500,
        msg: error,
        data: []
      })
    }
  }
}