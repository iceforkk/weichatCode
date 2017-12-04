$('document').ready(function()
{ 
  var appId="";
  //获取JS SDK配置


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
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay'
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
   }
    }); 
     wx.ready(function (){ 
      if(localStorage.getItem("openid")==null)
      {
    window.location.href = getCodeUrl(appId);
      }

          var shareData = {
            'title' : "揭幕者2016嘉年华",
            'desc': "",
            'link': "http://weixin.yifucj.com/signup",
            'imgUrl': "http://weixin.yifucj.com/signup/img/bm.png",
        };
        //分享朋友
    wx.onMenuShareAppMessage({
        title: shareData.title,
        desc: shareData.desc,
        link: shareData.link,
        imgUrl:shareData.imgUrl,
        trigger: function (res) {
        },
        success: function (res) {
          // window.location.href =adurl;
        },
        cancel: function (res) {
            alert('分享是一种美德哦！');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
//朋友圈
    wx.onMenuShareTimeline({
        title: shareData.title,
        link: shareData.link,
        imgUrl:shareData.imgUrl,
        trigger: function (res) {
        },
        success: function (res) {
            // window.location.href =adurl;
        },
        cancel: function (res) {
            alert('分享是一种美德哦！');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
        });





  } ) ;
function getCodeUrl(appid) {
    var redirect_uri = encodeURIComponent(location.origin + location.pathname + "code.html");
    var state = encodeURIComponent(window.location.hash);
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state='+state+'#wechat_redirect';
  }
})
