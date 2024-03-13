document.addEventListener('DOMContentLoaded', function() {
  // Recupera gli utenti che hanno effettuato il login
  var loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

  // Controlla se ci sono utenti registrati
  if (loggedInUsers.length > 0) {
    // Recupera l'ultimo utente che ha effettuato il login
    var lastLoggedInUser = loggedInUsers[loggedInUsers.length - 1];

    // Estrai la prima lettera del nome
    var firstLetter = lastLoggedInUser.charAt(0).toUpperCase();
    
    // Aggiorna il testo del link con la prima lettera del nome
    var loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.textContent = firstLetter;
      // Aggiungi l'evento click al link per reindirizzare a index.html
      loginLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        window.location.href = 'index.html'; // Redirect to index.html
      });
    } else {
      console.error('Elemento con ID "loginLink" non trovato.');
    }
  } else {
    // Se non ci sono utenti registrati, reindirizza l'utente alla pagina di login
    window.location.href = 'login.html';
  }
});