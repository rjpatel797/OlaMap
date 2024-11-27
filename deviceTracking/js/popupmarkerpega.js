PopupMarker.prototype = new google.maps.OverlayView();  
function PopupMarker(opts) {  
    this.ICON_WIDTH = opts.iwidth;//图标的宽  
    this.ICON_HEIGHT = opts.iheight;//图标的高  
    this.map_ = opts.map;//地图对象  
    this.latlng_ = opts.position;  
    this.icon_ = opts.icon;  
    this.text_ = opts.text || "";  
    this.setMap(this.map_);  
    this.showpop = opts.showpop || false;  
    var agt = navigator.userAgent.toLowerCase();  
    var is_ie_ = ((agt.indexOf("msie") !== -1) && (agt.indexOf("opera") === -1));  
    var yPos = 0;  
  //  this.bgcolor_ = opts.bgColor || "F8F8F8";
    this.popupImgSrc_ = "deviceTracking/images/1280.png";
    this.popupTbl = {};  
    this.popupTbl.leftTop = {  
        "left": 0,  
        "top": yPos,  
        "width": 19,  
        "height": 7  
    };  
    this.popupTbl.leftTopFill = {  
        "left": 16,  
        "top": 3,  
        "width": 4,  
        "height": 4  
    };  
    this.popupTbl.rightTop = {  
        "left": 19,  
        "top": yPos,  
        "width": 10,  
        "height": 7  
    };  
    this.popupTbl.rightTopImg = {  
        "left": -125,  
        "top": 0,  
        "width": 10,  
        "height": 7  
    };  
    this.popupTbl.centerTopFill = {  
        "left": 19,  
        "top": yPos,  
        "width": 0,  
        "height": 7  
    };  
    yPos += this.popupTbl.leftTop.height;  
    this.popupTbl.leftBody = {  
        "left": 11,  
        "top": yPos,  
        "width": 8,  
        "height": 0  
    };  
    this.popupTbl.centerBodyFill = {  
        "left": 19,  
        "top": yPos,  
        "width": 40,  
        "height": 15  
    };  
    this.popupTbl.rightBody = {  
        "left": 19,  
        "top": yPos,  
        "width": 9,  
        "height": 0  
    };  
    this.popupTbl.leftBottom = {  
        "left": 0,  
        "top": yPos,  
        "width": 20,  
        "height": 21  
    };  
    this.popupTbl.leftBottomImg = {  
        "left": 0,  
        "top": -13,  
        "width": 20,  
        "height": 21  
    };  
    this.popupTbl.leftBottomFill = {  
        "left": 16,  
        "top": 0,  
        "width": 4,  
        "height": 6  
    };  
    this.popupTbl.rightBottom = {  
        "left": 19,  
        "top": yPos,  
        "width": 10,  
        "height": 7  
    };  
    this.popupTbl.rightBottomImg = {  
        "left": -125,  
        "top": -13,  
        "width": 10,  
        "height": 7  
    };  
    this.popupTbl.centerBottomFill = {  
        "left": 19,  
        "top": (yPos + (is_ie_ ? -1: 0)),  
        "width": 0,  
        "height": (6 + (is_ie_ ? 1: 0))  
    };  
  
};  
  
PopupMarker.prototype.onAdd = function() {  
    this.container_ = document.createElement("div");  
    this.iconContainer = document.createElement("div");  
    this.iconContainer.style.width = this.ICON_WIDTH + "px";  
    this.iconContainer.style.height = this.ICON_HEIGHT + "px";  
    this.iconContainer.innerHTML = "<img src='" + this.icon_ + "'>";  
    var panes = this.getPanes();  
    panes.floatShadow.appendChild(this.iconContainer);  
    this.iconContainer.style.position = "absolute";  
    panes.floatPane.appendChild(this.container_);  
    this.container_.style.position = "absolute";  
    if (!this.showpop) this.container_.style.visibility = "hidden";  
    this.makeNormalPopup_();  
};  
PopupMarker.prototype.draw = function() {  
    this.redrawNormalPopup_(this.text_);  
};  
PopupMarker.prototype.onRemove = function() {  
    this.container_.parentNode.removeChild(this.container_);  
    this.iconContainer.parentNode.removeChild(this.iconContainer);  
};  
  
PopupMarker.prototype.makeNormalPopup_ = function() {  
    this.leftTop_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.leftTop);  
    this.leftTop_.appendChild(this.fillDiv_(this.popupTbl.leftTopFill));  
    this.container_.appendChild(this.leftTop_);  
    this.leftBody_ = this.fillDiv_(this.popupTbl.leftBody);  
    this.leftBody_.style.borderWidth = "0 0 0 1px";  
    this.leftBody_.style.borderStyle = "none none none solid";  
    this.leftBody_.style.borderColor = "#000000";  
    this.container_.appendChild(this.leftBody_);  
    this.leftBottom_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.leftBottomImg);  
    this.leftBottom_.style.left = this.popupTbl.leftBottom.left + "px";  
    this.leftBottom_.style.top = this.popupTbl.leftBottom.top + "px";  
    this.leftBottom_.style.width = this.popupTbl.leftBottom.width + "px";  
    this.leftBottom_.style.height = this.popupTbl.leftBottom.height + "px";  
    this.leftBottom_.appendChild(this.fillDiv_(this.popupTbl.leftBottomFill));  
    this.container_.appendChild(this.leftBottom_);  
    this.bodyContainer_ = document.createElement("div");  
    this.bodyContainer_.style.position = "absolute";  
    this.bodyContainer_.style.backgroundColor = "#FFF";  
    this.bodyContainer_.style.overflow = "hidden";  
    this.bodyContainer_.style.left = this.popupTbl.centerBodyFill.left + "px";  
    this.bodyContainer_.style.top = this.popupTbl.centerBodyFill.top + "px";  
    this.bodyContainer_.style.width = this.popupTbl.centerBodyFill.width + "px";  
    this.bodyContainer_.style.height = this.popupTbl.centerBodyFill.height + "px";  
    this.container_.appendChild(this.bodyContainer_);  
    this.rightTop_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.rightTopImg);  
    this.rightTop_.style.left = this.popupTbl.rightTop.left + "px";  
    this.rightTop_.style.top = this.popupTbl.rightTop.top + "px";  
    this.rightTop_.style.width = this.popupTbl.rightTop.width + "px";  
    this.rightTop_.style.height = this.popupTbl.rightTop.height + "px";  
    this.container_.appendChild(this.rightTop_);  
    this.rightBottom_ = this.makeImgDiv_(this.popupImgSrc_, this.popupTbl.rightBottomImg);  
    this.rightBottom_.style.left = this.popupTbl.rightBottom.left + "px";  
    this.rightBottom_.style.top = this.popupTbl.rightBottom.top + "px";  
    this.rightBottom_.style.width = this.popupTbl.rightBottom.width + "px";  
    this.rightBottom_.style.height = this.popupTbl.rightBottom.height + "px";  
    this.container_.appendChild(this.rightBottom_);  
    this.rightBody_ = this.fillDiv_(this.popupTbl.rightBody);  
    this.rightBody_.style.borderWidth = "0 1px 0 0";  
    this.rightBody_.style.borderStyle = "none solid none none";  
    this.rightBody_.style.borderColor = "#000000";  
    this.container_.appendChild(this.rightBody_);  
    this.centerBottom_ = this.fillDiv_(this.popupTbl.centerBottomFill);  
    this.centerBottom_.style.borderWidth = "0 0 1px 0";  
    this.centerBottom_.style.borderStyle = "none none solid none";  
    this.centerBottom_.style.borderColor = "#000000";  
    this.container_.appendChild(this.centerBottom_);  
    this.centerTop_ = this.fillDiv_(this.popupTbl.centerTopFill);  
    this.centerTop_.style.borderColor = "#000000";  
    this.centerTop_.style.borderWidth = "1px 0 0 0";  
    this.centerTop_.style.borderStyle = "solid none none none";  
    this.container_.appendChild(this.centerTop_);  
  
};  
PopupMarker.prototype.redrawNormalPopup_ = function(text) {  
    if (this.beforeNormalPopupText_ !== text) {  
        try {  
            while (this.bodyContainer_.firstChild) {  
                this.bodyContainer_.removeChild(this.bodyContainer_.firstChild);  
            }  
        } catch(e) {}  
        this.bodyContainer_.innerHTML = text;  
        if (this.isIE_() === false && this.bodyContainer_.hasChildNodes) {  
            if (this.bodyContainer_.firstChild.nodeType === 1) {  
                this.bodyContainer_.firstChild.style.margin = 0;  
            }  
        }  
        var offsetBorder = this.isIE_() ? 2: 0;  
        var cSize = this.getHtmlSize_(text);  
        var rightX = this.popupTbl.leftTop.width + cSize.width;  
        this.leftBottom_.style.top = (cSize.height + this.popupTbl.leftBody.top) + "px";  
        this.leftBody_.style.height = cSize.height + "px";  
        this.bodyContainer_.style.width = cSize.width + "px";  
        this.bodyContainer_.style.height = cSize.height + "px";  
        this.bodyContainer_.style.top = this.popupTbl.leftBody.top;  
        this.rightTop_.style.left = rightX + "px";  
        this.rightBottom_.style.left = this.rightTop_.style.left;  
        this.rightBottom_.style.top = this.leftBottom_.style.top;  
        this.rightBody_.style.left = rightX + "px";  
        this.rightBody_.style.height = this.leftBody_.style.height;  
        this.centerBottom_.style.top = this.leftBottom_.style.top;  
        this.centerBottom_.style.width = cSize.width + "px";  
        this.centerTop_.style.width = cSize.width + "px";  
        this.size_ = {  
            "width": (rightX + this.popupTbl.rightTop.width),  
            "height": (cSize.height + this.popupTbl.leftTop.height + this.popupTbl.leftBottom.height)  
        };  
        this.container_.style.width = this.size_.width + "px";  
        this.container_.style.height = this.size_.height + "px";  
    }  
    this.setPosition(this.latlng_);  
    this.beforeNormalPopupText_ = text;  
};  
PopupMarker.prototype.setPosition = function(latlng) {  
    var pxPos = this.getProjection().fromLatLngToDivPixel(latlng);  
    this.container_.style.left = pxPos.x + "px";  
    this.container_.style.top = (pxPos.y - this.size_.height) + "px";  
    this.iconContainer.style.left = (pxPos.x - this.ICON_WIDTH / 2) + "px";  
    this.iconContainer.style.top = (pxPos.y - this.ICON_HEIGHT ) + "px";  
};  
  
PopupMarker.prototype.isNull = function(value) {  
    if (!value && value !== 0 || value === undefined || value === "" || value === null || typeof value === "undefined") {  
        return true;  
    }  
    return false;  
};  
PopupMarker.prototype.getHtmlSize_ = function(html) {  
    var mapContainer = this.map_.getDiv();  
    var onlineHTMLsize_ = function(text) {  
        var dummyTextNode = document.createElement("span");  
        dummyTextNode.innerHTML = text;  
        dummyTextNode.style.display = "inline";  
        mapContainer.appendChild(dummyTextNode);  
        var size = {};  
        size.width = dummyTextNode.offsetWidth;  
        size.height = dummyTextNode.offsetHeight;  
        mapContainer.removeChild(dummyTextNode);  
        return size;  
  
    };  
    var ret;  
    var lines = html.split(/\n/i);  
    var totalSize = new google.maps.Size(1, 1);  
    for (var i = 0; i < lines.length; i++) {  
        ret = onlineHTMLsize_(lines[i]);  
        totalSize.width += ret.width;  
        totalSize.height += ret.height;  
  
    }  
    return totalSize;  
  
};  
PopupMarker.prototype.makeImgDiv_ = function(imgSrc, params) {  
    var imgDiv = document.createElement("div");  
    imgDiv.style.position = "absolute";  
    imgDiv.style.overflow = "hidden";  
    if (params.width) {  
        imgDiv.style.width = params.width + "px";  
    }  
    if (params.height) {  
        imgDiv.style.height = params.height + "px";  
    }  
    var img = null;  
    if (this.isIE_() === false) {  
        img = new Image();  
        img.src = imgSrc;  
  
    } else {  
        img = document.createElement("div");  
        if (params.width) {  
            img.style.width = params.width + "px";  
  
        }  
        if (params.height) {  
            img.style.height = params.height + "px";  
  
        }  
  
    }  
    img.style.position = "relative";  
    img.style.left = params.left + "px";  
    img.style.top = params.top + "px";  
    img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imgSrc + "')";  
    imgDiv.appendChild(img);  
    return imgDiv;  
  
};  
PopupMarker.prototype.fillDiv_ = function(params) {  
    var bgDiv = document.createElement("div");  
    bgDiv.style.position = "absolute";  
    bgDiv.style.backgroundColor = "#FFF";  
    bgDiv.style.fontSize = "1px";  
    bgDiv.style.lineHeight = "1px";  
    bgDiv.style.overflow = "hidden";  
    bgDiv.style.left = params.left + "px";  
    bgDiv.style.top = params.top + "px";  
    bgDiv.style.width = params.width + "px";  
    bgDiv.style.height = params.height + "px";  
    return bgDiv;  
};  
PopupMarker.prototype.isIE_ = function() {  
    return (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) ? true: false;  
};  
PopupMarker.prototype.hide = function() {  
    if (this.container_) {  
        this.container_.style.visibility = "hidden";  
    }  
};  
PopupMarker.prototype.show = function() {  
    if (this.container_) {  
        this.container_.style.visibility = "visible";  
    }  
};  
PopupMarker.prototype.toggle = function() {  
    if (this.container_) {  
        if (this.container_.style.visibility == "hidden") {  
            this.show();  
        } else {  
            this.hide();  
        }  
    }  
};  
PopupMarker.prototype.update = function(obj) {  
    if ((typeof obj.icon) != "undefined") {  
        this.iconContainer.innerHTML = "<img src='" + obj.icon + "'>";  
  
    }  
    if ((typeof obj.position) != "undefined") {  
        this.latlng_ = obj.position;  
        this.setPosition(this.latlng_);  
  
    }  
    if ((typeof obj.text) != "undefined") {  
        this.text_ = obj.text;  
        this.redrawNormalPopup_(obj.text);  
  
    }  
  
};  
PopupMarker.prototype.setZIndex = function(index) {  
    this.container_.style.zIndex = index;  
    this.iconContainer.style.zIndex = index;  
};  
PopupMarker.prototype.latlng = function() {  
    return this.latlng_;  
}  
PopupMarker.prototype.hideMarker = function(){  
    this.container_.style.visibility = "hidden";  
    this.iconContainer.style.visibility = "hidden";  
};  
PopupMarker.prototype.showMarker = function(){  
    this.container_.style.visibility = "visible";  
    this.iconContainer.style.visibility = "visible";  
    };  