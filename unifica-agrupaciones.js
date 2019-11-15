const jsonfile = require('jsonfile')

const agrupacionesGeo = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
const agrupacionesXls = jsonfile.readFileSync('./agrupaciones-xls.json')
const agrupacionesImg = jsonfile.readFileSync('./agrupacionesConImagenes.json')
const agrupacionesAud = jsonfile.readFileSync('./agrupacionesConAudios.json')
const agrupacionesTxt = jsonfile.readFileSync('./agrupacionesConTextiles.json')
const agrupacionesInfo = jsonfile.readFileSync('./agrupacionesInformacion.json')

let agrupaciones = agrupacionesGeo.map(a => {
  agrXls = agrupacionesXls.find(ax => ax.id === a.id)
  agrImg = agrupacionesImg.find(ai => ai.id === a.id)
  agrAud = agrupacionesAud.find(aa => aa.id === a.id)
  agrTxt = agrupacionesTxt.find(at => at.id === a.id)
  agrInfo = agrupacionesInfo.find(ai => ai.id === a.id)
  let agrupacionUnificada = {
    ...a,
    ...agrXls,
    ...agrImg,
    ...agrTxt,
    ...agrAud,
    ...agrInfo
  }
  let nombreMayuscula = agrupacionUnificada.NOM_AGRUP[0].toUpperCase() + agrupacionUnificada.NOM_AGRUP.substr(1)
  agrupacionUnificada.nombreCastellanizado = nombreMayuscula
  if (!agrupacionUnificada.fotografias) agrupacionUnificada.fotografias = []
  if (!agrupacionUnificada.audios) agrupacionUnificada.audios = []
  if (!agrupacionUnificada.textiles) agrupacionUnificada.textiles = []
  return agrupacionUnificada
})
console.log(agrupaciones)
jsonfile.writeFileSync('./agrupaciones-unificadas.json', agrupaciones)