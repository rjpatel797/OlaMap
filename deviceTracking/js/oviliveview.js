//var map = null;
var intomap=null;
var map=null;

function omap(){
//alert("in");
    var stopover_time=0;
   var myInfoBubbles = new ovi.mapsapi.map.component.InfoBubbles();
	//markers = {};
    var map=null;

    // alert($("#deviceid").val());
       liveTracking.getlastdataforovi($("#deviceid").val(),{callback: function(msg2){

          //  var newStr2 =msg2.toString().substring(0,msg2.toString().length-1);
            var points = eval(msg2);

            var lt=parseFloat(points[0].LAT);
            var lan=parseFloat(points[0].LANG);
           map = new ovi.mapsapi.map.Display(
            document.getElementById("map_canvas"), {
                components: [myInfoBubbles,
                    //behavior collection
                    new ovi.mapsapi.map.component.zoom.DoubleClick(),
                    new ovi.mapsapi.map.component.Behavior(),
                    new ovi.mapsapi.map.component.ZoomBar(),
                    new ovi.mapsapi.map.component.Overview(),
                    new ovi.mapsapi.map.component.TypeSelector(),
                    new ovi.mapsapi.map.component.ScaleBar() ],
                zoomLevel: 7,
                center: [lt, lan]
            });
           }
    });

  intomap=  setInterval(function() {
        startomap();
    }, 6000);

         function startomap(){

                liveTracking.getlastdataforovi($("#deviceid").val(),{callback: function(msg){
           
  map.objects.clear(myContainer);
  //alert("remove");
            //var newStr =msg.toString().substring(0,msg.toString().length-1);
            var locations = eval(msg);
            var loclat=parseFloat(locations[0].LAT);
            var loclang=parseFloat(locations[0].LANG);
            var ospeed=(locations[0].SPEED);
            var olastupdate=(locations[0].DD);
//var dgd=  newmap.revGeocode(new ovi.mapsapi.geo.Coordinate(22,77));
//alert(dgd);


          marker  = new ovi.mapsapi.map.Marker(new ovi.mapsapi.geo.Coordinate(loclat,loclang));
       var tmp = "<font size='2'><b>speed:</b>"+ospeed+"km/hr"+"<br/>"+"<b>LastUpdate:</b>"+olastupdate+"<br/>"+"<b>Idle</b>"+stopover_time+"<br/><font>";
       myInfoBubbles.addBubble(tmp, new ovi.mapsapi.geo.Coordinate(loclat,loclang));
          
            var myContainer = new ovi.mapsapi.map.Container();

            myContainer.objects.add(marker);

            map.objects.add(myContainer);
        
            }
        });
    }
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
