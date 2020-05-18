const jwt = require('jsonwebtoken')

module.exports = {
    authorization: (request, response, next) => {
        const token = request.headers.authorization
        // const userId = request.headers['user-id']

        // const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY, (error, result) => {
            if (error && error.name === "TokenExpiredError" || error && error.name === "JsonWebTokenError"){
                response.json(error.message)
            } else {
                request.token = result
                // request.role = result[6].role
                console.log(request.token.role)
                // console.log(request.role)
                next()
            }
        })
    }
}