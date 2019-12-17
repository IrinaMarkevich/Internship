const fs = require('fs')
const Mustache = require('mustache')
const template = require('./template.html')
const data = './data.json'
const output = './build.html'

function createHtml (dataPath, templatePath, outputPath, callback) {
  callback()
}

createHtml(data, template, output, () => {
  console.log('1 step')
  fs.readFile(data, 'utf-8', function (err, data) {
    if (err) throw err
    else {
      const record = Mustache.render(template, JSON.parse(data))
      console.log('2 step')
      return createHtml(data, template, output, () => {
        fs.writeFile(output, record, function (err, data) {
          if (err) throw err
          else {
            console.log('3 step')
            console.log('Data has been recorded!')
          }
        })
      })
    }
  })
})
