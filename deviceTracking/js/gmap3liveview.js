var intgmap3=null;
var intyahoo=null;
var intbing=null;
var map=null;

$(document).ready(function() {
       gmap3();
 });

function gmap3()
{
    map=null;
 var mark=new Array();
  
   liveTracking.getlastdataforpegasus($("#deviceid").val(),{callback: function(msg2){
          //  alert(msg2);

          var newStr2 =msg2.toString().substring(0,msg2.toString().length-1);
           var points = eval('[' +newStr2 + ']');


            for(var n=0;n<1;n++)
           {
                if(points[n].SPEED==0)
               {
                    idea[n]=points[n].DD;

              }
           }
var myOptions = {
  zoom: 8,
  center: new google.maps.LatLng(points[0].LAT,points[0].LANG),
  mapTypeId: google.maps.MapTypeId.ROADMAP
}

 map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

      }
});

      //  map.setUIToDefault();
 intgmap3= setInterval(function() {
       startgmap3();
   }, 20000);

    function startgmap3(){

        liveTracking.getlastdataforpegasus($("#deviceid").val(),{callback: function(msg){
          clearOverlays();
          var newStr2 =msg.toString().substring(0,msg.toString().length-1);
          var points = eval('[' +newStr2 + ']');

        for(var i=0;i<points.length;i++)
       {
            var myLatlng1 = new google.maps.LatLng(points[i].LAT,points[i].LANG);
            var geocoder = new google.maps.Geocoder();
            var contentString ="";
            var speed = points[i].SPEED;
            var dname = points[i].DNAME;
            var lang = points[i].LANG;
            var dig1 = points[i].DIGITAL_1;
            var dig2 = points[i].DIGITAL_2;
            var dig3 = points[i].DIGITAL_3;
            var dig5 = points[i].DIGITAL_5;
            var analog_1 = points[i].ANALOG_1;
            var angle = points[i].ANGLE;
           // alert(angle);
         
            var Devicedate = (points[i].DD).substr(0,16);

geocoder.geocode({latLng: new google.maps.LatLng(points[i].LAT,points[i].LANG)}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                        
contentString = "<font size='2'><b>Device Name: </b>"+dname+"<br/>"+"<b>speed : </b>"+speed+"<br/>"+"<b>Angle : </b>"+angle+"<br/>"+"<b>Power : </b>"+truefalse(dig1)+"<br/>"+"<b>ACC : </b>"+truefalse(dig2)+"<br/>"+"<b>AC : </b>"+truefalse(dig3)+"<br/>"+"<b>GPS : </b>"+truefalse(dig5)+"<br/>"+"<b>Fuel : </b>"+analog_1+"<br/>"+"<b>Date-Time:  </b>"+Devicedate+"<br/>"+"<b>Location : </b>"+results[0].formatted_address+"<br/>"+"<br/><font>";
     $("#side_bar").html(contentString);

     }

var infowindow = new google.maps.InfoWindow({
    content: contentString
});

var marker = new google.maps.Marker({
    position: myLatlng1,
    map: map,
    icon: "images/mm_20_red.png"
    
});

mark[i]= marker;

google.maps.event.addListener(marker, 'click', function() {
  infowindow.open(map,this);

});

infowindow.open(map,marker);

}
   });
      }
        }
});
                }
              function clearOverlays() {
    if (mark) {
        for (i in mark) {
            mark[i].setVisible(false);
            mark[i].setMap(null);
        }
    }
}
           
}

function truefalse(i)
{
   // alert("in function"+i);
    var t = "OFF";
    if(i==true)
        {
            t="ON";
        }
        else{
            t="OFF";
        }
        return t;
}
function getIcon(type) {

    var icon = new GIcon();

    if (type == "gray")
        icon.image = "images/mm_20_gray.png";
    else if (type == "red")
        icon.image = "images/mm_20_red.png";
    else if (type == "green")
        icon.image = "images/mm_20_green.png";
    else if (type == "yellow")
        icon.image = "images/mm_20_yellow.png";
    else if (type == "white")
        icon.image = "images/mm_20_white.png";
    else if (type == "center")
        icon.image = "images/center.gif";
    else
        return null;

    icon.iconSize = new GSize(12, 20);
    icon.iconAnchor = new GPoint(6, 20);
    icon.infoWindowAnchor = new GPoint(10, 1);

    return icon;
}


function getTimeDiff(serverTime, objTime){
    var timeDiff =  (new Date((serverTime.split("."))[0].replace(/-/g, "/")).getTime() - new Date((objTime.split("."))[0].replace(/-/g, "/")).getTime()) / 1000;
    if(timeDiff < 0)
        timeDiff = 1;
    return timeDiff;
}

function exchangeTime(msecond) {
    var dd,hh,mm,ss;
    dd = Math.round(msecond / 86400 + 0.5) - 1;
    hh = Math.round((msecond - dd * 86400) / 3600 + 0.5) - 1;
    mm = Math.round((msecond - dd * 86400 - hh * 3600) / 60 + 0.5) - 1;
    ss = Math.round(msecond - dd * 86400 - hh * 3600 - mm * 60);
    var strtip = "";
    if (dd > 0)
        strtip = strtip + dd + "day";
    if (hh > 0)
        strtip = strtip + hh + "hour";
    if (mm > 0){
        strtip = strtip + mm + "minut";
        if(dd > 0)
            return strtip;
    }
    if (ss > 0)
        strtip = strtip + ss + "second";
    return strtip;
}
