const jsonfile = require('jsonfile')

let agrupacionAudios = jsonfile.readFileSync('./agrupacionesConAudios.json')
let agrupacionsMetadatosAudios = jsonfile.readFileSync('./agrupaciones-audios-metadatos.json')

console.log(agrupacionAudios.length)
console.log(agrupacionsMetadatosAudios.length)

agrupacionesAudios = agrupacionAudios.map(a => {
  let metadatos = agrupacionsMetadatosAudios.find(am => am.id === a.id)
  console.log(a.id, a.audios.length, metadatos.audiosMetadatos.length)
})