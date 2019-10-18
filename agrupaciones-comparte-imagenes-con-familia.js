const jsonfile = require('jsonfile')

const agrupacionesImgs = jsonfile.readFileSync('./agrupacionesConImagenes.json')
const agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
let familias = jsonfile.readFileSync('./familiasConImagenes.json')

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
// console.log('agrupaciones con', agrupaciones.filter(el => el.fotografias.length).length)
console.log('antes: familias con', familias.filter(el => el.fotografias.length).length)
// console.log('agrupaciones sin', agrupaciones.filter(el => el.fotografias.length === 0).length)
console.log('antes: familias sin', familias.filter(el => el.fotografias.length === 0).length)



let agrupacionesConImagenes = agrupacionesImgs.filter(a => a.fotografias.length)

agrupacionesConImagenes.forEach(a => {
  let vari = agrupaciones.find(ag => ag.id === a.id)
  let f = familias.find(f => f.id === vari.familiaId)
  console.log(f.id, f.fotografias.length)
  f.fotografias = [...f.fotografias, ...a.fotografias]
  console.log('--> ', f.fotografias.length)

})

console.log('antes: familias con', familias.filter(el => el.fotografias.length).length)
// console.log('agrupaciones sin', agrupaciones.filter(el => el.fotografias.length === 0).length)
console.log('antes: familias sin', familias.filter(el => el.fotografias.length === 0).length)

jsonfile.writeFileSync('./familiasConImagenes.json', familias)