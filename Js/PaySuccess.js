$(function () {
 function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }

     var phone = getQueryString("payphone"); 
     var orderno=getQueryString("orderno"); 
        $.ajax({
            type: "get",
            url: "http://wxapi.yifucj.com/api/ActivityApply/Info",
            dataType: "json",
            data: {  
                    phone: phone ,
                    openid:localStorage.getItem("openid"),
                    orderno:orderno
                  },
            success: function (data)	
              {  
                var text="<strong >您的票号：";
                 $.each(data.data.ticket, function (n, val){ 
                   // var list =" <strong>您的票号："+val.CardNo+"</strong>" 
                   //           $("#successtitle").append(list); 
                     $.each(val.CardNos,function(m,item)
                    {
                      text+=item+"、"; 
                    });  
                 })
                  text=text.substring(0,text.length-1);
                 $("#successtitle").append(text+"</strong>"); 
              } 
         }); 





})