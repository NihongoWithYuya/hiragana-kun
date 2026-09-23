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
    ['ら|ra|らくだ|rakuda|camel','り|ri|りんご|ringo|apple','る|ru|くるま|kuruma|car','れ|re|れきし|rekishi|history','ろ|ro|ろうそく|rousoku|candle'],
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

  /* ---------- katakana: same sounds, loanword examples ---------- */
  const K_SEION = [
    ['ア|a|アイス|aisu|ice cream','イ|i|インク|inku|ink','ウ|u|ウール|uuru|wool','エ|e|エアコン|eakon|air conditioner','オ|o|オレンジ|orenji|orange'],
    ['カ|ka|カメラ|kamera|camera','キ|ki|キウイ|kiui|kiwi','ク|ku|クッキー|kukkii|cookie','ケ|ke|ケーキ|keeki|cake','コ|ko|コーヒー|koohii|coffee'],
    ['サ|sa|サラダ|sarada|salad','シ|shi|シャツ|shatsu|shirt|Looks like ツ — シ strokes go up from the left.','ス|su|スープ|suupu|soup','セ|se|セーター|seetaa|sweater','ソ|so|ソース|soosu|sauce|Looks like ン — ソ strokes go down from the top.'],
    ['タ|ta|タクシー|takushii|taxi','チ|chi|チーズ|chiizu|cheese','ツ|tsu|ツアー|tsuaa|tour|Looks like シ — ツ strokes go down from the top.','テ|te|テレビ|terebi|TV','ト|to|トマト|tomato|tomato'],
    ['ナ|na|ナイフ|naifu|knife','ニ|ni|ニュース|nyuusu|news','ヌ|nu|ヌードル|nuudoru|noodles','ネ|ne|ネクタイ|nekutai|necktie','ノ|no|ノート|nooto|notebook'],
    ['ハ|ha|ハンバーガー|hanbaagaa|hamburger','ヒ|hi|ヒーター|hiitaa|heater','フ|fu|フランス|furansu|France','ヘ|he|ヘリコプター|herikoputaa|helicopter','ホ|ho|ホテル|hoteru|hotel'],
    ['マ|ma|マスク|masuku|mask','ミ|mi|ミルク|miruku|milk','ム|mu|ハム|hamu|ham','メ|me|メロン|meron|melon','モ|mo|モデル|moderu|model'],
    ['ヤ|ya|タイヤ|taiya|tyre','','ユ|yu|ユニフォーム|yunifoomu|uniform','','ヨ|yo|ヨーグルト|yooguruto|yogurt'],
    ['ラ|ra|ラジオ|rajio|radio','リ|ri|リボン|ribon|ribbon','ル|ru|ルール|ruuru|rule','レ|re|レモン|remon|lemon','ロ|ro|ロボット|robotto|robot'],
    ['ワ|wa|ワイン|wain|wine','','','','ヲ|wo|||Almost never used — the particle is written in hiragana を.'],
    ['ン|n|パン|pan|bread|Never starts a word. Looks like ソ — ン strokes go up from the left.','','','',''],
  ];
  const K_DAKUTEN = [
    ['ガ|ga|ガム|gamu|chewing gum','ギ|gi|ギター|gitaa|guitar','グ|gu|グラス|gurasu|glass','ゲ|ge|ゲーム|geemu|game','ゴ|go|ゴルフ|gorufu|golf'],
    ['ザ|za|ピザ|piza|pizza','ジ|ji|ジュース|juusu|juice','ズ|zu|チーズ|chiizu|cheese','ゼ|ze|ゼロ|zero|zero','ゾ|zo|ゾーン|zoon|zone'],
    ['ダ|da|ダンス|dansu|dance','ヂ|ji|||Very rare — almost always ジ.','ヅ|zu|||Very rare — almost always ズ.','デ|de|デザート|dezaato|dessert','ド|do|ドア|doa|door'],
    ['バ|ba|バス|basu|bus','ビ|bi|ビル|biru|building','ブ|bu|ブーツ|buutsu|boots','ベ|be|ベッド|beddo|bed','ボ|bo|ボール|booru|ball'],
    ['パ|pa|パン|pan|bread','ピ|pi|ピアノ|piano|piano','プ|pu|プール|puuru|swimming pool','ペ|pe|ペン|pen|pen','ポ|po|ポスト|posuto|postbox'],
  ];
  const K_SMALL = [
    'ッ|small tsu|ベッド|beddo|bed|Makes a short pause and doubles the next consonant.',
    'ャ|small ya|シャツ|shatsu|shirt|Joins the kana before it: シ + ャ = sha.',
    'ュ|small yu|ジュース|juusu|juice|Joins the kana before it: ジ + ュ = ju.',
    'ョ|small yo|ショップ|shoppu|shop|Joins the kana before it: シ + ョ = sho.',
    'ー|long mark|ケーキ|keeki|cake|Makes the vowel before it long: ケ + ー = kee. No sound of its own.',
  ];
  const K_YOUON = [
    ['キャ|kya|キャンプ|kyanpu|camping','キュ|kyu|バーベキュー|baabekyuu|barbecue','キョ|kyo|キョロキョロ|kyorokyoro|looking around'],
    ['シャ|sha|シャツ|shatsu|shirt','シュ|shu|シューズ|shuuzu|shoes','ショ|sho|ショップ|shoppu|shop'],
    ['チャ|cha|チャンス|chansu|chance','チュ|chu|シチュー|shichuu|stew','チョ|cho|チョコレート|chokoreeto|chocolate'],
    ['ニャ|nya|ニャー|nyaa|meow','ニュ|nyu|メニュー|menyuu|menu','ニョ|nyo|ニョキニョキ|nyokinyoki|sprouting up'],
    ['ヒャ|hya|||Rare in katakana.','ヒュ|hyu|ヒューズ|hyuuzu|fuse','ヒョ|hyo|ヒョウ|hyou|leopard'],
    ['ミャ|mya|ミャンマー|myanmaa|Myanmar','ミュ|myu|ミュージカル|myuujikaru|musical','ミョ|myo|||Rare in katakana.'],
    ['リャ|rya|||Rare in katakana.','リュ|ryu|リュック|ryukku|backpack','リョ|ryo|||Rare in katakana.'],
    ['ギャ|gya|ギャグ|gyagu|gag, joke','ギュ|gyu|ギュッと|gyutto|tightly','ギョ|gyo|ギョーザ|gyooza|dumplings'],
    ['ジャ|ja|ジャム|jamu|jam','ジュ|ju|ジュース|juusu|juice','ジョ|jo|ジョギング|jogingu|jogging'],
    ['ビャ|bya|||Rare in katakana.','ビュ|byu|レビュー|rebyuu|review','ビョ|byo|||Rare in katakana.'],
    ['ピャ|pya|||Rare in katakana.','ピュ|pyu|コンピューター|konpyuutaa|computer','ピョ|pyo|ピョンピョン|pyonpyon|hopping'],
  ];
  /* sounds only katakana has — for foreign words */
  const K_FOREIGN = [
    ['ファ|fa|ソファ|sofa|sofa','フィ|fi|フィルム|firumu|film','フェ|fe|カフェ|kafe|café'],
    ['フォ|fo|フォーク|fooku|fork','ティ|ti|パーティー|paatii|party','ディ|di|ディナー|dinaa|dinner'],
    ['トゥ|tu|タトゥー|tatuu|tattoo','ドゥ|du|ヒンドゥー|hinduu|Hindu','デュ|dyu|デュエット|dyuetto|duet'],
    ['ウィ|wi|ハロウィン|harowin|Halloween','ウェ|we|ウェブ|webu|web','ウォ|wo|ウォッチ|wotchi|watch'],
    ['シェ|she|シェフ|shefu|chef','ジェ|je|ジェット|jetto|jet','チェ|che|チェック|chekku|check'],
    ['ヴァ|va|ヴァイオリン|vaiorin|violin|Often written バ instead: バイオリン.','ヴィ|vi|ヴィーナス|viinasu|Venus','ヴ|vu|ラヴ|ravu|love|Often written ブ instead: ラブ.'],
    ['ヴェ|ve|ヴェール|veeru|veil','ヴォ|vo|ヴォーカル|vookaru|vocals','ツァ|tsa|モーツァルト|mootsaruto|Mozart'],
  ];
  window.KATAKANA_TABLES = { seion:K_SEION, dakuten:K_DAKUTEN, small:K_SMALL, youon:K_YOUON, foreign:K_FOREIGN };
})();
