// Crea un documento que solicite al usuario cierta información que será almacenada en las cookies. 
// Por ejemplo: idioma (español, ingles,…), tema (oscuro, claro,…), usuario (juan123, ana_78,..), preferencia (alta, baja,…), última visita (fecha/hora). 
// Tres de las cookies tendrán una fecha de expiración de 10, 15 y 20 segundos desde el momento en que se establezcan, 
// mientras que las otras dos cookies no tendrán fecha de expiración, pero estas últimas se borrarán la segunda vez que se visite la página. 
// El documento deberá mostrar las cookies vigentes cada 2 segundos.


// Establece una cookie
function setCookie(name, value, expirationSeconds) {
    const date = new Date();
    date.setTime(date.getTime() + expirationSeconds * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // Obtiene las cookies y devuelve el valor de la coockie que se le pasa como parámetro o null si no la encuentra
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // borra la cookie
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // muestra las cookies
  function verCookies() {
    const idioma = prompt("Ingresa tu idioma:");
    const tema = prompt("Ingresa tu tema (oscuro, claro, ...):");
    const usuario = prompt("Ingresa tu usuario:");
    const preferencia = prompt("Ingresa tu preferencia (alta, baja, ...):");
    const ultimaVisita = new Date().toLocaleString();

    setCookie("Idioma", idioma, 10);
    setCookie("Tema", tema, 15);
    setCookie("Usuario", usuario, 20);
    setCookie("Preferencia", preferencia, 0);
    setCookie("UltimaVisita", ultimaVisita, 0);

    const contadorDeVisitas = parseInt(getCookie("contadorDeVisitas")) || 0;
    setCookie("contadorDeVisitas", contadorDeVisitas + 1, 0); // Incrementa el contador de visitas

    setInterval(function() {
      const cookies = document.cookie.split(';');
      console.clear();
      console.log("Cookies vigentes:");
      for (let i = 0; i < cookies.length; i++) {
        console.log(cookies[i].trim());
      }

      if (contadorDeVisitas >= 1) {
        // Elimina las cookies sin fecha de expiración en la segunda visita
        deleteCookie("Preferencia");
        deleteCookie("UltimaVisita");
        console.log("Cookies eliminadas en la segunda visita.");
      }
    }, 2000);
  }

  verCookies();