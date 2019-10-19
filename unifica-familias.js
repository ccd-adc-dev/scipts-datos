const jsonfile = require('jsonfile')

const familiasGeo = jsonfile.readFileSync('./jsons-geo/familias.json')
const familiasXls = jsonfile.readFileSync('./familias-xls.json')
const familiasImg = jsonfile.readFileSync('./familiasConImagenes.json')
const familiasAud = jsonfile.readFileSync('./familiasConAudios.json')
const familiasTxt = jsonfile.readFileSync('./familiasConTextiles.json')

let familias = familiasGeo.map(f => {
  famXls = familiasXls.find(fx => fx.id === f.id)
  famImg = familiasImg.find(fi => fi.id === f.id)
  famAud = familiasAud.find(fa => fa.id === f.id)
  famTxt = familiasTxt.find(fa => fa.id === f.id)
  return {
    ...f,
    ...famXls,
    ...famImg,
    ...famAud,
    ...famTxt
  }
})
console.log(familias)
jsonfile.writeFileSync('./familias-unificadas.json', familias)