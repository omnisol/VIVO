/* $This file is distributed under the terms of the license in /doc/license.txt$ */
var ScinodePolygon = Polygon.extend({
	init: function(options) {
		options.polygon = createGoogleCirclePolygon(options);
		this._super(options);
	},
	setValue: function(value) {
		this.options.value = value;
	},
	getValue: function() {
		return this.options.value;
	},
	setSize: function(size) {
		this.polygon.setRadius(size);
		this.setZIndex(-size);
	},
	focus: function() {
		this.setOptions({strokeWeight: 2.0});
	},
	unfocus: function() {
		this.setOptions({strokeWeight: 1.0});
	},
	registerEvents : function() {
		var me = this;
		var polygon = me.polygon;
		this.registerEvent(addClickListener(polygon, function() {
			INFO_WINDOW.setPosition(this.center);
			var content = '<div style="font-size: 80%; padding: 5px; text-align: left;"><b>' + this.label +'</b><br />' + this.value + ' publications </div>';
			INFO_WINDOW.setContent(content);
			INFO_WINDOW.open(this.map);
		}));
		
		this.registerEvent(addMouseOverListener(polygon, function() {
			me.focus();
		}));
		
		this.registerEvent(addMouseOutListener(polygon, function() {
			me.unfocus();
		}));
	}
});

function createScinodeMarker(map, label, value, radius, color, latlng) {
	var circleOptions = {
		label: label,
		value: value,
		strokeColor: color,
		strokeOpacity: 1.0,
		strokeWeight: 1.0,
		fillColor: color,
		fillOpacity: 0.25,
		map: map,
		center: latlng,
		zIndex: -radius,
		radius: radius // min: 10000, max: 2500000
	};
	
	return new ScinodePolygon(circleOptions);
}
