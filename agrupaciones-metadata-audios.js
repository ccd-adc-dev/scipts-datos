const jsonfile = require('jsonfile')
const fs = require('fs')
const XLSX = require('xlsx')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 

const agrupacionesConAudios = jsonfile.readFileSync('./agrupacionesConAudios.json')
const agrupacionesAudiosMetadatos = jsonfile.readFileSync('./agrupaciones-audios-metadatos.json')

agrupacionesConAudios.forEach(a => {
  let agrupacionMetadatos = agrupacionesAudiosMetadatos.find(am => am.id === a.id)
  // console.log(agrupacionMetadatos.familiaId, a.id, a.audios.length, agrupacionMetadatos.audiosMetadatos.length)
  a.audios = a.audios.map(au => {
    let audioMetadatos = agrupacionMetadatos.audiosMetadatos.find(am => au.nombreArchivo.includes(am.ID))
    if (!audioMetadatos) console.log('no metadatos para: ', a.id, au.nombreArchivo);
    else {
      au = {...au, ...audioMetadatos}
    }
    return au
  })
})

setTimeout(() => {  
  jsonfile.writeFileSync('./agrupacionesConAudios.json', agrupacionesConAudios)
}, 5000)
