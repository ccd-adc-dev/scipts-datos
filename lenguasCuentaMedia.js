const jsonfile = require('jsonfile')

const familias = jsonfile.readFileSync('./familias-unificadas.json')
const agrupaciones = jsonfile.readFileSync('./agrupaciones-unificadas.json')
const variantes = jsonfile.readFileSync('./variantes-unificadas.json')

console.log('FAMILIAS')
familias.forEach(f => {
  console.log(
    f.id,
    'f: ' + f.fotografias.length,
    'a: ' + f.audios.length,
    't: ' + f.textiles.length
  )
})

console.log('--------')
console.log()

console.log('AGRUPACIONES')
agrupaciones.forEach(a => {
  console.log(
    a.id,
    'f: ' + a.fotografias.length,
    'a: ' + a.audios.length,
    't: ' + a.textiles.length
  )
})

console.log('--------')
console.log()

console.log('VARIANTES')
variantes.forEach(v => {
  console.log(
    v.id,
    'f: ' + v.fotografias.length,
    'a: ' + v.audios.length,
    't: ' + v.textiles.length
  )
})


