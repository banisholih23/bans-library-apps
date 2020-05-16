const db = require('../config/index')

module.exports = {
  getStatus: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM book_status', (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },

  postStatus: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO book_status SET ?', data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        const newData = {
          id: result.insertId,
          ...data
        }
        resolve(newData)
      })
    })
  },
  
  // putStatus: (id) => {
  //   return new Promise((resolve, reject) => {
  //     db.query('UPDATE FROM book_status WHERE id = ?', id, (error, result) => {
  //       if (error) {
  //         reject(Error(error))
  //       }
  //       resolve(result)
  //     })
  //   })
  // },
  putStatus: (setData, id) => {
    return new Promise(function (resolve, reject) {
      db.query('UPDATE book_status SET ? WHERE id = ?', [setData, id], function (error, result) {
        if (!error) {
          resolve(result)
        } else {
          reject(error)
        }
      })
    })
  },

  deleteStatus: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM book_status WHERE id = ?', id, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  }
}