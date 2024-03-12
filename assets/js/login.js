document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var name = document.getElementById('inputName').value;
  var email = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  // Check if name, email, and password are provided
  if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
    // Save name, email, and password in localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    
    // Aggiungi il nome dell'utente all'array nel localStorage
    var loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];
    loggedInUsers.push(name);
    localStorage.setItem('loggedInUsers', JSON.stringify(loggedInUsers));

    // Redirect user to welcome page
    window.location.href = 'index.html';
  } else {
    alert('Please provide name, email, and password.');
  }
});

// Quando la pagina si carica
document.addEventListener('DOMContentLoaded', function() {
  // Recupera l'ultimo utente che ha effettuato il login
  var lastLoggedInUser = localStorage.getItem('name');

  // Controlla se il nome è stato registrato
  if (lastLoggedInUser) {
    // Estrai l'iniziale del nome
    var userInitial = lastLoggedInUser.charAt(0).toUpperCase();
    
    // Aggiorna il testo del link con l'iniziale del nome
    var loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.textContent = userInitial;
    } else {
      console.error('Elemento con ID "loginLink" non trovato.');
    }
  } else {
    // Se il nome non è stato registrato, reindirizza l'utente alla pagina di login
    window.location.href = 'login.html';
  }
});

// Per recuperare tutti gli utenti che hanno effettuato il login
function getLoggedInUsers() {
  return JSON.parse(localStorage.getItem('loggedInUsers')) || [];
}

document.addEventListener('DOMContentLoaded', function() {
  // Recupera il nome salvato
  var userName = localStorage.getItem('name');

  // Controlla se il nome è stato registrato
  if (userName) {
    // Estrai l'iniziale del nome
    var userInitial = userName.charAt(0).toUpperCase();
    
    // Aggiorna il testo del link con l'iniziale del nome
    var loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.textContent = userInitial;
    } else {
      console.error('Elemento con ID "loginLink" non trovato.');
    }
  } else {
    // Se il nome non è stato registrato, reindirizza l'utente alla pagina di login
    window.location.href = 'login.html';
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Recupera gli utenti che hanno effettuato il login
  var loggedInUsers = JSON.parse(localStorage.getItem('loggedInUsers')) || [];

  // Controlla se ci sono utenti registrati
  if (loggedInUsers.length > 0) {
    // Recupera l'ultimo utente che ha effettuato il login
    var lastLoggedInUser = loggedInUsers[loggedInUsers.length - 1];

    // Estrai l'iniziale del nome
    var userInitial = lastLoggedInUser.charAt(0).toUpperCase();
    
    // Aggiorna il testo del link con l'iniziale del nome
    var loginLink = document.getElementById('loginLink');
    if (loginLink) {
      loginLink.textContent = userInitial;
    } else {
      console.error('Elemento con ID "loginLink" non trovato.');
    }
  } else {
    // Se non ci sono utenti registrati, reindirizza l'utente alla pagina di login
    window.location.href = 'login.html';
  }
});
