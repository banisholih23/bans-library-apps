const db = require('../config/index')

module.exports = {
  getAllBooks: (start, end, data = {}) => {
    const sql = `SELECT id, book_title, book_desc, image, book_genre, book_author, book_status, id_genre, id_status, created_at, updated_at FROM lis_book WHERE book_title LIKE '${data.search || ''}%' 
    ORDER BY book_title ${parseInt(data.sort) ? 'DESC' : 'ASC'} LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getBookCount: (data = {}) => {
    const sql = `SELECT count(*) as total FROM lis_book WHERE book_title LIKE '${data.search || ''}%' 
    ORDER BY book_title ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  addNewBook: function (setData) {
    return new Promise(function (resolve, reject) {
      db.query("INSERT INTO lis_book SET ?", setData, function (
        error,
        result
      ) {
        if (!error) {
          const newData = {
            id: result.insertId,
            ...setData,
          };
          resolve(newData);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  getBooksByCondition: (data) => {
    const sql = 'SELECT * FROM lis_book WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, results) => {
        if (error) {
          reject(Error(error))
        }
        resolve(results)
      })
    })
  },
  updateBooks: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE lis_book SET ? WHERE id = ?',
        [setData, id],
        function (error, result) {
          if (!error) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
    });
  },
  deleteBook: (data) => {
    const sql = 'DELETE FROM lis_book WHERE ?'
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