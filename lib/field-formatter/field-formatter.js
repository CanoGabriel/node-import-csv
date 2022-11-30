const { formatName: formatBooleanName, formatValue: formatBooleanValue } = require("./format/boolean");
const { formatName: formatDateISO8601Name, formatValue: formatDateISO8601Value } = require("./format/date-iso-8601");
const { formatName: formatTextName, formatValue: formatTextValue } = require("./format/text");

/**
 * @typedef FieldConfiguration
 * @property {number} column
 * @property {string} name
 * @property {string} format
 */

/**
 * @callback FormatValueCallback
 * @param {FieldConfiguration} fieldConfig Field configuration
 * @param {string} value the string value
 * @param {number} rowPosition
 */

/**
 * Data formatter
 * @class
 * @property {Map<string,FormatValueCallback>} formatter
 */
function FieldFormatter(){
    this.formatter = new Map();

    // Register default formatter
    this.register(formatBooleanName, formatBooleanValue);
    this.register(formatDateISO8601Name, formatDateISO8601Value);
    this.register(formatTextName, formatTextValue);
}

/**
 * @name FieldFormatter#register
 * @param {string} id
 * @param {FormatValueCallback} formatValue
 */
FieldFormatter.prototype.register = function (id, formatValue){
    if(!this.formatter.has(id)){
        this.formatter.set(id, formatValue);
    } else {
        throw new Error(`Format for id "${id}" already exist`);
    }
}
module.exports = FieldFormatter;


/**
 * @name FieldFormatter#format
 * @param {FieldConfiguration} fieldConfig Field configuration
 * @param {string} strValue the row string data
 * @param {number} rowPosition
 */
FieldFormatter.prototype.format = function(fieldConfig, strValue, rowPosition){
    const { format } = fieldConfig;
    if (this.formatter.has(format)) {
        return this.formatter.get(format)(fieldConfig, strValue, rowPosition);
    } else {
        console.warn(`Unknown format ${format}`);
        return null;
    }
}