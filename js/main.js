/**************************** 변수 선언 ****************************/
var rABS = true; // T : 바이너리, F : 어레이 버퍼
var searchjuso = 0;
var markOverlay = [];
//var cellidentify = [];
var aColumn = [];
var bColumn = [];
var cColumn = [];
var jusoNotFound = [];
var coords = [];
//var geocoder = new daum.maps.services.Geocoder();
//var bounds = new daum.maps.LatLngBounds();
var chkBackground = 0;
var fileClassBoolean = 0;
var mylocationCircle = 0;
var mylocationMark = 0;
var customMarkButtonBackground = 0;
/**************************** 변수 선언 ****************************/

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var mapOptions = {
		zoomControl: true,
		zoomControlOptions: {
				style: naver.maps.ZoomControlStyle.SMALL,
				position: naver.maps.Position.TOP_RIGHT
		},
		mapTypeControl: true,
		mapTypeControlOptions: {
				style: naver.maps.MapTypeControlStyle.BUTTON,
				position: naver.maps.Position.TOP_RIGHT
		},
		scaleControl: true,
		scaleControlOptions: {
				position: naver.maps.Position.RIGHT_CENTER
		},
		center: new naver.maps.LatLng(37.290212, 127.0094235),
    zoom: 10
};
var map = new naver.maps.Map(document.getElementById('map'), mapOptions);

//주소 검색 함수
function searchAddress() {
	var temp = document.getElementById("inputAddress").value;
	var tempCoords = 0;
	searchjuso = temp;
	naver.maps.Service.geocode({query: searchjuso}, function(status, response) {
		if (status !== naver.maps.Service.Status.OK) {
				return alert('Something wrong!');
		}

		var result = response.v2, // 검색 결과의 컨테이너
				items = result.addresses; // 검색 결과의 배열

		/*
		marker.setPosition(tempCoords);
		marker.setMap(map);
		map.setCenter(tempCoords);
		map.setLevel(3);
		*/
	});
}

map.setCursor('pointer');
