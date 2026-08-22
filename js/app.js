document.addEventListener("DOMContentLoaded", () => {

    console.log("Typixel Onam Fest starting...");

    // Initialize data
    TypixelData.init();

    const enterBtn =
        document.getElementById("enter-festival-btn");

    const cinematic =
        document.getElementById("cinematic-container");

    const usernameModal =
        document.getElementById("username-modal");

    const enterVillageBtn =
        document.getElementById("enter-village-btn");

    const usernameInput =
        document.getElementById("username-input");


    // ==========================================
    // SHOW ENTER BUTTON
    // ==========================================

    if (enterBtn) {

        setTimeout(() => {

            enterBtn.classList.remove("hidden");

            enterBtn.style.opacity = "1";

        }, 3000);


        // ==========================================
        // OPEN USERNAME MODAL
        // ==========================================

        enterBtn.addEventListener("click", () => {

            cinematic.style.opacity = "0";

            setTimeout(() => {

                cinematic.style.display = "none";

                usernameModal.classList.remove("hidden");

                usernameModal.classList.add("flex");

                usernameInput.focus();

            }, 700);

        });

    }


    // ==========================================
    // ENTER VILLAGE
    // ==========================================

    if (enterVillageBtn) {

        enterVillageBtn.addEventListener("click", () => {

            let username =
                usernameInput.value
                    .trim()
                    .replace(/[^a-zA-Z0-9_]/g, "");


            if (username.length < 3) {

                alert(
                    "Please enter at least 3 characters."
                );

                return;
            }


            TypixelData.saveUser(username);


            // Go to actual village

            window.location.href =
                "village.html";

        });

    }


    // ==========================================
    // ENTER KEY SUPPORT
    // ==========================================

    usernameInput?.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            enterVillageBtn.click();

        }

    });


    // ==========================================
    // AUDIO BUTTON
    // ==========================================

    const audioToggle =
        document.getElementById("audio-toggle");

    audioToggle?.addEventListener("click", () => {

        const icon =
            document.getElementById("audio-icon");

        if (icon.innerText === "🔇") {

            icon.innerText = "🔊";

        } else {

            icon.innerText = "🔇";

        }

    });

});
