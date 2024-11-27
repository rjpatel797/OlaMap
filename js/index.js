function viewpage(b)
{
	
		 $("#page").load(b);//here to  change content part
		
		
		// callforleftlink();
 } 
 function ajaxindicatorstart(text)
 {
 	if(jQuery('body').find('#resultLoading').attr('id') != 'resultLoading'){
 	jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="images/anicartire4.gif"><div style="color:black;">'+text+'</div></div><div class="bg"></div></div>');
 	}

 	jQuery('#resultLoading').css({
 		'width':'100%',
 		'height':'100%',
 		//'position':'fixed',
 		'margin-left':'0%',
 		'margin-top':'0%',
 		'z-index':'10000000',
 		'top':'0',
 		'left':'0',
 		'right':'0',
 		'bottom':'0'
 	});

 	jQuery('#resultLoading .bg').css({
 		'background':'#858585',
 		'opacity':'0.7',
 		'width':'100%',
 		'height':'100%',
 		'position':'absolute',
 		'top':'0'
 	});

 	jQuery('#resultLoading>div:first').css({
 		'width': '250px',
 		'height':'75px',
 		'text-align': 'center',
 		'position': 'fixed',
 		'margin-left':'15%',
 		'margin-top':'60%',
 		'top':'0',
 		'left':'0',
 		'right':'0',
 		'bottom':'0',
 		'font-size':'16px',
 		//'z-index':'10',
 		'color':'#ffffff'

 	});

     jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeIn(300);
     jQuery('body').css('cursor', 'wait');
 }
 
 function ajaxindicatorstop()
 {
	 jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeOut(300);
     jQuery('body').css('cursor', 'default');

 }
 jQuery(document).ajaxStart(function () {
		//show ajax indicator
ajaxindicatorstart('loading data.. please wait..');
}).ajaxStop(function ()
{
//hide ajax indicator
ajaxindicatorstop();
}).ajaxError(function() {
   // alert( "Handler for .error() called." );
   //window.location="home.html"
})
 jQuery.ajax({
	   global: false,
	   // ajax stuff
	});

 function calldeviceonmap(did)
 { 
	$("#didfromdashbord").val(did);
	changeview2('deviceTracking/deviceonmap.html');

	// var link='<div class="sidebar" id="scrollspy"><ul class="nav sidebar-menu" style="margin-top: 100px;"> </ul></div>';

	
 }
 
 function calldeviceplayback(did)
 { 
	$("#diddd").val(did);
	changeview2('deviceTracking/PlaybackTrack.html');

	// var link='<div class="sidebar" id="scrollspy"><ul class="nav sidebar-menu" style="margin-top: 100px;"> </ul></div>';

	
 }
 function viewpathonmap(did)
 { 
	$("#diddd").val(did);
	changeview2('deviceTracking/Viewpath.html');

	// var link='<div class="sidebar" id="scrollspy"><ul class="nav sidebar-menu" style="margin-top: 100px;"> </ul></div>';

	
 }
 
 
 
 function changeview2(b)
 {
	// alert(b);
	 
	
 	//alert("in changeview");
 	if(b=="")
 		{
 		 $("#getvehical").html('<center><h1>Welcome to Vehicle Tracking System</h1><br/><br/><p>(Please use the navigation tree)</p></center>');
 		}
 	else
 		{
 		 $("#getvehical").load(b);//here to  change content part
 		
 		}

  }
 function onpageloading()
 {
	 
	
	 $("#getvehical").load('Dashboardformanager.html');
	// callforleftlinkforiphone();
	 
 }
 
 function datatable()
 {
  	$('#expiryreport')
  	  .dataTable(
  	  {
  	  "scrollX": true
  	               
  	  });
  	
 }