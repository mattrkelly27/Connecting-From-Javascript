const pg = require("pg");
const settings = require("./settings"); // settings.json

const famousPerson = process.argv.slice(2)[0];
console.log(famousPerson);

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


console.log(settings.database);
// SELECT first_name, last_name FROM famous_people WHERE first_name LIKE 'Paul';

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1 AS name FROM famous_people", [famousPerson], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows[0].name); //output: 1

    // console.log(result);


    client.end();
  });
});



