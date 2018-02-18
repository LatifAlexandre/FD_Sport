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

DROP TABLE IF EXISTS axes_ CASCADE;
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


CREATE TABLE axes_ (
    id serial NOT NULL PRIMARY KEY,
    young numeric NOT NULL,
    old numeric NOT NULL,
    male numeric NOT NULL,
    female numeric NOT NULL,
    csp_plus numeric NOT NULL,
    csp_minus numeric NOT NULL,
    football numeric NOT NULL,
    tennis numeric NOT NULL,
    ski numeric NOT NULL
);

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
    pictureurl text NOT NULL,
    floating boolean NOT NULL,
    axes integer REFERENCES axes_(id)
);


CREATE TABLE ticket_ (
    id serial NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    price bigint NOT NULL,
    discount integer NOT NULL,
    stock integer NOT NULL,
    description character varying(255) NOT NULL,
    pictureurl text NOT NULL,
    seatnumber character varying(255) NOT NULL,
    floating boolean NOT NULL,
    axes integer REFERENCES axes_(id)
); --INHERITS (product_)


CREATE TABLE user_ (
    id serial NOT NULL PRIMARY KEY,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    favoriteclubs integer[],
    axes integer REFERENCES axes_(id)
);


INSERT INTO "axes_" ("id", "young", "old", "male", "female", "csp_plus", "csp_minus", "football", "tennis", "ski") VALUES
(1,	0, 1, 1, 0, 0, 1, 1, 1, 0),
(2,	1, 0, 0, 1, 1, 0, 1, 1, 1),
(3,	0, 1, 0, 1, 0, 1, 0, 0, 0),
(4,	1, 0, 1, 0, 0, 1, 0, 0, 1),
-- produits
(5,0.7, 0.5, 0.8, 0.1, 0.3, 0.6, 1, 0, 0),
(6,0.8,0.3,0.9,0.2,0.3,0.5,1,0,0),
(8,0.7,0.4,0.8,0.2,0.6,0.3,1,0,0),
(9,0.8,0.2,0.9,0.1,0.3,0.6,1,0,0),
(10,0.7,0.2,0.5,0.5,0.4,0.2,0,0,1),
(11,0.7,0.2,0.5,0.5,0.4,0.2,0,0,1),
(12,0.7,0.2,0.5,0.5,0.4,0.2,0,0,1),
(13,0.4,0.5,0.7,0.4,0.6,0.3,0,0,1),
(14,0.5,0.5,0.1,0.9,0.2,0.7,0,0,1),
(15,0.7,0.2,0.6,0.3,0.4,0.2,0,0,1),
(16, 0.7, 0.2, 0.6, 0.3, 0.4, 0.2, 0, 0, 1),
(17, 0.6, 0.4, 0.7, 0.2, 0.8, 0.1, 0, 0, 1),
(18, 0.7, 0.4, 0.7, 0.5, 0.6, 0.2, 0, 1, 0),
(19, 0.6, 0.5, 0.8, 0.1, 0.2, 0.7, 1, 0, 0),
(20, 0.6, 0.5, 0.8, 0.1, 0.2, 0.7, 1, 0, 0),
(21, 0.6, 0.5, 0.1, 0.8, 0.2, 0.7, 1, 0, 0),
(22, 0.6, 0.5, 0.1, 0.8, 0.2, 0.7, 1, 0, 0),
(23, 0.9, 0.1, 0.9, 0.2, 0.8, 0.1, 0, 1, 0),
(24, 0.9, 0.1, 0.1, 0.9, 0.8, 0.1, 0, 1, 0),
(25, 0.7, 0.4, 0.8, 0.3, 0.8, 0.1, 0, 0, 1),
(26, 0.7, 0.4, 0.2, 0.9, 0.8, 0.1, 0, 0, 1),
(27, 0.7, 0.2, 0.8, 0.1, 0.4, 0.7, 1, 0, 0),
(28, 0.7, 0.2, 0.8, 0.1, 0.4, 0.7, 1, 0, 0),
(29, 0.2, 0.7, 0.1, 0.8, 0.8, 0.1, 1, 0, 0),
(30, 0.2, 0.7, 0.1, 0.8, 0.8, 0.1, 1, 0, 0),
(31, 0.3, 0.7, 0.5, 0.5, 0.9, 0.1, 0, 1, 0),
(32, 0.2, 0.9, 0.7, 0.3, 1.0, 0.0, 0, 0, 1),
(33, 0.3, 0.8, 0.7, 0.3, 0.7, 0.1, 0, 0, 1);

INSERT INTO "event_" ("id", "name", "date", "description", "pictureurl", "longitude", "latitude", "locationname", "tickets", "actors") VALUES
(1,	'Foot - OM - OL', '2018-10-16', 'Desc of OM - OL', 'https://france3-regions.francetvinfo.fr/auvergne-rhone-alpes/sites/regions_france3/files/styles/top_big/public/assets/images/2016/09/18/om_ol.jpg?itok=ecXRW30N', 37.618423, 55.751244, 'Marseille', '{"1","2"}', '{1,2}'),
(2,	'PSG - Nantes feminin', '2018-08-16', 'Desc of PSG - Nantes feminin', 'http://www.parisfans.fr/wp-content/uploads/2017/11/PSGNantes-Le-groupe-nantais-21-joueurs-convoques-par-Ranieri-620x307.jpg' , 4.835658999999964, 45.764043, 'Paris', '{"3", "4"}', '{3,4}'),
(3,	'Tournoi de ski', '2018-03-05', 'Desc of Jean-Luc vs Vanessa', 'http://img6.custompublish.com/getfile.php/3106437.1046.qbwrdpwfda/ROSSIGNOL+NORDIC.jpeg', 6.4888, 44.8804, 'Pelvoux','{"5"}', '{5,6}'),
(4,	'Tennis - Tsonga vs Wozniacki', '2018-03-25', 'Match de Roland Garros entre J.F Tsonga et Caroline Wozniacki', 'https://www.rts.ch/2018/01/17/09/02/9255409.image?w=960&h=540', 4.835658999999964, 45.764043, 'Paris', '{"6","7"}', '{7,8}');

INSERT INTO "competition_" ("id", "name", "description", "startdate", "enddate", "pictureurl", "longitude", "latitude", "locationname", "products", "events") VALUES
(1, 'World cup', 'desc of World cup', '2018-06-16', '2018-07-16', 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/2018_FIFA_World_Cup.svg/1200px-2018_FIFA_World_Cup.svg.png', 37.618423, 55.751244, 'Marseille', '{1,2,3}', '{}'),
(2, 'Roland Garros', 'desc of Roland Garros', '2018-03-01', '2018-04-01', 'http://tacomac.com/wp-content/uploads/2016/04/1024px-Frenchopen.svg_.png', 4.835658999999964, 45.764043, 'Paris', '{5,6,8,9}', '{1}'),
(3, 'EUROPA league', 'desc of EUROPA league', '2018-03-01', '2018-04-01', 'https://www.footballticketnet.fr/files/images/tournaments/Buy-Europa-League-Football-Tickets-FootballTicketNet.png', 37.618423, 55.751244, 'Marseille', '{4}', '{1}'),
(4, 'Monte Carlo masters', 'desc of Monte Carlo masters', '2018-03-01', '2018-04-01', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0m9yfljhUYUgE2js6gFndUJSli-lx2g3cFS0j35C3Ccr_Rfff9Q', 7.42732, 43.73976, 'Monte Carlo', '{10,11,12,13}', '{4}'),
(5, 'Ski world cup', 'desc of Ski world cup', '2018-03-01', '2018-04-01', 'https://www.paralympic.org/sites/default/files/images/20180212/171113110518970_Alpine_Skiing_World_Cup_logo_2018.png', 6.4888, 44.8804, 'Pelvoux', '{14}', '{3}'),
(6, 'EUROPA league feminin', 'desc of EUROPA league feminin', '2018-03-01', '2018-04-01', 'https://www.footballticketnet.fr/files/images/tournaments/Buy-Europa-League-Football-Tickets-FootballTicketNet.png', 37.618423, 55.751244, 'Marseille', '{4}', '{2}');

INSERT INTO "actor_" ("id", "name", "pictureurl", "type", "longitude", "latitude", "locationname", "products") VALUES
(1, 'OM', 'https://upload.wikimedia.org/wikipedia/fr/4/43/Logo_Olympique_de_Marseille.svg', 'CLUB', 5.369779999999992, 43.296482, 'Marseille', '{15}'),
(2, 'OL', 'https://pbs.twimg.com/profile_images/883733518920146944/5_8m_2MK_400x400.jpg', 'CLUB', 4.835658999999964, 45.764043, 'Lyon', '{16}'),
(3, 'PSG feminin', 'https://upload.wikimedia.org/wikipedia/fr/8/86/Paris_Saint-Germain_Logo.svg', 'CLUB', 2.3522219000000177, 48.856614, 'Paris', '{17}'),
(4, 'Nantes feminin', 'https://upload.wikimedia.org/wikipedia/fr/c/ce/Fcna_logo_2008.png', 'CLUB', -1.553621000000021, 47.218371, 'Nantes', '{18}'),
(5, 'Jean-luc', '', 'PLAYER', null, null, 'Marseille', '{19}'),
(6, 'Vanessa', '', 'PLAYER', null, null, null, '{20}'),
(7, 'Jo-Wilfried Tsonga', '', 'PLAYER', null, null, null, '{21}'),
(8, 'Caroline Wozniacki', '', 'PLAYER', null, null, null, '{22}');

INSERT INTO "product_" ("id", "name", "price", "discount", "stock", "description", "deliverytime", "pictureurl", "floating", "axes") VALUES
(1, 'Maillot Officiel de la coupe du monde', 60, 0, 150, 'Maillot très jolie de la coupe du monde', 5, 'https://c.76.my/Malaysia/fifa-world-cup-russia-2018-t-shirt-onlinepasar-1506-05-OnlinePasar@1.jpg', FALSE, 5),
(2, 'Official World Cup ball', 25, 0 ,150, 'Official world cup ball', 5, 'https://worldcuptheguide.files.wordpress.com/2014/02/watermarked_thumbnail-aspx.jpeg', FALSE, 6),
(3, 'Official World Cup Pullover', 80, 0, 150, 'Official World Cup Pullover', 5, 'https://docs.google.com/document/d/1aOW2B5lLmIAfwsi-xlxkBwgFCleB5LYiNpKj-cX3QNQ/edit#', FALSE, 8),
(4, 'Official Europa League ball', 20, 15, 70, 'Official Europa League ball', 5, 'https://i2.cdscdn.com/pdt2/3/7/3/1/700x700/adi4057282964373/rw/ballon-de-match-officiel-adidas-europa-league.jpg', FALSE, 9),
(5, 'Official Roland Garros t-shirt WHITE', 25, 0, 20, 'Official Roland Garros t-shirt WHITE', 5, 'https://store.rolandgarros.com/media/catalog/product/cache/2/image/1800x/040ec09b1e35df139433887a97daa66f/r/t/rtsm0518-bla-blanc-roland-garros-t-shirt-roland-garros-signature-2018-homme---blanc-4.jpg', FALSE, 10),
(6, 'Official Roland Garros t-shirt BLACK', 25, 50, 150, 'Official Roland Garros t-shirt BLACK', 5, 'https://store.rolandgarros.com/media/catalog/product/cache/2/image/1800x/040ec09b1e35df139433887a97daa66f/r/t/rtsm0518-mar-bleu-roland-garros-t-shirt-roland-garros-signature-2018-homme---marine-4.jpg', FALSE, 11),
(8, 'Official Roland Garros t-shirt 2017', 25, 75, 150, 'Official Roland Garros t-shirt 2017', 5, 'https://boutique.rolandgarros.com/media/catalog/product/cache/1/image/1800x/040ec09b1e35df139433887a97daa66f/r/t/rtsm0317-bla-blanc-roland-garros-t-shirt-imprime-logo-roland-garros-2017-homme---blanc-4.jpg', FALSE, 12),
(9, 'Official Roland Garros hat', 15, 0, 15, 'Official Roland Garros hat', 5, 'https://eshop-peugeot.cz/2860/white-cap-roland-garros.jpg', FALSE, 13),
(10, 'Official Monte Carlo Baby BB', 20, 0, 79, 'Monte Carlo Baby BB', 5, 'https://store.montecarlotennismasters.com/sites/smett7.ap2s.fr/files/styles/node-famille-product-visuel/public/Body%20BB%20logo%20Masters.jpg?itok=ERFD1WQD', FALSE, 14),
(11, 'Official Monte Carlo Masters t-shirt', 18, 0, 180, 'Official Monte Carlo Masters t-shirt', 5, 'http://static.shop.sergiotacchini.com/media/catalog/product/0/0/000M036550-70_2_2.jpg', FALSE, 15),
(12, 'Official Monte Carlo Masters t-shirt', 18, 0, 50, 'Official Monte Carlo Masters t-shirt', 5, 'https://images.sportsdirect.com/images/products/63929501_l.jpg', FALSE, 16),
(13, 'Official Monte Carlo Masters ball', 5, 0, 36, 'Official Monte Carlo Masters ball', 5, 'http://www.100percentauthentic.com/pics/81259_01_lg.jpg', FALSE, 17),
(14, 'Official Ski world cup t-shirt', 30, 0, 15, 'Official Ski world cup t-shirt', 5, 'https://i.ebayimg.com/images/g/BLQAAOSwB09YLN28/s-l300.jpg', FALSE, 18),
(15, 'Maillot Officiel OM', 60, 0, 36 ,'Maillot très jolie de OM', 5, 'https://www.go-sport.com/media/resized/1300x/catalog/product/01/37/18/44/om-maillot-exterieur-17_1_v1.jpg', FALSE, 19),
(16, 'Maillot Officiel OL', 60, 0, 36 ,'Maillot très jolie de OL', 5, 'https://ol-boutique-cdn-2.azureedge.net/6403-large_default/maillot-domicile-adulte-2016-17.jpg', FALSE, 20),
(17, 'Maillot Officiel PSG feminin', 60, 30, 36 ,'Maillot très jolie du PSG', 5, 'https://boutique.foot.fr/12990-thickbox_default/maillot-psg-domicile-201718.jpg', FALSE, 21),
(18, 'Maillot Officiel Nantes feminin', 60, 0, 36 ,'Maillot très jolie de Nantes', 5, 'http://www.madeinsport.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/3/1/315510_2.jpg', FALSE, 22),
(19, 'Les skis officiel de Jean-luc', 320, 15, 36, 'Les skis officiels de Jean-luc qui lui a permit de remporter la coupe du monde de ski en 1962', 5, 'https://www.decathlon.fr/media/839/8399022/big_30b2ee4a-5a67-4f40-98f9-b0463ec3112e.jpg', FALSE, 23),
(20, 'Les skis officiel de Vanessa', 320, 0, 36 ,'Les skis officiels de Vanessa', 5, 'http://www.freestyle-sports.fr/images/1385570427dynastar-cham-87W-fluid.jpg', FALSE, 24),
(21, 'La raquette officielle de Tsonga', 150, 0, 36 ,'xxxxxxxxxxxxxxxxxxxxxxxxxxxx', 5, 'https://img.tennis-warehouse.com/watermark/rs.php?path=BPAP-1.jpg&nw=350', FALSE, 25),
(22, 'La raquette officielle de Wozniaki', 150, 10, 36, 'Maillot très jolie de OM', 5, 'https://i.eurosport.com/2017/10/29/2197105-45899430-2560-1440.jpg?w=1050', FALSE, 26);

INSERT INTO "ticket_" ("id", "name", "price", "discount", "stock", "description", "pictureurl", "seatnumber", "floating", "axes") VALUES
(1,	'Match OM-OL - première classe', 110, 10, 200, 'Desc of Ticket 1', 'https://c.76.my/Malaysia/fifa-world-cup-russia-2018-t-shirt-onlinepasar-1506-05-OnlinePasar@1.jpg', '54K', FALSE, 27),
(2,	'Match OM-OL ', 80, 0, 10, 'Desc of Ticket 2', 'http://soccershop.nationalanthemsworldcup2014.com/img/classic-2018-fifa-world-cup-russia-trucker-hats-commemorative-made-of_54673_400.jpg', '265F', FALSE, 28),
(3,	'PSG - Nantes feminin - première classe', 90, 0, 6, 'Desc of Ticket 3', 'https://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=82626805', '78M', FALSE, 29),
(4,	'PSG - Nantes feminin', 50, 5, 3, 'Desc of Ticket 4', '', '149A', FALSE, 30),
(5,	'Tournoi de ski', 150, 0, 25, 'Desc of Ticket 4', '', '149A', FALSE, 31),
(6,	'Tsonga - Wozniacki - première classe', 150, 0, 50, 'Desc of Ticket 4', '', '149A', FALSE, 32),
(7,	'Tsonga - Wozniacki', 100, 15, 320, 'Desc of Ticket 4', '', '149A', FALSE, 33);


INSERT INTO "user_" ("username", "password", "favoriteclubs", "axes") VALUES
('old_male_minus_foot_tennis', 'pass1', '{1,4}', 1),
('young_female_plus_foot_ski_tennis', 'pass2', '{2,3}', 2),
('old_female_plus_none', 'pass2', '{}', 3),
('young_male_minus_ski', 'pass2', '{}', 4);

--
-- PostgreSQL database dump complete
--
