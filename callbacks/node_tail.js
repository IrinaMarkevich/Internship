const fs = require('fs')
const Mustache = require('mustache')
const template = require('./template.html')

const stream = new fs.ReadStream('data.json', { encoding: 'utf-8' })

stream.on('readable', function () {
  const data = stream.read()
  const writableStream = fs.createWriteStream('build.html')
  if (data != null) {
    writableStream.write(Mustache.render(template, JSON.parse(data)))
  }

  writableStream.end()

  writableStream.on('error', err => console.log(err))
})

stream.on('end', function () {
  console.log('Data has been recorded!')
})

stream.on('error', function (err) {
  if (err.code === 'ENOENT') {
    console.log('File not found')
  } else {
    console.error(err)
  }
})
