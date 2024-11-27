var interval = 0;
var timeout = 0;
var map = "";
var markers23 = [];
var markershow = [];
var marker9 = "";
var markersArray = [];
/*var endDateTextBox = $('#end');
var startDateTextBox = $('#start');*/


$(document).ready(function() {
    $('#btpause').attr('disabled', 'disabled');

    $("#ex1Slider").slider({
        max: 8,
        value: 5,
        animate: true
    });


    
  $("#ex1Slider").slider({
        change: function(event, ui) {

        	pause();
            initialize();
        }
    });
});

function stopTracking()
{

    window.clearInterval(interval);

    clearTimeout(timeout);
    $('#btnstart').removeAttr('disabled');
    //$('#speeds').removeAttr('disabled');
    $("#forpause").val("");
    $("#starttime").val("");
    $("#pausedist").val("");
}
function pauseTracking()
{

    window.clearInterval(interval);

    clearTimeout(timeout);
    $('#btnstart').removeAttr('disabled');


//$('#speeds').removeAttr('disabled');

}
function initialize()
{
    pauseTracking();
    //  alert(startDateTextBox.datetimepicker('getDate'));



    var slider = $("#ex1Slider").val();
  // alert(slider);

    $('#btpause').removeAttr('disabled');
    //  $('#speeds').attr('disabled', 'disabled');
    var reservationtime= $("#datepicker").val();
  
    
    var speeds = 5;
    var mid = $("#sess").val();
    var deviceid = $("#deviceId").val();

    
    var marker22;
    var markershown = [];
    var fromtime ="";
    var totime ="";
    if (reservationtime == "")
    {
        alert("please Select Date");
       
    }
    else
    {
    	 // var part=reservationtime.split("-");
    	     
    	    totime = reservationtime +" "+"23:59:00";
    	    var starttime= reservationtime +" "+"00:00:00";
    	    if($("#starttime").val()=="")
    	    	{
    	    $("#starttime").val("00:00:00");
    	    	}
    	    fromtime =reservationtime +" "+ $("#starttime").val();
        $('#btnstart').attr('disabled', 'disabled');
        var totalholdtime = 0;
        var marker = "";
        var polylen;
        //var map = new google.maps.Map(document.getElementById("map_canvas"));
        var sum = 0;
       // alert($("#pausedist").val());
        if ($("#pausedist").val() == "")
            sum = 0;
        else
            sum = parseInt($("#pausedist").val());

        //if($("#forpause").val()=="")
        //  {
        // alert("fff");

        var post_data = "did=" + deviceid + "&sdate=" + fromtime + "&edate=" + totime + "&start=0&max=2";
      //alert(post_data);
        $.ajax({
            type: "GET",
            url: API+"Jsoncontroller?Operation=getplaybackdata",
            data: post_data,
            dataType: "jsonp",
            beforeSend: function(HttpRequest) 
            {
            	//$("#resultLoading").hide();
            },
            success: function(msg2) {


                 //alert(msg2);
                var points = msg2;

                if (msg2 == "")
                {
                	alert("Sorry No Data For Selected Time");
                    window.clearInterval(interval);
                       
                }
                else if (msg2 == "Invalid_Host")
                {
                    alert("sorry invalid request Please Login Again");
                }
                else
                {

                    $("#showpoi").removeAttr("disabled");
                    start();

                    var myOptions = {
                        zoom: 14,
                        center: new google.maps.LatLng(points[0][0], points[0][1]),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    if ($("#forpause").val() == "")
                    {

                        //alert($("#forpause").val());
                        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                       // var infowindow1 = "";


                       /* var geocoder = new google.maps.Geocoder();
                        geocoder.geocode({
                            latLng: new google.maps.LatLng(points[0][0], points[0][1])
                        }, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                //  if (results[0]) {
                                place = results[0].formatted_address;

                                infowindow1 = "<label>Starting Point:" + points[0][3] + "<br/>" + "Starting Point:</label>" + place;
                               //   alert(infowindow1);
                                //var infowindow1="Starting Point:"+theclock(points[0][3])+"<br/>"+"Starting Point";
                                var popupinfo = {
                                    text: infowindow1,
                                    iwidth: 20,
                                    iheight: 75,
                                    map: map,
                                    icon: "deviceTracking/images/dd-start.png",
                                    showpop: true,
                                    position: new google.maps.LatLng(points[0][0], points[0][1])
                                };

                                //marker22 = new PopupMarker(popupinfo);

                            }
                            });*/
                        
                    }
                    //   marker=marker22;

                    //   openib=ib;
                }
            }
        });
        //  }

        var maxr;
        var startcall;
        var tamyr;
        if (slider == 0)
        {
            speeds = 5000;
            maxr = 5;
            startcall = 25000;
            tamyr = 4;
        }
        else if (slider == 1)
        {
            speeds = 3000;
            maxr = 6;
            startcall = 18000;
            tamyr = 5;
        }
        else if (slider == 2)
        {
            speeds = 1000;
            maxr = 15;
            startcall = 15000;
            tamyr = 14;
        }
        else if (slider == 3)
        {
            speeds = 500;
            maxr = 300;
            startcall = 150000;
            tamyr = 299;
        }
        else if (slider == 4)
        {
            speeds = 400;
            maxr = 30;
            startcall = 12000;
            tamyr = 29;
        }
        else if (slider == 5)
        {
            speeds = 300;
            maxr = 50;
            startcall = 15000;
            tamyr = 49;
        }
        else if (slider == 6)
        {
            speeds = 200;
            maxr = 200;
            startcall = 40000;
            tamyr = 199;
        }

        else if (slider == 7)
        {
            speeds = 100;
            maxr = 200;
            startcall = 20000;
            tamyr = 199;
        }
        else if (slider == 8)
        {
            speeds = 50;
            maxr = 400;
            startcall = 20000;
            tamyr = 399;
        } else if (slider == 9)
        {
            speeds = 50;
            maxr = 400;
            startcall = 20000;
            tamyr = 399;
        } else if (slider == 10)
        {
            speeds = 50;
            maxr = 400;
            startcall = 20000;
            tamyr = 399;
        }
        // map.setUIToDefault();
        interval = setInterval(function() {
            start();
        }, startcall);
        var tamy = 0;

        function start() 
        {


            var post_data = "did=" + deviceid + "&sdate=" + fromtime + "&edate=" + totime + "&start=" + tamy + "&max=" + maxr;
            //alert(post_data);
            $.ajax({
                type: "GET",
                url: API+"Jsoncontroller?Operation=getplaybackdata",
                dataType: "jsonp",
                data: post_data,
                        beforeSend: function(HttpRequest)
                        {
                        	$("#resultLoading").hide();
                       },
                success: function(msg)
                {

                    var locations = msg;
                    tamy = tamy + tamyr;
                    var gray_icon = getIcon("gray");

                    if (msg.length < maxr)
                    {
                        window.clearInterval(interval);
                        $('#btnstart').removeAttr('disabled');
                    }
                    var i = 0;
                    var m = -1;
                    (function addDot() {
                        timeout = setTimeout(function() {
                            if (i++ < locations.length - 1) {
                                m++;
                                var holdtime = 0;

                                var point = new google.maps.LatLng(locations[i][0], locations[i][1]);
                                    map.panTo(point);

                                totalholdtime = getTimeDiff(locations[i][3].toString(), locations[m][3].toString());
                                holdtime = exchangeTime(totalholdtime);

                                if (totalholdtime < $("#ophold").val())
                                {
                                    holdtime = 0;
                                }
                                
                                  //  polylen = distance(locations[m][0], locations[m][1], locations[m + 1][0], locations[m + 1][1]);
                              
                                var color1 = "#00FF00";
                                //   alert($("#overspeed").val());
                                if (parseInt(locations[i][2]) < $("#overspeed").val())
                                {
                                    color1 = "#00FF00";
                                }
                                else
                                {
                                    color1 = "#FF0000";
                                }
                                //      var polyline = new google.maps.Polyline([new google.maps.LatLng(locations[m][0],locations[m][1]),  new google.maps.LatLng(locations[m+1][0],locations[m+1][1])], color1, 3);

                                var polyline = new google.maps.Polyline({
                                    path: [new google.maps.LatLng(locations[m][0], locations[m][1]), new google.maps.LatLng(locations[m + 1][0], locations[m + 1][1])],
                                    strokeColor: color1,
                                    strokeWeight: 3
                                });
                                // alert(polyline.getLength()); 
                                sum = sum + polylen;
                                //   }
                                //alert(locations[i][3]);
                                $("#forpause").val(locations[i][3]);
                                $("#pausedist").val(sum);
                                    //marker22 = new PopupMarker(popupinfo);

                                     marker22 = new google.maps.Marker({
                                        position: new google.maps.LatLng(locations[m + 1][0], locations[m + 1][1]),
                                     // icon: new google.maps.MarkerImage(image),
                                icon: GetVehIcon(parseInt(locations[i][4])),
                                        map: map
                                    });
                                    deleteOverlays();
                                    marker22.setMap(map);
                                    markers23.push(marker22);
                                    markersArray.push(marker22);
                                  
                                polyline.setMap(map);
                                
                                holdtime = 0;
                                addDot();
                                //     }
                            }

                        }, speeds); //speeds indicate the speed of the loop executing.......
                    })();
                }
            });
        }
    }
}

function stoptracking22()
{
    window.clearInterval(interval);
    $('#btnstart').removeAttr('disabled');
    $('#StatusBar').jnotifyAddMessage({
        text: 'Total Travel Distance ' + roundNumber(sum, 2) + 'K.M. from:-' + fromtime + 'To:- ' + totime,
        permanent: true,
        showIcon: true

    });
}
function deleteOverlays22()
{

    // alert("agsdg");

    for (var i = 0, marker; marker = markers23[i]; i++) {
        // marker.setVisible(false);
        marker.hideMarker();
        marker.setMap(null);
    }
}

function deleteOverlays() {
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }
}

function removepopups() 
{

    // alert("agsdg");

    for (var i = 0, marker; marker = markershown[i]; i++) {
        // marker.setVisible(false);
        marker.hideMarker();
    }
}

function distance(lat1, lon1, lat2, lon2) {
    var R = 6378;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
    var icon = "images/rotate/vehicle0.png";
    //alert(Angle);            
    if (Angle > 350 || Angle < 10)
        icon = "images/rotate/vehicle0.png";
    if (Angle >= 10 && Angle <= 35)
        icon = "images/rotate/vehicle0_45.png";
    if (Angle > 35 && Angle < 55)
        icon = "images/rotate/vehicle45.png";
    if (Angle >= 55 && Angle <= 80)
        icon = "images/rotate/vehicle45_90.png";
    if (Angle > 80 && Angle < 100)
        icon = "images/rotate/vehicle90.png";
    if (Angle >= 100 && Angle <= 125)
        icon = "images/rotate/vehicle90_135.png";
    if (Angle > 125 && Angle < 145)
        icon = "images/rotate/vehicle135.png";
    if (Angle >= 145 && Angle <= 170)
        icon = "images/rotate/vehicle135_180.png";
    if (Angle > 170 && Angle < 190)
        icon = "images/rotate/vehicle180.png";
    if (Angle >= 190 && Angle <= 215)
        icon = "images/rotate/vehicle180_225.png";
    if (Angle > 215 && Angle < 235)
        icon = "images/rotate/vehicle225.png";
    if (Angle >= 235 && Angle <= 260)
        icon = "images/rotate/vehicle225_270.png";
    if (Angle > 260 && Angle < 280)
        icon = "images/rotate/vehicle270.png";
    if (Angle >= 280 && Angle <= 305)
        icon = "images/rotate/vehicle270_315.png";
    if (Angle > 305 && Angle < 325)
        icon = "images/rotate/vehicle315.png";
    if (Angle >= 325 && Angle <= 350)
        icon = "images/rotate/vehicle315_350.png";

    return icon;
}




function dateconvert(datepic, timepic)
{
    var dd = datepic.substr(0, 2);
    var mm = datepic.substr(3, 2);
    var yy = datepic.substr(6, 4);
    var tim = datepic.substr(11, 8);
    //alert("mm"+mm+"dd"+dd+"yy"+yy);
    var converted = yy.concat("-", mm, "-", dd, " ", timepic);
    return converted;
}


var gmarkers = [];

function displayPoint(mid) {

    if (document.getElementById("showpoi").checked) {
    	var url=API+"Jsoncontroller?";
    	 var query="Operation=getpoipointsbyMid";
    	 //alert(url+query);
    	 $.ajax({
    	     type: "GET",
    	     url: url+query,
    		 dataType: "jsonp",
    	     beforeSend: function(HttpRequest) {
    	     	//$("#getvehical").html(' <img src="images/loading.gif"/>');
    	     },
    	     success: function(msg2) 
    	     {
    	    	 showPoi(eval(msg2));
    	     }
    	 });
    }
    else {
        for (i = 0; i <= gmarkers.length - 1; i++) {
            // alert('test at 506');
            var marker = gmarkers[i];
            marker.setVisible(false);
        }
    }
}



function showPoi(historyList) {


    //     alert(historyList);
    storeHistoryList = null;

    if (historyList != null) {

        storeHistoryList = historyList;

        var storeHistoryListLength = storeHistoryList.length;

        for (i = 0; i < storeHistoryListLength; i++) {

            var point1 = new google.maps.LatLng(storeHistoryList[i].latitude, storeHistoryList[i].langitude);
            //  alert(point1);
            marker = createPoiMarker(point1, storeHistoryList[i].address);
            gmarkers[i] = marker;
        }
    }
}

var storeHistoryList="";
function createPoiMarker(point, address) {
    var image = "images/mm_20_red.png";


    var marker = new google.maps.Marker({
        position: point,
        icon: new google.maps.MarkerImage(image),
        map: map
    });
    console.log(storeHistoryList[i].no);

    
    if(storeHistoryList[i].no=='2817'){
    	draw_circle = new google.maps.Circle({
            center: marker.position,
            radius: 1000,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map: map
        });	
    	
    }
    
    marker.setMap(map);
    var contentString = '<div id="content" align="left">' + "POI Name: <b>" + storeHistoryList[i].location
            + "</b><br>Location: <b>" + address + "</b><br>GeoLocation: <b>" + point + '</b></div>';
    
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);

    });

    return marker;
}
function goBack()
{
    window.history.back()
}
function pause() {
    //alert("sdagdas");
    var dt = "";
    if ($("#forpause").val() != "")
    {
        dt = new Date($("#forpause").val());
     // alert(dt);
        $("#starttime").val(dt.getHours() + ":" + dt.getMinutes());
        //alert($("#starttime").val());
    }
    else
    {

        $("#starttime").val("00:00");
    }


    pauseTracking();
}
