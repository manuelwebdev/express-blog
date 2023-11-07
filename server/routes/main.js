import express from 'express'

const router = express.Router()

// Routes
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
