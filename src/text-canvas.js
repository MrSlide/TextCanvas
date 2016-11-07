'use strict'

/**
 * @name TextCanas
 * @desc Renders wrapped text to a 2D canvas element.
 * @author Luis Rodrigues (http://www.luisrodriguesweb.com)
 * @version 0.1.1-alpha
 * @license MIT
 */

/**
 * @typedef {Object} TextStyle
 * @property {String} [fontFamily='sans-serif'] - The font family of the text.
 * @property {String} [fontStyle='normal'] - The font style. The possible values are `normal`, `italic` or `oblique`.
 * @property {String|Number} [fontWeight='normal'] - The font weight. The possible values are `normal`, `bold`, or a multiple of 100 from 100 to 900.
 * @property {String} [fontVariant='normal'] - The font variant. The possible values are `normal` or `small-caps`.
 * @property {Number} [fontSize=16] - The font size in pixels.
 * @property {Number} [lineHeight=fontSize*1.2] - The height of each line, in pixels.
 * @property {String} [textAlign='left'] - The alignment of the text. The possible values are `left`, `center` or `right`.
 * @property {String} [textBaseline='bottom'] - The baseline of the text. The possible values are `top`, `hanging`, `middle`, `alphabetic`, `ideographic` or `bottom`.
 * @property {String} [textColor='black'] - The text colour. It can be any CSS colour string.
 * @property {Boolean|Number} [wordWrap=false] - Set to `false` to draw all the text in a single line. Setting it to a number will define the maximum line width in pixels.
 */

/**
 * @typedef {Object} LineConfig
 * @property {String} text - The text to render on the line.
 * @property {Number} width - The width of the line.
 * @property {Number} height - The height of the line.
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
   * @param {TextStyle} [style={}] - The text style configuration.
   * @param {Number} [resolution=window.devicePixelRation] - The resolution of the drawn text.
   * @return {TextCanvas}
   */
  constructor (text, style = {}, resolution) {
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
    }

    this.text = text
    this.style = style
    this.resolution = resolution

    this.createCanvas()
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
  get style () {
    return this._style
  }

  /**
   * Change the text style configuration.
   *
   * @public
   * @type {TextStyle} - The new text style configuration
   */
  set style (value) {
    this._style = Object.assign(this._style, value)

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

  /**
   * Apply the selected text styles to the canvas context
   *
   * @private
   */
  applyStyles () {
    this._ctx.scale(this._resolution, this._resolution)

    const style = this._style

    this._ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize}px ${style.fontFamily}`
    this._ctx.textAlign = style.textAlign
    this._ctx.textBaseline = style.textBaseline
    this._ctx.fillStyle = style.textColor
  }

  /**
   * Wrap the text and create a configuration for each line.
   *
   * @private
   * @return {Array<LineConfig>}
   */
  createLines () {
    // Create lines out of the hard line breaks
    const forcedLines = this._text.split('\n')

    const spaceMeasure = this._ctx.measureText(' ')
    const lines = []
    const lineHeight = this._style.lineHeight || this._style.fontSize * 1.2
    let currentLine = {
      text: '',
      width: 0,
      height: lineHeight
    }
    let lineWords
    let wordMeasure

    // Wrap each line
    for (let i = 0; i < forcedLines.length; i++) {
      lineWords = forcedLines[i].split(' ')

      for (let j = 0; j < lineWords.length; j++) {
        wordMeasure = this._ctx.measureText(lineWords[j])

        // The word will not fit the current line
        if (this._style.wordWrap && currentLine.width + wordMeasure.width > this._style.wordWrap) {
          // Only add the word to the next line if there is a previous line
          if (j && i) {
            currentLine.text = currentLine.text.trim()
            currentLine.width -= spaceMeasure.width

            lines.push(currentLine)

            currentLine = {
              text: '',
              width: 0,
              height: lineHeight
            }
          }

          currentLine.width = wordMeasure.width + spaceMeasure.width
          currentLine.text = lineWords[j] + ' '
        // The word fits the current line
        } else {
          currentLine.width += wordMeasure.width + spaceMeasure.width
          currentLine.text += lineWords[j] + ' '
        }
      }

      currentLine.text = currentLine.text.trim()
      currentLine.width -= spaceMeasure.width

      lines.push(currentLine)

      currentLine = {
        text: '',
        width: 0,
        height: lineHeight
      }
    }

    return lines
  }

  /**
   * Get the dimensons of the canvas after rendering the text.
   *
   * @private
   * @param {Array<LineConfig>} - The configuration for each line to be rendered.
   * @return {Object}
   * @property {Number} width - The width of the canvas.
   * @property {Number} height - The height of the canvas.
   */
  getCanvasDimensions (lines) {
    let maxWith = 0
    let maxHeight = 0

    for (let i = 0; i < lines.length; i++) {
      maxWith = Math.max(maxWith, lines[i].width)
      maxHeight += lines[i].height
    }

    return {
      width: Math.ceil(maxWith),
      height: Math.ceil(maxHeight)
    }
  }

  /**
   * Render the text to the canvas.
   *
   * @public
   * @return {HTMLCanvasElement} - A canvas element wit the text rendered on it.
   */
  render () {
    this.applyStyles()

    const lines = this.createLines()
    const dimensions = this.getCanvasDimensions(lines)

    this._canvas.width = dimensions.width * this._resolution
    this._canvas.height = dimensions.height * this._resolution

    this.applyStyles() // After changing the canvas dimensions the styles get reset

    this._ctx.clearRect(0, 0, dimensions.width, dimensions.height)

    let x = 0
    let y = 0

    if (this._style.textAlign === 'center') {
      x = dimensions.width / 2
    } else if (this._style.textAlign === 'right') {
      x = dimensions.width
    }

    for (let i = 0; i < lines.length; i++) {
      y += lines[i].height
      this._ctx.fillText(lines[i].text, x, y)
    }

    return this._canvas
  }
}
