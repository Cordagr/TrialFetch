<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Authentication</title>
</head>
<body>
  <h2>Sign Up</h2>
  <form id="signUpForm">
    <input type="email" id="signUpEmail" placeholder="Email" required>
    <input type="password" id="signUpPassword" placeholder="Password" required>
    <button type="submit">Sign Up</button>
  </form>

  <h2>Sign In</h2>
  <form id="signInForm">
    <input type="email" id="signInEmail" placeholder="Email" required>
    <input type="password" id="signInPassword" placeholder="Password" required>
    <button type="submit">Sign In</button>
  </form>

  <script type="module">
    import { signUp, signIn } from './auth.js';

    document.getElementById('signUpForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signUpEmail').value;
      const password = document.getElementById('signUpPassword').value;
      await signUp(email, password);
      alert('Verification email sent. Please check your inbox.');
    });

    document.getElementById('signInForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signInEmail').value;
      const password = document.getElementById('signInPassword').value;
      await signIn(email, password);
    });
  </script>
</body>
</html>
