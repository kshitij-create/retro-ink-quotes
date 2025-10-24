"""
Seed data for anime, characters, and quotes
"""

# Anime Series Data
anime_data = [
    {
        "name": "ONE PIECE",
        "slug": "one-piece",
        "japanese_name": "ワンピース",
        "description": "Follow Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger. The famous mystery treasure named 'One Piece'.",
        "release_year": 1999
    },
    {
        "name": "NARUTO",
        "slug": "naruto",
        "japanese_name": "ナルト",
        "description": "Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village.",
        "release_year": 2002
    },
    {
        "name": "BLEACH",
        "slug": "bleach",
        "japanese_name": "ブリーチ",
        "description": "High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers and takes on the duties of defending humans from evil spirits.",
        "release_year": 2004
    },
    {
        "name": "HUNTER × HUNTER",
        "slug": "hunter-x-hunter",
        "japanese_name": "ハンター×ハンター",
        "description": "Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks his father who left him when he was younger.",
        "release_year": 1999
    },
    {
        "name": "YU YU HAKUSHO",
        "slug": "yu-yu-hakusho",
        "japanese_name": "幽☆遊☆白書",
        "description": "After a teenage delinquent is killed saving a child's life, he is given a second chance at life by the spiritual realm.",
        "release_year": 1992
    },
    {
        "name": "DRAGON BALL Z",
        "slug": "dragon-ball-z",
        "japanese_name": "ドラゴンボールZ",
        "description": "The adventures of Earth's martial arts defender Son Goku continue with a new family and the revelation of his alien origin.",
        "release_year": 1989
    },
    {
        "name": "ATTACK ON TITAN",
        "slug": "attack-on-titan",
        "japanese_name": "進撃の巨人",
        "description": "Humans are nearly exterminated by giant creatures called Titans. Titans are typically several stories tall and eat humans without any remorse.",
        "release_year": 2013
    },
    {
        "name": "DEMON SLAYER",
        "slug": "demon-slayer",
        "japanese_name": "鬼滅の刃",
        "description": "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.",
        "release_year": 2019
    }
]

# Characters Data
characters_data = [
    # One Piece Characters
    {
        "name": "Monkey D. Luffy",
        "slug": "monkey-d-luffy",
        "japanese_name": "モンキー・D・ルフィ",
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "bio": "The captain of the Straw Hat Pirates who dreams of becoming the Pirate King by finding the legendary treasure One Piece.",
        "role": "protagonist"
    },
    {
        "name": "Roronoa Zoro",
        "slug": "roronoa-zoro",
        "japanese_name": "ロロノア・ゾロ",
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "bio": "A swordsman who wields three swords and dreams of becoming the world's greatest swordsman.",
        "role": "protagonist"
    },
    {
        "name": "Nami",
        "slug": "nami",
        "japanese_name": "ナミ",
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "bio": "The navigator of the Straw Hat Pirates who dreams of drawing a map of the entire world.",
        "role": "protagonist"
    },
    {
        "name": "Vinsmoke Sanji",
        "slug": "vinsmoke-sanji",
        "japanese_name": "サンジ",
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "bio": "The cook of the Straw Hat Pirates who dreams of finding the All Blue, a legendary sea.",
        "role": "protagonist"
    },
    {
        "name": "Trafalgar Law",
        "slug": "trafalgar-law",
        "japanese_name": "トラファルガー・ロー",
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "bio": "The captain and doctor of the Heart Pirates, known as the 'Surgeon of Death'.",
        "role": "supporting"
    },
    
    # Naruto Characters
    {
        "name": "Naruto Uzumaki",
        "slug": "naruto-uzumaki",
        "japanese_name": "うずまきナルト",
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "bio": "A young ninja who seeks recognition and dreams of becoming the Hokage, the leader of his village.",
        "role": "protagonist"
    },
    {
        "name": "Sasuke Uchiha",
        "slug": "sasuke-uchiha",
        "japanese_name": "うちはサスケ",
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "bio": "The last surviving member of the Uchiha clan seeking revenge for his clan's destruction.",
        "role": "protagonist"
    },
    {
        "name": "Kakashi Hatake",
        "slug": "kakashi-hatake",
        "japanese_name": "はたけカカシ",
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "bio": "Team 7's leader and Konoha's most talented ninja, known as the Copy Ninja.",
        "role": "supporting"
    },
    {
        "name": "Itachi Uchiha",
        "slug": "itachi-uchiha",
        "japanese_name": "うちはイタチ",
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "bio": "Sasuke's older brother and a former Anbu captain who massacred the Uchiha clan.",
        "role": "antagonist"
    },
    
    # Bleach Characters
    {
        "name": "Ichigo Kurosaki",
        "slug": "ichigo-kurosaki",
        "japanese_name": "黒崎一護",
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "bio": "A teenager who gained Soul Reaper powers and protects humans from evil spirits.",
        "role": "protagonist"
    },
    {
        "name": "Rukia Kuchiki",
        "slug": "rukia-kuchiki",
        "japanese_name": "朽木ルキア",
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "bio": "A Soul Reaper who transfers her powers to Ichigo Kurosaki.",
        "role": "protagonist"
    },
    {
        "name": "Byakuya Kuchiki",
        "slug": "byakuya-kuchiki",
        "japanese_name": "朽木白哉",
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "bio": "The captain of the 6th Division and Rukia's adoptive brother.",
        "role": "supporting"
    },
    
    # Hunter x Hunter Characters
    {
        "name": "Gon Freecss",
        "slug": "gon-freecss",
        "japanese_name": "ゴン＝フリークス",
        "anime": "HUNTER × HUNTER",
        "anime_slug": "hunter-x-hunter",
        "bio": "A young boy who becomes a Hunter to find his father.",
        "role": "protagonist"
    },
    {
        "name": "Killua Zoldyck",
        "slug": "killua-zoldyck",
        "japanese_name": "キルア＝ゾルディック",
        "anime": "HUNTER × HUNTER",
        "anime_slug": "hunter-x-hunter",
        "bio": "Gon's best friend from a family of assassins.",
        "role": "protagonist"
    },
    
    # Yu Yu Hakusho Characters
    {
        "name": "Yusuke Urameshi",
        "slug": "yusuke-urameshi",
        "japanese_name": "浦飯幽助",
        "anime": "YU YU HAKUSHO",
        "anime_slug": "yu-yu-hakusho",
        "bio": "A teenage delinquent who becomes a Spirit Detective after being given a second chance at life.",
        "role": "protagonist"
    },
    
    # Dragon Ball Z Characters
    {
        "name": "Son Goku",
        "slug": "son-goku",
        "japanese_name": "孫悟空",
        "anime": "DRAGON BALL Z",
        "anime_slug": "dragon-ball-z",
        "bio": "A Saiyan warrior who protects Earth from powerful villains.",
        "role": "protagonist"
    },
    {
        "name": "Vegeta",
        "slug": "vegeta",
        "japanese_name": "ベジータ",
        "anime": "DRAGON BALL Z",
        "anime_slug": "dragon-ball-z",
        "bio": "The Prince of Saiyans and Goku's rival who later becomes an ally.",
        "role": "protagonist"
    },
    
    # Attack on Titan Characters
    {
        "name": "Eren Yeager",
        "slug": "eren-yeager",
        "japanese_name": "エレン・イェーガー",
        "anime": "ATTACK ON TITAN",
        "anime_slug": "attack-on-titan",
        "bio": "A young man who vows to eliminate the Titans after they destroy his hometown.",
        "role": "protagonist"
    },
    {
        "name": "Levi Ackerman",
        "slug": "levi-ackerman",
        "japanese_name": "リヴァイ・アッカーマン",
        "anime": "ATTACK ON TITAN",
        "anime_slug": "attack-on-titan",
        "bio": "Humanity's strongest soldier and captain of the Survey Corps.",
        "role": "supporting"
    },
    
    # Demon Slayer Characters
    {
        "name": "Tanjiro Kamado",
        "slug": "tanjiro-kamado",
        "japanese_name": "竈門炭治郎",
        "anime": "DEMON SLAYER",
        "anime_slug": "demon-slayer",
        "bio": "A kind-hearted boy who becomes a demon slayer to cure his sister and avenge his family.",
        "role": "protagonist"
    },
    {
        "name": "Nezuko Kamado",
        "slug": "nezuko-kamado",
        "japanese_name": "竈門禰豆子",
        "anime": "DEMON SLAYER",
        "anime_slug": "demon-slayer",
        "bio": "Tanjiro's younger sister who was turned into a demon but retains her humanity.",
        "role": "protagonist"
    }
]

# Quotes Data
quotes_data = [
    # One Piece Quotes
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Monkey D. Luffy",
        "character_slug": "monkey-d-luffy",
        "text": "I don't want to conquer anything. I just think the guy with the most freedom in this whole ocean is the Pirate King!",
        "category": "freedom",
        "japanese_title": "ワンピース",
        "featured": True
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Monkey D. Luffy",
        "character_slug": "monkey-d-luffy",
        "text": "If you don't take risks, you can't create a future!",
        "category": "motivation",
        "japanese_title": "ワンピース",
        "featured": True
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Roronoa Zoro",
        "character_slug": "roronoa-zoro",
        "text": "When the world shoves you around, you just gotta stand up and shove back. It's not like somebody's gonna save you if you start babbling excuses.",
        "category": "motivation",
        "japanese_title": "ワンピース",
        "featured": False
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Roronoa Zoro",
        "character_slug": "roronoa-zoro",
        "text": "I'm going to be the world's greatest swordsman! All I have left is my destiny! My name may be infamous...but it's gonna shake the world!",
        "category": "determination",
        "japanese_title": "ワンピース",
        "featured": False
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Nami",
        "character_slug": "nami",
        "text": "Life is like a pencil that will surely run out, but will leave the beautiful writing of life.",
        "category": "wisdom",
        "japanese_title": "ワンピース",
        "featured": False
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Vinsmoke Sanji",
        "character_slug": "vinsmoke-sanji",
        "text": "When do you think people die? When they are shot through the heart by the bullet of a pistol? No. When they are ravaged by an incurable disease? No... It's when they're forgotten!",
        "category": "wisdom",
        "japanese_title": "ワンピース",
        "featured": False
    },
    {
        "anime": "ONE PIECE",
        "anime_slug": "one-piece",
        "character": "Trafalgar Law",
        "character_slug": "trafalgar-law",
        "text": "If you think I'm gonna trust you just because we're in an alliance, you're mistaken!",
        "category": "battle",
        "japanese_title": "ワンピース",
        "featured": False
    },
    
    # Naruto Quotes
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Naruto Uzumaki",
        "character_slug": "naruto-uzumaki",
        "text": "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.",
        "category": "motivation",
        "japanese_title": "ナルト",
        "featured": True
    },
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Naruto Uzumaki",
        "character_slug": "naruto-uzumaki",
        "text": "I'm not gonna run away, I never go back on my word! That's my nindo: my ninja way!",
        "category": "determination",
        "japanese_title": "ナルト",
        "featured": False
    },
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Sasuke Uchiha",
        "character_slug": "sasuke-uchiha",
        "text": "I have long since closed my eyes... My only goal is in the darkness.",
        "category": "darkness",
        "japanese_title": "ナルト",
        "featured": False
    },
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Kakashi Hatake",
        "character_slug": "kakashi-hatake",
        "text": "In the ninja world, those who break the rules are scum, that's true. But those who abandon their friends are worse than scum.",
        "category": "friendship",
        "japanese_title": "ナルト",
        "featured": True
    },
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Itachi Uchiha",
        "character_slug": "itachi-uchiha",
        "text": "People's lives don't end when they die. It ends when they lose faith.",
        "category": "wisdom",
        "japanese_title": "ナルト",
        "featured": True
    },
    {
        "anime": "NARUTO",
        "anime_slug": "naruto",
        "character": "Itachi Uchiha",
        "character_slug": "itachi-uchiha",
        "text": "Those who forgive themselves, and are able to accept their true nature... They are the strong ones!",
        "category": "wisdom",
        "japanese_title": "ナルト",
        "featured": False
    },
    
    # Bleach Quotes
    {
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "character": "Ichigo Kurosaki",
        "character_slug": "ichigo-kurosaki",
        "text": "We are all like fireworks. We climb, shine and always go our separate ways and become further apart.",
        "category": "wisdom",
        "japanese_title": "ブリーチ",
        "featured": True
    },
    {
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "character": "Ichigo Kurosaki",
        "character_slug": "ichigo-kurosaki",
        "text": "If fate is a millstone, then we are the grist. There is nothing we can do. So I wish for strength. If I cannot protect them from the wheel, then give me a strong blade, and enough strength to shatter fate.",
        "category": "determination",
        "japanese_title": "ブリーチ",
        "featured": False
    },
    {
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "character": "Rukia Kuchiki",
        "character_slug": "rukia-kuchiki",
        "text": "We can't waste time worrying about the what-ifs.",
        "category": "wisdom",
        "japanese_title": "ブリーチ",
        "featured": False
    },
    {
        "anime": "BLEACH",
        "anime_slug": "bleach",
        "character": "Byakuya Kuchiki",
        "character_slug": "byakuya-kuchiki",
        "text": "The difference in strength... what about it? Do you believe that there is no chance that someone who is weak can win against someone who is strong?",
        "category": "battle",
        "japanese_title": "ブリーチ",
        "featured": False
    },
    
    # Hunter x Hunter Quotes
    {
        "anime": "HUNTER × HUNTER",
        "anime_slug": "hunter-x-hunter",
        "character": "Gon Freecss",
        "character_slug": "gon-freecss",
        "text": "I can't stand it when someone's value is judged by their birth or their talent.",
        "category": "wisdom",
        "japanese_title": "ハンター×ハンター",
        "featured": False
    },
    {
        "anime": "HUNTER × HUNTER",
        "anime_slug": "hunter-x-hunter",
        "character": "Killua Zoldyck",
        "character_slug": "killua-zoldyck",
        "text": "I'm not going to be anyone's assassin anymore. I'm just gonna be me.",
        "category": "freedom",
        "japanese_title": "ハンター×ハンター",
        "featured": False
    },
    
    # Yu Yu Hakusho Quotes
    {
        "anime": "YU YU HAKUSHO",
        "anime_slug": "yu-yu-hakusho",
        "character": "Yusuke Urameshi",
        "character_slug": "yusuke-urameshi",
        "text": "The only way to truly escape the mundane is for you to constantly be evolving.",
        "category": "motivation",
        "japanese_title": "幽☆遊☆白書",
        "featured": False
    },
    
    # Dragon Ball Z Quotes
    {
        "anime": "DRAGON BALL Z",
        "anime_slug": "dragon-ball-z",
        "character": "Son Goku",
        "character_slug": "son-goku",
        "text": "Power comes in response to a need, not a desire. You have to create that need.",
        "category": "motivation",
        "japanese_title": "ドラゴンボールZ",
        "featured": True
    },
    {
        "anime": "DRAGON BALL Z",
        "anime_slug": "dragon-ball-z",
        "character": "Vegeta",
        "character_slug": "vegeta",
        "text": "I do not fear this new challenge. Rather like a true warrior I will rise to meet it.",
        "category": "determination",
        "japanese_title": "ドラゴンボールZ",
        "featured": False
    },
    
    # Attack on Titan Quotes
    {
        "anime": "ATTACK ON TITAN",
        "anime_slug": "attack-on-titan",
        "character": "Eren Yeager",
        "character_slug": "eren-yeager",
        "text": "If you win, you live. If you lose, you die. If you don't fight, you can't win!",
        "category": "determination",
        "japanese_title": "進撃の巨人",
        "featured": True
    },
    {
        "anime": "ATTACK ON TITAN",
        "anime_slug": "attack-on-titan",
        "character": "Levi Ackerman",
        "character_slug": "levi-ackerman",
        "text": "The difference between your decision and ours is experience. But you don't have to rely on that.",
        "category": "wisdom",
        "japanese_title": "進撃の巨人",
        "featured": False
    },
    
    # Demon Slayer Quotes
    {
        "anime": "DEMON SLAYER",
        "anime_slug": "demon-slayer",
        "character": "Tanjiro Kamado",
        "character_slug": "tanjiro-kamado",
        "text": "No matter how many people you may lose, you have no choice but to go on living.",
        "category": "wisdom",
        "japanese_title": "鬼滅の刃",
        "featured": True
    },
    {
        "anime": "DEMON SLAYER",
        "anime_slug": "demon-slayer",
        "character": "Nezuko Kamado",
        "character_slug": "nezuko-kamado",
        "text": "I'll protect my brother no matter what!",
        "category": "friendship",
        "japanese_title": "鬼滅の刃",
        "featured": False
    }
]
