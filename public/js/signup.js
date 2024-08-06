const signupFormHandler = async (event) => {
  event.preventDefault();

  //remove extra spaces
  const username = document.querySelector("#username").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log({ username, email, password }); // debug

  //username and password verification
  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      const errorText = await response.text();
      alert(errorText);
    }
  }
};

document
  .querySelector("#signup-form")
  .addEventListener("submit", signupFormHandler);
