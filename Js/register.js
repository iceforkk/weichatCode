




//购买数量	   
    $("#add").click(function(){
      var oldValue=parseInt($("#show").val());//取出现在的值，并使用parseInt转为int类型数据
                      oldValue++;//自加1
                      $("#show").val(oldValue);//将增加后的值付给原控件
    });

    $("#minus").click(function(){
      var oldValue=parseInt($("#show").val());//取出现在的值，并使用parseInt转为int类型数据
      if (oldValue > 1) {
        oldValue--;//自减1
         $("#show").val(oldValue);//将增加后的值付给原控件
      }
      
      return false         
    });
//验证倒计时 
      var countdown=60; 
        var userid='';
        var openid='';
        var phone='';
        function settime(val) { 
           var phone = $("#userphone").val();
            if(!(/^1[34578]\d{9}$/.test(phone))){ 
                alert("手机号码有误，请重填");  
            return false; 
             } 
             if (countdown==60) {
            Verification($("#userphone").val());
             }
            if (countdown == 0) { 
              val.removeAttribute("disabled");    
              val.value="免费获取验证码"; 
              countdown = 60;  
            } else { 
            val.setAttribute("disabled", true); 
            val.value="重新发送(" + countdown + ")"; 
            countdown--; 
                setTimeout(function() { 
                settime(val) 
                },1000) 
            }   
        };


      //获取验证码
        function Verification(phone)
        {
          
             $.ajax({
            type: "post",
            url: "http://wxapi.yifucj.com/api/ActivityApply/SendSms",
            dataType: "json",
            data: { 
                    phone: phone 
            } ,
             success: function (data) 
              {
                if(data.message!="success")
                  {
                    alert(data.message);
                  }
              }
         }); 
        };

        //验证码验证
        var userid;
        var phone;
        function saveuserbyphone()
        {
          var username=$("#username").val();
          var userphone=$("#userphone").val();
          var code=$("#code").val();
          if(!(/^1[34578]\d{9}$/.test(userphone))){ 
                alert("手机号码有误，请重填");  
            return false; 
             } 
          if (userphone == "" || username=="") {
            alert("手机号或者名字不能为空")
          }
         $.ajax({
            type: "post",
            url: "http://wxapi.yifucj.com/api/ActivityApply/Apply",
            dataType: "json",
            data: { 
            	    username:username,
                    phone: userphone ,
                    Verification:code,
                    openid:localStorage.getItem("openid")
            },
            success: function (data)	
              {  
                    console.log(data);
                if(data.message=='success')
                   {
                   	phone=data.data.Phone;
                    userid=data.data.UserId; 
                    window.location.href='SginDetail.html?userid='+userid+'&phone='+phone+'';
                   }else
                   { 
                    alert(data.message);
                   }
              } 
         });  
        }; 
        function  gotopay(){
              var num=$("#show").val();

              window.location.href='PayForSign.html?userid='+getQueryString("userid") +'&num='+num+'&openid='+localStorage.getItem("openid")+'&phone='+getQueryString("phone") +'';
        }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }

        function gotoseach()
        {
             var seachphone=$("#useraech").val();
                if(!(/^1[34578]\d{9}$/.test(seachphone))){ 
                alert("手机号码有误，请重填");  
            return false; 
             } 
               window.location.href='UserSginList.html?seachphone='+seachphone+'';


        }
