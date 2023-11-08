import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

// ROUTES

// GET - HOME
router.get('', (req, res) => {
  const locals = {
    title: 'Home blog',
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit montes pulvinar habitasse porta, hendrerit volutpat hac posuere blandit interdum suspendisse mi ligula. Curabitur tempus vitae pellentesque donec mi per auctor etiam elementum dui, arcu augue urna rhoncus natoque dignissim lacus sollicitudin pulvinar magnis, aenean pharetra felis blandit iaculis justo erat ultricies duis. ',
  }

  res.render('index', { locals })
})

router.get('/about', (req, res) => {
  res.render('about')
})

// Exports
export default router

// const populatePostData = async () => {
//   Post.insertMany([
//     {
//       title: 'Starting a blog',
//       body: 'This is my first blog',
//     },
//     {
//       title: 'Exploring the Great Outdoors',
//       body: "In this blog, I'll share my adventures and experiences in the wilderness.",
//     },
//     {
//       title: 'Traveling the World',
//       body: 'Join me on a journey around the globe as I visit amazing destinations and meet new cultures.',
//     },
//     {
//       title: 'The Art of Cooking',
//       body: 'Discover the world of culinary delights as I explore new recipes and cooking techniques.',
//     },
//   ])
// }
// populatePostData()
