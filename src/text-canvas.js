/**
 * @typedef {Object} TextStyle
 * @property {String} [fontFamily='sans-serif'] - The font family of the text.
 * @property {String} [fontStyle='normal'] - The font style. The possible values are `normal`, `italic` or `oblique`.
 * @property {String|Number} [fontWeight='normal'] - The font weight. The possible values are `normal`, `bold`, or a multiple of 100 from 100 to 900.
 * @property {String} [fontVariant='normal'] - The font variant. The possible values are `normal` or `small-caps`.
 * @property {String} [fontSize='16px'] - The font size. Can be a value in `px` or `pt`.
 * @property {String} [textAlign='left'] - The alignment of the text. The possible values are `left`, `center` or `right`.
 * @property {String} [textBaseline='ideographic'] - The baseline of the text. The possible values are `top`, `hanging`, `middle`, `alphabetic`, `ideographic` or `bottom`.
 * @property {String} [textColor='black'] - The text colour. It can be any CSS colour string.
 * @property {Number} [shadowBlur=0] - The text blur amount.
 * @property {Number} [shadowOffsetX=0] - The horizontal offset of the text blue. Positive values will offset the shadow to the right, and negative values will offset the shadow to the left.
 * @property {String} [shadowColor='black'] - The colour of the text shadow. It can be any CSS colour string.
 * @property {Boolean|Number} [wordWrap=false] - Set to `false` to draw all the text in a single line. Setting it to a number will define the maximum line width in pixels.
 */

/**
 * Draws text on a canvas so that text can be used as a texture on a WebGL context or as a layer on another 2D context.
 *
 * @public
 * @class
 */
export default class TextCanvas {
  /**
   * Create an instance of a text canvas.
   *
   * @public
   * @param {String} text - The text to be drawn.
   * @param {TextStyle} [textStyle={}] - The text style configuration.
   * @param {Number} [resolution=window.devicePixelRation] - The resolution of the drawn text.
   * @return {TextCanvas}
   */
  constructor (text, textStyle = {}, resolution) {
    this.text = text
    this.textStyle = textStyle

    this.createCanvas()
  }

  /**
   * Get the default text style configuration.
   *
   * @private
   * @type {TextStyle}
   */
  get defaultTextStyle () {
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
    }
  }

  /**
   * Get the text that will be used the next time the text is drawn.
   *
   * @public
   * @type {String}
   */
  get text () {
    return this._text
  }

  /**
   * Change the text to be drawn.
   *
   * @public
   * @type {String}
   * @throws {TypeError} - If the value is not a string.
   * @throws {RangeError} If the text is empty.
   */
  set text (value) {
    if (typeof value !== 'string') {
      throw new TypeError(`${this.constructor.name}: 'text' must be a string.`)
    }

    value = value.trim()

    if (!value) {
      throw new RangeError(`${this.constructor.name}: 'text' is empty.`)
    }

    this._text = value
    return this._text
  }

  /**
   * Get the text style configuration that will be used the next time the text is drawn.
   *
   * @public
   * @type {TextStyle}
   */
  get textStyle () {
    return this._style
  }

  /**
   * Change the text style configuration.
   *
   * @public
   * @type {TextStyle} - The new text style configuration
   */
  set textStyle (value = {}) {
    this._style = Object.assign({}, this.defaultTextStyle, value)

    return this._style
  }

  /**
   * Get the text resolution that will be used the next time the text is drawn.
   *
   * @public
   * @type {Number}
   */
  get resolution () {
    return this._resolution
  }

  /**
   * Set the resolution of the text.
   *
   * @public
   * @type {Number} - The resolution of the text. Defaults to the device pixel ratio.
   * @throws {TypeError} - If the value is not a number.
   * @throws {RangeError} - If the value is 0.
   * @throws {RangeError} - If the value is not a positive number.
   */
  set resolution (value) {
    if (value !== void 0 && Number.isNaN(value)) {
      throw new TypeError(`${this.constructor.name}: 'resolution' must be a number.`)
    }

    if (value === 0) {
      throw new RangeError(`${this.constructor.name}: 'resolution' must be greater than 0.`)
    }

    value = value || window.devicePixelRatio || 1
    value = parseFloat(value)

    if (Math.sign(value) === -1) {
      throw new RangeError(`${this.constructor.name}: 'resolution' must be a positive number.`)
    }

    this._resolution = value

    return this._resolution
  }

  /**
   * Create the canvas element where the text will be drawn.
   *
   * @private
   * @return {HTMLCanvasElement}
   */
  createCanvas () {
    this._canvas = document.createElement('canvas')
    this._ctx = this._canvas.getContext('2d')

    return this._canvas
  }

  applyTextStyles () {
    const style = this._style

    this._ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    this._ctx.textAlign = style.textAlign
    this._ctx.textBaseline = style.textBaseline
    this._ctx.fillStyle = style.textColor
    this._ctx.shadowBlur = style.shadowBlur
    this._ctx.shadowOffsetX = style.shadowOffsetX
    this._ctx.shadowOffsetY = style.shadowOffsetY
    this._ctx.shadowColor = style.shadowColor
  }

  createTextLines () {
    const forcedLines = this._text.split('\n')

    if (!this._style.wordWrap) {
      return forcedLines
    }

    const spaceMeasure = this._ctx.measureText(' ')
    const lines = []
    let lineWidth = 0
    let lineContents = ''

    for (let i = 0; i < forcedLines.length; i++) {
      const lineWords = forcedLines.split(' ')

      for (let j = 0; j < lineWords.length; j++) {
        const wordMeasure = this._ctx.measureText(lineWords[j])

        if (lineWidth + wordMeasure.width > this._style.wordWrap) {
          if (j) {
            lines.push(lineContents.trim())
          }
          lineWidth = wordMeasure.width
          lineContents = lineWords[j]
        } else {
          lineWidth += wordMeasure.width + spaceMeasure.width
          lineContents += lineWords[j] + ' '
        }
      }

      lines.push(lineContents.trim())
      lineWidth = 0
      lineContents = ''
    }
  }
}
