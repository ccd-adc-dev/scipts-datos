const jsonfile = require('jsonfile')

const agrupacionesAuds = jsonfile.readFileSync('./agrupacionesConAudios.json')
const agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
let familias = jsonfile.readFileSync('./familiasConAudios.json')

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}
// console.log('agrupaciones con', agrupaciones.filter(el => el.audios.length).length)
console.log('antes: familias con', familias.filter(el => el.audios.length).length)
// console.log('agrupaciones sin', agrupaciones.filter(el => el.audios.length === 0).length)
console.log('antes: familias sin', familias.filter(el => el.audios.length === 0).length)



let agrupacionesConAudios = agrupacionesAuds.filter(a => a.audios.length)

agrupacionesConAudios.forEach(a => {
  let vari = agrupaciones.find(ag => ag.id === a.id)
  let f = familias.find(f => f.id === vari.familiaId)
  console.log(f.id, f.audios.length)
  f.audios = [...f.audios, ...a.audios]
  console.log('--> ', f.audios.length)

})

console.log('antes: familias con', familias.filter(el => el.audios.length).length)
// console.log('agrupaciones sin', agrupaciones.filter(el => el.audios.length === 0).length)
console.log('antes: familias sin', familias.filter(el => el.audios.length === 0).length)

jsonfile.writeFileSync('./familiasConAudios.json', familias)