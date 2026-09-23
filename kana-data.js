/* Kana tables shared by index.html and tools/record.html.
   "kana|romaji|word|wordRomaji|wordEnglish|note"  ('' = empty cell) */
(function(){
  const SEION_ROWS = [
    ['あ|a|あめ|ame|rain','い|i|いぬ|inu|dog','う|u|うみ|umi|sea','え|e|えき|eki|train station','お|o|おかね|okane|money'],
    ['か|ka|かさ|kasa|umbrella','き|ki|きのこ|kinoko|mushroom','く|ku|くつ|kutsu|shoes','け|ke|けさ|kesa|this morning','こ|ko|こども|kodomo|child'],
    ['さ|sa|さかな|sakana|fish','し|shi|しお|shio|salt','す|su|すいか|suika|watermelon','せ|se|せんせい|sensei|teacher','そ|so|そら|sora|sky'],
    ['た|ta|たまご|tamago|egg','ち|chi|ちず|chizu|map','つ|tsu|つくえ|tsukue|desk','て|te|て|te|hand','と|to|とり|tori|bird'],
    ['な|na|なつ|natsu|summer','に|ni|にく|niku|meat','ぬ|nu|ぬの|nuno|cloth','ね|ne|ねこ|neko|cat','の|no|のり|nori|seaweed'],
    ['は|ha|はな|hana|flower','ひ|hi|ひと|hito|person','ふ|fu|ふね|fune|boat','へ|he|へや|heya|room','ほ|ho|ほし|hoshi|star'],
    ['ま|ma|まど|mado|window','み|mi|みず|mizu|water','む|mu|むし|mushi|insect','め|me|め|me|eye','も|mo|もり|mori|forest'],
    ['や|ya|やま|yama|mountain','','ゆ|yu|ゆき|yuki|snow','','よ|yo|よる|yoru|night'],
    ['ら|ra|らくだ|rakuda|camel','り|ri|りんご|ringo|apple','る|ru|るす|rusu|not at home','れ|re|れきし|rekishi|history','ろ|ro|ろうそく|rousoku|candle'],
    ['わ|wa|わたし|watashi|I, me','','','','を|wo|||Written "wo", said "o". Used only as a particle.'],
    ['ん|n|ほん|hon|book|Never starts a word.','','','',''],
  ];
  const DAKUTEN_ROWS = [
    ['が|ga|がっこう|gakkou|school','ぎ|gi|ぎんこう|ginkou|bank','ぐ|gu|かぐ|kagu|furniture','げ|ge|げんき|genki|healthy, lively','ご|go|ごはん|gohan|rice, meal'],
    ['ざ|za|ざっし|zasshi|magazine','じ|ji|じかん|jikan|time','ず|zu|すず|suzu|bell','ぜ|ze|ぜんぶ|zenbu|all','ぞ|zo|ぞう|zou|elephant'],
    ['だ|da|だいがく|daigaku|university','ぢ|ji|はなぢ|hanaji|nosebleed|Rare — almost always じ.','づ|zu|つづく|tsuzuku|to continue|Rare — almost always ず.','で|de|でんわ|denwa|telephone','ど|do|どうぶつ|doubutsu|animal'],
    ['ば|ba|ばら|bara|rose','び|bi|びん|bin|bottle','ぶ|bu|ぶた|buta|pig','べ|be|べんとう|bentou|lunch box','ぼ|bo|ぼうし|boushi|hat'],
    ['ぱ|pa|いっぱい|ippai|a lot, full','ぴ|pi|えんぴつ|enpitsu|pencil','ぷ|pu|てんぷら|tenpura|tempura','ぺ|pe|ぺらぺら|perapera|fluent','ぽ|po|さんぽ|sanpo|a walk'],
  ];
  const SMALL_ROW = [
    'っ|small tsu|きって|kitte|stamp|Makes a short pause and doubles the next consonant.',
    'ゃ|small ya|きゃく|kyaku|guest|Joins the kana before it: き + ゃ = kya.',
    'ゅ|small yu|きゅう|kyuu|nine|Joins the kana before it: き + ゅ = kyu.',
    'ょ|small yo|きょう|kyou|today|Joins the kana before it: き + ょ = kyo.',
  ];
  const YOUON_ROWS = [
    ['きゃ|kya|きゃく|kyaku|guest','きゅ|kyu|きゅう|kyuu|nine','きょ|kyo|きょう|kyou|today'],
    ['しゃ|sha|しゃしん|shashin|photo','しゅ|shu|しゅみ|shumi|hobby','しょ|sho|しょくじ|shokuji|meal'],
    ['ちゃ|cha|おちゃ|ocha|tea','ちゅ|chu|ちゅうい|chuui|caution','ちょ|cho|ちょっと|chotto|a little'],
    ['にゃ|nya|こんにゃく|konnyaku|konjac','にゅ|nyu|にゅうがく|nyuugaku|starting school','にょ|nyo|にょうぼう|nyoubou|wife'],
    ['ひゃ|hya|ひゃく|hyaku|hundred','ひゅ|hyu|ひゅうひゅう|hyuuhyuu|whistling wind','ひょ|hyo|ひょう|hyou|chart, table'],
    ['みゃ|mya|みゃく|myaku|pulse','みゅ|myu|||Almost only in foreign words, written in katakana: ミュージカル (musical).','みょ|myo|みょうじ|myouji|surname'],
    ['りゃ|rya|りゃく|ryaku|abbreviation','りゅ|ryu|りゅう|ryuu|dragon','りょ|ryo|りょこう|ryokou|travel'],
    ['ぎゃ|gya|ぎゃく|gyaku|the opposite','ぎゅ|gyu|ぎゅうにゅう|gyuunyuu|milk','ぎょ|gyo|ぎょうざ|gyouza|dumplings'],
    ['じゃ|ja|じゃがいも|jagaimo|potato','じゅ|ju|じゅぎょう|jugyou|class, lesson','じょ|jo|じょうず|jouzu|good at'],
    ['びゃ|bya|さんびゃく|sanbyaku|three hundred','びゅ|byu|びゅうびゅう|byuubyuu|howling wind','びょ|byo|びょういん|byouin|hospital'],
    ['ぴゃ|pya|ろっぴゃく|roppyaku|six hundred','ぴゅ|pyu|ぴゅうぴゅう|pyuupyuu|whistling','ぴょ|pyo|はっぴょう|happyou|presentation'],
  ];


    window.KANA_TABLES = { seion:SEION_ROWS, dakuten:DAKUTEN_ROWS, small:SMALL_ROW, youon:YOUON_ROWS };
})();
