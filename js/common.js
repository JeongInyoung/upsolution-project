function check(form) {
	var data = from.name.value;
	var data = data.replace(/ /g,""); // 공백지움
	var data = data.replace(/\s/g,""); // 엔터지움
	document.write(data);
	/*string.replace(/(\n| )/g,"");
	string.replace(/(\r\n| )/g,""); 위와 동일한 방법*/
}

// XP, IE10 미만 브라우저 접근 금지
(function(){
	var isXP = window.navigator.appVersion.indexOf('NT 5.1') > -1;
	var isW2000 = window.navigator.appVersion.indexOf("Windows NT 5.0")!=-1;
	if (isXP || isW2000) {
		document.documentElement.className += ' error';
		// 접근 불가능 코드
	}
}());

// 스크립트 내용
// 인터넷 익스플로러 9-11 버전 체크하여 <html> 요소에 클래스 값으로 ie 설정.

// IE 10 => 문서에서 ('MSIE 10')를 찾아서 class=ie 를 적용
//"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)"

// IE 11 => 문서에서 ('rv:11') 를 찾아서 class=ie 를 적용
//"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; rv:11.0) like Gecko"

(function(global, doc, $){

	var $html = $('html'),
	_html = global.html = doc.documentElement,
	_ua = global.UA = global.navigator.userAgent;

	// IE 10, 11 체크
	checkSetClassPropIE();

	// 초기 수행코드 실행
	$(doc).ready(init);

	// Functions
	function checkSetClassPropIE () {
		if ( _ua.indexOf('MSIE 10') > -1  ||  _ua.indexOf('rv:11')  > -1 ) {
			$html.addClass('ie');
		}
	}

	function init() {
		// SVG => PNG로 변환
		var $svgImg = $('img[src*=".svg"]');
		$svgImg.svgmagic();
	}

})(window, document, window.jQuery);

// Top menu
jQuery(document).ready(function($){

	var $nav = $("#open_nav"),
	$nlink = $("#open_nav_link"),	
	$ms = 350;
	var preMenu;
	var preMenu2;
	$("nav > ul") .each(function(index){
		MenuHide();
		$(this).find("li").click(function() {
			$(this).find("ul").slideToggle($ms);
			preMenu = $(this).find("ul");
		});
		/*$(this).find("li").mouseover(function() {
			MenuHide();
			$(this).find("ul").slideToggle($ms);
		});		
		$(this).find("li").mouseout(function() {
			if(preMenu!=null)
			{
				MenuHide();
				preMenu.slideToggle($ms);
			}
		});*/
});
	$nlink.click(function(){
		$nav.slideToggle($ms);
	});
	MenuInit($ms);
});

function MenuHide()
{
	$(".menu .menu-sub").hide();
}

// 메뉴 초기화
function MenuInit(ms)
{
	MenuHide();
	var arrUrl = String(location.href).split('/');

	var mainID =  arrUrl[arrUrl.length-2];
	var subIDsubID =  arrUrl[arrUrl.length-1].split('.')[0];
	
	$("#sub_" + mainID).find("a").addClass("on");
	$("#sub_" + mainID + "_open" ).slideToggle(ms);
	$("#sub_" + mainID).find("li").each(function(){
		try{
			// debugger;
			var arrlink = $(this).find("a").attr("href").split('/');
			if(arrlink[arrlink.length-1].split('.')[0] == subIDsubID)
			{
				//alert(subIDsubID);
				$(this).addClass("on");
			}
		}catch(e){}
	});
}

function  mainmenuClick(url)
{
	if($(window).width()  >= 960)
	{
		location.href= url;
	}
}

//  Tab Group
$(function(){
	$(".tab-panel section:not("+$(".tab-menu li a.selected").attr("href")+")").hide()
	$(".tab-menu li a").click(function(){
		$(".tab-menu li a").removeClass("selected");
		$(this).addClass("selected");
		$(".tab-panel section").hide();
		$($(this).attr("href")).show();
		return false;
	});
});

// echo 초기화
echo.init({
	offset: 10,
	throttle: 250 // 불러오는 시간
});

// Social
var SNS = {
	Share: function (site, msg, url) {
		
		switch (String(site).toUpperCase()) {
			case "TWITTER":
			url = "http://twitter.com/home?status=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
			break;
			case "FACEBOOK":
			url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
			break;
			case "GOOGLEPLUS":
			url = "https://plus.google.com/share?url=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
			break;
			case "PINTEREST":
			url = "http://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.flickr.com%2Fphotos%2Fkentbrew%2F6851755809%2F&media=http://p2c.co.kr/Common/images/main/main_img1.png&description=Next%20stop%3A%20Pinterest" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
			break;
			default:
			url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(msg) + " " + encodeURIComponent(url);
			break;
		}
		var a = window.open(url, site, 'width=800, height=500');
		if (a) {
			a.focus();
		}
	}
}

// Video 재생 버튼 변경
function vidplay(num) {
	
	var video = document.getElementById("teachingVideo" + num);
	var title = $("#title" + num);
	var button = $("#play" + num);

	if (video.paused) {
		video.play();
		title.removeClass("on");
		title.addClass("off");
		button.removeClass('on');
		button.addClass('off');

	} else {
		video.pause();
		title.addClass("off");
		button.removeClass("off");
		button.addClass("on");
	}

	video.addEventListener("ended", function () {
		title.removeClass("off");
		title.addClass("on");
		button.removeClass("off");
		button.addClass('on');
	}, false);
}

// SVGInjector : Style 설정
var svgInjection = function() {
	// IE8, console.log() 오류 안나게
	if (!window.console){ console = {log: function() {}}; };
	// img.inject-me 요소 수집해서 mySVGsToInject 변수에 참조
	var mySVGsToInject = document.querySelectorAll('img.inject-svg');
	// SVG 주입(Injector) 설정 옵션
	var injectorOptions = {
		evalScripts: 'once', // always, once, never
		pngFallback: 'assets/png', // PNG 대체 폴더 설정
		each: function (svg) {
			// svg는 수집된 개별 img.inject-me를 가리킴
			// console.log(svg.id);
		}
	};
	// SVGInjector 함수에 연결
	SVGInjector(
		// 수집된 img.inject-me 요소
		mySVGsToInject,
		// SVG 주입(Injector) 설정 옵션
		injectorOptions,
		// 콜백 함수
		function (totalSVGsInjected) {
			// totalSVGsInjected는 SVG 주입된 설정 개수를 출력
			// console.log(totalSVGsInjected);
	});
};

var kalypto = function() {
	// Checkbox or Radio Script
	$("#add-agree").kalypto({hideInputs: false});
	$("#email-agree").kalypto({hideInputs: false});
	$(".save").kalypto({hideInputs: false});
};

// jQuery 활용 예
(function($){
	 $(function() {
		svgInjection();
		kalypto();
	 });
})(window.jQuery);

 // / Quick menu
$(document).ready(function() {
	$(window).scroll(function(){
		$(".quick").stop();
		$(".quick").animate( { "top": $(document).scrollTop() + 130 + "px" }, 500 );
	});
});

// Popup Script
jQuery(document).ready(function($){
	$('.trigger-login').popupLayer();
	$('.trigger-inquire').popupLayer();
	$('.trigger-demo').popupLayer();
	$('.trigger-price').popupLayer();
	$('.trigger-alert').popupLayer();
});