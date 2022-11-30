const knex = require("knex");

const {
  PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD,
} = process.env;

console.log({
  client: "pg",
  connection: {
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
  },
});
const database = knex({
  client: "pg",
  connection: {
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
  },
});

const getKnexInstance = async () => {
  await database.raw("SELECT 1;");
  console.info("Database connected !");
};

getKnexInstance();

module.exports = { database };
