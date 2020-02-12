import fs from 'fs';

const readFile = (uri, format) => new Promise((resolve, reject) => {
  fs.readFile(uri, format, (err, data) => {
    if (err)
      reject(err)
    resolve(data)
  })
})

const writeFile = (uri, file) => new Promise((resolve, reject) => {
  fs.writeFile(uri, file, (err) => {
    if (err)
      reject(err)
    resolve()
  });
})


export { readFile, writeFile }