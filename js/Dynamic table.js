// JavaScript Document
var sum=0;
var mainflag=1;
var total=0;
var total1=new Array();

function addRow() 
{
	//alert(mainflag);
	var a = ['','ONE ','TWO ','THREE','FOUR ', 'FIVE ','SIX','SEVEN ','EIGHT ','NINE ','TEN ','ELEVEN ','TWELVE ','THRITEEN ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
	var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
	var table = document.getElementById("myTableData");
	var tax= $("#tax").val();
   var price= $("#Price").val();
   var Qty=$("#Qty").val();
   var name=$("#name").val();
   if (name == null || name== "") 
   {
       alert("Please select product");
   }
   else if(price==null || price=="")
	   {
	   alert("Please Enter price");
	   }
    else if(Qty==null || Qty=="")
	   {
		   alert("Please Enter Qty");
		}
    else if(tax==null || tax=="")
	  {
			   alert("Please Select tax");
		}
        else if(mainflag==16)
	   {
			   alert("You can not Add more then 15 Prodects");
		}
		else
		{
   
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
   row.insertCell(0).innerHTML=  '<tr><td>'+name+'<input type="hidden" name="name[]" value="'+name+'"></td>';
    row.insertCell(1).innerHTML= '<td>'+Qty+'<input type="hidden" name="qty[]" value="'+Qty+'"></td>'
	row.insertCell(2).innerHTML= '<td>'+tax+'<input type="hidden" name="tax[]" value="'+tax+'"></td>';
	row.insertCell(3).innerHTML= '<td>'+price+'<input type="hidden" name="price[]" value="'+price+'"></td>';
	row.insertCell(4).innerHTML= '<td>'+price*Qty+'</td>';
   total= total+price*Qty;
   total1[mainflag]=price*Qty;
    mainflag++;
   // alert(total);
    document.getElementById('total').innerHTML=total;
 row.insertCell(5).innerHTML= '<td><a class="btn btn-danger"   onClick="Javacsript:deleteRow(this)"><i class="glyphicon glyphicon-trash icon-white"></i></a></td></tr>';
 	
 	 if ( total.toString().length > 9) return 'overflow';
     n = ('000000000' + total).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
     if (!n) return; var str = '';
     str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
     str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
     str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
     str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
     str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
     document.getElementById('str').innerHTML=str;
		}
}

function deleteRow(obj) 
{
  //  alert(total1[index]);
    var index = obj.parentNode.parentNode.rowIndex;
    //alert(index);
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
	mainflag--;
    total=total-total1[index];
    document.getElementById('total').innerHTML=total;

	 if ( total.toString().length > 9) return 'overflow';
     n = ('000000000' + total).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
     if (!n) return; var str = '';
     str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
     str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
     str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
     str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
     str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
     document.getElementById('str').innerHTML=str;
//	document.getElementById("mainflag").innerHTML = mainflag;
}
function addRowdynamic(tid) 
{
          
   alert("count "+id);
	var table = document.getElementById(id);
 
    var rowCount = table.rows.length;
	alert("call" +rowCount);
    var row = table.insertRow(rowCount);
 	
    
    row.insertCell(0).innerHTML= '<input type="text" name='+mainflag +'>';
	mainflag++;
	row.insertCell(1).innerHTML= '<input type="text" name='+mainflag +'>';
	mainflag++;
 	row.insertCell(2).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRowDy(this)">';
	row.insertCell(3).innerHTML='<input type="button" id="add" value="Add" onclick="Javascript:addRowdynamic(this)">'
}
 

