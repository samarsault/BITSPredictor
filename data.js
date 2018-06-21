const { Client } = require('pg');
const ref = require('./branch_ref');

const client = new Client({
  connectionString:process.env.DATABASE_URL,
  ssl: true
});

client.connect();

module.exports = {
  get: function (campus, callBack) {
    const query = 'SELECT branch, min(mark) from data where campus=\'' + campus + '\' group by branch;'
    client.query(query, (err, res) => {
      if (err) {
        throw err;
      }
        
      callBack(res.rows.map(function (item, index) {
        item.name = ref[item.branch];
        return item;
      }));
    });
  },

  insert: function(campus, branch, mark, fb_id, callBack) {
    const query = 'INSERT INTO data VALUES(\'' + campus + '\', \'' + branch + '\', ' + parseInt(mark) + ', ' + parseInt(fb_id) + ');';
    console.log(query);
    client.query(query, callBack);
  },
  all: function(cb) {
    client.query('SELECT * FROM data', (err, res) => {
      if (err) throw err;
      cb(res.rows);
    })
  },
  del: function(list, cb) {
    var query = 'DELETE FROM data WHERE ';
    list = list.split(',');
    for (var i = 0;i < list.length - 1;i++) {
      query += 'fb_id=' + list[i] + ' OR ';
    }

    query += 'fb_id=' + list[list.length-1] + ';'
    console.log(query);
    client.query(query, cb);
  },
  isMod: function(fb_id, cb) {

    client.query('SELECT * FROM mod WHERE fb_id=' + fb_id + ';', (err, res)=>{
      if (!err) {
        console.log('Successfully checked is moderator: ' + res.rows.length);
        cb(res.rows.length > 0);
      }
    })
  }
}
