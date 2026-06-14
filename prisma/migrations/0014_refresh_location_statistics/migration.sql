CREATE TEMP TABLE "_location_statistics_refresh" (
  "kind" text NOT NULL,
  "slug" text NOT NULL,
  "population" integer NOT NULL,
  "averageSalaryEur" integer NOT NULL,
  "totalMonthlyCostEur" integer NOT NULL,
  "rentUtilitiesEur" integer NOT NULL,
  "foodEur" integer NOT NULL,
  "transportEur" integer NOT NULL,
  PRIMARY KEY ("kind", "slug")
);

INSERT INTO "_location_statistics_refresh" (
  "kind",
  "slug",
  "population",
  "averageSalaryEur",
  "totalMonthlyCostEur",
  "rentUtilitiesEur",
  "foodEur",
  "transportEur"
) VALUES
  ('CITY', 'berlin', 3775697, 3102, 1036, 1106, 477, 272),
  ('CITY', 'amsterdam', 1193995, 4261, 1188, 1821, 571, 224),
  ('CITY', 'madrid', 3543630, 2200, 823, 1054, 448, 170),
  ('CITY', 'paris', 2059821, 3211, 1058, 1237, 538, 236),
  ('CITY', 'milano', 3174960, 1944, 1031, 1151, 566, 167),
  ('CITY', 'lisabona', 2991000, 1374, 754, 1090, 377, 90),
  ('CITY', 'munchen', 1606000, 3907, 1096, 1281, 519, 214),
  ('CITY', 'frankfurt', 791000, 3802, 1062, 1080, 522, 165),
  ('CITY', 'rotterdam', 1023590, 3703, 1061, 1389, 567, 188),
  ('CITY', 'haga', 886444, 3990, 1060, 1434, 562, 197),
  ('CITY', 'barcelona', 1704000, 2040, 829, 1110, 445, 139),
  ('CITY', 'valencia', 845000, 1725, 713, 894, 435, 102),
  ('CITY', 'lyon', 518778, 2802, 1045, 736, 524, 137),
  ('CITY', 'marseille', 895713, 2175, 1009, 679, 568, 171),
  ('CITY', 'roma', 4361370, 1817, 847, 1023, 469, 161),
  ('CITY', 'torino', 886837, 1789, 891, 691, 490, 114),
  ('CITY', 'porto', 264493, 1407, 707, 834, 344, 64),
  ('CITY', 'coimbra', 140796, 1212, 646, 670, 347, 47),
  ('CITY', 'tirana', 608364, 749, 668, 518, 375, 97),
  ('CITY', 'durres', 129455, 725, 454, 358, 337, 46),
  ('CITY', 'vlore', 78397, 730, 570, 340, 306, 54),
  ('CITY', 'andorra-la-vella', 26658, 2214, 594, 1029, 426, 62),
  ('CITY', 'escaldes-engordany', 17354, 2443, 900, 1015, 426, 62),
  ('CITY', 'encamp', 13920, 3700, 850, 1025, 426, 62),
  ('CITY', 'yerevan', 1115800, 508, 476, 516, 314, 49),
  ('CITY', 'gyumri', 112600, 405, 330, 315, 250, 20),
  ('CITY', 'vanadzor', 76000, 286, 380, 249, 283, 15),
  ('CITY', 'viena', 1925213, 2905, 1073, 973, 586, 184),
  ('CITY', 'graz', 308807, 2720, 1068, 692, 540, 97),
  ('CITY', 'linz', 215267, 2513, 1032, 828, 556, 76),
  ('CITY', 'baku', 2389227, 458, 489, 309, 258, 58),
  ('CITY', 'ganja', 330735, 373, 253, 169, 177, 28),
  ('CITY', 'sumqayit', 447431, 310, 405, 283, 247, 30),
  ('CITY', 'minsk', 1991934, 834, 520, 353, 255, 47),
  ('CITY', 'gomel', 499283, 465, 436, 186, 203, 25),
  ('CITY', 'brest-belarus', 347417, 495, 314, 195, 228, 25),
  ('CITY', 'bruxelles', 1264392, 2922, 1004, 1006, 568, 80),
  ('CITY', 'antwerp', 568485, 2556, 1009, 801, 551, 130),
  ('CITY', 'ghent', 274536, 3146, 994, 822, 533, 115),
  ('CITY', 'sarajevo', 270585, 896, 670, 389, 307, 45),
  ('CITY', 'banja-luka', 186482, 773, 654, 391, 323, 44),
  ('CITY', 'mostar', 103099, 761, 372, 336, 268, 29),
  ('CITY', 'sofia', 1205833, 1457, 712, 589, 376, 77),
  ('CITY', 'plovdiv', 327603, 972, 604, 345, 301, 39),
  ('CITY', 'varna', 316749, 1038, 694, 451, 369, 44),
  ('CITY', 'zagreb', 755938, 1651, 806, 678, 401, 100),
  ('CITY', 'split', 152472, 1450, 823, 823, 452, 57),
  ('CITY', 'rijeka', 98914, 1337, 766, 602, 419, 52),
  ('CITY', 'nicosia', 57226, 1622, 854, 681, 423, 58),
  ('CITY', 'limassol', 111633, 2374, 932, 1256, 507, 60),
  ('CITY', 'larnaca', 52337, 1650, 771, 767, 408, 64),
  ('CITY', 'praga', 1438705, 2016, 834, 1020, 394, 110),
  ('CITY', 'brno', 410497, 1682, 776, 864, 366, 73),
  ('CITY', 'ostrava', 284319, 1505, 729, 569, 363, 57),
  ('CITY', 'copenhaga', 671714, 2879, 800, 1309, 629, 180),
  ('CITY', 'aarhus', 378361, 2709, 763, 995, 599, 97),
  ('CITY', 'odense', 213168, 2526, 714, 706, 602, 74),
  ('CITY', 'tallinn', 461452, 1880, 974, 736, 485, 76),
  ('CITY', 'tartu', 98573, 1702, 851, 533, 384, 35),
  ('CITY', 'parnu', 42127, 1467, 525, 524, 370, 28),
  ('CITY', 'helsinki', 696374, 2708, 980, 856, 543, 148),
  ('CITY', 'tampere', 269746, 2817, 944, 593, 426, 98),
  ('CITY', 'turku', 211512, 2388, 933, 642, 508, 84),
  ('CITY', 'tbilisi', 1326701, 555, 559, 441, 302, 51),
  ('CITY', 'batumi', 250952, 490, 480, 340, 265, 18),
  ('CITY', 'kutaisi', 163913, 396, 423, 266, 258, 20),
  ('CITY', 'atena', 3134884, 1158, 828, 623, 440, 82),
  ('CITY', 'salonic', 800279, 1019, 802, 511, 417, 62),
  ('CITY', 'patras', 197778, 1058, 712, 450, 365, 57),
  ('CITY', 'budapesta', 1685165, 1527, 775, 648, 381, 109),
  ('CITY', 'debrecen', 202893, 1127, 690, 496, 331, 49),
  ('CITY', 'szeged', 156780, 1174, 694, 403, 323, 47),
  ('CITY', 'reykjavik', 249228, 3928, 1092, 1778, 791, 89),
  ('CITY', 'kopavogur', 40124, 4582, 1058, 1723, 779, 78),
  ('CITY', 'akureyri', 20483, 3976, 1036, 1533, 781, 80),
  ('CITY', 'dublin', 1327053, 3439, 1067, 1716, 573, 141),
  ('CITY', 'cork', 232271, 3725, 1031, 1421, 537, 90),
  ('CITY', 'galway', 90140, 2791, 1004, 1820, 557, 62),
  ('CITY', 'pristina', 227466, 589, 454, 297, 219, 29),
  ('CITY', 'prizren', 147500, 482, 450, 320, 150, 31),
  ('CITY', 'peja', 83000, 425, 450, 286, 167, 25),
  ('CITY', 'riga', 590260, 1370, 856, 508, 388, 71),
  ('CITY', 'daugavpils', 77513, 995, 458, 365, 332, 31),
  ('CITY', 'liepaja', 67286, 981, 521, 394, 385, 33),
  ('CITY', 'vaduz', 6100, 8266, 1142, 1140, 825, 88),
  ('CITY', 'schaan', 6362, 7791, 1089, 1108, 768, 88),
  ('CITY', 'balzers', 4850, 7845, 1131, 1350, 650, 81),
  ('CITY', 'vilnius', 607842, 1710, 769, 691, 379, 79),
  ('CITY', 'kaunas', 302874, 1483, 771, 531, 407, 51),
  ('CITY', 'klaipeda', 160082, 1371, 668, 466, 344, 39),
  ('CITY', 'luxemburg-oras', 139241, 4580, 1099, 1697, 602, 77),
  ('CITY', 'esch-sur-alzette', 38358, 3346, 809, 1469, 578, 84),
  ('CITY', 'differdange', 31566, 2800, 819, 1281, 585, 82),
  ('CITY', 'valletta', 5100, 1899, 872, 923, 470, 54),
  ('CITY', 'birkirkara', 31607, 1680, 827, 922, 446, 48),
  ('CITY', 'sliema', 23978, 1673, 847, 1143, 527, 67),
  ('CITY', 'chisinau', 582979, 747, 590, 466, 259, 32),
  ('CITY', 'balti', 89969, 374, 332, 364, 247, 18),
  ('CITY', 'cahul', 21306, 447, 334, 413, 247, 16),
  ('CITY', 'monaco-oras', 38087, 7955, 895, 5896, 663, 55),
  ('CITY', 'podgorica', 177878, 1013, 610, 470, 331, 32),
  ('CITY', 'niksic', 27753, 717, 520, 456, 321, 28),
  ('CITY', 'budva', 22364, 898, 722, 548, 361, 39),
  ('CITY', 'skopje', 593932, 770, 563, 364, 275, 45),
  ('CITY', 'bitola', 67965, 677, 484, 261, 236, 21),
  ('CITY', 'tetovo', 66192, 782, 325, 339, 225, 18),
  ('CITY', 'oslo', 1127502, 3843, 1348, 1416, 707, 170),
  ('CITY', 'bergen', 276293, 3971, 1310, 1097, 692, 122),
  ('CITY', 'trondheim', 203018, 3784, 1281, 1202, 689, 97),
  ('CITY', 'varsovia', 1863578, 1875, 801, 1075, 392, 138),
  ('CITY', 'cracovia', 814595, 1668, 768, 872, 367, 90),
  ('CITY', 'wroclaw', 674966, 1610, 779, 875, 363, 74),
  ('CITY', 'bucuresti', 2117843, 1239, 669, 462, 336, 73),
  ('CITY', 'cluj-napoca', 325029, 1173, 662, 582, 352, 44),
  ('CITY', 'timisoara', 291424, 1098, 585, 416, 330, 43),
  ('CITY', 'moscova', 13399945, 1750, 782, 829, 330, 106),
  ('CITY', 'sankt-petersburg', 5708625, 1139, 666, 481, 246, 122),
  ('CITY', 'kazan', 1341141, 842, 609, 426, 264, 44),
  ('CITY', 'san-marino-oras', 33605, 3248, 609, 564, 435, 54),
  ('CITY', 'belgrad', 1681182, 1090, 694, 640, 357, 87),
  ('CITY', 'novi-sad', 375560, 923, 681, 529, 342, 41),
  ('CITY', 'nis', 246756, 771, 528, 363, 269, 31),
  ('CITY', 'bratislava', 485917, 1503, 826, 764, 386, 88),
  ('CITY', 'kosice', 222286, 1296, 798, 817, 379, 48),
  ('CITY', 'zilina', 80000, 1231, 486, 569, 361, 32),
  ('CITY', 'ljubljana', 291825, 1674, 850, 868, 417, 59),
  ('CITY', 'maribor', 97712, 1660, 811, 572, 405, 42),
  ('CITY', 'celje', 38117, 1350, 546, 643, 395, 34),
  ('CITY', 'stockholm', 1004498, 3415, 1183, 1224, 579, 219),
  ('CITY', 'gothenburg', 622174, 3383, 936, 790, 523, 159),
  ('CITY', 'malmo', 374920, 2862, 958, 849, 543, 119),
  ('CITY', 'zurich', 444078, 7537, 1667, 2029, 807, 187),
  ('CITY', 'geneva', 211713, 6691, 1559, 1971, 868, 128),
  ('CITY', 'basel', 179455, 7018, 1575, 1426, 842, 133),
  ('CITY', 'istanbul', 15791519, 985, 660, 595, 303, 131),
  ('CITY', 'ankara', 5956929, 917, 579, 427, 270, 71),
  ('CITY', 'izmir', 4546894, 961, 610, 446, 264, 114),
  ('CITY', 'kiev', 2995010, 652, 459, 392, 236, 61),
  ('CITY', 'lviv', 711462, 527, 443, 348, 208, 42),
  ('CITY', 'odesa', 1007310, 402, 431, 229, 215, 41),
  ('CITY', 'londra', 9188200, 4102, 1271, 2173, 545, 356),
  ('CITY', 'manchester', 605521, 2727, 952, 1249, 504, 156),
  ('CITY', 'birmingham', 1199447, 3418, 997, 1098, 486, 187),
  ('CITY', 'vatican-city', 506, 1308, 534, 503, 383, 48),
  ('COUNTRY', 'germania', 83644258, 2963, 998, 802, 487, 114),
  ('COUNTRY', 'tarile-de-jos', 18448775, 3390, 1021, 1280, 548, 127),
  ('COUNTRY', 'spania', 47850793, 1762, 717, 808, 408, 83),
  ('COUNTRY', 'franta', 66746401, 2455, 931, 791, 515, 98),
  ('COUNTRY', 'italia', 58926166, 1685, 887, 728, 478, 90),
  ('COUNTRY', 'portugalia', 10395362, 1153, 675, 769, 346, 50),
  ('COUNTRY', 'albania', 2751025, 635, 611, 404, 337, 72),
  ('COUNTRY', 'andorra', 83753, 2587, 766, 1030, 426, 62),
  ('COUNTRY', 'armenia', 2930915, 636, 595, 472, 308, 41),
  ('COUNTRY', 'austria', 9107266, 2604, 1062, 905, 563, 135),
  ('COUNTRY', 'azerbaidjan', 10454855, 372, 455, 282, 246, 48),
  ('COUNTRY', 'belarus', 8937018, 669, 491, 245, 226, 32),
  ('COUNTRY', 'belgia', 11774642, 2625, 960, 818, 532, 77),
  ('COUNTRY', 'bosnia-si-hertegovina', 3114242, 736, 578, 316, 280, 37),
  ('COUNTRY', 'bulgaria', 6667659, 999, 610, 419, 329, 48),
  ('COUNTRY', 'croatia', 3822345, 1342, 764, 642, 401, 74),
  ('COUNTRY', 'cipru', 1382334, 1700, 854, 873, 440, 58),
  ('COUNTRY', 'cehia', 10527781, 1553, 834, 756, 362, 63),
  ('COUNTRY', 'danemarca', 6023520, 3661, 1154, 1001, 604, 107),
  ('COUNTRY', 'estonia', 1331062, 1620, 839, 629, 453, 59),
  ('COUNTRY', 'finlanda', 5621739, 2557, 927, 688, 519, 89),
  ('COUNTRY', 'georgia', 3804642, 503, 478, 384, 286, 39),
  ('COUNTRY', 'grecia', 9897115, 1051, 727, 527, 405, 61),
  ('COUNTRY', 'ungaria', 9585818, 1260, 699, 510, 348, 69),
  ('COUNTRY', 'islanda', 402329, 3620, 1289, 1692, 784, 84),
  ('COUNTRY', 'irlanda', 5356950, 3273, 1003, 1557, 552, 105),
  ('COUNTRY', 'kosovo', 1798188, 566, 439, 297, 220, 29),
  ('COUNTRY', 'letonia', 1835935, 1265, 768, 471, 371, 56),
  ('COUNTRY', 'liechtenstein', 40368, 7041, 1115, 1125, 796, 88),
  ('COUNTRY', 'lituania', 2797338, 1527, 714, 549, 368, 57),
  ('COUNTRY', 'luxemburg', 687448, 4580, 1099, 1558, 595, 79),
  ('COUNTRY', 'malta', 549011, 1655, 808, 884, 456, 53),
  ('COUNTRY', 'moldova', 2961253, 689, 546, 399, 249, 25),
  ('COUNTRY', 'monaco', 38087, 6854, 1618, 5079, 689, 56),
  ('COUNTRY', 'muntenegru', 626233, 936, 586, 482, 342, 34),
  ('COUNTRY', 'macedonia-de-nord', 1804063, 707, 513, 309, 252, 34),
  ('COUNTRY', 'norvegia', 5652989, 3799, 1300, 1117, 661, 104),
  ('COUNTRY', 'polonia', 37843188, 1701, 763, 699, 335, 61),
  ('COUNTRY', 'romania', 18800605, 1139, 627, 399, 312, 41),
  ('COUNTRY', 'rusia', 143394458, 1203, 685, 437, 270, 56),
  ('COUNTRY', 'san-marino', 33605, 3274, 609, 565, 436, 54),
  ('COUNTRY', 'serbia', 6641964, 941, 616, 512, 320, 59),
  ('COUNTRY', 'slovacia', 5451342, 1371, 756, 668, 359, 52),
  ('COUNTRY', 'slovenia', 2114573, 1613, 792, 737, 405, 49),
  ('COUNTRY', 'suedia', 10701047, 3227, 1012, 810, 522, 114),
  ('COUNTRY', 'elvetia', 9007798, 6504, 1495, 1592, 820, 170),
  ('COUNTRY', 'turcia', 87926082, 952, 620, 374, 245, 72),
  ('COUNTRY', 'ucraina', 39535849, 574, 444, 253, 195, 37),
  ('COUNTRY', 'regatul-unit', 69931528, 3317, 1043, 1310, 495, 155),
  ('COUNTRY', 'vatican', 506, 1308, 534, 504, 384, 48);

DO $$
DECLARE
  expected_countries integer;
  matched_countries integer;
  expected_cities integer;
  matched_cities integer;
BEGIN
  SELECT count(*) INTO expected_countries
  FROM "_location_statistics_refresh"
  WHERE "kind" = 'COUNTRY';

  SELECT count(*) INTO matched_countries
  FROM "_location_statistics_refresh" refresh
  JOIN "countries" country ON country."slug" = refresh."slug"
  WHERE refresh."kind" = 'COUNTRY';

  SELECT count(*) INTO expected_cities
  FROM "_location_statistics_refresh"
  WHERE "kind" = 'CITY';

  SELECT count(*) INTO matched_cities
  FROM "_location_statistics_refresh" refresh
  JOIN "cities" city ON city."slug" = refresh."slug"
  WHERE refresh."kind" = 'CITY';

  IF expected_countries <> matched_countries THEN
    RAISE EXCEPTION 'Country slug mismatch: expected %, matched %', expected_countries, matched_countries;
  END IF;

  IF expected_cities <> matched_cities THEN
    RAISE EXCEPTION 'City slug mismatch: expected %, matched %', expected_cities, matched_cities;
  END IF;
END $$;

UPDATE "countries" country
SET
  "population" = refresh."population",
  "updatedAt" = CURRENT_TIMESTAMP
FROM "_location_statistics_refresh" refresh
WHERE refresh."kind" = 'COUNTRY'
  AND country."slug" = refresh."slug";

UPDATE "cities" city
SET
  "population" = refresh."population",
  "updatedAt" = CURRENT_TIMESTAMP
FROM "_location_statistics_refresh" refresh
WHERE refresh."kind" = 'CITY'
  AND city."slug" = refresh."slug";

UPDATE "cost_of_living" cost
SET
  "averageSalaryEur" = refresh."averageSalaryEur",
  "totalMonthlyCostEur" = refresh."totalMonthlyCostEur",
  "rentUtilitiesEur" = refresh."rentUtilitiesEur",
  "foodEur" = refresh."foodEur",
  "transportEur" = refresh."transportEur",
  "updatedAt" = CURRENT_TIMESTAMP
FROM "countries" country
JOIN "_location_statistics_refresh" refresh
  ON refresh."kind" = 'COUNTRY'
  AND refresh."slug" = country."slug"
WHERE cost."countryId" = country."id";

UPDATE "cost_of_living" cost
SET
  "averageSalaryEur" = refresh."averageSalaryEur",
  "totalMonthlyCostEur" = refresh."totalMonthlyCostEur",
  "rentUtilitiesEur" = refresh."rentUtilitiesEur",
  "foodEur" = refresh."foodEur",
  "transportEur" = refresh."transportEur",
  "updatedAt" = CURRENT_TIMESTAMP
FROM "cities" city
JOIN "_location_statistics_refresh" refresh
  ON refresh."kind" = 'CITY'
  AND refresh."slug" = city."slug"
WHERE cost."cityId" = city."id";

DROP TABLE "_location_statistics_refresh";
