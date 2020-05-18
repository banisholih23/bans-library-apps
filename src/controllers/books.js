const book = require('../models/books')
const multer = require('multer')
const config = require('../config/multer')
const upload = config.single('image')
const qs = require('querystring')

const getPage = (_page) => {
  const page = parseInt(_page)
  if (page && page > 0) {
    return page
  } else {
    return 1
  }
}

const getPerPage = (_perPage) => {
  const perPage = parseInt(_perPage)
  if (perPage && perPage > 0) {
    return perPage
  } else {
    return 5
  }
}

const getNextLinkQueryString = (page, totalPage, currentQuery) => {
  page = parseInt(page)
  if (page < totalPage) {
    const generatedPage = {
      page: page + 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

const getPrevLinkQueryString = (page, currentQuery) => {
  page = parseInt(page)
  if (page > 1) {
    const generatedPage = {
      page: page - 1
    }
    return qs.stringify({ ...currentQuery, ...generatedPage })
  } else {
    return null
  }
}

module.exports = {
  getAllBooks: async (request, response) => {
    try {
      const { page, limit, search, sort } = request.query

      const condition = {
        search,
        sort
      }

      const sliceStart = (getPage(page) * getPerPage(limit)) - getPerPage(limit)
      const sliceEnd = (getPage(page) * getPerPage(limit))
      const totalData = await book.getBookCount(condition)
      //const totalDataConds = await book.countData(pagination)
        // console.log(totalData)
      const totalPage = Math.ceil(totalData / getPerPage(limit))
        // console.log(totalPages)

      const prevLink = getPrevLinkQueryString(getPage(page), request.query)
      const nextLink = getNextLinkQueryString(getPage(page), totalPage, request.query)

      const result = await book.getAllBooks(sliceStart, sliceEnd, condition)
      return response.status(200).json({
        status: 200,
        msg: 'List all book data',
        data: result,
        pageInfo: {
          page: getPage(page),
          totalPage,
          perPage: getPerPage(limit),
          totalData, 
          nextLink: nextLink && `${process.env.APP_URL}/books?${nextLink}`,
          prevLink: prevLink && `${process.env.APP_URL}/books?${prevLink}`
        }
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
          setData.image = `${process.env.APP_URL}/profile_picture/${request.file.filename}`;
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
          setData.image = `${process.env.APP_URL}/profile_picture/${request.file.filename}`;
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
