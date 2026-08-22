const VillageUI = {
    mapEngine: null,
    pookalamLayer: null,

    init() {
        if(!document.getElementById('village-world')) return;
        this.pookalamLayer = document.getElementById('pookalam-layer');
        this.mapEngine = new VillageMapEngine('map-container', 'village-world');
        
        this.renderLiveFeed();
        this.updateLOD(this.mapEngine.scale); // Initial render
    },

    updateLOD(currentScale) {
        this.pookalamLayer.innerHTML = '';
        if (currentScale < 0.5) {
            this.renderClusters();
        } else if (currentScale < 1.2) {
            this.renderMarkers();
        } else {
            this.renderDetailed();
        }
    },

    renderClusters() {
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
            el.innerText = c.count;
            el.onclick = () => this.mapEngine.zoomAtPoint(window.innerWidth/2, window.innerHeight/2, 0.3);
            this.pookalamLayer.appendChild(el);
        }
    },

    renderMarkers() {
        TypixelData.village.pookalams.forEach(p => {
            const el = document.createElement('div');
            el.className = 'pookalam-marker';
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.style.background = `url('${p.image}') center/cover`;
            el.onclick = () => this.openPookalamCard(p);
            this.pookalamLayer.appendChild(el);
        });
    },

    renderDetailed() {
        TypixelData.village.pookalams.forEach(p => {
            const el = document.createElement('div');
            el.className = 'culture-object'; // Reuse styling for simplicity
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.innerHTML = `
                <img src="${p.image}" alt="${p.username}'s Pookalam">
                <div class="culture-label">
                    <span class="malayalam">${p.username}</span>
                    <strong>${p.likes} Likes</strong>
                </div>
            `;
            el.onclick = () => this.openPookalamCard(p);
            this.pookalamLayer.appendChild(el);
        });
    },

    openPookalamCard(p) {
        alert(`Opening ${p.username}'s Pookalam. This would trigger a beautiful profile modal in full production.`);
    },

    renderLiveFeed() {
        const feed = document.getElementById('feed-list');
        if(!feed) return;
        feed.innerHTML = `
            <li>Riyas created a Pookalam</li>
            <li>Fathima joined the village</li>
            <li>Nihal completed Vallamkali</li>
            <li>Afsal discovered Kathakali</li>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => VillageUI.init());
