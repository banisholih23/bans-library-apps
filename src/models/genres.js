const db = require('../config/index')

module.exports = {
  getGenre: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM genres', (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  postGenre: (data) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO genres SET ?', data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        const newData = {
          id: results.insertId,
          ...data
        }
        resolve(newData)
      })
    })
  },

  putGenre: (data,id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE genres SET ? WHERE id = ?', [data,id], (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },

  deleteGenre: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM genres WHERE id = ?', id, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  }
}