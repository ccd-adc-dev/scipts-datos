const jsonfile = require('jsonfile')

const XLSX = require('xlsx')
var wb = XLSX.readFile(`./excels/agrupaciones-riesgo.xlsx`);
const agrupaciones = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])

jsonfile.writeFileSync('./agrupaciones-riesgo.json', agrupaciones)