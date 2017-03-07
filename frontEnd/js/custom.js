var coordinates = [];
var addresses = [];
var distances;
var startPos;
var workerJson;
var myWorker = new Worker("js/worker.js");
var geocoder = new google.maps.Geocoder;
var map;
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var file = evt.dataTransfer.files[0]; // FileList object.
    var reader = new FileReader();
     
      reader.onload = function(e) {
        //read line by line and store geolocations
        var text = reader.result;
        var lines = text.split('\n');
        for(var line = 0; line < lines.length; line++){
            coordinates.push(lines[line]);
        }
    }
    reader.readAsText(file);
    if(startPos !== undefined){
        reverseGeo();
        //codeAddress();
        console.log(startPos);
        buildJson();
        console.log(startPos);
        myWorker.postMessage(workerJson);
    }
    else{
        alert("Your current location is unknown, allow geolocation to proceed");
    }
}
//use the lat and lng methods to change current position
function doStuff(){

}
function buildJson(){
    workerJson = JSON.stringify({currentLocationLat:startPos.lat(),
                  currentLocationLon:startPos.lng(),
                  listLocations:coordinates});
}

myWorker.onmessage = function(e){
    distances = e.data.calulatedDist;
    setTimeout(displayInformation,5000) ;
}

function reverseGeo(){
    for(var i =0; i < coordinates.length;i++){
        var latlngStr = coordinates[i].split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        lookUp(latlng,i);
    }
}
//weird workaround
function lookUp(latlng,i){
    setTimeout(function(){
        geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var addrString = results[0].formatted_address;
            addresses.push(addrString);
        } else {
         }
  });
    }, 500*i);
}

function mapCoordinates(postition) {
    function initialize() {
    var myCenter= new google.maps.LatLng(postition.coords.latitude,postition.coords.longitude);
    var mapProp = {
        center:myCenter,
        zoom:12,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
     map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
  
    var marker=new google.maps.Marker({
        position:myCenter,
     });
    startPos=marker.position;

    marker.setMap(map);
  }
    initialize();
}
function codeAddress() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location.lat());
        
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        startPos=marker.position;

       
        

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

var geoSuccess = function(position) {
    startPos = position;
    mapCoordinates(startPos);
  };
var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
  };
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

function resetCurrent(){
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}
    
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }
  
  function displayInformation(){
      var printString = '';
      for(var i=0;i<distances.length;i++){
          printString += '<p>Location of first Lat,Lon pair is '+ addresses[i]+' and the distance from the user is '+ distances[i] + 'km.</p><br>';
      }
      document.getElementById('infoPlug').innerHTML= printString;
  }
  
  

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);

