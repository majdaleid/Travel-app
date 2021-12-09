 
// Add headers before the routes are defined
const fetch = require('node-fetch');
var cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();


console.log(`Your API key is ${process.env.API_KEY}`);
  const api=process.env.API_KEY;

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')


var bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(cors({origin: 'http://localhost:8080'}));


app.use(express.static('dist'))

console.log(__dirname)



app.get('/', function (req, res) {
 // res.status(200).res.sendFile('dist/index.html')
 res.status(200).res.sendFile('dist/index.html')
//res.sendFile(path.resolve('dist/index.html'))
})

app.get('/test', function(req, res){
  res.status(200).send('OK');
});
app.get('/test1', (req, res) => {
  res.json({
      service: 'user-service',
  });
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
/*
app.get('/test', function (req, res) {
    
  // res.send(process.env.API_KEY);
    res.send(mockAPIResponse)
})*/


/*get request */
const getData=async (CompleteURL)=>{

  const res=await fetch(CompleteURL);
  try{
      const data=await res.json();
      console.log("client get data from the external api");
      console.log(data);
      return data;
  }
  catch(error){
      console.log("error",error);
  }

}


 
//make api get request to get lat ,lng and countryname from geonames API
app.get('/getcityinfo', async (req,res) =>{
  const ff=req.query.ff;
  let username = process.env.Api_Username;
  //if there is no city break 
  console.log(username);
  const baseURL=`http://api.geonames.org/searchJSON?q=${ff}&maxRows=1&username=${username}`;
   
let encoded = encodeURI(baseURL);
var data=await getData(encoded);
   res.send(data);
});


//make api post request after passing all the info from geonames API to get the weather prediction
app.post('/weatherbit',async (req,res) =>{
  let lat=req.body.lat;
  let lng=req.body.lng;
  let countryName=req.body.countryName;
  let diffDays=req.body.diffDays;
  let city=req.body.city;
  let Weatherbit_Key = process.env.Weatherbit_Key;
  console.log(lat)
  console.log(lng)
  console.log(countryName)
  console.log(diffDays)
const baseURL=`https://api.weatherbit.io/v2.0/forecast/daily?days=${diffDays}&lat=${lat}&lon=${lng}&city=${city}&country=${countryName}&key=${Weatherbit_Key}`;
let api_key2 = process.env.API_KEY;
var data=await getData(baseURL);

//always return data[length_of_data]
//this api return multiple objects thats why we will return one object, the object of the  travel day 
 let datalength=data.data.length-1;
 console.log(datalength);
    res.send(data.data[datalength]);

})



/*post request */

const postData=async (url='',data={})=>{
  const response=await fetch(url,{
      method: 'POST', // The method
      credentials:'same-origin',
      headers:{
          'Content-Type':'application/json',
          
      },
      body:JSON.stringify(data),
  });
  try{
      const newData=await response.json();
      
      console.log(newData);
   
     return newData
  }catch(error){
      console.log("error",error);
  }
  
  }


  module.exports = app;