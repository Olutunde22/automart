import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes.js'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static('public'))
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/', router)
app.use((req, res) => {
	return res.status(404).json({
		message: `Sorry!, can't find ${req.get('host')}${req.url}`,
	});
});
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})

mongoose.connect(
    process.env.MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err) => {
        if (err) {
            console.log('Error connecting to the database', err)
        }
        console.log('Connected to MongoDB.')
    }
)

app.listen(port, () =>
    console.log('Server listening on port ' + port)
)