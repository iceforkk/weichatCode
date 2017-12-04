$(function () {
 function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }

     var phone = getQueryString("seachphone"); 
        $.ajax({
            type: "get",
            url: "http://wxapi.yifucj.com/api/ActivityApply/Info",
            dataType: "json",
            data: {  
                    phone: phone,
                    openid:localStorage.getItem("openid")
                  },
            success: function (data)	
              { 
              if (data.message=="success") {
                var list=" <div class='panel-body'>"
                             +"  <h3 class='text-center' style='padding-top: 10px;'  >报名记录</h3>";
                 $.each(data.data.ticket, function (n, val){ 
                    var cardno="";
                    $.each(val.CardNos,function(m,item)
                    {
                      cardno+=item+"、"; 
                    });
                    cardno=cardno.substring(0,cardno.length-1);
                   list+=  " <div class='yf-dash'></div>"
                             +" <div style='padding-top: 17px'>"
                             +" <p class='yf-text_color' style='margin-bottom: 10px'>"+val.CreateDate+"</p>"   
                             +" <p style='font-size:18px'>您的票号："+cardno+"</p></div>"
                            
                 }); 
                    list+= "<div class='yf-dash'></div></div><div class='panel' style='padding:15px;box-shadow: none;margin-bottom:50px'>"
                             +"<div class='panel-body' style='background: #fef2ed;padding:20px'>"
                             +"<p style='margin-bottom:20px;font-size:18px;'>活动时间：11月19日13:30-17:00</p>"
                             +"<p style='margin-bottom:20px;font-size:18px;'>活动地址：杭州市江干区之江路1299号"
                             +"(杭州瑞立江河汇酒店一楼钱江厅)</p>"
                             +  "<div style='float: left;height: 40px'>" 
                             +      "<p style='font-size:18px;'>客服电话：</p>"
                             +    "</div>"
                             +   "<ul class='list-unstyled'>"
                             +       "<li style='font-size:18px;'>0571-87119797</li>"
                             +       "<li style='font-size:18px;'>17328863986</li>"
                             +    "</ul>"
                             +" </div>"
                             +" </div>"
                             +"<div class='btn-group btn-group-lg navbar-fixed-bottom'>"
 
                             +"<button type='submit' class='btn btn-default' style='width: 100%;border-radius: 0;background-color: #f18450;color: #fff;' onclick=\"javascript:window.location.href=\'UserSginUp.html\' \">继续订票</button></div>" ;
 
                   $("#SeachBody").append(list ); 
              }else
              { 
                       var html="  <div class='container' style='background-color: #fff;'>"
                               +  "<h5 class='text-left' style='margin-top: 40px;margin-left: 15px;'>"
                               +" 手机号为"+phone+"的用户：</h5>" 
                               +" <h4 class='text-center' style='padding-top: 20px;'>未查询到您的报名记录</h4> "
                               +" <div class='btn-group btn-group-lg navbar-fixed-bottom'>"
 
                               +"  <button type='submit' class='btn btn-default' style='width: 100%;border-radius: 0;background-color: #f18450;color: #fff;' onclick=\"javascript:window.location.href=\'UserSginUp.html\'\">立即报名</button></div></div>"; 
                                 $("#SeachBody").append(html);  
              } 
                 
              } 
         }); 





})