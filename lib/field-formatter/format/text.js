const formatName = "text";

/**
 * @type {FormatValueCallback}
 */
const formatValue = (_fieldConfig, value) => {
    return value === undefined ? null : value;
}

module.exports = { formatValue, formatName };