const db = require('../config/index')

module.exports = {
  countData: (searchTitle) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT count(*) as totalData FROM lis_book WHERE book_title LIKE
      '%${searchTitle}%'`, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.totalData)
      })
    })
  },
  getAllBooks: (searchTitle, pagination) => {
    return new Promise((resolve, reject) => {
      const totalData = db.query('SELECT count (*) FROM lis_book')

      const firstData = ((pagination.limit * pagination.activePage) - pagination.limit)

      db.query(`SELECT id, book_title, book_desc, image, book_genre, book_author, book_status, id_genre, id_status, created_at, updated_at FROM lis_book WHERE book_title LIKE '%${searchTitle}%'
      ORDER BY ${pagination.sortBy} ${pagination.orderBy}
      LIMIT ${firstData},${pagination.limit}`, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  // addNewBook: (data) => {
  //   const sql = 'INSERT INTO lis_book SET ?'
  //   return new Promise((resolve, reject) => {
  //     db.query(sql, data, (error, results) => {
  //       if (error) {
  //         reject(Error(error))
  //       }
  //       console.log(results)
  //       resolve(results.insertId)
  //     })
  //   })
  // },
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
  // updateBook: (setData, id) => {
  //   const sql = 'UPDATE lis_book SET ? WHERE id=?'
  //   return new Promise((resolve, reject) => {
  //     db.query(sql, [setData, parseInt(id)], (error, result) => {
  //       if (error) {
  //         reject(Error(error))
  //       }
  //       resolve(result)
  //     })
  //   })
  // },
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