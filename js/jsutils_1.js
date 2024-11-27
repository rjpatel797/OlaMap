/* 
 * To Made By Bhavesh Patel 31-03-2012
 * and open the template in the editor.
 */


  function exchangeTime(msecond) {
    var dd,hh,mm,ss;
    dd = Math.round(msecond / 86400 + 0.5) - 1;
    hh = Math.round((msecond - dd * 86400) / 3600 + 0.5) - 1;
    mm = Math.round((msecond - dd * 86400 - hh * 3600) / 60 + 0.5) - 1;
    ss = Math.round(msecond - dd * 86400 - hh * 3600 - mm * 60);
    var strtip = "";
    if (dd > 0)
        strtip = strtip + dd + " day ";
    if (hh > 0)
        strtip = strtip + hh + " hour ";
    if (mm > 0){
        strtip = strtip + mm + " mins ";
        if(dd > 0)
            return strtip;
    }
    if (ss > 0)
        strtip = strtip + ss + " secs";
    return strtip;
}

 function theclock(rightnow){
                    //  var rightnow= new Date();
  var month= rightnow.getMonth();var today= rightnow.getDate();var year= rightnow.getYear();var hour= rightnow.getHours();var min= rightnow.getMinutes(); var second= rightnow.getSeconds();
                    month+=1;
                    if (year<2000)
                        year+=1900;
                    if (hour<10)
                       hour="0"+hour;
                    if (min<10)
                        min="0"+min;
                    if (second<10)
                        second="0"+second;
                    if (hour<12)
                        var ampm="AM";
                    else
                        var ampm="PM";
                    if (hour==0)
                        hour=12;
                    if (hour>=13)
                        hour-=12;
                    return today+"/"+month+"/"+year+" "+hour+":"+min+":"+second+" "+ampm;
                }
                
                
                function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

function getTimeDiff(serverTime, objTime){
    var timeDiff =  (new Date((serverTime.split("."))[0].replace(/-/g, "/")).getTime() - new Date((objTime.split("."))[0].replace(/-/g, "/")).getTime()) / 1000;
    if(timeDiff < 0)
        timeDiff = 1;
    return timeDiff;
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6378;
    var dLat = (lat2-lat1) * Math.PI / 180;  
    var dLon = (lon2-lon1) * Math.PI / 180;   
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +  
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *   
    Math.sin(dLon/2) * Math.sin(dLon/2);   
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));   
    var d = R * c;  
    return d;  
}