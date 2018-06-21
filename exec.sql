-- Setup Table

CREATE TABLE data (
    campus varchar,
    branch varchar,
    mark integer,
    fb_id BIGINT primary key,
    name varchar,
    email varchar
);

CREATE TABLE mod (
    fb_id bigint primary key
);