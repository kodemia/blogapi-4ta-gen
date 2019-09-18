
const Post = require('../models/post')

function create ({ title, date, readTime, description, author, image }) {
  const newPost = new Post({
    title,
    date,
    readTime,
    description,
    author,
    image
  })
  return newPost.save()
}

function getAll () {
  return Post.find()
}

function deleteById (id) {
  return Post.findByIdAndDelete(id)
}

function updateById (id, postData) {
  return Post.findByIdAndUpdate(id, postData)
}

module.exports = {
  create,
  getAll,
  deleteById,
  updateById
}
