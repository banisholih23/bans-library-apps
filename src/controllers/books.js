const book = require('../models/books')
const multer = require('multer')
const config = require('../config/multer')
const upload = config.single('image')

module.exports = {
  getAllBooks: async (request, response) => {
    try {
      const limit = request.query.limit || 100
      const activePage = request.query.page || 1
      const searchTitle = request.query.search || ''
      const sortBy = request.query.sortBy || 'id' 
      const orderBy = request.query.orderBy || 'ASC'

      const pagination = {
        activePage, limit, sortBy, orderBy
      }

      const totalData = await book.countData(searchTitle)
        // console.log(totalData)
      const totalPages = Math.ceil(totalData / limit)
        // console.log(totalPages)
      const pager = {
        totalPages
      }
      const result = await book.getAllBooks(searchTitle, pagination)
      return response.status(200).json({
        status: 200,
        msg: 'List all book data',
        data: result
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ status: 500, msg: error, data: [] })
    }
  },
  addNewBooks: async function (request, response) {
    upload(request, response, async function (error) {
      if (error instanceof multer.MulterError) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      } else if (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }

      try {
        if (!request.file) {
          return response.status(500).json({
            status: 500,
            message: "Please choosing files...",
            data: [],
          });
        } else {
          let setData = request.body;
          setData.image = `http://localhost:5000/profile_picture/${request.file.filename}`;
          console.log(setData);
          const result = await book.addNewBook(setData);
          return response
            .status(200)
            .json({ status: 200, message: "success", data: result });
        }
      } catch (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }
    });
  },
  updateBooks: async function (request, response) {
    upload(request, response, async function (error) {
      if (error instanceof multer.MulterError) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      } else if (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }

      try {
        if (!request.file) {
          return response.status(500).json({
            status: 500,
            message: "Please choosing files...",
            data: [],
          });
        } else {
          let setData = request.body;
          const id = request.params.id
          setData.image = `http://localhost:5000/profile_picture/${request.file.filename}`;
          console.log(setData);
          const result = await book.updateBooks(setData, id);
          return response
            .status(200)
            .json({ status: 200, message: "book image has been updated", data: setData });
        }
      } catch (error) {
        return response
          .status(500)
          .json({ status: 500, message: error, data: [] });
      }
    });
  },
  // updateBooks: async function (request, response) {
  //   upload(request, response, async function (error) {
  //     if (error instanceof multer.MulterError) {
  //       return response
  //         .status(500)
  //         .json({ status: 500, message: error, data: [] });
  //     } else if (error) {
  //       return response
  //         .status(500)
  //         .json({ status: 500, message: error, data: [] });
  //     }
  //     try {
  //       let setData = request.body;
  //       const id = request.params.id
  //       setData.image = `http://localhost:5000/profile_picture/${request.file.filename}`;
  //       console.log(setData);
  //       const result = await book.updateBooks(setData, id);
  //       return response
  //         .status(200)
  //         .json({ status: 200, message: "success", data: result });
    
  //     } catch (error) {
  //       return response
  //         .status(500)
  //         .json({ status: 500, message: error, data: [] });
  //     }
  //   })
  // },
  deleteBook: async (request, response) => {
    const { id } = request.params
    const _id = { id: parseInt(id) }
    const isExsist = await book.getBooksByCondition(_id)
    if (isExsist.length > 0) {
      const result = await book.deleteBook(_id)
      if (result) {
        const data = {
          success: true,
          msg: `Book with id ${id} has been deleted`
        }
        response.status(200).send(data)
      } else {
        const data = {
          success: false,
          msg: 'failed to delete'
        }
        response.status(400).send(data)
      }
    } else {
      const data = {
        success: false,
        msg: `Cannot delete, Book not found`
      }
      response.status(400).send(data)
    }
  },
}
