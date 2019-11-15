const jsonfile = require('jsonfile')
const fs = require('fs')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 

const agrupaciones = jsonfile.readFileSync('./jsons-geo/agrupaciones.json')

agrupaciones.forEach(a => {
  if (!a.audios) a.audios = []
  let content = fs.readdirSync(`./imagenes-audios/${a.familiaId}/${a.id}/audios`) 
  if (content.length > 1) {
    
    content.forEach( (c,i) => {
      if ( !c.includes('.xls') && ( c.includes('.mp3') || c.includes('.ogg') ) ) {
        console.log('subiendo:',a.id, c)
        cloudinary.uploader.upload(
          `./imagenes-audios/${a.familiaId}/${a.id}/audios/${c}`,
          { 
            public_id: `inali/audios/${a.familiaId}/${a.id}/${c}`,
            resource_type: 'video'
          }
        ).then(function (audio) {
          a.audios.push({
            id: audio.public_id,
            url: audio.url,
            nombreArchivo: c
          })
        })
        .catch(function (err) {
          console.log();
          console.log("** File Upload (Promise)");
          if (err) { console.warn(err); }
        });
      }   
    })
  }

})

setTimeout(() => {
  let agrupacionesConAudios = agrupaciones.map(a => {
    return {
      id: a.id,
      audios: a.audios
    }
  })
  console.log(agrupacionesConAudios);
  
  jsonfile.writeFileSync('./agrupacionesConAudios.json', agrupacionesConAudios)
}, 240000)
