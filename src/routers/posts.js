
const express = require('express')

const post = require('../usecases/post')

const router = express.Router()

router.post('/', async (request, response) => {
  try {
    const newPostData = request.body
    const newPost = await post.create(newPostData)

    response.json({
      success: true,
      message: 'post created',
      data: {
        post: newPost
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.get('/', async (request, response) => {
  try {
    const allPosts = await post.getAll()
    response.json({
      success: true,
      message: 'All posts',
      data: {
        posts: allPosts
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})

router.delete('/:id', async (request, response) => {

  try {
    const { id } = request.params
  
    const deletedPost = await post.deleteById(id)
    response.json({
      success: true,
      message: `Post ${id} deleted`,
      data: {
        post: deletedPost
      }
    })

  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }

})
router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const {
      title,
      description,
      author,
      readTime,
      date,
      image
    } = request.body

    const postData = {
      title,
      description,
      author,
      readTime,
      date,
      image
    }

    const postUpdated = await post.updateById(id, postData)
    response.json({
      success: true,
      message: `Post ${id} updated`,
      data: {
        post: postUpdated
      }
    })
  } catch (error) {
    response.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    })
  }
})


module.exports = router
