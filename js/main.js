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
	});
}

var CustomOverlay = function(options) {
    this._element = $('<div style="position:absolute;left:0;top:0;width:124px;background-color:#F2F0EA;text-align:center;border:2px solid #6C483B;">' +
                        '<span style="font-weight: bold;"> Brown </span>' +
                        '</div>')

    this.setPosition(options.position);
    this.setMap(options.map || null);
};

CustomOverlay.prototype = new naver.maps.OverlayView();
CustomOverlay.prototype.constructor = CustomOverlay;

CustomOverlay.prototype.setPosition = function(position) {
    this._position = position;
    this.draw();
};

CustomOverlay.prototype.getPosition = function() {
    return this._position;
};

CustomOverlay.prototype.onAdd = function() {
    var overlayLayer = this.getPanes().overlayLayer;

    this._element.appendTo(overlayLayer);
};

CustomOverlay.prototype.draw = function() {
    if (!this.getMap()) {
        return;
    }

    var projection = this.getProjection(),
        position = this.getPosition(),
        pixelPosition = projection.fromCoordToOffset(position);

    this._element.css('left', pixelPosition.x);
    this._element.css('top', pixelPosition.y);
};

CustomOverlay.prototype.onRemove = function() {
    var overlayLayer = this.getPanes().overlayLayer;

    this._element.remove();
    this._element.off();
};

var position = new naver.maps.LatLng(37.290212, 127.0094235);

var overlay = new CustomOverlay({
    map: map,
    position: position
});

naver.maps.Event.addListener(map, 'click', function(e) { //클릭한 위치에 오버레이를 추가합니다.
    var overlay = new CustomOverlay({
        position: e.coord
    });

    overlay.setMap(map);
});

map.setCursor('pointer');
