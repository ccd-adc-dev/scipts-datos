const jsonfile = require('jsonfile')
const fs = require('fs')
const XLSX = require('xlsx')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 

const agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')

agrupaciones.forEach(a => {
  if (!a.fotografias) a.fotografias = []
  let content = fs.readdirSync(`./imagenes-audios/${a.familiaId}/${a.id}/fotografias`) 
  let metadatos = content.find(c => c.includes('.xls'))
  let datos = [{ID: '1', creditos: '', propiedad: ''}]
  if (metadatos && content.length > 1) {
    const wb = XLSX.readFile(`./imagenes-audios/${a.familiaId}/${a.id}/fotografias/metadatos.xlsx`);
    datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
    console.log('DATOOOOOOS', a.id, datos)
  }
  content.forEach( (c,i) => {

    if ( !c.includes('.xls')) {
      console.log(a.id, c)
      cloudinary.uploader.upload(
        `./imagenes-audios/${a.familiaId}/${a.id}/fotografias/${c}`,
        { public_id: `inali/imagenes/${a.familiaId}/${a.id}/fotografias/${a.id}-${c}` }
      ).then(function (imagen) {
        let imagenDatos = datos.find(d => d.ID === c) ? datos.find(d => d.ID === c) : datos[0] 
        console.log(a.id, imagen.url, imagen.public_id)
        console.log('___________', imagenDatos)
        a.fotografias.push({
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
  let agrupacionesConImagenes = agrupaciones.map(a => {
    return {
      id: a.id,
      fotografias: a.fotografias
    }
  })
  console.log(agrupacionesConImagenes);
  
  jsonfile.writeFileSync('./agrupacionesConImagenes.json', agrupacionesConImagenes)
}, 30000)
