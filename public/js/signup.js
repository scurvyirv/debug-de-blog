const signupFormHandler = async (event) => {
    event.preventDefault();

    //remove extra spaces
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    //username and password verification
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
