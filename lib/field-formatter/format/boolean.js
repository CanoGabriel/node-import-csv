const formatName = "boolean";

const truthyList = [ "t", "true", "1" ];
const falsyList = [ "f", "false", "0" ];

/**
 * @type {FormatValueCallback}
 */
const formatValue = (_fieldConfig, value) => {
    const lowerCaseValue = value?.toLowerCase();

    if(truthyList.includes(lowerCaseValue)){
        return true;
    }

    if(falsyList.includes(lowerCaseValue)){
        return false;
    }
    return null;
}

module.exports = { formatValue, formatName };