


$('.dofancy').fancybox({
		padding: 0, 
		titleShow: false, 
		overlayColor: '#333333', 
		overlayOpacity: .5,
		autoDimensions: true,
		centerOnScroll: true
	});
    
	$('#tab3').click(function(){
		$.fancybox.resize();
               });
		$('#tab1').click(function(){
		$.fancybox.resize();
		  });
		$('#tab2').click(function(){
		$.fancybox.resize();
			  });
		
		$('#tab1').click(function(){
			$('#headtxt').text('Profile')
		});
		
		$('#tab2').click(function(){
		$('#headtxt').text('Manage Sender Id')
							  });
	$('#tab3').click(function(){
		$('#headtxt').text('Credit')
	});




	// tab 1
	$('#tab1').click(function(){
		//switch menu
		$(this).parent().parent().find('td input').removeClass('active');
		$(this).addClass('active');
		
		//show tab1 content
		$('.tab_content').addClass('hide');
		$('#tab1_content').removeClass('hide');
	});
	
	
	// tab 2
	$('#tab2').click(function(){
		//switch menu
		$(this).parent().parent().find('td input').removeClass('active');
		$(this).addClass('active');
		
		//show tab2 content
		$('.tab_content').addClass('hide');
		$('#tab2_content').removeClass('hide');
	});
	
	
	// tab 3
	$('#tab3').click(function(){
		//switch menu
		$(this).parent().parent().find('td input').removeClass('active');
		$(this).addClass('active');
		
		//show tab3 content
		$('.tab_content').addClass('hide');
		$('#tab3_content').removeClass('hide');
	});
	
var chartWidth="650px";var chartHeight="240px";function findPosY(b){var a=0;if(b.offsetParent){while(1){a+=b.offsetTop;if(!b.offsetParent){break}b=b.offsetParent}}else{if(b.y){a+=b.y}}return a}function findPosX(b){var a=0;if(b.offsetParent){while(1){a+=b.offsetLeft;if(!b.offsetParent){break}b=b.offsetParent}}else{if(b.x){a+=b.x}}return a}function setChart(b,a,c){$(c).html("");$(b).visualize({type:a,width:chartWidth,height:chartHeight,colors:["#B11623","#292C37"]}).appendTo(c);if(navigator.appName=="Microsoft Internet Explorer"){$(".visualize").trigger("visualizeRefresh")}}function setNotifications(){$("#shortcut_notifications span").each(function(){if($(this).attr("rel")!=""){target=$(this).attr("rel");if($("#"+target).length>0){var a=findPosY(document.getElementById(target));var b=findPosX(document.getElementById(target));$(this).css("top",a-24+"px");$(this).css("left",b+60+"px")}}});$("#shortcut_notifications").css("display","block")}$(function(){$.preloadCssImages();$('input[title!=""]').hint();$("#wysiwyg").wysiwyg({css:"css/wysiwyg.css"});$("#main_menu").accordion({collapsible:true,autoHeight:false});$("#hide_menu").click(function(){$("#left_menu").hide();$("#show_menu").show();$("body").addClass("nobg");$("#content").css("marginLeft",30);$("#wysiwyg").css("width","97%");setNotifications()});$("#show_menu").click(function(){$("#left_menu").show();$(this).hide();$("body").removeClass("nobg");$("#content").css("marginLeft",240);$("#wysiwyg").css("width","97%");setNotifications()});$(".alert_warning").click(function(){$(this).fadeOut("fast")});$(".alert_info").click(function(){$(this).fadeOut("fast")});$(".alert_success").click(function(){$(this).fadeOut("fast")});$(".alert_error").click(function(){$(this).fadeOut("fast")});$(".media_photos li a[rel=slide]").fancybox({padding:0,titlePosition:"outside",overlayColor:"#333333",overlayOpacity:0.2});
    
    $("#chart_bar").click(function(){setChart("table#graph_data","bar","#chart_wrapper");
     $(this).parent().parent().find("td input").removeClass("active");
     $(this).addClass("active")});
 $("#chart_area").click(function(){setChart("table#graph_data","area","#chart_wrapper");
    $(this).parent().parent().find("td input").removeClass("active");
    $(this).addClass("active")});
$("#chart_pie").click(function(){setChart("table#graph_data","pie","#chart_wrapper");
    $(this).parent().parent().find("td input").removeClass("active");
    $(this).addClass("active")});
$("#chart_line").click(function(){setChart("table#graph_data","line","#chart_wrapper");
    $(this).parent().parent().find("td input").removeClass("active");
    $(this).addClass("active")});
$(function(){$("table#graph_data td").click(function(){if(!$(this).is(".input")&&$(this).attr("class")!="no_input hover"){$(this).addClass("input").html('<input type="text" value="'+$(this).text()+'" size="4" />').find("input").focus().blur(function(){$(this).parent().removeClass("input").html($(this).val()||0);$(".visualize").trigger("visualizeRefresh")})}}).hover(function(){$(this).addClass("hover")},function(){$(this).removeClass("hover")})});$("#calendar").datepicker({nextText:"&raquo;",prevText:"&laquo;"});$("#datepicker").datepicker({nextText:"&raquo;",prevText:"&laquo;",showAnim:"slideDown"});$(".onecolumn .header span").click(function(){if($(this).parent().parent().children(".content").css("display")=="block"){$(this).css("cursor","s-resize")}else{$(this).css("cursor","n-resize")}$(this).parent().parent().children(".content").slideToggle("fast")});$(".twocolumn .header span").click(function(){if($(this).parent().parent().children(".content").css("display")=="block"){$(this).css("cursor","s-resize")}else{$(this).css("cursor","n-resize")}$(this).parent().parent().children(".content").slideToggle("fast")});$(".threecolumn .header span").click(function(){if($(this).parent().parent().children(".content").css("display")=="block"){$(this).css("cursor","s-resize")}else{$(this).css("cursor","n-resize")}$(this).parent().children(".content").slideToggle("fast")});$("#check_all").click(function(){if($(this).is(":checked")){$("form#form_data input:checkbox").attr("checked",true)}else{$("form#form_data input:checkbox").attr("checked",false)}});setNotifications();$("#shortcut li a").fancybox({padding:0,titleShow:false,overlayColor:"#333333",overlayOpacity:0.5});$("#shortcut li a").tipsy({gravity:"s"});$("#btn_modal").fancybox({padding:0,titleShow:false,overlayColor:"#333333",overlayOpacity:0.5,href:"modal_window.html"});$("#tab1").click(function(){$(this).parent().parent().find("td input").removeClass("active");$(this).addClass("active");$(".tab_content").addClass("hide");$("#tab1_content").removeClass("hide")});$("#tab2").click(function(){$(this).parent().parent().find("td input").removeClass("active");$(this).addClass("active");$(".tab_content").addClass("hide");$("#tab2_content").removeClass("hide")});$("#tab3").click(function(){$(this).parent().parent().find("td input").removeClass("active");$(this).addClass("active");$(".tab_content").addClass("hide");$("#tab3_content").removeClass("hide")});$(".help").tipsy({gravity:"s"});$("#threecolumn").sortable({opacity:0.6,connectWith:".threecolumn_each",items:"div.threecolumn_each"})});$(document).ready(function(){setTimeout("setChart('table#graph_data', 'bar', '#chart_wrapper')",500);$("#main_menu").find("li a").click(function(){if($(this).attr("href").length>0){location.href=$(this).attr("href")}})});