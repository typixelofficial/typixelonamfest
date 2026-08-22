// Data & State Management Layer
// Ready for Supabase migration. Currently uses localStorage.

const TypixelData = {
    user: null,
    village: {
        pookalams: [],
        discoveries: []
    },
    
    init() {
        this.loadUser();
        this.loadVillage();
        // If no mock data exists, generate it
        if (this.village.pookalams.length < 50) {
            this.generateMockVillage();
        }
    },

    // --- USER MANAGEMENT ---
    loadUser() {
        const stored = localStorage.getItem('typixel_user');
        if (stored) this.user = JSON.parse(stored);
    },

    saveUser(username) {
        this.user = {
            id: 'local-' + Date.now(),
            username: username,
            points: 0,
            rank: Math.floor(Math.random() * 100) + 1
        };
        localStorage.setItem('typixel_user', JSON.stringify(this.user));
    },

    // --- VILLAGE & POOKALAM MANAGEMENT ---
    loadVillage() {
        const stored = localStorage.getItem('typixel_village');
        if (stored) this.village = JSON.parse(stored);
    },

    saveVillage() {
        localStorage.setItem('typixel_village', JSON.stringify(this.village));
    },

    addPookalam(pookalam) {
        this.village.pookalams.push(pookalam);
        this.saveVillage();
    },

    // --- MOCK DATA GENERATOR ---
    generateMockVillage() {
        const names = ["Riyas", "Fathima", "Nihal", "Rifad", "Shamil", "Afsal", "Anu", "Rahul"];
        const titles = ["Onam Vibes", "Malabar Dreams", "Festive Joy", "Kerala Roots", "Floral Magic"];
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8', '#FFBF33'];
        
        // Generate 200 mock pookalams clustered around courtyards
        for (let i = 0; i < 200; i++) {
            const courtyardX = Math.floor(Math.random() * 8) * 400 + 200;
            const courtyardY = Math.floor(Math.random() * 8) * 400 + 200;
            
            this.village.pookalams.push({
                id: 'mock-' + i,
                username: '@' + names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 99),
                title: titles[Math.floor(Math.random() * titles.length)],
                x: courtyardX + (Math.random() * 200 - 100),
                y: courtyardY + (Math.random() * 200 - 100),
                color: colors[Math.floor(Math.random() * colors.length)],
                likes: Math.floor(Math.random() * 500),
                points: Math.floor(Math.random() * 5000)
            });
        }
        this.saveVillage();
    },

    // --- SUPABASE READY STUBS ---
    // supabase.from('pookalams').select('*')
    async fetchPookalams() {
        return this.village.pookalams;
    }
};

// Culture Data
const CultureData = {
    chenda: { icon: "🥁", title: "Chenda", desc: "A traditional Kerala percussion instrument commonly heard during festivals and temple ceremonies." },
    kathakali: { icon: "🎭", title: "Kathakali", desc: "A major form of classical Indian dance, distinguished by elaborate colorful makeup, face masks, and costumes." },
    vallam: { icon: "🛶", title: "Vallam Kali", desc: "The traditional boat race of Kerala, featuring long snake boats (Chundan Vallams) rowed by teams of rowers." },
    sadya: { icon: "🍃", title: "Onam Sadya", desc: "A grand feast of Kerala served on a banana leaf, featuring a variety of vegetarian dishes during Onam." }
};
