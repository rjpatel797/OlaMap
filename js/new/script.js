// 
//	jQuery Validate example script
//
//	Prepared by David Cochran
//	
//	Free for your use -- No warranties, no guarantees!
//

$(document).ready(function(){

    // Validate
    // http://bassistance.de/jquery-plugins/jquery-plugin-validation/
    // http://docs.jquery.com/Plugins/Validation/
    // http://docs.jquery.com/Plugins/Validation/validate#toptions
	
    $('#form-horizontal').validate({
        rules: {
            MaintainanceDeviceName: {
               
                required: true
            },
            MaintainanceExpiryType: {
               
                required: true
            },
            spinMaintainancePeriod:
            {                
                required: true               
            },
            MaintainanceEmailID: {
                email: true,
                required: true
	       
            },
            MaintainanceAlertType: {
                
                required: true
            },  
            MaintainanceAlertNo: {
                 minlength: 2,
                required: true
               
            },   
            MaintainanceAlertBefore:
                {
                 minlength: 1,
                required: true
               
            },                   
            Notes:{
                minlength: 2,
                required: true 
            }          
            },
		
        highlight: function(label) {
            $(label).closest('.control-group').addClass('error');
        },
        success: function(label) {
            label
            .text('OK!').addClass('valid')
            .closest('.control-group').addClass('success');
        },
        messages:
        {
            required: "Please enter required value"
        }, 
        submitHandler: function(form) {

            insert();
                         
                        
        }
    });
	  
}); // end document.ready