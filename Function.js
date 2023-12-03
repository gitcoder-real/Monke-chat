document.addEventListener("DOMContentLoaded", function() {
  const output = document.getElementById("output");
  const usernameInput = document.getElementById("username");
  const messageInput = document.getElementById("message");
  const sendBtn = document.getElementById("send-btn");

  // Check if username is already stored in localStorage
  const storedUsername = localStorage.getItem("username");
  if (storedUsername) {
    usernameInput.value = storedUsername;
  }

  // Check if messages are already stored in localStorage
  const storedMessages = localStorage.getItem("messages");
  if (storedMessages) {
    output.innerHTML = storedMessages;
  }

  // Send message function
  function sendMessage() {
    const username = usernameInput.value.trim();
    let message = messageInput.value.trim();

    if (username === "" || message === "") {
      return;
    }

    // Check for "//info" keyword
    if (message.startsWith("//info")) {
      message = message.replace("//info", "").trim();
      const infoMessage = `<p class="info-message">${message}</p>`;
      output.innerHTML += infoMessage;
    }
    // Check for "//clear" keyword
    else if (message === "//clear") {
      output.innerHTML = "";
      localStorage.removeItem("messages");
    } else {
      const timestamp = new Date().toLocaleString();
      const newMessage = `<p><strong>${username}:</strong> ${message} <span class="timestamp">| ${timestamp}</span></p>`;
      output.innerHTML += newMessage;
    }

    // Save messages in localStorage
    localStorage.setItem("messages", output.innerHTML);

    // Save username in localStorage
    localStorage.setItem("username", username);

    // Clear message input field
    messageInput.value = "";
  }

  // Send button click event
  sendBtn.addEventListener("click", function() {
    sendMessage();
  });

  // Enter key press event
  messageInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      sendMessage();
    }
  });

  // Save username in localStorage on input change
  usernameInput.addEventListener("input", function() {
    const username = usernameInput.value.trim();

    localStorage.setItem("username", username);
  });
});
