document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavList = document.querySelector('.nav-mobile-list');
  const mobileNavLinks = document.querySelectorAll('.nav-mobile-list .nav-link'); // Selecciona todos los enlaces del menú móvil

  if (menuToggle && mobileNavList) {
    menuToggle.addEventListener('click', function() {
      mobileNavList.classList.toggle('open');
    });

    // Agrega un event listener a cada enlace del menú móvil
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Si el menú está abierto, lo cerramos
        if (mobileNavList.classList.contains('open')) {
          mobileNavList.classList.remove('open');
        }
      });
    });
  } else {
    console.error("No se encontraron el botón de menú o la lista de navegación móvil.");
  }
});