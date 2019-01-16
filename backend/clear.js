var mongoose = require('mongoose');
var fs = require('fs')
var Post    = require('./post');

const path = 'uploads/'

mongoose.connect('mongodb://mongo/olivia-server')

fs.readdirSync(path).forEach(
  filename => fs.unlink(path + filename)
)

Post.remove({}, err => err ? console.log(err) : process.exit())
