


function selectevent(id)
{
var name="no event";

if(id==01){ name="SOS button is pressed"; }
else if(id==49){ name="Button A is pressed";}
else if(id==09) { name="Auto Shutdown Alarm";}
else if(id==10){  name="Low battery Alarm";} 
else if(id==11){ name="Over Speed Alarm";}
else if(id==13){ name="Recover From Over Speed";}
else if(id==14){ name="Forward acceleration alarm";}
else if(id==15){ name="Reverse acceleration alarm ";}
else if(id==30){ name="Parking Alarm";}
else if(id==42){ name="Out Geo-fence Alarm";}
else if(id==43){ name="Into Geo-fence Alarm";}
else if(id==50){ name="IO-1 Close";}
else if(id==51){ name="IO-1 Open";}
else if(id==52){ name="IO-2 Close";}
else if(id==53){ name="IO-2 Open";}
else if(id==54){ name="Reserve";}
else if(id==55){ name="Reserve";}
else if(id==56){ name="Reserve";}
else if(id==57){ name="Reserve";}
else if(id==60){ name="Begin Charge";}
else if(id==61){ name="End Charge";}
else if(id==88){ name="Heartbeat ";}
else if(id==91){ name="Into Sleep Mode";}
else if(id==92){ name="Wakeup From Sleep Mode";}
else{ name="no Event";}

return name;
}
