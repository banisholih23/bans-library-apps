const authModel = require('../models/authentication')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  getAllUsers: async function (request, response) {
    try {
      const result = await authModel.getAllUser()

      return response.status(200).json({
        status: 200,
        msg: 'list all Users',
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
  postSignUp: async function (request, response) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_FACTOR))
      let setData = request.body;

      setData.password = await bcrypt.hash(setData.password, salt)

      const result = await authModel.postSignUp(setData)

      return response.status(200).json({
        status: 200,
        msg: 'Sign Up Success',
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
  postSignIn: async function (request, response) {
    try {
      const getData = request.body
      
      const result = await authModel.postSignIn(getData);

      if (result === undefined) {
        return response.status(500).json({
          status: 500,
          message: "Account Not Match",
          data: [],
        });
      }

      const validPassword = await bcrypt.compare(
        getData.password,
        result.password
      );

      if (!validPassword) {
        return response.status(500).json({
          status: 500,
          message: "Your Password is Wrong",
          data: [],
        });
      } else {
        delete result.password;
        const token = jwt.sign(
          {
            result,
          },
          process.env.JWT_KEY_SECRET,
          {
            expiresIn: "1m",
          }
        ); //token primary
        //refresh token
        const newData = {
          ...result,
          token,
        };
        return response.status(200).json({ status: 200, data: newData });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ status: 500, data: [] });
    }
  },
  deleteUsers: async function (request, response) {
    const id = request.params.id
    const result = await authModel.deleteUsers(id)

    if (result) {
     const data = {
       succes: true,
       msg: `User with id ${id} deleted succesfully`
     }
     response.status(200).send(data)
   } else {
     const data = {
       success: false,
       msg: `failed to deleted user`
     }
     response.status(400).send(data)
   }
 }
};