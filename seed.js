const fs = require('fs');
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');
let root;


fetch("https://boardgamegeek.com/thread/1413932/word-list")
  .then (res => res.text())
  .then (body => root = HTMLParser.parse(body))
  .then (() => seedData(root))

function seedData(root){
  let dataObject = root.querySelector('#body_article21511664').querySelector('dd.right').innerHTML.trim().toLowerCase().split('<br />')
  dataObject = dataObject.filter((word) => word!=="")
  const fileContent = compileObject(dataObject)

  function compileObject(dataObject){
    let fileContent
    fileContent = {}
    fileContent['words'] = dataObject
    fileContent['cards'] = []
    fileContent['boards'] = []
    return fileContent
  }

  fs.writeFile('./db.json',JSON.stringify(fileContent), function(err) {
    if (err) throw err;
    console.log('successfully saved file')
  })
}
