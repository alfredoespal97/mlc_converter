const express=require('express')
const axios=require('axios')
const cheerio=require('cheerio')


const app=express()


const cornies=[]

app.get('/',(req,res)=>{
    res.json('Welcome to MLC converter');
})

app.get('/mlc',(req,res)=>{

    axios.get('https://eltoque.com/tasas-de-cambio-de-moneda-en-cuba-hoy')
        .then((response)=>{
            const html=response.data
            const $=cheerio.load(html)

            $('span:contains("CUP")',html).each(function (){
                const corner=$(this).text()
                cornies.push({
                    corner
                })
            })
            res.json({cornies:cornies});
            this.cornies=[];
        }).catch((err)=>console.log(err))
                
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

// app.listen(4000,()=>console.log(`Escuchando en el puerto:4000`))