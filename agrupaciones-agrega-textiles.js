const jsonfile = require('jsonfile')

const agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
const textiles = jsonfile.readFileSync('./textilesConUrls.json')

let agrupacionesTextiles = agrupaciones.map(a => {
  return {
    id: a.id,
    textiles: textiles.filter(t => t.agrupacionId === a.id)
  }
})

jsonfile.writeFileSync('./agrupacionesConTextiles.json', agrupacionesTextiles)