const fs = require('fs')
const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./jsons-geo/familias.json')
let agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
let variantes = jsonfile.readFileSync('./jsons-geo/variantes.json')

console.log('familias', familias.length)
console.log('agrupaciones', agrupaciones.length)
console.log('variantes', variantes.length)

familias.forEach(f => {

  // fs.createReadStream('./metadatos.xlsx').pipe(fs.createWriteStream(`./arbol/${f.id}/audios/metadatos.xlsx`));  
  // fs.createReadStream('./metadatos.xlsx').pipe(fs.createWriteStream(`./arbol/${f.id}/textiles/metadatos.xlsx`));  
  // fs.createReadStream('./metadatos.xlsx').pipe(fs.createWriteStream(`./arbol/${f.id}/fotografias/metadatos.xlsx`));  

  // if (!fs.existsSync(`./lenguas/${f.id}`)){
  //   fs.mkdirSync(`./lenguas/${f.id}`)
  // } //else {
  //   fs.mkdirSync(`./arbol/${f.id}/audios`)
  //   fs.mkdirSync(`./arbol/${f.id}/textiles`)
  //   fs.mkdirSync(`./arbol/${f.id}/fotografias`)
  // }
      
})
    
agrupaciones.forEach(a => {
      
  // fs.createReadStream('./metadatos.xlsx').pipe(
  //   fs.createWriteStream(`./arbol/${a.familiaId}/${a.id}/audios/metadatos.xlsx`)
  // );  
  // fs.createReadStream('./metadatos.xlsx').pipe(
  //   fs.createWriteStream(`./arbol/${a.familiaId}/${a.id}/textiles/metadatos.xlsx`)
  // );  
  // fs.createReadStream('./metadatos.xlsx').pipe(
  //   fs.createWriteStream(`./arbol/${a.familiaId}/${a.id}/fotografias/metadatos.xlsx`)
  // );  

  // if ( ! fs.existsSync(`./lenguas/${a.familiaId}/${a.id}`) ){
  //   fs.mkdirSync(`./lenguas/${a.familiaId}/${a.id}`)
  // } //else {
  //   fs.mkdirSync(`./arbol/${a.familiaId}/${a.id}/audios`)
  //   fs.mkdirSync(`./arbol/${a.familiaId}/${a.id}/textiles`)
  //   fs.mkdirSync(`./arbol/${a.familiaId}/${a.id}/fotografias`)
  // }

})

variantes.forEach(v => {
  
//   fs.createReadStream('./metadatos.xlsx').pipe(
//     fs.createWriteStream(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/audios/metadatos.xlsx`)
//   );  
//   fs.createReadStream('./metadatos.xlsx').pipe(
//     fs.createWriteStream(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/textiles/metadatos.xlsx`)
//   );  
//   fs.createReadStream('./metadatos.xlsx').pipe(
//     fs.createWriteStream(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias/metadatos.xlsx`)
//   ); 
  if ( ! fs.existsSync(`./lenguas/${v.familiaId}/${v.agrupacionId}/${v.id}`) ){
    fs.mkdirSync(`./lenguas/${v.familiaId}/${v.agrupacionId}/${v.id}`)
  } // else {
//   //   fs.mkdirSync(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/audios`)
//   //   fs.mkdirSync(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/textiles`)
//   //   fs.mkdirSync(`./arbol/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias`)
//   // }
  
})