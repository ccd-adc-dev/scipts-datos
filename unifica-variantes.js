const jsonfile = require('jsonfile')

const variantesGeo = jsonfile.readFileSync('./jsons-geo/variantes.json')
// const variantesXls = jsonfile.readFileSync('./variantes-xls.json')
const variantesImg = jsonfile.readFileSync('./variantesConImagenes.json')
// const variantesAud = jsonfile.readFileSync('./variantesConAudios.json')

let variantes = variantesGeo.map(a => {
  // variXls = variantesXls.find(fx => fx.id === a.id)
  variImg = variantesImg.find(fi => fi.id === a.id)

  // variAud = variantesAud.find(fa => fa.id === a.id)
  varianteUnificada = {
    ...a,
    // ...variXls,
    ...variImg,
    // ...variAud
  }
  let nombreMayuscula = varianteUnificada.NOM_VAR[0].toUpperCase() + varianteUnificada.NOM_VAR.substr(1)
  varianteUnificada.nombreCastellanizado = nombreMayuscula
  if (!varianteUnificada.fotografias) varianteUnificada.fotografias = []
  if (!varianteUnificada.audios) varianteUnificada.audios = []
  if (!varianteUnificada.textiles) varianteUnificada.textiles = []
  return varianteUnificada
})
console.log(variantes)
jsonfile.writeFileSync('./variantes-unificadas.json', variantes)