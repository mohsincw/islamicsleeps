export interface Story {
  id: string;
  title: string;
  ageGroup: "toddler" | "kids" | "all";
  theme: string;
  preview: string;
  content: string;
  moral: string;
}

export const stories: Story[] = [
  {
    id: "trust-in-allah-1",
    title: "The Little Sparrow's Trust",
    ageGroup: "toddler",
    theme: "Tawakkul (Trust in Allah)",
    preview:
      "A tiny sparrow teaches a young boy about trusting in Allah's plan...",
    content: `Once upon a time, in a small village surrounded by green hills, there lived a little boy named Yusuf. Yusuf loved watching the birds that flew near his window every morning.

One cold winter day, Yusuf noticed a tiny sparrow sitting on his windowsill. The sparrow looked hungry and cold. "Poor little bird," Yusuf whispered. "How will you find food in this cold weather?"

The sparrow tilted its head and chirped softly, as if to say, "Don't worry about me!"

Yusuf's grandmother, who was sitting nearby, smiled warmly. "Do you know, Yusuf, that the Prophet Muhammad, peace be upon him, told us that if we truly trust in Allah the way the birds do, He would provide for us just as He provides for them?"

"Really, Grandma?" Yusuf asked with wide eyes.

"Yes, my dear. Every morning, the birds leave their nests with empty stomachs, not knowing where their food will come from. But they trust that Allah will take care of them. And every evening, they return with full bellies."

Yusuf looked at the sparrow again. Despite the cold, it seemed peaceful and content. Yusuf smiled and placed some breadcrumbs on the windowsill. The sparrow chirped happily and ate.

From that day on, whenever Yusuf felt worried about anything, he would remember the little sparrow and whisper, "I trust in You, Ya Allah, just like the sparrow does."

And every morning, the sparrow would return to Yusuf's window, reminding him that Allah always takes care of those who trust in Him.`,
    moral:
      "Tawakkul - Trusting in Allah means doing your best and then believing that Allah will take care of the rest, just like the birds who leave their nests every morning trusting in His provision.",
  },
  {
    id: "kindness-2",
    title: "Amina and the Thirsty Cat",
    ageGroup: "toddler",
    theme: "Kindness to Animals",
    preview:
      "Little Amina learns the reward of being kind to all of Allah's creatures...",
    content: `In a sunny town with dusty streets and tall palm trees, there lived a cheerful girl named Amina. She had bright eyes and a smile that made everyone around her happy.

One hot afternoon, as Amina walked home from the masjid with her mother, she heard a soft meowing sound. She looked down and saw a small, thin cat sitting by the side of the road. Its tongue was out, and it looked very, very thirsty.

"Mama, look! The poor kitty needs water!" Amina said, tugging on her mother's hand.

Her mother looked at the cat and smiled. "You're right, habibti. What would you like to do?"

Amina thought for a moment. She looked at her own water bottle — it was still half full. Without hesitating, she knelt down and carefully poured some water into her cupped hand for the cat to drink.

The cat lapped up the water gratefully, then rubbed against Amina's leg, purring softly.

"Mama, did I do a good thing?" Amina asked.

Her mother hugged her. "A very good thing, my love. The Prophet Muhammad, peace be upon him, told us a beautiful story about a woman who gave water to a thirsty dog and Allah forgave all her sins because of her kindness."

Amina's eyes grew wide. "Just for giving water?"

"Yes, because Allah loves those who show mercy to His creatures — big or small. Every living thing deserves kindness, and Allah sees every good deed, no matter how small it seems."

Amina looked at the cat, which now looked much happier and content. She felt a warm glow in her heart — the kind of warmth that comes from doing something good.

From that day on, Amina always kept a little extra water in her bottle, just in case she met another thirsty friend on her way home.`,
    moral:
      "Showing mercy and kindness to all of Allah's creatures, no matter how small, is a beloved deed in the sight of Allah.",
  },
  {
    id: "honesty-3",
    title: "The Merchant's Golden Coin",
    ageGroup: "kids",
    theme: "Honesty (Sidq)",
    preview:
      "Young Ibrahim finds a gold coin and must choose between keeping it and doing the right thing...",
    content: `In the bustling city of old Baghdad, where merchants sold spices, silks, and sparkling jewels, there lived a young boy named Ibrahim. He helped his father at their small bread stall in the marketplace.

One busy Friday afternoon, as Ibrahim swept the ground near their stall, something shiny caught his eye. He bent down and picked up a gleaming gold coin! Ibrahim's heart raced with excitement. A gold coin was worth more than his father earned in a whole week.

"I could buy so many things with this," Ibrahim whispered to himself. He could buy the wooden sword he'd been eyeing, or the honey cakes from the baker next door, or even a new pair of shoes.

He quickly slipped the coin into his pocket. But as he did, he remembered something his father always told him: "Ya Ibrahim, a Muslim's greatest treasure is not gold or silver — it is his honesty. The Prophet Muhammad, peace be upon him, was known as Al-Amin, the Trustworthy, even before he received revelation."

Ibrahim looked around the marketplace. He noticed an old merchant a few stalls down, patting his pockets anxiously and looking at the ground. The man seemed worried.

Ibrahim felt a tug in his heart. He knew what he had to do.

He walked up to the old merchant and said, "Excuse me, uncle. Did you lose something?"

The old man looked at him with hopeful eyes. "Yes, my boy! A gold coin — it must have fallen from my pocket. It was meant to buy medicine for my sick wife."

Ibrahim reached into his pocket and held out the shining coin. "Is this yours?"

The merchant's eyes filled with tears. "Yes! Jazak Allahu khairan, my dear boy. You have no idea what this means to me."

The merchant reached into his bag and pulled out a small pouch. "Please, take these silver coins as a reward for your honesty."

Ibrahim shook his head gently. "No, thank you, uncle. I didn't return it for a reward. I returned it because it was the right thing to do."

The old merchant smiled and placed his hand on Ibrahim's head. "May Allah bless you, child. Your parents have raised you well."

That evening, when Ibrahim told his father what happened, his father's eyes glistened with pride. "You chose something worth more than gold today, my son. You chose your honesty. And that is something no one can ever take from you."

Ibrahim smiled, feeling richer than any merchant in all of Baghdad.`,
    moral:
      "Honesty (Sidq) is one of the greatest virtues in Islam. The Prophet Muhammad (peace be upon him) was known as Al-Amin (The Trustworthy). True wealth lies not in gold, but in good character.",
  },
  {
    id: "patience-4",
    title: "The Garden That Waited",
    ageGroup: "kids",
    theme: "Patience (Sabr)",
    preview:
      "Two brothers plant gardens and learn that beautiful things take time to grow...",
    content: `In a peaceful village at the foot of a mountain, there lived two brothers: Hassan and Hussain. They were twins, but as different as the sun and the moon.

One spring morning, their father gave each of them a small plot of land and a pouch of seeds. "Plant your gardens, my sons," he said. "Take care of them, and see what grows."

Hassan was excited. He planted all his seeds in one afternoon, watered them heavily, and then sat down to wait. The next morning, he ran to his garden. Nothing had grown. The morning after that — still nothing.

"This is useless!" Hassan grumbled after only a week. He stopped watering his garden and went off to play instead.

Hussain, on the other hand, planted his seeds carefully, one by one. Each morning, he woke up early, before Fajr prayer, and watered his garden gently. He pulled out the weeds. He made sure each plant had enough sunlight.

Days passed. Weeks passed. Hussain's garden didn't look like much at first — just tiny green shoots poking through the soil. But Hussain didn't give up.

"Aren't you tired of waiting?" Hassan teased him.

Hussain smiled. "The Quran tells us that 'Indeed, Allah is with the patient.' If Allah is with me, then I have nothing to worry about."

One month later, something amazing happened. Hussain's garden burst into color — red tomatoes, green cucumbers, golden sunflowers, and fragrant herbs filled his little plot. The whole village came to admire it.

Hassan looked at his own plot — dry, empty, and forgotten. He felt a pang of regret.

Their father put one arm around each son. "Do you see, my boys? Hussain's garden didn't grow because he had better seeds. It grew because he had sabr — patience. He showed up every day, trusted in Allah's timing, and never gave up."

Hassan nodded slowly. "Can I start again, Baba?"

"Of course," his father smiled. "It's never too late to plant seeds — in the ground or in your heart."

This time, Hassan worked alongside his brother. And though his garden took time, with patience and perseverance, it too began to bloom. The brothers tended their gardens side by side, and the village said their gardens were the most beautiful in the entire valley.`,
    moral:
      "Sabr (patience) is a cornerstone of faith. Beautiful things — whether gardens, goals, or good character — take time and consistent effort. Allah is always with those who are patient.",
  },
  {
    id: "gratitude-5",
    title: "Layla and the Jar of Stars",
    ageGroup: "kids",
    theme: "Gratitude (Shukr)",
    preview:
      "A girl who always wants more discovers the magic of counting her blessings...",
    content: `Layla had a beautiful room, lots of toys, and a loving family. But Layla always wanted more. When she got a new dress, she wished it was a different color. When her mother made her favorite meal, she complained it wasn't enough.

"I wish I had what Fatima has," she would say about her neighbor. "She has a bigger house." Or, "I wish I had Sara's bike — mine is too old."

One evening, after Layla had spent the whole day complaining, her grandmother came to visit. Grandma Zahra was wise and gentle, with silver hair and warm, knowing eyes.

"Layla, my habibti," Grandma Zahra said, pulling out an empty glass jar and a bag of small, golden star stickers. "I have a challenge for you."

"What kind of challenge?" Layla asked, curious despite herself.

"For the next thirty days — the length of Ramadan — I want you to add one star to this jar every time you notice something you're thankful for. It can be anything: a sunny day, a kind word, your mother's cooking, the sound of birds. Anything at all."

"That sounds too easy," Layla said, rolling her eyes.

"Then it should be no trouble at all," Grandma Zahra smiled.

The first few days were hard. Layla was so used to noticing what she didn't have that she almost forgot to look for things she did have.

But slowly, something changed. She noticed the way the morning light made her room glow golden. Star. She noticed her little brother's giggly laugh when she played with him. Star. She noticed the delicious warmth of her mother's soup on a cold day. Star.

By the end of the first week, Layla was adding three or four stars a day. By the second week, she could barely keep up — the blessings were everywhere!

She noticed the cool breeze during her walk to school. The smile of her teacher when she answered correctly. The feeling of peace during prayer. The taste of cold water after playing outside.

By the thirtieth day, the jar was overflowing with golden stars. Layla held it up to the window, and the light made each star sparkle like real ones in the sky.

"Grandma, look!" Layla exclaimed, her eyes shining. "I never realized how much I have."

Grandma Zahra hugged her tightly. "Allah tells us in the Quran: 'If you are grateful, I will surely increase you in favor.' When we open our eyes to the blessings already around us, we find that we are richer than we ever imagined."

Layla kept her jar of stars on her bedside table. And every night before sleep, she would look at it and whisper, "Alhamdulillah — all praise is for Allah," feeling truly, deeply grateful.`,
    moral:
      "Shukr (gratitude) transforms how we see the world. When we count our blessings instead of our complaints, we discover that Allah's generosity surrounds us in every moment.",
  },
  {
    id: "forgiveness-6",
    title: "The Bridge Between Brothers",
    ageGroup: "all",
    theme: "Forgiveness (Afw)",
    preview:
      "After a painful argument, two friends discover the healing power of forgiveness...",
    content: `Bilal and Tariq had been best friends since they were five years old. They walked to school together, prayed together at the masjid, and spent every weekend exploring the hills near their village. Everyone said they were like brothers.

But one day, something happened that nearly broke their friendship forever.

It started during a football match at school. Tariq accidentally tripped Bilal during the game, causing him to fall and scrape his knee badly. The other kids laughed, and Bilal felt humiliated.

"You did that on purpose!" Bilal shouted, his face red with anger and embarrassment.

"It was an accident, wallahi!" Tariq pleaded.

But Bilal wouldn't listen. He stormed off and refused to speak to Tariq. Days turned into weeks. Weeks turned into a month. The two boys who were once inseparable now walked on opposite sides of the street.

Tariq tried everything — he sent notes, he asked mutual friends to help, he even left Bilal's favorite snack at his door. But Bilal's heart had hardened with anger.

One Friday, the imam at the masjid gave a khutbah about forgiveness. He told the story of the Prophet Muhammad, peace be upon him, and how he forgave the people of Makkah — the very people who had persecuted him, thrown stones at him, and driven him from his home.

"When the Prophet entered Makkah victorious," the imam said, "he could have taken revenge. Instead, he said, 'Go, you are all free.' He chose mercy over anger, forgiveness over revenge."

The imam continued, "Holding onto anger is like holding a burning coal — it only burns the one who holds it. Allah tells us in the Quran: 'Let them pardon and overlook. Would you not like that Allah should forgive you?'"

Bilal sat very still. He thought about the past month — how heavy his heart had felt, how lonely his walks to school had become, how much he missed his friend's laugh.

After the prayer, Bilal saw Tariq walking out of the masjid alone, his head down. Before he could think twice, Bilal called out, "Tariq!"

Tariq turned, surprised. Bilal walked up to him, his eyes glistening. "I'm sorry, akhi. I've been holding onto this anger for too long. I know it was an accident. Will you forgive me for being so stubborn?"

Tariq's eyes filled with tears. "Of course I forgive you. I missed you so much. Will you forgive me too?"

The two boys embraced, right there in front of the masjid, and it felt like a weight had been lifted from both their shoulders.

That evening, they sat on their favorite hilltop, watching the sunset paint the sky in shades of orange and purple.

"You know," Bilal said quietly, "forgiving you wasn't just for your sake. It freed me too."

Tariq nodded. "Maybe that's why Allah loves those who forgive — because forgiveness heals the one who gives it just as much as the one who receives it."

They sat in comfortable silence, two brothers reunited, grateful for the mercy that flowed between them — a small reflection of the infinite mercy of their Lord.`,
    moral:
      "Forgiveness (Afw) is one of the most powerful acts in Islam. The Prophet Muhammad (peace be upon him) showed us that true strength lies not in retaliation, but in the courage to forgive. When we forgive others, we free ourselves.",
  },
];
