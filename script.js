
// =========================================
// 1. AÑO AUTOMÁTICO DEL FOOTER
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// =========================================
// 2. CARGAR FOTOGRAFÍA DE PERFIL
// =========================================

const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");
const profilePlaceholder = document.getElementById("profilePlaceholder");

function mostrarFotografia(src) {
    profileImage.src = src;
    profileImage.style.display = "block";
    profilePlaceholder.style.display = "none";
}

// Mostrar fotografía guardada, si existe
const savedImage = localStorage.getItem("jeanPaulProfileImage");

if (savedImage) {
    mostrarFotografia(savedImage);
} else {
    // Si no existe la imagen inicial, mostrar las iniciales JP
    profileImage.addEventListener("error", () => {
        profileImage.style.display = "none";
        profilePlaceholder.style.display = "flex";
    }, { once: true });

    // Comprobar si la imagen ya falló al cargar
    if (profileImage.complete && profileImage.naturalWidth === 0) {
        profileImage.style.display = "none";
        profilePlaceholder.style.display = "flex";
    }
}

// Seleccionar una nueva fotografía
if (imageUpload) {
    imageUpload.addEventListener("change", function () {
        const file = this.files[0];

        if (!file) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Selecciona una imagen JPG, PNG o WEBP.");
            this.value = "";
            return;
        }

        if (file.size > 3 * 1024 * 1024) {
            alert("La imagen no puede superar los 3 MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            const imageData = event.target.result;

            try {
                localStorage.setItem("jeanPaulProfileImage", imageData);
                mostrarFotografia(imageData);
            } catch (error) {
                alert("No se pudo guardar la imagen. Intenta con una fotografía más pequeña.");
            }
        };

        reader.readAsDataURL(file);
    });
}


// =========================================
// 3. NAVBAR: SECCIÓN ACTIVA
// =========================================

const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    const isActive =
                        link.getAttribute("href") === `#${entry.target.id}`;

                    link.classList.toggle("active", isActive);
                });
            }
        });
    }, {
        rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach((section) => {
        navObserver.observe(section);
    });
}

