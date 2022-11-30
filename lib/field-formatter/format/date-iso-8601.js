const { parseISO } = require("date-fns");

const formatName = "date-iso-8601";

/**
 * @type {FormatValueCallback}
 */
const formatValue = (fieldConfig, value, rowPosition) => {
    if(!value) {
        return null;
    }

    try {
        return parseISO(value);
    } catch (error) {
        console.error(`Line ${rowPosition}: Unable to parse "${value}" for column "${fieldConfig.name}" as iso 8601 date string`);
        return null;
    }
}

module.exports = { formatName, formatValue };