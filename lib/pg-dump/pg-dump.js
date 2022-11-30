const util = require("util");
const spawn = util.promisify(require("child_process").spawn);
const commandExists = require("command-exists");

const {
  PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD,
} = process.env;

const checkPgDumpInstalled = () => {
  const isPgDumpAvailable = commandExists.sync("pg_dump");

  if (isPgDumpAvailable) {
    throw new Error("pg_dump need to be installed");
  }
}
const pgDump = async (option = {}) => {
  checkPgDumpInstalled();

  const {
    tableName,
    outputFileName,
    section = "data",
  } = option;

  const commandArg = [
    `--host ${PGHOST}`,
    `--port ${PGPORT}`,
    `--dbname ${PGDATABASE}`,
    `--username ${PGUSER}`,
    `--password ${PGPASSWORD}`,
    `--table ${tableName}`,
    `--file ${outputFileName}`,
    ...(section === "data" ? ["--section=data-only"] : []),
    ...(section === "schema" ? ["--section=schema-only"] : []),
    "--no-owner",
  ];

  await spawn("pg_dump", commandArg);
};

module.exports = { pgDump };
