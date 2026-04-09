const User = require('../models/User');

exports.addUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = UserSchema({ name, email, password })
        await user.save()
        res.status(200).json({message: 'User Created!'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}