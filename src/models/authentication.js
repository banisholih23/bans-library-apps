const db = require('../config/index')

module.exports = {
  getAllUser: function () {
    return new Promise(function (resolve, reject) {
        db.query('SELECT * FROM users', function (error, result) {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
  },
  postSignUp: function (setData) {
    return new Promise(function (resolve, reject) {
      db.query("INSERT INTO users SET ?", setData, function (
        error,
        result
      ) {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData,
          };
          delete newResult.password;
          resolve(newResult);
        } else {
          reject(new Error(error));
        }
      });
    });
  },
  postSignIn: function (getData) {
    return new Promise(function (resolve, reject) {
      db.query(
        "SELECT * FROM users WHERE email=? ",
        [getData.email],
        function (error, result) {
          if (!error) {
            resolve(result[0]);
          } else {
            reject(new Error(error));
          }
        }
      )
    })
  },
  deleteUsers: function (id) {
    return new Promise(function (resolve, reject) {
        db.query('DELETE FROM users WHERE id = ?', id, function (error, result) {
            if (!error) {
                resolve(result)
            } else {
                reject(new Error(error))
            }
        })
    })
  }
}
