(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.TextCanvas = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextCanvas = function () {
  function TextCanvas(text) {
    var textStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resolution = arguments[2];

    _classCallCheck(this, TextCanvas);

    this.text = text;
    this.textStyle = textStyle;

    this.createCanvas();
  }

  _createClass(TextCanvas, [{
    key: 'createCanvas',
    value: function createCanvas() {
      this._canvas = document.createElement('canvas');
      this._ctx = this._canvas.getContext('2d');

      return this._canvas;
    }
  }, {
    key: 'applyTextStyles',
    value: function applyTextStyles() {
      var style = this._style;

      this._ctx.font = style.fontStyle + ' ' + style.fontVariant + ' ' + style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily;
      this._ctx.textAlign = style.textAlign;
      this._ctx.textBaseline = style.textBaseline;
      this._ctx.fillStyle = style.textColor;
      this._ctx.shadowBlur = style.shadowBlur;
      this._ctx.shadowOffsetX = style.shadowOffsetX;
      this._ctx.shadowOffsetY = style.shadowOffsetY;
      this._ctx.shadowColor = style.shadowColor;
    }
  }, {
    key: 'createTextLines',
    value: function createTextLines() {
      var forcedLines = this._text.split('\n');

      if (!this._style.wordWrap) {
        return forcedLines;
      }

      var spaceMeasure = this._ctx.measureText(' ');
      var lines = [];
      var lineWidth = 0;
      var lineContents = '';

      for (var i = 0; i < forcedLines.length; i++) {
        var lineWords = forcedLines.split(' ');

        for (var j = 0; j < lineWords.length; j++) {
          var wordMeasure = this._ctx.measureText(lineWords[j]);

          if (lineWidth + wordMeasure.width > this._style.wordWrap) {
            if (j) {
              lines.push(lineContents.trim());
            }
            lineWidth = wordMeasure.width;
            lineContents = lineWords[j];
          } else {
            lineWidth += wordMeasure.width + spaceMeasure.width;
            lineContents += lineWords[j] + ' ';
          }
        }

        lines.push(lineContents.trim());
        lineWidth = 0;
        lineContents = '';
      }
    }
  }, {
    key: 'defaultTextStyle',
    get: function get() {
      return {
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontVariant: 'normal',
        fontSize: '16px',
        textAlign: 'left',
        textBaseline: 'ideographic',
        textColor: 'black',
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'black',
        wordWrap: false,
        wordBreak: false
      };
    }
  }, {
    key: 'text',
    get: function get() {
      return this._text;
    },
    set: function set(value) {
      if (typeof value !== 'string') {
        throw new TypeError(this.constructor.name + ': \'text\' must be a string.');
      }

      value = value.trim();

      if (!value) {
        throw new RangeError(this.constructor.name + ': \'text\' is empty.');
      }

      this._text = value;
      return this._text;
    }
  }, {
    key: 'textStyle',
    get: function get() {
      return this._style;
    },
    set: function set() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._style = _extends({}, this.defaultTextStyle, value);

      return this._style;
    }
  }, {
    key: 'resolution',
    get: function get() {
      return this._resolution;
    },
    set: function set(value) {
      if (value !== void 0 && Number.isNaN(value)) {
        throw new TypeError(this.constructor.name + ': \'resolution\' must be a number.');
      }

      if (value === 0) {
        throw new RangeError(this.constructor.name + ': \'resolution\' must be greater than 0.');
      }

      value = value || window.devicePixelRatio || 1;
      value = parseFloat(value);

      if (Math.sign(value) === -1) {
        throw new RangeError(this.constructor.name + ': \'resolution\' must be a positive number.');
      }

      this._resolution = value;

      return this._resolution;
    }
  }]);

  return TextCanvas;
}();

return TextCanvas;

})));
//# sourceMappingURL=text-canvas.js.map
