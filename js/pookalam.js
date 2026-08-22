const PookalamCreator = {
    svg: null,
    rings: [],
    currentColor: '#E8752A',
    
    init() {
        this.svg = document.getElementById('pookalam-canvas');
        if(!this.svg) return;
        
        this.renderPalette();
        this.bindControls();
        this.addRing(); // Start with one ring
    },

    renderPalette() {
        const palette = document.getElementById('color-palette');
        const colors = ['#E8752A', '#D4AF37', '#9B2C2C', '#F0C75E', '#8BAE45', '#651C1C', '#4F7F35', '#FFF8E8'];
        palette.innerHTML = '';
        colors.forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'palette-swatch';
            btn.style.background = c;
            if(c === this.currentColor) btn.classList.add('active');
            btn.onclick = () => {
                this.currentColor = c;
                this.renderPalette();
            };
            palette.appendChild(btn);
        });
    },

    bindControls() {
        document.getElementById('add-ring')?.addEventListener('click', () => this.addRing());
        document.getElementById('remove-ring')?.addEventListener('click', () => this.removeRing());
        document.getElementById('publish-btn')?.addEventListener('click', () => this.publish());
    },

    addRing() {
        const radius = 20 + (this.rings.length * 15);
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', '0');
        ring.setAttribute('cy', '0');
        ring.setAttribute('r', radius);
        ring.setAttribute('fill', this.currentColor);
        ring.setAttribute('stroke', '#123B2A');
        ring.setAttribute('stroke-width', '2');
        ring.style.cursor = 'pointer';
        ring.onclick = () => { ring.setAttribute('fill', this.currentColor); };
        
        this.rings.push(ring);
        this.render();
    },

    removeRing() {
        this.rings.pop();
        this.render();
    },

    render() {
        this.svg.innerHTML = '';
        const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        center.setAttribute('cx', '0');
        center.setAttribute('cy', '0');
        center.setAttribute('r', '10');
        center.setAttribute('fill', '#D4AF37');
        this.svg.appendChild(center);
        
        this.rings.forEach(r => this.svg.appendChild(r));
    },

    publish() {
        const title = document.getElementById('pookalam-title').value || "Untitled Onam Joy";
        const overlay = document.getElementById('publish-overlay');
        if(!overlay) return;
        
        // Save to local
        const newPookalam = {
            id: 'user-' + Date.now(),
            username: '@' + TypixelData.user.username,
            title: title,
            x: 1800 + Math.random() * 400,
            y: 1800 + Math.random() * 400,
            image: "assets/images/pookalam/pookalam-01.webp", // Default image for user creation
            likes: 0
        };
        TypixelData.addPookalam(newPookalam);
        
        // Show Animation
        overlay.classList.remove('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => PookalamCreator.init());
