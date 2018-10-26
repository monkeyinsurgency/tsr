const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

csv().fromFile(path.join(__dirname, '../src/data/books.csv'))
  .then((jsonObj) => {
    let newObj = {
      "books": jsonObj,
      "transactions": []
    };
    fs.writeFile(path.join(__dirname, '../src/data/db.json'), JSON.stringify(newObj));
  });
