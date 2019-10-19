const XLSX = require('xlsx')
const jsonfile = require('jsonfile')

var wbTextiles = XLSX.readFile(`./textiles-metadatos.xlsx`);

let textiles = XLSX.utils.sheet_to_json(wbTextiles.Sheets['Hoja1'])

jsonfile.writeFileSync('./textiles.json', textiles)
