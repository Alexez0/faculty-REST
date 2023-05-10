const jwt = require('jsonwebtoken')
const secretKey = 'key'

module.exports = function (role) {
    return function (req, res, next) {
        try {
            if (req.method === 'OPTIONS') {
                next()
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: `User not authorised`})
            }
            const decoded = jwt.verify(token, secretKey)
            if (decoded.role !== role) {
                return res.status(403).json({message: `Access denied`})
            }
            req.user = decoded
            next()
        } catch (e) {
            return res.status(401).json({message: `User not authorised`})
        }
    }
}