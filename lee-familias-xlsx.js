const XLSX = require('xlsx')
const jsonfile = require('jsonfile')
var wbFamilias = XLSX.readFile(`./excels/familias.xlsx`);
var wbFamsInfo = XLSX.readFile(`./excels/familias-informacion.xlsx`);
let familias = XLSX.utils.sheet_to_json(wbFamilias.Sheets['Sheet1'])
const familiasInfo = XLSX.utils.sheet_to_json(wbFamsInfo.Sheets['Hoja1'])


familias = familias.map(f => {
  f.informacion = familiasInfo.find(fi => fi.id === f.id).informacion
  return f
})

jsonfile.writeFileSync('./familias-xls.json', familias)
