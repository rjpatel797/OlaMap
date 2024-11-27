       var url=API+"Jsoncontroller?";
        var query="Operation=getDevicedetailbymid";
        //alert(url+query);
        $.ajax({
            type: "GET",
            url: url+query,
            dataType: "jsonp",
            success: function(msg2) 
            {
           // alert(msg2);
            	 var conten="";
              	var msg = eval(msg2);

            	var select= '<select name="deviceId" id="deviceId" class="form-control " data-placeholder="Select a Device" style="width: 100%;">';
                for(var i=0;i<msg.length;i++)
                {
                	conten = conten+' <option value="'+msg[i].DeviceID+'">'+msg[i].Devicename+'</option>';
                }
                $("#Getdevice").html(select+conten+"</select>");
              //  alert(conten);
               
            }
        });
        

  //Date range picker with time picker
        $(document).ready(function() {
        	var d = new Date(),
            output = [('0' + d.getDate()).substr(-2),
                ('0' + (d.getMonth() + 1)).substr(-2), 
                d.getFullYear()
                
            ].join('/');
        	$('#reservationtime').datepicker({format: 'dd/mm/yyyy',maxDate: new Date()
        }).val(output);

        });
 
  
  
        function initdtforreport()
        {/*
       var reservationtime=document.getElementById("reservationtime").value;
       var date=reservationtime.split("-");
       var reportname=document.getElementById("reportname").value;
       var from=date[0];
       var end=date[1]; */
       // alert("sadgsadg");
       $("div.tbl-tools-searchbox select").addClass(
        'tbl_length');
       $('#expiryreport')
        .dataTable({"scrollX": true});

       }