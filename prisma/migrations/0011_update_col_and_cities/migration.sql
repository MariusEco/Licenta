ALTER TABLE IF EXISTS "cities"
  DROP COLUMN IF EXISTS "localLawNotes",
  DROP COLUMN IF EXISTS "predominantReligion",
  DROP COLUMN IF EXISTS "emigrationDifficulty",
  DROP COLUMN IF EXISTS "isFeatured";

ALTER TABLE IF EXISTS "cost_of_living"
  DROP COLUMN IF EXISTS "sourceName",
  DROP COLUMN IF EXISTS "sourceUrl",
  DROP COLUMN IF EXISTS "collectedAt";

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Berlin este situat în regiunea cu același nume. Este un centru metropolitan important, recunoscut pentru economia sa diversificată, scena culturală vibrantă și ecosistemul tech în creștere.',
  "romanianCommunityNotes" = 'Comunitatea românească este vizibilă în Berlin, cu rețele profesionale, întâlniri culturale și sprijin constant pentru cei nou-veniți.',
  "jobMarketNotes" = 'Cerere puternică în IT, sănătate, logistică și roluri administrative. În Berlin, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'berlin';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Amsterdam este situat în regiunea Olanda de Nord. Capitala culturală și turistică a Țărilor de Jos, Amsterdam atrage sectoare creative, start‑upuri și un trafic maritim și de turism intens.',
  "romanianCommunityNotes" = 'În Amsterdam, românii sunt prezenți mai ales în mediile urbane mobile, cu grupuri mici dar active în zona Randstad.',
  "jobMarketNotes" = 'Piață competitivă cu roluri bune în tech, data, logistică și servicii internaționale. În Amsterdam, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
  "population" = 
WHERE "slug" = 'amsterdam';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Madrid este situat în regiunea Comunitatea Madrid. Capitala Spaniei combină administrație centrală, servicii financiare și o puternică industrie culturală și ospitalieră.',
  "romanianCommunityNotes" = 'Madrid adună o comunitate românească mare, bine conectată la servicii, construcții și joburi din zona metropolitană.',
  "jobMarketNotes" = 'Cerere în servicii, sănătate, logistică și funcții suport în companii mari. Pentru Madrid, finanțe și servicii corporate sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'madrid';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Paris este situat în regiunea Ile-de-France. Paris rămâne un centru global de finanțe, artă și turism, cu un sector de servicii foarte dezvoltat și oportunități în industrii creative.',
  "romanianCommunityNotes" = 'La Paris, comunitatea românească funcționează prin rețele profesionale și prieteni vechi, cu participare vizibilă la evenimente culturale.',
  "jobMarketNotes" = 'Multe roluri în servicii, consulting, retail premium și sănătate. Paris atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'paris';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Milano este situat în regiunea Lombardia. Milano este motorul economic al Italiei, cunoscut pentru financiar, modă, design și un sector producător integrat.',
  "romanianCommunityNotes" = 'Milano are una dintre cele mai solide comunități românești, ancorată în muncă urbană, mobilitate profesională și sprijin între familii.',
  "jobMarketNotes" = 'Piață solidă în modă, design, finanțe și servicii corporate. În Milano, pe fondul serviciilor financiare și corporate, apar oportunități mai clare în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'milano';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Lisabona este situat în regiunea cu același nume. Lisabona combină turismul, portul maritim și un sector tehnologic în expansiune, atrăgând companii internaționale și talente.',
  "romanianCommunityNotes" = 'În Lisabona, românii sunt tot mai mulți și se văd în special în servicii, domenii tehnice și colaborări informale între cunoștințe.',
  "jobMarketNotes" = 'Cerere bună în tech, suport clienți, turism și echipe internaționale. Lisabona atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'lisabona';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul München este situat în regiunea Bavaria. München este un hub industrial și tehnologic, cu industrii auto, inginerie și servicii profesionale puternice.',
  "romanianCommunityNotes" = 'München are o comunitate românească bine așezată, concentrată în zona metropolitană și foarte prezentă în sectoarele tehnice.',
  "jobMarketNotes" = 'Se caută mult ingineri, specialiști tech și personal pentru industrie auto. În München, pe fondul bazei industriale și profilului tehnic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'munchen';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Frankfurt este situat în regiunea Hesse. Frankfurt găzduiește centre financiare internaționale și este un nod major pentru transport aerian și logistică.',
  "romanianCommunityNotes" = 'În zona Frankfurt-Rhein-Main, comunitatea românească este bine organizată și conectată la finanțe, logistică și servicii corporate.',
  "jobMarketNotes" = 'Finanțe, logistică și aeroportul generează cerere constantă pentru roluri specializate. Frankfurt atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'frankfurt';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Rotterdam este situat în regiunea Olanda de Sud. Portul său mare definește economia locală: logistică, industrie maritimă și activități conexe domină piața muncii.',
  "romanianCommunityNotes" = 'Rotterdam strânge români mai ales în jurul portului, al industriei și al joburilor cu mobilitate mare între proiecte.',
  "jobMarketNotes" = 'Portul susține joburi în transport, logistică, operațiuni și industrie maritimă. În Rotterdam, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'rotterdam';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Haga este situat în regiunea Olanda de Sud. Haga este cunoscut pentru instituțiile internaționale și juridice, ceea ce atrage profesioniști în domeniul dreptului și diplomației.',
  "romanianCommunityNotes" = 'La Haga, comunitatea românească se intersectează des cu mediile juridice și internaționale, păstrând însă o formă discretă și stabilă.',
  "jobMarketNotes" = 'Cerere în drept, diplomație, organizații internaționale și servicii publice. Haga atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'haga';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Barcelona este situat în regiunea Catalonia. Barcelona combină turismul intens, industriile creative și un port activ, fiind un magnet pentru startupuri și servicii.',
  "romanianCommunityNotes" = 'Barcelona are o comunitate românească foarte activă în viața de zi cu zi, cu oameni răspândiți între servicii, turism și activități creative.',
  "jobMarketNotes" = 'Roluri numeroase în turism, servicii, creativ și startupuri digitale. Barcelona atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'barcelona';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Valencia este situat în regiunea cu același nume. Valencia are o economie mixtă bazată pe agricultură modernă, turism și un port regional important pentru comerț.',
  "romanianCommunityNotes" = 'În Valencia, românii sunt prezenți în valuri mai vizibile în zonele de lucru și în cartierele care atrag rezidenți pe termen lung.',
  "jobMarketNotes" = 'Turismul, logistica și producția ușoară mențin o piață de muncă variată. Pentru Valencia, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'valencia';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Lyon este situat în regiunea Auvergne-Rhone-Alpes. Lyon este recunoscut pentru industrie alimentară, universități și un sector de cercetare biomedicală în creștere.',
  "romanianCommunityNotes" = 'Lyon păstrează o comunitate românească mică, dar coerentă, conectată la industrie, studii și joburi de început.',
  "jobMarketNotes" = 'Industria, cercetarea și sănătatea aduc oportunități stabile și bine plătite. În Lyon, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'lyon';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Marseille este situat în regiunea Provence-Alpes-Cote d''Azur. Marseille este un port major mediteranean, cu industrii maritime, logistică și o activă comunitate culturală portuară.',
  "romanianCommunityNotes" = 'La Marseille, comunitatea românească se leagă mult de port, transport și muncă sezonieră, cu sprijin mutual între cunoscuți.',
  "jobMarketNotes" = 'Portul și turismul deschid roluri în logistică, transport și servicii. În Marseille, pe fondul ecosistemului tech și startupurilor, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'marseille';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Roma este situat în regiunea Lazio. Roma combină administrația centrală, turismul istoric și un sector de servicii publice larg, cu oportunități în turism cultural și educație.',
  "romanianCommunityNotes" = 'Roma are o comunitate românească mare și veche, bine prinsă în servicii, gospodărie și activități de zi cu zi.',
  "jobMarketNotes" = 'Administrația, turismul și serviciile publice susțin cererea de angajare. Pentru Roma, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'roma';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Torino este situat în regiunea Piemonte. Torino are un trecut industrial puternic și o prezență notabilă în industria auto și tehnologică, adaptându-se spre servicii de înaltă tehnologie.',
  "romanianCommunityNotes" = 'Torino are români răspândiți între suburbii și zona industrială, cu legături bune spre angajatori stabili și proiecte tehnice.',
  "jobMarketNotes" = 'Industria auto, ingineria și servicii tehnice rămân principalele direcții. Torino atrage joburi diferite tocmai pe fondul bazei industriale și profilului tehnic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'torino';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Porto este situat în regiunea cu același nume. Porto combină activitatea portuară cu turismul vinicol și o creștere în sectorul serviciilor și al tehnologiilor creative.',
  "romanianCommunityNotes" = 'Porto adună români într-un mod vizibil, mai ales în servicii, ospitalitate și zonele cu mobilitate profesională bună.',
  "jobMarketNotes" = 'Turismul, serviciile digitale și activitatea portuară țin piața vie. În Porto, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'porto';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Coimbra este situat în regiunea cu același nume. Coimbra este cunoscut ca oraș universitar istoric, cu o comunitate academică importantă și servicii pentru studenți.',
  "romanianCommunityNotes" = 'Coimbra are o comunitate românească mai mică, dar vie, influențată de mediul universitar și de fluxurile studențești.',
  "jobMarketNotes" = 'Universitatea și serviciile locale creează roluri pentru studenți și profesioniști juniori. Pentru Coimbra, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'coimbra';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tirana este situat în regiunea cu același nume. Tirana concentrează administrația națională și e în curs de modernizare economică, cu sectoare în construcții și servicii în expansiune.',
  "romanianCommunityNotes" = 'În Tirana, românii sunt puțini dar activi, mai ales în servicii, afaceri și rețele personale construite local.',
  "jobMarketNotes" = 'Tirana atrage joburi diferite tocmai pe fondul ecosistemului tech și startupurilor, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'tirana';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Durres este situat în regiunea cu același nume. Durres găzduiește unul dintre cele mai importante porturi ale Albaniei și are sectoare solide în transport și turism de coastă.',
  "romanianCommunityNotes" = 'Durres are o comunitate românească legată de coastă, transport și activități turistice, cu contact direct între oameni.',
  "jobMarketNotes" = 'Durres atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'durres';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Vlore este situat în regiunea cu același nume. Vlore este un centru portuar și turistic la Marea Adriatică, cu activități sezonale puternice în ospitalitate.',
  "romanianCommunityNotes" = 'Vlore păstrează o prezență românească discretă, dar constantă, în special prin muncă de sezon și relații de prietenie.',
  "jobMarketNotes" = 'În Vlore, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'vlore';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Andorra la Vella este situat în regiunea cu același nume. Andorra la Vella are o economie orientată spre servicii financiare și turism montan, cu profil transfrontalier pentru retail și ospitalitate.',
  "romanianCommunityNotes" = 'În Andorra la Vella, românii sunt puțini, dar se observă în servicii și în munca legată de turismul montan.',
  "jobMarketNotes" = 'În Andorra la Vella, pe fondul serviciilor financiare și corporate, apar oportunități mai clare în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'andorra-la-vella';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Escaldes-Engordany este situat în regiunea cu același nume. Escaldes-Engordany este cunoscut pentru facilitățile termale și comerțul cu amănuntul, susținând economia locală de servicii.',
  "romanianCommunityNotes" = 'Escaldes-Engordany are o comunitate românească mică, mai vizibilă în retail, hoteluri și munca de proximitate.',
  "jobMarketNotes" = 'În Escaldes-Engordany, pe fondul sezonului turistic și serviciilor de zi cu zi, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'escaldes-engordany';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Encamp este situat în regiunea cu același nume. Encamp servește ca nod pentru turism montan și activități municipale, cu oportunități în servicii și transport local.',
  "romanianCommunityNotes" = 'În Encamp, românii apar mai ales în activități de sezon și în joburi care țin de infrastructura locală.',
  "jobMarketNotes" = 'În Encamp, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'encamp';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Yerevan este situat în regiunea cu același nume. Yerevan este capitala Armeniei, cu sectoare în administrație, cultură și servicii urbane care susțin economia locală.',
  "romanianCommunityNotes" = 'Yerevan găzduiește un nucleu românesc mic, dar stabil, conectat la administrație, studii și proiecte urbane.',
  "jobMarketNotes" = 'În Yerevan, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'yerevan';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Gyumri este situat în regiunea Shirak. Gyumri este un centru cultural și industrial regional, cu inițiative de regenerare economică și artiștilor locali.',
  "romanianCommunityNotes" = 'Gyumri are o prezență românească modestă, dar cu suficiente legături locale pentru sprijin și integrare socială.',
  "jobMarketNotes" = 'Pentru Gyumri, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul bazei industriale și profilului tehnic.'
WHERE "slug" = 'gyumri';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Vanadzor este situat în regiunea Lori. Vanadzor are un profil industrial și oferă servicii regionale, cu proiecte de diversificare economică în curs.',
  "romanianCommunityNotes" = 'Vanadzor are români puțini, însă comunitatea se menține prin contacte de muncă și relații personale.',
  "jobMarketNotes" = 'Vanadzor atrage joburi diferite tocmai pe fondul bazei industriale și profilului tehnic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'vanadzor';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Viena este situat în regiunea cu același nume. Viena este renumită pentru calitatea vieții, sectoarele financiare, culturale și organizațiile internaționale prezente.',
  "romanianCommunityNotes" = 'Viena adună o comunitate românească mare și bine integrată, prezentă în administrație, servicii și rețele culturale.',
  "jobMarketNotes" = 'Pentru Viena, finanțe și servicii corporate sunt cele mai vizibile direcții, mai ales pe fondul serviciilor financiare și corporate.'
WHERE "slug" = 'viena';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Graz este situat în regiunea Stiria. Graz are o economie orientată spre inginerie și educație tehnică, cu centre universitare și industrii locale.',
  "romanianCommunityNotes" = 'În Graz, românii se văd mai ales în mediul tehnic și universitar, cu legături bune între generații mai noi și mai vechi.',
  "jobMarketNotes" = 'În Graz, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'graz';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Linz este situat în regiunea Austria Superioară. Linz este cunoscut pentru industrie și tehnologie, găzduind companii de producție și inițiative culturale moderne.',
  "romanianCommunityNotes" = 'Linz are o comunitate românească activă în industrie și servicii, cu oameni care se sprijină foarte mult reciproc.',
  "jobMarketNotes" = 'Pentru Linz, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul bazei industriale și profilului tehnic.'
WHERE "slug" = 'linz';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Baku este situat în regiunea Absheron. Baku este un centru energetic regional, cu sectoare petroliere, financiare și o dezvoltare urbană intensă.',
  "romanianCommunityNotes" = 'Baku are o prezență românească restrânsă, dar conectată la proiecte urbane, afaceri și colaborări profesionale.',
  "jobMarketNotes" = 'Pentru Baku, finanțe și servicii corporate sunt cele mai vizibile direcții, mai ales pe fondul serviciilor financiare și corporate.'
WHERE "slug" = 'baku';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Ganja este situat în regiunea cu același nume. Ganja are rol regional în industrie și agricultură, cu oportunități în servicii și comerț local.',
  "romanianCommunityNotes" = 'La Ganja, românii sunt puțini și apar mai ales prin contacte de muncă și relații de afaceri punctuale.',
  "jobMarketNotes" = 'Ganja atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'ganja';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Sumqayit este situat în regiunea cu același nume. Sumqayit este un centru industrial și portuar important, cu activități în producție și logistică.',
  "romanianCommunityNotes" = 'Sumqayit are o comunitate românească foarte mică, concentrată mai ales pe muncă tehnică și legături profesionale.',
  "jobMarketNotes" = 'Pentru Sumqayit, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'sumqayit';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Minsk este situat în regiunea cu același nume. Minsk este centrul administrativ și economic al Belarusului, cu sectoare publice și industriale majore.',
  "romanianCommunityNotes" = 'Minsk păstrează o comunitate românească discretă, însă destul de bine legată în mediile urbane și administrative.',
  "jobMarketNotes" = 'În Minsk, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'minsk';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Gomel este situat în regiunea cu același nume. Gomel are un profil industrial regional, cu activități în producție și servicii pentru comunitate.',
  "romanianCommunityNotes" = 'Gomel are români puțini, dar cu rețele stabile și o prezență vizibilă în cercuri restrânse.',
  "jobMarketNotes" = 'În Gomel, pe fondul bazei industriale și profilului tehnic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'gomel';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Brest este situat în regiunea cu același nume. Brest servește ca nod de transport și comerț transfrontalier, cu infrastructură pentru logistică și servicii.',
  "romanianCommunityNotes" = 'Brest are o comunitate românească mică, mai prezentă în mobilitatea transfrontalieră și în relații de lucru.',
  "jobMarketNotes" = 'Pentru Brest, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'brest-belarus';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Bruxelles este situat în regiunea Bruxelles-Capitală. Bruxelles este un centru politic european, găzduind instituții UE și numeroase organizații internaționale, cu o economie orientată spre servicii.',
  "romanianCommunityNotes" = 'Bruxelles are o comunitate românească foarte activă, apropiată de instituțiile europene și de mediile internaționale.',
  "jobMarketNotes" = 'În Bruxelles, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'bruxelles';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Antwerp este situat în regiunea Flandra. Antwerp are un port deosebit de activ și o economie centrată pe diamante, logistică și comerț internațional.',
  "romanianCommunityNotes" = 'Antwerp are români bine ancorați în port, comerț și logistică, iar comunitatea se vede clar în viața de lucru.',
  "jobMarketNotes" = 'Antwerp atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'antwerp';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Ghent este situat în regiunea Flandra. Ghent este cunoscut pentru universități, industrii creative și un vibrant sector cultural și tehnologic local.',
  "romanianCommunityNotes" = 'Ghent are o comunitate românească mică spre medie, susținută de universități, cercetare și un mediu urban deschis.',
  "jobMarketNotes" = 'În Ghent, pe fondul universității și mediului academic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'ghent';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Sarajevo este situat în regiunea cu același nume. Sarajevo are o istorie culturală bogată și rol administrativ regional, cu sectoare în turism, servicii și cultură.',
  "romanianCommunityNotes" = 'Sarajevo are români puțini, dar prezenți în rețele culturale și în proiecte locale cu profil internațional.',
  "jobMarketNotes" = 'Pentru Sarajevo, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'sarajevo';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Banja Luka este situat în regiunea Republika Srpska. Banja Luka este un centru administrativ regional cu activități în servicii publice, educație și comerț local.',
  "romanianCommunityNotes" = 'Banja Luka are o comunitate românească redusă, cu contacte mai ales în servicii și colaborări profesionale.',
  "jobMarketNotes" = 'În Banja Luka, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'banja-luka';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Mostar este situat în regiunea Herțegovina. Mostar este cunoscut pentru patrimoniul său și turism, susținând servicii locale și activități comerciale legate de vizitatori.',
  "romanianCommunityNotes" = 'Mostar are o prezență românească mică, dar stabilă, legată de turism și de mediul local de servicii.',
  "jobMarketNotes" = 'În Mostar, pe fondul sezonului turistic și serviciilor de zi cu zi, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'mostar';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Sofia este situat în regiunea cu același nume. Sofia este centrul economic al Bulgariei, cu sectoare puternice în IT, servicii și transport regional.',
  "romanianCommunityNotes" = 'Sofia are o comunitate românească activă, bine conectată la IT, servicii și mediile de business internațional.',
  "jobMarketNotes" = 'În Sofia, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'sofia';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Plovdiv este situat în regiunea cu același nume. Plovdiv este un centru cultural și industrial regional, cu o economie mixtă în producție și turism.',
  "romanianCommunityNotes" = 'Plovdiv adună români în jurul industriei și al educației, cu o comunitate mică dar vizibilă.',
  "jobMarketNotes" = 'În Plovdiv, pe fondul bazei industriale și profilului tehnic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'plovdiv';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Varna este situat în regiunea cu același nume. Varna este un port important la Marea Neagră, cu sectoare în turism, transport maritim și servicii conexe.',
  "romanianCommunityNotes" = 'Varna are români mai ales în turism și pe zona de coastă, unde comunitatea se mișcă sezonier.',
  "jobMarketNotes" = 'În Varna, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'varna';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Zagreb este situat în regiunea cu același nume. Zagreb este centrul administrativ și economic al Croației, cu sectoare în servicii, IT și cultură.',
  "romanianCommunityNotes" = 'Zagreb are o comunitate românească vizibilă în servicii și cultură, cu un profil urban destul de stabil.',
  "jobMarketNotes" = 'Zagreb atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'zagreb';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Split este situat în regiunea Dalmația. Split este un port turistic major, cu economie bazată pe turism sezonier, servicii și transport maritim.',
  "romanianCommunityNotes" = 'Split atrage români prin turism și munca de sezon, iar comunitatea e mai degrabă practică decât formală.',
  "jobMarketNotes" = 'În Split, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'split';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Rijeka este situat în regiunea Primorje-Gorski Kotar. Rijeka rămâne un centru portuar și industrial, cu activități în logistică și servicii maritime.',
  "romanianCommunityNotes" = 'Rijeka are o comunitate românească mică, dar legată clar de port și de activitățile maritime.',
  "jobMarketNotes" = 'În Rijeka, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'rijeka';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Nicosia este situat în regiunea cu același nume. Nicosia servește ca centru administrativ și comercial al Ciprului, cu o economie orientată spre servicii și administrație publică.',
  "romanianCommunityNotes" = 'Nicosia are români prezenți în servicii și administrație, cu rețele mici dar foarte bine închegate.',
  "jobMarketNotes" = 'În Nicosia, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'nicosia';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Limassol este situat în regiunea cu același nume. Limassol are un port comercial important, un sector financiar în expansiune și o economie activă în turism și comerț.',
  "romanianCommunityNotes" = 'Limassol are o comunitate românească activă, mai ales în zonele de business și în serviciile orientate spre internațional.',
  "jobMarketNotes" = 'În Limassol, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'limassol';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Larnaca este situat în regiunea cu același nume. Larnaca are o economie orientată spre turism și transport maritim, cu port și facilități pentru vizitatori.',
  "romanianCommunityNotes" = 'Larnaca are români răspândiți în turism și servicii, cu o prezență discretă dar constantă.',
  "jobMarketNotes" = 'În Larnaca, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'larnaca';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Praga este situat în regiunea Boemia Centrală. Praga are o economie puternică în turism, IT și servicii profesionale, fiind un centru cultural european important.',
  "romanianCommunityNotes" = 'Praga are o comunitate românească mare și foarte mobilă, cu oameni prezenți în tech, turism și servicii.',
  "jobMarketNotes" = 'Pentru Praga, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'praga';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Brno este situat în regiunea Moravia de Sud. Brno este un nod academic și industrial, cunoscut pentru universități tehnice și un sector IT în creștere.',
  "romanianCommunityNotes" = 'Brno are români mai ales în mediul universitar și IT, cu o comunitate mică dar foarte activă.',
  "jobMarketNotes" = 'Pentru Brno, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul universității și mediului academic.'
WHERE "slug" = 'brno';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Ostrava este situat în regiunea Moravia-Silezia. Ostrava este cunoscut pentru trecutul industrial și pentru transformarea sa către servicii și tehnologie locală.',
  "romanianCommunityNotes" = 'Ostrava are o comunitate românească legată de industrie și reconversie profesională, fără să fie foarte mare.',
  "jobMarketNotes" = 'În Ostrava, pe fondul bazei industriale și profilului tehnic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'ostrava';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Copenhaga este situat în regiunea Hovedstaden. Copenhaga este un centru nordic pentru design, energie verde și tehnologie, cu un puternic sector de servicii.',
  "romanianCommunityNotes" = 'Copenhaga are o comunitate românească vizibilă în design, servicii și joburi internaționale.',
  "jobMarketNotes" = 'În Copenhaga, pe fondul bazei industriale și profilului tehnic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'copenhaga';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Aarhus este situat în regiunea Midtjylland. Aarhus are un profil universitare și cultural, cu creștere în sectoare creative și servicii pentru tineri profesioniști.',
  "romanianCommunityNotes" = 'Aarhus are români în special în mediul academic și profesional, cu o comunitate mică dar bine conectată.',
  "jobMarketNotes" = 'În Aarhus, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'aarhus';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Odense este situat în regiunea Syddanmark. Odense este cunoscut pentru industrie ușoară, educație și inițiative de inovare în manufactură și tehnologie.',
  "romanianCommunityNotes" = 'Odense are români mai ales în educație și industrie ușoară, iar comunitatea rămâne discretă.',
  "jobMarketNotes" = 'În Odense, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'odense';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tallinn este situat în regiunea Harju. Tallinn este un hub regional pentru tehnologie și servicii digitale, cu o economie orientată spre IT și start‑upuri.',
  "romanianCommunityNotes" = 'Tallinn are o comunitate românească activă în zona digitală, cu oameni conectați la startupuri și servicii IT.',
  "jobMarketNotes" = 'În Tallinn, pe fondul ecosistemului tech și startupurilor, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'tallinn';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tartu este situat în regiunea cu același nume. Tartu este recunoscut ca centru academic al Estoniei, cu activitate intensă în educație și cercetare.',
  "romanianCommunityNotes" = 'Tartu are români mulți în mediul universitar, unde comunitatea e mică, dar foarte vie.',
  "jobMarketNotes" = 'În Tartu, pe fondul universității și mediului academic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'tartu';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Parnu este situat în regiunea cu același nume. Parnu este o destinație estivală populară, cu o economie sezonieră puternică în turism și ospitalitate.',
  "romanianCommunityNotes" = 'Parnu are români mai ales în sezonul turistic, cu prezență modestă și orientată spre ospitalitate.',
  "jobMarketNotes" = 'În Parnu, pe fondul sezonului turistic și serviciilor de zi cu zi, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'parnu';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Helsinki este situat în regiunea Uusimaa. Helsinki este un centru nordic pentru tehnologie, design și servicii publice moderne, cu numeroase companii internaționale.',
  "romanianCommunityNotes" = 'Helsinki are o comunitate românească bine integrată în tehnologie și servicii publice.',
  "jobMarketNotes" = 'Helsinki atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'helsinki';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tampere este situat în regiunea Pirkanmaa. Tampere are un mix de industrie și cercetare, fiind cunoscut pentru tehnologii industriale și centre universitare.',
  "romanianCommunityNotes" = 'Tampere are români în industrie și cercetare, cu o comunitate mică dar stabilă.',
  "jobMarketNotes" = 'În Tampere, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'tampere';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Turku este situat în regiunea Finlanda Propriu-zisă. Turku are un port maritim important și o tradiție în industrie și sănătate, cu legături comerciale puternice.',
  "romanianCommunityNotes" = 'Turku are români legați de port și sănătate, iar comunitatea e mică, dar bine conectată.',
  "jobMarketNotes" = 'Turku atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'turku';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tbilisi este situat în regiunea cu același nume. Tbilisi este capitala culturală și economică a Georgiei, cu sectoare în turism, administrație și servicii.',
  "romanianCommunityNotes" = 'Tbilisi are români mai ales în servicii și administrație, cu relații personale care țin comunitatea împreună.',
  "jobMarketNotes" = 'În Tbilisi, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'tbilisi';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Batumi este situat în regiunea Adjara. Batumi este un port turistic la Marea Neagră, cu dezvoltare rapidă în ospitalitate și entertainment.',
  "romanianCommunityNotes" = 'Batumi are o comunitate românească sezonieră, ancorată în turism și în zonele de coastă.',
  "jobMarketNotes" = 'În Batumi, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'batumi';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kutaisi este situat în regiunea Imereti. Kutaisi este un centru administrativ regional și gazdă pentru activități industriale și servicii locale.',
  "romanianCommunityNotes" = 'Kutaisi are români puțini, dar prezenți prin colaborări locale și activități economice mici.',
  "jobMarketNotes" = 'În Kutaisi, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'kutaisi';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Atena este situat în regiunea Attica. Atena combină patrimoniul istoric cu sectoare moderne de servicii, turism cultural și administrație publică.',
  "romanianCommunityNotes" = 'Atena are o comunitate românească mare, bine legată de muncă urbană, servicii și viață de cartier.',
  "jobMarketNotes" = 'Pentru Atena, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'atena';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Salonic este situat în regiunea Macedonia Centrală. Salonic este un centru portuar și universitar, cu o viață culturală intensă și sectoare active în comerț și logistică.',
  "romanianCommunityNotes" = 'Salonic are români în jurul portului și al universităților, cu o comunitate mică dar vizibilă.',
  "jobMarketNotes" = 'Salonic atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'salonic';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Patras este situat în regiunea Grecia de Vest. Patras are un port comercial activ și o comunitate universitară care susține servicii și activități culturale.',
  "romanianCommunityNotes" = 'Patras are o comunitate românească modestă, dar activă în educație și servicii locale.',
  "jobMarketNotes" = 'Pentru Patras, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'patras';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Budapesta este situat în regiunea cu același nume. Budapesta este capitală economică și culturală, cu sectoare puternice în turism, servicii financiare și manufactură.',
  "romanianCommunityNotes" = 'Budapesta are o comunitate românească mare și bine conectată la turism, servicii și muncă de birou.',
  "jobMarketNotes" = 'Budapesta atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'budapesta';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Debrecen este situat în regiunea Hajdu-Bihar. Debrecen este un important centru universitar și comercial în estul Ungariei, cu sectoare active în educație și sănătate.',
  "romanianCommunityNotes" = 'Debrecen are români în mediul universitar și în sănătate, cu o comunitate mică dar coerentă.',
  "jobMarketNotes" = 'În Debrecen, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'debrecen';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Szeged este situat în regiunea Csongrad-Csanad. Szeged este cunoscut pentru universitățile sale și pentru agricultură, susținând servicii regionale și activități culturale.',
  "romanianCommunityNotes" = 'Szeged are români legați de universitate și agricultură, cu o prezență mică dar stabilă.',
  "jobMarketNotes" = 'În Szeged, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'szeged';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Reykjavik este situat în regiunea Capital Region. Reykjavik este centrul politic și economic al Islandei, cu sectoare puternice în turism, energie și servicii creative.',
  "romanianCommunityNotes" = 'Reykjavik are români puțini, dar foarte bine integrați în servicii și sectoare cu cerere mare.',
  "jobMarketNotes" = 'În Reykjavik, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'reykjavik';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kopavogur este situat în regiunea Capital Region. Kopavogur este un important centru rezidențial și comercial adiacent capitalei, cu servicii locale și facilități pentru familie.',
  "romanianCommunityNotes" = 'Kopavogur are o comunitate românească mică, apropiată de capitală și de viața de familie.',
  "jobMarketNotes" = 'În Kopavogur, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'kopavogur';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Akureyri este situat în regiunea Nordurland Eystra. Akureyri este un centru regional în nordul Islandei, cu activități în educație, turism nordic și servicii locale.',
  "romanianCommunityNotes" = 'Akureyri are români puțini, mai ales în turismul nordic și în servicii locale.',
  "jobMarketNotes" = 'În Akureyri, pe fondul universității și mediului academic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'akureyri';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Dublin este situat în regiunea Leinster. Dublin este un hub financiar și tehnologic, cu multinaționale din IT și servicii profesionale, atrăgând forță de muncă specializată.',
  "romanianCommunityNotes" = 'Dublin are o comunitate românească mare și foarte dinamică, cu oameni conectați la finanțe și tech.',
  "jobMarketNotes" = 'În Dublin, pe fondul serviciilor financiare și corporate, cererea rămâne activă în finanțe și servicii corporate, iar asigurări apar des în rolurile de intrare.'
WHERE "slug" = 'dublin';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Cork este situat în regiunea Munster. Cork este un centru portuar și industrial al Irlandei, cu sectoare puternice în farmaceutice, tehnologie și comerț.',
  "romanianCommunityNotes" = 'Cork are români în industrie, farmaceutice și comerț, iar comunitatea e bine ancorată local.',
  "jobMarketNotes" = 'Pentru Cork, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'cork';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Galway este situat în regiunea Connacht. Galway are un profil cultural și universitar, cu sectoare în turism, cercetare academică și industrii creative.',
  "romanianCommunityNotes" = 'Galway are o comunitate românească mică, dar vie, susținută de mediul cultural și universitar.',
  "jobMarketNotes" = 'Pentru Galway, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul universității și mediului academic.'
WHERE "slug" = 'galway';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Pristina este situat în regiunea cu același nume. Pristina este capitala Kosovă, concentrând administrație, servicii guvernamentale și o comunitate academică în creștere.',
  "romanianCommunityNotes" = 'Pristina are români puțini, însă cu vizibilitate în administrație și educație.',
  "jobMarketNotes" = 'În Pristina, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'pristina';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Prizren este situat în regiunea cu același nume. Prizren este un centru istoric și cultural, cu o economie locală bazată pe turism și servicii tradiționale.',
  "romanianCommunityNotes" = 'Prizren are o prezență românească mică, dar conectată la turism și proiecte culturale.',
  "jobMarketNotes" = 'În Prizren, pe fondul sezonului turistic și serviciilor de zi cu zi, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'prizren';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Peja este situat în regiunea cu același nume. Peja este un centru regional cu activități în industrie locală și turism montan, cunoscut pentru peisajele sale naturale.',
  "romanianCommunityNotes" = 'Peja are români mai ales prin rețele locale și activități economice de proximitate.',
  "jobMarketNotes" = 'În Peja, pe fondul bazei industriale și profilului tehnic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'peja';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Riga este situat în regiunea cu același nume. Riga este capitala Letoniei și un centru important pentru finanțe, IT și portuar, cu o scenă culturală activă.',
  "romanianCommunityNotes" = 'Riga are o comunitate românească foarte activă în finanțe, IT și în mediul portuar.',
  "jobMarketNotes" = 'Pentru Riga, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'riga';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Daugavpils este situat în regiunea Latgale. Daugavpils este un centru industrial și de transport, cu o diversitate etnică și inițiative culturale locale.',
  "romanianCommunityNotes" = 'Daugavpils are români puțini, cu legături mai ales în transport și servicii.',
  "jobMarketNotes" = 'În Daugavpils, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'daugavpils';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Liepaja este situat în regiunea Kurzeme. Liepaja este un oraș-port cunoscut pentru industrie marină și scene muzicale, susținând turism și activități maritime.',
  "romanianCommunityNotes" = 'Liepaja are români prezenți în zona portuară și în activități culturale legate de coastă.',
  "jobMarketNotes" = 'În Liepaja, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'liepaja';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Vaduz este situat în regiunea cu același nume. Vaduz este capitala Liechtensteinului, cu un sector financiar important și activități culturale concentrate în centrul istoric.',
  "romanianCommunityNotes" = 'Vaduz are o comunitate românească mică, discretă și foarte bine integrată în servicii.',
  "jobMarketNotes" = 'În Vaduz, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'vaduz';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Schaan este situat în regiunea cu același nume. Schaan este un centru industrial și rezidențial al Liechtensteinului, cu companii mici și servicii locale active.',
  "romanianCommunityNotes" = 'Schaan are români puțini, dar vizibili în industrie și servicii locale.',
  "jobMarketNotes" = 'În Schaan, pe fondul bazei industriale și profilului tehnic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'schaan';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Balzers este situat în regiunea cu același nume. Balzers găzduiește industrie ușoară și servicii locale, fiind important pentru economia micro-regională.',
  "romanianCommunityNotes" = 'Balzers are o comunitate românească redusă, mai mult familială și orientată spre munca de zi cu zi.',
  "jobMarketNotes" = 'Pentru Balzers, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'balzers';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Vilnius este situat în regiunea cu același nume. Vilnius este capitala Lituaniei, cu sectoare în servicii publice, fintech și o scenă culturală în expansiune.',
  "romanianCommunityNotes" = 'Vilnius are români bine conectați la servicii publice, fintech și mediul creativ.',
  "jobMarketNotes" = 'În Vilnius, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'vilnius';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kaunas este situat în regiunea cu același nume. Kaunas este un centru industrial și universitar, cunoscut pentru producție, evenimente culturale și dezvoltare urbană.',
  "romanianCommunityNotes" = 'Kaunas are români în industrie și universitate, cu o comunitate mică dar foarte activă.',
  "jobMarketNotes" = 'Pentru Kaunas, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul universității și mediului academic.'
WHERE "slug" = 'kaunas';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Klaipeda este situat în regiunea cu același nume. Klaipeda este principalul port al Lituaniei, cu activități puternice în transport maritim și logistică.',
  "romanianCommunityNotes" = 'Klaipeda are români legați de port și logistică, iar comunitatea e mică dar clară.',
  "jobMarketNotes" = 'Klaipeda atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'klaipeda';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Luxemburg este situat în regiunea cu același nume. Luxemburg este un centru financiar european major, cunoscut pentru servicii bancare, administrare și instituții europene.',
  "romanianCommunityNotes" = 'Luxemburg are o comunitate românească mare, foarte prezentă în finanțe și servicii europene.',
  "jobMarketNotes" = 'Luxemburg atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'luxemburg-oras';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Esch-sur-Alzette este situat în regiunea cu același nume. Esch-sur-Alzette combina mostenirea industriala cu zona universitara Belval, ceea ce sustine servicii, cercetare si locuri de muncă tehnice.',
  "romanianCommunityNotes" = 'Esch-sur-Alzette are români conectați la zona universitară și la reconversia industrială.',
  "jobMarketNotes" = 'În Esch-sur-Alzette, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'esch-sur-alzette';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Differdange este situat în regiunea cu același nume. Differdange este asociat cu industria siderurgica si cu servicii locale, fiind util pentru comparatii intre costuri si oportunitati tehnice.',
  "romanianCommunityNotes" = 'Differdange are o comunitate românească mică, dar constantă, cu legături de muncă stabile.',
  "jobMarketNotes" = 'Pentru Differdange, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'differdange';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Valletta este situat în regiunea South Eastern. Valletta este capitala Maltei, cu un sector intens dedicat administrației, turismului cultural și serviciilor guvernamentale.',
  "romanianCommunityNotes" = 'Valletta are români în servicii, turism și administrație, cu prezență mică dar bine definită.',
  "jobMarketNotes" = 'Valletta atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'valletta';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Birkirkara este situat în regiunea Central. Birkirkara are un rol rezidential si comercial important in Malta, cu acces bun la servicii urbane si locuri de muncă din zona centrala.',
  "romanianCommunityNotes" = 'Birkirkara are români în zona de servicii și comerț, cu o comunitate modestă dar activă.',
  "jobMarketNotes" = 'În Birkirkara, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'birkirkara';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Sliema este situat în regiunea Central. Sliema este legat de turism, retail si servicii de coasta, ceea ce il face relevant pentru joburi in ospitalitate si comert.',
  "romanianCommunityNotes" = 'Sliema are români în retail și ospitalitate, iar comunitatea se vede în ritmul zilnic al orașului.',
  "jobMarketNotes" = 'Pentru Sliema, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'sliema';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Chișinău este situat în regiunea cu același nume. Chișinău este capitala Republicii Moldova, axată pe administrație, servicii publice și comerț internațional cu spațiul est‑european.',
  "romanianCommunityNotes" = 'Chișinău are una dintre cele mai vizibile comunități românești din est, bine conectată la administrație și servicii.',
  "jobMarketNotes" = 'În Chișinău, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'chisinau';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Bălți este situat în regiunea cu același nume. Bălți este un important centru comercial și educațional al nordului Moldovei, susținut de piețe locale și servicii pentru agricultură.',
  "romanianCommunityNotes" = 'Bălți are români în comerț și educație, cu o comunitate mică dar stabilă.',
  "jobMarketNotes" = 'În Bălți, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'balti';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Cahul este situat în regiunea cu același nume. Cahul are rol regional în sudul Moldovei, cunoscut pentru instituțiile de învățământ, evenimente culturale și activități comerciale transfrontaliere.',
  "romanianCommunityNotes" = 'Cahul are o prezență românească discretă, dar constantă, legată de activități regionale și educație.',
  "jobMarketNotes" = 'Pentru Cahul, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'cahul';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Monaco este situat în regiunea cu același nume. Monaco este un centru financiar și turistic de lux, orientat spre servicii exclusiviste, evenimente internaționale și servicii bancare private.',
  "romanianCommunityNotes" = 'Monaco are români puțini, însă bine integrați în servicii premium și rețele profesionale restrânse.',
  "jobMarketNotes" = 'Pentru Monaco, finanțe și servicii corporate sunt cele mai vizibile direcții, mai ales pe fondul serviciilor financiare și corporate.'
WHERE "slug" = 'monaco-oras';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Podgorica este situat în regiunea cu același nume. Podgorica este centrul administrativ al Muntenegrului, cu sectoare în administrație, servicii și dezvoltare urbană.',
  "romanianCommunityNotes" = 'Podgorica are români în administrație și servicii, cu o comunitate mică dar stabilă.',
  "jobMarketNotes" = 'În Podgorica, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'podgorica';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Niksic este situat în regiunea cu același nume. Niksic are un profil industrial și de producție, cu oportunități în manufactură și servicii locale.',
  "romanianCommunityNotes" = 'Niksic are o comunitate românească redusă, mai ales în muncă locală și relații personale.',
  "jobMarketNotes" = 'Pentru Niksic, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'niksic';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Budva este situat în regiunea cu același nume. Budva este o destinație turistică de coastă, cu o economie concentrată pe ospitalitate, divertisment și servicii sezoniere.',
  "romanianCommunityNotes" = 'Budva are români în turism și sezon estival, iar comunitatea e vizibilă mai ales vara.',
  "jobMarketNotes" = 'În Budva, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'budva';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Skopje este situat în regiunea cu același nume. Skopje este capitala și centru administrativ, cu sectoare în servicii publice, comerț și infrastructură regională.',
  "romanianCommunityNotes" = 'Skopje are români puțini, dar activi în servicii și în mediile urbane deschise.',
  "jobMarketNotes" = 'În Skopje, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'skopje';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Bitola este situat în regiunea Pelagonia. Bitola are o tradiție industrială și culturală, cu oportunități în servicii și turism regional.',
  "romanianCommunityNotes" = 'Bitola are o comunitate românească mică, cu accent pe cultură și servicii locale.',
  "jobMarketNotes" = 'Bitola atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'bitola';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Tetovo este situat în regiunea Polog. Tetovo este un centru universitar și comercial regional, cu activitate în educație și servicii pentru comunitate.',
  "romanianCommunityNotes" = 'Tetovo are români puțini, însă cu contacte bune în educație și comerț.',
  "jobMarketNotes" = 'Pentru Tetovo, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul universității și mediului academic.'
WHERE "slug" = 'tetovo';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Oslo este situat în regiunea cu același nume. Oslo este centrul economic și politic al Norvegiei, cu sectoare puternice în energie, tehnologie și servicii profesionale.',
  "romanianCommunityNotes" = 'Oslo are o comunitate românească mare, conectată la energie, servicii și muncă urbană.',
  "jobMarketNotes" = 'Oslo atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'oslo';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Bergen este situat în regiunea Vestland. Bergen are o economie maritimă robustă, cu port, pescuit și activități universitare care susțin cercetarea locală.',
  "romanianCommunityNotes" = 'Bergen are români în activități maritime și universitare, cu o comunitate mică dar foarte bine închegată.',
  "jobMarketNotes" = 'Pentru Bergen, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'bergen';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Trondheim este situat în regiunea Trondelag. Trondheim este un centru tehnologic și universitar, cu un ecosistem puternic în cercetare și inovare.',
  "romanianCommunityNotes" = 'Trondheim are români în tehnologie și cercetare, cu o comunitate clară dar nu foarte mare.',
  "jobMarketNotes" = 'În Trondheim, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'trondheim';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Varșovia este situat în regiunea Mazovia. Varșovia este capitala economică și financiară a Poloniei, cu un sector de servicii și IMM-uri foarte dinamic.',
  "romanianCommunityNotes" = 'Varșovia are o comunitate românească foarte activă în finance, servicii și business internațional.',
  "jobMarketNotes" = 'Varșovia atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'varsovia';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Cracovia este situat în regiunea Polonia Mică. Cracovia este un puternic centru cultural și turistic, cu o universitate majoră și un sector IT în dezvoltare.',
  "romanianCommunityNotes" = 'Cracovia are români bine ancorați în turism, IT și mediul universitar.',
  "jobMarketNotes" = 'În Cracovia, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'cracovia';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Wroclaw este situat în regiunea Silezia Inferioară. Wroclaw este un centru de business și tehnologie, cu sectoare puternice în IT, producție și servicii.',
  "romanianCommunityNotes" = 'Wroclaw are români în tehnologie și producție, iar comunitatea e mică dar foarte prezentă.',
  "jobMarketNotes" = 'Wroclaw atrage joburi diferite tocmai pe fondul bazei industriale și profilului tehnic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'wroclaw';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul București este situat în regiunea cu același nume. București este principalul centru economic al României, cu oportunități în servicii, IT și industrie creativă.',
  "romanianCommunityNotes" = 'București are o comunitate românească vastă, dar aici se vede în special în rețele profesionale și cartierele centrale.',
  "jobMarketNotes" = 'În București, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'bucuresti';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Cluj-Napoca este situat în regiunea Cluj. Cluj-Napoca este un hub IT și universitar regional, atrăgând companii de tehnologie și talent tânăr.',
  "romanianCommunityNotes" = 'Cluj-Napoca are români foarte activi în IT și universitate, cu o comunitate solidă și bine conectată.',
  "jobMarketNotes" = 'Cluj-Napoca atrage joburi diferite tocmai pe fondul universității și mediului academic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'cluj-napoca';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Timișoara este situat în regiunea Timiș. Timișoara are o tradiție industrială și o comunitate IT emergentă, cu activitate culturală și educațională activă.',
  "romanianCommunityNotes" = 'Timișoara are români bine distribuiți între industrie, tehnologie și viața culturală a orașului.',
  "jobMarketNotes" = 'Timișoara atrage joburi diferite tocmai pe fondul universității și mediului academic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'timisoara';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Moscova este situat în regiunea cu același nume. Moscova este principalul centru economic, financiar și cultural al Rusiei, cu industrii diverse și un puternic sector de servicii.',
  "romanianCommunityNotes" = 'Moscova are o comunitate românească mare și foarte diversă, legată de afaceri, cultură și mobilitate profesională.',
  "jobMarketNotes" = 'În Moscova, pe fondul serviciilor financiare și corporate, cererea rămâne activă în finanțe și servicii corporate, iar asigurări apar des în rolurile de intrare.'
WHERE "slug" = 'moscova';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Sankt Petersburg este situat în regiunea Nord-Vest. Sankt Petersburg este un important port și centru cultural, cu industrii maritime, turism și instituții de artă renumite.',
  "romanianCommunityNotes" = 'Sankt Petersburg are români mai ales în cultură, turism și servicii, cu o prezență urbană discretă.',
  "jobMarketNotes" = 'Sankt Petersburg atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'sankt-petersburg';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kazan este situat în regiunea Tatarstan. Kazan este un centru industrial și universitar important, cu sectoare în inginerie, industria ușoară și educație superioră.',
  "romanianCommunityNotes" = 'Kazan are români în educație și industrie, cu o comunitate mică dar vizibilă.',
  "jobMarketNotes" = 'Pentru Kazan, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'kazan';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul San Marino este situat în regiunea cu același nume. San Marino este un centru turistic și administrativ mic, cu economie bazată pe turism, retail și servicii publice.',
  "romanianCommunityNotes" = 'San Marino are români puțini, însă bine integrați în servicii și turism.',
  "jobMarketNotes" = 'Pentru San Marino, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'san-marino-oras';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Belgrad este situat în regiunea cu același nume. Belgrad este capitala Serbiei, un important nod de transport și un centru cultural și economic regional.',
  "romanianCommunityNotes" = 'Belgrad are o comunitate românească conectată la transport, comerț și viață de oraș mare.',
  "jobMarketNotes" = 'Belgrad atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'belgrad';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Novi Sad este situat în regiunea Vojvodina. Novi Sad este cunoscut pentru fortareata Petrovaradin și festivalul EXIT, având un sector cultural și turistic important care completează economia locală.',
  "romanianCommunityNotes" = 'Novi Sad are români activi în cultură și servicii, cu o comunitate mică dar foarte bine așezată.',
  "jobMarketNotes" = 'Pentru Novi Sad, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'novi-sad';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul NiÅ¡ este situat în regiunea NiÅ¡ava. Nis este un centru regional important din sudul Serbiei, cu profil universitar, industrial si logistic.',
  "romanianCommunityNotes" = 'Niš are români în domenii tehnice și educaționale, cu o prezență modestă.',
  "jobMarketNotes" = 'În NiÅ¡, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'nis';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Bratislava este situat în regiunea cu același nume. Bratislava este capitala Slovaciei, cu o economie centrată pe servicii, producție ușoară și conexiuni transfrontaliere cu Austria.',
  "romanianCommunityNotes" = 'Bratislava are români mulți în servicii și în joburi transfrontaliere, cu o comunitate bine poziționată.',
  "jobMarketNotes" = 'Pentru Bratislava, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul statutului administrativ și instituțiilor locale.'
WHERE "slug" = 'bratislava';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kosice este situat în regiunea cu același nume. Kosice este un centru important al estului Slovaciei, cu profil industrial, universitar si servicii regionale.',
  "romanianCommunityNotes" = 'Košice are români în industrie și universitate, iar comunitatea rămâne mică dar consecventă.',
  "jobMarketNotes" = 'În Kosice, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'kosice';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Zilina este situat în regiunea cu același nume. Zilina este asociat cu transportul si industria auto, ceea ce sustine joburi in productie, logistica si servicii tehnice.',
  "romanianCommunityNotes" = 'Žilina are o comunitate românească legată de transport și industria auto, cu prezență discretă.',
  "jobMarketNotes" = 'Zilina atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'zilina';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Ljubljana este situat în regiunea cu același nume. Ljubljana este capitala și centru universitar al Sloveniei, cu o economie axată pe servicii, educație și sectorul creativ.',
  "romanianCommunityNotes" = 'Ljubljana are români integrați în servicii, educație și zona creativă a orașului.',
  "jobMarketNotes" = 'Ljubljana atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'ljubljana';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Maribor este situat în regiunea Podravska. Maribor are rol universitar si regional in nord-estul Sloveniei, cu activitati in servicii, educație si economie locala.',
  "romanianCommunityNotes" = 'Maribor are români puțini, dar prezenți constant în servicii și educație.',
  "jobMarketNotes" = 'În Maribor, pe fondul universității și mediului academic, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'maribor';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Celje este situat în regiunea Savinjska. Celje este un centru regional sloven cu servicii locale, industrie usoara si legaturi bune spre alte zone urbane.',
  "romanianCommunityNotes" = 'Celje are o comunitate românească mică, dar stabilă, mai ales în servicii locale.',
  "jobMarketNotes" = 'Pentru Celje, IT și produse digitale sunt cele mai vizibile direcții, mai ales pe fondul bazei industriale și profilului tehnic.'
WHERE "slug" = 'celje';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Stockholm este situat în regiunea cu același nume. Stockholm este un centru nordic de tehnologie, finanțe și design, cu numeroase companii internaționale și startupuri.',
  "romanianCommunityNotes" = 'Stockholm are români activi în tehnologie, design și servicii, cu o comunitate mare și bine conectată.',
  "jobMarketNotes" = 'În Stockholm, pe fondul serviciilor financiare și corporate, apar oportunități mai clare în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'stockholm';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Gothenburg este situat în regiunea Vastra Gotaland. Gothenburg este un port major și centru industrial, cunoscut pentru industria auto și logistică maritimă.',
  "romanianCommunityNotes" = 'Gothenburg are români în industrie și logistică maritimă, iar comunitatea e vizibilă prin muncă și colaborări.',
  "jobMarketNotes" = 'Pentru Gothenburg, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'gothenburg';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Malmö este situat în regiunea Skane. Malmö se remarcă prin legătura cu Copenhaga via Podul Öresund, profil multicultural și creștere în sectoare digitale și logistice.',
  "romanianCommunityNotes" = 'Malmö are o comunitate românească foarte mobilă, conectată la Copenhaga și la sectoarele digitale.',
  "jobMarketNotes" = 'În Malmö, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'malmo';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Zurich este situat în regiunea cu același nume. Zurich este un centru financiar și bancar de prim rang, cu o puternică prezență a serviciilor profesionale și asigurărilor.',
  "romanianCommunityNotes" = 'Zurich are români foarte bine integrați în finanțe și servicii profesionale, cu o comunitate puternică.',
  "jobMarketNotes" = 'Zurich atrage joburi diferite tocmai pe fondul serviciilor financiare și corporate, de aici vin roluri în finanțe, servicii corporate și asigurări.'
WHERE "slug" = 'zurich';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Geneva este situat în regiunea cu același nume. Geneva este un hub diplomatic și financiar, gazdă pentru numeroase organizații internaționale și servicii profesionale specializate.',
  "romanianCommunityNotes" = 'Geneva are români conectați la organizații internaționale și servicii specializate.',
  "jobMarketNotes" = 'În Geneva, pe fondul serviciilor financiare și corporate, cererea rămâne activă în finanțe și servicii corporate, iar asigurări apar des în rolurile de intrare.'
WHERE "slug" = 'geneva';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Basel este situat în regiunea Basel-Stadt. Basel este un centru industrial și farmaceutic important, cu centre de cercetare și comerț transfrontalier cu Germania și Franța.',
  "romanianCommunityNotes" = 'Basel are o comunitate românească ancorată în farmaceutice, cercetare și comerț transfrontalier.',
  "jobMarketNotes" = 'Basel atrage joburi diferite tocmai pe fondul portului și fluxurilor de transport, de aici vin roluri în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'basel';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Istanbul este situat în regiunea Marmara. Istanbul este un nod transcontinental major, combinând turism, comerț și transport maritim cu industrii diverse și un sector puternic de servicii.',
  "romanianCommunityNotes" = 'Istanbul are români în servicii, comerț și transport, cu o comunitate urbană foarte amestecată.',
  "jobMarketNotes" = 'În Istanbul, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'istanbul';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Ankara este situat în regiunea Anatolia Centrală. Ankara este capitala Turciei, concentrând administrație, universități și sectoare publice, precum și industrii de apărare și servicii.',
  "romanianCommunityNotes" = 'Ankara are români puțini, dar prezenți în administrație, studii și servicii publice.',
  "jobMarketNotes" = 'În Ankara, pe fondul statutului administrativ și instituțiilor locale, apar oportunități mai clare în IT, produse digitale și servicii tech.'
WHERE "slug" = 'ankara';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Izmir este situat în regiunea Egeea. Izmir are un port important și o economie bazată pe comerț maritim, agricultură regională și turism estival.',
  "romanianCommunityNotes" = 'Izmir are români în comerț și activități maritime, iar comunitatea rămâne mică dar activă.',
  "jobMarketNotes" = 'Pentru Izmir, logistică și transport sunt cele mai vizibile direcții, mai ales pe fondul portului și fluxurilor de transport.'
WHERE "slug" = 'izmir';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Kiev este situat în regiunea cu același nume. Kiev este capitala Ucrainei și un hub pentru educație, cultură și industrii urbane, cu un sector de servicii extins.',
  "romanianCommunityNotes" = 'Kiev are o comunitate românească legată de educație, cultură și servicii urbane.',
  "jobMarketNotes" = 'Kiev atrage joburi diferite tocmai pe fondul statutului administrativ și instituțiilor locale, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'kiev';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Lviv este situat în regiunea cu același nume. Lviv este un centru cultural și universitar al Ucrainei occidentale, cu o scenă creativă activă și un sector IT în expansiune.',
  "romanianCommunityNotes" = 'Lviv are români în IT și mediul universitar, cu o comunitate mică dar foarte conectată.',
  "jobMarketNotes" = 'Lviv atrage joburi diferite tocmai pe fondul universității și mediului academic, de aici vin roluri în IT, produse digitale și servicii tech.'
WHERE "slug" = 'lviv';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Odesa este situat în regiunea cu același nume. Odesa are un profil influentat de activitati portuare si logistice, cu oportunitati in transport, comert si servicii conexe.',
  "romanianCommunityNotes" = 'Odesa are români în port, logistică și servicii, cu o prezență discretă dar vizibilă.',
  "jobMarketNotes" = 'În Odesa, pe fondul portului și fluxurilor de transport, apar oportunități mai clare în logistică, transport și operațiuni portuare.'
WHERE "slug" = 'odesa';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Londra este situat în regiunea Anglia. Londra este un centru financiar global, cu un sector de servicii extrem de dezvoltat, industrii creative și oportunități internaționale.',
  "romanianCommunityNotes" = 'Londra are o comunitate românească foarte mare, diversă și foarte activă în economie, servicii și cultură.',
  "jobMarketNotes" = 'În Londra, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'londra';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Manchester este situat în regiunea Anglia. Manchester este recunoscut pentru patrimoniul său industrial, scena muzicală vibrantă și centre universitare ce susțin sectoare de tehnologie și servicii.',
  "romanianCommunityNotes" = 'Manchester are români prezenți în educație, servicii și industrii creative, cu o comunitate bine amestecată.',
  "jobMarketNotes" = 'În Manchester, pe fondul universității și mediului academic, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'manchester';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Birmingham este situat în regiunea Anglia. Birmingham are o tradiție industrială puternică și un sector manufacturier și logistic dezvoltat, susținut de o comunitate multiculturală dinamică.',
  "romanianCommunityNotes" = 'Birmingham are români în producție, logistică și servicii, cu legături puternice între comunități locale.',
  "jobMarketNotes" = 'În Birmingham, pe fondul portului și fluxurilor de transport, cererea rămâne activă în logistică și transport, iar operațiuni portuare apar des în rolurile de intrare.'
WHERE "slug" = 'birmingham';

UPDATE "cities"
SET
  "generalDescription" = 'Orașul Vatican este situat în regiunea cu același nume. Vaticanul are un rol administrativ si religios unic, cu activitati concentrate in institutii, cultura si turism.',
  "romanianCommunityNotes" = 'Vatican City nu are o comunitate românească de masă, dar există prezențe mici în servicii și în zonele apropiate.',
  "jobMarketNotes" = 'În Vatican, pe fondul statutului administrativ și instituțiilor locale, cererea rămâne activă în IT și produse digitale, iar servicii tech apar des în rolurile de intrare.'
WHERE "slug" = 'vatican-city';