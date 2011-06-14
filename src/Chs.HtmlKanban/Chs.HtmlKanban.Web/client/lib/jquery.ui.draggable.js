﻿/// <reference path="../../Scripts/require.js" />

define(['lib/jquery', 'lib/jquery.ui.core'], function (jQuery) {
    /*
    * jQuery UI Draggable 1.8.13
    *
    * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
    * Dual licensed under the MIT or GPL Version 2 licenses.
    * http://jquery.org/license
    *
    * http://docs.jquery.com/UI/Draggables
    *
    * Depends:
    *	jquery.ui.core.js
    *	jquery.ui.mouse.js
    *	jquery.ui.widget.js
    */
    (function (d) {
        d.widget("ui.draggable", d.ui.mouse, { widgetEventPrefix: "drag", options: { addClasses: true, appendTo: "parent", axis: false, connectToSortable: false, containment: false, cursor: "auto", cursorAt: false, grid: false, handle: false, helper: "original", iframeFix: false, opacity: false, refreshPositions: false, revert: false, revertDuration: 500, scope: "default", scroll: true, scrollSensitivity: 20, scrollSpeed: 20, snap: false, snapMode: "both", snapTolerance: 20, stack: false, zIndex: false }, _create: function () {
            if (this.options.helper ==
"original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative"; this.options.addClasses && this.element.addClass("ui-draggable"); this.options.disabled && this.element.addClass("ui-draggable-disabled"); this._mouseInit()
        }, destroy: function () { if (this.element.data("draggable")) { this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"); this._mouseDestroy(); return this } }, _mouseCapture: function (a) {
            var b =
this.options; if (this.helper || b.disabled || d(a.target).is(".ui-resizable-handle")) return false; this.handle = this._getHandle(a); if (!this.handle) return false; d(b.iframeFix === true ? "iframe" : b.iframeFix).each(function () { d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({ width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1E3 }).css(d(this).offset()).appendTo("body") }); return true
        }, _mouseStart: function (a) {
            var b = this.options; this.helper =
this._createHelper(a); this._cacheHelperProportions(); if (d.ui.ddmanager) d.ui.ddmanager.current = this; this._cacheMargins(); this.cssPosition = this.helper.css("position"); this.scrollParent = this.helper.scrollParent(); this.offset = this.positionAbs = this.element.offset(); this.offset = { top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left }; d.extend(this.offset, { click: { left: a.pageX - this.offset.left, top: a.pageY - this.offset.top }, parent: this._getParentOffset(), relative: this._getRelativeOffset() });
            this.originalPosition = this.position = this._generatePosition(a); this.originalPageX = a.pageX; this.originalPageY = a.pageY; b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt); b.containment && this._setContainment(); if (this._trigger("start", a) === false) { this._clear(); return false } this._cacheHelperProportions(); d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a); this.helper.addClass("ui-draggable-dragging"); this._mouseDrag(a, true); return true
        }, _mouseDrag: function (a, b) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute"); if (!b) { b = this._uiHash(); if (this._trigger("drag", a, b) === false) { this._mouseUp({}); return false } this.position = b.position } if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px"; if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px"; d.ui.ddmanager && d.ui.ddmanager.drag(this, a); return false
        }, _mouseStop: function (a) {
            var b = false; if (d.ui.ddmanager && !this.options.dropBehaviour) b =
d.ui.ddmanager.drop(this, a); if (this.dropped) { b = this.dropped; this.dropped = false } if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false; if (this.options.revert == "invalid" && !b || this.options.revert == "valid" && b || this.options.revert === true || d.isFunction(this.options.revert) && this.options.revert.call(this.element, b)) { var c = this; d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () { c._trigger("stop", a) !== false && c._clear() }) } else this._trigger("stop",
a) !== false && this._clear(); return false
        }, _mouseUp: function (a) { this.options.iframeFix === true && d("div.ui-draggable-iframeFix").each(function () { this.parentNode.removeChild(this) }); return d.ui.mouse.prototype._mouseUp.call(this, a) }, cancel: function () { this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(); return this }, _getHandle: function (a) {
            var b = !this.options.handle || !d(this.options.handle, this.element).length ? true : false; d(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this ==
a.target) b = true
            }); return b
        }, _createHelper: function (a) { var b = this.options; a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a])) : b.helper == "clone" ? this.element.clone().removeAttr("id") : this.element; a.parents("body").length || a.appendTo(b.appendTo == "parent" ? this.element[0].parentNode : b.appendTo); a[0] != this.element[0] && !/(fixed|absolute)/.test(a.css("position")) && a.css("position", "absolute"); return a }, _adjustOffsetFromHelper: function (a) {
            if (typeof a == "string") a = a.split(" "); if (d.isArray(a)) a =
{ left: +a[0], top: +a[1] || 0 }; if ("left" in a) this.offset.click.left = a.left + this.margins.left; if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left; if ("top" in a) this.offset.click.top = a.top + this.margins.top; if ("bottom" in a) this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
        }, _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent(); var a = this.offsetParent.offset(); if (this.cssPosition == "absolute" && this.scrollParent[0] != document &&
d.ui.contains(this.scrollParent[0], this.offsetParent[0])) { a.left += this.scrollParent.scrollLeft(); a.top += this.scrollParent.scrollTop() } if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = { top: 0, left: 0 }; return { top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
        }, _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var a =
this.element.position(); return { top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
            } else return { top: 0, left: 0}
        }, _cacheMargins: function () { this.margins = { left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0} }, _cacheHelperProportions: function () {
            this.helperProportions =
{ width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        }, _setContainment: function () {
            var a = this.options; if (a.containment == "parent") a.containment = this.helper[0].parentNode; if (a.containment == "document" || a.containment == "window") this.containment = [(a.containment == "document" ? 0 : d(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (a.containment == "document" ? 0 : d(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (a.containment == "document" ? 0 : d(window).scrollLeft()) +
d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a.containment == "document" ? 0 : d(window).scrollTop()) + (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]; if (!/^(document|window|parent)$/.test(a.containment) && a.containment.constructor != Array) {
                a = d(a.containment); var b = a[0]; if (b) {
                    a.offset(); var c = d(b).css("overflow") != "hidden"; this.containment = [(parseInt(d(b).css("borderLeftWidth"),
10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0), (parseInt(d(b).css("borderTopWidth"), 10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0), (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height -
this.margins.top - this.margins.bottom]; this.relative_container = a
                } 
            } else if (a.containment.constructor == Array) this.containment = a.containment
        }, _convertPositionTo: function (a, b) {
            if (!b) b = this.position; a = a == "absolute" ? 1 : -1; var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, f = /(html|body)/i.test(c[0].tagName); return { top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari &&
d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()) * a), left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft()) * a)
            }
        }, _generatePosition: function (a) {
            var b = this.options, c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0],
this.offsetParent[0])) ? this.offsetParent : this.scrollParent, f = /(html|body)/i.test(c[0].tagName), e = a.pageX, h = a.pageY; if (this.originalPosition) {
                var g; if (this.containment) {
                    if (this.relative_container) { g = this.relative_container.offset(); g = [this.containment[0] + g.left, this.containment[1] + g.top, this.containment[2] + g.left, this.containment[3] + g.top] } else g = this.containment; if (a.pageX - this.offset.click.left < g[0]) e = g[0] + this.offset.click.left; if (a.pageY - this.offset.click.top < g[1]) h = g[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > g[2]) e = g[2] + this.offset.click.left; if (a.pageY - this.offset.click.top > g[3]) h = g[3] + this.offset.click.top
                } if (b.grid) {
                    h = this.originalPageY + Math.round((h - this.originalPageY) / b.grid[1]) * b.grid[1]; h = g ? !(h - this.offset.click.top < g[1] || h - this.offset.click.top > g[3]) ? h : !(h - this.offset.click.top < g[1]) ? h - b.grid[1] : h + b.grid[1] : h; e = this.originalPageX + Math.round((e - this.originalPageX) / b.grid[0]) * b.grid[0]; e = g ? !(e - this.offset.click.left < g[0] || e - this.offset.click.left > g[2]) ? e : !(e - this.offset.click.left <
g[0]) ? e - b.grid[0] : e + b.grid[0] : e
                } 
            } return { top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()), left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft())}
        }, _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(); this.helper = null; this.cancelHelperRemoval = false
        }, _trigger: function (a, b, c) { c = c || this._uiHash(); d.ui.plugin.call(this, a, [b, c]); if (a == "drag") this.positionAbs = this._convertPositionTo("absolute"); return d.Widget.prototype._trigger.call(this, a, b, c) }, plugins: {}, _uiHash: function () { return { helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs} } 
        }); d.extend(d.ui.draggable, { version: "1.8.13" });
        d.ui.plugin.add("draggable", "connectToSortable", { start: function (a, b) { var c = d(this).data("draggable"), f = c.options, e = d.extend({}, b, { item: c.element }); c.sortables = []; d(f.connectToSortable).each(function () { var h = d.data(this, "sortable"); if (h && !h.options.disabled) { c.sortables.push({ instance: h, shouldRevert: h.options.revert }); h.refreshPositions(); h._trigger("activate", a, e) } }) }, stop: function (a, b) {
            var c = d(this).data("draggable"), f = d.extend({}, b, { item: c.element }); d.each(c.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver =
0; c.cancelHelperRemoval = true; this.instance.cancelHelperRemoval = false; if (this.shouldRevert) this.instance.options.revert = true; this.instance._mouseStop(a); this.instance.options.helper = this.instance.options._helper; c.options.helper == "original" && this.instance.currentItem.css({ top: "auto", left: "auto" })
                } else { this.instance.cancelHelperRemoval = false; this.instance._trigger("deactivate", a, f) } 
            })
        }, drag: function (a, b) {
            var c = d(this).data("draggable"), f = this; d.each(c.sortables, function () {
                this.instance.positionAbs =
c.positionAbs; this.instance.helperProportions = c.helperProportions; this.instance.offset.click = c.offset.click; if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1; this.instance.currentItem = d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true); this.instance.options._helper = this.instance.options.helper; this.instance.options.helper = function () { return b.helper[0] }; a.target = this.instance.currentItem[0]; this.instance._mouseCapture(a,
true); this.instance._mouseStart(a, true, true); this.instance.offset.click.top = c.offset.click.top; this.instance.offset.click.left = c.offset.click.left; this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left; this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top; c._trigger("toSortable", a); c.dropped = this.instance.element; c.currentItem = c.element; this.instance.fromOutside = c
                    } this.instance.currentItem && this.instance._mouseDrag(a)
                } else if (this.instance.isOver) {
                    this.instance.isOver =
0; this.instance.cancelHelperRemoval = true; this.instance.options.revert = false; this.instance._trigger("out", a, this.instance._uiHash(this.instance)); this.instance._mouseStop(a, true); this.instance.options.helper = this.instance.options._helper; this.instance.currentItem.remove(); this.instance.placeholder && this.instance.placeholder.remove(); c._trigger("fromSortable", a); c.dropped = false
                } 
            })
        } 
        }); d.ui.plugin.add("draggable", "cursor", { start: function () {
            var a = d("body"), b = d(this).data("draggable").options; if (a.css("cursor")) b._cursor =
a.css("cursor"); a.css("cursor", b.cursor)
        }, stop: function () { var a = d(this).data("draggable").options; a._cursor && d("body").css("cursor", a._cursor) } 
        }); d.ui.plugin.add("draggable", "opacity", { start: function (a, b) { a = d(b.helper); b = d(this).data("draggable").options; if (a.css("opacity")) b._opacity = a.css("opacity"); a.css("opacity", b.opacity) }, stop: function (a, b) { a = d(this).data("draggable").options; a._opacity && d(b.helper).css("opacity", a._opacity) } }); d.ui.plugin.add("draggable", "scroll", { start: function () {
            var a = d(this).data("draggable");
            if (a.scrollParent[0] != document && a.scrollParent[0].tagName != "HTML") a.overflowOffset = a.scrollParent.offset()
        }, drag: function (a) {
            var b = d(this).data("draggable"), c = b.options, f = false; if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                if (!c.axis || c.axis != "x") if (b.overflowOffset.top + b.scrollParent[0].offsetHeight - a.pageY < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop + c.scrollSpeed; else if (a.pageY - b.overflowOffset.top < c.scrollSensitivity) b.scrollParent[0].scrollTop =
f = b.scrollParent[0].scrollTop - c.scrollSpeed; if (!c.axis || c.axis != "y") if (b.overflowOffset.left + b.scrollParent[0].offsetWidth - a.pageX < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft + c.scrollSpeed; else if (a.pageX - b.overflowOffset.left < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft - c.scrollSpeed
            } else {
                if (!c.axis || c.axis != "x") if (a.pageY - d(document).scrollTop() < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() - c.scrollSpeed);
                else if (d(window).height() - (a.pageY - d(document).scrollTop()) < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() + c.scrollSpeed); if (!c.axis || c.axis != "y") if (a.pageX - d(document).scrollLeft() < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() - c.scrollSpeed); else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() + c.scrollSpeed)
            } f !== false && d.ui.ddmanager && !c.dropBehaviour && d.ui.ddmanager.prepareOffsets(b,
a)
        } 
        }); d.ui.plugin.add("draggable", "snap", { start: function () { var a = d(this).data("draggable"), b = a.options; a.snapElements = []; d(b.snap.constructor != String ? b.snap.items || ":data(draggable)" : b.snap).each(function () { var c = d(this), f = c.offset(); this != a.element[0] && a.snapElements.push({ item: this, width: c.outerWidth(), height: c.outerHeight(), top: f.top, left: f.left }) }) }, drag: function (a, b) {
            for (var c = d(this).data("draggable"), f = c.options, e = f.snapTolerance, h = b.offset.left, g = h + c.helperProportions.width, n = b.offset.top,
o = n + c.helperProportions.height, i = c.snapElements.length - 1; i >= 0; i--) {
                var j = c.snapElements[i].left, l = j + c.snapElements[i].width, k = c.snapElements[i].top, m = k + c.snapElements[i].height; if (j - e < h && h < l + e && k - e < n && n < m + e || j - e < h && h < l + e && k - e < o && o < m + e || j - e < g && g < l + e && k - e < n && n < m + e || j - e < g && g < l + e && k - e < o && o < m + e) {
                    if (f.snapMode != "inner") {
                        var p = Math.abs(k - o) <= e, q = Math.abs(m - n) <= e, r = Math.abs(j - g) <= e, s = Math.abs(l - h) <= e; if (p) b.position.top = c._convertPositionTo("relative", { top: k - c.helperProportions.height, left: 0 }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", { top: m, left: 0 }).top - c.margins.top; if (r) b.position.left = c._convertPositionTo("relative", { top: 0, left: j - c.helperProportions.width }).left - c.margins.left; if (s) b.position.left = c._convertPositionTo("relative", { top: 0, left: l }).left - c.margins.left
                    } var t = p || q || r || s; if (f.snapMode != "outer") {
                        p = Math.abs(k - n) <= e; q = Math.abs(m - o) <= e; r = Math.abs(j - h) <= e; s = Math.abs(l - g) <= e; if (p) b.position.top = c._convertPositionTo("relative", { top: k, left: 0 }).top - c.margins.top; if (q) b.position.top =
c._convertPositionTo("relative", { top: m - c.helperProportions.height, left: 0 }).top - c.margins.top; if (r) b.position.left = c._convertPositionTo("relative", { top: 0, left: j }).left - c.margins.left; if (s) b.position.left = c._convertPositionTo("relative", { top: 0, left: l - c.helperProportions.width }).left - c.margins.left
                    } if (!c.snapElements[i].snapping && (p || q || r || s || t)) c.options.snap.snap && c.options.snap.snap.call(c.element, a, d.extend(c._uiHash(), { snapItem: c.snapElements[i].item })); c.snapElements[i].snapping = p || q || r || s || t
                } else {
                    c.snapElements[i].snapping &&
c.options.snap.release && c.options.snap.release.call(c.element, a, d.extend(c._uiHash(), { snapItem: c.snapElements[i].item })); c.snapElements[i].snapping = false
                } 
            } 
        } 
        }); d.ui.plugin.add("draggable", "stack", { start: function () { var a = d(this).data("draggable").options; a = d.makeArray(d(a.stack)).sort(function (c, f) { return (parseInt(d(c).css("zIndex"), 10) || 0) - (parseInt(d(f).css("zIndex"), 10) || 0) }); if (a.length) { var b = parseInt(a[0].style.zIndex) || 0; d(a).each(function (c) { this.style.zIndex = b + c }); this[0].style.zIndex = b + a.length } } });
        d.ui.plugin.add("draggable", "zIndex", { start: function (a, b) { a = d(b.helper); b = d(this).data("draggable").options; if (a.css("zIndex")) b._zIndex = a.css("zIndex"); a.css("zIndex", b.zIndex) }, stop: function (a, b) { a = d(this).data("draggable").options; a._zIndex && d(b.helper).css("zIndex", a._zIndex) } })
    })(jQuery);
    ;
});