CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)

);

CREATE TABLE urls(
  url_id SERIAL PRIMARY KEY,
  longurl VARCHAR(2048),
  shorturl VARCHAR(255),
  urlcode VARCHAR(255)
);
