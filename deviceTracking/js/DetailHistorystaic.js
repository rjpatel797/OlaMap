var interval=0;
var timeout=0;
var map="";
var markers23=[];
var markershow=[];
var incr=0;
var firstdates="";
var lastdates="";

        var devicearry= new Array();
var marker9="";
 $(document).ready(function() {

var now = new Date();

//alert(now.format("yyyy-mm-dd HH:mm:ss"));
lastdates=now.format("yyyy-mm-dd HH:mm:ss");




now.setDate(now.getDate() - 1);


firstdates=now.format("yyyy-mm-dd HH:mm:ss");
//alert(now.format("yyyy-mm-dd HH:mm:ss"));
//alert(now);


               initialize();

            });


function getdevicename(did)
{  
   return $("#"+did).val();
}

function initialize()
{
  
  
  $("#map_canvas").html("please wait while loading .....");

 //   $('#btnstart').attr('disabled', 'disabled');
    //  $('#speeds').attr('disabled', 'disabled');

    var stimes=$("#start").val();
    var etimes=$("#end").val();
    var speeds=$("#speeds").val();
    var mid=$("#sess").val();
    var deviceid=$("#deviceid2").val();
    
    var fromtime="";
    var totime="";
    var marker22;
    var markershown=[];
  
//   if(stimes=="")
//    {
//        // alert("please Select Start Time");
//      alert("select Start date");
//    }
//    else if(etimes=="")
//    {
//        //alert("please Select End Time");
//        
//            alert('Please Select End Time');
//        
//
//    }
//    else
//    {
        var totalholdtime=0;
        var marker="";
        var polylen;
        
              var myOptions = {
                  zoom: 12,
                  center: new google.maps.LatLng(22,77),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
    };

     map = new google.maps.Map(document.getElementById("map_canvas"),myOptions); 
     
        devicearry=deviceid.toString().split(",");
        
//      /  for(var k=0;k<devicearry.length;k++)
//            {
//                /
makemap();
  //  } 
    
}
            function makemap()
            {
                
                
        // console.log("BBBB::"+k);
       // alert(devicearry.length);        
          //  alert("first KK:"+k);
         //  alert(devicearry[k]);
         fromtime=firstdates;
         totime=lastdates;
        
           var post_data="did="+$("#did").val()+"&sdate="+fromtime+"&edate="+totime+"&start=0&max=1000000";
      //   alert(post_data);
                $.ajax({
                        type: "GET",
                        url: API+"Jsoncontroller?Operation=Viewpath",
                        dataType: "jsonp",
                        data: post_data,
//                        beforeSend: function(HttpRequest){
//                            $("#status").html("<em class='loding'>&nbsp;Please wait while saving....</em>");
//                        },
                        success: function(msg2){
           // liveTracking.getplayback(devicearry[k],fromtime,totime,0,1000000,function(msg2)
           //  {
                 
                // alert("add::::"+k);
               //   alert(devicearry[0]);
             //    alert(msg2);
                var locations=new Array(msg2.length);
                locations=msg2;
               var sum=0;
            var points=new Array(msg2.length);
            points=msg2;
            
            if(msg2=="")
            {
               // window.clearInterval(interval);
                //      alert("Sorry No Data For Selected Time");
              //  $('#btnstart').removeAttr('disabled');
             alert("Sorry no data found for selected time !");
            }
            else
            {
                                
                // var points=convertJson(msg2);
                map.setCenter(new google.maps.LatLng(points[0][0],points[0][1]), 3);
              //  var gray_icon = getIcon("gray");
                //alert(devicearry[k]);
              //alert($("#"+devicearry[k]).val());
			   var geocoder = new google.maps.Geocoder();
                                geocoder.geocode({
                                    latLng: new google.maps.LatLng(points[0][0],points[0][1])
                                }, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        //  if (results[0]) {
                                        place = results[0].formatted_address;
                var infowindow1="<font size='2'>Start location:"+place+" <br/>("+points[0][3]+")</font>";
                var popupinfo={
                    text:infowindow1,
                    map:map,
                    icon : "deviceTracking/images/mm_20_gray.png",                   
                    showpop:true,
                    position:new google.maps.LatLng(points[0][0],points[0][1])
                };
                
                marker22 = new PopupMarker(popupinfo);
                
                   }
                                });

                var i=0;
                var m=-1;
                   geocoder.geocode({
                                    latLng: new google.maps.LatLng(locations[locations.length-1][0],locations[locations.length-1][1])
                                }, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        //  if (results[0]) {
                                        place = results[0].formatted_address;
                      infowindow1="<font size='2'>End Location:"+place+"<br/> ("+locations[locations.length-1][3]+")</font>";
               popupinfo={
                    text:infowindow1,
                    map:map,
                    icon : "images/rotate/vehicle0.png",                   
                    showpop:true,
                    position:new google.maps.LatLng(locations[locations.length-1][0],locations[locations.length-1][1])
                };
                
                marker22 = new PopupMarker(popupinfo);
                
                  }
                                });
                
                            for(i=0;i<locations.length-1;i++)
                                {
                            m++;
                         
                            var point = new google.maps.LatLng(locations[i][0], locations[i][1]);
        
                     //     if(!map.getBounds().contains(point))
                         //      map.panTo(point);

                       
                          var color1="#00FF00";
//                                
//                                if(locations[i][2] < 60)
//                                {
//                                    color1="#00FF00";
//                                }
//                                else
//                                {
//                                    color1="#FF0000";
//                                }
                           color1=getcolor(k);     
                        
         var polyline = new google.maps.Polyline({path:[new google.maps.LatLng(locations[m][0],locations[m][1]),  new google.maps.LatLng(locations[m+1][0],locations[m+1][1])], strokeColor:color1,strokeWeight:3});
                                	 
                                 polyline.setMap(map);
                

                            }
                            
                            if(i==(msg2.length-1))
                                {
                                        $("#devicedetail").append("<span style='background-color:"+color1+"'>"+$("#"+devicearry[k]).val()+"</span>");
                                incr++;
                              console.log("VVV::"+incr+"==="+devicearry.length);
                                if(incr < devicearry.length)      
                                {
                                
                               makemap(incr);     
                              }
                                }
                 
                            holdtime=0;
                         //speeds indicate the speed of the loop executing.......
                
            }
            }});
            }
        
    
//}
 function deleteOverlays() {
            
       // alert("agsdg");
            
          for (var i = 0, marker; marker = markers23[i]; i++) {
                   // marker.setVisible(false);
                    marker.hideMarker();
                }
            }



function getcolor2(i)
{
    var color="";
   if(i==0)
       {
         color="#FF4500";
       }
       else if(i==1)
           {
               color="#D2B48C";
           }else if(i==2)
           {
               color="#9400D3";
           }
           else if(i==3)
               {
                   color="#C71585";
               }
                else if(i==4)
               {
                   color="#D2B48C";
               } else if(i==5)
               {
                   color="#6A5ACD";
               } else if(i==6)
               {
                   color="#FFFACD";
               } else if(i==7)
               {
                   color="#1414FF";
               }
                else if(i==8)
               {
                   color="#ffff14";
               }
             //  console.log("BNS::"+i+"::"+color);
    return color;
    
}

function getcolor(i)
{
    var color="";
   if(i==0)
       {
         color="#FF4500";
       }
       else if(i==1)
           {
               color="#0A2A0A";
           }else if(i==2)
           {
               color="#0431B4";
           }
           else if(i==3)
               {
                   color="#FF00FF";
               }
                else if(i==4)
               {
                   color="#64FE2E";
               } else if(i==5)
               {
                   color="#F7FE2E";
               } else if(i==6)
               {
                   color="#0B0B61";
               } else if(i==7)
               {
                   color="#FF0000";
               }
                else if(i==8)
               {
                   color="#ffff14";
               }
             //  console.log("BNS::"+i+"::"+color);
    return color;
    
}


 function removepopups() {
            
       // alert("agsdg");
            
          for (var i = 0, marker; marker = markershown[i]; i++) {
                   // marker.setVisible(false);
                    marker.hideMarker();
                }
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

function getIcon(type) {
  //  var icon = [];
    if (type == "gray")
      image = "images/mm_20_gray.png";
    else if (type == "red")
      image = "images/mm_20_red.png";
    else if (type == "green")
       image = "images/mm_20_green.png";
    else if (type == "yellow")
     image = "images/mm_20_yellow.png";
    else if (type == "white")
      image = "images/mm_20_white.png";
    else if (type == "center")
    image = "images/center.gif";
    else
        return null;
   // icon.iconSize = new GSize(12, 20);
   // icon.iconAnchor = new GPoint(6,20);
    //icon.iconAnchor = new GPoint(1,1 );
//    icon.infoWindowAnchor = new GPoint(10, 1);

    return image;
}


function GetVehIcon(Angle)
{
    var icon = new GIcon();
    //alert(Angle);
          
            
    if (Angle > 350 || Angle < 10)
        icon.image = "images/0.png";
    if (Angle >= 10 && Angle <= 35)
        icon.image = "images/0_45.png";
    if (Angle > 35 && Angle < 55)
        icon.image = "images/45.png";
    if (Angle >= 55 && Angle <= 80)
        icon.image = "images/45_90.png";
    if (Angle > 80 && Angle < 100)
        icon.image = "images/90.png";
    if (Angle >= 100 && Angle <= 125)
        icon.image = "images/90_135.png";
    if (Angle > 125 && Angle < 145)
        icon.image = "images/135.png";
    if (Angle >= 145 && Angle <= 170)
        icon.image = "images/135_180.png";
    if (Angle > 170 && Angle < 190)
        icon.image = "images/180.png";
    if (Angle >= 190 && Angle <= 215)
        icon.image = "images/180_225.png";
    if (Angle > 215 && Angle < 235)
        icon.image = "images/225.png";
    if (Angle >= 235 && Angle <= 260)
        icon.image = "images/225_270.png";
    if (Angle > 260 && Angle < 280)
        icon.image = "images/270.png";
    if (Angle >= 280 && Angle <= 305)
        icon.image = "images/270_315.png";
    if (Angle > 305 && Angle < 325)
        icon.image = "images/315.png";
    if (Angle >= 325 && Angle <= 350)
        icon.image = "images/315_350.png";
                        
    icon.iconSize = new GSize(40, 40);
    icon.iconAnchor = new GPoint(15, 20);
    icon.infoWindowAnchor = new GPoint(10, 1);
    return icon;
}
       

function convertJson(text)
{

    var newStr =text.toString().substring(0,text.toString().length-1);
    var JsonObj = eval('[' +newStr + ']');

    return JsonObj;
}

function dateconvert(datepic,timepic)
{
    //alert(datepic);
    if(timepic=="")
        {
       timepic="00:00:00";     
        }
    var dd=datepic.substr(0,2);
    var mm=datepic.substr(3,2);
    var yy=datepic.substr(6,4);
    var tim=datepic.substr(11,8);
    //alert("mm"+mm+"dd"+dd+"yy"+yy);
    var converted=yy.concat("-",mm,"-",dd," ",timepic+":00");
    return converted;
}

//for get the time differnce between two date...
function getTimeDiff(serverTime, objTime){
    var timeDiff =  (new Date((serverTime.split("."))[0].replace(/-/g, "/")).getTime() - new Date((objTime.split("."))[0].replace(/-/g, "/")).getTime()) / 1000;
    if(timeDiff < 0)
        timeDiff = 1;
    return timeDiff;
}

//for get date from the mssecond
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

//for round the total km
function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

function theclock(rightnow){
    //  var rightnow= new Date();

    var month= rightnow.getMonth();
    var today= rightnow.getDate();
    var year= rightnow.getYear();
    var hour= rightnow.getHours();
    var min= rightnow.getMinutes();
    var second= rightnow.getSeconds();

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