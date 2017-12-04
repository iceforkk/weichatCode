
    $.ajax({ 
  type: "GET",
  url: "http://wxapi.yifucj.com/api/ActivityApply/Auth", 
   dataType: 'json',   
   success: function (data)
   {
    console.log(data);
     appId=data.data.appId;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.data.appId, // 必填，公众号的唯一标识
        timestamp: data.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.data.noncestr, // 必填，生成签名的随机串
        signature: data.data.signature,// 必填，签名，见附录1
        jsApiList: [ 
          'chooseWXPay'
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
   }
    }); 
  function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]); return null;
    }

     var userid = getQueryString("userid");
     var num=getQueryString("num");
     var openid=localStorage.getItem("openid");
     var phone=getQueryString("phone"); 
     var money=66*num;
     if(money>0)
     {
      $("#titledd").text("您需要支付的金额为"+money+"元")
     }

   //提交
    $("#Sumbitpay").click(function () {
        $.ajax({
            type: "post",
            url: "http://wxapi.yifucj.com/api/ActivityApply/Pay",
            dataType: "json",
            data: { 
                    money: money,
                    tickers: num ,
                    userid:userid,
                    openid:openid
            },
            success: function (data)	
              {
                 var order=data.data.orderno;
                wx.ready(function () { 
                 wx.chooseWXPay({
                    timestamp: data.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.data.noncestr, // 支付签名随机串，不长于 32 位
                    package: 'prepay_id=' + data.data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.data.paySign, // 支付签名
                    success:function (data) { 
                      $.ajax({
                               type:"get",
                               url:"http://wxapi.yifucj.com/api/ActivityApply/QueryPay",
                               dataType:"json",
                               data:{
                                      orderno:order,
                                      phone:phone,
                                      openid:localStorage.getItem("openid")
                                    },
                               success:function(data){
                                if(data.data.Status=="SUCCESS")
                                {  
                                   window.location.href='SignUpSuccess.html?payphone='+phone+'&orderno='+order+'';
                                }

                               }
                             })
                    },
                    fail:function (data){
                     //TODO生成二维码
                            getcode();
                    }
                  });
               });
             }
         });
    });

 var rollfoesussce;
 var orderNo;
  function getcode()
  {
     $.ajax({
       type:"post",
       url:"http://wxapi.yifucj.com/api/ActivityApply/NativePay",
       dataType:"json",
       data:{
               money: money,
               tickers: num ,
               userid:userid,
               openid:localStorage.getItem("openid")
       },
       success:function(data){
          var codeimg="<div className='am-text-center'>"
        +"<Image class='center-block' src='data:image/png;base64,"+data.data.Code+"' />"
        +"<p class='text-center' style='margin-top:10px'>请长按二维码图片，选择识别图中二维码，完成支付</p>"
        +"<p class='text-center'>支付完成，请耐心等待</p>"
        +"</div>"
         $("#weipay").html(codeimg);
         orderNo=data.data.OrderNo;
         rollfoesussce= setInterval(getpaycallback,3000);
       }
     })

  }

  function  getpaycallback()
  { 
 $.ajax({
       type:"get",
       url:"http://wxapi.yifucj.com/api/ActivityApply/QueryPay",
       dataType:"json",
       data:{
              orderno:orderNo,
              phone:phone,
              openid:localStorage.getItem("openid")
            },
       success:function(data){
        if(data.data.Status=="SUCCESS")
        { 
          clearInterval(rollfoesussce);
           window.location.href='SignUpSuccess.html?payphone='+phone+'&orderno='+orderNo+'';
        }

       }
     })

  }

   

