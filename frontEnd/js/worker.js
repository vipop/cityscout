
var distances = [];
onmessage = function (e) {
    var locJSON = JSON.parse(e.data);
    var coordinates = locJSON.listLocations;
    var startPosLon = Number(locJSON.currentLocationLon);
    var startPosLat = Number(locJSON.currentLocationLat);
    for(var location = 0;location < coordinates.length; location++){
        var loc = coordinates[location].split(',');
        var latitude = Number(loc[0]) ;
        var  longitude = Number(loc[1]) ;
        var result = calcDistance(startPosLat,startPosLon,latitude,longitude);
        distances.push(result);
   }
   postMessage({calulatedDist:distances});
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

function calcDistance(lat1,lon1,lat2,lon2){
    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2-lat1;
    var dLat = x1.toRad();  
    var x2 = lon2-lon1;
    var dLon = x2.toRad();  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; 
    d = Math.round(d * 100) / 100
    return d;
}