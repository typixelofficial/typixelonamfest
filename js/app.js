document.addEventListener('DOMContentLoaded', () => {
    TypixelData.init();

    const enterBtn = document.getElementById('enter-festival-btn');
    if (enterBtn) {
        if (TypixelData.user) {
            // Skip intro if already logged in
            window.location.href = 'village.html';
            return;
        }

        enterBtn.addEventListener('click', () => {
            document.querySelector('.hero-container').style.opacity = '0';
            document.querySelector('.hero-container').style.transition = 'opacity 1s';
            setTimeout(() => {
                document.querySelector('.hero-container').style.display = 'none';
                document.getElementById('username-modal').classList.remove('hidden');
            }, 1000);
        });

        document.getElementById('enter-village-btn').addEventListener('click', () => {
            const input = document.getElementById('username-input');
            let username = input.value.trim().replace(/[^a-zA-Z0-9_]/g, '');
            if (username.length < 3) {
                alert("Username must be at least 3 characters.");
                return;
            }
            TypixelData.saveUser(username);
            window.location.href = 'village.html';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('solid');
            else header.classList.remove('solid');
        });
    }
});
