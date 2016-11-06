# TextCanvas

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![latest-release](https://img.shields.io/github/release/MrSlide/TextCanvas.svg?style=flat-square)](https://github.com/MrSlide/ExtDate/tree/master)
[![GitHub issues](https://img.shields.io/github/issues/MrSlide/TextCanvas.svg?style=flat-square)](https://github.com/MrSlide/ExtDate/issues)
[![license](https://img.shields.io/github/license/MrSlide/TextCanvas.svg?style=flat-square)](https://opensource.org/licenses/MIT)

With TextCanvas you can render multi-line text to a 2D canvas that will automatically resize to the text dimensions. This can be useful if you need to create a texture to use on a WebGL canvas or even if you just need text to wrap text automatically on a 2D canvas.



## Installation

### Via [Bower](http://bower.io/)

```
bower install ext-date
```

### Via [NPM](https://www.npmjs.com/)

```
npm install text-canvas
```



## Usage

TextCanvas is an [UMD](https://github.com/umdjs/umd) module. You can load it into your application either by importing the module, or loading the script in your page.

If you are importing the TextCanvas module via [Webpack](https://webpack.github.io/), [Browserify](http://browserify.org/) or similar, make sure that the module name `text-canvas` is being resolved correctly to the [Bower](http://bower.io/) or [NPM](https://www.npmjs.com/) packages folder.

### Via ES6 syntax

```
import TextCanvas from 'text-canvas'
```

### Via CommonJS syntax

```
var TextCanvas = require('text-canvas')
```

### Via the script tag

```
<script src="/scripts/TextCanvas.js"></script> // Change the path as necessary
```



## API

### TextCanvas.prototype.constructor([[String] text[, [Object] style[, [Number] resolution]]])

Creates an instance of TextCanvas, which you will be able to modify and re-render at any point.

**Parameters**

| Name       | Type     | Required | Default                 | Description                                             |
|------------|----------|----------|-------------------------|---------------------------------------------------------|
| text       | [String] | `false`  | ''                      | The text to be rendered on the canvas.                  |
| style      | [Object] | `false`  | {}                      | The style to use when rendering the text.               |
| resolution | [Number] | `false`  | window.devicePixelRatio | The resolution, or pixel density, of the rendered text. |

**Returns**

TextCanvas - The created instance.

**Example**

```
const textCanvas = new TextCanvas('Hello, World!', {fontFamily: 'Arial', wordWrap: 300}, 2)
```



### Properties

#### TextCanvas.prototype.text = [String]

Get or set the text that will be rendered. To force line breaks, use the new line character `\n`.

**Returns**

[String] - The text currently set to be rendered.

**Example**

```
const text = textCanvas.text // Outputs the text that will be rendered

textCanvas.text = 'Hello, World!' // Sets the text that will be rendered
```


#### TextCanvas.prototype.style = [Object]

Get or set the text style.
Setting the style is an additive operation. All the previously existing styles that are not being set will be kept.

**Properties**

| Name         | Type               | Required | Default        | Description                                                                                                                                                            |
|--------------|--------------------|----------|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fontFamily   | [String]           | `false`  | 'sans-serif'   | The font family name. Unlike the CSS `font-family` property, fallback font families are not supported.                                                                 |
| fontStyle    | [String]           | `false`  | 'normal'       | The font style. The possible values are `normal`, `italic` or `oblique`.                                                                                               |
| fontWeight   | [String]/[Number]  | `false`  | 'normal'       | The font weight. The possible values are `normal`, `bold`, or a multiple of 100 from 100 to 900.                                                                       |
| fontVariant  | [String]           | `false`  | 'normal'       | The font variant. The possible values are `normal` or `small-caps`.                                                                                                    |
| fontSize     | [Number]           | `false`  | 16             | The font size in pixels.                                                                                                                                               |
| lineHeight   | [Number]           | `false`  | fontSize * 1.2 | The text line height, in pixels.                                                                                                                                       |
| textAlign    | [String]           | `false`  | 'left'         | The alignment of the text. The possible values are `left`, `center` or `right`.                                                                                        |
| textBaseline | [String]           | `false`  | 'bottom'       | The baseline of the text. The possible values are `top`, `hanging`, `middle`, `alphabetic`, `ideographic` or `bottom`. Changing this value might create some clipping. |
| textColor    | [String]           | `false`  | 'black'        | The text colour. It can be any CSS colour string supported by the browser.                                                                                             |
| wordWrap     | [Boolean]/[Number] | `false`  | false          | Set to `false` to draw all the text in a single line. Setting it to a number will define the maximum line width in pixels.                                             |

**Returns**

[Object] - The full text style object.

**Example**

```
const style = textCanvas.style // Outputs the full text style object

textCanvas.style = {fontSize: 24, fontWeight: 'bold'} // Sets the text style options
```


#### TextCanvas.prototype.resolution = [Number]

Get or set the pixel density or resolution of the canvas. This will affect the dimensions of the canvas.

**Returns**

[Number] - The pixel density or resolution at which the text will be rendered.

**Example**

```
const resolution = textCanvas.resolution // Outputs the resolution of the canvas

textCanvas.resolution = 2 // Sets the resolution of the canvas
```



### Methods

#### TextCanvas.prototype.render()

Renders the text to the canvas with the currently set styles and resolution.
TextCanvas uses always the same canvas per instance. If you are using the canvas from a previously rendered text you need to take this into consideration because the dimensions and contents of the canvas will change.

**Returns**

[HTMLCanvasElement] - The canvas element in which the text was rendered.

**Example**

```
const canvas = textCanvas.render()
document.body.appendChild(canvas)
```



## Brower support

TextCanvas, although not tested in all of them, was created using features supported by these browsers.

- Android Browser 4+
- Blackberry Browser 7+
- Chrome 13+
- Firefox 4+
- Internet Explorer 9+
- Opera 12+
- Opera Mini 5+
- Safari 7+



## Support

If you want to request new features or find any bugs, please open a ticket on the [issues](https://github.com/MrSlide/TextCanvas/issues) page and I'll review it as soon as possible.



## Authors and Contributors

Created by Luís Rodrigues ([@MrSlide](https://github.com/MrSlide))



## License and copyright

Released under the [MIT](https://opensource.org/licenses/MIT) license

Copyright (c) 2016 Luís Rodrigues

[Object]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object
[String]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String
[Number]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number
[Boolean]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[HTMLCanvasElement]: https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement
