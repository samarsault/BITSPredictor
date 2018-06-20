const { Client } = require('pg');
const ref = require('./branch_ref');
const client = new Client({
  connectionString: 'postgresql://samarjeet:borm@localhost:5432/testdb', // process.env.DATABASE_URL,
  // ssl: true,
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

module.exports = {
  get: function (campus, callBack) {
    const query = 'SELECT branch, min(mark) from data where campus=\'' + campus + '\' group by branch;'
    client.query(query, (err, res) => {
      if (err)
        throw err;
        
      callBack(res.rows.map(function (item, index) {
        item.name = ref[item.branch];
        return item;
      }));
    });
  },

  insert: function(campus, branch, mark, fb_id, callBack) {
    const query = 'INSERT INTO data VALUES(\'' + campus + '\', \'' + branch + '\', ' + parseInt(mark) + ', ' + parseInt(fb_id) + ');';
    client.query(query, callBack);
  }
}