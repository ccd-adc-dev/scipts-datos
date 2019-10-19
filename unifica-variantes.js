const jsonfile = require('jsonfile')

const variantesGeo = jsonfile.readFileSync('./jsons-geo/variantes.json')
// const variantesXls = jsonfile.readFileSync('./variantes-xls.json')
const variantesImg = jsonfile.readFileSync('./variantesConImagenes.json')
// const variantesAud = jsonfile.readFileSync('./variantesConAudios.json')
// const variantesText = jsonfile.readFileSync('./variantesConTextiles.json')

let variantes = variantesGeo.map(v => {
  // variXls = variantesXls.find(fx => fx.id === v.id)
  variImg = variantesImg.find(vi => vi.id === v.id)
  variTxt = variantesText.find(vt => vt.id === v.id)

  // variAud = variantesAud.find(fa => fa.id === v.id)
  varianteUnificada = {
    ...v,
    // ...variXls,
    ...variImg,
    // ...variTxt,
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