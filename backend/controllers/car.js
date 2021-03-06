import Car from '../models/car.js'
import User from '../models/user.js'


const createCarPost = async (req, res) => {
    const { name, year, condition, make, body, color, price, createdBy, description, imageUrl } = req.body
    if (!(name && year && condition
        && make && body && color &&
        price && createdBy && imageUrl)) return res.status(422).json({
            message: 'Please make sure [image is provided, name, condition, make, body, color, description price and createdBy fields are populated] '
        })
    try {
        const carPost = new Car({
            name, year, condition, make, body, color, price, createdBy, description, imageUrl
        })
        const savedCar = await carPost.save()
        return res.status(200).json(savedCar);
    } catch (error) {
        return res.status(400).json({
            message: 'Error while trying to create this post, please try again.'
        })
    }
}

const getCarPostById = async (req, res) => {
    const { carId } = req.params
    try {
        const exisitingCar = await Car.findById(carId).populate('createdBy', 'firstName lastName email')
        if (!exisitingCar) {
            return res.status(404).json({ message: `Post with this id [${carId}] does not exist` })
        }
        return res.status(200).json(exisitingCar);
    } catch (err) {
        return res.status(400).json({
            message: 'Error while trying to get this post, please try again.'
        })
    }
}

const getAllCarPost = async (req, res) => {
    let { limit } = req.query
    limit = limit ? limit : 100
    try {
        const posts = await Car.find().limit(limit)
        return res.status(200).json(posts)
    } catch (err) {
        return res.status(400).json({
            message: 'Error while trying to get posts, please try again.'
        })
    }
}

const getUserPosts = async (req, res) => {
    const { userId } = req.params
    try {
        const userExists = await User.findById(userId)

        if (!userExists) {
            return res.status(404).json({ message: `User with this id [${userId}] does not exist` })
        }
        const userCarsPost = await Car.find({ createdBy: userId })
        return res.status(200).json(userCarsPost)
    } catch (err) {
        return res.status(400).json({
            message: 'Error while trying to get posts, please try again.'
        })
    }
}

const editCarPost = async (req, res) => {
    const { carId } = req.params
    const { userId } = req.body
    try {
        const exisitingCar = await Car.findById(carId)
        if (!exisitingCar) {
            return res.status(404).json({
                message: `Car with this Id [${carId}] does not exist`
            })
        }

        if (exisitingCar.createdBy != userId) {
            return res.status(401).json({
                message: 'Sorry you cannot edit a post you did not create'
            })
        }
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            { ...req.body, 
                createdBy: userId },
            { returnOriginal: false }
        ).populate('createdBy', 'firstName lastName email')
        return res.status(200).json(updatedCar)
    } catch (error) {
        return res.status(400).json({
            message: 'Error while trying to get post, please try again.'
        })
    }
}

const deleteCarPost = async (req, res) => {
    const { carId, userId } = req.params
    try {
        const exisitingCar = await Car.findById(carId)
        if (!exisitingCar) {
            return res.status(404).json({
                message: `Post with this id  [${carId}] does not exist`
            })
        }
        if (exisitingCar.createdBy != userId) {
            return res.status(401).json({
                message: 'Sorry you cannot delete a post you did not create'
            })
        }

        await Car.findByIdAndDelete(carId);
        return res.status(200).json({ message: 'Post deleted Successfully ' })
    } catch (error) {
        return res.status(400).json({
            message: 'Error while trying to delete post, please try again.'
        })
    }
}


export default {
    createCarPost,
    editCarPost,
    getCarPostById,
    getAllCarPost,
    getUserPosts,
    deleteCarPost
}