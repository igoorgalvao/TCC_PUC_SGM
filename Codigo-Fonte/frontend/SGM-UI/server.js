// importar express
const express = require('express');

// iniciar express
const app = express();

// Nome da pasta do siste sera feito o build
const appName = 'sgm-ui'

// local onde build irá gerar os arquivo
const outputPath = `${__dirname}/dist/${appName}`;

// seta o diretorio de build para servir o conteudo angular
app.use(express.static(outputPath));

//redirecionar qualquer requisição para o index.html
app.get('/*',(req,res) =>{
    res.sendFile(`${outputPath}/index.html`)
});

// ouvir a porta que o heroky disponibilizar
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

