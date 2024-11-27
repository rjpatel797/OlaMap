      
      
      var geocoder;
            var address;
            var i=1;
            var coordin=new Array();
            var co=new Array();
            
            function alldiv(){
               // setTimeout('return;', 5000);      
                getAddress(document.getElementById("start").innerHTML+",start");
                getAddress(document.getElementById("end").innerHTML+",end");
                while(document.getElementById("stop"+i).innerHTML!=""){
                    co[i+1]=document.getElementById("stop"+i).innerHTML+",stop"+i;
                    //alert(co[i+1]);                 
                   getAddress(co[i+1]);
                   //pausecomp(1000);
                    i++;                   
                }
            }
            
            function pausecomp(millis)
            {
               // alert(''+millis);
                var date = new Date();
                var curDate = null;

                do {
                    curDate = new Date(); 
                }while(curDate-date < millis);
            }
            
            function getAddress(coordinates) {                
                    coordin=coordinates.split(",");
                    geocoder = new GClientGeocoder();
                    geocoder.getLocations(new GLatLng((coordin[0]),(coordin[1])),getCallBackFor(coordin[2]));
            }
            
            function getCallBackFor(coo){
                return (function(response){
                    place = response.Placemark[0];                    
                    document.getElementById(coo).innerHTML=place.address;
                });
            }            
            
         