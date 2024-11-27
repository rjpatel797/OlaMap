
$(document).ready(function(){

	
    $('#form-horizontal').validate({
        rules: {
            ClientName: {
                minlength: 2,
                required: true
            },
            RouteName: {
                minlength: 2,
                required: true
            },
            ClientMobileNumber:
            {
                minlength: 2,
                required: true,
                number:true
            },
            ClientEmail: {
                email: true,
                required: true
	       
            },
            ClientManager: {
                 minlength: 1,
                required: true,
                number:true
            },  
            RouteManager: {
                 minlength: 1,
                required: true,
                number:true
            },
            ClientAddress:{
                minlength: 2,
                required: true				  
            },             
            Notes:{
                minlength: 2,
                required: true 
            },
           RouteAlertName: {
                minlength: 2,
                required: true
            },           
            RouteAlertLimit:
            {
                minlength: 1,
                required: true,
                number:true
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

  function clear_form_elements(ele) {

 
                $(ele).find(':input').each(function() {
                    switch(this.type) {
                        case 'password':

                        case 'select-multiple':

                        case 'select-one':

                        case 'text':

                        case 'textarea':

                            $(this).val('');

                            break;

                        case 'checkbox':

                        case 'radio':

                            this.checked = false;

                    }

                });

 

            }