const PORT = process.env.PORT || 3030

//var http = require('http', PORT)

const axios = require('axios')
const cheerio = require('cheerio')
const { response } = require('express')
const express = require('express')

const app = express()

axios('https://charge.pod-point.com/address/tesco-extra-prescot-1j65m')
    .then( response => {
        const html = response.data
        const $ = cheerio.load(html)
        const chargers = []


        $('.list-group-item', html).each(function(){

            // const thePodNumber = $(this).find('.door').text()
            
            //const thetext = $(this).text()
     
           //$('.title')[0].childNodes[0].nodeValue
            const thetext2 = $(this).text()
 
            chargers.fill(thetext2)
            const ChargerName = $(this).find('h4').text().trim()

            const Details = $(this).find('.details').text()
 
          //  console.log('Pod : ' + ChargerName )

            //console.log(' Details ' + Details )
            const textAttributes = thetext2.split('/n')
 
            // Reference to our element
  
            var words = Details.split(' ');
            const ChargerArray = []

            for (var i = 0; i < words.length; i++) {
                //if (words[i].includes('Connector'))
               // {
                if (words[i] !== '' && words[i] !== '\n' && words[i]  ){
                  
                  ChargerArray.push(words[i])
                  
                }
            }

            for (var i = 0; i < ChargerArray.length; i++) {
              //if (words[i].includes('Connector'))
             // {
              if (ChargerArray[i] == 'Connector'){
                console.log(' Pod :  ' + ChargerName ) 
                console.log(' Connector :  ' + ChargerArray[i + 1] ) 
                console.log(' Status : ' + ChargerArray[i + 2] ) 
                if (ChargerArray[i + 3] == 'Type'){
                  console.log(' Type :  ' + ChargerArray[i + 3] + ChargerArray[i + 4] ) 
                } else{
                  console.log(' Type :  ' + ChargerArray[i + 3] ) 
                }
                
              

              }
          
          }

         
             }        
         )
  
     }).catch(err => console.log(err))

/*      const server = http.createServer((req, res) => {
      res.statusCode = 200;
      const msg = 'Hello Node!\n'
      res.end(msg);
    })
     */

//app.listen(PORT , () => console.log('the port is ' + PORT))



app.get("/", (req, res) => res.type('html').send(html));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));


const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`
