var express = require('express')
var mongoose = require('mongoose')
var multer = require('multer')
var fs = require('fs')
var cors = require('cors')
var Post    = require('./post');
var bodyParser = require('body-parser');
var marked = require('marked')
const auth = require('basic-auth')

mongoose.connect('mongodb://mongo/olivia-server')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
var app = express()
app.set('views', './views')
app.set('view engine', 'pug')
app.use(cors({ origin: ['http://localhost:8080', 'http://45.62.119.193:8080'], credentials: true }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  Post.find({isPublished: true}, ['title', 'url', 'summary', 'tags', 'category', 'publishedAt', 'banner_bg']).sort({publishedAt: -1}).exec()
  .then(function(data) {
    res.json(data);
  }).catch(error => console.log(error))
})

app.get('/post/:url', function(req, res) {
  Post.findOne({ 'url': req.params.url }, 
  ['title', 'publishedAt', 'tags', 'category', 'text', 'banner_bg']).exec()
  .then(function(data) {
    res.json(data)
  })
})

app.get('/feed.xml', function (req, res) {
  Post.find(
    { isPublished: true }, 
    ['title', 'url', 'text', 'publishedAt', 'updatedAt']
  ).sort({publishedAt: -1}).exec()
  .then(data => {
    data.forEach(function(element) {
      element.text = marked(element.text);
    }, this);
    res.header('Content-Type', 'text/xml');
    res.render('rss', { myFeeds: data, pretty: true });
  })

});

app.use((req, res, next) => {
  let user = auth(req)

  if (user === undefined || user['name'] !== 'USERNAME' || user['pass'] !== 'PASSWORD') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
    res.end('Unauthorized')
  } else {
    next()
  }
})

app.get('/posts', function (req, res) {
  Post.find({}, ['title', 'url', 'summary', 'tags', 'category', 'updatedAt', 'isPublished', 'banner_bg']).sort({ updatedAt: -1 })
    .then(data => res.json(data))
    .catch(error => res.send(error));
});

app.get('/post-by-id/:id', function (req, res) {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => res.send(error));
});

// curl -X POST http://localhost:1102/post
app.post('/post', function (req, res) {
  new Post().save()
    .then(post => res.json(post))
    .catch(error => res.send(error));
});

app.patch('/post/publish/:id', function (req, res) {
  const { url } = req.body;
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { isPublished: true, url, publishedAt: Date.now() },
    { new: true }
  )
    .then(post => res.json(post))
    .catch(error => res.send(error));
});

app.patch('/post/unpublish/:id', function (req, res) {
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { isPublished: false },
    { new: true }
  )
    .then(post => res.json(post))
    .catch(error => res.send(error));
});

// curl -X PATCH --data '{"text":"Test with CURL PatchAA"}' --header "Content-Type:application/json" http://localhost:1102/post/59c72238acaf920309cdc1c1
app.patch('/post/:id', function (req, res) {

  let { summary, category, tags, text, title, url, banner_bg } = req.body;
  let content = undefined;
  if (text) {
    const titleArray = /^(# )?(.*)\n?/.exec(text);
    title = titleArray ? titleArray[2] : undefined;
    content = text.replace(/^(# )?(.*)\n?/, '').trim();
    if (!summary) {
      const summaryArray = /\n(.+)\n?/.exec(text);
      summary = summaryArray ? summaryArray[1] : undefined;
    }
  }

  Post.findOneAndUpdate(
    { _id: req.params.id },
    JSON.parse(JSON.stringify({ text: content, updatedAt: new Date(), title, summary, category, tags, url, banner_bg })),
    { new: true }
  )
    .then(post => res.json(post))
    .catch(error => res.send(error));
});

// curl -X DELETE http://localhost:1102/post/59c7149d9e4a2101f1e7904a
app.delete('/post/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id)
  .then(data => res.send(data))
  .catch(error => res.send(error));
});

// curl -F 'avatar=@/Users/movier/Downloads/so-young-1.md' http://localhost:3000/profile
app.post('/profile', upload.single('avatar'), function (req, res, next) {
   fs.readFile(req.file.path, 'utf8', function (err, data) {
    if (err) throw err

    var title = /title: (.*)/.exec(data)[1]
    var url = req.file.filename.split('.')[0]
    var date = /date: (.*)/.exec(data)[1]
    var tags = /tags: \[(.*)\]/.exec(data)[1].split(',')
    var categoryArr = /categories: (.*)/.exec(data)
    if (categoryArr == null) {
      res.send(req.file.originalname + ': Missing category')
      return
    }
      
    var category = /categories: (.*)/.exec(data)[1]
    var content = /---\n((.|\n)*)/.exec(data)[1]
    var summary = content.slice(0, 200)

    var post = new Post({
      title: title,
      url: url,
      date: date,
      tags: tags,
      category: category,
      content: content,
      summary: summary
    })

    post.save(function (err) {
      if (err) {
        res.send(err)
      } else {
        res.send(post._id)
      }
    })
  })
})

app.get('/migrate', function (req, res) {
  Post.find({}).exec()
    .then(data => {
      data.forEach(function (element) {
        element.isPublished = true;
        element.createdAt = element.date;
        element.updatedAt = element.date;
        element.text = `# ${element.title}\n\n${element.content}`;
        element.publishedAt = element.date;
        element.save(function (err) {
          if (err) {
            throw err;
          }
        });
      })
      res.send('ok');
    })
    .catch(error => console.error(error));
});

app.listen(1102, function () {
  console.log('Example app listening on port 1102!')
})
