--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Drop everything
--

DROP TABLE IF EXISTS competition_ CASCADE;
DROP TABLE IF EXISTS event_ CASCADE;
DROP TABLE IF EXISTS actor_ CASCADE;
DROP TABLE IF EXISTS product_ CASCADE;
DROP TABLE IF EXISTS ticket_ CASCADE;
DROP TABLE IF EXISTS club_ CASCADE;
DROP TABLE IF EXISTS user_ CASCADE;

--
-- Enables the Postgis extension
--

CREATE EXTENSION IF NOT EXISTS postgis;


CREATE TABLE competition_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    startdate timestamp NOT NULL,
    enddate timestamp NOT NULL,
    pictureurl text NOT NULL,
    longitude float NOT NULL,
    latitude float NOT NULL,
    locationname character varying(255) NOT NULL,
    products integer[],
    events integer[]
);


CREATE TABLE event_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    date timestamp NOT NULL,
    description character varying(255) NOT NULL,
    pictureurl text NOT NULL,
    longitude float NOT NULL,
    latitude float NOT NULL,
    locationname character varying(255) NOT NULL,
    tickets text[],
    actors text[]
);



CREATE TABLE actor_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    pictureurl text NOT NULL,
    type character varying(255) NOT NULL, -- PLAYER, CLUB, etc.
    longitude float, -- if CLUB
    latitude float, -- if CLUB
    locationname character varying(255),
    products integer[]
);

CREATE TABLE product_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    price bigint NOT NULL,
    discount integer NOT NULL,
    stock integer NOT NULL,
    description character varying(255) NOT NULL,
    deliverytime integer NOT NULL,
    pictureurl text NOT NULL
);


CREATE TABLE ticket_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    price bigint NOT NULL,
    discount integer NOT NULL,
    stock integer NOT NULL,
    description character varying(255) NOT NULL,
    pictureurl text NOT NULL,
    seatnumber character varying(255) NOT NULL
); --INHERITS (product_)


CREATE TABLE user_ (
    id serial NOT NULL PRIMARY KEY,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    favoriteclubs integer[]
);


CREATE TABLE axes_ (
    id serial NOT NULL PRIMARY KEY,
    young numeric NOT NULL,
    old numeric NOT NULL,
    male numeric NOT NULL,
    female numeric NOT NULL,
    csp+ numeric NOT NULL,
    csp- numeric NOT NULL,
    football numeric NOT NULL,
    tennis numeric NOT NULL,
    ski numeric NOT NULL,
);

INSERT INTO "event_" ("id", "name", "date", "description", "pictureurl", "longitude", "latitude", "locationname", "tickets", "actors") VALUES
(1,	'France - Brasil', '2018-10-16', 'Desc of France - Brasil', 'http://bzusa.vamjsu3d.maxcdn-edge.com/file/2015/11/Brazil-stands-with-France-1.jpg', 37.618423, 55.751244, 'Marseille', '{"1","2"}', '{1,2}'),
(2,	'Germany - Italy', '2018-08-16', 'Desc of Germany - Italy', 'http://www.footballbible.net/wp-content/uploads/2012/06/germany_vs_italy_euro_2012_wallpaper.jpg' , 36.2641667, 54.8944444, 'Marseille', '{"2"}', '{2}'),
(3,	'Nadal - Federer', '2018-03-05', 'Desc of Nadal - Federer', 'http://www.thehindu.com/sport/tennis/article19634776.ece/alternates/FREE_660/Federer-Nadal', 2.2467177, 48.847189, 'Marseille','{"3"}', '{3}'),
(4,	'Djokovic - Murray', '2018-03-25', 'Desc of Djokovic - Murray', 'http://ste.india.com/sites/default/files/2016/01/31/455897-novak-mary-leadpic.jpg', 2.2467177, 48.847189, 'Marseille', '{"3","4"}', '{3,4}');

INSERT INTO "competition_" ("id", "name", "description", "startdate", "enddate", "pictureurl", "longitude", "latitude", "locationname", "products", "events") VALUES
(1, 'World cup', 'desc', '2018-06-16', '2018-07-16', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/2018_FIFA_World_Cup.svg/1200px-2018_FIFA_World_Cup.svg.png', 37.618423, 55.751244, 'Marseille', '{1,2}', '{1,2}'),
(2, 'Roland Garros', 'desc	', '2018-03-01', '2018-04-01', 'http://tacomac.com/wp-content/uploads/2016/04/1024px-Frenchopen.svg_.png', 37.618423, 55.751244, 'Marseille', '{3,4}', '{3,4}');

INSERT INTO "actor_" ("id", "name", "pictureurl",	 "type", "longitude", "latitude", "locationname", "products") VALUES
(1, 'OM', '', 'CLUB', 5.400000, 43.300000, 'Marseille', '{1}'),
(2, 'PSG', '', 'CLUB', 2.333333, 48.866667, 'Marseille', '{2}'),
(3, 'Rafael Nadal', '', 'PLAYER', null, null, null, '{3}'),
(4, 'Roger Federer', '', 'PLAYER', null, null, null, '{4}');

INSERT INTO "product_" ("id", "name", "price", "discount", "stock", "description", "deliverytime", "pictureurl") VALUES
(1,	'Product 1', 56, 10, 36, 'Desc of Product 1', 5, 'https://c.76.my/Malaysia/fifa-world-cup-russia-2018-t-shirt-onlinepasar-1506-05-OnlinePasar@1.jpg'),
(2,	'Product 2', 110, 20, 10, 'Desc of Product 2', 10, 'http://soccershop.nationalanthemsworldcup2014.com/img/classic-2018-fifa-world-cup-russia-trucker-hats-commemorative-made-of_54673_400.jpg'),
(3,	'Product 3', 20, 5, 6, 'Desc of Product 3', 2, 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=82626805'),
(4,	'Product 4', 70, 40, 3, 'Desc of Product 4', 3, 'https://boutique.rolandgarros.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/r/t/rtsm0518-bla-blanc-roland-garros-t-shirt-roland-garros-signature-2018-homme---blanc-4.jpg');

INSERT INTO "ticket_" ("id", "name", "price", "discount", "stock", "description", "pictureurl", "seatnumber") VALUES
(1,	'Ticket', 103, 10, 36, 'Desc of Ticket 1', 'https://c.76.my/Malaysia/fifa-world-cup-russia-2018-t-shirt-onlinepasar-1506-05-OnlinePasar@1.jpg', '54K'),
(2,	'Ticket 2', 110, 20, 10, 'Desc of Ticket 2', 'http://soccershop.nationalanthemsworldcup2014.com/img/classic-2018-fifa-world-cup-russia-trucker-hats-commemorative-made-of_54673_400.jpg', '265F'),
(3,	'Ticket 3', 25, 5, 6, 'Desc of Ticket 3', 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=82626805', '78M'),
(4,	'Ticket 4', 70, 40, 3, 'Desc of Ticket 4', 'https://boutique.rolandgarros.com/media/catalog/product/cache/1/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/r/t/rtsm0518-bla-blanc-roland-garros-t-shirt-roland-garros-signature-2018-homme---blanc-4.jpg', '149A');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user_" ("username", "password", "favoriteclubs") VALUES
('user1',	'pass1', '{1}'),
('user2',	'pass2', '{1,2}');

--
-- PostgreSQL database dump complete
--
