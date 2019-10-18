const XLSX = require('xlsx')
const jsonfile = require('jsonfile')
var wb = XLSX.readFile(`./excels/agrupaciones.xlsx`);
const agrupaciones = XLSX.utils.sheet_to_json(wb.Sheets['Hoja 1'])
jsonfile.writeFileSync('./agrupaciones-xls.json', agrupaciones)
const agrsSinLugares = agrupaciones.map(a => {
  delete a['lugares']
  return a
})
jsonfile.writeFileSync('./agrupacionesSinLugares-xls.json', agrsSinLugares)
