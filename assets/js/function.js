
// Merger - Merge Your Qrcode Together. Even Quicker.
// User docs: https://merger.justhx.com/#/
// Released under GNU General Public License v3.0. Open source at https://github.com/hifocus/merger.
// Author @hifocus (https://github.com/hifocus), @LF112 (https://github.com/LF112)
// Copyright reservation is required.

var client;
var selected;
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas

profile_error = 0;

if (typeof profile === "undefined" || profile === null || profile === "") {
  profile_error = 1;
}
else if (profile.includes('@') && !profile.includes('http')) { // Verify if value entered is a email
  var email = profile.split("@")
  var suffix = email[1];
  if (suffix.includes('.')) { // Verify if the email entered is valid
    var profile_url = gravatar_url + md5(profile) + "?s=96";
    var profile_lg = profile_url.replace("96", "500"); // Set a large version
  }
  else {
    console.log("%c Email address invaild, please entre a vaild email or image url! ", "color: red"); // Error message if email entered is invalid
    console.log("%c Email 无效，请输入有效 Email 或者图片 url ", "color: red");
    profile_error = 1;
  }
}
else {
  profile_url = profile_lg = profile; // If email is not entered, use whatever value entered (presumably a url)
}

if (profile_error > 0) {
  profile_url = profile_lg = 'https://ae01.alicdn.com/kf/Udaba9d58fade4a3e921c0ceba62db2b7n.png'; // Set a default avatar in case profile image is undefined
}

document.getElementById("i").style.background = "url('" + profile_lg + "') no-repeat center/cover"; // Set center picture
$("#favicon").attr("href", profile_url); // Set page icon


var userLang = navigator.language || navigator.userLanguage;
if (multilingual !== false) {
  if (/zh-CN|zh-cn|zh-Hans|zh-hans|cn/i.test(userLang)) {
    if (typeof myname_hans === "string") {
      var myname = myname_hans;
    }
  }
  else if (/zh-TW|zh-HK|zh-tw|zh-hk|zh-Hant|zh-hant|tw|hk/i.test(userLang)) {
    if (typeof myname_hant === "string") {
      var myname = myname_hant;
    }
  }
  else {
    if (typeof myname_eng === "string") {
      var myname = myname_eng;
    }
  }
}
// To add spaces before and after the user's name
// if first or final character contains English or number
var firstchar = myname.charAt(0); // get first character
var lastchar = myname.charAt(myname.length - 1); // get last character
var english = /^[A-Za-z0-9]*$/; // "select" all English characters, numbers and punctuations
if (english.test(firstchar) || english.test(lastchar)) { // See if first or last character matches condition stated above
  var finalname = " " + myname + " "; // add spaces
  var finalsub = subtitle.replace(myname, finalname); // Replace name in subtitle
  var spacing = true;
}
else {
  var finalname = myname; // if condition stated above is not matched, do nothing
}
var finalname_eng = " " + myname; // Add spaces for name in english, regardless of conditions
if (typeof usage === "undefined" || usage === null || usage === "" || usage !== "payment" && usage !== "donate") { // If usage is not defined or illegal, default to payment
  var usage = "payment";
  console.log("%c The usage variable is not defined correctly", "color: red");
}
if (typeof branding === "undefined" || branding === null || branding === "" || branding !== true && branding !== "true") {
  var aftertitle = ""
}
else if (branding === true || branding === "true") {
  var aftertitle = " | Merger"
}
// Add multilingual suppport
if (multilingual === false) {
  var finaltitle = title;
  // var finalsub = subtitle;
  var wechatscan = "微信扫一扫 向" + finalname + "支付";
  var tenpayscan = "手机QQ扫一扫 向" + finalname + "支付";
  var alipayscan = "支付宝扫一扫 向" + finalname + "支付";
  var payto = "";
  var presshold = "长按识别二维码 向" + finalname + "支付";
  var notavail = "🚫 目前没有可用的支付方式"
  var myname_hant = myname;
  var myname_hans = myname;
  var myname_eng = myname;
}
else {
  if (/zh-CN|zh-cn|zh-Hans|zh-hans|cn/i.test(userLang)) {
    // detect browser langauge, simplified chinese only
    document.write("<style>body { font-family: -apple-system, system-ui, BlinkMacSystemFont, Roboto, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', sans-serif; }</style>");
    if (usage === "payment") {
      var method = "付款";
    }
    if (usage === "donate") {
      var method = "捐赠";
    }
    document.title = '向' + finalname + method + aftertitle;
    var trans_wx = "微信"
    var trans_ali = "支付宝"
    var trans_tp = "QQ手机版"
    var finaltitle = "选择你的" + method + "方式";
    var finalsub = "跟随下一步的指示以向" + finalname + method;
    var trans_wx = "微信";
    var scan = "扫一扫";
    var presshold = "长按识别二维码";
    var payto = " 向" + finalname + method;
    var notavail = "🚫 目前没有可用的" + method + "方式"
    var wechatscan = trans_wx + scan;
    var tenpayscan = trans_tp + scan;
    var alipayscan = trans_ali + scan;
  }
  else if (/zh-TW|zh-HK|zh-tw|zh-hk|zh-Hant|zh-hant|tw|hk/i.test(userLang)) {
    // detect browser langauge, traditional chinese only
    document.write("<style>body { font-family: -apple-system, system-ui, BlinkMacSystemFont, Roboto, 'PingFang TC', 'Hiragino Sans CNS', 'Microsoft JhengHei', 'Helvetica Neue', sans-serif; }</style>");
    if (usage === "payment") {
      var method = "付款";
    }
    if (usage === "donate") {
      var method = "捐贈";
    }
    document.title = '向' + finalname + method + aftertitle;
    var trans_wx = "WeChat "
    var trans_ali = "支付寶"
    var trans_tp = "QQ手機版"
    var finaltitle = "選擇你的" + method + "方式";
    var finalsub = "跟隨下一步的指示以向" + finalname + method;
    var scan = "掃一掃";
    var notavail = "🚫 目前沒有可用的" + method + "方式";
    var wechatscan = trans_wx + scan;
    var tenpayscan = trans_tp + scan;
    var alipayscan = trans_ali + scan;
    var presshold = "長按識別二維碼";
    var payto = " 向" + finalname + method;
  }
  else {
    // detect browser langauge, for non-Chinese users will display english
    if (usage === "payment") {
      var method = "Pay";
      var method_t = "Payment"
    }
    if (usage === "donate") {
      var method = "Donate";
      var method_t = "Donation"
    }
    var method_lc = method.charAt(0).toLowerCase();
    document.title = method + ' to' + finalname_eng + aftertitle;
    document.write("<style>body { font-family: 'Segoe UI', -apple-system, system-ui, BlinkMacSystemFont,  Roboto, 'Helvetica Neue', sans-serif; }</style>"); // Oh I f**king love Segoe UI
    var trans_wx = "WeChat"
    var trans_ali = "AliPay"
    var trans_tp = "QQ Mobile"
    var trans_pm = "pay"
    var trans_dn = "donate"
    var finaltitle = "Choose Your " + method_t + " Method";
    var finalsub = "Then follow the instruction to proceed a " + method_t.replace(method_t.charAt(0), method_t.charAt(0).toLowerCase()) + " to" + finalname_eng;
    var scanhint = "Scan the QR Code to " + method + finalname_eng;
    var presshold = method.replace(method.charAt(5), "") + method.charAt(5).replace("e", "") + "ing to" + finalname_eng + ":<br><span style='font-weight:400'>Press and hold to recognise the Qrcode</span>";
    var scan = "Scan the QR Code on ";
    var payto = "";
    var notavail = "🚫 Currently no " + method_t.replace(method_t.charAt(0), method_t.charAt(0).toLowerCase()) + " method available";
    var wechatscan = scan + trans_wx;
    var tenpayscan = scan + trans_tp;
    var alipayscan = scan + trans_ali;
  }
}

// Remove payment methods if not set up
var error_num = 0;
if (typeof tenpay === "undefined" || tenpay === null || tenpay === "") {
  document.getElementById("depends").removeChild(document.getElementById("tenpaybtn"));
  error_num += 1;
  var notenpay = true;
}
if (typeof wechat === "undefined" || wechat === null || wechat === "") {
  document.getElementById("depends").removeChild(document.getElementById("toclick"));
  error_num += 1;
  var nowechat = true;
}
if (typeof alipay === "undefined" || alipay === null || alipay === "") {
  document.getElementById("depends").removeChild(document.getElementById("alipaybtn"));
  error_num += 1;
  var noalipay = true;
}
if (typeof paypal === "undefined" || paypal === null || paypal === "") {
  document.getElementById("depends").removeChild(document.getElementById("paypalbtn"));
  error_num += 1;
}
else {
  function openbox() {
    selected = "yes";
    function openpaypal(url, w, h) { // code from https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen?answertab=votes#tab-top
      var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
      var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
      var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var systemZoom = width / window.screen.availWidth;
      var left = (width - w) / 2 / systemZoom + dualScreenLeft
      var top = (height - h) / 2 / systemZoom + dualScreenTop
      var newWindow = window.open(url, "_blank", 'width=' + w / systemZoom + ', height=' + h / systemZoom + ', top=' + top + ', left=' + left);
      if (window.focus) newWindow.focus();
    }
    if (window.innerHeight < window.innerWidth) {
      openpaypal(paypal, window.innerWidth * 0.275, window.innerHeight * 0.9);
    }
    else {
      openpaypal(paypal, window.innerWidth * 0.5, window.innerHeight * 0.9);
    }
  }
}

// General UserAgent verify rules
if (navigator.userAgent.match(/Alipay/i)) {
  if (noalipay === true) {
    alert("AliPay is not set up by the admin \n 管理员没有设置支付宝");
    if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  }
  else {
    // Redirect directly
    window.location.href = alipay;
    var finaltitle = "";
    var finalsub = "";
    removal();
  }
}
else if (navigator.userAgent.match(/MicroMessenger\//i)) {
  if (nowechat === true) {
    alert("WeChat Pay is not set up by the admin \n 管理员没有设置微信支付");
    if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  }
  else {
    client = wechat;
    // Click the button, import from js
    document.getElementById("toclick").click();
    document.getElementById("titleinfo").innerHTML = presshold + payto;

    var finaltitle = "";
    var finalsub = "";
    removal();
  }
}

else if (navigator.userAgent.match(/QQ\//i)) {
  if (notenpay === true) {
    alert("Tenpay is not set up by the admin \n 管理员没有设置 QQ 钱包")
    if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  }
  else {
    window.location.href = window.location.href.match(/^[^\#\?]+/)[0] + "#showqrcode";
    document.getElementById("titleinfo").innerHTML = presshold + payto;
    document.getElementById("qrcontainer").removeChild(document.getElementById("currentqrcode")); // remove default qrcode (mobile qq only)
    // Import from api
    document.getElementById("tenpayonly").src = qrcodeapi + urlencode(tenpay);
    var finaltitle = "";
    var finalsub = "";
    removal();
  }
}
else {
  if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && !selected) document.getElementById('showqrcode').style.display = "none";
  document.getElementById('qrcodeclose').onclick = function () {
    document.getElementById('currentqrcode').innerHTML = "";
    if (document.getElementById('showqrcode').style.display == "flex") document.getElementById('showqrcode').style.display = "";
  }
}
// UserAgent Verify Part Ends

if (error_num === 4) { // Show not available message to user if all four methods are not set up
  var finalsub = notavail;
  console.log("%c No Payment Method Available to Users ", "color: red");
}

// Onclick Function Part Starts         
function openwechat() {
  selected = "yes";
  document.getElementById("titleinfo").innerHTML = wechatscan + payto;
  client = wechat;
  showqrcode();
}
function openalipay() {
  selected = "yes";
  document.getElementById("titleinfo").innerHTML = alipayscan + payto;
  client = alipay;
  showqrcode();
}
function opentenpay() {
  selected = "yes";
  document.getElementById("titleinfo").innerHTML = tenpayscan + payto;
  client = tenpay;
  showqrcode();
}
function removal() {
  document.getElementById("h").removeChild(document.getElementById("i")); // remove profile photo
  document.getElementById("pending").removeChild(document.getElementById("depends")); // remove buttons
  document.getElementById("btncontainer").removeChild(document.getElementById("qrcodeclose")); //remove exit buttons
}
function urlencode(String) { // Code from MKBlog - http://lab.mkblog.cn/oneqrcode/
  return encodeURIComponent(String).replace(/'/g, "%27").replace(/"/g, "%22");
}
// Onclick Function Part Ends

// Fill in tile and subtitle
document.getElementById("name").innerHTML = finaltitle;
document.getElementById("description").innerHTML = finalsub;

// Copyright console log copied from https://github.com/MoePlayer/APlayer/. Thank you.
console.log(`${'\n'} %c Merger 0.21.1 %c https://github.com/hifocus/merger ${'\n'}`, 'color: #fadfa3; background: #030307; padding:5px 0;', 'background: #fadfa3; padding:5px 0;');

function showqrcode() {
  if (location.href.substr(location.href.lastIndexOf('#') + 1) == "showqrcode" && selected == "yes") document.getElementById('showqrcode').style.display = "flex";
  if (document.getElementById("currentqrcode").innerHTML.includes("img")) {
    document.getElementById('currentqrcode').getElementsByTagName("img")[0].setAttribute("id", "todel");
    document.getElementById("currentqrcode").removeChild(document.getElementById("todel"));
    // console.log("removed");
  }
  $("#currentqrcode").qrcode({
    render: "image",
    size: 300 * scale,
    text: client
  });
}