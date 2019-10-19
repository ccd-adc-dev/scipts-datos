const jsonfile = require('jsonfile')

const agrupacionesGeo = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
const agrupacionesXls = jsonfile.readFileSync('./agrupaciones-xls.json')
const agrupacionesImg = jsonfile.readFileSync('./agrupacionesConImagenes.json')
const agrupacionesAud = jsonfile.readFileSync('./agrupacionesConAudios.json')

let agrupaciones = agrupacionesGeo.map(a => {
  agrXls = agrupacionesXls.find(fx => fx.id === a.id)
  agrImg = agrupacionesImg.find(fi => fi.id === a.id)
  agrAud = agrupacionesAud.find(fa => fa.id === a.id)
  return {...a, ...agrXls, ...agrImg, ...agrAud}
})
console.log(agrupaciones)
jsonfile.writeFileSync('./agrupaciones-unificadas.json', agrupaciones)