const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const imageManager = require('../lib/image-manager')

router.get('/:album/:imageName?', function (req, res, next) {
  const album = req.params.album
  const imageName = req.params.imageName
  const startYear = parseInt(album.split('-')[0], 10)
  if (!startYear) return next()
  const endYear = parseInt(album.split('-')[1], 10)
  const albumImages = endYear ? imageManager.getByYears([startYear, endYear]) : imageManager.getByYear([startYear])
  const selectedImage = albumImages.find(img => img.fileName === (imageName + '.jpg')) || albumImages[0]
  res.render('album', {
    albums,
    i18n: res,
    albumImages,
    url: req.url,
    selectedImage,
    currentUrl: req.url.replace('/' + imageName, '')
  })
})

router.get('/', function (req, res, next) {
  res.render('index', {
    albums,
    i18n: res,
    url: req.url
  })
})

module.exports = router