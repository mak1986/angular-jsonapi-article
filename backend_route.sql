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
-- Data for Name: backend_route; Type: TABLE DATA; Schema: public; Owner: makjacobsen
--

INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (2, 'group_show', 'show', 'group', '#/group/show/:id', 'management_app/resources/group/views/show.html', false, '{7}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (3, 'group_create', 'create', 'group', '#/group/:mode', 'management_app/resources/group/views/form.html', false, '{7}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (5, 'user_list', 'list', 'user', '#/user/list', 'management_app/resource/user/views/list.html', true, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (6, 'user_show', 'show', 'user', '#/user/show/:id', 'management_app/resource/user/views/show.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (7, 'user_create', 'create', 'user', '#/user/:mode', 'management_app/resource/user/views/form.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (8, 'user_edit', 'edit', 'user', '#/user/:mode/:id', 'management_app/resource/user/views/form.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (9, 'user_preference', 'list', 'user_preference', '#/user-preference/list', 'management_app/resources/user_preference/views/list.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (10, 'user_preference_show', 'show', 'user_preference', '#/user-preference/show/:id', 'management_app/resources/user_preference/views/show.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (11, 'user_preference_create', 'create', 'user_preference', '#/user-preference/:mode', 'management_app/resources/user_preference/views/form.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (13, 'model.machine_name', 'list', 'machine_name', '#/machine-name/list', 'management_app/resources/machine_name/views/list.html', true, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (14, 'machine_name_show', 'show', 'machine_name', '#/machine-name/show/:id', 'management_app/resources/machine_name/views/show.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (15, 'machine_name_create', 'create', 'machine_name', '#/machine-name/:mode', 'management_app/resources/machine_name/views/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (16, 'machine_name_edit', 'edit', 'machine_name', '#/machine-name/:mode/:id', 'management_app/resources/machine_name/views/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (17, 'model.machine_name_translation', 'list', 'machine-name-translation', '#/machine-name-translation/list', 'management_app/resources/machine_name_translation/views/list.html', true, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (18, 'machine_name_translation_show', 'show', 'machine-name-translation', '#/machine-name-translation/show/:id', 'management_app/resources/machine_name_translation/views/show.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (19, 'machine_name_translation_create', 'create', 'machine-name-translation', '#/machine-name-translation/:mode', 'management_app/resources/machine_name_translation/views/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (20, 'machine_name_translation_edit', 'edit', 'machine-name-translation', '#/machine-name-translation/:mode/:id', 'management_app/resources/machine_name_translation/views/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (21, 'backend_route', 'list', 'backend_route', '#/backend-route/list', 'management_app/resources/backend_route/views/list.html', true, '{3}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (22, 'backend_route_show', 'show', 'backend_route', '#/backend-route/show/:id', 'management_app/resources/backend_route/views/show.html', false, '{3}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (23, 'backend_route_create', 'create', 'backend_route', '#/backend-route/:mode', 'management_app/resources/backend_route/views/form.html', false, '{3}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (25, 'feature', 'list', 'feature', '#/feature/list', 'management_app/resource/feature/view/list.html', true, '{2}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (26, 'feature_show', 'show', 'feature', '#/feature/show/:id', 'management_app/resource/feature/view/show.html', false, '{2}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (27, 'feature_create', 'create', 'feature', '#/feature/:mode', 'management_app/resource/feature/view/form.html', false, '{2}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (28, 'feature_edit', 'edit', 'feature', '#/feature/:mode/:id', 'management_app/resource/feature/view/list.html', false, '{2}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (29, 'site', 'list', 'site', '#/site/list', 'management_app/resource/site/view/list.html', true, '{5}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (30, 'site_show', 'show', 'site', '#/site/show/:id', 'management_app/resource/site/view/show.html', false, '{5}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (31, 'site_create', 'create', 'site', '#/site/:mode', 'management_app/resource/site/view/form.html', false, '{5}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (32, 'site_edit', 'edit', 'site', '#/site/:mode/:od', 'management_app/resource/site/view/form.html', false, '{5}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (33, 'plan', 'list', 'plan', '#/plan/list', 'management_app/resource/plan/view/list.html', true, '{8}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (34, 'plan_show', 'show', 'plan', '#/plan/show/:id', 'management_app/resource/plan/view/show.html', false, '{8}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (35, 'plan_create', 'create', 'plan', '#/plan/:mode', 'management_app/resource/plan/view/form.html', false, '{8}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (36, 'plan_edit', 'edit', 'plan', '#/plan/:mode/:id', 'management_app/resource/plan/view/form.html', false, '{8}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (37, 'model.resort_facility', 'list', 'resort_facility', '#/resort-facility/list', 'management_app/resource/resort_facility/view/list.html', true, '{9}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (39, 'resort_facility_create', 'create', 'resort_facility', '#/resort-facility/:mode', 'management_app/resource/resort_facility/view/form.html', false, '{9}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (40, 'resort_facility_edit', 'edit', 'resort_facility', '#/resort-facility/:mode/:id', 'management_app/resource/resort_facility/view/form.html', false, '{9}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (41, 'model.accommodation_facility', 'list', 'accommodation_facility', '#/accommodation-facility/list', 'management_app/resource/accommodation_facility/views/list.html', true, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (46, 'accommodation_kind_show', 'show', 'accommodation_kind', '#/accommodation-kind/show/:id', 'management_app/resource/accommodation_kind/views/list.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (47, 'accommodation_kind_create', 'create', 'accommodation_kind', '#/accommodation-kind/:mode', 'management_app/resource/accommodation_kind/view/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (48, 'accommodation_kind_edit', 'edit', 'accommodation_kind', '#/accommodation-kind/:mode/:id', 'management_app/resource/accommodation_kind/view/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (49, 'accommodation', 'list', 'accommodation', '#/accommodation/list', 'management_app/resource/accommodation/view/list.html', true, '{11}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (50, 'accommodation_show', 'show', 'accommodation', '#/accommodation/show/:id', 'management_app/resource/accommodation/view/show.html', false, '{11}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (51, 'accommodation_create', 'create', 'accommodation', '#/accommodation/:mode', 'management_app/resource/accommodation/view/form.html', false, '{11}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (52, 'accommodation_edit', 'edit', 'accommodation', '#/accommodation/:mode/:id', 'management_app/resource/accommodation/view/form.html', false, '{11}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (53, 'model.language', 'list', 'language', '#/language/list', 'management_app/resource/language/view/form.html', true, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (54, 'language_show', 'show', 'language', '#/language/show/:id', 'management_app/resource/language/view/show.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (1, 'group', 'list', 'group', '#/group/list', 'management_app/resources/group/views/list.html', true, '{7}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (4, 'group_edit', 'edit', 'group', '#/group/:mode/:id', 'management_app/resources/group/views/form.html', false, '{7}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (72, 'section_edit', 'edit', 'section', '#/section/:mode/:id', 'management_app/resource/section/view/form.html', false, '{14}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (71, 'section_create', 'create', 'section', '#/section/:mode', 'management_app/resource/section/view/form.html', false, '{14}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (70, 'section_show', 'show', 'section', '#/section/show/:id', 'management_app/resource/section/view/show.html', false, '{14}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (69, 'section', 'list', 'section', '#/section/list', 'management_app/resource/section/view/list.html', true, '{14}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (68, 'section_kind_edit', 'edit', 'section_kind', '#/section-kind/:mode/:id', 'management_app/resource/section_kind/view/form.html', false, '{13}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (67, 'section_kind_create', 'create', 'section_kind', '#/section-kind/:mode', 'management_app/resource/section_kind/view/form.html', false, '{13}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (66, 'section_kind_show', 'show', 'section_kind', '#/section-kind/show', 'management_app/resource/section_kind/view/show.html', false, '{13}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (64, 'page_edit', 'edit', 'page', '#/page/:mode/:id', 'management_app/resource/page/view/form.html', false, '{12}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (63, 'page_crea', 'create', 'page', '#/page/:mode', 'management_app/resource/page/view/form.html', false, '{12}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (62, 'page_show', 'show', 'page', '#/page/show/:id', 'management_app/resource/page/view/show.html', false, '{12}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (61, 'page', 'lis', 'page', '#/page/list', 'management_app/resource/page/view/list.html', true, '{12}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (60, 'room_combination_edit', 'edit', 'room_combination', '#/room-combination/:form/:id', 'management_app/resource/room_combination/view/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (12, 'user_preference_edit', 'edit', 'user_preference', '#/user-preference/:mode/:id', 'management_app/resources/user_preference/views/form.html', false, '{6}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (24, 'backend_route_edit', 'edit', 'backend_route', '#/backend-route/:mode/:id', 'management_app/resources/backend_route/views/form.html', false, '{3}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (38, 'resort_facility_show', 'show', 'resort_facility', '#/resort-facility/show/:id', 'management_app/resource/resort_facility/view/show.html', false, '{9}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (43, 'accommodation_facility_create', 'create', 'accommodation_facility', '#/accommodation-facility/:mode', 'management_app/resource/accommodation_facility/view/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (42, 'accommodation_facility_show', 'show', 'accommodation_facility', '#/accommodation-facility/show/:id', 'management_app/resource/accommodation_facility/view/show.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (44, 'accommodation_facility_edit', 'edit', 'accommodation_facility', '#/accommodation-facility/:mode/:id', 'management_app/resource/accommodation_facility/views/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (45, 'model.accommodation_kind', 'list', 'accommodation_kind', '#/accommodation-kind/list', 'management_app/resource/accommodation_kind/views/list.html', true, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (55, 'language_create', 'create', 'language', '#/language/:mode', 'management_app/resource/language/view/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (56, 'language_edit', 'edit', 'language', '#/language/:mode/:id', 'management_app/resource/language/view/form.html', false, '{4}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (57, 'model.room_combination', 'list', 'room_combination', '#/room-combination/list', 'management_app/resource/room_combination/view/list.html', true, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (58, 'room_combination_show', 'show', 'room_combination', '#/room-combination/show/:id', 'management_app/resource/room_combination/view/show.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (59, 'room_combination_create', 'create', 'room_combination', '#/room-combination/:mode', 'management_app/resource/room_combination/view/form.html', false, '{10}');
INSERT INTO backend_route (id, machine_name, mode, model, route, "templateUrl", is_menu, features) VALUES (65, 'section_kind', 'list', 'section_kind', '#/section-kind/list', 'management_app/resource/section_kind/view/list.html', true, '{13}');


--
-- Name: backend_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: makjacobsen
--

SELECT pg_catalog.setval('backend_route_id_seq', 72, true);


--
-- PostgreSQL database dump complete
--

