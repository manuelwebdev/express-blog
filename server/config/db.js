import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGO_DB_URI)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
