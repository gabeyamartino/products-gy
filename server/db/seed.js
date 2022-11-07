
const fs = require('fs')
const path = require('path');
const connectionClient = require('./index.js')

const populate = fs.readFileSync(path.resolve(__dirname, '../../schema.sql')).toString();

connectionClient.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log(`connected to '${client.database}' on port ${client.port}`)
  console.log('creating tables and importing csv...')
  connectionClient.query(populate, function(err, result){
    if(err){
        console.log('Error when trying to seed database: ', err);
        process.exit(1);
    }
    console.log('Success! Populating database complete')
    process.exit(0);
  });

})