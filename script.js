
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

