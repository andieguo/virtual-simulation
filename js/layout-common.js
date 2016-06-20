<!--定义全局变量 key:object--> 
var gUiObject = {
	"temphumi": temphumi,
	"photosensitive":photosensitive,
	"relay":relay,
	"alarm":alarm,
	"infrared":infrared,
	"airquality":airquality,
	"pressure":pressure,
	"acceleration":acceleration,
	"flame":flame,
	"combustibleGas":combustibleGas,
	"customsensor":customsensor
};
/*恢复控件的UI内容*/
function resumeWidgetUI(temObj){
	for(var i in temObj){
		var widgetJSFileName = i.substring(0,placeOfChar(i,1,'_'));	
		gUiObject[widgetJSFileName].create(temObj[i]);			
	}	
}

/*压缩html*/
function htmlCompress(html){
	return html.replace(/\s+|\n/g, " ").replace(/>\s</g,"><");
};
  
function initTemplateUI(layoutJSON,content){
	   //保存控件UI属性配置数据
	   if(layoutJSON != null){//判断数据是否为空
		   uiTemplateObj = JSON.parse(layoutJSON);
	   }
	     
	   //渲染控件布局的div
	   if(content != null){
		   $(".demo").html(content);
	   }
	     
	   //渲染控件的UI
	   resumeWidgetUI(uiTemplateObj);
	}

function placeOfChar(str, n, char) {
    var index = str.indexOf(char);
    var i = 0;
    while (index != -1) {
        i++;
        if (i == n)
            break;
        index = str.indexOf(char, index + 1);
    }
    return index;
}

function supportstorage() {
	if (typeof window.localStorage=='object') 
		return true;
	else
		return false;		
}

function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
function randomNumber1(){
	return (new Date()).getTime()+parseInt(Math.random()*100000);
}