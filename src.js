var pincode;
var day
var month
var year
var time
var age
var checkTimer, audioTimer
var doRing = false;

const listContainer = document.getElementById('listContainer')

navigator.serviceWorker.register('sw.js');
Notification.requestPermission(function(result) {
  navigator.serviceWorker.ready.then(function(registration) {
    registration.showNotification('Testing Notifications',{
      body: "So that you won't miss out any slots",
      icon: './vaccination.svg'
    });
  }); 
});


document.getElementById('start').addEventListener('click' , function (){
  var audio = new Audio('voice_over.mp3');
    clearEverthing()
  
   pincode  = document.getElementById('pincode').value;
   var temp = new Date(document.getElementById('date').value);
   day= temp.getDate();
   month = temp.getMonth()+1;
   year = temp.getFullYear()
   time = document.getElementById('time').value;
   age = document.getElementById('age').value;

   console.log({
     pincode,
     day,
     month,
     year,
     time,
     age
   })


   checkTimer =  setInterval(function(){  
  
    console.log('checking for slots...')
    var dateString = day+"-"+month+"-"+year
    fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pincode+'&date='+dateString)
      .then(response => response.json())
      .then(data => {
          
 
         listContainer.innerHTML = "";
         console.log(data)
          data.sessions.forEach(element => {
            
            if(element.available_capacity_dose1 > 0 )
            {
              switch(age){
                case "0" : 
                      if(element.min_age_limit == 18)
                      {
                        doRing = true;
                        listContainer.appendChild(getListItem(element));
                        navigator.serviceWorker.ready.then(function(registration) {
                          registration.showNotification('Vaccine slots are available',{
                            body: element.address +", " + element.block_name +", "+ element.district_name +", "+ element.state_name,
                            icon: './vaccination.svg'
                          });
                        });
                      
                      
                      }
                     break;
                case "1" :
                  if(element.min_age_limit == 45)
                  {
                    doRing = true;
                    listContainer.appendChild(getListItem(element));
                    navigator.serviceWorker.ready.then(function(registration) {
                      registration.showNotification('Vaccine slots are available',{
                        body: element.address +", " + element.block_name +", "+ element.district_name +", "+ element.state_name,
                        icon: './vaccination.svg'
                      });
                    });
                  }
                   break;
                case "2":
                  doRing = true;
                  listContainer.appendChild(getListItem(element));
                  navigator.serviceWorker.ready.then(function(registration) {
                    registration.showNotification('Vaccine slots are available',{
                      body: element.address +", " + element.block_name +", "+ element.district_name +", "+ element.state_name,
                      icon: './vaccination.svg'
                    });
                  });
                  break;
              }
            }
            

            

          });
          if(doRing)
          {
            clearInterval(checkTimer);
            audio.play();

            if (document.visibilityState != "visible") {
              audioTimer = setInterval(function(){
                audio.play();
              },6000)
            } 

           
          }
       });
    
         
       
   }, time);
  
})

function clearAudioIntervals(){
  if (document.visibilityState == "visible") {
    console.log("Clearing audio interval timer and playback")
    clearInterval(audioTimer);
  } 
}

function clearEverthing()
{
  clearInterval(audioTimer);
  clearInterval(checkTimer);
  doRing = false;
}


document.addEventListener("visibilitychange", event => {
  clearAudioIntervals()
})


