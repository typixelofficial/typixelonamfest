// Village Logic: Level of Detail, Culture Modals, Live Feed
const VillageUI = {
    mapEngine: null,
    pookalamLayer: null,
    
    init() {
        if(!document.getElementById('village-world')) return;
        
        this.pookalamLayer = document.getElementById('pookalam-layer');
        this.mapEngine = new VillageMapEngine('map-container', 'village-world');
        
        this.renderDiscoveries();
        this.renderLiveFeed();
        this.updateLOD(this.mapEngine.scale); // Initial render
        
        this.bindCultureClicks();
    },

    // LEVEL OF DETAIL SYSTEM
    updateLOD(currentScale) {
        this.pookalamLayer.innerHTML = ''; // Clear layer
        
        if (currentScale < 0.4) {
            // LOW ZOOM: Clusters
            this.renderClusters();
        } else if (currentScale < 0.8) {
            // MEDIUM ZOOM: Simple Dots
            this.renderDots();
        } else {
            // HIGH ZOOM: Detailed Pookalams
            this.renderDetailed();
        }
    },

    renderClusters() {
        // Group pookalams by grid
        const grid = {};
        TypixelData.village.pookalams.forEach(p => {
            const gx = Math.floor(p.x / 500);
            const gy = Math.floor(p.y / 500);
            const key = `${gx},${gy}`;
            if(!grid[key]) grid[key] = { x: gx*500+250, y: gy*500+250, count: 0 };
            grid[key].count++;
        });

        for(const key in grid) {
            const c = grid[key];
            const el = document.createElement('div');
            el.className = 'pookalam-cluster';
            el.style.left = `${c.x}px`;
            el.style.top = `${c.y}px`;
            el.style.width = '80px';
            el.style.height = '80px';
            el.innerText = `🌼 ${c.count}`;
            el.onclick = () => this.mapEngine.flyTo(c.x, c.y, 0.6);
            this.pookalamLayer.appendChild(el);
        }
    },

    renderDots() {
        TypixelData.village.pookalams.forEach(p => {
            const el = document.createElement('div');
            el.className = 'pookalam-marker';
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.style.background = p.color;
            el.style.width = '20px';
            el.style.height = '20px';
            el.onclick = () => this.openPookalamCard(p);
            this.pookalamLayer.appendChild(el);
        });
    },

    renderDetailed() {
        TypixelData.village.pookalams.forEach(p => {
            const el = document.createElement('div');
            el.className = 'pookalam-marker';
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.style.background = p.color;
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.display = 'flex';
            el.style.alignItems = 'center';
            el.style.justifyContent = 'center';
            el.style.color = 'white';
            el.style.fontWeight = 'bold';
            el.style.fontSize = '10px';
            el.innerText = '🌼';
            el.onclick = () => this.openPookalamCard(p);
            this.pookalamLayer.appendChild(el);
        });
    },

    openPookalamCard(p) {
        // Simple alert-based prototype. In production, this is a beautiful floating card.
        // Dispatching event to potentially open modal.
        const event = new CustomEvent('openPookalam', { detail: p });
        document.dispatchEvent(event);
        alert(`@${p.username}\n${p.title}\n❤️ ${p.likes}   ⭐ ${p.points}`);
    },

    bindCultureClicks() {
        document.querySelectorAll('.culture-object').forEach(obj => {
            obj.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = obj.dataset.culture;
                this.openCultureModal(key);
                this.markDiscovered(key);
            });
        });
        
        document.getElementById('close-modal')?.addEventListener('click', () => {
            document.getElementById('culture-modal').classList.add('hidden');
            document.getElementById('culture-modal').classList.remove('flex');
        });
    },

    openCultureModal(key) {
        const data = CultureData[key];
        if(!data) return;
        document.getElementById('modal-image').innerText = data.icon;
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-desc').innerText = data.desc;
        
        const modal = document.getElementById('culture-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    renderDiscoveries() {
        const list = document.getElementById('discovery-list');
        if(!list) return;
        list.innerHTML = '';
        for(const key in CultureData) {
            const discovered = TypixelData.village.discoveries.includes(key);
            list.innerHTML += `<div class="${discovered ? 'text-kasavu-gold' : 'text-gray-500'}">
                ${CultureData[key].icon} ${CultureData[key].title} ${discovered ? '✓' : '○'}
            </div>`;
        }
    },

    markDiscovered(key) {
        if(!TypixelData.village.discoveries.includes(key)) {
            TypixelData.village.discoveries.push(key);
            TypixelData.saveVillage();
            this.renderDiscoveries();
        }
    },

    renderLiveFeed() {
        const feed = document.getElementById('live-feed');
        if(!feed) return;
        feed.innerHTML = `
            <li>🌼 @Riyas created a Pookalam</li>
            <li>🎮 @Nihal won Vallam Challenge</li>
            <li>🌸 @Fathima received 100 celebrations</li>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => VillageUI.init());
