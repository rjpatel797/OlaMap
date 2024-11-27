
var map = null;
var pinInfobox = null;
var intgoogle=null;
var intyahoo=null;
var intbing=null;




function initializ() {

    google();

}

function google()
{

    clearInterval(intyahoo);
    clearInterval(intbing);
    var stopover_time=0;
    //alert(bsp[1]);
    var idea=new Array();
    var stt="Stady";
    var green_icon = getIcon("green");
    var red_icon = getIcon("red");
    var map = new GMap2(document.getElementById("map_canvas"));
    var mid=$("#sess").val();
    var userid=$("#userid").val();

    //alert(method);

    var stsicon = green_icon;
    var mark=new Array();

    //      alert(mid);
    // map.setCenter(new GLatLng(37.4419, -122.1419), 13);
        liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg2){
            //alert(msg2);
            var newStr2 =msg2.toString().substring(0,msg2.toString().length-1);
            var points = eval('[' +newStr2 + ']');

            for(var n=0;n<points.length;n++)
            {
                if(points[n].SPEED==0)
                {
                    idea[n]=points[n].DD;

                }
            }
            var bounds=new GLatLngBounds();

            for(var k=0;k<points.length;k++)
            {
                bounds.extend(new GLatLng(points[k].LAT,points[k].LANG));
            }
            map.setCenter(bounds.getCenter(), 7);
         //   start();
        }
    });

    map.setUIToDefault();

  intgoogle= setInterval(function() {
        startgoogle();
    }, 3000);

    function startgoogle(){
        //alert(method);
        liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg){

                map.clearOverlays();

                //  Date d=;
                // alert(new Date());
                var newStr =msg.toString().substring(0,msg.toString().length-1);

                var locations = eval('[' +newStr + ']');



                //alert(new Date);
                for(var i=0;i<locations.length;i++)
                {
                    //alert(getTimeDiff(locations[i].DD,new Date.toGMTString()));
                    if(locations[i].SPEED != 0)
                    {
                        idea[i]=locations[i].DD;

                        stsicon= green_icon;
                        stopover_time=0;
                    }
                    else
                    {
                        stopover_time = exchangeTime(getTimeDiff(locations[i].DD,idea[i]));

                        stsicon= red_icon;

                    }
                    var popupinfo={
                        text:"<font size='2'><b>speed:</b>"+locations[i].SPEED+"km/hr"+"<br/>"+"<b>LastUpdate:</b>"+(locations[i].DD).substr(0,16)+"<br/>"+"<b>Idle</b>"+stopover_time+"<br/><font>",
                        icon:stsicon
                    };

                    var marker = new PopupMarker(new GLatLng(locations[i].LAT,locations[i].LANG),popupinfo);
                    var label = new ELabel(new GLatLng((locations[i]).LAT,(locations[i].LANG)), '<div style="background-color:#4f4f4f;color:#ffffff;font-size:12px;font-weight:bold;text-align: right"> '+ bsp[i] +' </div>', null, new GSize(-30,17), 75);

                    if ($("#slable").attr('checked'))
                    {
                        map.addOverlay(label);

                    }



                    mark[i]= marker
                    GEvent.addListener(marker,"click", function(){

                        this.showPopup();
                    });
                    map.addOverlay(marker);


                    if ($("#"+bsp[i]).attr('checked'))
                    {
                        mark[i].showPopup();

                    }
                    else
                    {
                        mark[i].hidePopup();

                    }



                    function hidepp(i)
                    {
                        marker[i].hidePopup();
                    }
                }
            }
        });
    }
}




function bing(){



    clearInterval(intyahoo);
    clearInterval(intgoogle);
    var stopover_time=0;
    //alert(bsp[1]);
    var idea=new Array();
    var stt="Stady";
    var green_icon = getIcon("green");
    var red_icon = getIcon("red");
    //var map = new GMap2(document.getElementById("map_canvas"));
    var mid=$("#sess").val();
    //  alert(mid);
    //  var method=$("#uid").val();
    // alert(method);
var userid=$("#userid").val();

    var stsicon = green_icon;
    var mark=new Array();
    //      alert(mid);
    // map.setCenter(new GLatLng(37.4419, -122.1419), 13);
   liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg2){
            //    alert(msg2);
            //  alert("center masg"+msg2);
            var newStr2 =msg2.toString().substring(0,msg2.toString().length-1);
            var points = eval('[' +newStr2 + ']');

            for(var n=0;n<points.length;n++)
            {
                if(points[n].SPEED==0)
                {
                    idea[n]=points[n].DD;

                }
            }
            //          var bounds=new GLatLngBounds();

            map = new Microsoft.Maps.Map(document.getElementById("map_canvas"), {
                credentials:"Aia3aDJ3sec6ES4rREsr5uzNOvl8ZRDCGIQu3Y2oCpqOu6c59SA_sBxwMAlU-JhP",
                center: new Microsoft.Maps.Location(points[0].LAT, points[0].LANG),
                zoom: 5
            });
            // Retrieve the location of the map center
            //var center = map.getCenter();
            var center=new Microsoft.Maps.Location(points[0].LAT, points[0].LANG);
            /*
            for(var k=0;k<points.length;k++)
            {
                bounds.extend(new GLatLng(points[k].LAT,points[k].LANG));
            }
            map.setCenter(bounds.getCenter(), 7);
            */
            startbing();
        }
    });

    //  map.setUIToDefault();

  intbing=  setInterval(function() {
        startbing();
    }, 5000);

    function startbing(){
        // map.Clear();
        //removeAllOverlays();
        liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg){
                //                alert(msg);
                //
                map.entities.clear();
                //
                //
                // map.clearOverlays();
                // pinInfobox.setOptions({ visible:false });
                //   map.Clear();
                var newStr =msg.toString().substring(0,msg.toString().length-1);

                var locations = eval('[' +newStr + ']');

                for(var i=0;i<locations.length;i++)
                {

                    if(locations[i].SPEED != 0)
                    {
                        idea[i]=locations[i].DD;

                        stsicon= green_icon;
                        stopover_time=0;
                    }
                    else
                    {
                        stopover_time = exchangeTime(getTimeDiff(locations[i].DD,idea[i]));

                        stsicon= red_icon;

                    }

                    pin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(locations[i].LAT, locations[i].LANG), {
                        text: ''
                    });

                    if ($("#"+bsp[i]).attr('checked'))
                    {
                        pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(locations[i].LAT, locations[i].LANG),
                        {
                            width :250,
                            height :85,
                            showCloseButton: true,
                            zIndex: 0,
                            description: 'Vehicle:'+bsp[i]+' \n Speed:'+locations[i].SPEED+"Km/Hr \n LastUpdate:"+(locations[i].DD).substr(0,16)+' \n \n  Idle'+stopover_time,
                            visible: true,
                            offset: new Microsoft.Maps.Point(0,15)
                        });


                    // pinInfobox.setHtmlContent('<div style="border: black;border-width: 1">xzbzxcbzxc</div>');
                    }
                    else
                    {
                        pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(locations[i].LAT, locations[i].LANG),
                        {
                            width :200,
                            height :85,
                            showCloseButton: true,
                            zIndex: 0,
                            description: 'Vehicle:'+bsp[i]+'Speed:'+locations[i].SPEED+"Km/Hr \n \n LastUpdate:"+(locations[i].DD).substr(0,16)+' \n \n  Idle'+stopover_time,
                            visible: false,
                            offset: new Microsoft.Maps.Point(0,15)
                        });

                    }


                    //Microsoft.Maps.Events.addHandler(pin, 'click', displayInfobox);
                    // Hide the infobox when the map is moved.
                    //Microsoft.Maps.Events.addHandler(map, 'viewchange', hideInfobox);
                    // Add the pushpin and infobox to the map
                    map.entities.push(pin);
                    map.entities.push(pinInfobox);
                }
                function displayInfobox(e)
                {
                    pinInfobox.setOptions({
                        visible:true
                    });
                }
                function hideInfobox(e)
                {
                    pinInfobox.setOptions({
                        visible: false
                    });
                }

            }

        });

    }

}


function yahoo(){

    clearInterval(intgoogle);
    clearInterval(intbing);
    var stopover_time=0;
    //alert(bsp[1]);
    var idea=new Array();
    var stt="Stady";

    var map=null;
    var green_icon = getIcon("green");
    var red_icon = getIcon("red");
    map = new YMap(document.getElementById('map_canvas'));
    var mid=$("#sess").val();
    var stsicon = green_icon;
    var yymark = new Array();
    var ymarker = new Array();
var userid=$("#userid").val();
   liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg2){
            //    alert(msg2);
            var newStr2 =msg2.toString().substring(0,msg2.toString().length-1);
            var points = eval('[' +newStr2 + ']');

            for(var n=0;n<points.length;n++)
            {
                if(points[n].SPEED==0)
                {
                    idea[n]=points[n].DD;
                }
            }
            for(var k=0;k<points.length;k++)
            {

                yPoint = new YGeoPoint(points[k].LAT,points[k].LANG);
                map.addTypeControl();
                map.addZoomLong();
                map.addPanControl();
                map.drawZoomAndCenter(yPoint,10);
            }
            startyahoo();
        }
    });
  intyahoo= setInterval(function() {
        startyahoo();
    }, 3000);

    function startyahoo(){
        //alert("in start");
       liveTracking.getlastdataforuser(mid,userid,{ callback: function(msg){
             //   alert(msg);
                map.removeOverlay();
                var newStr =msg.toString().substring(0,msg.toString().length-1);
                var locations = eval('[' +newStr + ']');

                for(var i=0;i<locations.length;i++)
                {
                    var yspeed = locations[i].SPEED;
                    var ylastupdatedate = locations[i].DD;
                    ymarker = new YMarker(new YGeoPoint(locations[i].LAT,locations[i].LANG));
                    var popupinfo="<font size='2'><b>speed:</b>"+yspeed+"km/hr"+"<br/>"+"<b>LastUpdate:</b>"+ylastupdatedate+"<br/>"+"<b>Idle</b>"+stopover_time+"<br/><font>";

                    yymark[i] = ymarker;
                    ymarker.openSmartWindow(popupinfo);
                    YEvent.Capture(ymarker, EventsList.MouseClick,function() {
                        ymarker.openSmartWindow(popupinfo);
                        this.unhide();
                    });
                    map.addOverlay(ymarker);

                    if ($("#"+bsp[i]).attr('checked'))
                    {
                        yymark[i].unhide();

                    }
                    else
                    {
                        yymark[i].hide();
                    }
                    function hidepp(i)
                    {
                        yymark[i].hide();
                    }
                }
            }
        });
    }
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
