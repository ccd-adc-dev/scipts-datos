const jsonfile = require('jsonfile')
const fs = require('fs')
const XLSX = require('xlsx')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 

const variantes = jsonfile.readFileSync('./jsons-geo/variantes.json')

variantes.forEach(v => {
  if (!v.fotografias) v.fotografias = []
  console.log(v)
  let content = fs.readdirSync(`./imagenes-audios/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias`) 
  let metadatos = content.find(c => c.includes('.xls'))
  let datos = [{ID: '1', creditos: '', propiedad: ''}]
  if (metadatos && content.length > 1) {
    const wb = XLSX.readFile(`./imagenes-audios/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias/metadatos.xlsx`);
    datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
    console.log('DATOOOOOOS', v.id, datos)
  }
  content.forEach( (c,i) => {

    if ( !c.includes('.xls')) {
      console.log(v.id, c)
      cloudinary.uploader.upload(
        `./imagenes-audios/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias/${c}`,
        { public_id: `inali/imagenes/${v.familiaId}/${v.agrupacionId}/${v.id}/fotografias/${v.id}-${c}` }
      ).then(function (imagen) {
        let imagenDatos = datos.find(d => d.ID === c) ? datos.find(d => d.ID === c) : datos[0] 
        console.log(v.id, imagen.url, imagen.public_id)
        console.log('___________', imagenDatos)
        v.fotografias.push({
          id: imagen.public_id,
          url: imagen.url,
          nombreArchivo: imagenDatos && imagenDatos.ID ? imagenDatos.ID : c,
          creditos: imagenDatos && imagenDatos.creditos ? imagenDatos.creditos : '' ,
          propiedad: imagenDatos && imagenDatos.propiedad ? imagenDatos.propiedad : '' 
        })
      }).catch(function (err) {
        console.log();
        console.log("** File Upload (Promise)");
        if (err) { console.warn(err); }
      });
    }   
  })

})

setTimeout(() => {
  let variantesConImagenes = variantes.map(v => {
    return {
      id: v.id,
      fotografias: v.fotografias
    }
  })
  console.log(variantesConImagenes);
  
  jsonfile.writeFileSync('./variantesConImagenes.json', variantesConImagenes)
}, 40000)
