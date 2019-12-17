const fs = require('fs')
const Mustache = require('mustache')
const template = require('./template.html')
const data = './data.json'
const output = './build.html'

function writeFile (outputPath, record) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(outputPath, record, function (err, data) {
      if (err) {
        reject(err)
      } else {
        console.log('3 step')
        console.log('Data has been recorded!')
        resolve()
      }
    })
  })
}

function readFile (dataPath, templatePath) {
  return new Promise(function (resolve, reject) {
    fs.readFile(dataPath, 'utf-8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        console.log('2 step')
        resolve(Mustache.to_html(templatePath, JSON.parse(data)))
      }
    })
  })
}

async function createHtml (dataPath, templatePath, outputPath) {
  console.log('1 step')
  const html = await readFile(dataPath, templatePath)
  return writeFile(outputPath, html)
}

createHtml(data, template, output)
