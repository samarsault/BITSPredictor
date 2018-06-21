# BITS Pilani College Predictor

Barebones web app to predict college admission cut off marks based on data provided.

## Setup

The app runs on node(express) and postgres. 
To set it up on a local server, we need to specify the DATABASE_URL environmental variable pointing to postgres db.
Create the required tables using the SQL code in exec.sql and start the server.

```sh
$ git clone https://github.com/thelehhman/BITSPredictor
$ npm install
$ postgres -D /usr/local/pgsql/data
$ DATABASE_URL=postgres://<URI>
$ npm start
```

## License
MIT
