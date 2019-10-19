const jsonfile = require('jsonfile')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'centro-cultura-digital',
  api_key: '528638817698283',
  api_secret: 'aFfbUl-pa1Ifrm79wHhUb3YQlq4'
}); 


const textiles = jsonfile.readFileSync('./textiles.json')
let noSubieron = []
let textilesConUrls = []
textiles.forEach(t => {
  t.archivos.forEach( (a,i) => {
    cloudinary.uploader.upload(
      `./textiles_jpg/${a}`,
      { public_id: `inali/imagenes/${t.familiaId}/${t.agrupacionId}/textiles/${a}` }
    ).then(function (imagen) {
      console.log(t.familiaId, t.agrupacionId, imagen.public_id)
      textilesConUrls.push({
        id: imagen.public_id,
        url: imagen.url,
        ...t
      })
    }).catch(function (err) {
      console.log();
      noSubieron.push({
        fam: t.familiaId,
        agr: t.agrupacionId,
        arch: a
      })
      console.log("** File Upload (Promise)", t.familiaId, t.agrupacionId, a);
      if (err) { console.warn(err); }
    });
  })
})

let x = 400
setInterval(() => {
  console.log(x)
  x--
}, 1000);
setTimeout(() => {
  jsonfile.writeFileSync('./textilesConUrls.json', textilesConUrls)
}, 400000)
