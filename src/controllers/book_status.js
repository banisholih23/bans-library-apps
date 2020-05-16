const statusModel = require('../models/book_status')

module.exports = {
  getStatus: async (request, response) => {
    const dataStatus = await statusModel.getStatus()

    const data = {
      succes: true,
      msg: 'list all status book',
      data: dataStatus
    }
    response.status(200).send(data)
  },

  postStatus: async (request, response) => {
    const { status } = request.body

    const dataStatus = {
      status,
      created_at: new Date(),
      updated_at: new Date()
    }
    const result = await statusModel.postStatus(dataStatus)
    dataStatus.id = result.insertId

    if ( result ) {
      const data ={
        succes: true,
        msg: 'add status has succesfully',
        data: dataStatus
      }
      response.status(200).send(data)
    } else {
      const data = {
        succes: false,
        msg: 'failed to add status'
      }
      response.status(400).send(data)
    }
  },
  // putStatus: async (request, response) => {
  //   const id = request.params
  //   const { status, created_at, updated_at } = request.body

  //   const statusData = [
  //     { status, created_at, updated_at },
  //     { id: parseInt(id) }
  //   ]

  //   const result = await statusModel.putStatus(statusData)
  //   if ( result ) {
  //     const data = {
  //       succes: true,
  //       msg: `status with ${id} has been updated`,
  //       data: statusData[0]
  //     }
  //     response.status(200).send(data)
  //   } else {
  //     const data = {
  //       success: false,
  //       msg: 'Failed to updated status'
  //     }
  //     response.status(400).send(data)
  //   }
  // },
  putStatus: async function (request, response) {
      const setData = request.body
      const id = request.params.id
      const result = await statusModel.putStatus(setData, id)
    if (result) {
      const data = {
        succes: true,
        msg: `status with id ${id} deleted succesfully`
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: `failed to deleted status`
      }
      response.status(400).send(data)
    }
  },

  deleteStatus: async (request, response) => {
    const id = request.params.id

    const result = await statusModel.deleteStatus(id)
    if (result) {
      const data = {
        succes: true,
        msg: `status with id ${id} deleted succesfully`
      }
      response.status(200).send(data)
    } else {
      const data = {
        success: false,
        msg: `failed to deleted status`
      }
      response.status(400).send(data)
    }
  }
}