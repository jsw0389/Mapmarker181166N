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
		center: new naver.maps.LatLng(37.29024486779747, 127.01159326175336),
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
	});
}

var CustomOverlay = function(options) {
	var TempTest = 'Test';
    //this._element = $('<div style="position:absolute;font-family:Arial;font-size:10px;font-weight:bold;padding:3px 3px;left:0;top:0;text-align:center;background-color:#fff;border:2px solid #f00;">커스텀오버레이</div>')
		this._element = $('<button type="button" class = "customMarkButton" id="tempId" >' + TempTest + '</button>';)
    this.setPosition(options.position);
    this.setMap(options.map || null);
};

// CustomOverlay는 OverlayView를 상속받습니다.
CustomOverlay.prototype = new naver.maps.OverlayView();

CustomOverlay.prototype.constructor = CustomOverlay;

CustomOverlay.prototype.onAdd = function() {
    var overlayLayer = this.getPanes().overlayLayer;

    this._element.appendTo(overlayLayer);
};

CustomOverlay.prototype.draw = function() {
    // 지도 객체가 설정되지 않았으면 draw 기능을 하지 않습니다.
    if (!this.getMap()) {
        return;
    }

    // projection 객체를 통해 LatLng 좌표를 화면 좌표로 변경합니다.
    var projection = this.getProjection(),
        position = this.getPosition();

    var pixelPosition = projection.fromCoordToOffset(position);

    this._element.css('left', pixelPosition.x);
    this._element.css('top', pixelPosition.y);
};

CustomOverlay.prototype.onRemove = function() {
    this._element.remove();

    // 이벤트 핸들러를 설정했다면 정리합니다.
    this._element.off();
};

CustomOverlay.prototype.setPosition = function(position) {
    this._position = position;
    this.draw();
};

CustomOverlay.prototype.getPosition = function() {
    return this._position;
};

/**
 * 사용자 정의 오버레이 사용하기
 */
var center = new naver.maps.LatLng(37.29024486779747, 127.01159326175336);

// 오버레이 생성
var overlay = new CustomOverlay({
    position: center,
    map: map
});

// 오버레이 삭제
// overlay.setMap(null);

map.setCursor('pointer');
