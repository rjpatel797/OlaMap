var interval=0;
var timeout=0;
var map="";
var markers23=[];
var markershow=[];
var marker9="";
$(document).ready(function() {
$('#btpause').attr('disabled', 'disabled');

           
  $('#start').datepicker({
    onClose: function(dateText, inst) {
        var endDateTextBox = $('#end');
        if (endDateTextBox.val() != '') {
            var testStartDate = new Date(dateText);
            var testEndDate = new Date(endDateTextBox.val());
            if (testStartDate > testEndDate)
                endDateTextBox.val(dateText);
        }
        else {
            endDateTextBox.val(dateText);
        }
    },
    onSelect: function (selectedDateTime){
        var start = $(this).datetimepicker('getDate');
        $('#end').datepicker('option', 'minDate', new Date(start.getTime()));
    },maxDate: new Date()
});
$('#end').datepicker({
    onClose: function(dateText, inst) {
        var startDateTextBox = $('#start');
        if (startDateTextBox.val() != '') {
            var testStartDate = new Date(startDateTextBox.val());
            var testEndDate = new Date(dateText);
            if (testStartDate > testEndDate)
                startDateTextBox.val(dateText);
        }
        else {
            startDateTextBox.val(dateText);
        }
    },
    onSelect: function (selectedDateTime){
        var end = $(this).datetimepicker('getDate');
        $('#start').datepicker('option', 'maxDate', new Date(end.getTime()) );
    },maxDate: new Date()
});

$("#starttime").timepicker({});
$("#endtime").timepicker({});

$("#starttime").val("00:00");

$("#endtime").val("23:59");


    // For jNotify Inizialization
    // Parameter:
    // oneAtTime : true if you want show only one message for time
    // appendType: 'prepend' if you want to add message on the top of stack, 'append' otherwise
    $('#StatusBar').jnotifyInizialize({
        oneAtTime: true
    })
   

});
                    
function stopTracking(){

    window.clearInterval(interval);

    clearTimeout(timeout);
    $('#btnstart').removeAttr('disabled');
//$('#speeds').removeAttr('disabled');
    $("#forpause").val(""); 
     $("#pausedist").val(""); 
}
function pauseTracking(){

    window.clearInterval(interval);

    clearTimeout(timeout);
    $('#btnstart').removeAttr('disabled');
    
    
//$('#speeds').removeAttr('disabled');
     
}
function initialize()
{
    pauseTracking();

    
    $('#btpause').removeAttr('disabled');
    //  $('#speeds').attr('disabled', 'disabled');

    var stimes=$("#start").val();
    var etimes=$("#end").val();
    var speeds=$("#speeds").val();
    var mid=$("#sess").val();
    var deviceid=$("#deviceId").val();
    var fromtime=$("#start").val()+" "+$("#starttime").val();
    var totime=$("#end").val()+" "+$("#endtime").val();
    var marker22;
    var markershown=[];
   // if(getTimeDiff(fromtime,totime) > 1680000)
 //   {
        // alert("Sorry Your Range is too Long <br/> It must less then 7 day");
     //   $('#StatusBar').jnotifyAddMessage({
    //        text: 'Sorry Your Range is too Long.It must less then 7 day',
     //       permanent: false,
     //       showIcon: true,
     //       type:'error'

   //     });
  //  }
    if(stimes=="")
    {
        // alert("please Select Start Time");
        $('#StatusBar').jnotifyAddMessage({
            text: 'Please Select Start Time',
            permanent: false,
            showIcon: true,
            type:'error'

        });
    }
    else if(etimes=="")
    {
        //alert("please Select End Time");
        $('#StatusBar').jnotifyAddMessage({
            text: 'Please Select End Time',
            permanent: false,
            showIcon: true,
            type:'error'
                                               
        });

    }
    else
    {
        $('#btnstart').attr('disabled', 'disabled');
        var totalholdtime=0;
        var marker="";
        var polylen;
        //var map = new google.maps.Map(document.getElementById("map_canvas"));
         var sum=0;
        if($("#pausedist").val()=="")
       sum=0;
   else
       sum=parseInt($("#pausedist").val());
    
//if($("#forpause").val()=="")
  //  {
       // alert("fff");
       alert(fromtime+"--"+totime);
        liveTracking.getplayback(deviceid,fromtime,totime,0,2,function(msg2)
        {
            
            var points=new Array(msg2.length);
            points=msg2;
            //    alert(msg2);
            //      alert(dataAry[0][0]);
            //     var lati=dataAry[i][1];
            //     var langi=dataAry[i][2];
            //     var speed=dataAry[i][3];
            //     var devicedate=theclock(dataArray[i][4]);
            if(msg2=="")
            {
                
                window.clearInterval(interval);
                //      alert("Sorry No Data For Selected Time");
                $('#btnstart').removeAttr('disabled');
                $('#StatusBar').jnotifyAddMessage({
                    text: 'Oppppss.. Sorry No Data For Selected Time',
                    permanent: false,
                    showIcon: true,
                    type: 'error'
                });
            }
            else
            {
                // var points=convertJson(msg2);
                     start();
                       
        var myOptions = {
            zoom: 14,
            center: new google.maps.LatLng(points[0][0],points[0][1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

           if($("#forpause").val()=="")
               {
                   
               //alert($("#forpause").val());
        map = new google.maps.Map(document.getElementById("map_canvas"),myOptions); 
                var infowindow1="<font size='2'><b>Starting AT:</b>"+theclock(points[0][3])+"<br/>"+"Starting Point<font>";
                var popupinfo={
                    text:infowindow1,
                    iwidth:20,
                    iheight:34,
                    map:map,
                    icon : "images/dd-start.png",                   
                    showpop:true,
                    position:new google.maps.LatLng(points[0][0],points[0][1])
                };
                
                marker22 = new PopupMarker(popupinfo);
               }
                //   marker=marker22;
           
            //   openib=ib;
            }
            
        });
  //  }
    
        var maxr;
        var startcall;
        var tamyr;
        if(speeds==5000)
        {
            maxr=5;
            startcall=25000;
            tamyr=4;
        }
        else if(speeds==3000)
        {
            maxr=6;
            startcall=18000;
            tamyr=5;
        }
        else if(speeds==1000)
        {
            maxr=15;
            startcall=15000;
            tamyr=14;
        }
        else if(speeds==500)
        {
            maxr=300;
            startcall=150000;
            tamyr=299;
        }
        else if(speeds==400)
        {
            maxr=30;
            startcall=12000;
            tamyr=29;
        }
        else if(speeds==300)
        {
            maxr=50;
            startcall=15000;
            tamyr=49;
        }
        else if(speeds==200)
        {
            maxr=200;
            startcall=40000;
            tamyr=199;
        }
       
        else if(speeds==100)
        {
            maxr=200;
            startcall=20000;
            tamyr=199;
        }
        else if(speeds==50)
        {
            maxr=400;
            startcall=20000;
            tamyr=399;
        }
        // map.setUIToDefault();
        interval= setInterval(function() {
            start();
        }, startcall);
        var tamy=0;
        //var lastltln=new GLatLng(poi[0].LAT,locations[0].LANG);

        function start(){
            liveTracking.getplayback(deviceid,fromtime,totime,tamy,maxr,function(msg)
            {
                var locations=new Array(msg.length);
                locations=msg;
                tamy=tamy+ tamyr;
                //      var locations=convertJson(msg);
                var gray_icon = getIcon("gray");
                var red_icon = getIcon("red");

                if(msg.length < maxr)
                {
                   window.clearInterval(interval);
                    $('#btnstart').removeAttr('disabled');
                }
                var i=0;
                var m=-1;
                (function addDot() {
                    timeout=setTimeout(function() {
                        if (i++ <locations.length-1) {
                            m++;
    
                            if(locations[m][2] > 50)
                            {
                                gray_icon=red_icon;
                            }
                                
                            var holdtime=0;

                    
                            var point = new google.maps.LatLng(locations[i][0], locations[i][1]);
        
                            if(!map.getBounds().contains(point))
                                map.panTo(point);

                            totalholdtime=getTimeDiff(locations[i][3].toString(),locations[m][3].toString());
                            holdtime=exchangeTime(totalholdtime);
                          
                            if(totalholdtime < $("#ophold").val())
                            {
                                holdtime=0;
                            }
                            polylen=distance(locations[m][0], locations[m][1], locations[m+1][0], locations[m+1][1]);
                           
              // alert(  computeDistanceBetween(new google.maps.LatLng(locations[m][0], locations[m][1]),new google.maps.LatLng(locations[m+1][0], locations[m+1][1])));
                            if(polylen < 6)
                            {    
                                var color1="#00FF00";
                                
                                if(locations[i][2] < 60)
                                {
                                    color1="#00FF00";
                                }
                                else
                                {
                                    color1="#FF0000";
                                }
                                //      var polyline = new google.maps.Polyline([new google.maps.LatLng(locations[m][0],locations[m][1]),  new google.maps.LatLng(locations[m+1][0],locations[m+1][1])], color1, 3);
                                
                                var polyline = new google.maps.Polyline({
                                    path:[new google.maps.LatLng(locations[m][0],locations[m][1]),  new google.maps.LatLng(locations[m+1][0],locations[m+1][1])], 
                                    strokeColor:color1,
                                    strokeWeight:3
                                });
                                	// alert(polyline.getLength()); 
                                sum=sum+polylen;
                            }
           //alert(locations[i][3]);
          $("#forpause").val(locations[i][3]);
          $("#pausedist").val(sum);
          
                            var infowindow="<font size='2'><b>Stop Time</b>:"+holdtime+"<br/><b>LastUpdate:</b>"+theclock(locations[i][3])+"<br/>"+"<b>Total Distance:</b>"+roundNumber(sum,2)+"km</font>";
                            var popupinfo={
                                text:"<font size='2'><b>Speed:</b>"+locations[i][2]+"km/h"+"</font><br/>"+infowindow,
                                map:map,
                                 iwidth:12,
                                 iheight:20,
                                icon : gray_icon,                   
                                showpop:true,
                                position:new google.maps.LatLng(locations[m+1][0],locations[m+1][1])
                            };
                            if(totalholdtime < $("#ophold").val())
                            {
                                deleteOverlays();
                                marker22 = new PopupMarker(popupinfo);
                                marker22.setMap(map);    
                                markers23.push(marker22);
                            }
                            else
                            {                                                                           
                                var avglat=(parseFloat(locations[m][0])+parseFloat(locations[m+1][0]))/2;    
                                var avglang=(parseFloat(locations[m][1])+parseFloat(locations[m+1][1]))/2;       
                                
                                
                                var geocoder = new google.maps.Geocoder();
                                geocoder.geocode({
                                    latLng: new google.maps.LatLng(avglat,avglang)
                                    }, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        //  if (results[0]) {
                                        place = results[0].formatted_address;
                        
                                        //     alert("lat"+locations[i][0]+"---"+avglat+"lang"+locations[i][1]+"----t0---"+avglang);
                                        var popupinfo2={
                                            text:infowindow+"<br/><b>Location:</b>"+place,
                                            map:map,
                                            iwidth:32,
                                            iheight:37,
                                            icon :  "./images/stopicon.png",                   
                                            showpop:true,
                                            position:new google.maps.LatLng(avglat,avglang)
                                        };
                             
                                        markers = new PopupMarker(popupinfo2);
                            
                                        markers.setMap(map); 
                                        
                       

                                    //   markershow.push(marker);
                                    }
                                });
                
                        //map.addOverlay(marker);
                        }
                        // marker.setMap(map);
                        if(polylen < 30)
                        {
                            //   map.addOverlay(polyline);
                            polyline.setMap(map);
                        }
                        //google.maps.event.addListener(marker, 'click', function(event) {alert(event);});
         
                        //  openib=ib;
                        holdtime=0;
                        addDot();
                    }
                    },speeds); //speeds indicate the speed of the loop executing.......
                })();
                
            });
    }
}
}

function stoptracking22()
{
      window.clearInterval(interval);
                    $('#btnstart').removeAttr('disabled');
                    $('#StatusBar').jnotifyAddMessage({
                        text: 'Total Travel Distance '+roundNumber(sum,2)+'K.M. from:-'+stimes+'To:- '+etimes,
                        permanent: true,
                        showIcon: true
                                               
                    });
}
function deleteOverlays() {
            
    // alert("agsdg");
            
    for (var i = 0, marker; marker = markers23[i]; i++) {
        // marker.setVisible(false);
        marker.hideMarker();
       marker.setMap(null);
    }
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
       



function dateconvert(datepic,timepic)
{
    var dd=datepic.substr(0,2);
    var mm=datepic.substr(3,2);
    var yy=datepic.substr(6,4);
    var tim=datepic.substr(11,8);
    //alert("mm"+mm+"dd"+dd+"yy"+yy);
    var converted=yy.concat("-",mm,"-",dd," ",timepic);
    return converted;
}

function pause() {
    //alert("sdagdas");
    var dt=new Date($("#forpause").val());
 // var ddss=  dateFormat(dt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
  //alert(dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear());
  //alert(dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds());
var date="";
var months="";
if(dt.getDate().length==1)
    date="0"+dt.getDate();
else
    date=dt.getDate();

    if(dt.getMonth().length==1)
    months="0"+dt.getMonth();
else
    months=dt.getMonth();


  //$("#start").val(date+"/"+(months+1)+"/"+dt.getFullYear());
 

$("#starttime").val(dt.getHours()+":"+dt.getMinutes());
  
  //alert($("#forpause").val());
    pauseTracking();
}
