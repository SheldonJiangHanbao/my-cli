const fs = require('fs')
const p = require('path')
const deleteFolder = (path) => {
  let files = []
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path)
    files.forEach(function(file, index){
      let curPath = p.join(path, file)
      if(fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath)
      } else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}
module.exports = deleteFolder
