webpackHotUpdate(3,{

/***/ 1277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.0.0
 * react-dom-server.browser.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
(function() {

'use strict';

var objectAssign$1 = __webpack_require__(57);
var invariant = __webpack_require__(34);
var require$$0 = __webpack_require__(33);
var react = __webpack_require__(17);
var emptyFunction = __webpack_require__(31);
var propTypes = __webpack_require__(52);
var emptyObject = __webpack_require__(86);
var hyphenateStyleName = __webpack_require__(354);
var memoizeStringOnly = __webpack_require__(1278);
var checkPropTypes = __webpack_require__(58);
var camelizeStyleName = __webpack_require__(356);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule DOMNamespaces
 */

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
var MATH_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var Namespaces$1 = {
  html: HTML_NAMESPACE,
  mathml: MATH_NAMESPACE,
  svg: SVG_NAMESPACE
};

// Assumes there is no parent namespace.
function getIntrinsicNamespace$1(type) {
  switch (type) {
    case 'svg':
      return SVG_NAMESPACE;
    case 'math':
      return MATH_NAMESPACE;
    default:
      return HTML_NAMESPACE;
  }
}

function getChildNamespace$1(parentNamespace, type) {
  if (parentNamespace == null || parentNamespace === HTML_NAMESPACE) {
    // No (or default) parent namespace: potential entry point.
    return getIntrinsicNamespace$1(type);
  }
  if (parentNamespace === SVG_NAMESPACE && type === 'foreignObject') {
    // We're leaving SVG.
    return HTML_NAMESPACE;
  }
  // By default, pass namespace below.
  return parentNamespace;
}

var Namespaces_1 = Namespaces$1;
var getIntrinsicNamespace_1 = getIntrinsicNamespace$1;
var getChildNamespace_1 = getChildNamespace$1;

var DOMNamespaces = {
	Namespaces: Namespaces_1,
	getIntrinsicNamespace: getIntrinsicNamespace_1,
	getChildNamespace: getChildNamespace_1
};

// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS$1 = {
  children: true,
  dangerouslySetInnerHTML: true,
  autoFocus: true,
  defaultValue: true,
  defaultChecked: true,
  innerHTML: true,
  suppressContentEditableWarning: true,
  style: true
};

function checkMask(value, bitmask) {
  return (value & bitmask) === bitmask;
}

var DOMPropertyInjection = {
  /**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */
  MUST_USE_PROPERTY: 0x1,
  HAS_BOOLEAN_VALUE: 0x4,
  HAS_NUMERIC_VALUE: 0x8,
  HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
  HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
  HAS_STRING_BOOLEAN_VALUE: 0x40,

  /**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */
  injectDOMPropertyConfig: function (domPropertyConfig) {
    var Injection = DOMPropertyInjection;
    var Properties = domPropertyConfig.Properties || {};
    var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

    for (var propName in Properties) {
      !!DOMProperty.properties.hasOwnProperty(propName) ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.', propName) : void 0;

      var lowerCased = propName.toLowerCase();
      var propConfig = Properties[propName];

      var propertyInfo = {
        attributeName: lowerCased,
        attributeNamespace: null,
        propertyName: propName,
        mutationMethod: null,

        mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
        hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
        hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
        hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
        hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE),
        hasStringBooleanValue: checkMask(propConfig, Injection.HAS_STRING_BOOLEAN_VALUE)
      };
      !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s', propName) : void 0;

      if (DOMAttributeNames.hasOwnProperty(propName)) {
        var attributeName = DOMAttributeNames[propName];

        propertyInfo.attributeName = attributeName;
      }

      if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
        propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
      }

      if (DOMMutationMethods.hasOwnProperty(propName)) {
        propertyInfo.mutationMethod = DOMMutationMethods[propName];
      }

      // Downcase references to whitelist properties to check for membership
      // without case-sensitivity. This allows the whitelist to pick up
      // `allowfullscreen`, which should be written using the property configuration
      // for `allowFullscreen`
      DOMProperty.properties[propName] = propertyInfo;
    }
  }
};

/* eslint-disable max-len */
var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
/* eslint-enable max-len */

/**
 * DOMProperty exports lookup objects that can be used like functions:
 *
 *   > DOMProperty.isValid['id']
 *   true
 *   > DOMProperty.isValid['foobar']
 *   undefined
 *
 * Although this may be confusing, it performs better in general.
 *
 * @see http://jsperf.com/key-exists
 * @see http://jsperf.com/key-missing
 */
var DOMProperty = {
  ID_ATTRIBUTE_NAME: 'data-reactid',
  ROOT_ATTRIBUTE_NAME: 'data-reactroot',

  ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
  ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',

  /**
   * Map from property "standard name" to an object with info about how to set
   * the property in the DOM. Each object contains:
   *
   * attributeName:
   *   Used when rendering markup or with `*Attribute()`.
   * attributeNamespace
   * propertyName:
   *   Used on DOM node instances. (This includes properties that mutate due to
   *   external factors.)
   * mutationMethod:
   *   If non-null, used instead of the property or `setAttribute()` after
   *   initial render.
   * mustUseProperty:
   *   Whether the property must be accessed and mutated as an object property.
   * hasBooleanValue:
   *   Whether the property should be removed when set to a falsey value.
   * hasNumericValue:
   *   Whether the property must be numeric or parse as a numeric and should be
   *   removed when set to a falsey value.
   * hasPositiveNumericValue:
   *   Whether the property must be positive numeric or parse as a positive
   *   numeric and should be removed when set to a falsey value.
   * hasOverloadedBooleanValue:
   *   Whether the property can be used as a flag as well as with a value.
   *   Removed when strictly equal to false; present without a value when
   *   strictly equal to true; present with a value otherwise.
   */
  properties: {},

  /**
   * Checks whether a property name is a writeable attribute.
   * @method
   */
  shouldSetAttribute: function (name, value) {
    if (DOMProperty.isReservedProp(name)) {
      return false;
    }
    if ((name[0] === 'o' || name[0] === 'O') && (name[1] === 'n' || name[1] === 'N')) {
      return false;
    }
    if (value === null) {
      return true;
    }
    switch (typeof value) {
      case 'boolean':
        return DOMProperty.shouldAttributeAcceptBooleanValue(name);
      case 'undefined':
      case 'number':
      case 'string':
      case 'object':
        return true;
      default:
        // function, symbol
        return false;
    }
  },

  getPropertyInfo: function (name) {
    return DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
  },
  shouldAttributeAcceptBooleanValue: function (name) {
    if (DOMProperty.isReservedProp(name)) {
      return true;
    }
    var propertyInfo = DOMProperty.getPropertyInfo(name);
    if (propertyInfo) {
      return propertyInfo.hasBooleanValue || propertyInfo.hasStringBooleanValue || propertyInfo.hasOverloadedBooleanValue;
    }
    var prefix = name.toLowerCase().slice(0, 5);
    return prefix === 'data-' || prefix === 'aria-';
  },


  /**
   * Checks to see if a property name is within the list of properties
   * reserved for internal React operations. These properties should
   * not be set on an HTML element.
   *
   * @private
   * @param {string} name
   * @return {boolean} If the name is within reserved props
   */
  isReservedProp: function (name) {
    return RESERVED_PROPS$1.hasOwnProperty(name);
  },


  injection: DOMPropertyInjection
};

var DOMProperty_1 = DOMProperty;

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Based on the escape-html library, which is used under the MIT License below:
 *
 * Copyright (c) 2012-2013 TJ Holowaychuk
 * Copyright (c) 2015 Andreas Lubbe
 * Copyright (c) 2015 Tiancheng "Timothy" Gu
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule escapeTextContentForBrowser
 */

// code copied and modified from escape-html
/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        // "
        escape = '&quot;';
        break;
      case 38:
        // &
        escape = '&amp;';
        break;
      case 39:
        // '
        escape = '&#x27;'; // modified from escape-html; used to be '&#39'
        break;
      case 60:
        // <
        escape = '&lt;';
        break;
      case 62:
        // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
// end code copied and modified from escape-html

/**
 * Escapes text to prevent scripting attacks.
 *
 * @param {*} text Text value to escape.
 * @return {string} An escaped string.
 */
function escapeTextContentForBrowser(text) {
  if (typeof text === 'boolean' || typeof text === 'number') {
    // this shortcircuit helps perf for types that we know will never have
    // special characters, especially given that this function is used often
    // for numeric dom ids.
    return '' + text;
  }
  return escapeHtml(text);
}

var escapeTextContentForBrowser_1 = escapeTextContentForBrowser;

/**
 * Escapes attribute value to prevent scripting attacks.
 *
 * @param {*} value Value to escape.
 * @return {string} An escaped string.
 */
function quoteAttributeValueForBrowser(value) {
  return '"' + escapeTextContentForBrowser_1(value) + '"';
}

var quoteAttributeValueForBrowser_1 = quoteAttributeValueForBrowser;

{
  var warning$1 = require$$0;
}

// isAttributeNameSafe() is currently duplicated in DOMPropertyOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty_1.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
var illegalAttributeNameCache = {};
var validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
    return true;
  }
  if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
    return false;
  }
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
    validatedAttributeNameCache[attributeName] = true;
    return true;
  }
  illegalAttributeNameCache[attributeName] = true;
  {
    warning$1(false, 'Invalid attribute name: `%s`', attributeName);
  }
  return false;
}

// shouldIgnoreValue() is currently duplicated in DOMPropertyOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo, value) {
  return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
}

/**
 * Operations for dealing with DOM properties.
 */
var DOMMarkupOperations = {
  /**
   * Creates markup for the ID property.
   *
   * @param {string} id Unescaped ID.
   * @return {string} Markup string.
   */
  createMarkupForID: function (id) {
    return DOMProperty_1.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser_1(id);
  },

  createMarkupForRoot: function () {
    return DOMProperty_1.ROOT_ATTRIBUTE_NAME + '=""';
  },

  /**
   * Creates markup for a property.
   *
   * @param {string} name
   * @param {*} value
   * @return {?string} Markup string, or null if the property was invalid.
   */
  createMarkupForProperty: function (name, value) {
    var propertyInfo = DOMProperty_1.getPropertyInfo(name);
    if (propertyInfo) {
      if (shouldIgnoreValue(propertyInfo, value)) {
        return '';
      }
      var attributeName = propertyInfo.attributeName;
      if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
        return attributeName + '=""';
      } else if (typeof value !== 'boolean' || DOMProperty_1.shouldAttributeAcceptBooleanValue(name)) {
        return attributeName + '=' + quoteAttributeValueForBrowser_1(value);
      }
    } else if (DOMProperty_1.shouldSetAttribute(name, value)) {
      if (value == null) {
        return '';
      }
      return name + '=' + quoteAttributeValueForBrowser_1(value);
    }
    return null;
  },

  /**
   * Creates markup for a custom property.
   *
   * @param {string} name
   * @param {*} value
   * @return {string} Markup string, or empty string if the property was invalid.
   */
  createMarkupForCustomAttribute: function (name, value) {
    if (!isAttributeNameSafe(name) || value == null) {
      return '';
    }
    return name + '=' + quoteAttributeValueForBrowser_1(value);
  }
};

var DOMMarkupOperations_1 = DOMMarkupOperations;

var ReactControlledValuePropTypes = {
  checkPropTypes: null
};

{
  var warning$2 = require$$0;
  var emptyFunction$1 = emptyFunction;
  var PropTypes = propTypes;
  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  ReactControlledValuePropTypes.checkPropTypes = emptyFunction$1;
  var hasReadOnlyValue = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
  };

  var propTypes$1 = {
    value: function (props, propName, componentName) {
      if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    checked: function (props, propName, componentName) {
      if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
        return null;
      }
      return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
    },
    onChange: PropTypes.func
  };

  var loggedTypeFailures = {};

  /**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */
  ReactControlledValuePropTypes.checkPropTypes = function (tagName, props, getStack) {
    for (var propName in propTypes$1) {
      if (propTypes$1.hasOwnProperty(propName)) {
        var error = propTypes$1[propName](props, propName, tagName, 'prop', null, ReactPropTypesSecret);
      }
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        warning$2(false, 'Failed form propType: %s%s', error.message, getStack());
      }
    }
  };
}

var ReactControlledValuePropTypes_1 = ReactControlledValuePropTypes;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule omittedCloseTags
 */

// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.

var omittedCloseTags = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

var omittedCloseTags_1 = omittedCloseTags;

// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.

var voidElementTags = objectAssign$1({
  menuitem: true
}, omittedCloseTags_1);

var voidElementTags_1 = voidElementTags;

{
  var warning$3 = require$$0;
}

var HTML = '__html';

function getDeclarationErrorAddendum(getCurrentOwnerName) {
  {
    var ownerName = getCurrentOwnerName();
    if (ownerName) {
      // TODO: also report the stack.
      return '\n\nThis DOM node was rendered by `' + ownerName + '`.';
    }
  }
  return '';
}

function assertValidProps(tag, props, getCurrentOwnerName) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags_1[tag]) {
    !(props.children == null && props.dangerouslySetInnerHTML == null) ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', tag, getDeclarationErrorAddendum(getCurrentOwnerName)) : void 0;
  }
  if (props.dangerouslySetInnerHTML != null) {
    !(props.children == null) ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : void 0;
    !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : void 0;
  }
  {
    warning$3(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
  }
  !(props.style == null || typeof props.style === 'object') ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum(getCurrentOwnerName)) : void 0;
}

var assertValidProps_1 = assertValidProps;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule CSSProperty
 */

/**
 * CSS properties which accept numbers but are not in units of "px".
 */

var isUnitlessNumber$1 = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */
function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}

/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */
var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber$1).forEach(function (prop) {
  prefixes.forEach(function (prefix) {
    isUnitlessNumber$1[prefixKey(prefix, prop)] = isUnitlessNumber$1[prop];
  });
});

/**
 * Most style properties can be unset by doing .style[prop] = '' but IE8
 * doesn't like doing that with shorthand properties so for the properties that
 * IE8 breaks on, which are listed here, we instead unset each of the
 * individual properties. See http://bugs.jquery.com/ticket/12385.
 * The 4-value 'clock' properties like margin, padding, border-width seem to
 * behave without any problems. Curiously, list-style works too without any
 * special prodding.
 */
var shorthandPropertyExpansions = {
  background: {
    backgroundAttachment: true,
    backgroundColor: true,
    backgroundImage: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundRepeat: true
  },
  backgroundPosition: {
    backgroundPositionX: true,
    backgroundPositionY: true
  },
  border: {
    borderWidth: true,
    borderStyle: true,
    borderColor: true
  },
  borderBottom: {
    borderBottomWidth: true,
    borderBottomStyle: true,
    borderBottomColor: true
  },
  borderLeft: {
    borderLeftWidth: true,
    borderLeftStyle: true,
    borderLeftColor: true
  },
  borderRight: {
    borderRightWidth: true,
    borderRightStyle: true,
    borderRightColor: true
  },
  borderTop: {
    borderTopWidth: true,
    borderTopStyle: true,
    borderTopColor: true
  },
  font: {
    fontStyle: true,
    fontVariant: true,
    fontWeight: true,
    fontSize: true,
    lineHeight: true,
    fontFamily: true
  },
  outline: {
    outlineWidth: true,
    outlineStyle: true,
    outlineColor: true
  }
};

var CSSProperty = {
  isUnitlessNumber: isUnitlessNumber$1,
  shorthandPropertyExpansions: shorthandPropertyExpansions
};

var CSSProperty_1 = CSSProperty;

var isUnitlessNumber = CSSProperty_1.isUnitlessNumber;

/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */
function dangerousStyleValue(name, value, isCustomProperty) {
  // Note that we've removed escapeTextForBrowser() calls here since the
  // whole string will be escaped when the attribute is injected into
  // the markup. If you provide unsafe user data here they can inject
  // arbitrary CSS which may be problematic (I couldn't repro this):
  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
  // This is not an XSS hole but instead a potential CSS injection issue
  // which has lead to a greater discussion about how we're going to
  // trust URLs moving forward. See #2115901

  var isEmpty = value == null || typeof value === 'boolean' || value === '';
  if (isEmpty) {
    return '';
  }

  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return ('' + value).trim();
}

var dangerousStyleValue_1 = dangerousStyleValue;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule isCustomComponent
 * 
 */

function isCustomComponent(tagName, props) {
  if (tagName.indexOf('-') === -1) {
    return typeof props.is === 'string';
  }
  switch (tagName) {
    // These are reserved SVG and MathML elements.
    // We don't mind this whitelist too much because we expect it to never grow.
    // The alternative is to track the namespace in a few places which is convoluted.
    // https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
    case 'annotation-xml':
    case 'color-profile':
    case 'font-face':
    case 'font-face-src':
    case 'font-face-uri':
    case 'font-face-format':
    case 'font-face-name':
    case 'missing-glyph':
      return false;
    default:
      return true;
  }
}

var isCustomComponent_1 = isCustomComponent;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$2(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$2;

var ReactInternals = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ReactGlobalSharedState = {
  ReactCurrentOwner: ReactInternals.ReactCurrentOwner
};

{
  objectAssign$1(ReactGlobalSharedState, {
    ReactComponentTreeHook: ReactInternals.ReactComponentTreeHook,
    ReactDebugCurrentFrame: ReactInternals.ReactDebugCurrentFrame
  });
}

var ReactGlobalSharedState_1 = ReactGlobalSharedState;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactTypeOfWork
 * 
 */

var ReactTypeOfWork = {
  IndeterminateComponent: 0, // Before we know whether it is functional or class
  FunctionalComponent: 1,
  ClassComponent: 2,
  HostRoot: 3, // Root of a host tree. Could be nested inside another node.
  HostPortal: 4, // A subtree. Could be an entry point to a different renderer.
  HostComponent: 5,
  HostText: 6,
  CoroutineComponent: 7,
  CoroutineHandlerPhase: 8,
  YieldComponent: 9,
  Fragment: 10
};

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame$1 = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

var IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent;
var FunctionalComponent = ReactTypeOfWork.FunctionalComponent;
var ClassComponent = ReactTypeOfWork.ClassComponent;
var HostComponent = ReactTypeOfWork.HostComponent;




function describeFiber(fiber) {
  switch (fiber.tag) {
    case IndeterminateComponent:
    case FunctionalComponent:
    case ClassComponent:
    case HostComponent:
      var owner = fiber._debugOwner;
      var source = fiber._debugSource;
      var name = getComponentName_1(fiber);
      var ownerName = null;
      if (owner) {
        ownerName = getComponentName_1(owner);
      }
      return describeComponentFrame$1(name, source, ownerName);
    default:
      return '';
  }
}

// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber$1(workInProgress) {
  var info = '';
  var node = workInProgress;
  do {
    info += describeFiber(node);
    // Otherwise this return pointer might point to the wrong tree:
    node = node['return'];
  } while (node);
  return info;
}

var ReactFiberComponentTreeHook = {
  getStackAddendumByWorkInProgressFiber: getStackAddendumByWorkInProgressFiber$1
};

var ReactDebugCurrentFrame$1 = ReactGlobalSharedState_1.ReactDebugCurrentFrame;

{
  var getComponentName$3 = getComponentName_1;

  var _require2$1 = ReactFiberComponentTreeHook,
      getStackAddendumByWorkInProgressFiber = _require2$1.getStackAddendumByWorkInProgressFiber;
}

function getCurrentFiberOwnerName$1() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    if (fiber._debugOwner != null) {
      return getComponentName$3(fiber._debugOwner);
    }
  }
  return null;
}

function getCurrentFiberStackAddendum() {
  {
    var fiber = ReactDebugCurrentFiber.current;
    if (fiber === null) {
      return null;
    }
    // Safe because if current fiber exists, we are reconciling,
    // and it is guaranteed to be the work-in-progress version.
    return getStackAddendumByWorkInProgressFiber(fiber);
  }
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame$1.getCurrentStack = null;
  ReactDebugCurrentFiber.current = null;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber, phase) {
  ReactDebugCurrentFrame$1.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber.current = fiber;
  ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
  current: null,
  phase: null,
  resetCurrentFiber: resetCurrentFiber,
  setCurrentFiber: setCurrentFiber,
  getCurrentFiberOwnerName: getCurrentFiberOwnerName$1,
  getCurrentFiberStackAddendum: getCurrentFiberStackAddendum
};

var ReactDebugCurrentFiber_1 = ReactDebugCurrentFiber;

var warnValidStyle$1 = emptyFunction;

{
  var camelizeStyleName$1 = camelizeStyleName;
  var getComponentName$1 = getComponentName_1;
  var warning$4 = require$$0;

  var _require = ReactDebugCurrentFiber_1,
      getCurrentFiberOwnerName = _require.getCurrentFiberOwnerName;

  // 'msTransform' is correct, but the other prefixes should be capitalized


  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

  // style values shouldn't contain a semicolon
  var badStyleValueWithSemicolonPattern = /;\s*$/;

  var warnedStyleNames = {};
  var warnedStyleValues = {};
  var warnedForNaNValue = false;
  var warnedForInfinityValue = false;

  var warnHyphenatedStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning$4(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName$1(name), checkRenderMessage(owner));
  };

  var warnBadVendoredStyleName = function (name, owner) {
    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
      return;
    }

    warnedStyleNames[name] = true;
    warning$4(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner));
  };

  var warnStyleValueWithSemicolon = function (name, value, owner) {
    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
      return;
    }

    warnedStyleValues[value] = true;
    warning$4(false, "Style property values shouldn't contain a semicolon.%s " + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, ''));
  };

  var warnStyleValueIsNaN = function (name, value, owner) {
    if (warnedForNaNValue) {
      return;
    }

    warnedForNaNValue = true;
    warning$4(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner));
  };

  var warnStyleValueIsInfinity = function (name, value, owner) {
    if (warnedForInfinityValue) {
      return;
    }

    warnedForInfinityValue = true;
    warning$4(false, '`Infinity` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner));
  };

  var checkRenderMessage = function (owner) {
    var ownerName;
    if (owner != null) {
      // Stack passes the owner manually all the way to CSSPropertyOperations.
      ownerName = getComponentName$1(owner);
    } else {
      // Fiber doesn't pass it but uses ReactDebugCurrentFiber to track it.
      // It is only enabled in development and tracks host components too.
      ownerName = getCurrentFiberOwnerName();
      // TODO: also report the stack.
    }
    if (ownerName) {
      return '\n\nCheck the render method of `' + ownerName + '`.';
    }
    return '';
  };

  warnValidStyle$1 = function (name, value, component) {
    var owner;
    if (component) {
      // TODO: this only works with Stack. Seems like we need to add unit tests?
      owner = component._currentElement._owner;
    }
    if (name.indexOf('-') > -1) {
      warnHyphenatedStyleName(name, owner);
    } else if (badVendoredStyleNamePattern.test(name)) {
      warnBadVendoredStyleName(name, owner);
    } else if (badStyleValueWithSemicolonPattern.test(value)) {
      warnStyleValueWithSemicolon(name, value, owner);
    }

    if (typeof value === 'number') {
      if (isNaN(value)) {
        warnStyleValueIsNaN(name, value, owner);
      } else if (!isFinite(value)) {
        warnStyleValueIsInfinity(name, value, owner);
      }
    }
  };
}

var warnValidStyle_1 = warnValidStyle$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule validAriaProperties
 */

var ariaProperties = {
  'aria-current': 0, // state
  'aria-details': 0,
  'aria-disabled': 0, // state
  'aria-hidden': 0, // state
  'aria-invalid': 0, // state
  'aria-keyshortcuts': 0,
  'aria-label': 0,
  'aria-roledescription': 0,
  // Widget Attributes
  'aria-autocomplete': 0,
  'aria-checked': 0,
  'aria-expanded': 0,
  'aria-haspopup': 0,
  'aria-level': 0,
  'aria-modal': 0,
  'aria-multiline': 0,
  'aria-multiselectable': 0,
  'aria-orientation': 0,
  'aria-placeholder': 0,
  'aria-pressed': 0,
  'aria-readonly': 0,
  'aria-required': 0,
  'aria-selected': 0,
  'aria-sort': 0,
  'aria-valuemax': 0,
  'aria-valuemin': 0,
  'aria-valuenow': 0,
  'aria-valuetext': 0,
  // Live Region Attributes
  'aria-atomic': 0,
  'aria-busy': 0,
  'aria-live': 0,
  'aria-relevant': 0,
  // Drag-and-Drop Attributes
  'aria-dropeffect': 0,
  'aria-grabbed': 0,
  // Relationship Attributes
  'aria-activedescendant': 0,
  'aria-colcount': 0,
  'aria-colindex': 0,
  'aria-colspan': 0,
  'aria-controls': 0,
  'aria-describedby': 0,
  'aria-errormessage': 0,
  'aria-flowto': 0,
  'aria-labelledby': 0,
  'aria-owns': 0,
  'aria-posinset': 0,
  'aria-rowcount': 0,
  'aria-rowindex': 0,
  'aria-rowspan': 0,
  'aria-setsize': 0
};

var validAriaProperties$1 = ariaProperties;

var warnedProperties = {};
var rARIA = new RegExp('^(aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
var rARIACamel = new RegExp('^(aria)[A-Z][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');

var hasOwnProperty = Object.prototype.hasOwnProperty;

{
  var warning$5 = require$$0;

  var _require$1 = ReactGlobalSharedState_1,
      ReactComponentTreeHook = _require$1.ReactComponentTreeHook,
      ReactDebugCurrentFrame$2 = _require$1.ReactDebugCurrentFrame;

  var getStackAddendumByID = ReactComponentTreeHook.getStackAddendumByID;


  var validAriaProperties = validAriaProperties$1;
}

function getStackAddendum$1(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return getStackAddendumByID(debugID);
  } else {
    // This can only happen on Fiber / Server
    var stack = ReactDebugCurrentFrame$2.getStackAddendum();
    return stack != null ? stack : '';
  }
}

function validateProperty(tagName, name, debugID) {
  if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name]) {
    return true;
  }

  if (rARIACamel.test(name)) {
    var ariaName = 'aria-' + name.slice(4).toLowerCase();
    var correctName = validAriaProperties.hasOwnProperty(ariaName) ? ariaName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (correctName == null) {
      warning$5(false, 'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s', name, getStackAddendum$1(debugID));
      warnedProperties[name] = true;
      return true;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== correctName) {
      warning$5(false, 'Invalid ARIA attribute `%s`. Did you mean `%s`?%s', name, correctName, getStackAddendum$1(debugID));
      warnedProperties[name] = true;
      return true;
    }
  }

  if (rARIA.test(name)) {
    var lowerCasedName = name.toLowerCase();
    var standardName = validAriaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;

    // If this is an aria-* attribute, but is not listed in the known DOM
    // DOM properties, then it is an invalid aria-* attribute.
    if (standardName == null) {
      warnedProperties[name] = true;
      return false;
    }
    // aria-* attributes should be lowercase; suggest the lowercase version.
    if (name !== standardName) {
      warning$5(false, 'Unknown ARIA attribute `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$1(debugID));
      warnedProperties[name] = true;
      return true;
    }
  }

  return true;
}

function warnInvalidARIAProps(type, props, debugID) {
  var invalidProps = [];

  for (var key in props) {
    var isValid = validateProperty(type, key, debugID);
    if (!isValid) {
      invalidProps.push(key);
    }
  }

  var unknownPropString = invalidProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');

  if (invalidProps.length === 1) {
    warning$5(false, 'Invalid aria prop %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1(debugID));
  } else if (invalidProps.length > 1) {
    warning$5(false, 'Invalid aria props %s on <%s> tag. ' + 'For details, see https://fb.me/invalid-aria-prop%s', unknownPropString, type, getStackAddendum$1(debugID));
  }
}

function validateProperties(type, props, debugID /* Stack only */) {
  if (isCustomComponent_1(type, props)) {
    return;
  }
  warnInvalidARIAProps(type, props, debugID);
}

var ReactDOMInvalidARIAHook = {
  // Fiber
  validateProperties: validateProperties,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties(element.type, element.props, debugID);
    }
  }
};

var ReactDOMInvalidARIAHook_1 = ReactDOMInvalidARIAHook;

{
  var warning$6 = require$$0;

  var _require$2 = ReactGlobalSharedState_1,
      ReactComponentTreeHook$1 = _require$2.ReactComponentTreeHook,
      ReactDebugCurrentFrame$3 = _require$2.ReactDebugCurrentFrame;

  var getStackAddendumByID$1 = ReactComponentTreeHook$1.getStackAddendumByID;
}

var didWarnValueNull = false;

function getStackAddendum$2(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return getStackAddendumByID$1(debugID);
  } else {
    // This can only happen on Fiber / Server
    var stack = ReactDebugCurrentFrame$3.getStackAddendum();
    return stack != null ? stack : '';
  }
}

function validateProperties$1(type, props, debugID /* Stack only */) {
  if (type !== 'input' && type !== 'textarea' && type !== 'select') {
    return;
  }
  if (props != null && props.value === null && !didWarnValueNull) {
    warning$6(false, '`value` prop on `%s` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', type, getStackAddendum$2(debugID));

    didWarnValueNull = true;
  }
}

var ReactDOMNullInputValuePropHook = {
  // Fiber
  validateProperties: validateProperties$1,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties$1(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties$1(element.type, element.props, debugID);
    }
  }
};

var ReactDOMNullInputValuePropHook_1 = ReactDOMNullInputValuePropHook;

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : void 0;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : void 0;
    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : void 0;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : void 0;
  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  {
    var lowerCasedName = registrationName.toLowerCase();
    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {
  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in true.
   * @type {Object}
   */
  possibleRegistrationNames: {},
  // Trust the developer to only use possibleRegistrationNames in true

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (injectedEventPluginOrder) {
    !!eventPluginOrder ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
        !!namesToPlugins[pluginName] ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : void 0;
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  }
};

var EventPluginRegistry_1 = EventPluginRegistry;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule possibleStandardNames
 */

// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames$1 = {
  // HTML
  accept: 'accept',
  acceptcharset: 'acceptCharset',
  'accept-charset': 'acceptCharset',
  accesskey: 'accessKey',
  action: 'action',
  allowfullscreen: 'allowFullScreen',
  allowtransparency: 'allowTransparency',
  alt: 'alt',
  as: 'as',
  async: 'async',
  autocapitalize: 'autoCapitalize',
  autocomplete: 'autoComplete',
  autocorrect: 'autoCorrect',
  autofocus: 'autoFocus',
  autoplay: 'autoPlay',
  autosave: 'autoSave',
  capture: 'capture',
  cellpadding: 'cellPadding',
  cellspacing: 'cellSpacing',
  challenge: 'challenge',
  charset: 'charSet',
  checked: 'checked',
  children: 'children',
  cite: 'cite',
  'class': 'className',
  classid: 'classID',
  classname: 'className',
  cols: 'cols',
  colspan: 'colSpan',
  content: 'content',
  contenteditable: 'contentEditable',
  contextmenu: 'contextMenu',
  controls: 'controls',
  controlslist: 'controlsList',
  coords: 'coords',
  crossorigin: 'crossOrigin',
  dangerouslysetinnerhtml: 'dangerouslySetInnerHTML',
  data: 'data',
  datetime: 'dateTime',
  'default': 'default',
  defaultchecked: 'defaultChecked',
  defaultvalue: 'defaultValue',
  defer: 'defer',
  dir: 'dir',
  disabled: 'disabled',
  download: 'download',
  draggable: 'draggable',
  enctype: 'encType',
  'for': 'htmlFor',
  form: 'form',
  formmethod: 'formMethod',
  formaction: 'formAction',
  formenctype: 'formEncType',
  formnovalidate: 'formNoValidate',
  formtarget: 'formTarget',
  frameborder: 'frameBorder',
  headers: 'headers',
  height: 'height',
  hidden: 'hidden',
  high: 'high',
  href: 'href',
  hreflang: 'hrefLang',
  htmlfor: 'htmlFor',
  httpequiv: 'httpEquiv',
  'http-equiv': 'httpEquiv',
  icon: 'icon',
  id: 'id',
  innerhtml: 'innerHTML',
  inputmode: 'inputMode',
  integrity: 'integrity',
  is: 'is',
  itemid: 'itemID',
  itemprop: 'itemProp',
  itemref: 'itemRef',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  keyparams: 'keyParams',
  keytype: 'keyType',
  kind: 'kind',
  label: 'label',
  lang: 'lang',
  list: 'list',
  loop: 'loop',
  low: 'low',
  manifest: 'manifest',
  marginwidth: 'marginWidth',
  marginheight: 'marginHeight',
  max: 'max',
  maxlength: 'maxLength',
  media: 'media',
  mediagroup: 'mediaGroup',
  method: 'method',
  min: 'min',
  minlength: 'minLength',
  multiple: 'multiple',
  muted: 'muted',
  name: 'name',
  nonce: 'nonce',
  novalidate: 'noValidate',
  open: 'open',
  optimum: 'optimum',
  pattern: 'pattern',
  placeholder: 'placeholder',
  playsinline: 'playsInline',
  poster: 'poster',
  preload: 'preload',
  profile: 'profile',
  radiogroup: 'radioGroup',
  readonly: 'readOnly',
  referrerpolicy: 'referrerPolicy',
  rel: 'rel',
  required: 'required',
  reversed: 'reversed',
  role: 'role',
  rows: 'rows',
  rowspan: 'rowSpan',
  sandbox: 'sandbox',
  scope: 'scope',
  scoped: 'scoped',
  scrolling: 'scrolling',
  seamless: 'seamless',
  selected: 'selected',
  shape: 'shape',
  size: 'size',
  sizes: 'sizes',
  span: 'span',
  spellcheck: 'spellCheck',
  src: 'src',
  srcdoc: 'srcDoc',
  srclang: 'srcLang',
  srcset: 'srcSet',
  start: 'start',
  step: 'step',
  style: 'style',
  summary: 'summary',
  tabindex: 'tabIndex',
  target: 'target',
  title: 'title',
  type: 'type',
  usemap: 'useMap',
  value: 'value',
  width: 'width',
  wmode: 'wmode',
  wrap: 'wrap',

  // SVG
  about: 'about',
  accentheight: 'accentHeight',
  'accent-height': 'accentHeight',
  accumulate: 'accumulate',
  additive: 'additive',
  alignmentbaseline: 'alignmentBaseline',
  'alignment-baseline': 'alignmentBaseline',
  allowreorder: 'allowReorder',
  alphabetic: 'alphabetic',
  amplitude: 'amplitude',
  arabicform: 'arabicForm',
  'arabic-form': 'arabicForm',
  ascent: 'ascent',
  attributename: 'attributeName',
  attributetype: 'attributeType',
  autoreverse: 'autoReverse',
  azimuth: 'azimuth',
  basefrequency: 'baseFrequency',
  baselineshift: 'baselineShift',
  'baseline-shift': 'baselineShift',
  baseprofile: 'baseProfile',
  bbox: 'bbox',
  begin: 'begin',
  bias: 'bias',
  by: 'by',
  calcmode: 'calcMode',
  capheight: 'capHeight',
  'cap-height': 'capHeight',
  clip: 'clip',
  clippath: 'clipPath',
  'clip-path': 'clipPath',
  clippathunits: 'clipPathUnits',
  cliprule: 'clipRule',
  'clip-rule': 'clipRule',
  color: 'color',
  colorinterpolation: 'colorInterpolation',
  'color-interpolation': 'colorInterpolation',
  colorinterpolationfilters: 'colorInterpolationFilters',
  'color-interpolation-filters': 'colorInterpolationFilters',
  colorprofile: 'colorProfile',
  'color-profile': 'colorProfile',
  colorrendering: 'colorRendering',
  'color-rendering': 'colorRendering',
  contentscripttype: 'contentScriptType',
  contentstyletype: 'contentStyleType',
  cursor: 'cursor',
  cx: 'cx',
  cy: 'cy',
  d: 'd',
  datatype: 'datatype',
  decelerate: 'decelerate',
  descent: 'descent',
  diffuseconstant: 'diffuseConstant',
  direction: 'direction',
  display: 'display',
  divisor: 'divisor',
  dominantbaseline: 'dominantBaseline',
  'dominant-baseline': 'dominantBaseline',
  dur: 'dur',
  dx: 'dx',
  dy: 'dy',
  edgemode: 'edgeMode',
  elevation: 'elevation',
  enablebackground: 'enableBackground',
  'enable-background': 'enableBackground',
  end: 'end',
  exponent: 'exponent',
  externalresourcesrequired: 'externalResourcesRequired',
  fill: 'fill',
  fillopacity: 'fillOpacity',
  'fill-opacity': 'fillOpacity',
  fillrule: 'fillRule',
  'fill-rule': 'fillRule',
  filter: 'filter',
  filterres: 'filterRes',
  filterunits: 'filterUnits',
  floodopacity: 'floodOpacity',
  'flood-opacity': 'floodOpacity',
  floodcolor: 'floodColor',
  'flood-color': 'floodColor',
  focusable: 'focusable',
  fontfamily: 'fontFamily',
  'font-family': 'fontFamily',
  fontsize: 'fontSize',
  'font-size': 'fontSize',
  fontsizeadjust: 'fontSizeAdjust',
  'font-size-adjust': 'fontSizeAdjust',
  fontstretch: 'fontStretch',
  'font-stretch': 'fontStretch',
  fontstyle: 'fontStyle',
  'font-style': 'fontStyle',
  fontvariant: 'fontVariant',
  'font-variant': 'fontVariant',
  fontweight: 'fontWeight',
  'font-weight': 'fontWeight',
  format: 'format',
  from: 'from',
  fx: 'fx',
  fy: 'fy',
  g1: 'g1',
  g2: 'g2',
  glyphname: 'glyphName',
  'glyph-name': 'glyphName',
  glyphorientationhorizontal: 'glyphOrientationHorizontal',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  glyphorientationvertical: 'glyphOrientationVertical',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  glyphref: 'glyphRef',
  gradienttransform: 'gradientTransform',
  gradientunits: 'gradientUnits',
  hanging: 'hanging',
  horizadvx: 'horizAdvX',
  'horiz-adv-x': 'horizAdvX',
  horizoriginx: 'horizOriginX',
  'horiz-origin-x': 'horizOriginX',
  ideographic: 'ideographic',
  imagerendering: 'imageRendering',
  'image-rendering': 'imageRendering',
  in2: 'in2',
  'in': 'in',
  inlist: 'inlist',
  intercept: 'intercept',
  k1: 'k1',
  k2: 'k2',
  k3: 'k3',
  k4: 'k4',
  k: 'k',
  kernelmatrix: 'kernelMatrix',
  kernelunitlength: 'kernelUnitLength',
  kerning: 'kerning',
  keypoints: 'keyPoints',
  keysplines: 'keySplines',
  keytimes: 'keyTimes',
  lengthadjust: 'lengthAdjust',
  letterspacing: 'letterSpacing',
  'letter-spacing': 'letterSpacing',
  lightingcolor: 'lightingColor',
  'lighting-color': 'lightingColor',
  limitingconeangle: 'limitingConeAngle',
  local: 'local',
  markerend: 'markerEnd',
  'marker-end': 'markerEnd',
  markerheight: 'markerHeight',
  markermid: 'markerMid',
  'marker-mid': 'markerMid',
  markerstart: 'markerStart',
  'marker-start': 'markerStart',
  markerunits: 'markerUnits',
  markerwidth: 'markerWidth',
  mask: 'mask',
  maskcontentunits: 'maskContentUnits',
  maskunits: 'maskUnits',
  mathematical: 'mathematical',
  mode: 'mode',
  numoctaves: 'numOctaves',
  offset: 'offset',
  opacity: 'opacity',
  operator: 'operator',
  order: 'order',
  orient: 'orient',
  orientation: 'orientation',
  origin: 'origin',
  overflow: 'overflow',
  overlineposition: 'overlinePosition',
  'overline-position': 'overlinePosition',
  overlinethickness: 'overlineThickness',
  'overline-thickness': 'overlineThickness',
  paintorder: 'paintOrder',
  'paint-order': 'paintOrder',
  panose1: 'panose1',
  'panose-1': 'panose1',
  pathlength: 'pathLength',
  patterncontentunits: 'patternContentUnits',
  patterntransform: 'patternTransform',
  patternunits: 'patternUnits',
  pointerevents: 'pointerEvents',
  'pointer-events': 'pointerEvents',
  points: 'points',
  pointsatx: 'pointsAtX',
  pointsaty: 'pointsAtY',
  pointsatz: 'pointsAtZ',
  prefix: 'prefix',
  preservealpha: 'preserveAlpha',
  preserveaspectratio: 'preserveAspectRatio',
  primitiveunits: 'primitiveUnits',
  property: 'property',
  r: 'r',
  radius: 'radius',
  refx: 'refX',
  refy: 'refY',
  renderingintent: 'renderingIntent',
  'rendering-intent': 'renderingIntent',
  repeatcount: 'repeatCount',
  repeatdur: 'repeatDur',
  requiredextensions: 'requiredExtensions',
  requiredfeatures: 'requiredFeatures',
  resource: 'resource',
  restart: 'restart',
  result: 'result',
  results: 'results',
  rotate: 'rotate',
  rx: 'rx',
  ry: 'ry',
  scale: 'scale',
  security: 'security',
  seed: 'seed',
  shaperendering: 'shapeRendering',
  'shape-rendering': 'shapeRendering',
  slope: 'slope',
  spacing: 'spacing',
  specularconstant: 'specularConstant',
  specularexponent: 'specularExponent',
  speed: 'speed',
  spreadmethod: 'spreadMethod',
  startoffset: 'startOffset',
  stddeviation: 'stdDeviation',
  stemh: 'stemh',
  stemv: 'stemv',
  stitchtiles: 'stitchTiles',
  stopcolor: 'stopColor',
  'stop-color': 'stopColor',
  stopopacity: 'stopOpacity',
  'stop-opacity': 'stopOpacity',
  strikethroughposition: 'strikethroughPosition',
  'strikethrough-position': 'strikethroughPosition',
  strikethroughthickness: 'strikethroughThickness',
  'strikethrough-thickness': 'strikethroughThickness',
  string: 'string',
  stroke: 'stroke',
  strokedasharray: 'strokeDasharray',
  'stroke-dasharray': 'strokeDasharray',
  strokedashoffset: 'strokeDashoffset',
  'stroke-dashoffset': 'strokeDashoffset',
  strokelinecap: 'strokeLinecap',
  'stroke-linecap': 'strokeLinecap',
  strokelinejoin: 'strokeLinejoin',
  'stroke-linejoin': 'strokeLinejoin',
  strokemiterlimit: 'strokeMiterlimit',
  'stroke-miterlimit': 'strokeMiterlimit',
  strokewidth: 'strokeWidth',
  'stroke-width': 'strokeWidth',
  strokeopacity: 'strokeOpacity',
  'stroke-opacity': 'strokeOpacity',
  suppresscontenteditablewarning: 'suppressContentEditableWarning',
  surfacescale: 'surfaceScale',
  systemlanguage: 'systemLanguage',
  tablevalues: 'tableValues',
  targetx: 'targetX',
  targety: 'targetY',
  textanchor: 'textAnchor',
  'text-anchor': 'textAnchor',
  textdecoration: 'textDecoration',
  'text-decoration': 'textDecoration',
  textlength: 'textLength',
  textrendering: 'textRendering',
  'text-rendering': 'textRendering',
  to: 'to',
  transform: 'transform',
  'typeof': 'typeof',
  u1: 'u1',
  u2: 'u2',
  underlineposition: 'underlinePosition',
  'underline-position': 'underlinePosition',
  underlinethickness: 'underlineThickness',
  'underline-thickness': 'underlineThickness',
  unicode: 'unicode',
  unicodebidi: 'unicodeBidi',
  'unicode-bidi': 'unicodeBidi',
  unicoderange: 'unicodeRange',
  'unicode-range': 'unicodeRange',
  unitsperem: 'unitsPerEm',
  'units-per-em': 'unitsPerEm',
  unselectable: 'unselectable',
  valphabetic: 'vAlphabetic',
  'v-alphabetic': 'vAlphabetic',
  values: 'values',
  vectoreffect: 'vectorEffect',
  'vector-effect': 'vectorEffect',
  version: 'version',
  vertadvy: 'vertAdvY',
  'vert-adv-y': 'vertAdvY',
  vertoriginx: 'vertOriginX',
  'vert-origin-x': 'vertOriginX',
  vertoriginy: 'vertOriginY',
  'vert-origin-y': 'vertOriginY',
  vhanging: 'vHanging',
  'v-hanging': 'vHanging',
  videographic: 'vIdeographic',
  'v-ideographic': 'vIdeographic',
  viewbox: 'viewBox',
  viewtarget: 'viewTarget',
  visibility: 'visibility',
  vmathematical: 'vMathematical',
  'v-mathematical': 'vMathematical',
  vocab: 'vocab',
  widths: 'widths',
  wordspacing: 'wordSpacing',
  'word-spacing': 'wordSpacing',
  writingmode: 'writingMode',
  'writing-mode': 'writingMode',
  x1: 'x1',
  x2: 'x2',
  x: 'x',
  xchannelselector: 'xChannelSelector',
  xheight: 'xHeight',
  'x-height': 'xHeight',
  xlinkactuate: 'xlinkActuate',
  'xlink:actuate': 'xlinkActuate',
  xlinkarcrole: 'xlinkArcrole',
  'xlink:arcrole': 'xlinkArcrole',
  xlinkhref: 'xlinkHref',
  'xlink:href': 'xlinkHref',
  xlinkrole: 'xlinkRole',
  'xlink:role': 'xlinkRole',
  xlinkshow: 'xlinkShow',
  'xlink:show': 'xlinkShow',
  xlinktitle: 'xlinkTitle',
  'xlink:title': 'xlinkTitle',
  xlinktype: 'xlinkType',
  'xlink:type': 'xlinkType',
  xmlbase: 'xmlBase',
  'xml:base': 'xmlBase',
  xmllang: 'xmlLang',
  'xml:lang': 'xmlLang',
  xmlns: 'xmlns',
  'xml:space': 'xmlSpace',
  xmlnsxlink: 'xmlnsXlink',
  'xmlns:xlink': 'xmlnsXlink',
  xmlspace: 'xmlSpace',
  y1: 'y1',
  y2: 'y2',
  y: 'y',
  ychannelselector: 'yChannelSelector',
  z: 'z',
  zoomandpan: 'zoomAndPan'
};

var possibleStandardNames_1 = possibleStandardNames$1;

{
  var warning$7 = require$$0;

  var _require$3 = ReactGlobalSharedState_1,
      ReactComponentTreeHook$2 = _require$3.ReactComponentTreeHook,
      ReactDebugCurrentFrame$4 = _require$3.ReactDebugCurrentFrame;

  var getStackAddendumByID$2 = ReactComponentTreeHook$2.getStackAddendumByID;
}

function getStackAddendum$3(debugID) {
  if (debugID != null) {
    // This can only happen on Stack
    return getStackAddendumByID$2(debugID);
  } else {
    // This can only happen on Fiber / Server
    var stack = ReactDebugCurrentFrame$4.getStackAddendum();
    return stack != null ? stack : '';
  }
}

{
  var warnedProperties$1 = {};
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var EVENT_NAME_REGEX = /^on[A-Z]/;
  var rARIA$1 = new RegExp('^(aria)-[' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
  var rARIACamel$1 = new RegExp('^(aria)[A-Z][' + DOMProperty_1.ATTRIBUTE_NAME_CHAR + ']*$');
  var possibleStandardNames = possibleStandardNames_1;

  var validateProperty$1 = function (tagName, name, value, debugID) {
    if (hasOwnProperty$1.call(warnedProperties$1, name) && warnedProperties$1[name]) {
      return true;
    }

    if (EventPluginRegistry_1.registrationNameModules.hasOwnProperty(name)) {
      return true;
    }

    if (EventPluginRegistry_1.plugins.length === 0 && EVENT_NAME_REGEX.test(name)) {
      // If no event plugins have been injected, we might be in a server environment.
      // Don't check events in this case.
      return true;
    }

    var lowerCasedName = name.toLowerCase();
    var registrationName = EventPluginRegistry_1.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry_1.possibleRegistrationNames[lowerCasedName] : null;

    if (registrationName != null) {
      warning$7(false, 'Invalid event handler property `%s`. Did you mean `%s`?%s', name, registrationName, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName.indexOf('on') === 0) {
      warning$7(false, 'Unknown event handler property `%s`. It will be ignored.%s', name, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    // Let the ARIA attribute hook validate ARIA attributes
    if (rARIA$1.test(name) || rARIACamel$1.test(name)) {
      return true;
    }

    if (lowerCasedName === 'onfocusin' || lowerCasedName === 'onfocusout') {
      warning$7(false, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'innerhtml') {
      warning$7(false, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'aria') {
      warning$7(false, 'The `aria` attribute is reserved for future use in React. ' + 'Pass individual `aria-` attributes instead.');
      warnedProperties$1[name] = true;
      return true;
    }

    if (lowerCasedName === 'is' && value !== null && value !== undefined && typeof value !== 'string') {
      warning$7(false, 'Received a `%s` for string attribute `is`. If this is expected, cast ' + 'the value to a string.%s', typeof value, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'number' && isNaN(value)) {
      warning$7(false, 'Received NaN for numeric attribute `%s`. If this is expected, cast ' + 'the value to a string.%s', name, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    var isReserved = DOMProperty_1.isReservedProp(name);

    // Known attributes should match the casing specified in the property config.
    if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
      var standardName = possibleStandardNames[lowerCasedName];
      if (standardName !== name) {
        warning$7(false, 'Invalid DOM property `%s`. Did you mean `%s`?%s', name, standardName, getStackAddendum$3(debugID));
        warnedProperties$1[name] = true;
        return true;
      }
    } else if (!isReserved && name !== lowerCasedName) {
      // Unknown attributes should have lowercase casing since that's how they
      // will be cased anyway with server rendering.
      warning$7(false, 'React does not recognize the `%s` prop on a DOM element. If you ' + 'intentionally want it to appear in the DOM as a custom ' + 'attribute, spell it as lowercase `%s` instead. ' + 'If you accidentally passed it from a parent component, remove ' + 'it from the DOM element.%s', name, lowerCasedName, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    if (typeof value === 'boolean') {
      warning$7(DOMProperty_1.shouldAttributeAcceptBooleanValue(name), 'Received `%s` for non-boolean attribute `%s`. If this is expected, cast ' + 'the value to a string.%s', value, name, getStackAddendum$3(debugID));
      warnedProperties$1[name] = true;
      return true;
    }

    // Now that we've validated casing, do not validate
    // data types for reserved props
    if (isReserved) {
      return true;
    }

    // Warn when a known attribute is a bad type
    if (!DOMProperty_1.shouldSetAttribute(name, value)) {
      warnedProperties$1[name] = true;
      return false;
    }

    return true;
  };
}

var warnUnknownProperties = function (type, props, debugID) {
  var unknownProps = [];
  for (var key in props) {
    var isValid = validateProperty$1(type, key, props[key], debugID);
    if (!isValid) {
      unknownProps.push(key);
    }
  }

  var unknownPropString = unknownProps.map(function (prop) {
    return '`' + prop + '`';
  }).join(', ');
  if (unknownProps.length === 1) {
    warning$7(false, 'Invalid value for prop %s on <%s> tag. Either remove it from the element, ' + 'or pass a string or number value to keep it in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3(debugID));
  } else if (unknownProps.length > 1) {
    warning$7(false, 'Invalid values for props %s on <%s> tag. Either remove them from the element, ' + 'or pass a string or number value to keep them in the DOM. ' + 'For details, see https://fb.me/react-attribute-behavior%s', unknownPropString, type, getStackAddendum$3(debugID));
  }
};

function validateProperties$2(type, props, debugID /* Stack only */) {
  if (isCustomComponent_1(type, props)) {
    return;
  }
  warnUnknownProperties(type, props, debugID);
}

var ReactDOMUnknownPropertyHook = {
  // Fiber
  validateProperties: validateProperties$2,
  // Stack
  onBeforeMountComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties$2(element.type, element.props, debugID);
    }
  },
  onBeforeUpdateComponent: function (debugID, element) {
    if (true && element != null && typeof element.type === 'string') {
      validateProperties$2(element.type, element.props, debugID);
    }
  }
};

var ReactDOMUnknownPropertyHook_1 = ReactDOMUnknownPropertyHook;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Namespaces = DOMNamespaces.Namespaces;
var getIntrinsicNamespace = DOMNamespaces.getIntrinsicNamespace;
var getChildNamespace = DOMNamespaces.getChildNamespace;















var toArray = react.Children.toArray;

{
  var warning = require$$0;
  var checkPropTypes$1 = checkPropTypes;
  var warnValidStyle = warnValidStyle_1;

  var _require2 = ReactDOMInvalidARIAHook_1,
      validateARIAProperties = _require2.validateProperties;

  var _require3 = ReactDOMNullInputValuePropHook_1,
      validateInputProperties = _require3.validateProperties;

  var _require4 = ReactDOMUnknownPropertyHook_1,
      validateUnknownProperties = _require4.validateProperties;

  var validatePropertiesInDevelopment = function (type, props) {
    validateARIAProperties(type, props);
    validateInputProperties(type, props);
    validateUnknownProperties(type, props);
  };

  var describeComponentFrame = describeComponentFrame$1;
  var describeStackFrame = function (element) {
    var source = element._source;
    var type = element.type;
    var name = getComponentName(type);
    var ownerName = null;
    return describeComponentFrame(name, source, ownerName);
  };

  var _require5 = ReactGlobalSharedState_1,
      ReactDebugCurrentFrame = _require5.ReactDebugCurrentFrame;

  var currentDebugStack = null;
  var currentDebugElementStack = null;
  var setCurrentDebugStack = function (stack) {
    currentDebugElementStack = stack[stack.length - 1].debugElementStack;
    // We are about to enter a new composite stack, reset the array.
    currentDebugElementStack.length = 0;
    currentDebugStack = stack;
    ReactDebugCurrentFrame.getCurrentStack = getStackAddendum;
  };
  var pushElementToDebugStack = function (element) {
    if (currentDebugElementStack !== null) {
      currentDebugElementStack.push(element);
    }
  };
  var resetCurrentDebugStack = function () {
    currentDebugElementStack = null;
    currentDebugStack = null;
    ReactDebugCurrentFrame.getCurrentStack = null;
  };
  var getStackAddendum = function () {
    if (currentDebugStack === null) {
      return null;
    }
    var stack = '';
    var debugStack = currentDebugStack;
    for (var i = debugStack.length - 1; i >= 0; i--) {
      var debugElementStack = debugStack[i].debugElementStack;
      for (var ii = debugElementStack.length - 1; ii >= 0; ii--) {
        stack += describeStackFrame(debugElementStack[ii]);
      }
    }
    return stack;
  };
}

var didWarnDefaultInputValue = false;
var didWarnDefaultChecked = false;
var didWarnDefaultSelectValue = false;
var didWarnDefaultTextareaValue = false;
var didWarnInvalidOptionChildren = false;
var valuePropNames = ['value', 'defaultValue'];
var newlineEatingTags = {
  listing: true,
  pre: true,
  textarea: true
};

function getComponentName(type) {
  return typeof type === 'string' ? type : typeof type === 'function' ? type.displayName || type.name : null;
}

// We accept any tag to be rendered but since this gets injected into arbitrary
// HTML, we want to make sure that it's a safe tag.
// http://www.w3.org/TR/REC-xml/#NT-Name
var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
var validatedTagCache = {};
function validateDangerousTag(tag) {
  if (!validatedTagCache.hasOwnProperty(tag)) {
    !VALID_TAG_REGEX.test(tag) ? invariant(false, 'Invalid tag: %s', tag) : void 0;
    validatedTagCache[tag] = true;
  }
}

var processStyleName = memoizeStringOnly(function (styleName) {
  return hyphenateStyleName(styleName);
});

function createMarkupForStyles(styles, component) {
  var serialized = '';
  var delimiter = '';
  for (var styleName in styles) {
    if (!styles.hasOwnProperty(styleName)) {
      continue;
    }
    var isCustomProperty = styleName.indexOf('--') === 0;
    var styleValue = styles[styleName];
    {
      if (!isCustomProperty) {
        warnValidStyle(styleName, styleValue, component);
      }
    }
    if (styleValue != null) {
      serialized += delimiter + processStyleName(styleName) + ':';
      serialized += dangerousStyleValue_1(styleName, styleValue, isCustomProperty);

      delimiter = ';';
    }
  }
  return serialized || null;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && getComponentName(constructor) || 'ReactClass');
  }
}

function shouldConstruct(Component) {
  return Component.prototype && Component.prototype.isReactComponent;
}

function getNonChildrenInnerMarkup(props) {
  var innerHTML = props.dangerouslySetInnerHTML;
  if (innerHTML != null) {
    if (innerHTML.__html != null) {
      return innerHTML.__html;
    }
  } else {
    var content = props.children;
    if (typeof content === 'string' || typeof content === 'number') {
      return escapeTextContentForBrowser_1(content);
    }
  }
  return null;
}

function flattenOptionChildren(children) {
  var content = '';
  // Flatten children and warn if they aren't strings or numbers;
  // invalid types are ignored.
  react.Children.forEach(children, function (child) {
    if (child == null) {
      return;
    }
    if (typeof child === 'string' || typeof child === 'number') {
      content += child;
    } else {
      {
        if (!didWarnInvalidOptionChildren) {
          didWarnInvalidOptionChildren = true;
          warning(false, 'Only strings and numbers are supported as <option> children.');
        }
      }
    }
  });
  return content;
}

function maskContext(type, context) {
  var contextTypes = type.contextTypes;
  if (!contextTypes) {
    return emptyObject;
  }
  var maskedContext = {};
  for (var contextName in contextTypes) {
    maskedContext[contextName] = context[contextName];
  }
  return maskedContext;
}

function checkContextTypes(typeSpecs, values, location) {
  {
    checkPropTypes$1(typeSpecs, values, location, 'Component', getStackAddendum);
  }
}

function processContext(type, context) {
  var maskedContext = maskContext(type, context);
  {
    if (type.contextTypes) {
      checkContextTypes(type.contextTypes, maskedContext, 'context');
    }
  }
  return maskedContext;
}

var STYLE = 'style';
var RESERVED_PROPS = {
  children: null,
  dangerouslySetInnerHTML: null,
  suppressContentEditableWarning: null
};

function createOpenTagMarkup(tagVerbatim, tagLowercase, props, namespace, makeStaticMarkup, isRootElement, instForDebug) {
  var ret = '<' + tagVerbatim;

  for (var propKey in props) {
    if (!props.hasOwnProperty(propKey)) {
      continue;
    }
    var propValue = props[propKey];
    if (propValue == null) {
      continue;
    }
    if (propKey === STYLE) {
      propValue = createMarkupForStyles(propValue, instForDebug);
    }
    var markup = null;
    if (isCustomComponent_1(tagLowercase, props)) {
      if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
        markup = DOMMarkupOperations_1.createMarkupForCustomAttribute(propKey, propValue);
      }
    } else {
      markup = DOMMarkupOperations_1.createMarkupForProperty(propKey, propValue);
    }
    if (markup) {
      ret += ' ' + markup;
    }
  }

  // For static pages, no need to put React ID and checksum. Saves lots of
  // bytes.
  if (makeStaticMarkup) {
    return ret;
  }

  if (isRootElement) {
    ret += ' ' + DOMMarkupOperations_1.createMarkupForRoot();
  }
  return ret;
}

function validateRenderResult(child, type) {
  if (child === undefined) {
    invariant(false, '%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.', getComponentName(type) || 'Component');
  }
}

function resolve(child, context) {
  while (react.isValidElement(child)) {
    {
      pushElementToDebugStack(child);
    }
    var Component = child.type;
    if (typeof Component !== 'function') {
      break;
    }
    var publicContext = processContext(Component, context);
    var inst;
    var queue = [];
    var replace = false;
    var updater = {
      isMounted: function (publicInstance) {
        return false;
      },
      enqueueForceUpdate: function (publicInstance) {
        if (queue === null) {
          warnNoop(publicInstance, 'forceUpdate');
          return null;
        }
      },
      enqueueReplaceState: function (publicInstance, completeState) {
        replace = true;
        queue = [completeState];
      },
      enqueueSetState: function (publicInstance, partialState) {
        if (queue === null) {
          warnNoop(publicInstance, 'setState');
          return null;
        }
        queue.push(partialState);
      }
    };

    if (shouldConstruct(Component)) {
      inst = new Component(child.props, publicContext, updater);
    } else {
      inst = Component(child.props, publicContext, updater);
      if (inst == null || inst.render == null) {
        child = inst;
        validateRenderResult(child, Component);
        continue;
      }
    }

    inst.props = child.props;
    inst.context = publicContext;
    inst.updater = updater;

    var initialState = inst.state;
    if (initialState === undefined) {
      inst.state = initialState = null;
    }
    if (inst.componentWillMount) {
      inst.componentWillMount();
      if (queue.length) {
        var oldQueue = queue;
        var oldReplace = replace;
        queue = null;
        replace = false;

        if (oldReplace && oldQueue.length === 1) {
          inst.state = oldQueue[0];
        } else {
          var nextState = oldReplace ? oldQueue[0] : inst.state;
          var dontMutate = true;
          for (var i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
            var partial = oldQueue[i];
            var partialState = typeof partial === 'function' ? partial.call(inst, nextState, child.props, publicContext) : partial;
            if (partialState) {
              if (dontMutate) {
                dontMutate = false;
                nextState = objectAssign$1({}, nextState, partialState);
              } else {
                objectAssign$1(nextState, partialState);
              }
            }
          }
          inst.state = nextState;
        }
      } else {
        queue = null;
      }
    }
    child = inst.render();

    {
      if (child === undefined && inst.render._isMockFunction) {
        // This is probably bad practice. Consider warning here and
        // deprecating this convenience.
        child = null;
      }
    }
    validateRenderResult(child, Component);

    var childContext;
    if (typeof inst.getChildContext === 'function') {
      var childContextTypes = Component.childContextTypes;
      !(typeof childContextTypes === 'object') ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', getComponentName(Component) || 'Unknown') : void 0;
      childContext = inst.getChildContext();
      for (var contextKey in childContext) {
        !(contextKey in childContextTypes) ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(Component) || 'Unknown', contextKey) : void 0;
      }
    }
    if (childContext) {
      context = objectAssign$1({}, context, childContext);
    }
  }
  return { child: child, context: context };
}

var ReactDOMServerRenderer = function () {
  function ReactDOMServerRenderer(element, makeStaticMarkup) {
    _classCallCheck(this, ReactDOMServerRenderer);

    var children = react.isValidElement(element) ? [element] : toArray(element);
    var topFrame = {
      // Assume all trees start in the HTML namespace (not totally true, but
      // this is what we did historically)
      domNamespace: Namespaces.html,
      children: children,
      childIndex: 0,
      context: emptyObject,
      footer: ''
    };
    {
      topFrame.debugElementStack = [];
    }
    this.stack = [topFrame];
    this.exhausted = false;
    this.currentSelectValue = null;
    this.previousWasTextNode = false;
    this.makeStaticMarkup = makeStaticMarkup;
  }

  ReactDOMServerRenderer.prototype.read = function read(bytes) {
    if (this.exhausted) {
      return null;
    }

    var out = '';
    while (out.length < bytes) {
      if (this.stack.length === 0) {
        this.exhausted = true;
        break;
      }
      var frame = this.stack[this.stack.length - 1];
      if (frame.childIndex >= frame.children.length) {
        out += frame.footer;
        this.previousWasTextNode = false;
        this.stack.pop();
        if (frame.tag === 'select') {
          this.currentSelectValue = null;
        }
        continue;
      }
      var child = frame.children[frame.childIndex++];
      {
        setCurrentDebugStack(this.stack);
      }
      out += this.render(child, frame.context, frame.domNamespace);
      {
        // TODO: Handle reentrant server render calls. This doesn't.
        resetCurrentDebugStack();
      }
    }
    return out;
  };

  ReactDOMServerRenderer.prototype.render = function render(child, context, parentNamespace) {
    if (typeof child === 'string' || typeof child === 'number') {
      var text = '' + child;
      if (text === '') {
        return '';
      }
      if (this.makeStaticMarkup) {
        return escapeTextContentForBrowser_1(text);
      }
      if (this.previousWasTextNode) {
        return '<!-- -->' + escapeTextContentForBrowser_1(text);
      }
      this.previousWasTextNode = true;
      return escapeTextContentForBrowser_1(text);
    } else {
      var _resolve = resolve(child, context);

      child = _resolve.child;
      context = _resolve.context;

      if (child === null || child === false) {
        return '';
      } else {
        if (react.isValidElement(child)) {
          return this.renderDOM(child, context, parentNamespace);
        } else {
          var children = toArray(child);
          var frame = {
            domNamespace: parentNamespace,
            children: children,
            childIndex: 0,
            context: context,
            footer: ''
          };
          {
            frame.debugElementStack = [];
          }
          this.stack.push(frame);
          return '';
        }
      }
    }
  };

  ReactDOMServerRenderer.prototype.renderDOM = function renderDOM(element, context, parentNamespace) {
    var tag = element.type.toLowerCase();

    var namespace = parentNamespace;
    if (parentNamespace === Namespaces.html) {
      namespace = getIntrinsicNamespace(tag);
    }

    {
      if (namespace === Namespaces.html) {
        // Should this check be gated by parent namespace? Not sure we want to
        // allow <SVG> or <mATH>.
        warning(tag === element.type, '<%s /> is using uppercase HTML. Always use lowercase HTML tags ' + 'in React.', element.type);
      }
    }

    validateDangerousTag(tag);

    var props = element.props;
    if (tag === 'input') {
      {
        ReactControlledValuePropTypes_1.checkPropTypes('input', props, function () {
          return '';
        });

        if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnDefaultChecked) {
          warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
          didWarnDefaultChecked = true;
        }
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultInputValue) {
          warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', 'A component', props.type);
          didWarnDefaultInputValue = true;
        }
      }

      props = objectAssign$1({
        type: undefined
      }, props, {
        defaultChecked: undefined,
        defaultValue: undefined,
        value: props.value != null ? props.value : props.defaultValue,
        checked: props.checked != null ? props.checked : props.defaultChecked
      });
    } else if (tag === 'textarea') {
      {
        ReactControlledValuePropTypes_1.checkPropTypes('textarea', props, function () {
          return '';
        });
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultTextareaValue) {
          warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnDefaultTextareaValue = true;
        }
      }

      var initialValue = props.value;
      if (initialValue == null) {
        var defaultValue = props.defaultValue;
        // TODO (yungsters): Remove support for children content in <textarea>.
        var textareaChildren = props.children;
        if (textareaChildren != null) {
          {
            warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.');
          }
          !(defaultValue == null) ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : void 0;
          if (Array.isArray(textareaChildren)) {
            !(textareaChildren.length <= 1) ? invariant(false, '<textarea> can only have at most one child.') : void 0;
            textareaChildren = textareaChildren[0];
          }

          defaultValue = '' + textareaChildren;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        initialValue = defaultValue;
      }

      props = objectAssign$1({}, props, {
        value: undefined,
        children: '' + initialValue
      });
    } else if (tag === 'select') {
      {
        ReactControlledValuePropTypes_1.checkPropTypes('select', props, function () {
          return '';
        });

        for (var i = 0; i < valuePropNames.length; i++) {
          var propName = valuePropNames[i];
          if (props[propName] == null) {
            continue;
          }
          var isArray = Array.isArray(props[propName]);
          if (props.multiple && !isArray) {
            warning(false, 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, '');
          } else if (!props.multiple && isArray) {
            warning(false, 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, '');
          }
        }

        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnDefaultSelectValue) {
          warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components');
          didWarnDefaultSelectValue = true;
        }
      }
      this.currentSelectValue = props.value != null ? props.value : props.defaultValue;
      props = objectAssign$1({}, props, {
        value: undefined
      });
    } else if (tag === 'option') {
      var selected = null;
      var selectValue = this.currentSelectValue;
      var optionChildren = flattenOptionChildren(props.children);
      if (selectValue != null) {
        var value;
        if (props.value != null) {
          value = props.value + '';
        } else {
          value = optionChildren;
        }
        selected = false;
        if (Array.isArray(selectValue)) {
          // multiple
          for (var j = 0; j < selectValue.length; j++) {
            if ('' + selectValue[j] === value) {
              selected = true;
              break;
            }
          }
        } else {
          selected = '' + selectValue === value;
        }

        props = objectAssign$1({
          selected: undefined,
          children: undefined
        }, props, {
          selected: selected,
          children: optionChildren
        });
      }
    }

    {
      validatePropertiesInDevelopment(tag, props);
    }

    assertValidProps_1(tag, props);

    var out = createOpenTagMarkup(element.type, tag, props, namespace, this.makeStaticMarkup, this.stack.length === 1, null);
    var footer = '';
    if (omittedCloseTags_1.hasOwnProperty(tag)) {
      out += '/>';
    } else {
      out += '>';
      footer = '</' + element.type + '>';
    }
    var children;
    var innerMarkup = getNonChildrenInnerMarkup(props);
    if (innerMarkup != null) {
      children = [];
      if (newlineEatingTags[tag] && innerMarkup.charAt(0) === '\n') {
        // text/html ignores the first character in these tags if it's a newline
        // Prefer to break application/xml over text/html (for now) by adding
        // a newline specifically to get eaten by the parser. (Alternately for
        // textareas, replacing "^\n" with "\r\n" doesn't get eaten, and the first
        // \r is normalized out by HTMLTextAreaElement#value.)
        // See: <http://www.w3.org/TR/html-polyglot/#newlines-in-textarea-and-pre>
        // See: <http://www.w3.org/TR/html5/syntax.html#element-restrictions>
        // See: <http://www.w3.org/TR/html5/syntax.html#newlines>
        // See: Parsing of "textarea" "listing" and "pre" elements
        //  from <http://www.w3.org/TR/html5/syntax.html#parsing-main-inbody>
        out += '\n';
      }
      out += innerMarkup;
    } else {
      children = toArray(props.children);
    }
    var frame = {
      domNamespace: getChildNamespace(parentNamespace, element.type),
      tag: tag,
      children: children,
      childIndex: 0,
      context: context,
      footer: footer
    };
    {
      frame.debugElementStack = [];
    }
    this.stack.push(frame);
    return out;
  };

  return ReactDOMServerRenderer;
}();

var ReactPartialRenderer = ReactDOMServerRenderer;

/**
 * Render a ReactElement to its initial HTML. This should only be used on the
 * server.
 * See https://facebook.github.io/react/docs/react-dom-server.html#rendertostring
 */
function renderToString(element) {
  var renderer = new ReactPartialRenderer(element, false);
  var markup = renderer.read(Infinity);
  return markup;
}

/**
 * Similar to renderToString, except this doesn't create extra DOM attributes
 * such as data-react-id that React uses internally.
 * See https://facebook.github.io/react/docs/react-dom-server.html#rendertostaticmarkup
 */
function renderToStaticMarkup(element) {
  var renderer = new ReactPartialRenderer(element, true);
  var markup = renderer.read(Infinity);
  return markup;
}

var ReactDOMStringRenderer = {
  renderToString: renderToString,
  renderToStaticMarkup: renderToStaticMarkup
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0';

var MUST_USE_PROPERTY = DOMProperty_1.injection.MUST_USE_PROPERTY;
var HAS_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_BOOLEAN_VALUE;
var HAS_NUMERIC_VALUE = DOMProperty_1.injection.HAS_NUMERIC_VALUE;
var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty_1.injection.HAS_POSITIVE_NUMERIC_VALUE;
var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
var HAS_STRING_BOOLEAN_VALUE = DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;

var HTMLDOMPropertyConfig = {
  // When adding attributes to this list, be sure to also add them to
  // the `possibleStandardNames` module to ensure casing and incorrect
  // name warnings.
  Properties: {
    allowFullScreen: HAS_BOOLEAN_VALUE,
    // IE only true/false iFrame attribute
    // https://msdn.microsoft.com/en-us/library/ms533072(v=vs.85).aspx
    allowTransparency: HAS_STRING_BOOLEAN_VALUE,
    // specifies target context for links with `preload` type
    async: HAS_BOOLEAN_VALUE,
    // autoFocus is polyfilled/normalized by AutoFocusUtils
    // autoFocus: HAS_BOOLEAN_VALUE,
    autoPlay: HAS_BOOLEAN_VALUE,
    capture: HAS_BOOLEAN_VALUE,
    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    cols: HAS_POSITIVE_NUMERIC_VALUE,
    contentEditable: HAS_STRING_BOOLEAN_VALUE,
    controls: HAS_BOOLEAN_VALUE,
    'default': HAS_BOOLEAN_VALUE,
    defer: HAS_BOOLEAN_VALUE,
    disabled: HAS_BOOLEAN_VALUE,
    download: HAS_OVERLOADED_BOOLEAN_VALUE,
    draggable: HAS_STRING_BOOLEAN_VALUE,
    formNoValidate: HAS_BOOLEAN_VALUE,
    hidden: HAS_BOOLEAN_VALUE,
    loop: HAS_BOOLEAN_VALUE,
    // Caution; `option.selected` is not updated if `select.multiple` is
    // disabled with `removeAttribute`.
    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    noValidate: HAS_BOOLEAN_VALUE,
    open: HAS_BOOLEAN_VALUE,
    playsInline: HAS_BOOLEAN_VALUE,
    readOnly: HAS_BOOLEAN_VALUE,
    required: HAS_BOOLEAN_VALUE,
    reversed: HAS_BOOLEAN_VALUE,
    rows: HAS_POSITIVE_NUMERIC_VALUE,
    rowSpan: HAS_NUMERIC_VALUE,
    scoped: HAS_BOOLEAN_VALUE,
    seamless: HAS_BOOLEAN_VALUE,
    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
    size: HAS_POSITIVE_NUMERIC_VALUE,
    start: HAS_NUMERIC_VALUE,
    // support for projecting regular DOM Elements via V1 named slots ( shadow dom )
    span: HAS_POSITIVE_NUMERIC_VALUE,
    spellCheck: HAS_STRING_BOOLEAN_VALUE,
    // Style must be explicitly set in the attribute list. React components
    // expect a style object
    style: 0,
    // itemScope is for for Microdata support.
    // See http://schema.org/docs/gs.html
    itemScope: HAS_BOOLEAN_VALUE,
    // These attributes must stay in the white-list because they have
    // different attribute names (see DOMAttributeNames below)
    acceptCharset: 0,
    className: 0,
    htmlFor: 0,
    httpEquiv: 0,
    // Attributes with mutation methods must be specified in the whitelist
    // Set the string boolean flag to allow the behavior
    value: HAS_STRING_BOOLEAN_VALUE
  },
  DOMAttributeNames: {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  },
  DOMMutationMethods: {
    value: function (node, value) {
      if (value == null) {
        return node.removeAttribute('value');
      }

      // Number inputs get special treatment due to some edge cases in
      // Chrome. Let everything else assign the value attribute as normal.
      // https://github.com/facebook/react/issues/7253#issuecomment-236074326
      if (node.type !== 'number' || node.hasAttribute('value') === false) {
        node.setAttribute('value', '' + value);
      } else if (node.validity && !node.validity.badInput && node.ownerDocument.activeElement !== node) {
        // Don't assign an attribute if validation reports bad
        // input. Chrome will clear the value. Additionally, don't
        // operate on inputs that have focus, otherwise Chrome might
        // strip off trailing decimal places and cause the user's
        // cursor position to jump to the beginning of the input.
        //
        // In ReactDOMInput, we have an onBlur event that will trigger
        // this function again when focus is lost.
        node.setAttribute('value', '' + value);
      }
    }
  }
};

var HTMLDOMPropertyConfig_1 = HTMLDOMPropertyConfig;

var HAS_STRING_BOOLEAN_VALUE$1 = DOMProperty_1.injection.HAS_STRING_BOOLEAN_VALUE;


var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */
var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];

var SVGDOMPropertyConfig = {
  Properties: {
    autoReverse: HAS_STRING_BOOLEAN_VALUE$1,
    externalResourcesRequired: HAS_STRING_BOOLEAN_VALUE$1,
    preserveAlpha: HAS_STRING_BOOLEAN_VALUE$1
  },
  DOMAttributeNames: {
    autoReverse: 'autoReverse',
    externalResourcesRequired: 'externalResourcesRequired',
    preserveAlpha: 'preserveAlpha'
  },
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  }
};

var CAMELIZE = /[\-\:]([a-z])/g;
var capitalize = function (token) {
  return token[1].toUpperCase();
};

ATTRS.forEach(function (original) {
  var reactName = original.replace(CAMELIZE, capitalize);

  SVGDOMPropertyConfig.Properties[reactName] = 0;
  SVGDOMPropertyConfig.DOMAttributeNames[reactName] = original;
});

var SVGDOMPropertyConfig_1 = SVGDOMPropertyConfig;

DOMProperty_1.injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig_1);
DOMProperty_1.injection.injectDOMPropertyConfig(SVGDOMPropertyConfig_1);

var ReactDOMServerBrowserEntry = {
  renderToString: ReactDOMStringRenderer.renderToString,
  renderToStaticMarkup: ReactDOMStringRenderer.renderToStaticMarkup,
  renderToNodeStream: function () {
    invariant(false, 'ReactDOMServer.renderToNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToString() instead.');
  },
  renderToStaticNodeStream: function () {
    invariant(false, 'ReactDOMServer.renderToStaticNodeStream(): The streaming API is not available in the browser. Use ReactDOMServer.renderToStaticMarkup() instead.');
  },

  version: ReactVersion
};

module.exports = ReactDOMServerBrowserEntry;

})();
}


/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy4zNGNlOGJjNGMxMWZhMzQ2MjJlNC5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS9janMvcmVhY3QtZG9tLXNlcnZlci5icm93c2VyLmRldmVsb3BtZW50LmpzPzNlOWJiMTQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4wLjBcbiAqIHJlYWN0LWRvbS1zZXJ2ZXIuYnJvd3Nlci5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG4ndXNlIHN0cmljdCc7XG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuKGZ1bmN0aW9uKCkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3RBc3NpZ24kMSA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciByZXF1aXJlJCQwID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIHJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHByb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaHlwaGVuYXRlU3R5bGVOYW1lID0gcmVxdWlyZSgnZmJqcy9saWIvaHlwaGVuYXRlU3R5bGVOYW1lJyk7XG52YXIgbWVtb2l6ZVN0cmluZ09ubHkgPSByZXF1aXJlKCdmYmpzL2xpYi9tZW1vaXplU3RyaW5nT25seScpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xudmFyIGNhbWVsaXplU3R5bGVOYW1lID0gcmVxdWlyZSgnZmJqcy9saWIvY2FtZWxpemVTdHlsZU5hbWUnKTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgcmVhY3RQcm9kSW52YXJpYW50XG4gKiBcbiAqL1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBET01OYW1lc3BhY2VzXG4gKi9cblxudmFyIEhUTUxfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xudmFyIE1BVEhfTkFNRVNQQUNFID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTgvTWF0aC9NYXRoTUwnO1xudmFyIFNWR19OQU1FU1BBQ0UgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG52YXIgTmFtZXNwYWNlcyQxID0ge1xuICBodG1sOiBIVE1MX05BTUVTUEFDRSxcbiAgbWF0aG1sOiBNQVRIX05BTUVTUEFDRSxcbiAgc3ZnOiBTVkdfTkFNRVNQQUNFXG59O1xuXG4vLyBBc3N1bWVzIHRoZXJlIGlzIG5vIHBhcmVudCBuYW1lc3BhY2UuXG5mdW5jdGlvbiBnZXRJbnRyaW5zaWNOYW1lc3BhY2UkMSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3N2Zyc6XG4gICAgICByZXR1cm4gU1ZHX05BTUVTUEFDRTtcbiAgICBjYXNlICdtYXRoJzpcbiAgICAgIHJldHVybiBNQVRIX05BTUVTUEFDRTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEhUTUxfTkFNRVNQQUNFO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldENoaWxkTmFtZXNwYWNlJDEocGFyZW50TmFtZXNwYWNlLCB0eXBlKSB7XG4gIGlmIChwYXJlbnROYW1lc3BhY2UgPT0gbnVsbCB8fCBwYXJlbnROYW1lc3BhY2UgPT09IEhUTUxfTkFNRVNQQUNFKSB7XG4gICAgLy8gTm8gKG9yIGRlZmF1bHQpIHBhcmVudCBuYW1lc3BhY2U6IHBvdGVudGlhbCBlbnRyeSBwb2ludC5cbiAgICByZXR1cm4gZ2V0SW50cmluc2ljTmFtZXNwYWNlJDEodHlwZSk7XG4gIH1cbiAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PT0gU1ZHX05BTUVTUEFDRSAmJiB0eXBlID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICAvLyBXZSdyZSBsZWF2aW5nIFNWRy5cbiAgICByZXR1cm4gSFRNTF9OQU1FU1BBQ0U7XG4gIH1cbiAgLy8gQnkgZGVmYXVsdCwgcGFzcyBuYW1lc3BhY2UgYmVsb3cuXG4gIHJldHVybiBwYXJlbnROYW1lc3BhY2U7XG59XG5cbnZhciBOYW1lc3BhY2VzXzEgPSBOYW1lc3BhY2VzJDE7XG52YXIgZ2V0SW50cmluc2ljTmFtZXNwYWNlXzEgPSBnZXRJbnRyaW5zaWNOYW1lc3BhY2UkMTtcbnZhciBnZXRDaGlsZE5hbWVzcGFjZV8xID0gZ2V0Q2hpbGROYW1lc3BhY2UkMTtcblxudmFyIERPTU5hbWVzcGFjZXMgPSB7XG5cdE5hbWVzcGFjZXM6IE5hbWVzcGFjZXNfMSxcblx0Z2V0SW50cmluc2ljTmFtZXNwYWNlOiBnZXRJbnRyaW5zaWNOYW1lc3BhY2VfMSxcblx0Z2V0Q2hpbGROYW1lc3BhY2U6IGdldENoaWxkTmFtZXNwYWNlXzFcbn07XG5cbi8vIFRoZXNlIGF0dHJpYnV0ZXMgc2hvdWxkIGJlIGFsbCBsb3dlcmNhc2UgdG8gYWxsb3cgZm9yXG4vLyBjYXNlIGluc2Vuc2l0aXZlIGNoZWNrc1xudmFyIFJFU0VSVkVEX1BST1BTJDEgPSB7XG4gIGNoaWxkcmVuOiB0cnVlLFxuICBkYW5nZXJvdXNseVNldElubmVySFRNTDogdHJ1ZSxcbiAgYXV0b0ZvY3VzOiB0cnVlLFxuICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gIGRlZmF1bHRDaGVja2VkOiB0cnVlLFxuICBpbm5lckhUTUw6IHRydWUsXG4gIHN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZzogdHJ1ZSxcbiAgc3R5bGU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGNoZWNrTWFzayh2YWx1ZSwgYml0bWFzaykge1xuICByZXR1cm4gKHZhbHVlICYgYml0bWFzaykgPT09IGJpdG1hc2s7XG59XG5cbnZhciBET01Qcm9wZXJ0eUluamVjdGlvbiA9IHtcbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBub3JtYWxpemVkLCBjYW1lbGNhc2VkIHByb3BlcnR5IG5hbWVzIHRvIGEgY29uZmlndXJhdGlvbiB0aGF0XG4gICAqIHNwZWNpZmllcyBob3cgdGhlIGFzc29jaWF0ZWQgRE9NIHByb3BlcnR5IHNob3VsZCBiZSBhY2Nlc3NlZCBvciByZW5kZXJlZC5cbiAgICovXG4gIE1VU1RfVVNFX1BST1BFUlRZOiAweDEsXG4gIEhBU19CT09MRUFOX1ZBTFVFOiAweDQsXG4gIEhBU19OVU1FUklDX1ZBTFVFOiAweDgsXG4gIEhBU19QT1NJVElWRV9OVU1FUklDX1ZBTFVFOiAweDEwIHwgMHg4LFxuICBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFOiAweDIwLFxuICBIQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUU6IDB4NDAsXG5cbiAgLyoqXG4gICAqIEluamVjdCBzb21lIHNwZWNpYWxpemVkIGtub3dsZWRnZSBhYm91dCB0aGUgRE9NLiBUaGlzIHRha2VzIGEgY29uZmlnIG9iamVjdFxuICAgKiB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICpcbiAgICogUHJvcGVydGllczogb2JqZWN0IG1hcHBpbmcgRE9NIHByb3BlcnR5IG5hbWUgdG8gb25lIG9mIHRoZVxuICAgKiBET01Qcm9wZXJ0eUluamVjdGlvbiBjb25zdGFudHMgb3IgbnVsbC4gSWYgeW91ciBhdHRyaWJ1dGUgaXNuJ3QgaW4gaGVyZSxcbiAgICogaXQgd29uJ3QgZ2V0IHdyaXR0ZW4gdG8gdGhlIERPTS5cbiAgICpcbiAgICogRE9NQXR0cmlidXRlTmFtZXM6IG9iamVjdCBtYXBwaW5nIFJlYWN0IGF0dHJpYnV0ZSBuYW1lIHRvIHRoZSBET01cbiAgICogYXR0cmlidXRlIG5hbWUuIEF0dHJpYnV0ZSBuYW1lcyBub3Qgc3BlY2lmaWVkIHVzZSB0aGUgKipsb3dlcmNhc2UqKlxuICAgKiBub3JtYWxpemVkIG5hbWUuXG4gICAqXG4gICAqIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXM6IG9iamVjdCBtYXBwaW5nIFJlYWN0IGF0dHJpYnV0ZSBuYW1lIHRvIHRoZSBET01cbiAgICogYXR0cmlidXRlIG5hbWVzcGFjZSBVUkwuIChBdHRyaWJ1dGUgbmFtZXMgbm90IHNwZWNpZmllZCB1c2Ugbm8gbmFtZXNwYWNlLilcbiAgICpcbiAgICogRE9NUHJvcGVydHlOYW1lczogc2ltaWxhciB0byBET01BdHRyaWJ1dGVOYW1lcyBidXQgZm9yIERPTSBwcm9wZXJ0aWVzLlxuICAgKiBQcm9wZXJ0eSBuYW1lcyBub3Qgc3BlY2lmaWVkIHVzZSB0aGUgbm9ybWFsaXplZCBuYW1lLlxuICAgKlxuICAgKiBET01NdXRhdGlvbk1ldGhvZHM6IFByb3BlcnRpZXMgdGhhdCByZXF1aXJlIHNwZWNpYWwgbXV0YXRpb24gbWV0aG9kcy4gSWZcbiAgICogYHZhbHVlYCBpcyB1bmRlZmluZWQsIHRoZSBtdXRhdGlvbiBtZXRob2Qgc2hvdWxkIHVuc2V0IHRoZSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IGRvbVByb3BlcnR5Q29uZmlnIHRoZSBjb25maWcgYXMgZGVzY3JpYmVkIGFib3ZlLlxuICAgKi9cbiAgaW5qZWN0RE9NUHJvcGVydHlDb25maWc6IGZ1bmN0aW9uIChkb21Qcm9wZXJ0eUNvbmZpZykge1xuICAgIHZhciBJbmplY3Rpb24gPSBET01Qcm9wZXJ0eUluamVjdGlvbjtcbiAgICB2YXIgUHJvcGVydGllcyA9IGRvbVByb3BlcnR5Q29uZmlnLlByb3BlcnRpZXMgfHwge307XG4gICAgdmFyIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01BdHRyaWJ1dGVOYW1lc3BhY2VzIHx8IHt9O1xuICAgIHZhciBET01BdHRyaWJ1dGVOYW1lcyA9IGRvbVByb3BlcnR5Q29uZmlnLkRPTUF0dHJpYnV0ZU5hbWVzIHx8IHt9O1xuICAgIHZhciBET01NdXRhdGlvbk1ldGhvZHMgPSBkb21Qcm9wZXJ0eUNvbmZpZy5ET01NdXRhdGlvbk1ldGhvZHMgfHwge307XG5cbiAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBQcm9wZXJ0aWVzKSB7XG4gICAgICAhIURPTVByb3BlcnR5LnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpID8gaW52YXJpYW50KGZhbHNlLCAnaW5qZWN0RE9NUHJvcGVydHlDb25maWcoLi4uKTogWW91XFwncmUgdHJ5aW5nIHRvIGluamVjdCBET00gcHJvcGVydHkgXFwnJXNcXCcgd2hpY2ggaGFzIGFscmVhZHkgYmVlbiBpbmplY3RlZC4gWW91IG1heSBiZSBhY2NpZGVudGFsbHkgaW5qZWN0aW5nIHRoZSBzYW1lIERPTSBwcm9wZXJ0eSBjb25maWcgdHdpY2UsIG9yIHlvdSBtYXkgYmUgaW5qZWN0aW5nIHR3byBjb25maWdzIHRoYXQgaGF2ZSBjb25mbGljdGluZyBwcm9wZXJ0eSBuYW1lcy4nLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgIHZhciBsb3dlckNhc2VkID0gcHJvcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHZhciBwcm9wQ29uZmlnID0gUHJvcGVydGllc1twcm9wTmFtZV07XG5cbiAgICAgIHZhciBwcm9wZXJ0eUluZm8gPSB7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IGxvd2VyQ2FzZWQsXG4gICAgICAgIGF0dHJpYnV0ZU5hbWVzcGFjZTogbnVsbCxcbiAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgbXV0YXRpb25NZXRob2Q6IG51bGwsXG5cbiAgICAgICAgbXVzdFVzZVByb3BlcnR5OiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLk1VU1RfVVNFX1BST1BFUlRZKSxcbiAgICAgICAgaGFzQm9vbGVhblZhbHVlOiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLkhBU19CT09MRUFOX1ZBTFVFKSxcbiAgICAgICAgaGFzTnVtZXJpY1ZhbHVlOiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLkhBU19OVU1FUklDX1ZBTFVFKSxcbiAgICAgICAgaGFzUG9zaXRpdmVOdW1lcmljVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUpLFxuICAgICAgICBoYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlOiBjaGVja01hc2socHJvcENvbmZpZywgSW5qZWN0aW9uLkhBU19PVkVSTE9BREVEX0JPT0xFQU5fVkFMVUUpLFxuICAgICAgICBoYXNTdHJpbmdCb29sZWFuVmFsdWU6IGNoZWNrTWFzayhwcm9wQ29uZmlnLCBJbmplY3Rpb24uSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFKVxuICAgICAgfTtcbiAgICAgICEocHJvcGVydHlJbmZvLmhhc0Jvb2xlYW5WYWx1ZSArIHByb3BlcnR5SW5mby5oYXNOdW1lcmljVmFsdWUgKyBwcm9wZXJ0eUluZm8uaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZSA8PSAxKSA/IGludmFyaWFudChmYWxzZSwgJ0RPTVByb3BlcnR5OiBWYWx1ZSBjYW4gYmUgb25lIG9mIGJvb2xlYW4sIG92ZXJsb2FkZWQgYm9vbGVhbiwgb3IgbnVtZXJpYyB2YWx1ZSwgYnV0IG5vdCBhIGNvbWJpbmF0aW9uOiAlcycsIHByb3BOYW1lKSA6IHZvaWQgMDtcblxuICAgICAgaWYgKERPTUF0dHJpYnV0ZU5hbWVzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IERPTUF0dHJpYnV0ZU5hbWVzW3Byb3BOYW1lXTtcblxuICAgICAgICBwcm9wZXJ0eUluZm8uYXR0cmlidXRlTmFtZSA9IGF0dHJpYnV0ZU5hbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChET01BdHRyaWJ1dGVOYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wZXJ0eUluZm8uYXR0cmlidXRlTmFtZXNwYWNlID0gRE9NQXR0cmlidXRlTmFtZXNwYWNlc1twcm9wTmFtZV07XG4gICAgICB9XG5cbiAgICAgIGlmIChET01NdXRhdGlvbk1ldGhvZHMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BlcnR5SW5mby5tdXRhdGlvbk1ldGhvZCA9IERPTU11dGF0aW9uTWV0aG9kc1twcm9wTmFtZV07XG4gICAgICB9XG5cbiAgICAgIC8vIERvd25jYXNlIHJlZmVyZW5jZXMgdG8gd2hpdGVsaXN0IHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIG1lbWJlcnNoaXBcbiAgICAgIC8vIHdpdGhvdXQgY2FzZS1zZW5zaXRpdml0eS4gVGhpcyBhbGxvd3MgdGhlIHdoaXRlbGlzdCB0byBwaWNrIHVwXG4gICAgICAvLyBgYWxsb3dmdWxsc2NyZWVuYCwgd2hpY2ggc2hvdWxkIGJlIHdyaXR0ZW4gdXNpbmcgdGhlIHByb3BlcnR5IGNvbmZpZ3VyYXRpb25cbiAgICAgIC8vIGZvciBgYWxsb3dGdWxsc2NyZWVuYFxuICAgICAgRE9NUHJvcGVydHkucHJvcGVydGllc1twcm9wTmFtZV0gPSBwcm9wZXJ0eUluZm87XG4gICAgfVxuICB9XG59O1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG52YXIgQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiA9ICc6QS1aX2EtelxcXFx1MDBDMC1cXFxcdTAwRDZcXFxcdTAwRDgtXFxcXHUwMEY2XFxcXHUwMEY4LVxcXFx1MDJGRlxcXFx1MDM3MC1cXFxcdTAzN0RcXFxcdTAzN0YtXFxcXHUxRkZGXFxcXHUyMDBDLVxcXFx1MjAwRFxcXFx1MjA3MC1cXFxcdTIxOEZcXFxcdTJDMDAtXFxcXHUyRkVGXFxcXHUzMDAxLVxcXFx1RDdGRlxcXFx1RjkwMC1cXFxcdUZEQ0ZcXFxcdUZERjAtXFxcXHVGRkZEJztcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG4vKipcbiAqIERPTVByb3BlcnR5IGV4cG9ydHMgbG9va3VwIG9iamVjdHMgdGhhdCBjYW4gYmUgdXNlZCBsaWtlIGZ1bmN0aW9uczpcbiAqXG4gKiAgID4gRE9NUHJvcGVydHkuaXNWYWxpZFsnaWQnXVxuICogICB0cnVlXG4gKiAgID4gRE9NUHJvcGVydHkuaXNWYWxpZFsnZm9vYmFyJ11cbiAqICAgdW5kZWZpbmVkXG4gKlxuICogQWx0aG91Z2ggdGhpcyBtYXkgYmUgY29uZnVzaW5nLCBpdCBwZXJmb3JtcyBiZXR0ZXIgaW4gZ2VuZXJhbC5cbiAqXG4gKiBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2tleS1leGlzdHNcbiAqIEBzZWUgaHR0cDovL2pzcGVyZi5jb20va2V5LW1pc3NpbmdcbiAqL1xudmFyIERPTVByb3BlcnR5ID0ge1xuICBJRF9BVFRSSUJVVEVfTkFNRTogJ2RhdGEtcmVhY3RpZCcsXG4gIFJPT1RfQVRUUklCVVRFX05BTUU6ICdkYXRhLXJlYWN0cm9vdCcsXG5cbiAgQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUjogQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUixcbiAgQVRUUklCVVRFX05BTUVfQ0hBUjogQVRUUklCVVRFX05BTUVfU1RBUlRfQ0hBUiArICdcXFxcLS4wLTlcXFxcdTAwQjdcXFxcdTAzMDAtXFxcXHUwMzZGXFxcXHUyMDNGLVxcXFx1MjA0MCcsXG5cbiAgLyoqXG4gICAqIE1hcCBmcm9tIHByb3BlcnR5IFwic3RhbmRhcmQgbmFtZVwiIHRvIGFuIG9iamVjdCB3aXRoIGluZm8gYWJvdXQgaG93IHRvIHNldFxuICAgKiB0aGUgcHJvcGVydHkgaW4gdGhlIERPTS4gRWFjaCBvYmplY3QgY29udGFpbnM6XG4gICAqXG4gICAqIGF0dHJpYnV0ZU5hbWU6XG4gICAqICAgVXNlZCB3aGVuIHJlbmRlcmluZyBtYXJrdXAgb3Igd2l0aCBgKkF0dHJpYnV0ZSgpYC5cbiAgICogYXR0cmlidXRlTmFtZXNwYWNlXG4gICAqIHByb3BlcnR5TmFtZTpcbiAgICogICBVc2VkIG9uIERPTSBub2RlIGluc3RhbmNlcy4gKFRoaXMgaW5jbHVkZXMgcHJvcGVydGllcyB0aGF0IG11dGF0ZSBkdWUgdG9cbiAgICogICBleHRlcm5hbCBmYWN0b3JzLilcbiAgICogbXV0YXRpb25NZXRob2Q6XG4gICAqICAgSWYgbm9uLW51bGwsIHVzZWQgaW5zdGVhZCBvZiB0aGUgcHJvcGVydHkgb3IgYHNldEF0dHJpYnV0ZSgpYCBhZnRlclxuICAgKiAgIGluaXRpYWwgcmVuZGVyLlxuICAgKiBtdXN0VXNlUHJvcGVydHk6XG4gICAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgbXVzdCBiZSBhY2Nlc3NlZCBhbmQgbXV0YXRlZCBhcyBhbiBvYmplY3QgcHJvcGVydHkuXG4gICAqIGhhc0Jvb2xlYW5WYWx1ZTpcbiAgICogICBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgcmVtb3ZlZCB3aGVuIHNldCB0byBhIGZhbHNleSB2YWx1ZS5cbiAgICogaGFzTnVtZXJpY1ZhbHVlOlxuICAgKiAgIFdoZXRoZXIgdGhlIHByb3BlcnR5IG11c3QgYmUgbnVtZXJpYyBvciBwYXJzZSBhcyBhIG51bWVyaWMgYW5kIHNob3VsZCBiZVxuICAgKiAgIHJlbW92ZWQgd2hlbiBzZXQgdG8gYSBmYWxzZXkgdmFsdWUuXG4gICAqIGhhc1Bvc2l0aXZlTnVtZXJpY1ZhbHVlOlxuICAgKiAgIFdoZXRoZXIgdGhlIHByb3BlcnR5IG11c3QgYmUgcG9zaXRpdmUgbnVtZXJpYyBvciBwYXJzZSBhcyBhIHBvc2l0aXZlXG4gICAqICAgbnVtZXJpYyBhbmQgc2hvdWxkIGJlIHJlbW92ZWQgd2hlbiBzZXQgdG8gYSBmYWxzZXkgdmFsdWUuXG4gICAqIGhhc092ZXJsb2FkZWRCb29sZWFuVmFsdWU6XG4gICAqICAgV2hldGhlciB0aGUgcHJvcGVydHkgY2FuIGJlIHVzZWQgYXMgYSBmbGFnIGFzIHdlbGwgYXMgd2l0aCBhIHZhbHVlLlxuICAgKiAgIFJlbW92ZWQgd2hlbiBzdHJpY3RseSBlcXVhbCB0byBmYWxzZTsgcHJlc2VudCB3aXRob3V0IGEgdmFsdWUgd2hlblxuICAgKiAgIHN0cmljdGx5IGVxdWFsIHRvIHRydWU7IHByZXNlbnQgd2l0aCBhIHZhbHVlIG90aGVyd2lzZS5cbiAgICovXG4gIHByb3BlcnRpZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBhIHByb3BlcnR5IG5hbWUgaXMgYSB3cml0ZWFibGUgYXR0cmlidXRlLlxuICAgKiBAbWV0aG9kXG4gICAqL1xuICBzaG91bGRTZXRBdHRyaWJ1dGU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICAgIGlmIChET01Qcm9wZXJ0eS5pc1Jlc2VydmVkUHJvcChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoKG5hbWVbMF0gPT09ICdvJyB8fCBuYW1lWzBdID09PSAnTycpICYmIChuYW1lWzFdID09PSAnbicgfHwgbmFtZVsxXSA9PT0gJ04nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiBET01Qcm9wZXJ0eS5zaG91bGRBdHRyaWJ1dGVBY2NlcHRCb29sZWFuVmFsdWUobmFtZSk7XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIGZ1bmN0aW9uLCBzeW1ib2xcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBnZXRQcm9wZXJ0eUluZm86IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIERPTVByb3BlcnR5LnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBET01Qcm9wZXJ0eS5wcm9wZXJ0aWVzW25hbWVdIDogbnVsbDtcbiAgfSxcbiAgc2hvdWxkQXR0cmlidXRlQWNjZXB0Qm9vbGVhblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChET01Qcm9wZXJ0eS5pc1Jlc2VydmVkUHJvcChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHZhciBwcm9wZXJ0eUluZm8gPSBET01Qcm9wZXJ0eS5nZXRQcm9wZXJ0eUluZm8obmFtZSk7XG4gICAgaWYgKHByb3BlcnR5SW5mbykge1xuICAgICAgcmV0dXJuIHByb3BlcnR5SW5mby5oYXNCb29sZWFuVmFsdWUgfHwgcHJvcGVydHlJbmZvLmhhc1N0cmluZ0Jvb2xlYW5WYWx1ZSB8fCBwcm9wZXJ0eUluZm8uaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByZWZpeCA9IG5hbWUudG9Mb3dlckNhc2UoKS5zbGljZSgwLCA1KTtcbiAgICByZXR1cm4gcHJlZml4ID09PSAnZGF0YS0nIHx8IHByZWZpeCA9PT0gJ2FyaWEtJztcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIGEgcHJvcGVydHkgbmFtZSBpcyB3aXRoaW4gdGhlIGxpc3Qgb2YgcHJvcGVydGllc1xuICAgKiByZXNlcnZlZCBmb3IgaW50ZXJuYWwgUmVhY3Qgb3BlcmF0aW9ucy4gVGhlc2UgcHJvcGVydGllcyBzaG91bGRcbiAgICogbm90IGJlIHNldCBvbiBhbiBIVE1MIGVsZW1lbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IElmIHRoZSBuYW1lIGlzIHdpdGhpbiByZXNlcnZlZCBwcm9wc1xuICAgKi9cbiAgaXNSZXNlcnZlZFByb3A6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIFJFU0VSVkVEX1BST1BTJDEuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gIH0sXG5cblxuICBpbmplY3Rpb246IERPTVByb3BlcnR5SW5qZWN0aW9uXG59O1xuXG52YXIgRE9NUHJvcGVydHlfMSA9IERPTVByb3BlcnR5O1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEJhc2VkIG9uIHRoZSBlc2NhcGUtaHRtbCBsaWJyYXJ5LCB3aGljaCBpcyB1c2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSBiZWxvdzpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTItMjAxMyBUSiBIb2xvd2F5Y2h1a1xuICogQ29weXJpZ2h0IChjKSAyMDE1IEFuZHJlYXMgTHViYmVcbiAqIENvcHlyaWdodCAoYykgMjAxNSBUaWFuY2hlbmcgXCJUaW1vdGh5XCIgR3VcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbiAqIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuICogJ1NvZnR3YXJlJyksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuICogd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuICogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvXG4gKiBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbiAqIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICdBUyBJUycsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4gKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbiAqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cbiAqIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZXG4gKiBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxuICogVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcbiAqIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXJcbiAqL1xuXG4vLyBjb2RlIGNvcGllZCBhbmQgbW9kaWZpZWQgZnJvbSBlc2NhcGUtaHRtbFxuLyoqXG4gKiBNb2R1bGUgdmFyaWFibGVzLlxuICogQHByaXZhdGVcbiAqL1xuXG52YXIgbWF0Y2hIdG1sUmVnRXhwID0gL1tcIicmPD5dLztcblxuLyoqXG4gKiBFc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIHRoZSBnaXZlbiBzdHJpbmcgb2YgaHRtbC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGVzY2FwZSBmb3IgaW5zZXJ0aW5nIGludG8gSFRNTFxuICogQHJldHVybiB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyaW5nKSB7XG4gIHZhciBzdHIgPSAnJyArIHN0cmluZztcbiAgdmFyIG1hdGNoID0gbWF0Y2hIdG1sUmVnRXhwLmV4ZWMoc3RyKTtcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHZhciBlc2NhcGU7XG4gIHZhciBodG1sID0gJyc7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0SW5kZXggPSAwO1xuXG4gIGZvciAoaW5kZXggPSBtYXRjaC5pbmRleDsgaW5kZXggPCBzdHIubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgc3dpdGNoIChzdHIuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgIGNhc2UgMzQ6XG4gICAgICAgIC8vIFwiXG4gICAgICAgIGVzY2FwZSA9ICcmcXVvdDsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzg6XG4gICAgICAgIC8vICZcbiAgICAgICAgZXNjYXBlID0gJyZhbXA7JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgICAvLyAnXG4gICAgICAgIGVzY2FwZSA9ICcmI3gyNzsnOyAvLyBtb2RpZmllZCBmcm9tIGVzY2FwZS1odG1sOyB1c2VkIHRvIGJlICcmIzM5J1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjA6XG4gICAgICAgIC8vIDxcbiAgICAgICAgZXNjYXBlID0gJyZsdDsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjI6XG4gICAgICAgIC8vID5cbiAgICAgICAgZXNjYXBlID0gJyZndDsnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsYXN0SW5kZXggIT09IGluZGV4KSB7XG4gICAgICBodG1sICs9IHN0ci5zdWJzdHJpbmcobGFzdEluZGV4LCBpbmRleCk7XG4gICAgfVxuXG4gICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgIGh0bWwgKz0gZXNjYXBlO1xuICB9XG5cbiAgcmV0dXJuIGxhc3RJbmRleCAhPT0gaW5kZXggPyBodG1sICsgc3RyLnN1YnN0cmluZyhsYXN0SW5kZXgsIGluZGV4KSA6IGh0bWw7XG59XG4vLyBlbmQgY29kZSBjb3BpZWQgYW5kIG1vZGlmaWVkIGZyb20gZXNjYXBlLWh0bWxcblxuLyoqXG4gKiBFc2NhcGVzIHRleHQgdG8gcHJldmVudCBzY3JpcHRpbmcgYXR0YWNrcy5cbiAqXG4gKiBAcGFyYW0geyp9IHRleHQgVGV4dCB2YWx1ZSB0byBlc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IEFuIGVzY2FwZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXIodGV4dCkge1xuICBpZiAodHlwZW9mIHRleHQgPT09ICdib29sZWFuJyB8fCB0eXBlb2YgdGV4dCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyB0aGlzIHNob3J0Y2lyY3VpdCBoZWxwcyBwZXJmIGZvciB0eXBlcyB0aGF0IHdlIGtub3cgd2lsbCBuZXZlciBoYXZlXG4gICAgLy8gc3BlY2lhbCBjaGFyYWN0ZXJzLCBlc3BlY2lhbGx5IGdpdmVuIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyB1c2VkIG9mdGVuXG4gICAgLy8gZm9yIG51bWVyaWMgZG9tIGlkcy5cbiAgICByZXR1cm4gJycgKyB0ZXh0O1xuICB9XG4gIHJldHVybiBlc2NhcGVIdG1sKHRleHQpO1xufVxuXG52YXIgZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyXzEgPSBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXI7XG5cbi8qKlxuICogRXNjYXBlcyBhdHRyaWJ1dGUgdmFsdWUgdG8gcHJldmVudCBzY3JpcHRpbmcgYXR0YWNrcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlIFZhbHVlIHRvIGVzY2FwZS5cbiAqIEByZXR1cm4ge3N0cmluZ30gQW4gZXNjYXBlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyKHZhbHVlKSB7XG4gIHJldHVybiAnXCInICsgZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyXzEodmFsdWUpICsgJ1wiJztcbn1cblxudmFyIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyXzEgPSBxdW90ZUF0dHJpYnV0ZVZhbHVlRm9yQnJvd3Nlcjtcblxue1xuICB2YXIgd2FybmluZyQxID0gcmVxdWlyZSQkMDtcbn1cblxuLy8gaXNBdHRyaWJ1dGVOYW1lU2FmZSgpIGlzIGN1cnJlbnRseSBkdXBsaWNhdGVkIGluIERPTVByb3BlcnR5T3BlcmF0aW9ucy5cbi8vIFRPRE86IEZpbmQgYSBiZXR0ZXIgcGxhY2UgZm9yIHRoaXMuXG52YXIgVkFMSURfQVRUUklCVVRFX05BTUVfUkVHRVggPSBuZXcgUmVnRXhwKCdeWycgKyBET01Qcm9wZXJ0eV8xLkFUVFJJQlVURV9OQU1FX1NUQVJUX0NIQVIgKyAnXVsnICsgRE9NUHJvcGVydHlfMS5BVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xudmFyIGlsbGVnYWxBdHRyaWJ1dGVOYW1lQ2FjaGUgPSB7fTtcbnZhciB2YWxpZGF0ZWRBdHRyaWJ1dGVOYW1lQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGlzQXR0cmlidXRlTmFtZVNhZmUoYXR0cmlidXRlTmFtZSkge1xuICBpZiAodmFsaWRhdGVkQXR0cmlidXRlTmFtZUNhY2hlLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGlsbGVnYWxBdHRyaWJ1dGVOYW1lQ2FjaGUuaGFzT3duUHJvcGVydHkoYXR0cmlidXRlTmFtZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKFZBTElEX0FUVFJJQlVURV9OQU1FX1JFR0VYLnRlc3QoYXR0cmlidXRlTmFtZSkpIHtcbiAgICB2YWxpZGF0ZWRBdHRyaWJ1dGVOYW1lQ2FjaGVbYXR0cmlidXRlTmFtZV0gPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlsbGVnYWxBdHRyaWJ1dGVOYW1lQ2FjaGVbYXR0cmlidXRlTmFtZV0gPSB0cnVlO1xuICB7XG4gICAgd2FybmluZyQxKGZhbHNlLCAnSW52YWxpZCBhdHRyaWJ1dGUgbmFtZTogYCVzYCcsIGF0dHJpYnV0ZU5hbWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gc2hvdWxkSWdub3JlVmFsdWUoKSBpcyBjdXJyZW50bHkgZHVwbGljYXRlZCBpbiBET01Qcm9wZXJ0eU9wZXJhdGlvbnMuXG4vLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHBsYWNlIGZvciB0aGlzLlxuZnVuY3Rpb24gc2hvdWxkSWdub3JlVmFsdWUocHJvcGVydHlJbmZvLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCB8fCBwcm9wZXJ0eUluZm8uaGFzQm9vbGVhblZhbHVlICYmICF2YWx1ZSB8fCBwcm9wZXJ0eUluZm8uaGFzTnVtZXJpY1ZhbHVlICYmIGlzTmFOKHZhbHVlKSB8fCBwcm9wZXJ0eUluZm8uaGFzUG9zaXRpdmVOdW1lcmljVmFsdWUgJiYgdmFsdWUgPCAxIHx8IHByb3BlcnR5SW5mby5oYXNPdmVybG9hZGVkQm9vbGVhblZhbHVlICYmIHZhbHVlID09PSBmYWxzZTtcbn1cblxuLyoqXG4gKiBPcGVyYXRpb25zIGZvciBkZWFsaW5nIHdpdGggRE9NIHByb3BlcnRpZXMuXG4gKi9cbnZhciBET01NYXJrdXBPcGVyYXRpb25zID0ge1xuICAvKipcbiAgICogQ3JlYXRlcyBtYXJrdXAgZm9yIHRoZSBJRCBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGlkIFVuZXNjYXBlZCBJRC5cbiAgICogQHJldHVybiB7c3RyaW5nfSBNYXJrdXAgc3RyaW5nLlxuICAgKi9cbiAgY3JlYXRlTWFya3VwRm9ySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiBET01Qcm9wZXJ0eV8xLklEX0FUVFJJQlVURV9OQU1FICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXJfMShpZCk7XG4gIH0sXG5cbiAgY3JlYXRlTWFya3VwRm9yUm9vdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBET01Qcm9wZXJ0eV8xLlJPT1RfQVRUUklCVVRFX05BTUUgKyAnPVwiXCInO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG1hcmt1cCBmb3IgYSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHs/c3RyaW5nfSBNYXJrdXAgc3RyaW5nLCBvciBudWxsIGlmIHRoZSBwcm9wZXJ0eSB3YXMgaW52YWxpZC5cbiAgICovXG4gIGNyZWF0ZU1hcmt1cEZvclByb3BlcnR5OiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgcHJvcGVydHlJbmZvID0gRE9NUHJvcGVydHlfMS5nZXRQcm9wZXJ0eUluZm8obmFtZSk7XG4gICAgaWYgKHByb3BlcnR5SW5mbykge1xuICAgICAgaWYgKHNob3VsZElnbm9yZVZhbHVlKHByb3BlcnR5SW5mbywgdmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gcHJvcGVydHlJbmZvLmF0dHJpYnV0ZU5hbWU7XG4gICAgICBpZiAocHJvcGVydHlJbmZvLmhhc0Jvb2xlYW5WYWx1ZSB8fCBwcm9wZXJ0eUluZm8uaGFzT3ZlcmxvYWRlZEJvb2xlYW5WYWx1ZSAmJiB2YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlTmFtZSArICc9XCJcIic7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ2Jvb2xlYW4nIHx8IERPTVByb3BlcnR5XzEuc2hvdWxkQXR0cmlidXRlQWNjZXB0Qm9vbGVhblZhbHVlKG5hbWUpKSB7XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXJfMSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChET01Qcm9wZXJ0eV8xLnNob3VsZFNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYW1lICsgJz0nICsgcXVvdGVBdHRyaWJ1dGVWYWx1ZUZvckJyb3dzZXJfMSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIG1hcmt1cCBmb3IgYSBjdXN0b20gcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHJldHVybiB7c3RyaW5nfSBNYXJrdXAgc3RyaW5nLCBvciBlbXB0eSBzdHJpbmcgaWYgdGhlIHByb3BlcnR5IHdhcyBpbnZhbGlkLlxuICAgKi9cbiAgY3JlYXRlTWFya3VwRm9yQ3VzdG9tQXR0cmlidXRlOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAoIWlzQXR0cmlidXRlTmFtZVNhZmUobmFtZSkgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZSArICc9JyArIHF1b3RlQXR0cmlidXRlVmFsdWVGb3JCcm93c2VyXzEodmFsdWUpO1xuICB9XG59O1xuXG52YXIgRE9NTWFya3VwT3BlcmF0aW9uc18xID0gRE9NTWFya3VwT3BlcmF0aW9ucztcblxudmFyIFJlYWN0Q29udHJvbGxlZFZhbHVlUHJvcFR5cGVzID0ge1xuICBjaGVja1Byb3BUeXBlczogbnVsbFxufTtcblxue1xuICB2YXIgd2FybmluZyQyID0gcmVxdWlyZSQkMDtcbiAgdmFyIGVtcHR5RnVuY3Rpb24kMSA9IGVtcHR5RnVuY3Rpb247XG4gIHZhciBQcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbiAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBlbXB0eUZ1bmN0aW9uJDE7XG4gIHZhciBoYXNSZWFkT25seVZhbHVlID0ge1xuICAgIGJ1dHRvbjogdHJ1ZSxcbiAgICBjaGVja2JveDogdHJ1ZSxcbiAgICBpbWFnZTogdHJ1ZSxcbiAgICBoaWRkZW46IHRydWUsXG4gICAgcmFkaW86IHRydWUsXG4gICAgcmVzZXQ6IHRydWUsXG4gICAgc3VibWl0OiB0cnVlXG4gIH07XG5cbiAgdmFyIHByb3BUeXBlcyQxID0ge1xuICAgIHZhbHVlOiBmdW5jdGlvbiAocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAgICBpZiAoIXByb3BzW3Byb3BOYW1lXSB8fCBoYXNSZWFkT25seVZhbHVlW3Byb3BzLnR5cGVdIHx8IHByb3BzLm9uQ2hhbmdlIHx8IHByb3BzLnJlYWRPbmx5IHx8IHByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignWW91IHByb3ZpZGVkIGEgYHZhbHVlYCBwcm9wIHRvIGEgZm9ybSBmaWVsZCB3aXRob3V0IGFuICcgKyAnYG9uQ2hhbmdlYCBoYW5kbGVyLiBUaGlzIHdpbGwgcmVuZGVyIGEgcmVhZC1vbmx5IGZpZWxkLiBJZiAnICsgJ3RoZSBmaWVsZCBzaG91bGQgYmUgbXV0YWJsZSB1c2UgYGRlZmF1bHRWYWx1ZWAuIE90aGVyd2lzZSwgJyArICdzZXQgZWl0aGVyIGBvbkNoYW5nZWAgb3IgYHJlYWRPbmx5YC4nKTtcbiAgICB9LFxuICAgIGNoZWNrZWQ6IGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICAgIGlmICghcHJvcHNbcHJvcE5hbWVdIHx8IHByb3BzLm9uQ2hhbmdlIHx8IHByb3BzLnJlYWRPbmx5IHx8IHByb3BzLmRpc2FibGVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignWW91IHByb3ZpZGVkIGEgYGNoZWNrZWRgIHByb3AgdG8gYSBmb3JtIGZpZWxkIHdpdGhvdXQgYW4gJyArICdgb25DaGFuZ2VgIGhhbmRsZXIuIFRoaXMgd2lsbCByZW5kZXIgYSByZWFkLW9ubHkgZmllbGQuIElmICcgKyAndGhlIGZpZWxkIHNob3VsZCBiZSBtdXRhYmxlIHVzZSBgZGVmYXVsdENoZWNrZWRgLiBPdGhlcndpc2UsICcgKyAnc2V0IGVpdGhlciBgb25DaGFuZ2VgIG9yIGByZWFkT25seWAuJyk7XG4gICAgfSxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbiAgLyoqXG4gICAqIFByb3ZpZGUgYSBsaW5rZWQgYHZhbHVlYCBhdHRyaWJ1dGUgZm9yIGNvbnRyb2xsZWQgZm9ybXMuIFlvdSBzaG91bGQgbm90IHVzZVxuICAgKiB0aGlzIG91dHNpZGUgb2YgdGhlIFJlYWN0RE9NIGNvbnRyb2xsZWQgZm9ybSBjb21wb25lbnRzLlxuICAgKi9cbiAgUmVhY3RDb250cm9sbGVkVmFsdWVQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcHMsIGdldFN0YWNrKSB7XG4gICAgZm9yICh2YXIgcHJvcE5hbWUgaW4gcHJvcFR5cGVzJDEpIHtcbiAgICAgIGlmIChwcm9wVHlwZXMkMS5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yID0gcHJvcFR5cGVzJDFbcHJvcE5hbWVdKHByb3BzLCBwcm9wTmFtZSwgdGFnTmFtZSwgJ3Byb3AnLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICB3YXJuaW5nJDIoZmFsc2UsICdGYWlsZWQgZm9ybSBwcm9wVHlwZTogJXMlcycsIGVycm9yLm1lc3NhZ2UsIGdldFN0YWNrKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxudmFyIFJlYWN0Q29udHJvbGxlZFZhbHVlUHJvcFR5cGVzXzEgPSBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlcztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgb21pdHRlZENsb3NlVGFnc1xuICovXG5cbi8vIEZvciBIVE1MLCBjZXJ0YWluIHRhZ3Mgc2hvdWxkIG9taXQgdGhlaXIgY2xvc2UgdGFnLiBXZSBrZWVwIGEgd2hpdGVsaXN0IGZvclxuLy8gdGhvc2Ugc3BlY2lhbC1jYXNlIHRhZ3MuXG5cbnZhciBvbWl0dGVkQ2xvc2VUYWdzID0ge1xuICBhcmVhOiB0cnVlLFxuICBiYXNlOiB0cnVlLFxuICBicjogdHJ1ZSxcbiAgY29sOiB0cnVlLFxuICBlbWJlZDogdHJ1ZSxcbiAgaHI6IHRydWUsXG4gIGltZzogdHJ1ZSxcbiAgaW5wdXQ6IHRydWUsXG4gIGtleWdlbjogdHJ1ZSxcbiAgbGluazogdHJ1ZSxcbiAgbWV0YTogdHJ1ZSxcbiAgcGFyYW06IHRydWUsXG4gIHNvdXJjZTogdHJ1ZSxcbiAgdHJhY2s6IHRydWUsXG4gIHdicjogdHJ1ZVxufTtcblxudmFyIG9taXR0ZWRDbG9zZVRhZ3NfMSA9IG9taXR0ZWRDbG9zZVRhZ3M7XG5cbi8vIEZvciBIVE1MLCBjZXJ0YWluIHRhZ3MgY2Fubm90IGhhdmUgY2hpbGRyZW4uIFRoaXMgaGFzIHRoZSBzYW1lIHB1cnBvc2UgYXNcbi8vIGBvbWl0dGVkQ2xvc2VUYWdzYCBleGNlcHQgdGhhdCBgbWVudWl0ZW1gIHNob3VsZCBzdGlsbCBoYXZlIGl0cyBjbG9zaW5nIHRhZy5cblxudmFyIHZvaWRFbGVtZW50VGFncyA9IG9iamVjdEFzc2lnbiQxKHtcbiAgbWVudWl0ZW06IHRydWVcbn0sIG9taXR0ZWRDbG9zZVRhZ3NfMSk7XG5cbnZhciB2b2lkRWxlbWVudFRhZ3NfMSA9IHZvaWRFbGVtZW50VGFncztcblxue1xuICB2YXIgd2FybmluZyQzID0gcmVxdWlyZSQkMDtcbn1cblxudmFyIEhUTUwgPSAnX19odG1sJztcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKGdldEN1cnJlbnRPd25lck5hbWUpIHtcbiAge1xuICAgIHZhciBvd25lck5hbWUgPSBnZXRDdXJyZW50T3duZXJOYW1lKCk7XG4gICAgaWYgKG93bmVyTmFtZSkge1xuICAgICAgLy8gVE9ETzogYWxzbyByZXBvcnQgdGhlIHN0YWNrLlxuICAgICAgcmV0dXJuICdcXG5cXG5UaGlzIERPTSBub2RlIHdhcyByZW5kZXJlZCBieSBgJyArIG93bmVyTmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gYXNzZXJ0VmFsaWRQcm9wcyh0YWcsIHByb3BzLCBnZXRDdXJyZW50T3duZXJOYW1lKSB7XG4gIGlmICghcHJvcHMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gTm90ZSB0aGUgdXNlIG9mIGA9PWAgd2hpY2ggY2hlY2tzIGZvciBudWxsIG9yIHVuZGVmaW5lZC5cbiAgaWYgKHZvaWRFbGVtZW50VGFnc18xW3RhZ10pIHtcbiAgICAhKHByb3BzLmNoaWxkcmVuID09IG51bGwgJiYgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwgPT0gbnVsbCkgPyBpbnZhcmlhbnQoZmFsc2UsICclcyBpcyBhIHZvaWQgZWxlbWVudCB0YWcgYW5kIG11c3QgbmVpdGhlciBoYXZlIGBjaGlsZHJlbmAgbm9yIHVzZSBgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLiVzJywgdGFnLCBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oZ2V0Q3VycmVudE93bmVyTmFtZSkpIDogdm9pZCAwO1xuICB9XG4gIGlmIChwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTCAhPSBudWxsKSB7XG4gICAgIShwcm9wcy5jaGlsZHJlbiA9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ0NhbiBvbmx5IHNldCBvbmUgb2YgYGNoaWxkcmVuYCBvciBgcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLicpIDogdm9pZCAwO1xuICAgICEodHlwZW9mIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MID09PSAnb2JqZWN0JyAmJiBIVE1MIGluIHByb3BzLmRhbmdlcm91c2x5U2V0SW5uZXJIVE1MKSA/IGludmFyaWFudChmYWxzZSwgJ2Bwcm9wcy5kYW5nZXJvdXNseVNldElubmVySFRNTGAgbXVzdCBiZSBpbiB0aGUgZm9ybSBge19faHRtbDogLi4ufWAuIFBsZWFzZSB2aXNpdCBodHRwczovL2ZiLm1lL3JlYWN0LWludmFyaWFudC1kYW5nZXJvdXNseS1zZXQtaW5uZXItaHRtbCBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nKSA6IHZvaWQgMDtcbiAgfVxuICB7XG4gICAgd2FybmluZyQzKHByb3BzLnN1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZyB8fCAhcHJvcHMuY29udGVudEVkaXRhYmxlIHx8IHByb3BzLmNoaWxkcmVuID09IG51bGwsICdBIGNvbXBvbmVudCBpcyBgY29udGVudEVkaXRhYmxlYCBhbmQgY29udGFpbnMgYGNoaWxkcmVuYCBtYW5hZ2VkIGJ5ICcgKyAnUmVhY3QuIEl0IGlzIG5vdyB5b3VyIHJlc3BvbnNpYmlsaXR5IHRvIGd1YXJhbnRlZSB0aGF0IG5vbmUgb2YgJyArICd0aG9zZSBub2RlcyBhcmUgdW5leHBlY3RlZGx5IG1vZGlmaWVkIG9yIGR1cGxpY2F0ZWQuIFRoaXMgaXMgJyArICdwcm9iYWJseSBub3QgaW50ZW50aW9uYWwuJyk7XG4gIH1cbiAgIShwcm9wcy5zdHlsZSA9PSBudWxsIHx8IHR5cGVvZiBwcm9wcy5zdHlsZSA9PT0gJ29iamVjdCcpID8gaW52YXJpYW50KGZhbHNlLCAnVGhlIGBzdHlsZWAgcHJvcCBleHBlY3RzIGEgbWFwcGluZyBmcm9tIHN0eWxlIHByb3BlcnRpZXMgdG8gdmFsdWVzLCBub3QgYSBzdHJpbmcuIEZvciBleGFtcGxlLCBzdHlsZT17e21hcmdpblJpZ2h0OiBzcGFjaW5nICsgXFwnZW1cXCd9fSB3aGVuIHVzaW5nIEpTWC4lcycsIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bShnZXRDdXJyZW50T3duZXJOYW1lKSkgOiB2b2lkIDA7XG59XG5cbnZhciBhc3NlcnRWYWxpZFByb3BzXzEgPSBhc3NlcnRWYWxpZFByb3BzO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBDU1NQcm9wZXJ0eVxuICovXG5cbi8qKlxuICogQ1NTIHByb3BlcnRpZXMgd2hpY2ggYWNjZXB0IG51bWJlcnMgYnV0IGFyZSBub3QgaW4gdW5pdHMgb2YgXCJweFwiLlxuICovXG5cbnZhciBpc1VuaXRsZXNzTnVtYmVyJDEgPSB7XG4gIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuICBib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcbiAgYm9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcbiAgYm94RmxleDogdHJ1ZSxcbiAgYm94RmxleEdyb3VwOiB0cnVlLFxuICBib3hPcmRpbmFsR3JvdXA6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBjb2x1bW5zOiB0cnVlLFxuICBmbGV4OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFBvc2l0aXZlOiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmbGV4TmVnYXRpdmU6IHRydWUsXG4gIGZsZXhPcmRlcjogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZFJvd0VuZDogdHJ1ZSxcbiAgZ3JpZFJvd1NwYW46IHRydWUsXG4gIGdyaWRSb3dTdGFydDogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZ3JpZENvbHVtbkVuZDogdHJ1ZSxcbiAgZ3JpZENvbHVtblNwYW46IHRydWUsXG4gIGdyaWRDb2x1bW5TdGFydDogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgbGluZUNsYW1wOiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgdGFiU2l6ZTogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWUsXG4gIHpvb206IHRydWUsXG5cbiAgLy8gU1ZHLXJlbGF0ZWQgcHJvcGVydGllc1xuICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgZmxvb2RPcGFjaXR5OiB0cnVlLFxuICBzdG9wT3BhY2l0eTogdHJ1ZSxcbiAgc3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuICBzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuICBzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuICBzdHJva2VPcGFjaXR5OiB0cnVlLFxuICBzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJlZml4IHZlbmRvci1zcGVjaWZpYyBwcmVmaXgsIGVnOiBXZWJraXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgc3R5bGUgbmFtZSwgZWc6IHRyYW5zaXRpb25EdXJhdGlvblxuICogQHJldHVybiB7c3RyaW5nfSBzdHlsZSBuYW1lIHByZWZpeGVkIHdpdGggYHByZWZpeGAsIHByb3Blcmx5IGNhbWVsQ2FzZWQsIGVnOlxuICogV2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHByZWZpeEtleShwcmVmaXgsIGtleSkge1xuICByZXR1cm4gcHJlZml4ICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxKTtcbn1cblxuLyoqXG4gKiBTdXBwb3J0IHN0eWxlIG5hbWVzIHRoYXQgbWF5IGNvbWUgcGFzc2VkIGluIHByZWZpeGVkIGJ5IGFkZGluZyBwZXJtdXRhdGlvbnNcbiAqIG9mIHZlbmRvciBwcmVmaXhlcy5cbiAqL1xudmFyIHByZWZpeGVzID0gWydXZWJraXQnLCAnbXMnLCAnTW96JywgJ08nXTtcblxuLy8gVXNpbmcgT2JqZWN0LmtleXMgaGVyZSwgb3IgZWxzZSB0aGUgdmFuaWxsYSBmb3ItaW4gbG9vcCBtYWtlcyBJRTggZ28gaW50byBhblxuLy8gaW5maW5pdGUgbG9vcCwgYmVjYXVzZSBpdCBpdGVyYXRlcyBvdmVyIHRoZSBuZXdseSBhZGRlZCBwcm9wcyB0b28uXG5PYmplY3Qua2V5cyhpc1VuaXRsZXNzTnVtYmVyJDEpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgcHJlZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgaXNVbml0bGVzc051bWJlciQxW3ByZWZpeEtleShwcmVmaXgsIHByb3ApXSA9IGlzVW5pdGxlc3NOdW1iZXIkMVtwcm9wXTtcbiAgfSk7XG59KTtcblxuLyoqXG4gKiBNb3N0IHN0eWxlIHByb3BlcnRpZXMgY2FuIGJlIHVuc2V0IGJ5IGRvaW5nIC5zdHlsZVtwcm9wXSA9ICcnIGJ1dCBJRThcbiAqIGRvZXNuJ3QgbGlrZSBkb2luZyB0aGF0IHdpdGggc2hvcnRoYW5kIHByb3BlcnRpZXMgc28gZm9yIHRoZSBwcm9wZXJ0aWVzIHRoYXRcbiAqIElFOCBicmVha3Mgb24sIHdoaWNoIGFyZSBsaXN0ZWQgaGVyZSwgd2UgaW5zdGVhZCB1bnNldCBlYWNoIG9mIHRoZVxuICogaW5kaXZpZHVhbCBwcm9wZXJ0aWVzLiBTZWUgaHR0cDovL2J1Z3MuanF1ZXJ5LmNvbS90aWNrZXQvMTIzODUuXG4gKiBUaGUgNC12YWx1ZSAnY2xvY2snIHByb3BlcnRpZXMgbGlrZSBtYXJnaW4sIHBhZGRpbmcsIGJvcmRlci13aWR0aCBzZWVtIHRvXG4gKiBiZWhhdmUgd2l0aG91dCBhbnkgcHJvYmxlbXMuIEN1cmlvdXNseSwgbGlzdC1zdHlsZSB3b3JrcyB0b28gd2l0aG91dCBhbnlcbiAqIHNwZWNpYWwgcHJvZGRpbmcuXG4gKi9cbnZhciBzaG9ydGhhbmRQcm9wZXJ0eUV4cGFuc2lvbnMgPSB7XG4gIGJhY2tncm91bmQ6IHtcbiAgICBiYWNrZ3JvdW5kQXR0YWNobWVudDogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IHRydWUsXG4gICAgYmFja2dyb3VuZEltYWdlOiB0cnVlLFxuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0OiB0cnVlXG4gIH0sXG4gIGJhY2tncm91bmRQb3NpdGlvbjoge1xuICAgIGJhY2tncm91bmRQb3NpdGlvblg6IHRydWUsXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uWTogdHJ1ZVxuICB9LFxuICBib3JkZXI6IHtcbiAgICBib3JkZXJXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJCb3R0b206IHtcbiAgICBib3JkZXJCb3R0b21XaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21TdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJCb3R0b21Db2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJMZWZ0OiB7XG4gICAgYm9yZGVyTGVmdFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlckxlZnRTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJMZWZ0Q29sb3I6IHRydWVcbiAgfSxcbiAgYm9yZGVyUmlnaHQ6IHtcbiAgICBib3JkZXJSaWdodFdpZHRoOiB0cnVlLFxuICAgIGJvcmRlclJpZ2h0U3R5bGU6IHRydWUsXG4gICAgYm9yZGVyUmlnaHRDb2xvcjogdHJ1ZVxuICB9LFxuICBib3JkZXJUb3A6IHtcbiAgICBib3JkZXJUb3BXaWR0aDogdHJ1ZSxcbiAgICBib3JkZXJUb3BTdHlsZTogdHJ1ZSxcbiAgICBib3JkZXJUb3BDb2xvcjogdHJ1ZVxuICB9LFxuICBmb250OiB7XG4gICAgZm9udFN0eWxlOiB0cnVlLFxuICAgIGZvbnRWYXJpYW50OiB0cnVlLFxuICAgIGZvbnRXZWlnaHQ6IHRydWUsXG4gICAgZm9udFNpemU6IHRydWUsXG4gICAgbGluZUhlaWdodDogdHJ1ZSxcbiAgICBmb250RmFtaWx5OiB0cnVlXG4gIH0sXG4gIG91dGxpbmU6IHtcbiAgICBvdXRsaW5lV2lkdGg6IHRydWUsXG4gICAgb3V0bGluZVN0eWxlOiB0cnVlLFxuICAgIG91dGxpbmVDb2xvcjogdHJ1ZVxuICB9XG59O1xuXG52YXIgQ1NTUHJvcGVydHkgPSB7XG4gIGlzVW5pdGxlc3NOdW1iZXI6IGlzVW5pdGxlc3NOdW1iZXIkMSxcbiAgc2hvcnRoYW5kUHJvcGVydHlFeHBhbnNpb25zOiBzaG9ydGhhbmRQcm9wZXJ0eUV4cGFuc2lvbnNcbn07XG5cbnZhciBDU1NQcm9wZXJ0eV8xID0gQ1NTUHJvcGVydHk7XG5cbnZhciBpc1VuaXRsZXNzTnVtYmVyID0gQ1NTUHJvcGVydHlfMS5pc1VuaXRsZXNzTnVtYmVyO1xuXG4vKipcbiAqIENvbnZlcnQgYSB2YWx1ZSBpbnRvIHRoZSBwcm9wZXIgY3NzIHdyaXRhYmxlIHZhbHVlLiBUaGUgc3R5bGUgbmFtZSBgbmFtZWBcbiAqIHNob3VsZCBiZSBsb2dpY2FsIChubyBoeXBoZW5zKSwgYXMgc3BlY2lmaWVkXG4gKiBpbiBgQ1NTUHJvcGVydHkuaXNVbml0bGVzc051bWJlcmAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgQ1NTIHByb3BlcnR5IG5hbWUgc3VjaCBhcyBgdG9wTWFyZ2luYC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQ1NTIHByb3BlcnR5IHZhbHVlIHN1Y2ggYXMgYDEwcHhgLlxuICogQHJldHVybiB7c3RyaW5nfSBOb3JtYWxpemVkIHN0eWxlIHZhbHVlIHdpdGggZGltZW5zaW9ucyBhcHBsaWVkLlxuICovXG5mdW5jdGlvbiBkYW5nZXJvdXNTdHlsZVZhbHVlKG5hbWUsIHZhbHVlLCBpc0N1c3RvbVByb3BlcnR5KSB7XG4gIC8vIE5vdGUgdGhhdCB3ZSd2ZSByZW1vdmVkIGVzY2FwZVRleHRGb3JCcm93c2VyKCkgY2FsbHMgaGVyZSBzaW5jZSB0aGVcbiAgLy8gd2hvbGUgc3RyaW5nIHdpbGwgYmUgZXNjYXBlZCB3aGVuIHRoZSBhdHRyaWJ1dGUgaXMgaW5qZWN0ZWQgaW50b1xuICAvLyB0aGUgbWFya3VwLiBJZiB5b3UgcHJvdmlkZSB1bnNhZmUgdXNlciBkYXRhIGhlcmUgdGhleSBjYW4gaW5qZWN0XG4gIC8vIGFyYml0cmFyeSBDU1Mgd2hpY2ggbWF5IGJlIHByb2JsZW1hdGljIChJIGNvdWxkbid0IHJlcHJvIHRoaXMpOlxuICAvLyBodHRwczovL3d3dy5vd2FzcC5vcmcvaW5kZXgucGhwL1hTU19GaWx0ZXJfRXZhc2lvbl9DaGVhdF9TaGVldFxuICAvLyBodHRwOi8vd3d3LnRoZXNwYW5uZXIuY28udWsvMjAwNy8xMS8yNi91bHRpbWF0ZS14c3MtY3NzLWluamVjdGlvbi9cbiAgLy8gVGhpcyBpcyBub3QgYW4gWFNTIGhvbGUgYnV0IGluc3RlYWQgYSBwb3RlbnRpYWwgQ1NTIGluamVjdGlvbiBpc3N1ZVxuICAvLyB3aGljaCBoYXMgbGVhZCB0byBhIGdyZWF0ZXIgZGlzY3Vzc2lvbiBhYm91dCBob3cgd2UncmUgZ29pbmcgdG9cbiAgLy8gdHJ1c3QgVVJMcyBtb3ZpbmcgZm9yd2FyZC4gU2VlICMyMTE1OTAxXG5cbiAgdmFyIGlzRW1wdHkgPSB2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlID09PSAnJztcbiAgaWYgKGlzRW1wdHkpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpZiAoIWlzQ3VzdG9tUHJvcGVydHkgJiYgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiB2YWx1ZSAhPT0gMCAmJiAhKGlzVW5pdGxlc3NOdW1iZXIuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgaXNVbml0bGVzc051bWJlcltuYW1lXSkpIHtcbiAgICByZXR1cm4gdmFsdWUgKyAncHgnOyAvLyBQcmVzdW1lcyBpbXBsaWNpdCAncHgnIHN1ZmZpeCBmb3IgdW5pdGxlc3MgbnVtYmVyc1xuICB9XG5cbiAgcmV0dXJuICgnJyArIHZhbHVlKS50cmltKCk7XG59XG5cbnZhciBkYW5nZXJvdXNTdHlsZVZhbHVlXzEgPSBkYW5nZXJvdXNTdHlsZVZhbHVlO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpc0N1c3RvbUNvbXBvbmVudFxuICogXG4gKi9cblxuZnVuY3Rpb24gaXNDdXN0b21Db21wb25lbnQodGFnTmFtZSwgcHJvcHMpIHtcbiAgaWYgKHRhZ05hbWUuaW5kZXhPZignLScpID09PSAtMSkge1xuICAgIHJldHVybiB0eXBlb2YgcHJvcHMuaXMgPT09ICdzdHJpbmcnO1xuICB9XG4gIHN3aXRjaCAodGFnTmFtZSkge1xuICAgIC8vIFRoZXNlIGFyZSByZXNlcnZlZCBTVkcgYW5kIE1hdGhNTCBlbGVtZW50cy5cbiAgICAvLyBXZSBkb24ndCBtaW5kIHRoaXMgd2hpdGVsaXN0IHRvbyBtdWNoIGJlY2F1c2Ugd2UgZXhwZWN0IGl0IHRvIG5ldmVyIGdyb3cuXG4gICAgLy8gVGhlIGFsdGVybmF0aXZlIGlzIHRvIHRyYWNrIHRoZSBuYW1lc3BhY2UgaW4gYSBmZXcgcGxhY2VzIHdoaWNoIGlzIGNvbnZvbHV0ZWQuXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYmNvbXBvbmVudHMvc3BlYy9jdXN0b20vI2N1c3RvbS1lbGVtZW50cy1jb3JlLWNvbmNlcHRzXG4gICAgY2FzZSAnYW5ub3RhdGlvbi14bWwnOlxuICAgIGNhc2UgJ2NvbG9yLXByb2ZpbGUnOlxuICAgIGNhc2UgJ2ZvbnQtZmFjZSc6XG4gICAgY2FzZSAnZm9udC1mYWNlLXNyYyc6XG4gICAgY2FzZSAnZm9udC1mYWNlLXVyaSc6XG4gICAgY2FzZSAnZm9udC1mYWNlLWZvcm1hdCc6XG4gICAgY2FzZSAnZm9udC1mYWNlLW5hbWUnOlxuICAgIGNhc2UgJ21pc3NpbmctZ2x5cGgnOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG52YXIgaXNDdXN0b21Db21wb25lbnRfMSA9IGlzQ3VzdG9tQ29tcG9uZW50O1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBnZXRDb21wb25lbnROYW1lXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lJDIoaW5zdGFuY2VPckZpYmVyKSB7XG4gIGlmICh0eXBlb2YgaW5zdGFuY2VPckZpYmVyLmdldE5hbWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBTdGFjayByZWNvbmNpbGVyXG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VPckZpYmVyO1xuICAgIHJldHVybiBpbnN0YW5jZS5nZXROYW1lKCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbnN0YW5jZU9yRmliZXIudGFnID09PSAnbnVtYmVyJykge1xuICAgIC8vIEZpYmVyIHJlY29uY2lsZXJcbiAgICB2YXIgZmliZXIgPSBpbnN0YW5jZU9yRmliZXI7XG4gICAgdmFyIHR5cGUgPSBmaWJlci50eXBlO1xuXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIGdldENvbXBvbmVudE5hbWVfMSA9IGdldENvbXBvbmVudE5hbWUkMjtcblxudmFyIFJlYWN0SW50ZXJuYWxzID0gcmVhY3QuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ7XG5cbnZhciBSZWFjdEdsb2JhbFNoYXJlZFN0YXRlID0ge1xuICBSZWFjdEN1cnJlbnRPd25lcjogUmVhY3RJbnRlcm5hbHMuUmVhY3RDdXJyZW50T3duZXJcbn07XG5cbntcbiAgb2JqZWN0QXNzaWduJDEoUmVhY3RHbG9iYWxTaGFyZWRTdGF0ZSwge1xuICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IFJlYWN0SW50ZXJuYWxzLlJlYWN0Q29tcG9uZW50VHJlZUhvb2ssXG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTogUmVhY3RJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZVxuICB9KTtcbn1cblxudmFyIFJlYWN0R2xvYmFsU2hhcmVkU3RhdGVfMSA9IFJlYWN0R2xvYmFsU2hhcmVkU3RhdGU7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIFJlYWN0VHlwZU9mV29ya1xuICogXG4gKi9cblxudmFyIFJlYWN0VHlwZU9mV29yayA9IHtcbiAgSW5kZXRlcm1pbmF0ZUNvbXBvbmVudDogMCwgLy8gQmVmb3JlIHdlIGtub3cgd2hldGhlciBpdCBpcyBmdW5jdGlvbmFsIG9yIGNsYXNzXG4gIEZ1bmN0aW9uYWxDb21wb25lbnQ6IDEsXG4gIENsYXNzQ29tcG9uZW50OiAyLFxuICBIb3N0Um9vdDogMywgLy8gUm9vdCBvZiBhIGhvc3QgdHJlZS4gQ291bGQgYmUgbmVzdGVkIGluc2lkZSBhbm90aGVyIG5vZGUuXG4gIEhvc3RQb3J0YWw6IDQsIC8vIEEgc3VidHJlZS4gQ291bGQgYmUgYW4gZW50cnkgcG9pbnQgdG8gYSBkaWZmZXJlbnQgcmVuZGVyZXIuXG4gIEhvc3RDb21wb25lbnQ6IDUsXG4gIEhvc3RUZXh0OiA2LFxuICBDb3JvdXRpbmVDb21wb25lbnQ6IDcsXG4gIENvcm91dGluZUhhbmRsZXJQaGFzZTogOCxcbiAgWWllbGRDb21wb25lbnQ6IDksXG4gIEZyYWdtZW50OiAxMFxufTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqIEBwcm92aWRlc01vZHVsZSBkZXNjcmliZUNvbXBvbmVudEZyYW1lXG4gKi9cblxudmFyIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUkMSA9IGZ1bmN0aW9uIChuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufTtcblxudmFyIEluZGV0ZXJtaW5hdGVDb21wb25lbnQgPSBSZWFjdFR5cGVPZldvcmsuSW5kZXRlcm1pbmF0ZUNvbXBvbmVudDtcbnZhciBGdW5jdGlvbmFsQ29tcG9uZW50ID0gUmVhY3RUeXBlT2ZXb3JrLkZ1bmN0aW9uYWxDb21wb25lbnQ7XG52YXIgQ2xhc3NDb21wb25lbnQgPSBSZWFjdFR5cGVPZldvcmsuQ2xhc3NDb21wb25lbnQ7XG52YXIgSG9zdENvbXBvbmVudCA9IFJlYWN0VHlwZU9mV29yay5Ib3N0Q29tcG9uZW50O1xuXG5cblxuXG5mdW5jdGlvbiBkZXNjcmliZUZpYmVyKGZpYmVyKSB7XG4gIHN3aXRjaCAoZmliZXIudGFnKSB7XG4gICAgY2FzZSBJbmRldGVybWluYXRlQ29tcG9uZW50OlxuICAgIGNhc2UgRnVuY3Rpb25hbENvbXBvbmVudDpcbiAgICBjYXNlIENsYXNzQ29tcG9uZW50OlxuICAgIGNhc2UgSG9zdENvbXBvbmVudDpcbiAgICAgIHZhciBvd25lciA9IGZpYmVyLl9kZWJ1Z093bmVyO1xuICAgICAgdmFyIHNvdXJjZSA9IGZpYmVyLl9kZWJ1Z1NvdXJjZTtcbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZV8xKGZpYmVyKTtcbiAgICAgIHZhciBvd25lck5hbWUgPSBudWxsO1xuICAgICAgaWYgKG93bmVyKSB7XG4gICAgICAgIG93bmVyTmFtZSA9IGdldENvbXBvbmVudE5hbWVfMShvd25lcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVzY3JpYmVDb21wb25lbnRGcmFtZSQxKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gY2FuIG9ubHkgYmUgY2FsbGVkIHdpdGggYSB3b3JrLWluLXByb2dyZXNzIGZpYmVyIGFuZFxuLy8gb25seSBkdXJpbmcgYmVnaW4gb3IgY29tcGxldGUgcGhhc2UuIERvIG5vdCBjYWxsIGl0IHVuZGVyIGFueSBvdGhlclxuLy8gY2lyY3Vtc3RhbmNlcy5cbmZ1bmN0aW9uIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIkMSh3b3JrSW5Qcm9ncmVzcykge1xuICB2YXIgaW5mbyA9ICcnO1xuICB2YXIgbm9kZSA9IHdvcmtJblByb2dyZXNzO1xuICBkbyB7XG4gICAgaW5mbyArPSBkZXNjcmliZUZpYmVyKG5vZGUpO1xuICAgIC8vIE90aGVyd2lzZSB0aGlzIHJldHVybiBwb2ludGVyIG1pZ2h0IHBvaW50IHRvIHRoZSB3cm9uZyB0cmVlOlxuICAgIG5vZGUgPSBub2RlWydyZXR1cm4nXTtcbiAgfSB3aGlsZSAobm9kZSk7XG4gIHJldHVybiBpbmZvO1xufVxuXG52YXIgUmVhY3RGaWJlckNvbXBvbmVudFRyZWVIb29rID0ge1xuICBnZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyOiBnZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyJDFcbn07XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEgPSBSZWFjdEdsb2JhbFNoYXJlZFN0YXRlXzEuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxue1xuICB2YXIgZ2V0Q29tcG9uZW50TmFtZSQzID0gZ2V0Q29tcG9uZW50TmFtZV8xO1xuXG4gIHZhciBfcmVxdWlyZTIkMSA9IFJlYWN0RmliZXJDb21wb25lbnRUcmVlSG9vayxcbiAgICAgIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIgPSBfcmVxdWlyZTIkMS5nZXRTdGFja0FkZGVuZHVtQnlXb3JrSW5Qcm9ncmVzc0ZpYmVyO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RmliZXJPd25lck5hbWUkMSgpIHtcbiAge1xuICAgIHZhciBmaWJlciA9IFJlYWN0RGVidWdDdXJyZW50RmliZXIuY3VycmVudDtcbiAgICBpZiAoZmliZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoZmliZXIuX2RlYnVnT3duZXIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUkMyhmaWJlci5fZGVidWdPd25lcik7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RmliZXJTdGFja0FkZGVuZHVtKCkge1xuICB7XG4gICAgdmFyIGZpYmVyID0gUmVhY3REZWJ1Z0N1cnJlbnRGaWJlci5jdXJyZW50O1xuICAgIGlmIChmaWJlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIFNhZmUgYmVjYXVzZSBpZiBjdXJyZW50IGZpYmVyIGV4aXN0cywgd2UgYXJlIHJlY29uY2lsaW5nLFxuICAgIC8vIGFuZCBpdCBpcyBndWFyYW50ZWVkIHRvIGJlIHRoZSB3b3JrLWluLXByb2dyZXNzIHZlcnNpb24uXG4gICAgcmV0dXJuIGdldFN0YWNrQWRkZW5kdW1CeVdvcmtJblByb2dyZXNzRmliZXIoZmliZXIpO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiByZXNldEN1cnJlbnRGaWJlcigpIHtcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG4gIFJlYWN0RGVidWdDdXJyZW50RmliZXIuY3VycmVudCA9IG51bGw7XG4gIFJlYWN0RGVidWdDdXJyZW50RmliZXIucGhhc2UgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50RmliZXIoZmliZXIsIHBoYXNlKSB7XG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMS5nZXRDdXJyZW50U3RhY2sgPSBnZXRDdXJyZW50RmliZXJTdGFja0FkZGVuZHVtO1xuICBSZWFjdERlYnVnQ3VycmVudEZpYmVyLmN1cnJlbnQgPSBmaWJlcjtcbiAgUmVhY3REZWJ1Z0N1cnJlbnRGaWJlci5waGFzZSA9IHBoYXNlO1xufVxuXG52YXIgUmVhY3REZWJ1Z0N1cnJlbnRGaWJlciA9IHtcbiAgY3VycmVudDogbnVsbCxcbiAgcGhhc2U6IG51bGwsXG4gIHJlc2V0Q3VycmVudEZpYmVyOiByZXNldEN1cnJlbnRGaWJlcixcbiAgc2V0Q3VycmVudEZpYmVyOiBzZXRDdXJyZW50RmliZXIsXG4gIGdldEN1cnJlbnRGaWJlck93bmVyTmFtZTogZ2V0Q3VycmVudEZpYmVyT3duZXJOYW1lJDEsXG4gIGdldEN1cnJlbnRGaWJlclN0YWNrQWRkZW5kdW06IGdldEN1cnJlbnRGaWJlclN0YWNrQWRkZW5kdW1cbn07XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZpYmVyXzEgPSBSZWFjdERlYnVnQ3VycmVudEZpYmVyO1xuXG52YXIgd2FyblZhbGlkU3R5bGUkMSA9IGVtcHR5RnVuY3Rpb247XG5cbntcbiAgdmFyIGNhbWVsaXplU3R5bGVOYW1lJDEgPSBjYW1lbGl6ZVN0eWxlTmFtZTtcbiAgdmFyIGdldENvbXBvbmVudE5hbWUkMSA9IGdldENvbXBvbmVudE5hbWVfMTtcbiAgdmFyIHdhcm5pbmckNCA9IHJlcXVpcmUkJDA7XG5cbiAgdmFyIF9yZXF1aXJlID0gUmVhY3REZWJ1Z0N1cnJlbnRGaWJlcl8xLFxuICAgICAgZ2V0Q3VycmVudEZpYmVyT3duZXJOYW1lID0gX3JlcXVpcmUuZ2V0Q3VycmVudEZpYmVyT3duZXJOYW1lO1xuXG4gIC8vICdtc1RyYW5zZm9ybScgaXMgY29ycmVjdCwgYnV0IHRoZSBvdGhlciBwcmVmaXhlcyBzaG91bGQgYmUgY2FwaXRhbGl6ZWRcblxuXG4gIHZhciBiYWRWZW5kb3JlZFN0eWxlTmFtZVBhdHRlcm4gPSAvXig/OndlYmtpdHxtb3p8bylbQS1aXS87XG5cbiAgLy8gc3R5bGUgdmFsdWVzIHNob3VsZG4ndCBjb250YWluIGEgc2VtaWNvbG9uXG4gIHZhciBiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4gPSAvO1xccyokLztcblxuICB2YXIgd2FybmVkU3R5bGVOYW1lcyA9IHt9O1xuICB2YXIgd2FybmVkU3R5bGVWYWx1ZXMgPSB7fTtcbiAgdmFyIHdhcm5lZEZvck5hTlZhbHVlID0gZmFsc2U7XG4gIHZhciB3YXJuZWRGb3JJbmZpbml0eVZhbHVlID0gZmFsc2U7XG5cbiAgdmFyIHdhcm5IeXBoZW5hdGVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgIHdhcm5pbmckNChmYWxzZSwgJ1Vuc3VwcG9ydGVkIHN0eWxlIHByb3BlcnR5ICVzLiBEaWQgeW91IG1lYW4gJXM/JXMnLCBuYW1lLCBjYW1lbGl6ZVN0eWxlTmFtZSQxKG5hbWUpLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpKTtcbiAgfTtcblxuICB2YXIgd2FybkJhZFZlbmRvcmVkU3R5bGVOYW1lID0gZnVuY3Rpb24gKG5hbWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlTmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgd2FybmVkU3R5bGVOYW1lc1tuYW1lXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZFN0eWxlTmFtZXNbbmFtZV0gPSB0cnVlO1xuICAgIHdhcm5pbmckNChmYWxzZSwgJ1Vuc3VwcG9ydGVkIHZlbmRvci1wcmVmaXhlZCBzdHlsZSBwcm9wZXJ0eSAlcy4gRGlkIHlvdSBtZWFuICVzPyVzJywgbmFtZSwgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSksIGNoZWNrUmVuZGVyTWVzc2FnZShvd25lcikpO1xuICB9O1xuXG4gIHZhciB3YXJuU3R5bGVWYWx1ZVdpdGhTZW1pY29sb24gPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIG93bmVyKSB7XG4gICAgaWYgKHdhcm5lZFN0eWxlVmFsdWVzLmhhc093blByb3BlcnR5KHZhbHVlKSAmJiB3YXJuZWRTdHlsZVZhbHVlc1t2YWx1ZV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRTdHlsZVZhbHVlc1t2YWx1ZV0gPSB0cnVlO1xuICAgIHdhcm5pbmckNChmYWxzZSwgXCJTdHlsZSBwcm9wZXJ0eSB2YWx1ZXMgc2hvdWxkbid0IGNvbnRhaW4gYSBzZW1pY29sb24uJXMgXCIgKyAnVHJ5IFwiJXM6ICVzXCIgaW5zdGVhZC4nLCBjaGVja1JlbmRlck1lc3NhZ2Uob3duZXIpLCBuYW1lLCB2YWx1ZS5yZXBsYWNlKGJhZFN0eWxlVmFsdWVXaXRoU2VtaWNvbG9uUGF0dGVybiwgJycpKTtcbiAgfTtcblxuICB2YXIgd2FyblN0eWxlVmFsdWVJc05hTiA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkRm9yTmFOVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3YXJuZWRGb3JOYU5WYWx1ZSA9IHRydWU7XG4gICAgd2FybmluZyQ0KGZhbHNlLCAnYE5hTmAgaXMgYW4gaW52YWxpZCB2YWx1ZSBmb3IgdGhlIGAlc2AgY3NzIHN0eWxlIHByb3BlcnR5LiVzJywgbmFtZSwgY2hlY2tSZW5kZXJNZXNzYWdlKG93bmVyKSk7XG4gIH07XG5cbiAgdmFyIHdhcm5TdHlsZVZhbHVlSXNJbmZpbml0eSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgb3duZXIpIHtcbiAgICBpZiAod2FybmVkRm9ySW5maW5pdHlWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdhcm5lZEZvckluZmluaXR5VmFsdWUgPSB0cnVlO1xuICAgIHdhcm5pbmckNChmYWxzZSwgJ2BJbmZpbml0eWAgaXMgYW4gaW52YWxpZCB2YWx1ZSBmb3IgdGhlIGAlc2AgY3NzIHN0eWxlIHByb3BlcnR5LiVzJywgbmFtZSwgY2hlY2tSZW5kZXJNZXNzYWdlKG93bmVyKSk7XG4gIH07XG5cbiAgdmFyIGNoZWNrUmVuZGVyTWVzc2FnZSA9IGZ1bmN0aW9uIChvd25lcikge1xuICAgIHZhciBvd25lck5hbWU7XG4gICAgaWYgKG93bmVyICE9IG51bGwpIHtcbiAgICAgIC8vIFN0YWNrIHBhc3NlcyB0aGUgb3duZXIgbWFudWFsbHkgYWxsIHRoZSB3YXkgdG8gQ1NTUHJvcGVydHlPcGVyYXRpb25zLlxuICAgICAgb3duZXJOYW1lID0gZ2V0Q29tcG9uZW50TmFtZSQxKG93bmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmliZXIgZG9lc24ndCBwYXNzIGl0IGJ1dCB1c2VzIFJlYWN0RGVidWdDdXJyZW50RmliZXIgdG8gdHJhY2sgaXQuXG4gICAgICAvLyBJdCBpcyBvbmx5IGVuYWJsZWQgaW4gZGV2ZWxvcG1lbnQgYW5kIHRyYWNrcyBob3N0IGNvbXBvbmVudHMgdG9vLlxuICAgICAgb3duZXJOYW1lID0gZ2V0Q3VycmVudEZpYmVyT3duZXJOYW1lKCk7XG4gICAgICAvLyBUT0RPOiBhbHNvIHJlcG9ydCB0aGUgc3RhY2suXG4gICAgfVxuICAgIGlmIChvd25lck5hbWUpIHtcbiAgICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBvd25lck5hbWUgKyAnYC4nO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH07XG5cbiAgd2FyblZhbGlkU3R5bGUkMSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgY29tcG9uZW50KSB7XG4gICAgdmFyIG93bmVyO1xuICAgIGlmIChjb21wb25lbnQpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgb25seSB3b3JrcyB3aXRoIFN0YWNrLiBTZWVtcyBsaWtlIHdlIG5lZWQgdG8gYWRkIHVuaXQgdGVzdHM/XG4gICAgICBvd25lciA9IGNvbXBvbmVudC5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuICAgIH1cbiAgICBpZiAobmFtZS5pbmRleE9mKCctJykgPiAtMSkge1xuICAgICAgd2Fybkh5cGhlbmF0ZWRTdHlsZU5hbWUobmFtZSwgb3duZXIpO1xuICAgIH0gZWxzZSBpZiAoYmFkVmVuZG9yZWRTdHlsZU5hbWVQYXR0ZXJuLnRlc3QobmFtZSkpIHtcbiAgICAgIHdhcm5CYWRWZW5kb3JlZFN0eWxlTmFtZShuYW1lLCBvd25lcik7XG4gICAgfSBlbHNlIGlmIChiYWRTdHlsZVZhbHVlV2l0aFNlbWljb2xvblBhdHRlcm4udGVzdCh2YWx1ZSkpIHtcbiAgICAgIHdhcm5TdHlsZVZhbHVlV2l0aFNlbWljb2xvbihuYW1lLCB2YWx1ZSwgb3duZXIpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgIHdhcm5TdHlsZVZhbHVlSXNOYU4obmFtZSwgdmFsdWUsIG93bmVyKTtcbiAgICAgIH0gZWxzZSBpZiAoIWlzRmluaXRlKHZhbHVlKSkge1xuICAgICAgICB3YXJuU3R5bGVWYWx1ZUlzSW5maW5pdHkobmFtZSwgdmFsdWUsIG93bmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbnZhciB3YXJuVmFsaWRTdHlsZV8xID0gd2FyblZhbGlkU3R5bGUkMTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgdmFsaWRBcmlhUHJvcGVydGllc1xuICovXG5cbnZhciBhcmlhUHJvcGVydGllcyA9IHtcbiAgJ2FyaWEtY3VycmVudCc6IDAsIC8vIHN0YXRlXG4gICdhcmlhLWRldGFpbHMnOiAwLFxuICAnYXJpYS1kaXNhYmxlZCc6IDAsIC8vIHN0YXRlXG4gICdhcmlhLWhpZGRlbic6IDAsIC8vIHN0YXRlXG4gICdhcmlhLWludmFsaWQnOiAwLCAvLyBzdGF0ZVxuICAnYXJpYS1rZXlzaG9ydGN1dHMnOiAwLFxuICAnYXJpYS1sYWJlbCc6IDAsXG4gICdhcmlhLXJvbGVkZXNjcmlwdGlvbic6IDAsXG4gIC8vIFdpZGdldCBBdHRyaWJ1dGVzXG4gICdhcmlhLWF1dG9jb21wbGV0ZSc6IDAsXG4gICdhcmlhLWNoZWNrZWQnOiAwLFxuICAnYXJpYS1leHBhbmRlZCc6IDAsXG4gICdhcmlhLWhhc3BvcHVwJzogMCxcbiAgJ2FyaWEtbGV2ZWwnOiAwLFxuICAnYXJpYS1tb2RhbCc6IDAsXG4gICdhcmlhLW11bHRpbGluZSc6IDAsXG4gICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6IDAsXG4gICdhcmlhLW9yaWVudGF0aW9uJzogMCxcbiAgJ2FyaWEtcGxhY2Vob2xkZXInOiAwLFxuICAnYXJpYS1wcmVzc2VkJzogMCxcbiAgJ2FyaWEtcmVhZG9ubHknOiAwLFxuICAnYXJpYS1yZXF1aXJlZCc6IDAsXG4gICdhcmlhLXNlbGVjdGVkJzogMCxcbiAgJ2FyaWEtc29ydCc6IDAsXG4gICdhcmlhLXZhbHVlbWF4JzogMCxcbiAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxuICAnYXJpYS12YWx1ZW5vdyc6IDAsXG4gICdhcmlhLXZhbHVldGV4dCc6IDAsXG4gIC8vIExpdmUgUmVnaW9uIEF0dHJpYnV0ZXNcbiAgJ2FyaWEtYXRvbWljJzogMCxcbiAgJ2FyaWEtYnVzeSc6IDAsXG4gICdhcmlhLWxpdmUnOiAwLFxuICAnYXJpYS1yZWxldmFudCc6IDAsXG4gIC8vIERyYWctYW5kLURyb3AgQXR0cmlidXRlc1xuICAnYXJpYS1kcm9wZWZmZWN0JzogMCxcbiAgJ2FyaWEtZ3JhYmJlZCc6IDAsXG4gIC8vIFJlbGF0aW9uc2hpcCBBdHRyaWJ1dGVzXG4gICdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnOiAwLFxuICAnYXJpYS1jb2xjb3VudCc6IDAsXG4gICdhcmlhLWNvbGluZGV4JzogMCxcbiAgJ2FyaWEtY29sc3Bhbic6IDAsXG4gICdhcmlhLWNvbnRyb2xzJzogMCxcbiAgJ2FyaWEtZGVzY3JpYmVkYnknOiAwLFxuICAnYXJpYS1lcnJvcm1lc3NhZ2UnOiAwLFxuICAnYXJpYS1mbG93dG8nOiAwLFxuICAnYXJpYS1sYWJlbGxlZGJ5JzogMCxcbiAgJ2FyaWEtb3ducyc6IDAsXG4gICdhcmlhLXBvc2luc2V0JzogMCxcbiAgJ2FyaWEtcm93Y291bnQnOiAwLFxuICAnYXJpYS1yb3dpbmRleCc6IDAsXG4gICdhcmlhLXJvd3NwYW4nOiAwLFxuICAnYXJpYS1zZXRzaXplJzogMFxufTtcblxudmFyIHZhbGlkQXJpYVByb3BlcnRpZXMkMSA9IGFyaWFQcm9wZXJ0aWVzO1xuXG52YXIgd2FybmVkUHJvcGVydGllcyA9IHt9O1xudmFyIHJBUklBID0gbmV3IFJlZ0V4cCgnXihhcmlhKS1bJyArIERPTVByb3BlcnR5XzEuQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbnZhciByQVJJQUNhbWVsID0gbmV3IFJlZ0V4cCgnXihhcmlhKVtBLVpdWycgKyBET01Qcm9wZXJ0eV8xLkFUVFJJQlVURV9OQU1FX0NIQVIgKyAnXSokJyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbntcbiAgdmFyIHdhcm5pbmckNSA9IHJlcXVpcmUkJDA7XG5cbiAgdmFyIF9yZXF1aXJlJDEgPSBSZWFjdEdsb2JhbFNoYXJlZFN0YXRlXzEsXG4gICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gX3JlcXVpcmUkMS5SZWFjdENvbXBvbmVudFRyZWVIb29rLFxuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQyID0gX3JlcXVpcmUkMS5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuXG4gIHZhciBnZXRTdGFja0FkZGVuZHVtQnlJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ7XG5cblxuICB2YXIgdmFsaWRBcmlhUHJvcGVydGllcyA9IHZhbGlkQXJpYVByb3BlcnRpZXMkMTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhY2tBZGRlbmR1bSQxKGRlYnVnSUQpIHtcbiAgaWYgKGRlYnVnSUQgIT0gbnVsbCkge1xuICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuIG9uIFN0YWNrXG4gICAgcmV0dXJuIGdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuIG9uIEZpYmVyIC8gU2VydmVyXG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQyLmdldFN0YWNrQWRkZW5kdW0oKTtcbiAgICByZXR1cm4gc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wZXJ0eSh0YWdOYW1lLCBuYW1lLCBkZWJ1Z0lEKSB7XG4gIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHdhcm5lZFByb3BlcnRpZXMsIG5hbWUpICYmIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChyQVJJQUNhbWVsLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgYXJpYU5hbWUgPSAnYXJpYS0nICsgbmFtZS5zbGljZSg0KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBjb3JyZWN0TmFtZSA9IHZhbGlkQXJpYVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoYXJpYU5hbWUpID8gYXJpYU5hbWUgOiBudWxsO1xuXG4gICAgLy8gSWYgdGhpcyBpcyBhbiBhcmlhLSogYXR0cmlidXRlLCBidXQgaXMgbm90IGxpc3RlZCBpbiB0aGUga25vd24gRE9NXG4gICAgLy8gRE9NIHByb3BlcnRpZXMsIHRoZW4gaXQgaXMgYW4gaW52YWxpZCBhcmlhLSogYXR0cmlidXRlLlxuICAgIGlmIChjb3JyZWN0TmFtZSA9PSBudWxsKSB7XG4gICAgICB3YXJuaW5nJDUoZmFsc2UsICdJbnZhbGlkIEFSSUEgYXR0cmlidXRlIGAlc2AuIEFSSUEgYXR0cmlidXRlcyBmb2xsb3cgdGhlIHBhdHRlcm4gYXJpYS0qIGFuZCBtdXN0IGJlIGxvd2VyY2FzZS4lcycsIG5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMShkZWJ1Z0lEKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBhcmlhLSogYXR0cmlidXRlcyBzaG91bGQgYmUgbG93ZXJjYXNlOyBzdWdnZXN0IHRoZSBsb3dlcmNhc2UgdmVyc2lvbi5cbiAgICBpZiAobmFtZSAhPT0gY29ycmVjdE5hbWUpIHtcbiAgICAgIHdhcm5pbmckNShmYWxzZSwgJ0ludmFsaWQgQVJJQSBhdHRyaWJ1dGUgYCVzYC4gRGlkIHlvdSBtZWFuIGAlc2A/JXMnLCBuYW1lLCBjb3JyZWN0TmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQxKGRlYnVnSUQpKTtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXNbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHJBUklBLnRlc3QobmFtZSkpIHtcbiAgICB2YXIgbG93ZXJDYXNlZE5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHN0YW5kYXJkTmFtZSA9IHZhbGlkQXJpYVByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpID8gbG93ZXJDYXNlZE5hbWUgOiBudWxsO1xuXG4gICAgLy8gSWYgdGhpcyBpcyBhbiBhcmlhLSogYXR0cmlidXRlLCBidXQgaXMgbm90IGxpc3RlZCBpbiB0aGUga25vd24gRE9NXG4gICAgLy8gRE9NIHByb3BlcnRpZXMsIHRoZW4gaXQgaXMgYW4gaW52YWxpZCBhcmlhLSogYXR0cmlidXRlLlxuICAgIGlmIChzdGFuZGFyZE5hbWUgPT0gbnVsbCkge1xuICAgICAgd2FybmVkUHJvcGVydGllc1tuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIGFyaWEtKiBhdHRyaWJ1dGVzIHNob3VsZCBiZSBsb3dlcmNhc2U7IHN1Z2dlc3QgdGhlIGxvd2VyY2FzZSB2ZXJzaW9uLlxuICAgIGlmIChuYW1lICE9PSBzdGFuZGFyZE5hbWUpIHtcbiAgICAgIHdhcm5pbmckNShmYWxzZSwgJ1Vua25vd24gQVJJQSBhdHRyaWJ1dGUgYCVzYC4gRGlkIHlvdSBtZWFuIGAlc2A/JXMnLCBuYW1lLCBzdGFuZGFyZE5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMShkZWJ1Z0lEKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiB3YXJuSW52YWxpZEFSSUFQcm9wcyh0eXBlLCBwcm9wcywgZGVidWdJRCkge1xuICB2YXIgaW52YWxpZFByb3BzID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIHByb3BzKSB7XG4gICAgdmFyIGlzVmFsaWQgPSB2YWxpZGF0ZVByb3BlcnR5KHR5cGUsIGtleSwgZGVidWdJRCk7XG4gICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICBpbnZhbGlkUHJvcHMucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciB1bmtub3duUHJvcFN0cmluZyA9IGludmFsaWRQcm9wcy5tYXAoZnVuY3Rpb24gKHByb3ApIHtcbiAgICByZXR1cm4gJ2AnICsgcHJvcCArICdgJztcbiAgfSkuam9pbignLCAnKTtcblxuICBpZiAoaW52YWxpZFByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgIHdhcm5pbmckNShmYWxzZSwgJ0ludmFsaWQgYXJpYSBwcm9wICVzIG9uIDwlcz4gdGFnLiAnICsgJ0ZvciBkZXRhaWxzLCBzZWUgaHR0cHM6Ly9mYi5tZS9pbnZhbGlkLWFyaWEtcHJvcCVzJywgdW5rbm93blByb3BTdHJpbmcsIHR5cGUsIGdldFN0YWNrQWRkZW5kdW0kMShkZWJ1Z0lEKSk7XG4gIH0gZWxzZSBpZiAoaW52YWxpZFByb3BzLmxlbmd0aCA+IDEpIHtcbiAgICB3YXJuaW5nJDUoZmFsc2UsICdJbnZhbGlkIGFyaWEgcHJvcHMgJXMgb24gPCVzPiB0YWcuICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL2ludmFsaWQtYXJpYS1wcm9wJXMnLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQxKGRlYnVnSUQpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnRpZXModHlwZSwgcHJvcHMsIGRlYnVnSUQgLyogU3RhY2sgb25seSAqLykge1xuICBpZiAoaXNDdXN0b21Db21wb25lbnRfMSh0eXBlLCBwcm9wcykpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgd2FybkludmFsaWRBUklBUHJvcHModHlwZSwgcHJvcHMsIGRlYnVnSUQpO1xufVxuXG52YXIgUmVhY3RET01JbnZhbGlkQVJJQUhvb2sgPSB7XG4gIC8vIEZpYmVyXG4gIHZhbGlkYXRlUHJvcGVydGllczogdmFsaWRhdGVQcm9wZXJ0aWVzLFxuICAvLyBTdGFja1xuICBvbkJlZm9yZU1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoZGVidWdJRCwgZWxlbWVudCkge1xuICAgIGlmICh0cnVlICYmIGVsZW1lbnQgIT0gbnVsbCAmJiB0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsaWRhdGVQcm9wZXJ0aWVzKGVsZW1lbnQudHlwZSwgZWxlbWVudC5wcm9wcywgZGVidWdJRCk7XG4gICAgfVxuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGRlYnVnSUQsIGVsZW1lbnQpIHtcbiAgICBpZiAodHJ1ZSAmJiBlbGVtZW50ICE9IG51bGwgJiYgdHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbGlkYXRlUHJvcGVydGllcyhlbGVtZW50LnR5cGUsIGVsZW1lbnQucHJvcHMsIGRlYnVnSUQpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIFJlYWN0RE9NSW52YWxpZEFSSUFIb29rXzEgPSBSZWFjdERPTUludmFsaWRBUklBSG9vaztcblxue1xuICB2YXIgd2FybmluZyQ2ID0gcmVxdWlyZSQkMDtcblxuICB2YXIgX3JlcXVpcmUkMiA9IFJlYWN0R2xvYmFsU2hhcmVkU3RhdGVfMSxcbiAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2skMSA9IF9yZXF1aXJlJDIuUmVhY3RDb21wb25lbnRUcmVlSG9vayxcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMyA9IF9yZXF1aXJlJDIuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuICB2YXIgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQkMSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2skMS5nZXRTdGFja0FkZGVuZHVtQnlJRDtcbn1cblxudmFyIGRpZFdhcm5WYWx1ZU51bGwgPSBmYWxzZTtcblxuZnVuY3Rpb24gZ2V0U3RhY2tBZGRlbmR1bSQyKGRlYnVnSUQpIHtcbiAgaWYgKGRlYnVnSUQgIT0gbnVsbCkge1xuICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuIG9uIFN0YWNrXG4gICAgcmV0dXJuIGdldFN0YWNrQWRkZW5kdW1CeUlEJDEoZGVidWdJRCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBjYW4gb25seSBoYXBwZW4gb24gRmliZXIgLyBTZXJ2ZXJcbiAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDMuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgIHJldHVybiBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BlcnRpZXMkMSh0eXBlLCBwcm9wcywgZGVidWdJRCAvKiBTdGFjayBvbmx5ICovKSB7XG4gIGlmICh0eXBlICE9PSAnaW5wdXQnICYmIHR5cGUgIT09ICd0ZXh0YXJlYScgJiYgdHlwZSAhPT0gJ3NlbGVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHByb3BzICE9IG51bGwgJiYgcHJvcHMudmFsdWUgPT09IG51bGwgJiYgIWRpZFdhcm5WYWx1ZU51bGwpIHtcbiAgICB3YXJuaW5nJDYoZmFsc2UsICdgdmFsdWVgIHByb3Agb24gYCVzYCBzaG91bGQgbm90IGJlIG51bGwuICcgKyAnQ29uc2lkZXIgdXNpbmcgdGhlIGVtcHR5IHN0cmluZyB0byBjbGVhciB0aGUgY29tcG9uZW50IG9yIGB1bmRlZmluZWRgICcgKyAnZm9yIHVuY29udHJvbGxlZCBjb21wb25lbnRzLiVzJywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQyKGRlYnVnSUQpKTtcblxuICAgIGRpZFdhcm5WYWx1ZU51bGwgPSB0cnVlO1xuICB9XG59XG5cbnZhciBSZWFjdERPTU51bGxJbnB1dFZhbHVlUHJvcEhvb2sgPSB7XG4gIC8vIEZpYmVyXG4gIHZhbGlkYXRlUHJvcGVydGllczogdmFsaWRhdGVQcm9wZXJ0aWVzJDEsXG4gIC8vIFN0YWNrXG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaWYgKHRydWUgJiYgZWxlbWVudCAhPSBudWxsICYmIHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMShlbGVtZW50LnR5cGUsIGVsZW1lbnQucHJvcHMsIGRlYnVnSUQpO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaWYgKHRydWUgJiYgZWxlbWVudCAhPSBudWxsICYmIHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMShlbGVtZW50LnR5cGUsIGVsZW1lbnQucHJvcHMsIGRlYnVnSUQpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIFJlYWN0RE9NTnVsbElucHV0VmFsdWVQcm9wSG9va18xID0gUmVhY3RET01OdWxsSW5wdXRWYWx1ZVByb3BIb29rO1xuXG4vKipcbiAqIEluamVjdGFibGUgb3JkZXJpbmcgb2YgZXZlbnQgcGx1Z2lucy5cbiAqL1xudmFyIGV2ZW50UGx1Z2luT3JkZXIgPSBudWxsO1xuXG4vKipcbiAqIEluamVjdGFibGUgbWFwcGluZyBmcm9tIG5hbWVzIHRvIGV2ZW50IHBsdWdpbiBtb2R1bGVzLlxuICovXG52YXIgbmFtZXNUb1BsdWdpbnMgPSB7fTtcblxuLyoqXG4gKiBSZWNvbXB1dGVzIHRoZSBwbHVnaW4gbGlzdCB1c2luZyB0aGUgaW5qZWN0ZWQgcGx1Z2lucyBhbmQgcGx1Z2luIG9yZGVyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY29tcHV0ZVBsdWdpbk9yZGVyaW5nKCkge1xuICBpZiAoIWV2ZW50UGx1Z2luT3JkZXIpIHtcbiAgICAvLyBXYWl0IHVudGlsIGFuIGBldmVudFBsdWdpbk9yZGVyYCBpcyBpbmplY3RlZC5cbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICh2YXIgcGx1Z2luTmFtZSBpbiBuYW1lc1RvUGx1Z2lucykge1xuICAgIHZhciBwbHVnaW5Nb2R1bGUgPSBuYW1lc1RvUGx1Z2luc1twbHVnaW5OYW1lXTtcbiAgICB2YXIgcGx1Z2luSW5kZXggPSBldmVudFBsdWdpbk9yZGVyLmluZGV4T2YocGx1Z2luTmFtZSk7XG4gICAgIShwbHVnaW5JbmRleCA+IC0xKSA/IGludmFyaWFudChmYWxzZSwgJ0V2ZW50UGx1Z2luUmVnaXN0cnk6IENhbm5vdCBpbmplY3QgZXZlbnQgcGx1Z2lucyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgcGx1Z2luIG9yZGVyaW5nLCBgJXNgLicsIHBsdWdpbk5hbWUpIDogdm9pZCAwO1xuICAgIGlmIChFdmVudFBsdWdpblJlZ2lzdHJ5LnBsdWdpbnNbcGx1Z2luSW5kZXhdKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgIXBsdWdpbk1vZHVsZS5leHRyYWN0RXZlbnRzID8gaW52YXJpYW50KGZhbHNlLCAnRXZlbnRQbHVnaW5SZWdpc3RyeTogRXZlbnQgcGx1Z2lucyBtdXN0IGltcGxlbWVudCBhbiBgZXh0cmFjdEV2ZW50c2AgbWV0aG9kLCBidXQgYCVzYCBkb2VzIG5vdC4nLCBwbHVnaW5OYW1lKSA6IHZvaWQgMDtcbiAgICBFdmVudFBsdWdpblJlZ2lzdHJ5LnBsdWdpbnNbcGx1Z2luSW5kZXhdID0gcGx1Z2luTW9kdWxlO1xuICAgIHZhciBwdWJsaXNoZWRFdmVudHMgPSBwbHVnaW5Nb2R1bGUuZXZlbnRUeXBlcztcbiAgICBmb3IgKHZhciBldmVudE5hbWUgaW4gcHVibGlzaGVkRXZlbnRzKSB7XG4gICAgICAhcHVibGlzaEV2ZW50Rm9yUGx1Z2luKHB1Ymxpc2hlZEV2ZW50c1tldmVudE5hbWVdLCBwbHVnaW5Nb2R1bGUsIGV2ZW50TmFtZSkgPyBpbnZhcmlhbnQoZmFsc2UsICdFdmVudFBsdWdpblJlZ2lzdHJ5OiBGYWlsZWQgdG8gcHVibGlzaCBldmVudCBgJXNgIGZvciBwbHVnaW4gYCVzYC4nLCBldmVudE5hbWUsIHBsdWdpbk5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFB1Ymxpc2hlcyBhbiBldmVudCBzbyB0aGF0IGl0IGNhbiBiZSBkaXNwYXRjaGVkIGJ5IHRoZSBzdXBwbGllZCBwbHVnaW4uXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRpc3BhdGNoQ29uZmlnIERpc3BhdGNoIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBQbHVnaW5Nb2R1bGUgUGx1Z2luIHB1Ymxpc2hpbmcgdGhlIGV2ZW50LlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgZXZlbnQgd2FzIHN1Y2Nlc3NmdWxseSBwdWJsaXNoZWQuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwdWJsaXNoRXZlbnRGb3JQbHVnaW4oZGlzcGF0Y2hDb25maWcsIHBsdWdpbk1vZHVsZSwgZXZlbnROYW1lKSB7XG4gICEhRXZlbnRQbHVnaW5SZWdpc3RyeS5ldmVudE5hbWVEaXNwYXRjaENvbmZpZ3MuaGFzT3duUHJvcGVydHkoZXZlbnROYW1lKSA/IGludmFyaWFudChmYWxzZSwgJ0V2ZW50UGx1Z2luSHViOiBNb3JlIHRoYW4gb25lIHBsdWdpbiBhdHRlbXB0ZWQgdG8gcHVibGlzaCB0aGUgc2FtZSBldmVudCBuYW1lLCBgJXNgLicsIGV2ZW50TmFtZSkgOiB2b2lkIDA7XG4gIEV2ZW50UGx1Z2luUmVnaXN0cnkuZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzW2V2ZW50TmFtZV0gPSBkaXNwYXRjaENvbmZpZztcblxuICB2YXIgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMgPSBkaXNwYXRjaENvbmZpZy5waGFzZWRSZWdpc3RyYXRpb25OYW1lcztcbiAgaWYgKHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKSB7XG4gICAgZm9yICh2YXIgcGhhc2VOYW1lIGluIHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzKSB7XG4gICAgICBpZiAocGhhc2VkUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkocGhhc2VOYW1lKSkge1xuICAgICAgICB2YXIgcGhhc2VkUmVnaXN0cmF0aW9uTmFtZSA9IHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWVzW3BoYXNlTmFtZV07XG4gICAgICAgIHB1Ymxpc2hSZWdpc3RyYXRpb25OYW1lKHBoYXNlZFJlZ2lzdHJhdGlvbk5hbWUsIHBsdWdpbk1vZHVsZSwgZXZlbnROYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoZGlzcGF0Y2hDb25maWcucmVnaXN0cmF0aW9uTmFtZSkge1xuICAgIHB1Ymxpc2hSZWdpc3RyYXRpb25OYW1lKGRpc3BhdGNoQ29uZmlnLnJlZ2lzdHJhdGlvbk5hbWUsIHBsdWdpbk1vZHVsZSwgZXZlbnROYW1lKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogUHVibGlzaGVzIGEgcmVnaXN0cmF0aW9uIG5hbWUgdGhhdCBpcyB1c2VkIHRvIGlkZW50aWZ5IGRpc3BhdGNoZWQgZXZlbnRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdpc3RyYXRpb25OYW1lIFJlZ2lzdHJhdGlvbiBuYW1lIHRvIGFkZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBQbHVnaW5Nb2R1bGUgUGx1Z2luIHB1Ymxpc2hpbmcgdGhlIGV2ZW50LlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcHVibGlzaFJlZ2lzdHJhdGlvbk5hbWUocmVnaXN0cmF0aW9uTmFtZSwgcGx1Z2luTW9kdWxlLCBldmVudE5hbWUpIHtcbiAgISFFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzW3JlZ2lzdHJhdGlvbk5hbWVdID8gaW52YXJpYW50KGZhbHNlLCAnRXZlbnRQbHVnaW5IdWI6IE1vcmUgdGhhbiBvbmUgcGx1Z2luIGF0dGVtcHRlZCB0byBwdWJsaXNoIHRoZSBzYW1lIHJlZ2lzdHJhdGlvbiBuYW1lLCBgJXNgLicsIHJlZ2lzdHJhdGlvbk5hbWUpIDogdm9pZCAwO1xuICBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzW3JlZ2lzdHJhdGlvbk5hbWVdID0gcGx1Z2luTW9kdWxlO1xuICBFdmVudFBsdWdpblJlZ2lzdHJ5LnJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXNbcmVnaXN0cmF0aW9uTmFtZV0gPSBwbHVnaW5Nb2R1bGUuZXZlbnRUeXBlc1tldmVudE5hbWVdLmRlcGVuZGVuY2llcztcblxuICB7XG4gICAgdmFyIGxvd2VyQ2FzZWROYW1lID0gcmVnaXN0cmF0aW9uTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIEV2ZW50UGx1Z2luUmVnaXN0cnkucG9zc2libGVSZWdpc3RyYXRpb25OYW1lc1tsb3dlckNhc2VkTmFtZV0gPSByZWdpc3RyYXRpb25OYW1lO1xuXG4gICAgaWYgKHJlZ2lzdHJhdGlvbk5hbWUgPT09ICdvbkRvdWJsZUNsaWNrJykge1xuICAgICAgRXZlbnRQbHVnaW5SZWdpc3RyeS5wb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzLm9uZGJsY2xpY2sgPSByZWdpc3RyYXRpb25OYW1lO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBwbHVnaW5zIHNvIHRoYXQgdGhleSBjYW4gZXh0cmFjdCBhbmQgZGlzcGF0Y2ggZXZlbnRzLlxuICpcbiAqIEBzZWUge0V2ZW50UGx1Z2luSHVifVxuICovXG52YXIgRXZlbnRQbHVnaW5SZWdpc3RyeSA9IHtcbiAgLyoqXG4gICAqIE9yZGVyZWQgbGlzdCBvZiBpbmplY3RlZCBwbHVnaW5zLlxuICAgKi9cbiAgcGx1Z2luczogW10sXG5cbiAgLyoqXG4gICAqIE1hcHBpbmcgZnJvbSBldmVudCBuYW1lIHRvIGRpc3BhdGNoIGNvbmZpZ1xuICAgKi9cbiAgZXZlbnROYW1lRGlzcGF0Y2hDb25maWdzOiB7fSxcblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIHJlZ2lzdHJhdGlvbiBuYW1lIHRvIHBsdWdpbiBtb2R1bGVcbiAgICovXG4gIHJlZ2lzdHJhdGlvbk5hbWVNb2R1bGVzOiB7fSxcblxuICAvKipcbiAgICogTWFwcGluZyBmcm9tIHJlZ2lzdHJhdGlvbiBuYW1lIHRvIGV2ZW50IG5hbWVcbiAgICovXG4gIHJlZ2lzdHJhdGlvbk5hbWVEZXBlbmRlbmNpZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBNYXBwaW5nIGZyb20gbG93ZXJjYXNlIHJlZ2lzdHJhdGlvbiBuYW1lcyB0byB0aGUgcHJvcGVybHkgY2FzZWQgdmVyc2lvbixcbiAgICogdXNlZCB0byB3YXJuIGluIHRoZSBjYXNlIG9mIG1pc3NpbmcgZXZlbnQgaGFuZGxlcnMuIEF2YWlsYWJsZVxuICAgKiBvbmx5IGluIHRydWUuXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzOiB7fSxcbiAgLy8gVHJ1c3QgdGhlIGRldmVsb3BlciB0byBvbmx5IHVzZSBwb3NzaWJsZVJlZ2lzdHJhdGlvbk5hbWVzIGluIHRydWVcblxuICAvKipcbiAgICogSW5qZWN0cyBhbiBvcmRlcmluZyBvZiBwbHVnaW5zIChieSBwbHVnaW4gbmFtZSkuIFRoaXMgYWxsb3dzIHRoZSBvcmRlcmluZ1xuICAgKiB0byBiZSBkZWNvdXBsZWQgZnJvbSBpbmplY3Rpb24gb2YgdGhlIGFjdHVhbCBwbHVnaW5zIHNvIHRoYXQgb3JkZXJpbmcgaXNcbiAgICogYWx3YXlzIGRldGVybWluaXN0aWMgcmVnYXJkbGVzcyBvZiBwYWNrYWdpbmcsIG9uLXRoZS1mbHkgaW5qZWN0aW9uLCBldGMuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IEluamVjdGVkRXZlbnRQbHVnaW5PcmRlclxuICAgKiBAaW50ZXJuYWxcbiAgICogQHNlZSB7RXZlbnRQbHVnaW5IdWIuaW5qZWN0aW9uLmluamVjdEV2ZW50UGx1Z2luT3JkZXJ9XG4gICAqL1xuICBpbmplY3RFdmVudFBsdWdpbk9yZGVyOiBmdW5jdGlvbiAoaW5qZWN0ZWRFdmVudFBsdWdpbk9yZGVyKSB7XG4gICAgISFldmVudFBsdWdpbk9yZGVyID8gaW52YXJpYW50KGZhbHNlLCAnRXZlbnRQbHVnaW5SZWdpc3RyeTogQ2Fubm90IGluamVjdCBldmVudCBwbHVnaW4gb3JkZXJpbmcgbW9yZSB0aGFuIG9uY2UuIFlvdSBhcmUgbGlrZWx5IHRyeWluZyB0byBsb2FkIG1vcmUgdGhhbiBvbmUgY29weSBvZiBSZWFjdC4nKSA6IHZvaWQgMDtcbiAgICAvLyBDbG9uZSB0aGUgb3JkZXJpbmcgc28gaXQgY2Fubm90IGJlIGR5bmFtaWNhbGx5IG11dGF0ZWQuXG4gICAgZXZlbnRQbHVnaW5PcmRlciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGluamVjdGVkRXZlbnRQbHVnaW5PcmRlcik7XG4gICAgcmVjb21wdXRlUGx1Z2luT3JkZXJpbmcoKTtcbiAgfSxcblxuICAvKipcbiAgICogSW5qZWN0cyBwbHVnaW5zIHRvIGJlIHVzZWQgYnkgYEV2ZW50UGx1Z2luSHViYC4gVGhlIHBsdWdpbiBuYW1lcyBtdXN0IGJlXG4gICAqIGluIHRoZSBvcmRlcmluZyBpbmplY3RlZCBieSBgaW5qZWN0RXZlbnRQbHVnaW5PcmRlcmAuXG4gICAqXG4gICAqIFBsdWdpbnMgY2FuIGJlIGluamVjdGVkIGFzIHBhcnQgb2YgcGFnZSBpbml0aWFsaXphdGlvbiBvciBvbi10aGUtZmx5LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gaW5qZWN0ZWROYW1lc1RvUGx1Z2lucyBNYXAgZnJvbSBuYW1lcyB0byBwbHVnaW4gbW9kdWxlcy5cbiAgICogQGludGVybmFsXG4gICAqIEBzZWUge0V2ZW50UGx1Z2luSHViLmluamVjdGlvbi5pbmplY3RFdmVudFBsdWdpbnNCeU5hbWV9XG4gICAqL1xuICBpbmplY3RFdmVudFBsdWdpbnNCeU5hbWU6IGZ1bmN0aW9uIChpbmplY3RlZE5hbWVzVG9QbHVnaW5zKSB7XG4gICAgdmFyIGlzT3JkZXJpbmdEaXJ0eSA9IGZhbHNlO1xuICAgIGZvciAodmFyIHBsdWdpbk5hbWUgaW4gaW5qZWN0ZWROYW1lc1RvUGx1Z2lucykge1xuICAgICAgaWYgKCFpbmplY3RlZE5hbWVzVG9QbHVnaW5zLmhhc093blByb3BlcnR5KHBsdWdpbk5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIHBsdWdpbk1vZHVsZSA9IGluamVjdGVkTmFtZXNUb1BsdWdpbnNbcGx1Z2luTmFtZV07XG4gICAgICBpZiAoIW5hbWVzVG9QbHVnaW5zLmhhc093blByb3BlcnR5KHBsdWdpbk5hbWUpIHx8IG5hbWVzVG9QbHVnaW5zW3BsdWdpbk5hbWVdICE9PSBwbHVnaW5Nb2R1bGUpIHtcbiAgICAgICAgISFuYW1lc1RvUGx1Z2luc1twbHVnaW5OYW1lXSA/IGludmFyaWFudChmYWxzZSwgJ0V2ZW50UGx1Z2luUmVnaXN0cnk6IENhbm5vdCBpbmplY3QgdHdvIGRpZmZlcmVudCBldmVudCBwbHVnaW5zIHVzaW5nIHRoZSBzYW1lIG5hbWUsIGAlc2AuJywgcGx1Z2luTmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIG5hbWVzVG9QbHVnaW5zW3BsdWdpbk5hbWVdID0gcGx1Z2luTW9kdWxlO1xuICAgICAgICBpc09yZGVyaW5nRGlydHkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNPcmRlcmluZ0RpcnR5KSB7XG4gICAgICByZWNvbXB1dGVQbHVnaW5PcmRlcmluZygpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIEV2ZW50UGx1Z2luUmVnaXN0cnlfMSA9IEV2ZW50UGx1Z2luUmVnaXN0cnk7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIHBvc3NpYmxlU3RhbmRhcmROYW1lc1xuICovXG5cbi8vIFdoZW4gYWRkaW5nIGF0dHJpYnV0ZXMgdG8gdGhlIEhUTUwgb3IgU1ZHIHdoaXRlbGlzdCwgYmUgc3VyZSB0b1xuLy8gYWxzbyBhZGQgdGhlbSB0byB0aGlzIG1vZHVsZSB0byBlbnN1cmUgY2FzaW5nIGFuZCBpbmNvcnJlY3QgbmFtZVxuLy8gd2FybmluZ3MuXG52YXIgcG9zc2libGVTdGFuZGFyZE5hbWVzJDEgPSB7XG4gIC8vIEhUTUxcbiAgYWNjZXB0OiAnYWNjZXB0JyxcbiAgYWNjZXB0Y2hhcnNldDogJ2FjY2VwdENoYXJzZXQnLFxuICAnYWNjZXB0LWNoYXJzZXQnOiAnYWNjZXB0Q2hhcnNldCcsXG4gIGFjY2Vzc2tleTogJ2FjY2Vzc0tleScsXG4gIGFjdGlvbjogJ2FjdGlvbicsXG4gIGFsbG93ZnVsbHNjcmVlbjogJ2FsbG93RnVsbFNjcmVlbicsXG4gIGFsbG93dHJhbnNwYXJlbmN5OiAnYWxsb3dUcmFuc3BhcmVuY3knLFxuICBhbHQ6ICdhbHQnLFxuICBhczogJ2FzJyxcbiAgYXN5bmM6ICdhc3luYycsXG4gIGF1dG9jYXBpdGFsaXplOiAnYXV0b0NhcGl0YWxpemUnLFxuICBhdXRvY29tcGxldGU6ICdhdXRvQ29tcGxldGUnLFxuICBhdXRvY29ycmVjdDogJ2F1dG9Db3JyZWN0JyxcbiAgYXV0b2ZvY3VzOiAnYXV0b0ZvY3VzJyxcbiAgYXV0b3BsYXk6ICdhdXRvUGxheScsXG4gIGF1dG9zYXZlOiAnYXV0b1NhdmUnLFxuICBjYXB0dXJlOiAnY2FwdHVyZScsXG4gIGNlbGxwYWRkaW5nOiAnY2VsbFBhZGRpbmcnLFxuICBjZWxsc3BhY2luZzogJ2NlbGxTcGFjaW5nJyxcbiAgY2hhbGxlbmdlOiAnY2hhbGxlbmdlJyxcbiAgY2hhcnNldDogJ2NoYXJTZXQnLFxuICBjaGVja2VkOiAnY2hlY2tlZCcsXG4gIGNoaWxkcmVuOiAnY2hpbGRyZW4nLFxuICBjaXRlOiAnY2l0ZScsXG4gICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICBjbGFzc2lkOiAnY2xhc3NJRCcsXG4gIGNsYXNzbmFtZTogJ2NsYXNzTmFtZScsXG4gIGNvbHM6ICdjb2xzJyxcbiAgY29sc3BhbjogJ2NvbFNwYW4nLFxuICBjb250ZW50OiAnY29udGVudCcsXG4gIGNvbnRlbnRlZGl0YWJsZTogJ2NvbnRlbnRFZGl0YWJsZScsXG4gIGNvbnRleHRtZW51OiAnY29udGV4dE1lbnUnLFxuICBjb250cm9sczogJ2NvbnRyb2xzJyxcbiAgY29udHJvbHNsaXN0OiAnY29udHJvbHNMaXN0JyxcbiAgY29vcmRzOiAnY29vcmRzJyxcbiAgY3Jvc3NvcmlnaW46ICdjcm9zc09yaWdpbicsXG4gIGRhbmdlcm91c2x5c2V0aW5uZXJodG1sOiAnZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwnLFxuICBkYXRhOiAnZGF0YScsXG4gIGRhdGV0aW1lOiAnZGF0ZVRpbWUnLFxuICAnZGVmYXVsdCc6ICdkZWZhdWx0JyxcbiAgZGVmYXVsdGNoZWNrZWQ6ICdkZWZhdWx0Q2hlY2tlZCcsXG4gIGRlZmF1bHR2YWx1ZTogJ2RlZmF1bHRWYWx1ZScsXG4gIGRlZmVyOiAnZGVmZXInLFxuICBkaXI6ICdkaXInLFxuICBkaXNhYmxlZDogJ2Rpc2FibGVkJyxcbiAgZG93bmxvYWQ6ICdkb3dubG9hZCcsXG4gIGRyYWdnYWJsZTogJ2RyYWdnYWJsZScsXG4gIGVuY3R5cGU6ICdlbmNUeXBlJyxcbiAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgZm9ybTogJ2Zvcm0nLFxuICBmb3JtbWV0aG9kOiAnZm9ybU1ldGhvZCcsXG4gIGZvcm1hY3Rpb246ICdmb3JtQWN0aW9uJyxcbiAgZm9ybWVuY3R5cGU6ICdmb3JtRW5jVHlwZScsXG4gIGZvcm1ub3ZhbGlkYXRlOiAnZm9ybU5vVmFsaWRhdGUnLFxuICBmb3JtdGFyZ2V0OiAnZm9ybVRhcmdldCcsXG4gIGZyYW1lYm9yZGVyOiAnZnJhbWVCb3JkZXInLFxuICBoZWFkZXJzOiAnaGVhZGVycycsXG4gIGhlaWdodDogJ2hlaWdodCcsXG4gIGhpZGRlbjogJ2hpZGRlbicsXG4gIGhpZ2g6ICdoaWdoJyxcbiAgaHJlZjogJ2hyZWYnLFxuICBocmVmbGFuZzogJ2hyZWZMYW5nJyxcbiAgaHRtbGZvcjogJ2h0bWxGb3InLFxuICBodHRwZXF1aXY6ICdodHRwRXF1aXYnLFxuICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnLFxuICBpY29uOiAnaWNvbicsXG4gIGlkOiAnaWQnLFxuICBpbm5lcmh0bWw6ICdpbm5lckhUTUwnLFxuICBpbnB1dG1vZGU6ICdpbnB1dE1vZGUnLFxuICBpbnRlZ3JpdHk6ICdpbnRlZ3JpdHknLFxuICBpczogJ2lzJyxcbiAgaXRlbWlkOiAnaXRlbUlEJyxcbiAgaXRlbXByb3A6ICdpdGVtUHJvcCcsXG4gIGl0ZW1yZWY6ICdpdGVtUmVmJyxcbiAgaXRlbXNjb3BlOiAnaXRlbVNjb3BlJyxcbiAgaXRlbXR5cGU6ICdpdGVtVHlwZScsXG4gIGtleXBhcmFtczogJ2tleVBhcmFtcycsXG4gIGtleXR5cGU6ICdrZXlUeXBlJyxcbiAga2luZDogJ2tpbmQnLFxuICBsYWJlbDogJ2xhYmVsJyxcbiAgbGFuZzogJ2xhbmcnLFxuICBsaXN0OiAnbGlzdCcsXG4gIGxvb3A6ICdsb29wJyxcbiAgbG93OiAnbG93JyxcbiAgbWFuaWZlc3Q6ICdtYW5pZmVzdCcsXG4gIG1hcmdpbndpZHRoOiAnbWFyZ2luV2lkdGgnLFxuICBtYXJnaW5oZWlnaHQ6ICdtYXJnaW5IZWlnaHQnLFxuICBtYXg6ICdtYXgnLFxuICBtYXhsZW5ndGg6ICdtYXhMZW5ndGgnLFxuICBtZWRpYTogJ21lZGlhJyxcbiAgbWVkaWFncm91cDogJ21lZGlhR3JvdXAnLFxuICBtZXRob2Q6ICdtZXRob2QnLFxuICBtaW46ICdtaW4nLFxuICBtaW5sZW5ndGg6ICdtaW5MZW5ndGgnLFxuICBtdWx0aXBsZTogJ211bHRpcGxlJyxcbiAgbXV0ZWQ6ICdtdXRlZCcsXG4gIG5hbWU6ICduYW1lJyxcbiAgbm9uY2U6ICdub25jZScsXG4gIG5vdmFsaWRhdGU6ICdub1ZhbGlkYXRlJyxcbiAgb3BlbjogJ29wZW4nLFxuICBvcHRpbXVtOiAnb3B0aW11bScsXG4gIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgcGxhY2Vob2xkZXI6ICdwbGFjZWhvbGRlcicsXG4gIHBsYXlzaW5saW5lOiAncGxheXNJbmxpbmUnLFxuICBwb3N0ZXI6ICdwb3N0ZXInLFxuICBwcmVsb2FkOiAncHJlbG9hZCcsXG4gIHByb2ZpbGU6ICdwcm9maWxlJyxcbiAgcmFkaW9ncm91cDogJ3JhZGlvR3JvdXAnLFxuICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgcmVmZXJyZXJwb2xpY3k6ICdyZWZlcnJlclBvbGljeScsXG4gIHJlbDogJ3JlbCcsXG4gIHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuICByZXZlcnNlZDogJ3JldmVyc2VkJyxcbiAgcm9sZTogJ3JvbGUnLFxuICByb3dzOiAncm93cycsXG4gIHJvd3NwYW46ICdyb3dTcGFuJyxcbiAgc2FuZGJveDogJ3NhbmRib3gnLFxuICBzY29wZTogJ3Njb3BlJyxcbiAgc2NvcGVkOiAnc2NvcGVkJyxcbiAgc2Nyb2xsaW5nOiAnc2Nyb2xsaW5nJyxcbiAgc2VhbWxlc3M6ICdzZWFtbGVzcycsXG4gIHNlbGVjdGVkOiAnc2VsZWN0ZWQnLFxuICBzaGFwZTogJ3NoYXBlJyxcbiAgc2l6ZTogJ3NpemUnLFxuICBzaXplczogJ3NpemVzJyxcbiAgc3BhbjogJ3NwYW4nLFxuICBzcGVsbGNoZWNrOiAnc3BlbGxDaGVjaycsXG4gIHNyYzogJ3NyYycsXG4gIHNyY2RvYzogJ3NyY0RvYycsXG4gIHNyY2xhbmc6ICdzcmNMYW5nJyxcbiAgc3Jjc2V0OiAnc3JjU2V0JyxcbiAgc3RhcnQ6ICdzdGFydCcsXG4gIHN0ZXA6ICdzdGVwJyxcbiAgc3R5bGU6ICdzdHlsZScsXG4gIHN1bW1hcnk6ICdzdW1tYXJ5JyxcbiAgdGFiaW5kZXg6ICd0YWJJbmRleCcsXG4gIHRhcmdldDogJ3RhcmdldCcsXG4gIHRpdGxlOiAndGl0bGUnLFxuICB0eXBlOiAndHlwZScsXG4gIHVzZW1hcDogJ3VzZU1hcCcsXG4gIHZhbHVlOiAndmFsdWUnLFxuICB3aWR0aDogJ3dpZHRoJyxcbiAgd21vZGU6ICd3bW9kZScsXG4gIHdyYXA6ICd3cmFwJyxcblxuICAvLyBTVkdcbiAgYWJvdXQ6ICdhYm91dCcsXG4gIGFjY2VudGhlaWdodDogJ2FjY2VudEhlaWdodCcsXG4gICdhY2NlbnQtaGVpZ2h0JzogJ2FjY2VudEhlaWdodCcsXG4gIGFjY3VtdWxhdGU6ICdhY2N1bXVsYXRlJyxcbiAgYWRkaXRpdmU6ICdhZGRpdGl2ZScsXG4gIGFsaWdubWVudGJhc2VsaW5lOiAnYWxpZ25tZW50QmFzZWxpbmUnLFxuICAnYWxpZ25tZW50LWJhc2VsaW5lJzogJ2FsaWdubWVudEJhc2VsaW5lJyxcbiAgYWxsb3dyZW9yZGVyOiAnYWxsb3dSZW9yZGVyJyxcbiAgYWxwaGFiZXRpYzogJ2FscGhhYmV0aWMnLFxuICBhbXBsaXR1ZGU6ICdhbXBsaXR1ZGUnLFxuICBhcmFiaWNmb3JtOiAnYXJhYmljRm9ybScsXG4gICdhcmFiaWMtZm9ybSc6ICdhcmFiaWNGb3JtJyxcbiAgYXNjZW50OiAnYXNjZW50JyxcbiAgYXR0cmlidXRlbmFtZTogJ2F0dHJpYnV0ZU5hbWUnLFxuICBhdHRyaWJ1dGV0eXBlOiAnYXR0cmlidXRlVHlwZScsXG4gIGF1dG9yZXZlcnNlOiAnYXV0b1JldmVyc2UnLFxuICBhemltdXRoOiAnYXppbXV0aCcsXG4gIGJhc2VmcmVxdWVuY3k6ICdiYXNlRnJlcXVlbmN5JyxcbiAgYmFzZWxpbmVzaGlmdDogJ2Jhc2VsaW5lU2hpZnQnLFxuICAnYmFzZWxpbmUtc2hpZnQnOiAnYmFzZWxpbmVTaGlmdCcsXG4gIGJhc2Vwcm9maWxlOiAnYmFzZVByb2ZpbGUnLFxuICBiYm94OiAnYmJveCcsXG4gIGJlZ2luOiAnYmVnaW4nLFxuICBiaWFzOiAnYmlhcycsXG4gIGJ5OiAnYnknLFxuICBjYWxjbW9kZTogJ2NhbGNNb2RlJyxcbiAgY2FwaGVpZ2h0OiAnY2FwSGVpZ2h0JyxcbiAgJ2NhcC1oZWlnaHQnOiAnY2FwSGVpZ2h0JyxcbiAgY2xpcDogJ2NsaXAnLFxuICBjbGlwcGF0aDogJ2NsaXBQYXRoJyxcbiAgJ2NsaXAtcGF0aCc6ICdjbGlwUGF0aCcsXG4gIGNsaXBwYXRodW5pdHM6ICdjbGlwUGF0aFVuaXRzJyxcbiAgY2xpcHJ1bGU6ICdjbGlwUnVsZScsXG4gICdjbGlwLXJ1bGUnOiAnY2xpcFJ1bGUnLFxuICBjb2xvcjogJ2NvbG9yJyxcbiAgY29sb3JpbnRlcnBvbGF0aW9uOiAnY29sb3JJbnRlcnBvbGF0aW9uJyxcbiAgJ2NvbG9yLWludGVycG9sYXRpb24nOiAnY29sb3JJbnRlcnBvbGF0aW9uJyxcbiAgY29sb3JpbnRlcnBvbGF0aW9uZmlsdGVyczogJ2NvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnMnLFxuICAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJzogJ2NvbG9ySW50ZXJwb2xhdGlvbkZpbHRlcnMnLFxuICBjb2xvcnByb2ZpbGU6ICdjb2xvclByb2ZpbGUnLFxuICAnY29sb3ItcHJvZmlsZSc6ICdjb2xvclByb2ZpbGUnLFxuICBjb2xvcnJlbmRlcmluZzogJ2NvbG9yUmVuZGVyaW5nJyxcbiAgJ2NvbG9yLXJlbmRlcmluZyc6ICdjb2xvclJlbmRlcmluZycsXG4gIGNvbnRlbnRzY3JpcHR0eXBlOiAnY29udGVudFNjcmlwdFR5cGUnLFxuICBjb250ZW50c3R5bGV0eXBlOiAnY29udGVudFN0eWxlVHlwZScsXG4gIGN1cnNvcjogJ2N1cnNvcicsXG4gIGN4OiAnY3gnLFxuICBjeTogJ2N5JyxcbiAgZDogJ2QnLFxuICBkYXRhdHlwZTogJ2RhdGF0eXBlJyxcbiAgZGVjZWxlcmF0ZTogJ2RlY2VsZXJhdGUnLFxuICBkZXNjZW50OiAnZGVzY2VudCcsXG4gIGRpZmZ1c2Vjb25zdGFudDogJ2RpZmZ1c2VDb25zdGFudCcsXG4gIGRpcmVjdGlvbjogJ2RpcmVjdGlvbicsXG4gIGRpc3BsYXk6ICdkaXNwbGF5JyxcbiAgZGl2aXNvcjogJ2Rpdmlzb3InLFxuICBkb21pbmFudGJhc2VsaW5lOiAnZG9taW5hbnRCYXNlbGluZScsXG4gICdkb21pbmFudC1iYXNlbGluZSc6ICdkb21pbmFudEJhc2VsaW5lJyxcbiAgZHVyOiAnZHVyJyxcbiAgZHg6ICdkeCcsXG4gIGR5OiAnZHknLFxuICBlZGdlbW9kZTogJ2VkZ2VNb2RlJyxcbiAgZWxldmF0aW9uOiAnZWxldmF0aW9uJyxcbiAgZW5hYmxlYmFja2dyb3VuZDogJ2VuYWJsZUJhY2tncm91bmQnLFxuICAnZW5hYmxlLWJhY2tncm91bmQnOiAnZW5hYmxlQmFja2dyb3VuZCcsXG4gIGVuZDogJ2VuZCcsXG4gIGV4cG9uZW50OiAnZXhwb25lbnQnLFxuICBleHRlcm5hbHJlc291cmNlc3JlcXVpcmVkOiAnZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCcsXG4gIGZpbGw6ICdmaWxsJyxcbiAgZmlsbG9wYWNpdHk6ICdmaWxsT3BhY2l0eScsXG4gICdmaWxsLW9wYWNpdHknOiAnZmlsbE9wYWNpdHknLFxuICBmaWxscnVsZTogJ2ZpbGxSdWxlJyxcbiAgJ2ZpbGwtcnVsZSc6ICdmaWxsUnVsZScsXG4gIGZpbHRlcjogJ2ZpbHRlcicsXG4gIGZpbHRlcnJlczogJ2ZpbHRlclJlcycsXG4gIGZpbHRlcnVuaXRzOiAnZmlsdGVyVW5pdHMnLFxuICBmbG9vZG9wYWNpdHk6ICdmbG9vZE9wYWNpdHknLFxuICAnZmxvb2Qtb3BhY2l0eSc6ICdmbG9vZE9wYWNpdHknLFxuICBmbG9vZGNvbG9yOiAnZmxvb2RDb2xvcicsXG4gICdmbG9vZC1jb2xvcic6ICdmbG9vZENvbG9yJyxcbiAgZm9jdXNhYmxlOiAnZm9jdXNhYmxlJyxcbiAgZm9udGZhbWlseTogJ2ZvbnRGYW1pbHknLFxuICAnZm9udC1mYW1pbHknOiAnZm9udEZhbWlseScsXG4gIGZvbnRzaXplOiAnZm9udFNpemUnLFxuICAnZm9udC1zaXplJzogJ2ZvbnRTaXplJyxcbiAgZm9udHNpemVhZGp1c3Q6ICdmb250U2l6ZUFkanVzdCcsXG4gICdmb250LXNpemUtYWRqdXN0JzogJ2ZvbnRTaXplQWRqdXN0JyxcbiAgZm9udHN0cmV0Y2g6ICdmb250U3RyZXRjaCcsXG4gICdmb250LXN0cmV0Y2gnOiAnZm9udFN0cmV0Y2gnLFxuICBmb250c3R5bGU6ICdmb250U3R5bGUnLFxuICAnZm9udC1zdHlsZSc6ICdmb250U3R5bGUnLFxuICBmb250dmFyaWFudDogJ2ZvbnRWYXJpYW50JyxcbiAgJ2ZvbnQtdmFyaWFudCc6ICdmb250VmFyaWFudCcsXG4gIGZvbnR3ZWlnaHQ6ICdmb250V2VpZ2h0JyxcbiAgJ2ZvbnQtd2VpZ2h0JzogJ2ZvbnRXZWlnaHQnLFxuICBmb3JtYXQ6ICdmb3JtYXQnLFxuICBmcm9tOiAnZnJvbScsXG4gIGZ4OiAnZngnLFxuICBmeTogJ2Z5JyxcbiAgZzE6ICdnMScsXG4gIGcyOiAnZzInLFxuICBnbHlwaG5hbWU6ICdnbHlwaE5hbWUnLFxuICAnZ2x5cGgtbmFtZSc6ICdnbHlwaE5hbWUnLFxuICBnbHlwaG9yaWVudGF0aW9uaG9yaXpvbnRhbDogJ2dseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsJyxcbiAgJ2dseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwnOiAnZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWwnLFxuICBnbHlwaG9yaWVudGF0aW9udmVydGljYWw6ICdnbHlwaE9yaWVudGF0aW9uVmVydGljYWwnLFxuICAnZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwnOiAnZ2x5cGhPcmllbnRhdGlvblZlcnRpY2FsJyxcbiAgZ2x5cGhyZWY6ICdnbHlwaFJlZicsXG4gIGdyYWRpZW50dHJhbnNmb3JtOiAnZ3JhZGllbnRUcmFuc2Zvcm0nLFxuICBncmFkaWVudHVuaXRzOiAnZ3JhZGllbnRVbml0cycsXG4gIGhhbmdpbmc6ICdoYW5naW5nJyxcbiAgaG9yaXphZHZ4OiAnaG9yaXpBZHZYJyxcbiAgJ2hvcml6LWFkdi14JzogJ2hvcml6QWR2WCcsXG4gIGhvcml6b3JpZ2lueDogJ2hvcml6T3JpZ2luWCcsXG4gICdob3Jpei1vcmlnaW4teCc6ICdob3Jpek9yaWdpblgnLFxuICBpZGVvZ3JhcGhpYzogJ2lkZW9ncmFwaGljJyxcbiAgaW1hZ2VyZW5kZXJpbmc6ICdpbWFnZVJlbmRlcmluZycsXG4gICdpbWFnZS1yZW5kZXJpbmcnOiAnaW1hZ2VSZW5kZXJpbmcnLFxuICBpbjI6ICdpbjInLFxuICAnaW4nOiAnaW4nLFxuICBpbmxpc3Q6ICdpbmxpc3QnLFxuICBpbnRlcmNlcHQ6ICdpbnRlcmNlcHQnLFxuICBrMTogJ2sxJyxcbiAgazI6ICdrMicsXG4gIGszOiAnazMnLFxuICBrNDogJ2s0JyxcbiAgazogJ2snLFxuICBrZXJuZWxtYXRyaXg6ICdrZXJuZWxNYXRyaXgnLFxuICBrZXJuZWx1bml0bGVuZ3RoOiAna2VybmVsVW5pdExlbmd0aCcsXG4gIGtlcm5pbmc6ICdrZXJuaW5nJyxcbiAga2V5cG9pbnRzOiAna2V5UG9pbnRzJyxcbiAga2V5c3BsaW5lczogJ2tleVNwbGluZXMnLFxuICBrZXl0aW1lczogJ2tleVRpbWVzJyxcbiAgbGVuZ3RoYWRqdXN0OiAnbGVuZ3RoQWRqdXN0JyxcbiAgbGV0dGVyc3BhY2luZzogJ2xldHRlclNwYWNpbmcnLFxuICAnbGV0dGVyLXNwYWNpbmcnOiAnbGV0dGVyU3BhY2luZycsXG4gIGxpZ2h0aW5nY29sb3I6ICdsaWdodGluZ0NvbG9yJyxcbiAgJ2xpZ2h0aW5nLWNvbG9yJzogJ2xpZ2h0aW5nQ29sb3InLFxuICBsaW1pdGluZ2NvbmVhbmdsZTogJ2xpbWl0aW5nQ29uZUFuZ2xlJyxcbiAgbG9jYWw6ICdsb2NhbCcsXG4gIG1hcmtlcmVuZDogJ21hcmtlckVuZCcsXG4gICdtYXJrZXItZW5kJzogJ21hcmtlckVuZCcsXG4gIG1hcmtlcmhlaWdodDogJ21hcmtlckhlaWdodCcsXG4gIG1hcmtlcm1pZDogJ21hcmtlck1pZCcsXG4gICdtYXJrZXItbWlkJzogJ21hcmtlck1pZCcsXG4gIG1hcmtlcnN0YXJ0OiAnbWFya2VyU3RhcnQnLFxuICAnbWFya2VyLXN0YXJ0JzogJ21hcmtlclN0YXJ0JyxcbiAgbWFya2VydW5pdHM6ICdtYXJrZXJVbml0cycsXG4gIG1hcmtlcndpZHRoOiAnbWFya2VyV2lkdGgnLFxuICBtYXNrOiAnbWFzaycsXG4gIG1hc2tjb250ZW50dW5pdHM6ICdtYXNrQ29udGVudFVuaXRzJyxcbiAgbWFza3VuaXRzOiAnbWFza1VuaXRzJyxcbiAgbWF0aGVtYXRpY2FsOiAnbWF0aGVtYXRpY2FsJyxcbiAgbW9kZTogJ21vZGUnLFxuICBudW1vY3RhdmVzOiAnbnVtT2N0YXZlcycsXG4gIG9mZnNldDogJ29mZnNldCcsXG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgb3BlcmF0b3I6ICdvcGVyYXRvcicsXG4gIG9yZGVyOiAnb3JkZXInLFxuICBvcmllbnQ6ICdvcmllbnQnLFxuICBvcmllbnRhdGlvbjogJ29yaWVudGF0aW9uJyxcbiAgb3JpZ2luOiAnb3JpZ2luJyxcbiAgb3ZlcmZsb3c6ICdvdmVyZmxvdycsXG4gIG92ZXJsaW5lcG9zaXRpb246ICdvdmVybGluZVBvc2l0aW9uJyxcbiAgJ292ZXJsaW5lLXBvc2l0aW9uJzogJ292ZXJsaW5lUG9zaXRpb24nLFxuICBvdmVybGluZXRoaWNrbmVzczogJ292ZXJsaW5lVGhpY2tuZXNzJyxcbiAgJ292ZXJsaW5lLXRoaWNrbmVzcyc6ICdvdmVybGluZVRoaWNrbmVzcycsXG4gIHBhaW50b3JkZXI6ICdwYWludE9yZGVyJyxcbiAgJ3BhaW50LW9yZGVyJzogJ3BhaW50T3JkZXInLFxuICBwYW5vc2UxOiAncGFub3NlMScsXG4gICdwYW5vc2UtMSc6ICdwYW5vc2UxJyxcbiAgcGF0aGxlbmd0aDogJ3BhdGhMZW5ndGgnLFxuICBwYXR0ZXJuY29udGVudHVuaXRzOiAncGF0dGVybkNvbnRlbnRVbml0cycsXG4gIHBhdHRlcm50cmFuc2Zvcm06ICdwYXR0ZXJuVHJhbnNmb3JtJyxcbiAgcGF0dGVybnVuaXRzOiAncGF0dGVyblVuaXRzJyxcbiAgcG9pbnRlcmV2ZW50czogJ3BvaW50ZXJFdmVudHMnLFxuICAncG9pbnRlci1ldmVudHMnOiAncG9pbnRlckV2ZW50cycsXG4gIHBvaW50czogJ3BvaW50cycsXG4gIHBvaW50c2F0eDogJ3BvaW50c0F0WCcsXG4gIHBvaW50c2F0eTogJ3BvaW50c0F0WScsXG4gIHBvaW50c2F0ejogJ3BvaW50c0F0WicsXG4gIHByZWZpeDogJ3ByZWZpeCcsXG4gIHByZXNlcnZlYWxwaGE6ICdwcmVzZXJ2ZUFscGhhJyxcbiAgcHJlc2VydmVhc3BlY3RyYXRpbzogJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLFxuICBwcmltaXRpdmV1bml0czogJ3ByaW1pdGl2ZVVuaXRzJyxcbiAgcHJvcGVydHk6ICdwcm9wZXJ0eScsXG4gIHI6ICdyJyxcbiAgcmFkaXVzOiAncmFkaXVzJyxcbiAgcmVmeDogJ3JlZlgnLFxuICByZWZ5OiAncmVmWScsXG4gIHJlbmRlcmluZ2ludGVudDogJ3JlbmRlcmluZ0ludGVudCcsXG4gICdyZW5kZXJpbmctaW50ZW50JzogJ3JlbmRlcmluZ0ludGVudCcsXG4gIHJlcGVhdGNvdW50OiAncmVwZWF0Q291bnQnLFxuICByZXBlYXRkdXI6ICdyZXBlYXREdXInLFxuICByZXF1aXJlZGV4dGVuc2lvbnM6ICdyZXF1aXJlZEV4dGVuc2lvbnMnLFxuICByZXF1aXJlZGZlYXR1cmVzOiAncmVxdWlyZWRGZWF0dXJlcycsXG4gIHJlc291cmNlOiAncmVzb3VyY2UnLFxuICByZXN0YXJ0OiAncmVzdGFydCcsXG4gIHJlc3VsdDogJ3Jlc3VsdCcsXG4gIHJlc3VsdHM6ICdyZXN1bHRzJyxcbiAgcm90YXRlOiAncm90YXRlJyxcbiAgcng6ICdyeCcsXG4gIHJ5OiAncnknLFxuICBzY2FsZTogJ3NjYWxlJyxcbiAgc2VjdXJpdHk6ICdzZWN1cml0eScsXG4gIHNlZWQ6ICdzZWVkJyxcbiAgc2hhcGVyZW5kZXJpbmc6ICdzaGFwZVJlbmRlcmluZycsXG4gICdzaGFwZS1yZW5kZXJpbmcnOiAnc2hhcGVSZW5kZXJpbmcnLFxuICBzbG9wZTogJ3Nsb3BlJyxcbiAgc3BhY2luZzogJ3NwYWNpbmcnLFxuICBzcGVjdWxhcmNvbnN0YW50OiAnc3BlY3VsYXJDb25zdGFudCcsXG4gIHNwZWN1bGFyZXhwb25lbnQ6ICdzcGVjdWxhckV4cG9uZW50JyxcbiAgc3BlZWQ6ICdzcGVlZCcsXG4gIHNwcmVhZG1ldGhvZDogJ3NwcmVhZE1ldGhvZCcsXG4gIHN0YXJ0b2Zmc2V0OiAnc3RhcnRPZmZzZXQnLFxuICBzdGRkZXZpYXRpb246ICdzdGREZXZpYXRpb24nLFxuICBzdGVtaDogJ3N0ZW1oJyxcbiAgc3RlbXY6ICdzdGVtdicsXG4gIHN0aXRjaHRpbGVzOiAnc3RpdGNoVGlsZXMnLFxuICBzdG9wY29sb3I6ICdzdG9wQ29sb3InLFxuICAnc3RvcC1jb2xvcic6ICdzdG9wQ29sb3InLFxuICBzdG9wb3BhY2l0eTogJ3N0b3BPcGFjaXR5JyxcbiAgJ3N0b3Atb3BhY2l0eSc6ICdzdG9wT3BhY2l0eScsXG4gIHN0cmlrZXRocm91Z2hwb3NpdGlvbjogJ3N0cmlrZXRocm91Z2hQb3NpdGlvbicsXG4gICdzdHJpa2V0aHJvdWdoLXBvc2l0aW9uJzogJ3N0cmlrZXRocm91Z2hQb3NpdGlvbicsXG4gIHN0cmlrZXRocm91Z2h0aGlja25lc3M6ICdzdHJpa2V0aHJvdWdoVGhpY2tuZXNzJyxcbiAgJ3N0cmlrZXRocm91Z2gtdGhpY2tuZXNzJzogJ3N0cmlrZXRocm91Z2hUaGlja25lc3MnLFxuICBzdHJpbmc6ICdzdHJpbmcnLFxuICBzdHJva2U6ICdzdHJva2UnLFxuICBzdHJva2VkYXNoYXJyYXk6ICdzdHJva2VEYXNoYXJyYXknLFxuICAnc3Ryb2tlLWRhc2hhcnJheSc6ICdzdHJva2VEYXNoYXJyYXknLFxuICBzdHJva2VkYXNob2Zmc2V0OiAnc3Ryb2tlRGFzaG9mZnNldCcsXG4gICdzdHJva2UtZGFzaG9mZnNldCc6ICdzdHJva2VEYXNob2Zmc2V0JyxcbiAgc3Ryb2tlbGluZWNhcDogJ3N0cm9rZUxpbmVjYXAnLFxuICAnc3Ryb2tlLWxpbmVjYXAnOiAnc3Ryb2tlTGluZWNhcCcsXG4gIHN0cm9rZWxpbmVqb2luOiAnc3Ryb2tlTGluZWpvaW4nLFxuICAnc3Ryb2tlLWxpbmVqb2luJzogJ3N0cm9rZUxpbmVqb2luJyxcbiAgc3Ryb2tlbWl0ZXJsaW1pdDogJ3N0cm9rZU1pdGVybGltaXQnLFxuICAnc3Ryb2tlLW1pdGVybGltaXQnOiAnc3Ryb2tlTWl0ZXJsaW1pdCcsXG4gIHN0cm9rZXdpZHRoOiAnc3Ryb2tlV2lkdGgnLFxuICAnc3Ryb2tlLXdpZHRoJzogJ3N0cm9rZVdpZHRoJyxcbiAgc3Ryb2tlb3BhY2l0eTogJ3N0cm9rZU9wYWNpdHknLFxuICAnc3Ryb2tlLW9wYWNpdHknOiAnc3Ryb2tlT3BhY2l0eScsXG4gIHN1cHByZXNzY29udGVudGVkaXRhYmxld2FybmluZzogJ3N1cHByZXNzQ29udGVudEVkaXRhYmxlV2FybmluZycsXG4gIHN1cmZhY2VzY2FsZTogJ3N1cmZhY2VTY2FsZScsXG4gIHN5c3RlbWxhbmd1YWdlOiAnc3lzdGVtTGFuZ3VhZ2UnLFxuICB0YWJsZXZhbHVlczogJ3RhYmxlVmFsdWVzJyxcbiAgdGFyZ2V0eDogJ3RhcmdldFgnLFxuICB0YXJnZXR5OiAndGFyZ2V0WScsXG4gIHRleHRhbmNob3I6ICd0ZXh0QW5jaG9yJyxcbiAgJ3RleHQtYW5jaG9yJzogJ3RleHRBbmNob3InLFxuICB0ZXh0ZGVjb3JhdGlvbjogJ3RleHREZWNvcmF0aW9uJyxcbiAgJ3RleHQtZGVjb3JhdGlvbic6ICd0ZXh0RGVjb3JhdGlvbicsXG4gIHRleHRsZW5ndGg6ICd0ZXh0TGVuZ3RoJyxcbiAgdGV4dHJlbmRlcmluZzogJ3RleHRSZW5kZXJpbmcnLFxuICAndGV4dC1yZW5kZXJpbmcnOiAndGV4dFJlbmRlcmluZycsXG4gIHRvOiAndG8nLFxuICB0cmFuc2Zvcm06ICd0cmFuc2Zvcm0nLFxuICAndHlwZW9mJzogJ3R5cGVvZicsXG4gIHUxOiAndTEnLFxuICB1MjogJ3UyJyxcbiAgdW5kZXJsaW5lcG9zaXRpb246ICd1bmRlcmxpbmVQb3NpdGlvbicsXG4gICd1bmRlcmxpbmUtcG9zaXRpb24nOiAndW5kZXJsaW5lUG9zaXRpb24nLFxuICB1bmRlcmxpbmV0aGlja25lc3M6ICd1bmRlcmxpbmVUaGlja25lc3MnLFxuICAndW5kZXJsaW5lLXRoaWNrbmVzcyc6ICd1bmRlcmxpbmVUaGlja25lc3MnLFxuICB1bmljb2RlOiAndW5pY29kZScsXG4gIHVuaWNvZGViaWRpOiAndW5pY29kZUJpZGknLFxuICAndW5pY29kZS1iaWRpJzogJ3VuaWNvZGVCaWRpJyxcbiAgdW5pY29kZXJhbmdlOiAndW5pY29kZVJhbmdlJyxcbiAgJ3VuaWNvZGUtcmFuZ2UnOiAndW5pY29kZVJhbmdlJyxcbiAgdW5pdHNwZXJlbTogJ3VuaXRzUGVyRW0nLFxuICAndW5pdHMtcGVyLWVtJzogJ3VuaXRzUGVyRW0nLFxuICB1bnNlbGVjdGFibGU6ICd1bnNlbGVjdGFibGUnLFxuICB2YWxwaGFiZXRpYzogJ3ZBbHBoYWJldGljJyxcbiAgJ3YtYWxwaGFiZXRpYyc6ICd2QWxwaGFiZXRpYycsXG4gIHZhbHVlczogJ3ZhbHVlcycsXG4gIHZlY3RvcmVmZmVjdDogJ3ZlY3RvckVmZmVjdCcsXG4gICd2ZWN0b3ItZWZmZWN0JzogJ3ZlY3RvckVmZmVjdCcsXG4gIHZlcnNpb246ICd2ZXJzaW9uJyxcbiAgdmVydGFkdnk6ICd2ZXJ0QWR2WScsXG4gICd2ZXJ0LWFkdi15JzogJ3ZlcnRBZHZZJyxcbiAgdmVydG9yaWdpbng6ICd2ZXJ0T3JpZ2luWCcsXG4gICd2ZXJ0LW9yaWdpbi14JzogJ3ZlcnRPcmlnaW5YJyxcbiAgdmVydG9yaWdpbnk6ICd2ZXJ0T3JpZ2luWScsXG4gICd2ZXJ0LW9yaWdpbi15JzogJ3ZlcnRPcmlnaW5ZJyxcbiAgdmhhbmdpbmc6ICd2SGFuZ2luZycsXG4gICd2LWhhbmdpbmcnOiAndkhhbmdpbmcnLFxuICB2aWRlb2dyYXBoaWM6ICd2SWRlb2dyYXBoaWMnLFxuICAndi1pZGVvZ3JhcGhpYyc6ICd2SWRlb2dyYXBoaWMnLFxuICB2aWV3Ym94OiAndmlld0JveCcsXG4gIHZpZXd0YXJnZXQ6ICd2aWV3VGFyZ2V0JyxcbiAgdmlzaWJpbGl0eTogJ3Zpc2liaWxpdHknLFxuICB2bWF0aGVtYXRpY2FsOiAndk1hdGhlbWF0aWNhbCcsXG4gICd2LW1hdGhlbWF0aWNhbCc6ICd2TWF0aGVtYXRpY2FsJyxcbiAgdm9jYWI6ICd2b2NhYicsXG4gIHdpZHRoczogJ3dpZHRocycsXG4gIHdvcmRzcGFjaW5nOiAnd29yZFNwYWNpbmcnLFxuICAnd29yZC1zcGFjaW5nJzogJ3dvcmRTcGFjaW5nJyxcbiAgd3JpdGluZ21vZGU6ICd3cml0aW5nTW9kZScsXG4gICd3cml0aW5nLW1vZGUnOiAnd3JpdGluZ01vZGUnLFxuICB4MTogJ3gxJyxcbiAgeDI6ICd4MicsXG4gIHg6ICd4JyxcbiAgeGNoYW5uZWxzZWxlY3RvcjogJ3hDaGFubmVsU2VsZWN0b3InLFxuICB4aGVpZ2h0OiAneEhlaWdodCcsXG4gICd4LWhlaWdodCc6ICd4SGVpZ2h0JyxcbiAgeGxpbmthY3R1YXRlOiAneGxpbmtBY3R1YXRlJyxcbiAgJ3hsaW5rOmFjdHVhdGUnOiAneGxpbmtBY3R1YXRlJyxcbiAgeGxpbmthcmNyb2xlOiAneGxpbmtBcmNyb2xlJyxcbiAgJ3hsaW5rOmFyY3JvbGUnOiAneGxpbmtBcmNyb2xlJyxcbiAgeGxpbmtocmVmOiAneGxpbmtIcmVmJyxcbiAgJ3hsaW5rOmhyZWYnOiAneGxpbmtIcmVmJyxcbiAgeGxpbmtyb2xlOiAneGxpbmtSb2xlJyxcbiAgJ3hsaW5rOnJvbGUnOiAneGxpbmtSb2xlJyxcbiAgeGxpbmtzaG93OiAneGxpbmtTaG93JyxcbiAgJ3hsaW5rOnNob3cnOiAneGxpbmtTaG93JyxcbiAgeGxpbmt0aXRsZTogJ3hsaW5rVGl0bGUnLFxuICAneGxpbms6dGl0bGUnOiAneGxpbmtUaXRsZScsXG4gIHhsaW5rdHlwZTogJ3hsaW5rVHlwZScsXG4gICd4bGluazp0eXBlJzogJ3hsaW5rVHlwZScsXG4gIHhtbGJhc2U6ICd4bWxCYXNlJyxcbiAgJ3htbDpiYXNlJzogJ3htbEJhc2UnLFxuICB4bWxsYW5nOiAneG1sTGFuZycsXG4gICd4bWw6bGFuZyc6ICd4bWxMYW5nJyxcbiAgeG1sbnM6ICd4bWxucycsXG4gICd4bWw6c3BhY2UnOiAneG1sU3BhY2UnLFxuICB4bWxuc3hsaW5rOiAneG1sbnNYbGluaycsXG4gICd4bWxuczp4bGluayc6ICd4bWxuc1hsaW5rJyxcbiAgeG1sc3BhY2U6ICd4bWxTcGFjZScsXG4gIHkxOiAneTEnLFxuICB5MjogJ3kyJyxcbiAgeTogJ3knLFxuICB5Y2hhbm5lbHNlbGVjdG9yOiAneUNoYW5uZWxTZWxlY3RvcicsXG4gIHo6ICd6JyxcbiAgem9vbWFuZHBhbjogJ3pvb21BbmRQYW4nXG59O1xuXG52YXIgcG9zc2libGVTdGFuZGFyZE5hbWVzXzEgPSBwb3NzaWJsZVN0YW5kYXJkTmFtZXMkMTtcblxue1xuICB2YXIgd2FybmluZyQ3ID0gcmVxdWlyZSQkMDtcblxuICB2YXIgX3JlcXVpcmUkMyA9IFJlYWN0R2xvYmFsU2hhcmVkU3RhdGVfMSxcbiAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2skMiA9IF9yZXF1aXJlJDMuUmVhY3RDb21wb25lbnRUcmVlSG9vayxcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkNCA9IF9yZXF1aXJlJDMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuICB2YXIgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQkMiA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2skMi5nZXRTdGFja0FkZGVuZHVtQnlJRDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhY2tBZGRlbmR1bSQzKGRlYnVnSUQpIHtcbiAgaWYgKGRlYnVnSUQgIT0gbnVsbCkge1xuICAgIC8vIFRoaXMgY2FuIG9ubHkgaGFwcGVuIG9uIFN0YWNrXG4gICAgcmV0dXJuIGdldFN0YWNrQWRkZW5kdW1CeUlEJDIoZGVidWdJRCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBjYW4gb25seSBoYXBwZW4gb24gRmliZXIgLyBTZXJ2ZXJcbiAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDQuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgIHJldHVybiBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJztcbiAgfVxufVxuXG57XG4gIHZhciB3YXJuZWRQcm9wZXJ0aWVzJDEgPSB7fTtcbiAgdmFyIGhhc093blByb3BlcnR5JDEgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgRVZFTlRfTkFNRV9SRUdFWCA9IC9eb25bQS1aXS87XG4gIHZhciByQVJJQSQxID0gbmV3IFJlZ0V4cCgnXihhcmlhKS1bJyArIERPTVByb3BlcnR5XzEuQVRUUklCVVRFX05BTUVfQ0hBUiArICddKiQnKTtcbiAgdmFyIHJBUklBQ2FtZWwkMSA9IG5ldyBSZWdFeHAoJ14oYXJpYSlbQS1aXVsnICsgRE9NUHJvcGVydHlfMS5BVFRSSUJVVEVfTkFNRV9DSEFSICsgJ10qJCcpO1xuICB2YXIgcG9zc2libGVTdGFuZGFyZE5hbWVzID0gcG9zc2libGVTdGFuZGFyZE5hbWVzXzE7XG5cbiAgdmFyIHZhbGlkYXRlUHJvcGVydHkkMSA9IGZ1bmN0aW9uICh0YWdOYW1lLCBuYW1lLCB2YWx1ZSwgZGVidWdJRCkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eSQxLmNhbGwod2FybmVkUHJvcGVydGllcyQxLCBuYW1lKSAmJiB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0pIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChFdmVudFBsdWdpblJlZ2lzdHJ5XzEucmVnaXN0cmF0aW9uTmFtZU1vZHVsZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChFdmVudFBsdWdpblJlZ2lzdHJ5XzEucGx1Z2lucy5sZW5ndGggPT09IDAgJiYgRVZFTlRfTkFNRV9SRUdFWC50ZXN0KG5hbWUpKSB7XG4gICAgICAvLyBJZiBubyBldmVudCBwbHVnaW5zIGhhdmUgYmVlbiBpbmplY3RlZCwgd2UgbWlnaHQgYmUgaW4gYSBzZXJ2ZXIgZW52aXJvbm1lbnQuXG4gICAgICAvLyBEb24ndCBjaGVjayBldmVudHMgaW4gdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGxvd2VyQ2FzZWROYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciByZWdpc3RyYXRpb25OYW1lID0gRXZlbnRQbHVnaW5SZWdpc3RyeV8xLnBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXMuaGFzT3duUHJvcGVydHkobG93ZXJDYXNlZE5hbWUpID8gRXZlbnRQbHVnaW5SZWdpc3RyeV8xLnBvc3NpYmxlUmVnaXN0cmF0aW9uTmFtZXNbbG93ZXJDYXNlZE5hbWVdIDogbnVsbDtcblxuICAgIGlmIChyZWdpc3RyYXRpb25OYW1lICE9IG51bGwpIHtcbiAgICAgIHdhcm5pbmckNyhmYWxzZSwgJ0ludmFsaWQgZXZlbnQgaGFuZGxlciBwcm9wZXJ0eSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8lcycsIG5hbWUsIHJlZ2lzdHJhdGlvbk5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMyhkZWJ1Z0lEKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lLmluZGV4T2YoJ29uJykgPT09IDApIHtcbiAgICAgIHdhcm5pbmckNyhmYWxzZSwgJ1Vua25vd24gZXZlbnQgaGFuZGxlciBwcm9wZXJ0eSBgJXNgLiBJdCB3aWxsIGJlIGlnbm9yZWQuJXMnLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtJDMoZGVidWdJRCkpO1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIExldCB0aGUgQVJJQSBhdHRyaWJ1dGUgaG9vayB2YWxpZGF0ZSBBUklBIGF0dHJpYnV0ZXNcbiAgICBpZiAockFSSUEkMS50ZXN0KG5hbWUpIHx8IHJBUklBQ2FtZWwkMS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobG93ZXJDYXNlZE5hbWUgPT09ICdvbmZvY3VzaW4nIHx8IGxvd2VyQ2FzZWROYW1lID09PSAnb25mb2N1c291dCcpIHtcbiAgICAgIHdhcm5pbmckNyhmYWxzZSwgJ1JlYWN0IHVzZXMgb25Gb2N1cyBhbmQgb25CbHVyIGluc3RlYWQgb2Ygb25Gb2N1c0luIGFuZCBvbkZvY3VzT3V0LiAnICsgJ0FsbCBSZWFjdCBldmVudHMgYXJlIG5vcm1hbGl6ZWQgdG8gYnViYmxlLCBzbyBvbkZvY3VzSW4gYW5kIG9uRm9jdXNPdXQgJyArICdhcmUgbm90IG5lZWRlZC9zdXBwb3J0ZWQgYnkgUmVhY3QuJyk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnaW5uZXJodG1sJykge1xuICAgICAgd2FybmluZyQ3KGZhbHNlLCAnRGlyZWN0bHkgc2V0dGluZyBwcm9wZXJ0eSBgaW5uZXJIVE1MYCBpcyBub3QgcGVybWl0dGVkLiAnICsgJ0ZvciBtb3JlIGluZm9ybWF0aW9uLCBsb29rdXAgZG9jdW1lbnRhdGlvbiBvbiBgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxgLicpO1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChsb3dlckNhc2VkTmFtZSA9PT0gJ2FyaWEnKSB7XG4gICAgICB3YXJuaW5nJDcoZmFsc2UsICdUaGUgYGFyaWFgIGF0dHJpYnV0ZSBpcyByZXNlcnZlZCBmb3IgZnV0dXJlIHVzZSBpbiBSZWFjdC4gJyArICdQYXNzIGluZGl2aWR1YWwgYGFyaWEtYCBhdHRyaWJ1dGVzIGluc3RlYWQuJyk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGxvd2VyQ2FzZWROYW1lID09PSAnaXMnICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgd2FybmluZyQ3KGZhbHNlLCAnUmVjZWl2ZWQgYSBgJXNgIGZvciBzdHJpbmcgYXR0cmlidXRlIGBpc2AuIElmIHRoaXMgaXMgZXhwZWN0ZWQsIGNhc3QgJyArICd0aGUgdmFsdWUgdG8gYSBzdHJpbmcuJXMnLCB0eXBlb2YgdmFsdWUsIGdldFN0YWNrQWRkZW5kdW0kMyhkZWJ1Z0lEKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsdWUpKSB7XG4gICAgICB3YXJuaW5nJDcoZmFsc2UsICdSZWNlaXZlZCBOYU4gZm9yIG51bWVyaWMgYXR0cmlidXRlIGAlc2AuIElmIHRoaXMgaXMgZXhwZWN0ZWQsIGNhc3QgJyArICd0aGUgdmFsdWUgdG8gYSBzdHJpbmcuJXMnLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtJDMoZGVidWdJRCkpO1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHZhciBpc1Jlc2VydmVkID0gRE9NUHJvcGVydHlfMS5pc1Jlc2VydmVkUHJvcChuYW1lKTtcblxuICAgIC8vIEtub3duIGF0dHJpYnV0ZXMgc2hvdWxkIG1hdGNoIHRoZSBjYXNpbmcgc3BlY2lmaWVkIGluIHRoZSBwcm9wZXJ0eSBjb25maWcuXG4gICAgaWYgKHBvc3NpYmxlU3RhbmRhcmROYW1lcy5oYXNPd25Qcm9wZXJ0eShsb3dlckNhc2VkTmFtZSkpIHtcbiAgICAgIHZhciBzdGFuZGFyZE5hbWUgPSBwb3NzaWJsZVN0YW5kYXJkTmFtZXNbbG93ZXJDYXNlZE5hbWVdO1xuICAgICAgaWYgKHN0YW5kYXJkTmFtZSAhPT0gbmFtZSkge1xuICAgICAgICB3YXJuaW5nJDcoZmFsc2UsICdJbnZhbGlkIERPTSBwcm9wZXJ0eSBgJXNgLiBEaWQgeW91IG1lYW4gYCVzYD8lcycsIG5hbWUsIHN0YW5kYXJkTmFtZSwgZ2V0U3RhY2tBZGRlbmR1bSQzKGRlYnVnSUQpKTtcbiAgICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZCAmJiBuYW1lICE9PSBsb3dlckNhc2VkTmFtZSkge1xuICAgICAgLy8gVW5rbm93biBhdHRyaWJ1dGVzIHNob3VsZCBoYXZlIGxvd2VyY2FzZSBjYXNpbmcgc2luY2UgdGhhdCdzIGhvdyB0aGV5XG4gICAgICAvLyB3aWxsIGJlIGNhc2VkIGFueXdheSB3aXRoIHNlcnZlciByZW5kZXJpbmcuXG4gICAgICB3YXJuaW5nJDcoZmFsc2UsICdSZWFjdCBkb2VzIG5vdCByZWNvZ25pemUgdGhlIGAlc2AgcHJvcCBvbiBhIERPTSBlbGVtZW50LiBJZiB5b3UgJyArICdpbnRlbnRpb25hbGx5IHdhbnQgaXQgdG8gYXBwZWFyIGluIHRoZSBET00gYXMgYSBjdXN0b20gJyArICdhdHRyaWJ1dGUsIHNwZWxsIGl0IGFzIGxvd2VyY2FzZSBgJXNgIGluc3RlYWQuICcgKyAnSWYgeW91IGFjY2lkZW50YWxseSBwYXNzZWQgaXQgZnJvbSBhIHBhcmVudCBjb21wb25lbnQsIHJlbW92ZSAnICsgJ2l0IGZyb20gdGhlIERPTSBlbGVtZW50LiVzJywgbmFtZSwgbG93ZXJDYXNlZE5hbWUsIGdldFN0YWNrQWRkZW5kdW0kMyhkZWJ1Z0lEKSk7XG4gICAgICB3YXJuZWRQcm9wZXJ0aWVzJDFbbmFtZV0gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB3YXJuaW5nJDcoRE9NUHJvcGVydHlfMS5zaG91bGRBdHRyaWJ1dGVBY2NlcHRCb29sZWFuVmFsdWUobmFtZSksICdSZWNlaXZlZCBgJXNgIGZvciBub24tYm9vbGVhbiBhdHRyaWJ1dGUgYCVzYC4gSWYgdGhpcyBpcyBleHBlY3RlZCwgY2FzdCAnICsgJ3RoZSB2YWx1ZSB0byBhIHN0cmluZy4lcycsIHZhbHVlLCBuYW1lLCBnZXRTdGFja0FkZGVuZHVtJDMoZGVidWdJRCkpO1xuICAgICAgd2FybmVkUHJvcGVydGllcyQxW25hbWVdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIE5vdyB0aGF0IHdlJ3ZlIHZhbGlkYXRlZCBjYXNpbmcsIGRvIG5vdCB2YWxpZGF0ZVxuICAgIC8vIGRhdGEgdHlwZXMgZm9yIHJlc2VydmVkIHByb3BzXG4gICAgaWYgKGlzUmVzZXJ2ZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFdhcm4gd2hlbiBhIGtub3duIGF0dHJpYnV0ZSBpcyBhIGJhZCB0eXBlXG4gICAgaWYgKCFET01Qcm9wZXJ0eV8xLnNob3VsZFNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkpIHtcbiAgICAgIHdhcm5lZFByb3BlcnRpZXMkMVtuYW1lXSA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5cbnZhciB3YXJuVW5rbm93blByb3BlcnRpZXMgPSBmdW5jdGlvbiAodHlwZSwgcHJvcHMsIGRlYnVnSUQpIHtcbiAgdmFyIHVua25vd25Qcm9wcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICB2YXIgaXNWYWxpZCA9IHZhbGlkYXRlUHJvcGVydHkkMSh0eXBlLCBrZXksIHByb3BzW2tleV0sIGRlYnVnSUQpO1xuICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgdW5rbm93blByb3BzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cblxuICB2YXIgdW5rbm93blByb3BTdHJpbmcgPSB1bmtub3duUHJvcHMubWFwKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgcmV0dXJuICdgJyArIHByb3AgKyAnYCc7XG4gIH0pLmpvaW4oJywgJyk7XG4gIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgd2FybmluZyQ3KGZhbHNlLCAnSW52YWxpZCB2YWx1ZSBmb3IgcHJvcCAlcyBvbiA8JXM+IHRhZy4gRWl0aGVyIHJlbW92ZSBpdCBmcm9tIHRoZSBlbGVtZW50LCAnICsgJ29yIHBhc3MgYSBzdHJpbmcgb3IgbnVtYmVyIHZhbHVlIHRvIGtlZXAgaXQgaW4gdGhlIERPTS4gJyArICdGb3IgZGV0YWlscywgc2VlIGh0dHBzOi8vZmIubWUvcmVhY3QtYXR0cmlidXRlLWJlaGF2aW9yJXMnLCB1bmtub3duUHJvcFN0cmluZywgdHlwZSwgZ2V0U3RhY2tBZGRlbmR1bSQzKGRlYnVnSUQpKTtcbiAgfSBlbHNlIGlmICh1bmtub3duUHJvcHMubGVuZ3RoID4gMSkge1xuICAgIHdhcm5pbmckNyhmYWxzZSwgJ0ludmFsaWQgdmFsdWVzIGZvciBwcm9wcyAlcyBvbiA8JXM+IHRhZy4gRWl0aGVyIHJlbW92ZSB0aGVtIGZyb20gdGhlIGVsZW1lbnQsICcgKyAnb3IgcGFzcyBhIHN0cmluZyBvciBudW1iZXIgdmFsdWUgdG8ga2VlcCB0aGVtIGluIHRoZSBET00uICcgKyAnRm9yIGRldGFpbHMsIHNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWF0dHJpYnV0ZS1iZWhhdmlvciVzJywgdW5rbm93blByb3BTdHJpbmcsIHR5cGUsIGdldFN0YWNrQWRkZW5kdW0kMyhkZWJ1Z0lEKSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcGVydGllcyQyKHR5cGUsIHByb3BzLCBkZWJ1Z0lEIC8qIFN0YWNrIG9ubHkgKi8pIHtcbiAgaWYgKGlzQ3VzdG9tQ29tcG9uZW50XzEodHlwZSwgcHJvcHMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHdhcm5Vbmtub3duUHJvcGVydGllcyh0eXBlLCBwcm9wcywgZGVidWdJRCk7XG59XG5cbnZhciBSZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2sgPSB7XG4gIC8vIEZpYmVyXG4gIHZhbGlkYXRlUHJvcGVydGllczogdmFsaWRhdGVQcm9wZXJ0aWVzJDIsXG4gIC8vIFN0YWNrXG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaWYgKHRydWUgJiYgZWxlbWVudCAhPSBudWxsICYmIHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMihlbGVtZW50LnR5cGUsIGVsZW1lbnQucHJvcHMsIGRlYnVnSUQpO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChkZWJ1Z0lELCBlbGVtZW50KSB7XG4gICAgaWYgKHRydWUgJiYgZWxlbWVudCAhPSBudWxsICYmIHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWxpZGF0ZVByb3BlcnRpZXMkMihlbGVtZW50LnR5cGUsIGVsZW1lbnQucHJvcHMsIGRlYnVnSUQpO1xuICAgIH1cbiAgfVxufTtcblxudmFyIFJlYWN0RE9NVW5rbm93blByb3BlcnR5SG9va18xID0gUmVhY3RET01Vbmtub3duUHJvcGVydHlIb29rO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTmFtZXNwYWNlcyA9IERPTU5hbWVzcGFjZXMuTmFtZXNwYWNlcztcbnZhciBnZXRJbnRyaW5zaWNOYW1lc3BhY2UgPSBET01OYW1lc3BhY2VzLmdldEludHJpbnNpY05hbWVzcGFjZTtcbnZhciBnZXRDaGlsZE5hbWVzcGFjZSA9IERPTU5hbWVzcGFjZXMuZ2V0Q2hpbGROYW1lc3BhY2U7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG52YXIgdG9BcnJheSA9IHJlYWN0LkNoaWxkcmVuLnRvQXJyYXk7XG5cbntcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlJCQwO1xuICB2YXIgY2hlY2tQcm9wVHlwZXMkMSA9IGNoZWNrUHJvcFR5cGVzO1xuICB2YXIgd2FyblZhbGlkU3R5bGUgPSB3YXJuVmFsaWRTdHlsZV8xO1xuXG4gIHZhciBfcmVxdWlyZTIgPSBSZWFjdERPTUludmFsaWRBUklBSG9va18xLFxuICAgICAgdmFsaWRhdGVBUklBUHJvcGVydGllcyA9IF9yZXF1aXJlMi52YWxpZGF0ZVByb3BlcnRpZXM7XG5cbiAgdmFyIF9yZXF1aXJlMyA9IFJlYWN0RE9NTnVsbElucHV0VmFsdWVQcm9wSG9va18xLFxuICAgICAgdmFsaWRhdGVJbnB1dFByb3BlcnRpZXMgPSBfcmVxdWlyZTMudmFsaWRhdGVQcm9wZXJ0aWVzO1xuXG4gIHZhciBfcmVxdWlyZTQgPSBSZWFjdERPTVVua25vd25Qcm9wZXJ0eUhvb2tfMSxcbiAgICAgIHZhbGlkYXRlVW5rbm93blByb3BlcnRpZXMgPSBfcmVxdWlyZTQudmFsaWRhdGVQcm9wZXJ0aWVzO1xuXG4gIHZhciB2YWxpZGF0ZVByb3BlcnRpZXNJbkRldmVsb3BtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gICAgdmFsaWRhdGVBUklBUHJvcGVydGllcyh0eXBlLCBwcm9wcyk7XG4gICAgdmFsaWRhdGVJbnB1dFByb3BlcnRpZXModHlwZSwgcHJvcHMpO1xuICAgIHZhbGlkYXRlVW5rbm93blByb3BlcnRpZXModHlwZSwgcHJvcHMpO1xuICB9O1xuXG4gIHZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gZGVzY3JpYmVDb21wb25lbnRGcmFtZSQxO1xuICB2YXIgZGVzY3JpYmVTdGFja0ZyYW1lID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKTtcbiAgICB2YXIgb3duZXJOYW1lID0gbnVsbDtcbiAgICByZXR1cm4gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSk7XG4gIH07XG5cbiAgdmFyIF9yZXF1aXJlNSA9IFJlYWN0R2xvYmFsU2hhcmVkU3RhdGVfMSxcbiAgICAgIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBfcmVxdWlyZTUuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcblxuICB2YXIgY3VycmVudERlYnVnU3RhY2sgPSBudWxsO1xuICB2YXIgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gbnVsbDtcbiAgdmFyIHNldEN1cnJlbnREZWJ1Z1N0YWNrID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0uZGVidWdFbGVtZW50U3RhY2s7XG4gICAgLy8gV2UgYXJlIGFib3V0IHRvIGVudGVyIGEgbmV3IGNvbXBvc2l0ZSBzdGFjaywgcmVzZXQgdGhlIGFycmF5LlxuICAgIGN1cnJlbnREZWJ1Z0VsZW1lbnRTdGFjay5sZW5ndGggPSAwO1xuICAgIGN1cnJlbnREZWJ1Z1N0YWNrID0gc3RhY2s7XG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBnZXRTdGFja0FkZGVuZHVtO1xuICB9O1xuICB2YXIgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2sgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGlmIChjdXJyZW50RGVidWdFbGVtZW50U3RhY2sgIT09IG51bGwpIHtcbiAgICAgIGN1cnJlbnREZWJ1Z0VsZW1lbnRTdGFjay5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHJlc2V0Q3VycmVudERlYnVnU3RhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgY3VycmVudERlYnVnRWxlbWVudFN0YWNrID0gbnVsbDtcbiAgICBjdXJyZW50RGVidWdTdGFjayA9IG51bGw7XG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2sgPSBudWxsO1xuICB9O1xuICB2YXIgZ2V0U3RhY2tBZGRlbmR1bSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY3VycmVudERlYnVnU3RhY2sgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgc3RhY2sgPSAnJztcbiAgICB2YXIgZGVidWdTdGFjayA9IGN1cnJlbnREZWJ1Z1N0YWNrO1xuICAgIGZvciAodmFyIGkgPSBkZWJ1Z1N0YWNrLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZGVidWdFbGVtZW50U3RhY2sgPSBkZWJ1Z1N0YWNrW2ldLmRlYnVnRWxlbWVudFN0YWNrO1xuICAgICAgZm9yICh2YXIgaWkgPSBkZWJ1Z0VsZW1lbnRTdGFjay5sZW5ndGggLSAxOyBpaSA+PSAwOyBpaS0tKSB7XG4gICAgICAgIHN0YWNrICs9IGRlc2NyaWJlU3RhY2tGcmFtZShkZWJ1Z0VsZW1lbnRTdGFja1tpaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbnZhciBkaWRXYXJuRGVmYXVsdElucHV0VmFsdWUgPSBmYWxzZTtcbnZhciBkaWRXYXJuRGVmYXVsdENoZWNrZWQgPSBmYWxzZTtcbnZhciBkaWRXYXJuRGVmYXVsdFNlbGVjdFZhbHVlID0gZmFsc2U7XG52YXIgZGlkV2FybkRlZmF1bHRUZXh0YXJlYVZhbHVlID0gZmFsc2U7XG52YXIgZGlkV2FybkludmFsaWRPcHRpb25DaGlsZHJlbiA9IGZhbHNlO1xudmFyIHZhbHVlUHJvcE5hbWVzID0gWyd2YWx1ZScsICdkZWZhdWx0VmFsdWUnXTtcbnZhciBuZXdsaW5lRWF0aW5nVGFncyA9IHtcbiAgbGlzdGluZzogdHJ1ZSxcbiAgcHJlOiB0cnVlLFxuICB0ZXh0YXJlYTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgPyB0eXBlIDogdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSA6IG51bGw7XG59XG5cbi8vIFdlIGFjY2VwdCBhbnkgdGFnIHRvIGJlIHJlbmRlcmVkIGJ1dCBzaW5jZSB0aGlzIGdldHMgaW5qZWN0ZWQgaW50byBhcmJpdHJhcnlcbi8vIEhUTUwsIHdlIHdhbnQgdG8gbWFrZSBzdXJlIHRoYXQgaXQncyBhIHNhZmUgdGFnLlxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZVxudmFyIFZBTElEX1RBR19SRUdFWCA9IC9eW2EtekEtWl1bYS16QS1aOl9cXC5cXC1cXGRdKiQvOyAvLyBTaW1wbGlmaWVkIHN1YnNldFxudmFyIHZhbGlkYXRlZFRhZ0NhY2hlID0ge307XG5mdW5jdGlvbiB2YWxpZGF0ZURhbmdlcm91c1RhZyh0YWcpIHtcbiAgaWYgKCF2YWxpZGF0ZWRUYWdDYWNoZS5oYXNPd25Qcm9wZXJ0eSh0YWcpKSB7XG4gICAgIVZBTElEX1RBR19SRUdFWC50ZXN0KHRhZykgPyBpbnZhcmlhbnQoZmFsc2UsICdJbnZhbGlkIHRhZzogJXMnLCB0YWcpIDogdm9pZCAwO1xuICAgIHZhbGlkYXRlZFRhZ0NhY2hlW3RhZ10gPSB0cnVlO1xuICB9XG59XG5cbnZhciBwcm9jZXNzU3R5bGVOYW1lID0gbWVtb2l6ZVN0cmluZ09ubHkoZnVuY3Rpb24gKHN0eWxlTmFtZSkge1xuICByZXR1cm4gaHlwaGVuYXRlU3R5bGVOYW1lKHN0eWxlTmFtZSk7XG59KTtcblxuZnVuY3Rpb24gY3JlYXRlTWFya3VwRm9yU3R5bGVzKHN0eWxlcywgY29tcG9uZW50KSB7XG4gIHZhciBzZXJpYWxpemVkID0gJyc7XG4gIHZhciBkZWxpbWl0ZXIgPSAnJztcbiAgZm9yICh2YXIgc3R5bGVOYW1lIGluIHN0eWxlcykge1xuICAgIGlmICghc3R5bGVzLmhhc093blByb3BlcnR5KHN0eWxlTmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgaXNDdXN0b21Qcm9wZXJ0eSA9IHN0eWxlTmFtZS5pbmRleE9mKCctLScpID09PSAwO1xuICAgIHZhciBzdHlsZVZhbHVlID0gc3R5bGVzW3N0eWxlTmFtZV07XG4gICAge1xuICAgICAgaWYgKCFpc0N1c3RvbVByb3BlcnR5KSB7XG4gICAgICAgIHdhcm5WYWxpZFN0eWxlKHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSwgY29tcG9uZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0eWxlVmFsdWUgIT0gbnVsbCkge1xuICAgICAgc2VyaWFsaXplZCArPSBkZWxpbWl0ZXIgKyBwcm9jZXNzU3R5bGVOYW1lKHN0eWxlTmFtZSkgKyAnOic7XG4gICAgICBzZXJpYWxpemVkICs9IGRhbmdlcm91c1N0eWxlVmFsdWVfMShzdHlsZU5hbWUsIHN0eWxlVmFsdWUsIGlzQ3VzdG9tUHJvcGVydHkpO1xuXG4gICAgICBkZWxpbWl0ZXIgPSAnOyc7XG4gICAgfVxuICB9XG4gIHJldHVybiBzZXJpYWxpemVkIHx8IG51bGw7XG59XG5cbmZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRpbmcgY29tcG9uZW50LiAnICsgJ1RoaXMgdXN1YWxseSBtZWFucyB5b3UgY2FsbGVkICVzKCkgb3V0c2lkZSBjb21wb25lbnRXaWxsTW91bnQoKSBvbiB0aGUgc2VydmVyLiAnICsgJ1RoaXMgaXMgYSBuby1vcC5cXG5cXG5QbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgY29uc3RydWN0b3IgJiYgZ2V0Q29tcG9uZW50TmFtZShjb25zdHJ1Y3RvcikgfHwgJ1JlYWN0Q2xhc3MnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaG91bGRDb25zdHJ1Y3QoQ29tcG9uZW50KSB7XG4gIHJldHVybiBDb21wb25lbnQucHJvdG90eXBlICYmIENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudDtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uQ2hpbGRyZW5Jbm5lck1hcmt1cChwcm9wcykge1xuICB2YXIgaW5uZXJIVE1MID0gcHJvcHMuZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw7XG4gIGlmIChpbm5lckhUTUwgIT0gbnVsbCkge1xuICAgIGlmIChpbm5lckhUTUwuX19odG1sICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBpbm5lckhUTUwuX19odG1sO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgY29udGVudCA9IHByb3BzLmNoaWxkcmVuO1xuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGNvbnRlbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyXzEoY29udGVudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBmbGF0dGVuT3B0aW9uQ2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgdmFyIGNvbnRlbnQgPSAnJztcbiAgLy8gRmxhdHRlbiBjaGlsZHJlbiBhbmQgd2FybiBpZiB0aGV5IGFyZW4ndCBzdHJpbmdzIG9yIG51bWJlcnM7XG4gIC8vIGludmFsaWQgdHlwZXMgYXJlIGlnbm9yZWQuXG4gIHJlYWN0LkNoaWxkcmVuLmZvckVhY2goY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkge1xuICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnRlbnQgKz0gY2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHtcbiAgICAgICAgaWYgKCFkaWRXYXJuSW52YWxpZE9wdGlvbkNoaWxkcmVuKSB7XG4gICAgICAgICAgZGlkV2FybkludmFsaWRPcHRpb25DaGlsZHJlbiA9IHRydWU7XG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ09ubHkgc3RyaW5ncyBhbmQgbnVtYmVycyBhcmUgc3VwcG9ydGVkIGFzIDxvcHRpb24+IGNoaWxkcmVuLicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIG1hc2tDb250ZXh0KHR5cGUsIGNvbnRleHQpIHtcbiAgdmFyIGNvbnRleHRUeXBlcyA9IHR5cGUuY29udGV4dFR5cGVzO1xuICBpZiAoIWNvbnRleHRUeXBlcykge1xuICAgIHJldHVybiBlbXB0eU9iamVjdDtcbiAgfVxuICB2YXIgbWFza2VkQ29udGV4dCA9IHt9O1xuICBmb3IgKHZhciBjb250ZXh0TmFtZSBpbiBjb250ZXh0VHlwZXMpIHtcbiAgICBtYXNrZWRDb250ZXh0W2NvbnRleHROYW1lXSA9IGNvbnRleHRbY29udGV4dE5hbWVdO1xuICB9XG4gIHJldHVybiBtYXNrZWRDb250ZXh0O1xufVxuXG5mdW5jdGlvbiBjaGVja0NvbnRleHRUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24pIHtcbiAge1xuICAgIGNoZWNrUHJvcFR5cGVzJDEodHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCAnQ29tcG9uZW50JywgZ2V0U3RhY2tBZGRlbmR1bSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0NvbnRleHQodHlwZSwgY29udGV4dCkge1xuICB2YXIgbWFza2VkQ29udGV4dCA9IG1hc2tDb250ZXh0KHR5cGUsIGNvbnRleHQpO1xuICB7XG4gICAgaWYgKHR5cGUuY29udGV4dFR5cGVzKSB7XG4gICAgICBjaGVja0NvbnRleHRUeXBlcyh0eXBlLmNvbnRleHRUeXBlcywgbWFza2VkQ29udGV4dCwgJ2NvbnRleHQnKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1hc2tlZENvbnRleHQ7XG59XG5cbnZhciBTVFlMRSA9ICdzdHlsZSc7XG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGNoaWxkcmVuOiBudWxsLFxuICBkYW5nZXJvdXNseVNldElubmVySFRNTDogbnVsbCxcbiAgc3VwcHJlc3NDb250ZW50RWRpdGFibGVXYXJuaW5nOiBudWxsXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVPcGVuVGFnTWFya3VwKHRhZ1ZlcmJhdGltLCB0YWdMb3dlcmNhc2UsIHByb3BzLCBuYW1lc3BhY2UsIG1ha2VTdGF0aWNNYXJrdXAsIGlzUm9vdEVsZW1lbnQsIGluc3RGb3JEZWJ1Zykge1xuICB2YXIgcmV0ID0gJzwnICsgdGFnVmVyYmF0aW07XG5cbiAgZm9yICh2YXIgcHJvcEtleSBpbiBwcm9wcykge1xuICAgIGlmICghcHJvcHMuaGFzT3duUHJvcGVydHkocHJvcEtleSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcEtleV07XG4gICAgaWYgKHByb3BWYWx1ZSA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHByb3BLZXkgPT09IFNUWUxFKSB7XG4gICAgICBwcm9wVmFsdWUgPSBjcmVhdGVNYXJrdXBGb3JTdHlsZXMocHJvcFZhbHVlLCBpbnN0Rm9yRGVidWcpO1xuICAgIH1cbiAgICB2YXIgbWFya3VwID0gbnVsbDtcbiAgICBpZiAoaXNDdXN0b21Db21wb25lbnRfMSh0YWdMb3dlcmNhc2UsIHByb3BzKSkge1xuICAgICAgaWYgKCFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wS2V5KSkge1xuICAgICAgICBtYXJrdXAgPSBET01NYXJrdXBPcGVyYXRpb25zXzEuY3JlYXRlTWFya3VwRm9yQ3VzdG9tQXR0cmlidXRlKHByb3BLZXksIHByb3BWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmt1cCA9IERPTU1hcmt1cE9wZXJhdGlvbnNfMS5jcmVhdGVNYXJrdXBGb3JQcm9wZXJ0eShwcm9wS2V5LCBwcm9wVmFsdWUpO1xuICAgIH1cbiAgICBpZiAobWFya3VwKSB7XG4gICAgICByZXQgKz0gJyAnICsgbWFya3VwO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvciBzdGF0aWMgcGFnZXMsIG5vIG5lZWQgdG8gcHV0IFJlYWN0IElEIGFuZCBjaGVja3N1bS4gU2F2ZXMgbG90cyBvZlxuICAvLyBieXRlcy5cbiAgaWYgKG1ha2VTdGF0aWNNYXJrdXApIHtcbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgaWYgKGlzUm9vdEVsZW1lbnQpIHtcbiAgICByZXQgKz0gJyAnICsgRE9NTWFya3VwT3BlcmF0aW9uc18xLmNyZWF0ZU1hcmt1cEZvclJvb3QoKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZVJlbmRlclJlc3VsdChjaGlsZCwgdHlwZSkge1xuICBpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCkge1xuICAgIGludmFyaWFudChmYWxzZSwgJyVzKC4uLik6IE5vdGhpbmcgd2FzIHJldHVybmVkIGZyb20gcmVuZGVyLiBUaGlzIHVzdWFsbHkgbWVhbnMgYSByZXR1cm4gc3RhdGVtZW50IGlzIG1pc3NpbmcuIE9yLCB0byByZW5kZXIgbm90aGluZywgcmV0dXJuIG51bGwuJywgZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB8fCAnQ29tcG9uZW50Jyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZShjaGlsZCwgY29udGV4dCkge1xuICB3aGlsZSAocmVhY3QuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAge1xuICAgICAgcHVzaEVsZW1lbnRUb0RlYnVnU3RhY2soY2hpbGQpO1xuICAgIH1cbiAgICB2YXIgQ29tcG9uZW50ID0gY2hpbGQudHlwZTtcbiAgICBpZiAodHlwZW9mIENvbXBvbmVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZhciBwdWJsaWNDb250ZXh0ID0gcHJvY2Vzc0NvbnRleHQoQ29tcG9uZW50LCBjb250ZXh0KTtcbiAgICB2YXIgaW5zdDtcbiAgICB2YXIgcXVldWUgPSBbXTtcbiAgICB2YXIgcmVwbGFjZSA9IGZhbHNlO1xuICAgIHZhciB1cGRhdGVyID0ge1xuICAgICAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGVucXVldWVGb3JjZVVwZGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgICAgIGlmIChxdWV1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgICAgICByZXBsYWNlID0gdHJ1ZTtcbiAgICAgICAgcXVldWUgPSBbY29tcGxldGVTdGF0ZV07XG4gICAgICB9LFxuICAgICAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICBpZiAocXVldWUgPT09IG51bGwpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3NldFN0YXRlJyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcXVldWUucHVzaChwYXJ0aWFsU3RhdGUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkpIHtcbiAgICAgIGluc3QgPSBuZXcgQ29tcG9uZW50KGNoaWxkLnByb3BzLCBwdWJsaWNDb250ZXh0LCB1cGRhdGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdCA9IENvbXBvbmVudChjaGlsZC5wcm9wcywgcHVibGljQ29udGV4dCwgdXBkYXRlcik7XG4gICAgICBpZiAoaW5zdCA9PSBudWxsIHx8IGluc3QucmVuZGVyID09IG51bGwpIHtcbiAgICAgICAgY2hpbGQgPSBpbnN0O1xuICAgICAgICB2YWxpZGF0ZVJlbmRlclJlc3VsdChjaGlsZCwgQ29tcG9uZW50KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW5zdC5wcm9wcyA9IGNoaWxkLnByb3BzO1xuICAgIGluc3QuY29udGV4dCA9IHB1YmxpY0NvbnRleHQ7XG4gICAgaW5zdC51cGRhdGVyID0gdXBkYXRlcjtcblxuICAgIHZhciBpbml0aWFsU3RhdGUgPSBpbnN0LnN0YXRlO1xuICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5zdC5zdGF0ZSA9IGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgfVxuICAgIGlmIChpbnN0LmNvbXBvbmVudFdpbGxNb3VudCkge1xuICAgICAgaW5zdC5jb21wb25lbnRXaWxsTW91bnQoKTtcbiAgICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHZhciBvbGRSZXBsYWNlID0gcmVwbGFjZTtcbiAgICAgICAgcXVldWUgPSBudWxsO1xuICAgICAgICByZXBsYWNlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9sZFJlcGxhY2UgJiYgb2xkUXVldWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgaW5zdC5zdGF0ZSA9IG9sZFF1ZXVlWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXh0U3RhdGUgPSBvbGRSZXBsYWNlID8gb2xkUXVldWVbMF0gOiBpbnN0LnN0YXRlO1xuICAgICAgICAgIHZhciBkb250TXV0YXRlID0gdHJ1ZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gb2xkUmVwbGFjZSA/IDEgOiAwOyBpIDwgb2xkUXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYXJ0aWFsID0gb2xkUXVldWVbaV07XG4gICAgICAgICAgICB2YXIgcGFydGlhbFN0YXRlID0gdHlwZW9mIHBhcnRpYWwgPT09ICdmdW5jdGlvbicgPyBwYXJ0aWFsLmNhbGwoaW5zdCwgbmV4dFN0YXRlLCBjaGlsZC5wcm9wcywgcHVibGljQ29udGV4dCkgOiBwYXJ0aWFsO1xuICAgICAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICAgICAgICBpZiAoZG9udE11dGF0ZSkge1xuICAgICAgICAgICAgICAgIGRvbnRNdXRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBuZXh0U3RhdGUgPSBvYmplY3RBc3NpZ24kMSh7fSwgbmV4dFN0YXRlLCBwYXJ0aWFsU3RhdGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdEFzc2lnbiQxKG5leHRTdGF0ZSwgcGFydGlhbFN0YXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpbnN0LnN0YXRlID0gbmV4dFN0YXRlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGNoaWxkID0gaW5zdC5yZW5kZXIoKTtcblxuICAgIHtcbiAgICAgIGlmIChjaGlsZCA9PT0gdW5kZWZpbmVkICYmIGluc3QucmVuZGVyLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICBjaGlsZCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRlUmVuZGVyUmVzdWx0KGNoaWxkLCBDb21wb25lbnQpO1xuXG4gICAgdmFyIGNoaWxkQ29udGV4dDtcbiAgICBpZiAodHlwZW9mIGluc3QuZ2V0Q2hpbGRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgY2hpbGRDb250ZXh0VHlwZXMgPSBDb21wb25lbnQuY2hpbGRDb250ZXh0VHlwZXM7XG4gICAgICAhKHR5cGVvZiBjaGlsZENvbnRleHRUeXBlcyA9PT0gJ29iamVjdCcpID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0Q2hpbGRDb250ZXh0KCk6IGNoaWxkQ29udGV4dFR5cGVzIG11c3QgYmUgZGVmaW5lZCBpbiBvcmRlciB0byB1c2UgZ2V0Q2hpbGRDb250ZXh0KCkuJywgZ2V0Q29tcG9uZW50TmFtZShDb21wb25lbnQpIHx8ICdVbmtub3duJykgOiB2b2lkIDA7XG4gICAgICBjaGlsZENvbnRleHQgPSBpbnN0LmdldENoaWxkQ29udGV4dCgpO1xuICAgICAgZm9yICh2YXIgY29udGV4dEtleSBpbiBjaGlsZENvbnRleHQpIHtcbiAgICAgICAgIShjb250ZXh0S2V5IGluIGNoaWxkQ29udGV4dFR5cGVzKSA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldENoaWxkQ29udGV4dCgpOiBrZXkgXCIlc1wiIGlzIG5vdCBkZWZpbmVkIGluIGNoaWxkQ29udGV4dFR5cGVzLicsIGdldENvbXBvbmVudE5hbWUoQ29tcG9uZW50KSB8fCAnVW5rbm93bicsIGNvbnRleHRLZXkpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hpbGRDb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gb2JqZWN0QXNzaWduJDEoe30sIGNvbnRleHQsIGNoaWxkQ29udGV4dCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7IGNoaWxkOiBjaGlsZCwgY29udGV4dDogY29udGV4dCB9O1xufVxuXG52YXIgUmVhY3RET01TZXJ2ZXJSZW5kZXJlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUmVhY3RET01TZXJ2ZXJSZW5kZXJlcihlbGVtZW50LCBtYWtlU3RhdGljTWFya3VwKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlYWN0RE9NU2VydmVyUmVuZGVyZXIpO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gcmVhY3QuaXNWYWxpZEVsZW1lbnQoZWxlbWVudCkgPyBbZWxlbWVudF0gOiB0b0FycmF5KGVsZW1lbnQpO1xuICAgIHZhciB0b3BGcmFtZSA9IHtcbiAgICAgIC8vIEFzc3VtZSBhbGwgdHJlZXMgc3RhcnQgaW4gdGhlIEhUTUwgbmFtZXNwYWNlIChub3QgdG90YWxseSB0cnVlLCBidXRcbiAgICAgIC8vIHRoaXMgaXMgd2hhdCB3ZSBkaWQgaGlzdG9yaWNhbGx5KVxuICAgICAgZG9tTmFtZXNwYWNlOiBOYW1lc3BhY2VzLmh0bWwsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgY29udGV4dDogZW1wdHlPYmplY3QsXG4gICAgICBmb290ZXI6ICcnXG4gICAgfTtcbiAgICB7XG4gICAgICB0b3BGcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrID0gW3RvcEZyYW1lXTtcbiAgICB0aGlzLmV4aGF1c3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY3VycmVudFNlbGVjdFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICB0aGlzLm1ha2VTdGF0aWNNYXJrdXAgPSBtYWtlU3RhdGljTWFya3VwO1xuICB9XG5cbiAgUmVhY3RET01TZXJ2ZXJSZW5kZXJlci5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIHJlYWQoYnl0ZXMpIHtcbiAgICBpZiAodGhpcy5leGhhdXN0ZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSAnJztcbiAgICB3aGlsZSAob3V0Lmxlbmd0aCA8IGJ5dGVzKSB7XG4gICAgICBpZiAodGhpcy5zdGFjay5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5leGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHZhciBmcmFtZSA9IHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChmcmFtZS5jaGlsZEluZGV4ID49IGZyYW1lLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBvdXQgKz0gZnJhbWUuZm9vdGVyO1xuICAgICAgICB0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgICAgaWYgKGZyYW1lLnRhZyA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RWYWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGQgPSBmcmFtZS5jaGlsZHJlbltmcmFtZS5jaGlsZEluZGV4KytdO1xuICAgICAge1xuICAgICAgICBzZXRDdXJyZW50RGVidWdTdGFjayh0aGlzLnN0YWNrKTtcbiAgICAgIH1cbiAgICAgIG91dCArPSB0aGlzLnJlbmRlcihjaGlsZCwgZnJhbWUuY29udGV4dCwgZnJhbWUuZG9tTmFtZXNwYWNlKTtcbiAgICAgIHtcbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIHJlZW50cmFudCBzZXJ2ZXIgcmVuZGVyIGNhbGxzLiBUaGlzIGRvZXNuJ3QuXG4gICAgICAgIHJlc2V0Q3VycmVudERlYnVnU3RhY2soKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbiAgfTtcblxuICBSZWFjdERPTVNlcnZlclJlbmRlcmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoY2hpbGQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhciB0ZXh0ID0gJycgKyBjaGlsZDtcbiAgICAgIGlmICh0ZXh0ID09PSAnJykge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5tYWtlU3RhdGljTWFya3VwKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXJfMSh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnByZXZpb3VzV2FzVGV4dE5vZGUpIHtcbiAgICAgICAgcmV0dXJuICc8IS0tIC0tPicgKyBlc2NhcGVUZXh0Q29udGVudEZvckJyb3dzZXJfMSh0ZXh0KTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJldmlvdXNXYXNUZXh0Tm9kZSA9IHRydWU7XG4gICAgICByZXR1cm4gZXNjYXBlVGV4dENvbnRlbnRGb3JCcm93c2VyXzEodGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfcmVzb2x2ZSA9IHJlc29sdmUoY2hpbGQsIGNvbnRleHQpO1xuXG4gICAgICBjaGlsZCA9IF9yZXNvbHZlLmNoaWxkO1xuICAgICAgY29udGV4dCA9IF9yZXNvbHZlLmNvbnRleHQ7XG5cbiAgICAgIGlmIChjaGlsZCA9PT0gbnVsbCB8fCBjaGlsZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckRPTShjaGlsZCwgY29udGV4dCwgcGFyZW50TmFtZXNwYWNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0b0FycmF5KGNoaWxkKTtcbiAgICAgICAgICB2YXIgZnJhbWUgPSB7XG4gICAgICAgICAgICBkb21OYW1lc3BhY2U6IHBhcmVudE5hbWVzcGFjZSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICAgICAgICAgIGNoaWxkSW5kZXg6IDAsXG4gICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgICAgZm9vdGVyOiAnJ1xuICAgICAgICAgIH07XG4gICAgICAgICAge1xuICAgICAgICAgICAgZnJhbWUuZGVidWdFbGVtZW50U3RhY2sgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zdGFjay5wdXNoKGZyYW1lKTtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUmVhY3RET01TZXJ2ZXJSZW5kZXJlci5wcm90b3R5cGUucmVuZGVyRE9NID0gZnVuY3Rpb24gcmVuZGVyRE9NKGVsZW1lbnQsIGNvbnRleHQsIHBhcmVudE5hbWVzcGFjZSkge1xuICAgIHZhciB0YWcgPSBlbGVtZW50LnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgIHZhciBuYW1lc3BhY2UgPSBwYXJlbnROYW1lc3BhY2U7XG4gICAgaWYgKHBhcmVudE5hbWVzcGFjZSA9PT0gTmFtZXNwYWNlcy5odG1sKSB7XG4gICAgICBuYW1lc3BhY2UgPSBnZXRJbnRyaW5zaWNOYW1lc3BhY2UodGFnKTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAobmFtZXNwYWNlID09PSBOYW1lc3BhY2VzLmh0bWwpIHtcbiAgICAgICAgLy8gU2hvdWxkIHRoaXMgY2hlY2sgYmUgZ2F0ZWQgYnkgcGFyZW50IG5hbWVzcGFjZT8gTm90IHN1cmUgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhbGxvdyA8U1ZHPiBvciA8bUFUSD4uXG4gICAgICAgIHdhcm5pbmcodGFnID09PSBlbGVtZW50LnR5cGUsICc8JXMgLz4gaXMgdXNpbmcgdXBwZXJjYXNlIEhUTUwuIEFsd2F5cyB1c2UgbG93ZXJjYXNlIEhUTUwgdGFncyAnICsgJ2luIFJlYWN0LicsIGVsZW1lbnQudHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVEYW5nZXJvdXNUYWcodGFnKTtcblxuICAgIHZhciBwcm9wcyA9IGVsZW1lbnQucHJvcHM7XG4gICAgaWYgKHRhZyA9PT0gJ2lucHV0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlc18xLmNoZWNrUHJvcFR5cGVzKCdpbnB1dCcsIHByb3BzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJvcHMuY2hlY2tlZCAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRDaGVja2VkICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5EZWZhdWx0Q2hlY2tlZCkge1xuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICclcyBjb250YWlucyBhbiBpbnB1dCBvZiB0eXBlICVzIHdpdGggYm90aCBjaGVja2VkIGFuZCBkZWZhdWx0Q2hlY2tlZCBwcm9wcy4gJyArICdJbnB1dCBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgY2hlY2tlZCBwcm9wLCBvciB0aGUgZGVmYXVsdENoZWNrZWQgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIGlucHV0ICcgKyAnZWxlbWVudCBhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJywgJ0EgY29tcG9uZW50JywgcHJvcHMudHlwZSk7XG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBwcm9wcy5kZWZhdWx0VmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZGlkV2FybkRlZmF1bHRJbnB1dFZhbHVlKSB7XG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJyVzIGNvbnRhaW5zIGFuIGlucHV0IG9mIHR5cGUgJXMgd2l0aCBib3RoIHZhbHVlIGFuZCBkZWZhdWx0VmFsdWUgcHJvcHMuICcgKyAnSW5wdXQgZWxlbWVudHMgbXVzdCBiZSBlaXRoZXIgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgJyArICcoc3BlY2lmeSBlaXRoZXIgdGhlIHZhbHVlIHByb3AsIG9yIHRoZSBkZWZhdWx0VmFsdWUgcHJvcCwgYnV0IG5vdCAnICsgJ2JvdGgpLiBEZWNpZGUgYmV0d2VlbiB1c2luZyBhIGNvbnRyb2xsZWQgb3IgdW5jb250cm9sbGVkIGlucHV0ICcgKyAnZWxlbWVudCBhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJywgJ0EgY29tcG9uZW50JywgcHJvcHMudHlwZSk7XG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRJbnB1dFZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcm9wcyA9IG9iamVjdEFzc2lnbiQxKHtcbiAgICAgICAgdHlwZTogdW5kZWZpbmVkXG4gICAgICB9LCBwcm9wcywge1xuICAgICAgICBkZWZhdWx0Q2hlY2tlZDogdW5kZWZpbmVkLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgdmFsdWU6IHByb3BzLnZhbHVlICE9IG51bGwgPyBwcm9wcy52YWx1ZSA6IHByb3BzLmRlZmF1bHRWYWx1ZSxcbiAgICAgICAgY2hlY2tlZDogcHJvcHMuY2hlY2tlZCAhPSBudWxsID8gcHJvcHMuY2hlY2tlZCA6IHByb3BzLmRlZmF1bHRDaGVja2VkXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRhZyA9PT0gJ3RleHRhcmVhJykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlc18xLmNoZWNrUHJvcFR5cGVzKCd0ZXh0YXJlYScsIHByb3BzLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHByb3BzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgcHJvcHMuZGVmYXVsdFZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWRpZFdhcm5EZWZhdWx0VGV4dGFyZWFWYWx1ZSkge1xuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdUZXh0YXJlYSBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgdGV4dGFyZWEgJyArICdhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJyk7XG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRUZXh0YXJlYVZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaW5pdGlhbFZhbHVlID0gcHJvcHMudmFsdWU7XG4gICAgICBpZiAoaW5pdGlhbFZhbHVlID09IG51bGwpIHtcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHByb3BzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgLy8gVE9ETyAoeXVuZ3N0ZXJzKTogUmVtb3ZlIHN1cHBvcnQgZm9yIGNoaWxkcmVuIGNvbnRlbnQgaW4gPHRleHRhcmVhPi5cbiAgICAgICAgdmFyIHRleHRhcmVhQ2hpbGRyZW4gPSBwcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgaWYgKHRleHRhcmVhQ2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdVc2UgdGhlIGBkZWZhdWx0VmFsdWVgIG9yIGB2YWx1ZWAgcHJvcHMgaW5zdGVhZCBvZiBzZXR0aW5nICcgKyAnY2hpbGRyZW4gb24gPHRleHRhcmVhPi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgIShkZWZhdWx0VmFsdWUgPT0gbnVsbCkgPyBpbnZhcmlhbnQoZmFsc2UsICdJZiB5b3Ugc3VwcGx5IGBkZWZhdWx0VmFsdWVgIG9uIGEgPHRleHRhcmVhPiwgZG8gbm90IHBhc3MgY2hpbGRyZW4uJykgOiB2b2lkIDA7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGV4dGFyZWFDaGlsZHJlbikpIHtcbiAgICAgICAgICAgICEodGV4dGFyZWFDaGlsZHJlbi5sZW5ndGggPD0gMSkgPyBpbnZhcmlhbnQoZmFsc2UsICc8dGV4dGFyZWE+IGNhbiBvbmx5IGhhdmUgYXQgbW9zdCBvbmUgY2hpbGQuJykgOiB2b2lkIDA7XG4gICAgICAgICAgICB0ZXh0YXJlYUNoaWxkcmVuID0gdGV4dGFyZWFDaGlsZHJlblswXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0VmFsdWUgPSAnJyArIHRleHRhcmVhQ2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVmYXVsdFZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaW5pdGlhbFZhbHVlID0gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wcyA9IG9iamVjdEFzc2lnbiQxKHt9LCBwcm9wcywge1xuICAgICAgICB2YWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICBjaGlsZHJlbjogJycgKyBpbml0aWFsVmFsdWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGFnID09PSAnc2VsZWN0Jykge1xuICAgICAge1xuICAgICAgICBSZWFjdENvbnRyb2xsZWRWYWx1ZVByb3BUeXBlc18xLmNoZWNrUHJvcFR5cGVzKCdzZWxlY3QnLCBwcm9wcywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZVByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwcm9wTmFtZSA9IHZhbHVlUHJvcE5hbWVzW2ldO1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICAgIGlmIChwcm9wcy5tdWx0aXBsZSAmJiAhaXNBcnJheSkge1xuICAgICAgICAgICAgd2FybmluZyhmYWxzZSwgJ1RoZSBgJXNgIHByb3Agc3VwcGxpZWQgdG8gPHNlbGVjdD4gbXVzdCBiZSBhbiBhcnJheSBpZiAnICsgJ2BtdWx0aXBsZWAgaXMgdHJ1ZS4lcycsIHByb3BOYW1lLCAnJyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghcHJvcHMubXVsdGlwbGUgJiYgaXNBcnJheSkge1xuICAgICAgICAgICAgd2FybmluZyhmYWxzZSwgJ1RoZSBgJXNgIHByb3Agc3VwcGxpZWQgdG8gPHNlbGVjdD4gbXVzdCBiZSBhIHNjYWxhciAnICsgJ3ZhbHVlIGlmIGBtdWx0aXBsZWAgaXMgZmFsc2UuJXMnLCBwcm9wTmFtZSwgJycpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmRlZmF1bHRWYWx1ZSAhPT0gdW5kZWZpbmVkICYmICFkaWRXYXJuRGVmYXVsdFNlbGVjdFZhbHVlKSB7XG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ1NlbGVjdCBlbGVtZW50cyBtdXN0IGJlIGVpdGhlciBjb250cm9sbGVkIG9yIHVuY29udHJvbGxlZCAnICsgJyhzcGVjaWZ5IGVpdGhlciB0aGUgdmFsdWUgcHJvcCwgb3IgdGhlIGRlZmF1bHRWYWx1ZSBwcm9wLCBidXQgbm90ICcgKyAnYm90aCkuIERlY2lkZSBiZXR3ZWVuIHVzaW5nIGEgY29udHJvbGxlZCBvciB1bmNvbnRyb2xsZWQgc2VsZWN0ICcgKyAnZWxlbWVudCBhbmQgcmVtb3ZlIG9uZSBvZiB0aGVzZSBwcm9wcy4gTW9yZSBpbmZvOiAnICsgJ2h0dHBzOi8vZmIubWUvcmVhY3QtY29udHJvbGxlZC1jb21wb25lbnRzJyk7XG4gICAgICAgICAgZGlkV2FybkRlZmF1bHRTZWxlY3RWYWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuY3VycmVudFNlbGVjdFZhbHVlID0gcHJvcHMudmFsdWUgIT0gbnVsbCA/IHByb3BzLnZhbHVlIDogcHJvcHMuZGVmYXVsdFZhbHVlO1xuICAgICAgcHJvcHMgPSBvYmplY3RBc3NpZ24kMSh7fSwgcHJvcHMsIHtcbiAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0YWcgPT09ICdvcHRpb24nKSB7XG4gICAgICB2YXIgc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgdmFyIHNlbGVjdFZhbHVlID0gdGhpcy5jdXJyZW50U2VsZWN0VmFsdWU7XG4gICAgICB2YXIgb3B0aW9uQ2hpbGRyZW4gPSBmbGF0dGVuT3B0aW9uQ2hpbGRyZW4ocHJvcHMuY2hpbGRyZW4pO1xuICAgICAgaWYgKHNlbGVjdFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICBpZiAocHJvcHMudmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHZhbHVlID0gcHJvcHMudmFsdWUgKyAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZSA9IG9wdGlvbkNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNlbGVjdFZhbHVlKSkge1xuICAgICAgICAgIC8vIG11bHRpcGxlXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWxlY3RWYWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKCcnICsgc2VsZWN0VmFsdWVbal0gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkID0gJycgKyBzZWxlY3RWYWx1ZSA9PT0gdmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9wcyA9IG9iamVjdEFzc2lnbiQxKHtcbiAgICAgICAgICBzZWxlY3RlZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGNoaWxkcmVuOiB1bmRlZmluZWRcbiAgICAgICAgfSwgcHJvcHMsIHtcbiAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICAgICAgY2hpbGRyZW46IG9wdGlvbkNoaWxkcmVuXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHtcbiAgICAgIHZhbGlkYXRlUHJvcGVydGllc0luRGV2ZWxvcG1lbnQodGFnLCBwcm9wcyk7XG4gICAgfVxuXG4gICAgYXNzZXJ0VmFsaWRQcm9wc18xKHRhZywgcHJvcHMpO1xuXG4gICAgdmFyIG91dCA9IGNyZWF0ZU9wZW5UYWdNYXJrdXAoZWxlbWVudC50eXBlLCB0YWcsIHByb3BzLCBuYW1lc3BhY2UsIHRoaXMubWFrZVN0YXRpY01hcmt1cCwgdGhpcy5zdGFjay5sZW5ndGggPT09IDEsIG51bGwpO1xuICAgIHZhciBmb290ZXIgPSAnJztcbiAgICBpZiAob21pdHRlZENsb3NlVGFnc18xLmhhc093blByb3BlcnR5KHRhZykpIHtcbiAgICAgIG91dCArPSAnLz4nO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgKz0gJz4nO1xuICAgICAgZm9vdGVyID0gJzwvJyArIGVsZW1lbnQudHlwZSArICc+JztcbiAgICB9XG4gICAgdmFyIGNoaWxkcmVuO1xuICAgIHZhciBpbm5lck1hcmt1cCA9IGdldE5vbkNoaWxkcmVuSW5uZXJNYXJrdXAocHJvcHMpO1xuICAgIGlmIChpbm5lck1hcmt1cCAhPSBudWxsKSB7XG4gICAgICBjaGlsZHJlbiA9IFtdO1xuICAgICAgaWYgKG5ld2xpbmVFYXRpbmdUYWdzW3RhZ10gJiYgaW5uZXJNYXJrdXAuY2hhckF0KDApID09PSAnXFxuJykge1xuICAgICAgICAvLyB0ZXh0L2h0bWwgaWdub3JlcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHRoZXNlIHRhZ3MgaWYgaXQncyBhIG5ld2xpbmVcbiAgICAgICAgLy8gUHJlZmVyIHRvIGJyZWFrIGFwcGxpY2F0aW9uL3htbCBvdmVyIHRleHQvaHRtbCAoZm9yIG5vdykgYnkgYWRkaW5nXG4gICAgICAgIC8vIGEgbmV3bGluZSBzcGVjaWZpY2FsbHkgdG8gZ2V0IGVhdGVuIGJ5IHRoZSBwYXJzZXIuIChBbHRlcm5hdGVseSBmb3JcbiAgICAgICAgLy8gdGV4dGFyZWFzLCByZXBsYWNpbmcgXCJeXFxuXCIgd2l0aCBcIlxcclxcblwiIGRvZXNuJ3QgZ2V0IGVhdGVuLCBhbmQgdGhlIGZpcnN0XG4gICAgICAgIC8vIFxcciBpcyBub3JtYWxpemVkIG91dCBieSBIVE1MVGV4dEFyZWFFbGVtZW50I3ZhbHVlLilcbiAgICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbC1wb2x5Z2xvdC8jbmV3bGluZXMtaW4tdGV4dGFyZWEtYW5kLXByZT5cbiAgICAgICAgLy8gU2VlOiA8aHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjZWxlbWVudC1yZXN0cmljdGlvbnM+XG4gICAgICAgIC8vIFNlZTogPGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI25ld2xpbmVzPlxuICAgICAgICAvLyBTZWU6IFBhcnNpbmcgb2YgXCJ0ZXh0YXJlYVwiIFwibGlzdGluZ1wiIGFuZCBcInByZVwiIGVsZW1lbnRzXG4gICAgICAgIC8vICBmcm9tIDxodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNwYXJzaW5nLW1haW4taW5ib2R5PlxuICAgICAgICBvdXQgKz0gJ1xcbic7XG4gICAgICB9XG4gICAgICBvdXQgKz0gaW5uZXJNYXJrdXA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkcmVuID0gdG9BcnJheShwcm9wcy5jaGlsZHJlbik7XG4gICAgfVxuICAgIHZhciBmcmFtZSA9IHtcbiAgICAgIGRvbU5hbWVzcGFjZTogZ2V0Q2hpbGROYW1lc3BhY2UocGFyZW50TmFtZXNwYWNlLCBlbGVtZW50LnR5cGUpLFxuICAgICAgdGFnOiB0YWcsXG4gICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgICBjaGlsZEluZGV4OiAwLFxuICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgIGZvb3RlcjogZm9vdGVyXG4gICAgfTtcbiAgICB7XG4gICAgICBmcmFtZS5kZWJ1Z0VsZW1lbnRTdGFjayA9IFtdO1xuICAgIH1cbiAgICB0aGlzLnN0YWNrLnB1c2goZnJhbWUpO1xuICAgIHJldHVybiBvdXQ7XG4gIH07XG5cbiAgcmV0dXJuIFJlYWN0RE9NU2VydmVyUmVuZGVyZXI7XG59KCk7XG5cbnZhciBSZWFjdFBhcnRpYWxSZW5kZXJlciA9IFJlYWN0RE9NU2VydmVyUmVuZGVyZXI7XG5cbi8qKlxuICogUmVuZGVyIGEgUmVhY3RFbGVtZW50IHRvIGl0cyBpbml0aWFsIEhUTUwuIFRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCBvbiB0aGVcbiAqIHNlcnZlci5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3JlYWN0LWRvbS1zZXJ2ZXIuaHRtbCNyZW5kZXJ0b3N0cmluZ1xuICovXG5mdW5jdGlvbiByZW5kZXJUb1N0cmluZyhlbGVtZW50KSB7XG4gIHZhciByZW5kZXJlciA9IG5ldyBSZWFjdFBhcnRpYWxSZW5kZXJlcihlbGVtZW50LCBmYWxzZSk7XG4gIHZhciBtYXJrdXAgPSByZW5kZXJlci5yZWFkKEluZmluaXR5KTtcbiAgcmV0dXJuIG1hcmt1cDtcbn1cblxuLyoqXG4gKiBTaW1pbGFyIHRvIHJlbmRlclRvU3RyaW5nLCBleGNlcHQgdGhpcyBkb2Vzbid0IGNyZWF0ZSBleHRyYSBET00gYXR0cmlidXRlc1xuICogc3VjaCBhcyBkYXRhLXJlYWN0LWlkIHRoYXQgUmVhY3QgdXNlcyBpbnRlcm5hbGx5LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvcmVhY3QtZG9tLXNlcnZlci5odG1sI3JlbmRlcnRvc3RhdGljbWFya3VwXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclRvU3RhdGljTWFya3VwKGVsZW1lbnQpIHtcbiAgdmFyIHJlbmRlcmVyID0gbmV3IFJlYWN0UGFydGlhbFJlbmRlcmVyKGVsZW1lbnQsIHRydWUpO1xuICB2YXIgbWFya3VwID0gcmVuZGVyZXIucmVhZChJbmZpbml0eSk7XG4gIHJldHVybiBtYXJrdXA7XG59XG5cbnZhciBSZWFjdERPTVN0cmluZ1JlbmRlcmVyID0ge1xuICByZW5kZXJUb1N0cmluZzogcmVuZGVyVG9TdHJpbmcsXG4gIHJlbmRlclRvU3RhdGljTWFya3VwOiByZW5kZXJUb1N0YXRpY01hcmt1cFxufTtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RWZXJzaW9uXG4gKi9cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi4wLjAnO1xuXG52YXIgTVVTVF9VU0VfUFJPUEVSVFkgPSBET01Qcm9wZXJ0eV8xLmluamVjdGlvbi5NVVNUX1VTRV9QUk9QRVJUWTtcbnZhciBIQVNfQk9PTEVBTl9WQUxVRSA9IERPTVByb3BlcnR5XzEuaW5qZWN0aW9uLkhBU19CT09MRUFOX1ZBTFVFO1xudmFyIEhBU19OVU1FUklDX1ZBTFVFID0gRE9NUHJvcGVydHlfMS5pbmplY3Rpb24uSEFTX05VTUVSSUNfVkFMVUU7XG52YXIgSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUgPSBET01Qcm9wZXJ0eV8xLmluamVjdGlvbi5IQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRTtcbnZhciBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFID0gRE9NUHJvcGVydHlfMS5pbmplY3Rpb24uSEFTX09WRVJMT0FERURfQk9PTEVBTl9WQUxVRTtcbnZhciBIQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUUgPSBET01Qcm9wZXJ0eV8xLmluamVjdGlvbi5IQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUU7XG5cbnZhciBIVE1MRE9NUHJvcGVydHlDb25maWcgPSB7XG4gIC8vIFdoZW4gYWRkaW5nIGF0dHJpYnV0ZXMgdG8gdGhpcyBsaXN0LCBiZSBzdXJlIHRvIGFsc28gYWRkIHRoZW0gdG9cbiAgLy8gdGhlIGBwb3NzaWJsZVN0YW5kYXJkTmFtZXNgIG1vZHVsZSB0byBlbnN1cmUgY2FzaW5nIGFuZCBpbmNvcnJlY3RcbiAgLy8gbmFtZSB3YXJuaW5ncy5cbiAgUHJvcGVydGllczoge1xuICAgIGFsbG93RnVsbFNjcmVlbjogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgLy8gSUUgb25seSB0cnVlL2ZhbHNlIGlGcmFtZSBhdHRyaWJ1dGVcbiAgICAvLyBodHRwczovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMzMDcyKHY9dnMuODUpLmFzcHhcbiAgICBhbGxvd1RyYW5zcGFyZW5jeTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFLFxuICAgIC8vIHNwZWNpZmllcyB0YXJnZXQgY29udGV4dCBmb3IgbGlua3Mgd2l0aCBgcHJlbG9hZGAgdHlwZVxuICAgIGFzeW5jOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICAvLyBhdXRvRm9jdXMgaXMgcG9seWZpbGxlZC9ub3JtYWxpemVkIGJ5IEF1dG9Gb2N1c1V0aWxzXG4gICAgLy8gYXV0b0ZvY3VzOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBhdXRvUGxheTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgY2FwdHVyZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgY2hlY2tlZDogTVVTVF9VU0VfUFJPUEVSVFkgfCBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBjb2xzOiBIQVNfUE9TSVRJVkVfTlVNRVJJQ19WQUxVRSxcbiAgICBjb250ZW50RWRpdGFibGU6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSxcbiAgICBjb250cm9sczogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgJ2RlZmF1bHQnOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBkZWZlcjogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgZGlzYWJsZWQ6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIGRvd25sb2FkOiBIQVNfT1ZFUkxPQURFRF9CT09MRUFOX1ZBTFVFLFxuICAgIGRyYWdnYWJsZTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFLFxuICAgIGZvcm1Ob1ZhbGlkYXRlOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBoaWRkZW46IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIGxvb3A6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIC8vIENhdXRpb247IGBvcHRpb24uc2VsZWN0ZWRgIGlzIG5vdCB1cGRhdGVkIGlmIGBzZWxlY3QubXVsdGlwbGVgIGlzXG4gICAgLy8gZGlzYWJsZWQgd2l0aCBgcmVtb3ZlQXR0cmlidXRlYC5cbiAgICBtdWx0aXBsZTogTVVTVF9VU0VfUFJPUEVSVFkgfCBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBtdXRlZDogTVVTVF9VU0VfUFJPUEVSVFkgfCBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBub1ZhbGlkYXRlOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBvcGVuOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBwbGF5c0lubGluZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgcmVhZE9ubHk6IEhBU19CT09MRUFOX1ZBTFVFLFxuICAgIHJlcXVpcmVkOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICByZXZlcnNlZDogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgcm93czogSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUsXG4gICAgcm93U3BhbjogSEFTX05VTUVSSUNfVkFMVUUsXG4gICAgc2NvcGVkOiBIQVNfQk9PTEVBTl9WQUxVRSxcbiAgICBzZWFtbGVzczogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgc2VsZWN0ZWQ6IE1VU1RfVVNFX1BST1BFUlRZIHwgSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgc2l6ZTogSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUsXG4gICAgc3RhcnQ6IEhBU19OVU1FUklDX1ZBTFVFLFxuICAgIC8vIHN1cHBvcnQgZm9yIHByb2plY3RpbmcgcmVndWxhciBET00gRWxlbWVudHMgdmlhIFYxIG5hbWVkIHNsb3RzICggc2hhZG93IGRvbSApXG4gICAgc3BhbjogSEFTX1BPU0lUSVZFX05VTUVSSUNfVkFMVUUsXG4gICAgc3BlbGxDaGVjazogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFLFxuICAgIC8vIFN0eWxlIG11c3QgYmUgZXhwbGljaXRseSBzZXQgaW4gdGhlIGF0dHJpYnV0ZSBsaXN0LiBSZWFjdCBjb21wb25lbnRzXG4gICAgLy8gZXhwZWN0IGEgc3R5bGUgb2JqZWN0XG4gICAgc3R5bGU6IDAsXG4gICAgLy8gaXRlbVNjb3BlIGlzIGZvciBmb3IgTWljcm9kYXRhIHN1cHBvcnQuXG4gICAgLy8gU2VlIGh0dHA6Ly9zY2hlbWEub3JnL2RvY3MvZ3MuaHRtbFxuICAgIGl0ZW1TY29wZTogSEFTX0JPT0xFQU5fVkFMVUUsXG4gICAgLy8gVGhlc2UgYXR0cmlidXRlcyBtdXN0IHN0YXkgaW4gdGhlIHdoaXRlLWxpc3QgYmVjYXVzZSB0aGV5IGhhdmVcbiAgICAvLyBkaWZmZXJlbnQgYXR0cmlidXRlIG5hbWVzIChzZWUgRE9NQXR0cmlidXRlTmFtZXMgYmVsb3cpXG4gICAgYWNjZXB0Q2hhcnNldDogMCxcbiAgICBjbGFzc05hbWU6IDAsXG4gICAgaHRtbEZvcjogMCxcbiAgICBodHRwRXF1aXY6IDAsXG4gICAgLy8gQXR0cmlidXRlcyB3aXRoIG11dGF0aW9uIG1ldGhvZHMgbXVzdCBiZSBzcGVjaWZpZWQgaW4gdGhlIHdoaXRlbGlzdFxuICAgIC8vIFNldCB0aGUgc3RyaW5nIGJvb2xlYW4gZmxhZyB0byBhbGxvdyB0aGUgYmVoYXZpb3JcbiAgICB2YWx1ZTogSEFTX1NUUklOR19CT09MRUFOX1ZBTFVFXG4gIH0sXG4gIERPTUF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgYWNjZXB0Q2hhcnNldDogJ2FjY2VwdC1jaGFyc2V0JyxcbiAgICBjbGFzc05hbWU6ICdjbGFzcycsXG4gICAgaHRtbEZvcjogJ2ZvcicsXG4gICAgaHR0cEVxdWl2OiAnaHR0cC1lcXVpdidcbiAgfSxcbiAgRE9NTXV0YXRpb25NZXRob2RzOiB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIChub2RlLCB2YWx1ZSkge1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgfVxuXG4gICAgICAvLyBOdW1iZXIgaW5wdXRzIGdldCBzcGVjaWFsIHRyZWF0bWVudCBkdWUgdG8gc29tZSBlZGdlIGNhc2VzIGluXG4gICAgICAvLyBDaHJvbWUuIExldCBldmVyeXRoaW5nIGVsc2UgYXNzaWduIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgYXMgbm9ybWFsLlxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy83MjUzI2lzc3VlY29tbWVudC0yMzYwNzQzMjZcbiAgICAgIGlmIChub2RlLnR5cGUgIT09ICdudW1iZXInIHx8IG5vZGUuaGFzQXR0cmlidXRlKCd2YWx1ZScpID09PSBmYWxzZSkge1xuICAgICAgICBub2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyArIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS52YWxpZGl0eSAmJiAhbm9kZS52YWxpZGl0eS5iYWRJbnB1dCAmJiBub2RlLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gbm9kZSkge1xuICAgICAgICAvLyBEb24ndCBhc3NpZ24gYW4gYXR0cmlidXRlIGlmIHZhbGlkYXRpb24gcmVwb3J0cyBiYWRcbiAgICAgICAgLy8gaW5wdXQuIENocm9tZSB3aWxsIGNsZWFyIHRoZSB2YWx1ZS4gQWRkaXRpb25hbGx5LCBkb24ndFxuICAgICAgICAvLyBvcGVyYXRlIG9uIGlucHV0cyB0aGF0IGhhdmUgZm9jdXMsIG90aGVyd2lzZSBDaHJvbWUgbWlnaHRcbiAgICAgICAgLy8gc3RyaXAgb2ZmIHRyYWlsaW5nIGRlY2ltYWwgcGxhY2VzIGFuZCBjYXVzZSB0aGUgdXNlcidzXG4gICAgICAgIC8vIGN1cnNvciBwb3NpdGlvbiB0byBqdW1wIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGlucHV0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBJbiBSZWFjdERPTUlucHV0LCB3ZSBoYXZlIGFuIG9uQmx1ciBldmVudCB0aGF0IHdpbGwgdHJpZ2dlclxuICAgICAgICAvLyB0aGlzIGZ1bmN0aW9uIGFnYWluIHdoZW4gZm9jdXMgaXMgbG9zdC5cbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJycgKyB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgSFRNTERPTVByb3BlcnR5Q29uZmlnXzEgPSBIVE1MRE9NUHJvcGVydHlDb25maWc7XG5cbnZhciBIQVNfU1RSSU5HX0JPT0xFQU5fVkFMVUUkMSA9IERPTVByb3BlcnR5XzEuaW5qZWN0aW9uLkhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRTtcblxuXG52YXIgTlMgPSB7XG4gIHhsaW5rOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsXG4gIHhtbDogJ2h0dHA6Ly93d3cudzMub3JnL1hNTC8xOTk4L25hbWVzcGFjZSdcbn07XG5cbi8qKlxuICogVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIFNWRyBhdHRyaWJ1dGVzIHRoYXQgbmVlZCBzcGVjaWFsIGNhc2luZyxcbiAqIG5hbWVzcGFjaW5nLCBvciBib29sZWFuIHZhbHVlIGFzc2lnbm1lbnQuXG4gKlxuICogV2hlbiBhZGRpbmcgYXR0cmlidXRlcyB0byB0aGlzIGxpc3QsIGJlIHN1cmUgdG8gYWxzbyBhZGQgdGhlbSB0b1xuICogdGhlIGBwb3NzaWJsZVN0YW5kYXJkTmFtZXNgIG1vZHVsZSB0byBlbnN1cmUgY2FzaW5nIGFuZCBpbmNvcnJlY3RcbiAqIG5hbWUgd2FybmluZ3MuXG4gKlxuICogU1ZHIEF0dHJpYnV0ZXMgTGlzdDpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9TVkcvYXR0aW5kZXguaHRtbFxuICogU01JTCBTcGVjOlxuICogaHR0cHM6Ly93d3cudzMub3JnL1RSL3NtaWxcbiAqL1xudmFyIEFUVFJTID0gWydhY2NlbnQtaGVpZ2h0JywgJ2FsaWdubWVudC1iYXNlbGluZScsICdhcmFiaWMtZm9ybScsICdiYXNlbGluZS1zaGlmdCcsICdjYXAtaGVpZ2h0JywgJ2NsaXAtcGF0aCcsICdjbGlwLXJ1bGUnLCAnY29sb3ItaW50ZXJwb2xhdGlvbicsICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLCAnY29sb3ItcHJvZmlsZScsICdjb2xvci1yZW5kZXJpbmcnLCAnZG9taW5hbnQtYmFzZWxpbmUnLCAnZW5hYmxlLWJhY2tncm91bmQnLCAnZmlsbC1vcGFjaXR5JywgJ2ZpbGwtcnVsZScsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvbnQtZmFtaWx5JywgJ2ZvbnQtc2l6ZScsICdmb250LXNpemUtYWRqdXN0JywgJ2ZvbnQtc3RyZXRjaCcsICdmb250LXN0eWxlJywgJ2ZvbnQtdmFyaWFudCcsICdmb250LXdlaWdodCcsICdnbHlwaC1uYW1lJywgJ2dseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWwnLCAnZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwnLCAnaG9yaXotYWR2LXgnLCAnaG9yaXotb3JpZ2luLXgnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2xldHRlci1zcGFjaW5nJywgJ2xpZ2h0aW5nLWNvbG9yJywgJ21hcmtlci1lbmQnLCAnbWFya2VyLW1pZCcsICdtYXJrZXItc3RhcnQnLCAnb3ZlcmxpbmUtcG9zaXRpb24nLCAnb3ZlcmxpbmUtdGhpY2tuZXNzJywgJ3BhaW50LW9yZGVyJywgJ3Bhbm9zZS0xJywgJ3BvaW50ZXItZXZlbnRzJywgJ3JlbmRlcmluZy1pbnRlbnQnLCAnc2hhcGUtcmVuZGVyaW5nJywgJ3N0b3AtY29sb3InLCAnc3RvcC1vcGFjaXR5JywgJ3N0cmlrZXRocm91Z2gtcG9zaXRpb24nLCAnc3RyaWtldGhyb3VnaC10aGlja25lc3MnLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlLXdpZHRoJywgJ3RleHQtYW5jaG9yJywgJ3RleHQtZGVjb3JhdGlvbicsICd0ZXh0LXJlbmRlcmluZycsICd1bmRlcmxpbmUtcG9zaXRpb24nLCAndW5kZXJsaW5lLXRoaWNrbmVzcycsICd1bmljb2RlLWJpZGknLCAndW5pY29kZS1yYW5nZScsICd1bml0cy1wZXItZW0nLCAndi1hbHBoYWJldGljJywgJ3YtaGFuZ2luZycsICd2LWlkZW9ncmFwaGljJywgJ3YtbWF0aGVtYXRpY2FsJywgJ3ZlY3Rvci1lZmZlY3QnLCAndmVydC1hZHYteScsICd2ZXJ0LW9yaWdpbi14JywgJ3ZlcnQtb3JpZ2luLXknLCAnd29yZC1zcGFjaW5nJywgJ3dyaXRpbmctbW9kZScsICd4LWhlaWdodCcsICd4bGluazphY3R1YXRlJywgJ3hsaW5rOmFyY3JvbGUnLCAneGxpbms6aHJlZicsICd4bGluazpyb2xlJywgJ3hsaW5rOnNob3cnLCAneGxpbms6dGl0bGUnLCAneGxpbms6dHlwZScsICd4bWw6YmFzZScsICd4bWxuczp4bGluaycsICd4bWw6bGFuZycsICd4bWw6c3BhY2UnXTtcblxudmFyIFNWR0RPTVByb3BlcnR5Q29uZmlnID0ge1xuICBQcm9wZXJ0aWVzOiB7XG4gICAgYXV0b1JldmVyc2U6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSQxLFxuICAgIGV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQ6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSQxLFxuICAgIHByZXNlcnZlQWxwaGE6IEhBU19TVFJJTkdfQk9PTEVBTl9WQUxVRSQxXG4gIH0sXG4gIERPTUF0dHJpYnV0ZU5hbWVzOiB7XG4gICAgYXV0b1JldmVyc2U6ICdhdXRvUmV2ZXJzZScsXG4gICAgZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZDogJ2V4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQnLFxuICAgIHByZXNlcnZlQWxwaGE6ICdwcmVzZXJ2ZUFscGhhJ1xuICB9LFxuICBET01BdHRyaWJ1dGVOYW1lc3BhY2VzOiB7XG4gICAgeGxpbmtBY3R1YXRlOiBOUy54bGluayxcbiAgICB4bGlua0FyY3JvbGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rSHJlZjogTlMueGxpbmssXG4gICAgeGxpbmtSb2xlOiBOUy54bGluayxcbiAgICB4bGlua1Nob3c6IE5TLnhsaW5rLFxuICAgIHhsaW5rVGl0bGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rVHlwZTogTlMueGxpbmssXG4gICAgeG1sQmFzZTogTlMueG1sLFxuICAgIHhtbExhbmc6IE5TLnhtbCxcbiAgICB4bWxTcGFjZTogTlMueG1sXG4gIH1cbn07XG5cbnZhciBDQU1FTElaRSA9IC9bXFwtXFw6XShbYS16XSkvZztcbnZhciBjYXBpdGFsaXplID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlblsxXS50b1VwcGVyQ2FzZSgpO1xufTtcblxuQVRUUlMuZm9yRWFjaChmdW5jdGlvbiAob3JpZ2luYWwpIHtcbiAgdmFyIHJlYWN0TmFtZSA9IG9yaWdpbmFsLnJlcGxhY2UoQ0FNRUxJWkUsIGNhcGl0YWxpemUpO1xuXG4gIFNWR0RPTVByb3BlcnR5Q29uZmlnLlByb3BlcnRpZXNbcmVhY3ROYW1lXSA9IDA7XG4gIFNWR0RPTVByb3BlcnR5Q29uZmlnLkRPTUF0dHJpYnV0ZU5hbWVzW3JlYWN0TmFtZV0gPSBvcmlnaW5hbDtcbn0pO1xuXG52YXIgU1ZHRE9NUHJvcGVydHlDb25maWdfMSA9IFNWR0RPTVByb3BlcnR5Q29uZmlnO1xuXG5ET01Qcm9wZXJ0eV8xLmluamVjdGlvbi5pbmplY3RET01Qcm9wZXJ0eUNvbmZpZyhIVE1MRE9NUHJvcGVydHlDb25maWdfMSk7XG5ET01Qcm9wZXJ0eV8xLmluamVjdGlvbi5pbmplY3RET01Qcm9wZXJ0eUNvbmZpZyhTVkdET01Qcm9wZXJ0eUNvbmZpZ18xKTtcblxudmFyIFJlYWN0RE9NU2VydmVyQnJvd3NlckVudHJ5ID0ge1xuICByZW5kZXJUb1N0cmluZzogUmVhY3RET01TdHJpbmdSZW5kZXJlci5yZW5kZXJUb1N0cmluZyxcbiAgcmVuZGVyVG9TdGF0aWNNYXJrdXA6IFJlYWN0RE9NU3RyaW5nUmVuZGVyZXIucmVuZGVyVG9TdGF0aWNNYXJrdXAsXG4gIHJlbmRlclRvTm9kZVN0cmVhbTogZnVuY3Rpb24gKCkge1xuICAgIGludmFyaWFudChmYWxzZSwgJ1JlYWN0RE9NU2VydmVyLnJlbmRlclRvTm9kZVN0cmVhbSgpOiBUaGUgc3RyZWFtaW5nIEFQSSBpcyBub3QgYXZhaWxhYmxlIGluIHRoZSBicm93c2VyLiBVc2UgUmVhY3RET01TZXJ2ZXIucmVuZGVyVG9TdHJpbmcoKSBpbnN0ZWFkLicpO1xuICB9LFxuICByZW5kZXJUb1N0YXRpY05vZGVTdHJlYW06IGZ1bmN0aW9uICgpIHtcbiAgICBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdERPTVNlcnZlci5yZW5kZXJUb1N0YXRpY05vZGVTdHJlYW0oKTogVGhlIHN0cmVhbWluZyBBUEkgaXMgbm90IGF2YWlsYWJsZSBpbiB0aGUgYnJvd3Nlci4gVXNlIFJlYWN0RE9NU2VydmVyLnJlbmRlclRvU3RhdGljTWFya3VwKCkgaW5zdGVhZC4nKTtcbiAgfSxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01TZXJ2ZXJCcm93c2VyRW50cnk7XG5cbn0pKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZWFjdC1kb20vY2pzL3JlYWN0LWRvbS1zZXJ2ZXIuYnJvd3Nlci5kZXZlbG9wbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTI3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==