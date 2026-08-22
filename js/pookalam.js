// Pookalam SVG Creator Logic
const PookalamCreator = {
    svg: null,
    rings: [],
    currentColor: '#FF5733',
    
    init() {
        this.svg = document.getElementById('pookalam-canvas');
        if(!this.svg) return;
        
        this.renderPalette();
        this.bindControls();
        this.addRing(); // Start with one ring
    },

    renderPalette() {
        const palette = document.getElementById('color-palette');
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33A8', '#FFBF33', '#000000', '#FFFFFF', '#9333EA', '#F97316'];
        
        palette.innerHTML = '';
        colors.forEach(c => {
            const btn = document.createElement('button');
            btn.className = 'w-10 h-10 rounded-lg border-2 border-white shadow';
            btn.style.background = c;
            if(c === this.currentColor) btn.classList.add('ring-2', 'ring-offset-2', 'ring-deep-green');
            
            btn.onclick = () => {
                this.currentColor = c;
                this.renderPalette();
            };
            palette.appendChild(btn);
        });
    },

    bindControls() {
        document.querySelectorAll('.ring-btn').forEach(btn => {
            btn.onclick = () => {
                if(btn.dataset.ring === 'add') this.addRing();
                if(btn.dataset.ring === 'remove') this.removeRing();
            };
        });

        document.getElementById('publish-btn').onclick = () => this.publish();
    },

    addRing() {
        const radius = 20 + (this.rings.length * 20);
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', '0');
        ring.setAttribute('cy', '0');
        ring.setAttribute('r', radius);
        ring.setAttribute('fill', this.currentColor);
        ring.setAttribute('stroke', '#1b4d3e');
        ring.setAttribute('stroke-width', '2');
        ring.style.cursor = 'pointer';
        
        ring.onclick = () => {
            ring.setAttribute('fill', this.currentColor);
        };
        
        this.rings.push(ring);
        this.render();
    },

    removeRing() {
        this.rings.pop();
        this.render();
    },

    render() {
        this.svg.innerHTML = '';
        // Draw center dot
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
        const status = document.getElementById('publish-status');
        
        // 1. Show Animation
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        
        status.innerText = "Finding a courtyard...";
        
        setTimeout(() => {
            // 2. Assign Location in Village (Mock logic: find random spot near center)
            const x = 1600 + Math.random() * 400;
            const y = 1600 + Math.random() * 400;
            
            // 3. Save to Data Layer
            const newPookalam = {
                id: 'user-' + Date.now(),
                username: '@' + TypixelData.user.username,
                title: title,
                x: x,
                y: y,
                color: this.currentColor, // Simplified representation for map
                likes: 0,
                points: 100
            };
            
            TypixelData.addPookalam(newPookalam);
            
            status.innerText = "Blooming in the village...";
            
            // 4. Transition to Village
            setTimeout(() => {
                window.location.href = 'village.html';
            }, 2000);
            
        }, 1500);
    }
};

document.addEventListener('DOMContentLoaded', () => PookalamCreator.init());
