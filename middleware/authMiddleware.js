const jwt = require('jsonwebtoken')
const secretKey = 'key'

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'User not authorized'})
        }
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'User not authorized'})
    }
}