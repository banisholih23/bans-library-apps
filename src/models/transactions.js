const db = require('../config/index')

module.exports = {

  getAllTransaction: () => {
    const sql = 'select transactions.id, lis_book.book_title, lis_book.book_author, users.username as orderby, book_status.status, transactions.book_id, transactions.user_id, transactions.status_id, transactions.created_at, transactions.updated_at from transactions JOIN lis_book ON lis_book.id = transactions.book_id JOIN users on users.id = transactions.user_id JOIN book_status on book_status.id = transactions.status_id'
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getTransactionCount: () => {
    const sql = 'SELECT COUNT(*) as total FROM transactions'
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createTransaction: (data) => {
    const sql = 'INSERT INTO transactions SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        console.log(result)
        resolve(result.insertId)
      })
    })
  },
  getTransactionByCondition: (data) => {
    const sql = 'SELECT * FROM transactions WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateTransaction: (data) => {
    const sql = 'UPDATE transactions SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteTransaction: (data) => {
    const sql = 'DELETE FROM transactions WHERE id = ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  }
}