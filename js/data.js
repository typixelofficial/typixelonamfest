// ==========================================
// TYPOXEL ONAM FEST 2026 DATA STORE
// ==========================================

const TypixelData = {

    user: null,

    village: {
        pookalams: [],
        discoveries: []
    },

    init() {
        try {
            const savedUser = localStorage.getItem("typixel_onam_user");
            const savedVillage = localStorage.getItem("typixel_onam_village");

            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }

            if (savedVillage) {
                this.village = JSON.parse(savedVillage);
            }

            // Create demo Pookalams if none exist
            if (!this.village.pookalams || this.village.pookalams.length === 0) {
                this.createDemoPookalams();
            }

        } catch (error) {
            console.error("TypixelData initialization error:", error);

            this.user = null;

            this.village = {
                pookalams: [],
                discoveries: []
            };

            this.createDemoPookalams();
        }
    },

    saveUser(username) {

        this.user = {
            username: username,
            joinedAt: new Date().toISOString()
        };

        localStorage.setItem(
            "typixel_onam_user",
            JSON.stringify(this.user)
        );
    },

    saveVillage() {

        localStorage.setItem(
            "typixel_onam_village",
            JSON.stringify(this.village)
        );
    },

    addPookalam(pookalam) {

        this.village.pookalams.push(pookalam);

        this.saveVillage();
    },

    createDemoPookalams() {

        const colors = [
            "#FF9933",
            "#FFD700",
            "#FFCC33",
            "#FF69B4",
            "#E63946",
            "#FFFFFF",
            "#F4A261"
        ];

        const names = [
            "Rifad",
            "Fathima",
            "Riyas",
            "Nihal",
            "Afsal",
            "Shamil",
            "Anjana",
            "Vishnu",
            "Muneer",
            "Safa",
            "Adil",
            "Hiba"
        ];

        for (let i = 0; i < 600; i++) {

            const pookalam = {

                id: i,

                x: 100 + Math.random() * 3800,

                y: 100 + Math.random() * 3800,

                username:
                    names[i % names.length] +
                    "_" +
                    Math.floor(Math.random() * 99),

                title:
                    [
                        "Kerala Blossoms",
                        "Onam Vibes",
                        "Golden Onam",
                        "Malabar Flowers",
                        "Thiruvonam",
                        "Village Pookalam"
                    ][i % 6],

                color: colors[i % colors.length],

                likes: Math.floor(Math.random() * 500),

                points: Math.floor(Math.random() * 3000)

            };

            this.village.pookalams.push(pookalam);
        }

        this.saveVillage();
    }
};


// ==========================================
// KERALA CULTURE DATA
// ==========================================

const CultureData = {

    kathakali: {

        title: "Kathakali",

        icon: "🎭",

        image: "assets/culture/kathakali.jpg",

        desc:
            "Kerala's iconic classical dance-drama, known for its elaborate makeup, costumes, expressions and storytelling."
    },

    chenda: {

        title: "Chenda Melam",

        icon: "🥁",

        image: "assets/culture/chenda.jpg",

        desc:
            "The powerful traditional percussion performance that brings Kerala festivals to life."
    },

    vallam: {

        title: "Vallam Kali",

        icon: "🛶",

        image: "assets/culture/vallamkali.jpg",

        desc:
            "The famous Kerala snake boat race, where teams row together with incredible rhythm and energy."
    },

    sadya: {

        title: "Onam Sadya",

        icon: "🍃",

        image: "assets/culture/onam-sadya.jpg",

        desc:
            "A traditional vegetarian feast served on banana leaves and one of the most beloved parts of Onam."
    },

    thiruvathira: {

        title: "Thiruvathira",

        icon: "💃",

        image: "assets/culture/thiruvathira.jpg",

        desc:
            "A graceful traditional Kerala group dance performed during festive occasions."
    },

    pulikali: {

        title: "Pulikali",

        icon: "🐯",

        image: "assets/culture/pulikali.jpg",

        desc:
            "A colourful folk performance where performers dress as tigers and dance to traditional percussion."
    }

};
