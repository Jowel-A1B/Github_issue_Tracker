document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      if (username === "admin" && password === "admin123") {
        window.location.href = "issues.html";
      } else {
        alert("Invalid credentials!");
      }
    });
  }
});
