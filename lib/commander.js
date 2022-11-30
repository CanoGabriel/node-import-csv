const { program } = require("commander");

const setupProgramOption = () => {
    // Declare available options
    program.requiredOption("--file <path>", "The data file");
    program.option("--config <path>", "The configuration file", "./config.json");
    program.option("-d, --delimiter <char>", "The csv delimiter", ",");

    program.parse();

    return program.opts();
}