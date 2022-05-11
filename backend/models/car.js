import mongoose from 'mongoose'

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        imageUrl: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        year: String,
        condition: {
            type: String,
            enum: ['Nigerian Used', 'Brand New', 'Foreign Used'],
            required: [true, 'Select the car condition']
        },
        make: {
            type: String,
            enum: ['Toyota', 'Mercedes-Benz', 'Lexus', 'Honda', 'Ford'],
            required: [true, 'Select the car make']
        },
        body: {
            type: String,
            enum: ['Van', 'Suv', 'Sedan', 'Pickup'],
            required: [true, 'Select the car body']
        },
        color: {
            type: String,
            required: [true, 'Please select a color']
        },
        price: {
            type: Number,
            required: [true, 'Please Enter the price of the car']
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
        }
    },
    { timestamps: true } //This stores the createdAt and updatedAt time of the model
)

const Car = new mongoose.model('Car', carSchema)

export default Car