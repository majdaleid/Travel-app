
function handleSubmit(event) {
    event.preventDefault()
 
let city=document.getElementById('city').value;

let nextdate=document.getElementById('date').value;



let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const oneDay = 24 * 60 * 60 * 1000; 
const nextdate2 = new Date(nextdate);
const today2 = new Date(today);


//how many days do i have until my travel
//const diffDays = Math.round(Math.abs((nextdate2 - today2) / oneDay));
const diffDays = Math.round(((nextdate2 - today2) / oneDay));
console.log(diffDays);
 
console.log(diffDays);
const newlink=`http://localhost:8081/getcityinfo?ff=${city}`;

 
console.log("::: Form Submitted :::")

//check for the input if there is a city and a date and if the date not in the past 
if(Client.checkForName(city,nextdate) && Client.checkDate(diffDays)){
getData(newlink).then(function(data){
    // get the lat,lng,country name of the city i want to visit using GeoNames API
        console.log(data.geonames[0].lat);
        console.log(data.geonames[0].lng);
        console.log(data.geonames[0].countryName);
        console.log(diffDays);
        //update our html elements to show the data from our API
        document.getElementById('cityname').innerHTML=`your travel to ${city} in ${data.geonames[0].countryName} will be in 
        ${diffDays} `;
        //send the data to our server with lat,lng,countryname,city ,and number of days until our travel to get the weather prediction
        postData('http://localhost:8081/weatherbit',{lat:data.geonames[0].lat,lng:data.geonames[0].lng,countryName:data.geonames[0].countryName,diffDays:diffDays,city:city})
        .then(function(data){
            console.log(data);
            document.getElementById('temp').innerHTML=`the temprature will be ${data.temp} ${data.weather.description}`;
          //get one picture of our city that we want to visit 
            getData(`https://pixabay.com/api/?q=${city}&image_type=photo&key=24695268-a1688af724a27cb0a9a0ef3d3`).then(function(data){
                //update our img1 element with the returned link from this api 
                document.getElementById('img1').src=data.hits[0].webformatURL;
                //wait one second before scrolling to the returned img and texts
                setTimeout(() => {
                    document.getElementById("img1").scrollIntoView({behavior:"smooth"});
                }, 1000);
            })
        })
    })
    
    }
}
/*post request */
const postData=async (url='',data={})=>{
    const response=await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData=await response.json();
        console.log("client post data ");
        console.log(newData);
        return newData
    }catch(error){
        console.log("error",error);
    }
    
    }
 

        
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

  

export { handleSubmit }