import { Schema, model } from 'mongoose'

// create our schema
const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Post = model('Post', postSchema)

export default Post
