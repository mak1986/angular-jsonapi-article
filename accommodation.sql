--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.1
-- Dumped by pg_dump version 9.5.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- Data for Name: accommodation; Type: TABLE DATA; Schema: public; Owner: makjacobsen
--

INSERT INTO accommodation (id, parent, is_parent, name, description, square_area, extra_bed_price, max_extra_bed, max_quantity, max_children, bathrooms, site, kind, facilities, rooms, "luxuryTitle", price) VALUES (2, NULL, false, '{"en": "First floor room", "th": "ห้องพักชั้นบน"}', '{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at feugiat eros, in laoreet libero. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut tincidunt dolor. Morbi augue leo, eleifend sit amet placerat eget, hendrerit ut dolor. Nam ac tellus a ex interdum iaculis. Praesent at quam et erat commodo feugiat. Nulla vel quam suscipit felis euismod euismod.", "th": "มีท่อนต่างๆ ของ Lorem Ipsum ให้หยิบมาใช้งานได้มากมาย แต่ส่วนใหญ่แล้วจะถูกนำไปปรับให้เป็นรูปแบบอื่นๆ อาจจะด้วยการสอดแทรกมุกตลก หรือด้วยคำที่มั่วขึ้นมาซึ่งถึงอย่างไรก็ไม่มีทางเป็นเรื่องจริงได้เลยแม้แต่น้อย ถ้าคุณกำลังคิดจะใช้ Lorem Ipsum สักท่อนหนึ่ง คุณจำเป็นจะต้องตรวจให้แน่ใจว่าไม่มีอะไรน่าอับอายซ่อนอยู่ภายในท่อนนั้นๆ ตัวสร้าง Lorem Ipsum บนอินเทอร์เน็ตทุกตัวมักจะเอาท่อนที่แน่ใจแล้วมาใช้ซ้ำๆ ทำให้กลายเป็นที่มาของตัวสร้างที่แท้จริงบนอินเทอร์เน็ต ในการสร้าง Lorem Ipsum ที่ดูเข้าท่า ต้องใช้คำจากพจนานุกรมภาษาละตินถึงกว่า 200 คำ ผสมกับรูปแบบโครงสร้างประโยคอีกจำนวนหนึ่ง เพราะฉะนั้น Lorem Ipsum ที่ถูกสร้างขึ้นใหม่นี้ก็จะไม่ซ้ำไปซ้ำมา ไม่มีมุกตลกซุกแฝงไว้ภายใน หรือไม่มีคำใดๆ ที่ไม่บ่งบอกความหมาย"}', 20, 0, 0, 5, 1, 1, 1, 1, '{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}', '{2}', 1, 400);
INSERT INTO accommodation (id, parent, is_parent, name, description, square_area, extra_bed_price, max_extra_bed, max_quantity, max_children, bathrooms, site, kind, facilities, rooms, "luxuryTitle", price) VALUES (3, NULL, false, '{"en": "Ground floor room", "th": "ห้องพักชั้นล่าง"}', '{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at feugiat eros, in laoreet libero. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut tincidunt dolor. Morbi augue leo, eleifend sit amet placerat eget, hendrerit ut dolor. Nam ac tellus a ex interdum iaculis. Praesent at quam et erat commodo feugiat. Nulla vel quam suscipit felis euismod euismod.", "th": "มีท่อนต่างๆ ของ Lorem Ipsum ให้หยิบมาใช้งานได้มากมาย แต่ส่วนใหญ่แล้วจะถูกนำไปปรับให้เป็นรูปแบบอื่นๆ อาจจะด้วยการสอดแทรกมุกตลก หรือด้วยคำที่มั่วขึ้นมาซึ่งถึงอย่างไรก็ไม่มีทางเป็นเรื่องจริงได้เลยแม้แต่น้อย ถ้าคุณกำลังคิดจะใช้ Lorem Ipsum สักท่อนหนึ่ง คุณจำเป็นจะต้องตรวจให้แน่ใจว่าไม่มีอะไรน่าอับอายซ่อนอยู่ภายในท่อนนั้นๆ ตัวสร้าง Lorem Ipsum บนอินเทอร์เน็ตทุกตัวมักจะเอาท่อนที่แน่ใจแล้วมาใช้ซ้ำๆ ทำให้กลายเป็นที่มาของตัวสร้างที่แท้จริงบนอินเทอร์เน็ต ในการสร้าง Lorem Ipsum ที่ดูเข้าท่า ต้องใช้คำจากพจนานุกรมภาษาละตินถึงกว่า 200 คำ ผสมกับรูปแบบโครงสร้างประโยคอีกจำนวนหนึ่ง เพราะฉะนั้น Lorem Ipsum ที่ถูกสร้างขึ้นใหม่นี้ก็จะไม่ซ้ำไปซ้ำมา ไม่มีมุกตลกซุกแฝงไว้ภายใน หรือไม่มีคำใดๆ ที่ไม่บ่งบอกความหมาย"}', 20, 0, 0, 1, 1, 1, 1, 1, '{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}', '{4}', 1, 500);
INSERT INTO accommodation (id, parent, is_parent, name, description, square_area, extra_bed_price, max_extra_bed, max_quantity, max_children, bathrooms, site, kind, facilities, rooms, "luxuryTitle", price) VALUES (1, NULL, false, '{"en": "Ground floor room", "th": "ห้องพักชั้นล่าง"}', '{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at feugiat eros, in laoreet libero. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut tincidunt dolor. Morbi augue leo, eleifend sit amet placerat eget, hendrerit ut dolor. Nam ac tellus a ex interdum iaculis. Praesent at quam et erat commodo feugiat. Nulla vel quam suscipit felis euismod euismod.", "th": "มีท่อนต่างๆ ของ Lorem Ipsum ให้หยิบมาใช้งานได้มากมาย แต่ส่วนใหญ่แล้วจะถูกนำไปปรับให้เป็นรูปแบบอื่นๆ อาจจะด้วยการสอดแทรกมุกตลก หรือด้วยคำที่มั่วขึ้นมาซึ่งถึงอย่างไรก็ไม่มีทางเป็นเรื่องจริงได้เลยแม้แต่น้อย ถ้าคุณกำลังคิดจะใช้ Lorem Ipsum สักท่อนหนึ่ง คุณจำเป็นจะต้องตรวจให้แน่ใจว่าไม่มีอะไรน่าอับอายซ่อนอยู่ภายในท่อนนั้นๆ ตัวสร้าง Lorem Ipsum บนอินเทอร์เน็ตทุกตัวมักจะเอาท่อนที่แน่ใจแล้วมาใช้ซ้ำๆ ทำให้กลายเป็นที่มาของตัวสร้างที่แท้จริงบนอินเทอร์เน็ต ในการสร้าง Lorem Ipsum ที่ดูเข้าท่า ต้องใช้คำจากพจนานุกรมภาษาละตินถึงกว่า 200 คำ ผสมกับรูปแบบโครงสร้างประโยคอีกจำนวนหนึ่ง เพราะฉะนั้น Lorem Ipsum ที่ถูกสร้างขึ้นใหม่นี้ก็จะไม่ซ้ำไปซ้ำมา ไม่มีมุกตลกซุกแฝงไว้ภายใน หรือไม่มีคำใดๆ ที่ไม่บ่งบอกความหมาย"}', 20, 0, 0, 5, 1, 1, 1, 1, '{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}', '{2}', 1, 400);
INSERT INTO accommodation (id, parent, is_parent, name, description, square_area, extra_bed_price, max_extra_bed, max_quantity, max_children, bathrooms, site, kind, facilities, rooms, "luxuryTitle", price) VALUES (4, NULL, false, '{"en": "First floor room", "th": "ห้องพักชั้นบน"}', '{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at feugiat eros, in laoreet libero. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus ut tincidunt dolor. Morbi augue leo, eleifend sit amet placerat eget, hendrerit ut dolor. Nam ac tellus a ex interdum iaculis. Praesent at quam et erat commodo feugiat. Nulla vel quam suscipit felis euismod euismod.", "th": "มีท่อนต่างๆ ของ Lorem Ipsum ให้หยิบมาใช้งานได้มากมาย แต่ส่วนใหญ่แล้วจะถูกนำไปปรับให้เป็นรูปแบบอื่นๆ อาจจะด้วยการสอดแทรกมุกตลก หรือด้วยคำที่มั่วขึ้นมาซึ่งถึงอย่างไรก็ไม่มีทางเป็นเรื่องจริงได้เลยแม้แต่น้อย ถ้าคุณกำลังคิดจะใช้ Lorem Ipsum สักท่อนหนึ่ง คุณจำเป็นจะต้องตรวจให้แน่ใจว่าไม่มีอะไรน่าอับอายซ่อนอยู่ภายในท่อนนั้นๆ ตัวสร้าง Lorem Ipsum บนอินเทอร์เน็ตทุกตัวมักจะเอาท่อนที่แน่ใจแล้วมาใช้ซ้ำๆ ทำให้กลายเป็นที่มาของตัวสร้างที่แท้จริงบนอินเทอร์เน็ต ในการสร้าง Lorem Ipsum ที่ดูเข้าท่า ต้องใช้คำจากพจนานุกรมภาษาละตินถึงกว่า 200 คำ ผสมกับรูปแบบโครงสร้างประโยคอีกจำนวนหนึ่ง เพราะฉะนั้น Lorem Ipsum ที่ถูกสร้างขึ้นใหม่นี้ก็จะไม่ซ้ำไปซ้ำมา ไม่มีมุกตลกซุกแฝงไว้ภายใน หรือไม่มีคำใดๆ ที่ไม่บ่งบอกความหมาย"}', 20, 0, 0, 1, 1, 1, 1, 1, '{1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16}', '{4}', 1, 500);


--
-- Name: accommodation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: makjacobsen
--

SELECT pg_catalog.setval('accommodation_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--

