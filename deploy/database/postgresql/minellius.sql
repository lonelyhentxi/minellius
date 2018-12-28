--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: content_type; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.content_type (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public.content_type OWNER TO minellius_test;

--
-- Name: COLUMN content_type.id; Type: COMMENT; Schema: public; Owner: minellius_test
--

COMMENT ON COLUMN public.content_type.id IS 'undefined';


--
-- Name: content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.content_type_id_seq OWNER TO minellius_test;

--
-- Name: content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.content_type_id_seq OWNED BY public.content_type.id;


--
-- Name: current; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.current (
    id integer NOT NULL,
    keyword character varying(10485760),
    dict text
);


ALTER TABLE public.current OWNER TO postgres;

--
-- Name: current_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.current_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.current_id_seq OWNER TO postgres;

--
-- Name: current_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.current_id_seq OWNED BY public.current.id;


--
-- Name: group; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public."group" (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    title character varying(255) NOT NULL
);


ALTER TABLE public."group" OWNER TO minellius_test;

--
-- Name: COLUMN "group".id; Type: COMMENT; Schema: public; Owner: minellius_test
--

COMMENT ON COLUMN public."group".id IS 'undefined';


--
-- Name: group_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_id_seq OWNER TO minellius_test;

--
-- Name: group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.group_id_seq OWNED BY public."group".id;


--
-- Name: group_permissions; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.group_permissions (
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.group_permissions OWNER TO minellius_test;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO minellius_test;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO minellius_test;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: oauth_tokens_accesstoken; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.oauth_tokens_accesstoken (
    id integer NOT NULL,
    provider character varying(20) NOT NULL,
    provider_client_id character varying(200) NOT NULL,
    granted_at timestamp without time zone DEFAULT now() NOT NULL,
    access_token character varying(500) NOT NULL,
    expires_at timestamp without time zone,
    token_type character varying(200),
    scope character varying(512),
    user_id integer,
    refresh_token character varying(200)
);


ALTER TABLE public.oauth_tokens_accesstoken OWNER TO minellius_test;

--
-- Name: COLUMN oauth_tokens_accesstoken.id; Type: COMMENT; Schema: public; Owner: minellius_test
--

COMMENT ON COLUMN public.oauth_tokens_accesstoken.id IS 'undefined';


--
-- Name: oauth_tokens_accesstoken_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.oauth_tokens_accesstoken_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.oauth_tokens_accesstoken_id_seq OWNER TO minellius_test;

--
-- Name: oauth_tokens_accesstoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.oauth_tokens_accesstoken_id_seq OWNED BY public.oauth_tokens_accesstoken.id;


--
-- Name: period_org_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.period_org_event (
    id integer NOT NULL,
    period character(7) NOT NULL,
    event_type integer NOT NULL,
    orgname character varying(150) NOT NULL,
    num integer NOT NULL
);


ALTER TABLE public.period_org_event OWNER TO postgres;

--
-- Name: period_org_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.period_org_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.period_org_event_id_seq OWNER TO postgres;

--
-- Name: period_org_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.period_org_event_id_seq OWNED BY public.period_org_event.id;


--
-- Name: period_repo_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.period_repo_event (
    id integer NOT NULL,
    period character(7) NOT NULL,
    event_type integer NOT NULL,
    reponame character varying(150) NOT NULL,
    num integer NOT NULL
);


ALTER TABLE public.period_repo_event OWNER TO postgres;

--
-- Name: period_repo_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.period_repo_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.period_repo_event_id_seq OWNER TO postgres;

--
-- Name: period_repo_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.period_repo_event_id_seq OWNED BY public.period_repo_event.id;


--
-- Name: period_user_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.period_user_event (
    id integer NOT NULL,
    period character(7) NOT NULL,
    event_type integer NOT NULL,
    username character varying(150) NOT NULL,
    num integer NOT NULL
);


ALTER TABLE public.period_user_event OWNER TO postgres;

--
-- Name: period_user_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.period_user_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.period_user_event_id_seq OWNER TO postgres;

--
-- Name: period_user_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.period_user_event_id_seq OWNED BY public.period_user_event.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    title character varying(255) NOT NULL,
    content_type_id integer
);


ALTER TABLE public.permission OWNER TO minellius_test;

--
-- Name: COLUMN permission.id; Type: COMMENT; Schema: public; Owner: minellius_test
--

COMMENT ON COLUMN public.permission.id IS 'undefined';


--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO minellius_test;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    is_superuser boolean DEFAULT false NOT NULL,
    is_staff boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    username character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    last_login timestamp without time zone DEFAULT now(),
    date_joined timestamp without time zone DEFAULT now() NOT NULL,
    date_of_birth timestamp without time zone
);


ALTER TABLE public."user" OWNER TO minellius_test;

--
-- Name: COLUMN "user".id; Type: COMMENT; Schema: public; Owner: minellius_test
--

COMMENT ON COLUMN public."user".id IS 'undefined';


--
-- Name: user_groups; Type: TABLE; Schema: public; Owner: minellius_test
--

CREATE TABLE public.user_groups (
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.user_groups OWNER TO minellius_test;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: minellius_test
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO minellius_test;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: minellius_test
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: content_type id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.content_type ALTER COLUMN id SET DEFAULT nextval('public.content_type_id_seq'::regclass);


--
-- Name: current id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current ALTER COLUMN id SET DEFAULT nextval('public.current_id_seq'::regclass);


--
-- Name: group id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."group" ALTER COLUMN id SET DEFAULT nextval('public.group_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: oauth_tokens_accesstoken id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.oauth_tokens_accesstoken ALTER COLUMN id SET DEFAULT nextval('public.oauth_tokens_accesstoken_id_seq'::regclass);


--
-- Name: period_org_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_org_event ALTER COLUMN id SET DEFAULT nextval('public.period_org_event_id_seq'::regclass);


--
-- Name: period_repo_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_repo_event ALTER COLUMN id SET DEFAULT nextval('public.period_repo_event_id_seq'::regclass);


--
-- Name: period_user_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_user_event ALTER COLUMN id SET DEFAULT nextval('public.period_user_event_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: content_type; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.content_type (id, name, title) FROM stdin;
1	permission	Permission
2	group	Group
3	content-type	Content type
4	user	User
\.


--
-- Data for Name: current; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.current (id, keyword, dict) FROM stdin;
2	create_time	{"2008-01": 54, "2008-02": 336, "2008-03": 762, "2008-04": 1329, "2008-05": 1526, "2008-06": 1678, "2008-07": 1790, "2008-08": 2121, "2008-09": 2448, "2008-10": 2823, "2008-11": 3202, "2008-12": 4168, "2009-01": 5257, "2009-02": 5662, "2009-03": 6302, "2009-04": 6429, "2009-05": 6889, "2009-06": 6360, "2009-07": 6749, "2009-08": 7028, "2009-09": 7630, "2009-10": 8520, "2009-11": 9232, "2009-12": 9387, "2010-01": 11179, "2010-02": 11824, "2010-03": 13879, "2010-04": 12967, "2010-05": 13410, "2010-06": 14140, "2010-07": 15034, "2010-08": 17108, "2010-09": 19166, "2010-10": 25415, "2010-11": 23940, "2010-12": 22561, "2011-01": 27920, "2011-02": 30263, "2011-03": 34312, "2011-04": 34635, "2011-05": 37270, "2011-06": 39268, "2011-07": 39330, "2011-08": 42319, "2011-09": 47160, "2011-10": 48240, "2011-11": 51969, "2011-12": 49089, "2012-01": 60371, "2012-02": 68543, "2012-03": 75879, "2012-04": 76401, "2012-05": 79788, "2012-06": 79880, "2012-07": 116257, "2012-08": 93039, "2012-09": 100090, "2012-10": 117599, "2012-11": 122376, "2012-12": 111131, "2013-01": 146068, "2013-02": 147613, "2013-03": 174698, "2013-04": 175629, "2013-05": 171362, "2013-06": 162046, "2013-07": 178252, "2013-08": 169301, "2013-09": 185941, "2013-10": 212495, "2013-11": 210664, "2013-12": 192431, "2014-01": 233652, "2014-02": 239900, "2014-03": 282513, "2014-04": 288115, "2014-05": 285446, "2014-06": 274768, "2014-07": 321446, "2014-08": 305420, "2014-09": 322930, "2014-10": 399792, "2014-11": 355985, "2014-12": 355297, "2015-01": 431897, "2015-02": 394930, "2015-03": 532764, "2015-04": 483342, "2015-05": 479241, "2015-06": 469498, "2015-07": 492399, "2015-08": 530423, "2015-09": 536844, "2015-10": 566989, "2015-11": 568212, "2015-12": 516623, "2016-01": 610723, "2016-02": 689015, "2016-03": 772622, "2016-04": 742562, "2016-05": 725756, "2016-06": 690003, "2016-07": 723879, "2016-08": 776113, "2016-09": 848968, "2016-10": 917170, "2016-11": 918393, "2016-12": 818284, "2017-01": 926120, "2017-02": 997549, "2017-03": 1157720, "2017-04": 1053861, "2017-05": 1090745, "2017-06": 1009067, "2017-07": 1061548, "2017-08": 1083313, "2017-09": 1166197, "2017-10": 1263276, "2017-11": 1277482, "2017-12": 1121571, "2018-01": 1333536, "2018-02": 1269832, "2018-03": 1509199, "2018-04": 1468056, "2018-05": 1475883, "2018-06": 1346713, "2018-07": 1400730, "2018-08": 1418533, "2018-09": 1560623, "2018-10": 1766097, "2018-11": 1690855, "2018-12": 1345401}
3	pushed_time	{"2008-01": 0, "2008-02": 9, "2008-03": 363, "2008-04": 529, "2008-05": 701, "2008-06": 842, "2008-07": 1003, "2008-08": 1198, "2008-09": 1544, "2008-10": 1763, "2008-11": 1874, "2008-12": 2559, "2009-01": 3236, "2009-02": 3558, "2009-03": 4235, "2009-04": 4226, "2009-05": 4747, "2009-06": 4352, "2009-07": 4578, "2009-08": 4958, "2009-09": 5193, "2009-10": 5934, "2009-11": 6473, "2009-12": 6814, "2010-01": 7833, "2010-02": 8045, "2010-03": 10221, "2010-04": 9434, "2010-05": 10006, "2010-06": 10484, "2010-07": 11152, "2010-08": 12579, "2010-09": 13867, "2010-10": 18564, "2010-11": 17958, "2010-12": 17196, "2011-01": 20439, "2011-02": 21918, "2011-03": 25489, "2011-04": 26040, "2011-05": 29025, "2011-06": 31011, "2011-07": 30405, "2011-08": 32528, "2011-09": 35475, "2011-10": 37623, "2011-11": 39715, "2011-12": 39766, "2012-01": 46692, "2012-02": 52233, "2012-03": 58986, "2012-04": 61961, "2012-05": 65784, "2012-06": 65690, "2012-07": 90843, "2012-08": 75829, "2012-09": 80058, "2012-10": 93708, "2012-11": 100540, "2012-12": 95497, "2013-01": 120691, "2013-02": 121523, "2013-03": 147858, "2013-04": 151683, "2013-05": 149267, "2013-06": 141927, "2013-07": 153559, "2013-08": 145357, "2013-09": 155445, "2013-10": 179220, "2013-11": 180958, "2013-12": 174414, "2014-01": 195942, "2014-02": 203606, "2014-03": 239383, "2014-04": 256415, "2014-05": 259596, "2014-06": 250738, "2014-07": 254493, "2014-08": 251393, "2014-09": 279236, "2014-10": 349781, "2014-11": 316229, "2014-12": 328299, "2015-01": 382847, "2015-02": 346357, "2015-03": 474086, "2015-04": 445643, "2015-05": 452400, "2015-06": 445560, "2015-07": 437099, "2015-08": 492278, "2015-09": 470013, "2015-10": 503653, "2015-11": 519520, "2015-12": 496199, "2016-01": 552667, "2016-02": 620633, "2016-03": 706598, "2016-04": 696289, "2016-05": 709889, "2016-06": 674585, "2016-07": 682163, "2016-08": 724835, "2016-09": 803003, "2016-10": 846562, "2016-11": 868790, "2016-12": 816968, "2017-01": 869691, "2017-02": 936257, "2017-03": 1106590, "2017-04": 1035579, "2017-05": 1101111, "2017-06": 1019508, "2017-07": 1049289, "2017-08": 1065306, "2017-09": 1120851, "2017-10": 1229443, "2017-11": 1269204, "2017-12": 1178625, "2018-01": 1338152, "2018-02": 1274791, "2018-03": 1575866, "2018-04": 1513775, "2018-05": 1582678, "2018-06": 1476728, "2018-07": 1512488, "2018-08": 1550447, "2018-09": 1695364, "2018-10": 2068579, "2018-11": 2117748, "2018-12": 2349059}
4	repo_lang_dic	{"ActionScript": 24242, "C": 1016241, "C#": 1511257, "C++": 1456494, "Clojure": 60960, "CoffeeScript": 66184, "CSS": 1748594, "Go": 392829, "Haskell": 83676, "HTML": 4037577, "Java": 5705214, "JavaScript": 6742570, "Lua": 113188, "MATLAB": 151197, "Objective-C": 492341, "Perl": 146531, "PHP": 1924776, "Python": 3325425, "R": 334524, "Ruby": 1590100, "Scala": 145346, "Shell": 802297, "Swift": 502229, "TeX": 137825, "Vim script": 2875}
5	license_dic	{"afl-3.0": 506, "agpl-3.0": 68524, "apache-2.0": 1011322, "artistic-2.0": 9774, "bsd-2-clause": 62326, "bsd-3-clause": 132972, "bsd-3-clause-clear": 318, "bsl-1.0": 2803, "cc-by-4.0": 6682, "cc-by-sa-4.0": 5682, "cc0-1.0": 36884, "ecl-2.0": 376, "epl-1.0": 37838, "epl-2.0": 5144, "eupl-1.1": 655, "eupl-1.2": 104, "gpl-2.0": 374598, "gpl-3.0": 883452, "isc": 27644, "lgpl-2.1": 24997, "lgpl-3.0": 67326, "lppl-1.3c": 356, "mit": 3587592, "mpl-2.0": 35284, "ms-pl": 1451, "ms-rl": 135, "ncsa": 8, "ofl-1.1": 2719, "osl-3.0": 2342, "postgresql": 56, "unlicense": 102612, "upl-1.0": 12, "wtfpl": 13392, "zlib": 3063}
6	user_lang_dic	{"ActionScript": 9690, "C": 423513, "C#": 544125, "C++": 575435, "Clojure": 10017, "CoffeeScript": 17735, "CSS": 527863, "Go": 97223, "Haskell": 10770, "HTML": 1305565, "Java": 1954950, "JavaScript": 1927904, "Lua": 46713, "MATLAB": 47712, "Objective-C": 173003, "Perl": 29067, "PHP": 694078, "Python": 1159985, "R": 174518, "Ruby": 403004, "Scala": 34943, "Shell": 204275, "Swift": 105198, "TeX": 37169, "Vim script": 9}
7	forks_dic	{"0": 20018471, "1..2": 2868007, "2..5": 1203590, "5..10": 393387, "10..100": 389095, ">100": 47161}
8	star_dic	{"<10": 23518551, "10..100": 640325, "100..1000": 118974, "1000..10000": 16702, "10000..100000": 978, ">100000": 6}
9	size_dic	{"<10": 16880407, "10..100": 7613887, "100..1000": 10980112, "1000..10000": 6311860, "10000..100000": 3331655, ">100000": 555636}
10	comments_dic	{"0": 45314444, "1..5": 42413961, "5..10": 8424844, "10..100": 4216895, "100.1000": 0, ">1000": 105}
11	repos_dic	{"0": 20414913, "1..10": 14030865, "10..100": 1906585, "100..1000": 54954, "1000.10000": 0, ">10000": 26}
12	followers_dic	{"0": 32317222, "1..10": 3576155, "10..100": 398613, "100.1000": 0, "1000..10000": 1481, ">10000": 62}
1	country_dic	{"United States of America": 128771, "China": 121810, "India": 108327, "United Kingdom": 7804, "Germany": 85619, "Canada": 52643, "Brazil": 47245, "Japan": 39900, "Russia": 44653, "France": 54152, "Afghanistan": 434, "Angola": 313, "Albania": 573, "United Arab Emirates": 10, "Argentina": 16544, "Armenia": 1324, "French Southern and Antarctic Lands": 0, "Australia": 42292, "Austria": 8969, "Azerbaijan": 789, "Burundi": 26, "Belgium": 13072, "Benin": 209, "Burkina Faso": 3, "Bangladesh": 15049, "Bulgaria": 7673, "The Bahamas": 1, "Bosnia and Herzegovina": 15, "Belarus": 8513, "Belize": 120, "Bermuda": 112, "Bolivia": 1349, "Brunei": 88, "Bhutan": 85, "Botswana": 186, "Central African Republic": 0, "Switzerland": 16023, "Chile": 9093, "Ivory Coast": 0, "Cameroon": 603, "Democratic Republic of the Congo": 0, "Republic of the Congo": 1, "Colombia": 11677, "Costa Rica": 213, "Cuba": 732, "Northern Cyprus": 0, "Cyprus": 972, "Czech Republic": 89, "Djibouti": 13, "Denmark": 13097, "Dominican Republic": 29, "Algeria": 1653, "Ecuador": 2451, "Egypt": 8990, "Eritrea": 9, "Spain": 23807, "Estonia": 2909, "Ethiopia": 773, "Finland": 12143, "Fiji": 91, "Falkland Islands": 0, "Gabon": 47, "Georgia": 4457, "Ghana": 1842, "Guinea": 106, "Gambia": 75, "Guinea Bissau": 0, "Equatorial Guinea": 0, "Greece": 8374, "Greenland": 48, "Guatemala": 1833, "French Guiana": 0, "Guyana": 77, "Honduras": 698, "Croatia": 3594, "Haiti": 205, "Hungary": 6338, "Indonesia": 24596, "Ireland": 12131, "Iran": 9857, "Iraq": 809, "Iceland": 1455, "Israel": 8821, "Italy": 21516, "Jamaica": 734, "Jordan": 1514, "Kazakhstan": 1608, "Kenya": 5179, "Kyrgyzstan": 363, "Cambodia": 944, "South Korea": 264, "Kosovo": 330, "Kuwait": 608, "Laos": 91, "Lebanon": 1063, "Liberia": 110, "Libya": 240, "Sri Lanka": 230, "Lesotho": 51, "Lithuania": 3187, "Luxembourg": 1381, "Latvia": 2272, "Morocco": 2459, "Moldova": 1088, "Madagascar": 340, "Mexico": 12834, "Macedonia": 1073, "Mali": 56, "Myanmar": 1076, "Montenegro": 290, "Mongolia": 587, "Mozambique": 247, "Mauritania": 34, "Malawi": 179, "Malaysia": 6801, "Namibia": 218, "New Caledonia": 4, "Niger": 55, "Nigeria": 9411, "Nicaragua": 678, "Netherlands": 30028, "Norway": 12219, "Nepal": 3986, "New Zealand": 302, "Oman": 239, "Pakistan": 12495, "Panama": 828, "Peru": 2574, "Philippines": 11871, "Papua New Guinea": 5, "Poland": 26802, "Puerto Rico": 105, "North Korea": 4, "Portugal": 11134, "Paraguay": 828, "Qatar": 527, "Romania": 8715, "Rwanda": 427, "Western Sahara": 0, "Saudi Arabia": 33, "Sudan": 374, "South Sudan": 4, "Senegal": 266, "Solomon Islands": 3, "Sierra Leone": 7, "El Salvador": 36, "Somaliland": 27, "Somalia": 125, "Republic of Serbia": 0, "Suriname": 64, "Slovakia": 2930, "Slovenia": 2128, "Sweden": 25783, "Swaziland": 57, "Syria": 491, "Chad": 10, "Togo": 115, "Thailand": 7773, "Tajikistan": 80, "Turkmenistan": 43, "East Timor": 0, "Trinidad and Tobago": 7, "Tunisia": 2152, "Turkey": 14406, "United Republic of Tanzania": 0, "Uganda": 1345, "Ukraine": 32616, "Uruguay": 2600, "Uzbekistan": 693, "Venezuela": 6105, "Vietnam": 8391, "Vanuatu": 28, "West Bank": 4, "Yemen": 241, "South Africa": 380, "Zambia": 336, "Zimbabwe": 692}
\.


--
-- Data for Name: group; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public."group" (id, name, title) FROM stdin;
1	user	User
2	admin	Admin
\.


--
-- Data for Name: group_permissions; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.group_permissions (group_id, permission_id) FROM stdin;
1	17
2	1
2	2
2	3
2	4
2	5
2	6
2	7
2	8
2	9
2	10
2	11
2	12
2	13
2	14
2	15
2	16
2	17
1	18
1	19
1	20
2	18
2	19
2	20
2	21
2	22
2	23
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1524197725191	Init1524197725191
2	1524199022084	FillData1524199022084
3	1524199144534	FillFrontendData1524199144534
4	1533634559617	AddOauthTokensAccesstokenTable1533634559617
\.


--
-- Data for Name: oauth_tokens_accesstoken; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.oauth_tokens_accesstoken (id, provider, provider_client_id, granted_at, access_token, expires_at, token_type, scope, user_id, refresh_token) FROM stdin;
21	github	23011677	2018-12-25 08:43:08.875765	bf3c9f37ed30fabe3a9a0f84e966fe92c7edf830	\N	\N	\N	12	\N
\.


--
-- Data for Name: period_org_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.period_org_event (id, period, event_type, orgname, num) FROM stdin;
\.


--
-- Data for Name: period_repo_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.period_repo_event (id, period, event_type, reponame, num) FROM stdin;
\.


--
-- Data for Name: period_user_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.period_user_event (id, period, event_type, username, num) FROM stdin;
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.permission (id, name, title, content_type_id) FROM stdin;
1	add_permission	Can add permission	1
2	change_permission	Can change permission	1
3	delete_permission	Can delete permission	1
4	add_group	Can add group	2
5	change_group	Can change group	2
6	delete_group	Can delete group	2
7	add_content-type	Can add content type	3
8	change_content-type	Can change content type	3
9	delete_content-type	Can delete content type	3
10	add_user	Can add user	4
11	change_user	Can change user	4
12	delete_user	Can delete user	4
13	read_user	Can read user	4
14	read_group	Can read group	2
15	read_permission	Can read permission	1
16	read_content-type	Can read content type	3
17	change_profile	Can change profile	4
18	read_themes-page	Can read themes page	4
19	read_account-page	Can read account page	4
20	read_profile-frame	Can read profile frame	4
21	read_admin-page	Can read admin page	4
22	read_groups-frame	Can read groups frame	4
23	read_users-frame	Can read users frame	4
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public."user" (id, password, is_superuser, is_staff, is_active, username, email, last_login, date_joined, date_of_birth) FROM stdin;
12	pbkdf2_sha256$120000$i8f5ZWOpBlM=$RsDdI4WUEtrsQn1K7p9LgUtOMXj/0bvp27/gCQDgLac=	f	f	t	lonelyhentai	lonely_hentai@hotmail.com	2018-12-24 13:38:16.032725	2018-12-20 09:48:06.956556	\N
\.


--
-- Data for Name: user_groups; Type: TABLE DATA; Schema: public; Owner: minellius_test
--

COPY public.user_groups (user_id, group_id) FROM stdin;
12	1
\.


--
-- Name: content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.content_type_id_seq', 4, true);


--
-- Name: current_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.current_id_seq', 1, false);


--
-- Name: group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.group_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);


--
-- Name: oauth_tokens_accesstoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.oauth_tokens_accesstoken_id_seq', 21, true);


--
-- Name: period_org_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.period_org_event_id_seq', 1, false);


--
-- Name: period_repo_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.period_repo_event_id_seq', 1, false);


--
-- Name: period_user_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.period_user_event_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.permission_id_seq', 23, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: minellius_test
--

SELECT pg_catalog.setval('public.user_id_seq', 14, true);


--
-- Name: oauth_tokens_accesstoken PK_13e30b10a566b216140830be6d5; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.oauth_tokens_accesstoken
    ADD CONSTRAINT "PK_13e30b10a566b216140830be6d5" PRIMARY KEY (id);


--
-- Name: group PK_256aa0fda9b1de1a73ee0b7106b; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY (id);


--
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- Name: content_type PK_897d132e80d29e6a50e458f9b06; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.content_type
    ADD CONSTRAINT "PK_897d132e80d29e6a50e458f9b06" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: group_permissions PK_b0f1de027a85442d3c1e8bd0ff5; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT "PK_b0f1de027a85442d3c1e8bd0ff5" PRIMARY KEY (group_id, permission_id);


--
-- Name: user_groups PK_c95039f66f5d7a452fc53945bfe; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "PK_c95039f66f5d7a452fc53945bfe" PRIMARY KEY (user_id, group_id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: group UQ_326ae60c2267f5780f1ecc09fac; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "UQ_326ae60c2267f5780f1ecc09fac" UNIQUE (title);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: group UQ_8a45300fd825918f3b40195fbdc; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."group"
    ADD CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE (name);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: current current_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current
    ADD CONSTRAINT current_pk PRIMARY KEY (id);


--
-- Name: period_org_event period_org_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_org_event
    ADD CONSTRAINT period_org_event_pkey PRIMARY KEY (id);


--
-- Name: period_repo_event period_repo_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_repo_event
    ADD CONSTRAINT period_repo_event_pkey PRIMARY KEY (id);


--
-- Name: period_user_event period_user_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.period_user_event
    ADD CONSTRAINT period_user_event_pkey PRIMARY KEY (id);


--
-- Name: current_keyword_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX current_keyword_uindex ON public.current USING btree (keyword);


--
-- Name: period_org_event_event_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_org_event_event_type_index ON public.period_org_event USING btree (event_type);


--
-- Name: period_org_event_num_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_org_event_num_index ON public.period_org_event USING btree (num DESC);


--
-- Name: period_org_event_orgname_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_org_event_orgname_index ON public.period_org_event USING btree (orgname);


--
-- Name: period_org_event_period_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_org_event_period_index ON public.period_org_event USING btree (period);


--
-- Name: period_repo_event_event_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_repo_event_event_type_index ON public.period_repo_event USING btree (event_type);


--
-- Name: period_repo_event_num_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_repo_event_num_index ON public.period_repo_event USING btree (num DESC);


--
-- Name: period_repo_event_period_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_repo_event_period_index ON public.period_repo_event USING btree (period);


--
-- Name: period_repo_event_reponame_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_repo_event_reponame_index ON public.period_repo_event USING btree (reponame);


--
-- Name: period_user_event_event_type_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_user_event_event_type_index ON public.period_user_event USING btree (event_type);


--
-- Name: period_user_event_num_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_user_event_num_index ON public.period_user_event USING btree (num DESC);


--
-- Name: period_user_event_period_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_user_event_period_index ON public.period_user_event USING btree (period);


--
-- Name: period_user_event_username_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX period_user_event_username_index ON public.period_user_event USING btree (username);


--
-- Name: group_permissions FK_3924be6485a5b5d0d2fe1a94c08; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT "FK_3924be6485a5b5d0d2fe1a94c08" FOREIGN KEY (group_id) REFERENCES public."group"(id) ON DELETE CASCADE;


--
-- Name: user_groups FK_4c5f2c23c34f3921fbad2cd3940; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY (group_id) REFERENCES public."group"(id) ON DELETE CASCADE;


--
-- Name: oauth_tokens_accesstoken FK_61da71977c0f172fe607e4e54c7; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.oauth_tokens_accesstoken
    ADD CONSTRAINT "FK_61da71977c0f172fe607e4e54c7" FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: group_permissions FK_7514fdc446a1fdcf5b2d39cda60; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.group_permissions
    ADD CONSTRAINT "FK_7514fdc446a1fdcf5b2d39cda60" FOREIGN KEY (permission_id) REFERENCES public.permission(id) ON DELETE CASCADE;


--
-- Name: user_groups FK_95bf94c61795df25a5154350102; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: permission FK_cc841779d8a08db653e6480a07a; Type: FK CONSTRAINT; Schema: public; Owner: minellius_test
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "FK_cc841779d8a08db653e6480a07a" FOREIGN KEY (content_type_id) REFERENCES public.content_type(id);


--
-- PostgreSQL database dump complete
--

