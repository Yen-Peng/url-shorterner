<div id="top"></div>

## URL Shortener

[![Product Name Screen Shot][product-screenshot]](https://pern-url-shortener.herokuapp.com/)

This is a simple url shortener web app created using the PERN stack. The deployed web link is [https://pern-url-shortener.herokuapp.com/](https://pern-url-shortener.herokuapp.com/).

### Built With

* [PostgreSQL](https://www.postgresql.org/)\
* [Express.js](https://expressjs.com/)\
* [React.js](https://reactjs.org/)\
* [NodeJS](https://nodejs.org/en/)\
* [Bootstrap](https://getbootstrap.com)\

### Installation

Here is how you can install and set up the project locally.

1. Open a terminal and clone the repo and cd into root folder.

2. Create a `.env` file in the root folder and set your environment variables, eg:

*(Replace xxxxx with your info)*

```sh
$ PG_USER=postgres
$ PG_PASSWORD=xxxxx
$ PG_HOST=localhost
$ PG_PORT=5432
$ PG_DATABASE=xxxxx
```

In the same terminal, login to postgresql, followed by creating the database and table(s), eg:

```sh
psql -U postgres
```

```sh
CREATE DATABASE xxxxx;
CREATE TABLE urls(
  url_id SERIAL PRIMARY KEY,
  longurl VARCHAR(2048),
  shorturl VARCHAR(255),
  urlcode VARCHAR(255)
);
```

3. In a separate terminal, start the server in the root folder:

```sh
$ npm install
$ nodemon index
```

4. Open another terminal and navigate to client folder to start the client:

```sh
$ cd client
$ npm install
$ npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<p align="right">(<a href="#top">back to top</a>)</p>
