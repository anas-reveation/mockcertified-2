const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['redirectBlog'] = require('..\\middleware\\redirectBlog.js')
middleware['redirectBlog'] = middleware['redirectBlog'].default || middleware['redirectBlog']

export default middleware
