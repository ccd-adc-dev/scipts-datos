const fs = require('fs')
const jsonfile = require('jsonfile')
const XLSX = require('xlsx')


let familias = jsonfile.readFileSync('./jsons-geo/familias.json')
let agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')
let variantes = jsonfile.readFileSync('./jsons-geo/variantes.json')

let familiasAudiosMetadatos = familias.map(f => {

  const wb = XLSX.readFile(`./imagenes-audios/${f.id}/audios/metadatos.xlsx`);
  let datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
  console.log('DATOOOOOOS', f.id, datos)   
  return {
    id: f.id,
    audiosMetadatos: datos
  }

})

jsonfile.writeFileSync('./familias-audios-metadatos.json', familiasAudiosMetadatos)


let agrupacionesAudiosMetadatos = agrupaciones.map(a => {
  
  const wb = XLSX.readFile(`./imagenes-audios/${a.familiaId}/${a.id}/audios/metadatos.xlsx`);
  let datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
  let datos2 = XLSX.utils.sheet_to_json(wb.Sheets['Hoja1'])
  console.log('DATOOOOOOS', a.id, datos)   
  if (datos2.length > datos.length) datos = datos2
  return {
    id: a.id,
    familiaId: a.familiaId,
    audiosMetadatos: datos.map(d => {
      if (!d.ID) d.ID = d.id
      return d
    })
  }

})

jsonfile.writeFileSync('./agrupaciones-audios-metadatos.json', agrupacionesAudiosMetadatos)


let variantesAudiosMetadatos = variantes.map(v => {
  
  const wb = XLSX.readFile(`./imagenes-audios/${v.familiaId}/${v.agrupacionId}/${v.id}/audios/metadatos.xlsx`);
  let datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
  console.log('DATOOOOOOS', v.id, datos)   
  return {
    id: v.id,
    familiaId: v.familiaId,
    agrupacionId: v.agrupacionId,
    audiosMetadatos: datos
  }

})
jsonfile.writeFileSync('./variantes-audios-metadatos.json', variantesAudiosMetadatos)


