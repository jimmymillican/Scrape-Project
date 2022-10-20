const PORT = process.env.PORT || 3030

var http = require('http')

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


    

app.listen(PORT , () => console.log('the port is ' + PORT))

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(PORT)



