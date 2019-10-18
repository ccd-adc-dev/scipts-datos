const jsonfile = require('jsonfile')
const fs = require('fs')
const XLSX = require('xlsx')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 

const familias = jsonfile.readFileSync('./familias-unificadas.json')

familias.forEach(f => {
  if (!f.fotografias) f.fotografias = []
  let content = fs.readdirSync(`./imagenes-audios/${f.id}/fotografias`) 
  let metadatos = content.find(c => c.includes('.xls'))
  let datos = [{creditos: '', propiedad: ''}]
  if (metadatos && content.length > 1) {
    const wb = XLSX.readFile(`./imagenes-audios/${f.id}/fotografias/metadatos.xlsx`);
    datos = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'])
    console.log('--- META ---',f.id, datos)
  }
  content.forEach( (c,i) => {

    if ( !c.includes('.xls')) {
      cloudinary.uploader.upload(
        `./imagenes-audios/${f.id}/fotografias/${c}`,
        { public_id: `inali/imagenes/${f.id}/fotografias/${f.id}-${c}` }
      ).then(function (imagen) {
        let imagenDatos = datos.find(d => d.ID === c) ? datos.find(d => d.ID === c) : datos[0] 
        console.log('*** DATOS ***', f.id, imagen.url, imagen.public_id)
        f.fotografias.push({
          id: imagen.public_id,
          url: imagen.url,
          nombreArchivo: imagenDatos.ID ? imagenDatos.ID : c,
          creditos: imagenDatos.creditos,
          propiedad: imagenDatos.propiedad
        })
      })
      .catch(function (err) {
        console.log();
        console.log("** File Upload (Promise)");
        if (err) { console.warn(err); }
      });
    }   
  })

})

setTimeout(() => {
  let familiasConImagenes = familias.map(f => {
    return {
      id: f.id,
      fotografias: f.fotografias
    }
  })
  console.log(familiasConImagenes);
  
  jsonfile.writeFileSync('./familiasConImagenes.json', familiasConImagenes)
}, 10000)
