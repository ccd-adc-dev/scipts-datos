const jsonfile = require('jsonfile')

const variantesImgs = jsonfile.readFileSync('./variantesConImagenes.json')
const variantes = jsonfile.readFileSync('./jsons-geo/variantes.json')
let agrupaciones = jsonfile.readFileSync('./agrupacionesConImagenes.json')

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
// console.log('variantes con', variantes.filter(el => el.fotografias.length).length)
console.log('antes: agrupaciones con', agrupaciones.filter(el => el.fotografias.length).length)
// console.log('variantes sin', variantes.filter(el => el.fotografias.length === 0).length)
console.log('antes: agrupaciones sin', agrupaciones.filter(el => el.fotografias.length === 0).length)



let variantesConImagenes = variantesImgs.filter(v => v.fotografias.length)

variantesConImagenes.forEach(v => {
  let vari = variantes.find(vr => vr.id === v.id)
  let a = agrupaciones.find(a => a.id === vari.agrupacionId)
  console.log(a.id, a.fotografias.length)
  a.fotografias = [...a.fotografias, ...v.fotografias]
  console.log('--> ', a.fotografias.length)

})

console.log('antes: agrupaciones con', agrupaciones.filter(el => el.fotografias.length).length)
// console.log('variantes sin', variantes.filter(el => el.fotografias.length === 0).length)
console.log('antes: agrupaciones sin', agrupaciones.filter(el => el.fotografias.length === 0).length)

jsonfile.writeFileSync('./agrupacionesConImagenes.json', agrupaciones)