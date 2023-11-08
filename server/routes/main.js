import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

// ROUTES

/*** GET
 * HOME - POSTS
 */
router.get('', async (req, res) => {
  try {
    const locals = {
      title: 'Home blog',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit montes.',
    }
    let perPage = 10
    let page = req.query.page || 1

    const posts = await Post.aggregate({ $sort: { createdAt: -1 } })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await Post.countDocuments()
    const nextPage = parseInt(page) + 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    res.render('index', {
      locals,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    })
  } catch (error) {
    console.log(error)
  }
})

/** GET
 * Post :id
 */
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id

    const post = await Post.findById({ _id: slug })
    const locals = {
      title: post?.title,
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit montes.',
    }
    res.render('post', { locals, post })
  } catch (error) {
    console.log(error)
  }
})

router.get('/about', (req, res) => {
  res.render('about')
})

// Exports
export default router

// ? POPULATE DATA
// const populatePostData = async () => {
//   Post.insertMany([
//     {
//       title: 'Tech Trends and Innovations',
//       body: 'Stay updated on the latest tech trends and groundbreaking innovations in the world of technology.',
//     },
//     {
//       title: 'Health and Wellness',
//       body: 'Explore the path to a healthier lifestyle and well-being through my personal experiences and tips.',
//     },
//     {
//       title: 'A Journey Through Literature',
//       body: "Let's dive into the world of books, exploring different genres and authors that have captivated my imagination.",
//     },
//   ])
// }
// populatePostData()

// ? GET - POSTS
// router.get('', async (req, res) => {
//   const locals = {
//     title: 'Home blog',
//     description:
//       'Lorem ipsum dolor sit amet consectetur adipiscing elit montes.',
//   }
//   try {
//     const posts = await Post.find()
//     res.render('index', { locals, posts })
//   } catch (error) {
//     console.log(error)
//   }
// })
