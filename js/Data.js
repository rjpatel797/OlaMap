function  daterange()
{

		  $(".select2").select2({
			  tags: "true",
			  placeholder: "Select an option",
			  allowClear: true
			});
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({ ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
     }, timePicker: true, timePickerIncrement: 30, format: 'DD/MM/YYYY hh:mm '});
    
   
 
}
function reset()
{
    $("#reservationtime").val("");
    $("#deviceId").val("");
}

function initdt()
{

	// alert("sadgsadg");
	  $("div.tbl-tools-searchbox select").addClass(
 	  'tbl_length');
 	$('#expiryreport')
 	  .dataTable(
 	  {
 		              
 		 "scrollX": true,            
 	  "sPaginationType" : "full_numbers",
 	  "oLanguage" : {
 	  "sLengthMenu" : "<span class='lenghtMenu' > _MENU_</span><span class='lengthLabel'></span>"
 	  },
 	  //"sDom" : '<"tbl-tools-searchbox"fl<"clear">>,<"tbl_tools"CT<"clear">>,<"table_content"t>,<"widget-bottom"p<"clear">>',
 	 "sDom": 'T<"clear">lfrtip',
 	

 	  "oTableTools" : {
 	  "sSwfPath" : "plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
 	 "aButtons": [
 	                "copy",
 	                "csv",
 	               "pdf"
 	            ]
 	  }
 	             
 	  
 	               
 	  });
}
