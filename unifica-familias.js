const jsonfile = require('jsonfile')

const familiasGeo = jsonfile.readFileSync('./jsons-geo/familias.json')
const familiasXls = jsonfile.readFileSync('./familias-xls.json')
const familiasImg = jsonfile.readFileSync('./familiasConImagenes.json')

let familias = familiasGeo.map(f => {
  famXls = familiasXls.find(fx => fx.id === f.id)
  famImg = familiasImg.find(fi => fi.id === f.id)
  return {...f, ...famXls, ...famImg}
})
console.log(familias)
jsonfile.writeFileSync('./familias-unificadas.json', familias)