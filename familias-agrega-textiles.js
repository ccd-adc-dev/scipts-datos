const jsonfile = require('jsonfile')

const familias = jsonfile.readFileSync('./jsons-geo/familias.json')
const textiles = jsonfile.readFileSync('./textilesConUrls.json')

let familiasTextiles = familias.map(f => {
  return {
    id: f.id,
    textiles: textiles.filter(t => t.familiaId === f.id)
  }
})

jsonfile.writeFileSync('./familiasConTextiles.json', familiasTextiles)