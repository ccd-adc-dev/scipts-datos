const jsonfile = require('jsonfile')
const XLSX = require('xlsx')
const wb = XLSX.readFile(`./agrupaciones.xlsx`);
datos = XLSX.utils.sheet_to_json(wb.Sheets['Hoja1'])

jsonfile.writeFileSync('./agrupacionesInformacion.json', datos)


