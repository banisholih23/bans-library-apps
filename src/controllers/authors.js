const configureAuthor = require('../models/authors')

module.exports = {
  getAuthors: async function (request, response) {
    const result = await configureAuthor.getAuthor()

    const data = {
      succes: true,
      msg: 'list all authors',
      data: result
     }
      response.status(200).send(data)
  },
  postAuthors: async function (request, response) {
    const setData = request.body
    console.log(setData)
    const result = await configureAuthor.postAuthor(setData)
    if ( result ) {
      const data ={
        succes: true,
        msg: 'add author has succesfully',
        data: result
      }
      response.status(200).send(data)
    } else {
      const data = {
        succes: false,
        msg: 'failed to add author'
      }
      response.status(400).send(data)
    }
  },
  putAuthor: async function (request, response) {
    const setData = request.body
    const id = request.params.id
    console.log(setData)
    const result = await configureAuthor.putAuthor(setData, id)
    if (result) {
       const data = {
        succes: true,
        msg: `author with id ${id} updated succesfully`
      }
       response.status(200).send(data)
     } else {
      const data = {
        success: false,
         msg: `failed to updated author`
       }
      response.status(400).send(data)
      }
    },

  deleteAuthor: async function (request, response) {
     const id = request.params.id
     const result = await configureAuthor.deleteAuthor(id)

     if (result) {
      const data = {
        succes: true,
        msg: `author with id ${id} deleted succesfully`
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: `failed to deleted author`
      }
      response.status(400).send(data)
    }
  }
}