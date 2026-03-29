export interface Dua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  category: string;
}

export const duas: Dua[] = [
  {
    id: "before-sleep-1",
    title: "Before Sleeping",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live.",
    reference: "Sahih al-Bukhari 6324",
    category: "Bedtime",
  },
  {
    id: "before-sleep-2",
    title: "Seeking Refuge Before Sleep",
    arabic:
      "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
    transliteration: "Allahumma qini 'adhabaka yawma tab'athu 'ibadak",
    translation:
      "O Allah, protect me from Your punishment on the Day You resurrect Your servants.",
    reference: "Sunan Abu Dawud 5045",
    category: "Bedtime",
  },
  {
    id: "before-sleep-3",
    title: "Entrusting Yourself to Allah",
    arabic:
      "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ",
    transliteration:
      "Allahumma aslamtu nafsi ilayk, wa fawwadtu amri ilayk, wa wajjahtu wajhi ilayk, wa alja'tu dhahri ilayk",
    translation:
      "O Allah, I submit myself to You, entrust my affairs to You, turn my face to You, and lean my back on You for support.",
    reference: "Sahih al-Bukhari 6311",
    category: "Bedtime",
  },
  {
    id: "upon-waking-1",
    title: "Upon Waking Up",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration:
      "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation:
      "All praise is for Allah who gave us life after causing us to die, and to Him is the resurrection.",
    reference: "Sahih al-Bukhari 6312",
    category: "Waking Up",
  },
  {
    id: "protection-1",
    title: "Ayatul Kursi (The Verse of the Throne)",
    arabic:
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ",
    transliteration:
      "Allahu la ilaha illa Huwal-Hayyul-Qayyum. La ta'khudhuhu sinatun wa la nawm",
    translation:
      "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.",
    reference: "Surah Al-Baqarah 2:255",
    category: "Protection",
  },
  {
    id: "gratitude-1",
    title: "Gratitude for the Day",
    arabic:
      "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ، فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ",
    transliteration:
      "Allahumma ma asbaha bi min ni'matin aw bi-ahadin min khalqika faminka wahdaka la sharika lak, falakal-hamdu wa lakash-shukr",
    translation:
      "O Allah, whatever blessing I or any of Your creation have risen upon, is from You alone without partner. So for You is all praise and to You all thanks.",
    reference: "Sunan Abu Dawud 5073",
    category: "Gratitude",
  },
  {
    id: "anxiety-1",
    title: "For Worry and Anxiety",
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
    transliteration:
      "Allahumma inni a'udhu bika minal-hammi wal-hazan",
    translation:
      "O Allah, I seek refuge in You from worry and grief.",
    reference: "Sahih al-Bukhari 6369",
    category: "Comfort",
  },
];
