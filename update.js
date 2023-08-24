const opcodesData = require('./new_opcodes.json')
const fs = require('fs')

function getOpcodesInfo(jsonData) {
  for (let i = 0; i < jsonData.length; i++) {
    jsonData[i].index = '0x' + i.toString(16)
  }

  const jsonContent = JSON.stringify(jsonData, null, 2)
  fs.writeFile('indexed_opcodes.json', jsonContent, (err) => {
    if (err) {
      console.error('Error writing JSON file:', err)
    } else {
      console.log('JSON file saved successfully!')
    }
  })

  return jsonData
}

console.log(getOpcodesInfo(opcodesData))
