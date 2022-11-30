const Excel = require("exceljs");
const path = require("path");
const mime = require("mime-types")
const FieldFormatter = require("./field-formatter/field-formatter");
const fs = require("fs/promises");

// TODO config docs
// TODO format custom plugin


// TODO separate csv and xls parser options in config

const defaultConfig = {
    delimiter: ",",
    isHeader: false,
    fieldMap: []
}

/**
 *
 * @param {string} filepath
 * @returns {Promise<Record<string, unknown>>}
 */
const readJsonFile = async (filepath) => {
    const resolvedPath = path.resolve(filepath);
    const type = mime.lookup(resolvedPath);
    if(type !== "application/json"){
        throw new Error(`${resolvedPath} is not a JSON file`)
    }
    const fileContent = await fs.readFile(resolvedPath);

    return JSON.parse(fileContent.toString());
}

const parseConfig = (rawConfig) => {
    const defaultColumnConfig = { format: "text" };
    const { fieldMap } = rawConfig;
    return {
        ...defaultConfig,
        ...rawConfig,
        fieldMap: fieldMap.map((columnConfig) => ({ ...defaultColumnConfig, ...columnConfig }))
    };
}

const getColumnConfigByPos = (config, pos) => config?.fieldMap?.find(fieldConfig => fieldConfig.column === pos);

const parseCsv = async (filename, config) => {
    const fieldFormatter = new FieldFormatter();
    const resolvedPath = path.resolve(filename);
    console.log(mime.lookup(resolvedPath));
    const workbook = new Excel.Workbook();
    const worksheet = await workbook.csv.readFile(resolvedPath, { parserOptions: { delimiter: config.delimiter } });

    let resultList = [];
    worksheet.eachRow((row, rpos) => {
        let result = {};
        if (!(config.isHeader && rpos === 1)) {

            row.eachCell((cell, cpos) => {
                const columnConfig = getColumnConfigByPos(config, cpos - 1);
                result[columnConfig.name] = fieldFormatter.format(columnConfig, cell.value, cpos);
            });
            resultList.push(result);
        }
    });
    return resultList;
}

const main = async () => {
    // TODO eval arguments
    const { config: configFilePath, file: dataFilePath } = setupProgramOption();
    const config = await readJsonFile(configFilePath);
    const parsedConfig = parseConfig(config);

    const parsedData = await parseCsv(dataFilePath, parsedConfig);

    console.log("parsedConfig", parsedConfig);
    console.log("parsedData", parsedData[0]);
}

main().catch(error => {
    console.dir(error);
    process.exit(1);
});