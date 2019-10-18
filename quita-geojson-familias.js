const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./familias-unificadas.json')

familias = familias.map(f => {
  delete f['geojson']
  return f
})

jsonfile.writeFileSync('./familias-unificadas-sin-geojson.json', familias)
