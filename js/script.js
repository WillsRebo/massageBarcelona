document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavList = document.querySelector('.nav-mobile-list');
  
    if (menuToggle && mobileNavList) {
      menuToggle.addEventListener('click', function() {
        mobileNavList.classList.toggle('open');
      });
    } else {
      console.error("No se encontraron el botón de menú o la lista de navegación móvil.");
    }
  });