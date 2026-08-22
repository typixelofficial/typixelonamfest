const TypixelData = {
    user: null,
    village: { pookalams: [], discoveries: [] },
    
    init() {
        this.loadUser();
        this.loadVillage();
        if (this.village.pookalams.length < 50) this.generateMockVillage();
    },
    loadUser() {
        const stored = localStorage.getItem('typixel_user');
        if (stored) this.user = JSON.parse(stored);
    },
    saveUser(username) {
        this.user = { id: 'local-' + Date.now(), username: username, points: 100, rank: 1 };
        localStorage.setItem('typixel_user', JSON.stringify(this.user));
    },
    loadVillage() {
        const stored = localStorage.getItem('typixel_village');
        if (stored) this.village = JSON.parse(stored);
    },
    saveVillage() {
        localStorage.setItem('typixel_village', JSON.stringify(this.village));
    },
    addPookalam(p) {
        this.village.pookalams.push(p);
        this.saveVillage();
    },
    generateMockVillage() {
        const names = ["Riyas", "Fathima", "Nihal", "Rifad", "Shamil", "Afsal"];
        const pookalamImages = [
            "assets/images/pookalam/pookalam-01.webp",
            "assets/images/pookalam/pookalam-02.webp",
            "assets/images/pookalam/pookalam-03.webp"
        ];
        for (let i = 0; i < 150; i++) {
            this.village.pookalams.push({
                id: 'mock-' + i,
                username: '@' + names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99),
                x: Math.floor(Math.random() * 4000),
                y: Math.floor(Math.random() * 4000),
                image: pookalamImages[i % pookalamImages.length],
                likes: Math.floor(Math.random() * 500)
            });
        }
        this.saveVillage();
    }
};

const CultureData = {
    kathakali: {
        title: "Kathakali", malayalam: "കഥകളി",
        image: "assets/images/culture/kathakali.webp",
        description: "A classical dance-drama tradition of Kerala known for elaborate costumes, expressive makeup and storytelling.",
        fact: "Kathakali combines dance, acting, music, costume and facial expression."
    },
    pulikali: {
        title: "Pulikali", malayalam: "പുലിക്കളി",
        image: "assets/images/culture/pulikali.webp",
        description: "A recreational folk art performed during Onam where performers are painted as tigers.",
        fact: "Pulikali means 'play of the tigers' and features loud drum beats."
    },
    vallamkali: {
        title: "Vallamkali", malayalam: "വള്ളംകളി",
        image: "assets/images/vallam/snake-boat-race.webp",
        description: "The traditional boat race of Kerala, featuring long snake boats rowed by teams of rowers.",
        fact: "The snake boats (Chundan Vallam) can carry over 100 rowers."
    },
    sadya: {
        title: "Onasadya", malayalam: "ഓണസദ്യ",
        image: "assets/images/sadya/onam-sadya.webp",
        description: "A grand feast of Kerala served on a banana leaf, featuring a variety of vegetarian dishes during Onam.",
        fact: "A traditional Sadya can have up to 26 different dishes served on a single leaf."
    }
};
