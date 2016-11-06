(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.TextCanvas = factory());
}(this, (function () { 'use strict';

/**
 * @name TextCanas
 * @desc Renders wrapped text to a 2D canvas element.
 * @author Luis Rodrigues (http://www.luisrodriguesweb.com)
 * @version 0.1.0-alpha
 * @license MIT
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextCanvas = function () {
  function TextCanvas(text) {
    var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var resolution = arguments[2];

    _classCallCheck(this, TextCanvas);

    this._style = {
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      fontSize: 16,
      textAlign: 'left',
      textBaseline: 'bottom',
      textColor: 'black',
      wordWrap: false
    };

    this.text = text;
    this.style = style;
    this.resolution = resolution;

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
    key: 'applyStyles',
    value: function applyStyles() {
      this._ctx.scale(this._resolution, this._resolution);

      var style = this._style;

      this._ctx.font = style.fontStyle + ' ' + style.fontVariant + ' ' + style.fontWeight + ' ' + style.fontSize + 'px ' + style.fontFamily;
      this._ctx.textAlign = style.textAlign;
      this._ctx.textBaseline = style.textBaseline;
      this._ctx.fillStyle = style.textColor;
    }
  }, {
    key: 'createLines',
    value: function createLines() {
      var forcedLines = this._text.split('\n');

      if (!this._style.wordWrap) {
        return forcedLines;
      }

      var spaceMeasure = this._ctx.measureText(' ');
      var lines = [];
      var lineHeight = this._style.lineHeight || this._style.fontSize * 1.2;
      var currentLine = {
        text: '',
        width: 0,
        height: lineHeight
      };
      var lineWords = void 0;
      var wordMeasure = void 0;

      for (var i = 0; i < forcedLines.length; i++) {
        lineWords = forcedLines[i].split(' ');

        for (var j = 0; j < lineWords.length; j++) {
          wordMeasure = this._ctx.measureText(lineWords[j]);

          if (currentLine.width + wordMeasure.width > this._style.wordWrap) {
            if (j && i) {
              currentLine.text = currentLine.text.trim();
              currentLine.width -= spaceMeasure.width;

              lines.push(currentLine);

              currentLine = {
                text: '',
                width: 0,
                height: lineHeight
              };
            }

            currentLine.width = wordMeasure.width + spaceMeasure.width;
            currentLine.text = lineWords[j] + ' ';
          } else {
            currentLine.width += wordMeasure.width + spaceMeasure.width;
            currentLine.text += lineWords[j] + ' ';
          }
        }

        currentLine.text = currentLine.text.trim();
        currentLine.width -= spaceMeasure.width;

        lines.push(currentLine);

        currentLine = {
          text: '',
          width: 0,
          height: lineHeight
        };
      }

      return lines;
    }
  }, {
    key: 'getCanvasDimensions',
    value: function getCanvasDimensions(lines) {
      var maxWith = 0;
      var maxHeight = 0;

      for (var i = 0; i < lines.length; i++) {
        maxWith = Math.max(maxWith, lines[i].width);
        maxHeight += lines[i].height;
      }

      return {
        width: Math.ceil(maxWith),
        height: Math.ceil(maxHeight)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      this.applyStyles();

      var lines = this.createLines();
      var dimensions = this.getCanvasDimensions(lines);

      this._canvas.width = (dimensions.width + dimensions.adjustment) * this._resolution;
      this._canvas.height = (dimensions.height + dimensions.adjustment) * this._resolution;

      this.applyStyles();

      this._ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      var x = 0;
      var y = 0;

      if (this._style.textAlign === 'center') {
        x = dimensions.width / 2;
      } else if (this._style.textAlign === 'right') {
        x = dimensions.width;
      }

      for (var i = 0; i < lines.length; i++) {
        y += lines[i].height;
        this._ctx.fillText(lines[i].text, x, y);
      }

      return this._canvas;
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
    key: 'style',
    get: function get() {
      return this._style;
    },
    set: function set(value) {
      this._style = _extends(this._style, value);

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
