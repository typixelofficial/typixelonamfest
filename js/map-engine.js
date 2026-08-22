class VillageMapEngine {
    constructor(containerId, worldId) {
        this.container = document.getElementById(containerId);
        this.world = document.getElementById(worldId);
        
        this.scale = 0.3;
        this.translateX = 0;
        this.translateY = 0;
        
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        
        this.init();
    }

    init() {
        this.centerMap();
        this.bindEvents();
        this.updateTransform();
    }

    centerMap() {
        const rect = this.container.getBoundingClientRect();
        this.translateX = (rect.width / 2) - (2000 * this.scale);
        this.translateY = (rect.height / 2) - (2000 * this.scale);
    }

    bindEvents() {
        this.container.addEventListener('mousedown', (e) => this.startDrag(e));
        window.addEventListener('mousemove', (e) => this.drag(e));
        window.addEventListener('mouseup', () => this.endDrag());
        this.container.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        document.getElementById('zoom-in')?.addEventListener('click', () => this.zoomBy(0.1));
        document.getElementById('zoom-out')?.addEventListener('click', () => this.zoomBy(-0.1));
        document.getElementById('reset-camera')?.addEventListener('click', () => {
            this.scale = 0.3;
            this.centerMap();
            this.updateTransform();
            if(window.VillageUI) window.VillageUI.updateLOD(this.scale);
        });
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX - this.translateX;
        this.startY = e.clientY - this.translateY;
        this.container.style.cursor = 'grabbing';
    }
    drag(e) {
        if (!this.isDragging) return;
        this.translateX = e.clientX - this.startX;
        this.translateY = e.clientY - this.startY;
        this.updateTransform();
    }
    endDrag() {
        this.isDragging = false;
        if(this.container) this.container.style.cursor = 'grab';
    }

    handleWheel(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        this.zoomAtPoint(e.clientX, e.clientY, delta);
    }

    zoomBy(delta) {
        const rect = this.container.getBoundingClientRect();
        this.zoomAtPoint(rect.width / 2, rect.height / 2, delta);
    }

    zoomAtPoint(clientX, clientY, delta) {
        const newScale = Math.max(0.2, Math.min(2.5, this.scale + delta));
        const rect = this.container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        const worldX = (x - this.translateX) / this.scale;
        const worldY = (y - this.translateY) / this.scale;
        
        this.scale = newScale;
        this.translateX = x - worldX * this.scale;
        this.translateY = y - worldY * this.scale;
        
        this.updateTransform();
        if(window.VillageUI) window.VillageUI.updateLOD(this.scale);
    }

    updateTransform() {
        this.world.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    }
}
