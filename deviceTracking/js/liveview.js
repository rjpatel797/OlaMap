//var map = null;
var pinInfobox = null;
var intgoogle=null;
var intyahoo=null;
var intbing=null;
var intomap=null;

var map=null;



    $(document).ready(function() {
       google(); 
        
    });

function google()
{
   clearInterval(intyahoo);
    clearInterval(intomap);
    clearInterval(intbing);
    var stopover_time=0;
    //alert(bsp[1]);
    map=null;
    var idea=new Array();
    var stt="Stady";
    var green_icon = getIcon("green");
    var red_icon = getIcon("red");
    map = new GMap2(document.getElementById("map_canvas"));
    var mid=$("#sess").val();

    //alert(method);

    var stsicon = green_icon;
    var mark=new Array();

    //      alert(mid);
    // map.setCenter(new GLatLng(37.4419, -122.1419), 13);
        liveTracking.getlastdata(mid,{callback: function(msg2){
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
        liveTracking.getlastdata(mid,{callback: function(msg){

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

                    var label = new ELabel(new GLatLng((locations[i]).LAT,(locations[i].LANG)), '<div style="background-color:#4f4f4f;color:#ffffff;font-size:12px;font-weight:bold;text-align: right"> '+ bsp2[i] +' </div>', null, new GSize(-30,17), 75);

                    if ($("#slable").attr('checked'))
                    {
                        map.addOverlay(label);

                    }



                    mark[i]= marker
                    GEvent.addListener(marker,"click", function(){

                        this.showPopup();
                    });
                    map.addOverlay(marker);



                    if (!$("#"+bsp[i]).attr('checked'))
                    {
                        mark[i].hidePopup();

                    }
                    else
                    {
                        
                        mark[i].showPopup();

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


function gmap3()
{
   clearInterval(intyahoo);
    clearInterval(intbing);
    var stopover_time=0;
    //alert(bsp[1]);
    map=null;
    var idea=new Array();
    var stt="Stady";
    var green_icon = getIcon("green");
    var red_icon = getIcon("red");

    var mid=$("#sess").val();

    //alert(method);

    var stsicon = green_icon;
    var mark=new Array();

    //      alert(mid);
    // map.setCenter(new GLatLng(37.4419, -122.1419), 13);

liveTracking.getlastdata(mid,{callback: function(msg2){
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
       //     var bounds=new GLatLngBounds();

        //    for(var k=0;k<points.length;k++)
        //    {
        //        bounds.extend(new GLatLng(points[k].LAT,points[k].LANG));
       //     }
      //      map.setCenter(bounds.getCenter(), 7);
         //   start();



var latlng = new google.maps.LatLng(points[0].LAT,points[0].LANG);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);





  intgoogle= setInterval(function() {
        startgmap3();
   }, 3000);

     }
    });

    function startgmap3(){
        //alert(method);
        liveTracking.getlastdata(mid,{callback: function(msg){


                //  Date d=;
                // alert(new Date());
                var newStr =msg.toString().substring(0,msg.toString().length-1);

                var locations = eval('[' +newStr + ']');

var markary=new Array(locations.length);

var contentString=new Array();
                //alert(new Date);
                map.set_visible(null);
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
  contentString[i]="<font size='2'><b>speed:</b>"+locations[i].SPEED+"km/hr"+"<br/>"+"<b>LastUpdate:</b>"+(locations[i].DD).substr(0,16)+"<br/>"+"<b>Idle</b>"+stopover_time+"<br/><font>";


var infowindow = new google.maps.InfoWindow({
    content: contentString[i]
});

markary[i] = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i].LAT,locations[i].LANG),
    map: map,
    title:"Uluru (Ayers Rock)"+i
});


//markary[i]=marker;
google.maps.event.addListener(markary[i], 'click', function() {
  infowindow.open(map,this);
});



               //     var marker = new PopupMarker(new GLatLng(locations[i].LAT,locations[i].LANG),popupinfo);

               //     var label = new ELabel(new GLatLng((locations[i]).LAT,(locations[i].LANG)), '<div style="background-color:#4f4f4f;color:#ffffff;font-size:12px;font-weight:bold;text-align: right"> '+ bsp[i] +' </div>', null, new GSize(-30,17), 75);

             //       if ($("#slable").attr('checked'))
              //      {
              //          map.addOverlay(label);

              //      }



                //    map.addOverlay(marker);



                    if ($("#"+bsp[i]).attr('checked'))
                    {
                 //       mark[i].showPopup();

                    }
                    else
                    {
                   //     mark[i].hidePopup();

                    }



                    function hidepp(i)
                    {
              //    marker[i].hidePopup();
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


    var stsicon = green_icon;
    var mark=new Array();
    //      alert(mid);
    // map.setCenter(new GLatLng(37.4419, -122.1419), 13);
   liveTracking.getlastdata(mid,{callback: function(msg2){
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
        liveTracking.getlastdata(mid,{callback: function(msg){
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
                            width :200,
                            height :85,
                            showCloseButton: true,
                            zIndex: 0,
                            description: 'Vehicle:'+bsp[i]+'Speed:'+locations[i].SPEED+"Km/Hr \n \n LastUpdate:"+(locations[i].DD).substr(0,16)+' \n \n  Idle'+stopover_time,
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

   map=null;
  //  var green_icon = getIcon("green");
 //   var red_icon = getIcon("red");
    map = new YMap(document.getElementById('map_canvas'));
    var mid=$("#sess").val();
  //  var stsicon = green_icon;
    var yymark = new Array();
    var ymarker = new Array();

   liveTracking.getlastdata(mid,{callback: function(msg2){
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
           //   alert(points[k].LAT);
                yPoint = new YGeoPoint(points[k].LAT,points[k].LANG);
                map.addTypeControl();
                map.addZoomLong();
                map.addPanControl();
                map.drawZoomAndCenter(yPoint,7);
            }
            startyahoo();
        }
    });
  intyahoo= setInterval(function() {
        startyahoo();
    }, 3000);

    function startyahoo(){
        //alert("in start");
       liveTracking.getlastdata(mid,{callback: function(msg){
             //   alert(msg);
                map.removeOverlay(yymark);
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
// map.removeMarker(yymark[i]);
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
function omap(){

    clearInterval(intgoogle);
    clearInterval(intbing);
    clearInterval(intyahoo);
    var stopover_time=0;
    //alert(bsp[1]);
    var idea=new Array();
    var stt="Stady";
var infoBubbles = new ovi.mapsapi.map.component.InfoBubbles(),
	markers = {};

  
   // var green_icon = getIcon("green");
    //var red_icon = getIcon("red");
  // var map = new ovi.mapsapi.map.Display(document.getElementById("map_canvas");
    var mid=$("#sess").val();
  //  var stsicon = green_icon;
    liveTracking.getlastdata(mid,{callback: function(msg2){
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


    var lt=parseFloat(points[1].LAT);
   var lan=parseFloat(points[1].LANG);

/*
           map = new ovi.mapsapi.map.Display( document.getElementById("map_canvas"), {
                components: [infoBubbles,
                    //behavior collection
                     new ovi.mapsapi.map.component.zoom.DoubleClick(),
                //needed for marker drag
                
                    new ovi.mapsapi.map.component.Behavior(),
                    new ovi.mapsapi.map.component.ZoomBar(),
                    new ovi.mapsapi.map.component.Overview(),
                    new ovi.mapsapi.map.component.TypeSelector(),
                    new ovi.mapsapi.map.component.ScaleBar() ],
                zoomLevel: 10,
                center: [lt, lan]
            });
          //remove zoom.MouseWheel behavior for better page scrolling experience
          map.removeComponent(map.getComponentById("zoom.MouseWheel"));

 // var bub=  myInfoBubbles.addBubble("myHTMLcontent", new ovi.mapsapi.geo.Coordinate(21.162665,72.84070833333334));

     //   var marker = new ovi.mapsapi.map.StandardMarker([lt,lan], {
     //       text: "Hi!", //small label
     //       draggable: true  //the marker is marked to be draggable
     //   });
     //   map.objects.add(marker);
//map.objects.add(bub);
       */

           for(var k=0;k<points.length;k++)
            {
          var ospeed = points[k].SPEED;
          var olastupdatedate = points[k].DD;
      //    alert(ospeed);
       //   alert(olastupdatedate);
            }
          var myInfoBubbles = new ovi.mapsapi.map.component.InfoBubbles();
          var myHTMLcontent = "<font size='2'><b>speed:</b>"+ospeed+"km/hr"+"<br/>"+"<b>LastUpdate:</b>"+olastupdatedate+"<br/>"+"<b>Idle</b>"+stopover_time+"<br/><font>";
        //  var myHTMLcontent1 = "Ahemedabad"

          map = new ovi.mapsapi.map.Display(document.getElementById("map_canvas"), {
        components: [ myInfoBubbles,
                      new ovi.mapsapi.map.component.Behavior(),
                      new ovi.mapsapi.map.component.TypeSelector(),
                      new ovi.mapsapi.map.component.ViewControl(),
                      new ovi.mapsapi.map.component.ZoomBar(),
                      new ovi.mapsapi.map.component.ScaleBar() ],
        //       var center = [new ovi.mapsapi.geo.Coordinate(points[k].LAT,points[k].LANG)],
          //          center: [points[0].LAT,points[0].LANG],
            //          center: [21.162665,72.84070833333334],
          // new ovi.mapsapi.geo.BoundingBox()
                      zoomLevel: 7
        });
        //  var center = new ovi.mapsapi.geo.Coordinate(points[k].LAT,points[k].LANG);
        //    map.removeComponent(map.getComponentById("zoom.MouseWheel"));

    //  var olat = points[k].LAT;
      //alert(olat);
    //  alert(coordinates);

         myInfoBubbles.addBubble(myHTMLcontent, new ovi.mapsapi.geo.Coordinate(lt,lan));
    //  myInfoBubbles.addBubble(myHTMLcontent, new ovi.mapsapi.geo.Coordinate(23.00296666666667,72.49643666666665));

         var marker = new ovi.mapsapi.map.Marker(
                new ovi.mapsapi.geo.Coordinate(lt,lan),{
                 //     new ovi.mapsapi.geo.Coordinate(coordinates),{
                
               // title: "marker",
               // text: "Hi......",
               // visibility: true
         // icon: "images.jpg"
            //offset the top left icon corner so that it's
            //centered above the coordinate
       //  offset: new ovi.mapsapi.util.Point(21.162665,72.84070833333334)
        });

        var myContainer = new ovi.mapsapi.map.Container();
                myContainer.objects.add(marker);
                map.zoomTo(myContainer.getBoundingBox(),false,true);
        map.objects.add(marker);
      //  map.objects.add(myMarkerOne);
                //    alert(marker);
     //   myMarkerOne = new ovi.mapsapi.map.Marker([23.00296666666667,72.49643666666665]);
      //  myMarkerTwo = new ovi.mapsapi.map.Marker([52.1,14.1]);
      //  myMarkerThree = new ovi.mapsapi.map.Marker([53.1,13.1]);
        


   //     }
//alert("test");


   // var bubble = new ovi.mapsapi.map.component.InfoBubbles();
    //var info = "testing";
   // bubble.addBubble(info,21.162665,72.84070833333334);
        
 



         //   startomap();
            
        }
    });

    //  map.setUIToDefault();

  intomap=  setInterval(function() {
        startomap();
    }, 5000);



         function startomap(){
       //  map.components.Clear();
        //removeAllOverlays();
                liveTracking.getlastdata(mid,{callback: function(msg){
                  //  map.entities.clear();
                //   map.Clear();
             //   map.components.clear();
           //     ovi.mapsapi.map.component.clear();
            var newStr =msg.toString().substring(0,msg.toString().length-1);

             var locations = eval('[' +newStr + ']');


var element=new Array(5);
              for(var i=0;i<locations.length;i++)
               {


    var loclat=parseFloat(locations[i].LAT);
   var loclang=parseFloat(locations[i].LANG);
//alert("asdgadg"+i);

//new ovi.mapsapi.map.component.InfoBubbles.Bubble("dsgadsg",new ovi.mapsapi.geo.Coordinate(loclat,loclang));
//myInfoBubbles2.addBubble("asdgadg"+i, new ovi.mapsapi.geo.Coordinate(21.162665,72.84070833333334));
 // infoBubbles.addBubble("asdgadg"+i, new ovi.mapsapi.geo.Coordinate(loclat,loclang));

  var tmp = "<div class=\"myHtmlContent\">" +
	"<h2>Marker with HTML content</h2>" +
	"<img width='120' height='90' src='http://upload.wikimed" +
	"ia.org/wikipedia/commons/thumb/7/7f/Bodemuseum.jpg/120p" +
	"x-Bodemuseum.jpg' alt=''/><br/><b>Museum Island, Berli" +
	"n</b><p style=\"margin: 3px;\"><a href=\"http://en.wik" +
	"ipedia.org/wiki/Museum_Island\">Check out info and phot" +
	"os on Wikipedia</a></p></div>";

	element[i] = infoBubbles.addBubble(tmp, new Microsoft.Maps.Location(loclat,loclang));


      //  map.objects.add(markers[element.id] = new ovi.mapsapi.map.StandardMarker([loclat,loclang], {
        //        text: "Hi!"+i, //small label
         //    draggable: false,
          //    textPen:"red"  //the marker is marked to be draggable
    //  });


         map.objects.add(markers[element[i].id] = new ovi.mapsapi.map.StandardMarker( new Microsoft.Maps.Location(loclat,loclang)));
    //    map.objects.add(marker);
        



            //        if ($("#"+bsp[i]).attr('checked'))
              //      {
                      //  pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(locations[i].LAT, locations[i].LANG),
                        //{
                          //  width :200,
                            //height :85,
                  //          showCloseButton: true,
                    //       zIndex: 0,
                     //       description: 'Vehicle:'+bsp[i]+'Speed:'+locations[i].SPEED+"Km/Hr \n \n LastUpdate:"+(locations[i].DD).substr(0,16)+' \n \n  Idle'+stopover_time,
                      //      visible: true,
                        //    offset: new Microsoft.Maps.Point(0,15)
                       // });


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
