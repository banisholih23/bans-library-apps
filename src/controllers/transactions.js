const transactions = require('../models/transactions')

module.exports = {
  getTransactions: async function (request, response) {
    const result = await transactions.getAllTransaction()

    const data = {
      succes: true,
      msg: 'list transactions',
      data: result
    }
    response.status(200).send(data)
  },

  createTransactions: async (request, response) => {
    const setData = request.body
    console.log(setData)
    const result = await transactions.createTransaction(setData)
    if ( result ) {
      const data ={
        succes: true,
        msg: 'add transactions has succesfully',
        data: result
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
  updateTransactions: async function (request, response) {
    const setData = request.body
    const id = request.params.id
    console.log(setData)
    const result = await transactions.updateTransaction(setData, id)
    if (result) {
       const data = {
        succes: true,
        msg: `transactions with id ${id} updated succesfully`
      }
       response.status(200).send(data)
     } else {
      const data = {
        success: false,
         msg: `failed to update transactions`
      }
      response.status(400).send(data)
    }
  },
  deleteTransactions: async function (request, response) {
    const id = request.params.id
    const result = await transactions.deleteTransaction(id)

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