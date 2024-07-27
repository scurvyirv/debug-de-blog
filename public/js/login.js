const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.getElementById('error-message').innerText = 'Welcome to your dashboard'
            //redirects to dashboard.handlebars immediately after authentication/login
            document.location.replace('/dashboard');
        } else {
            document.getElementById('error-message').innerText = 'Network error. Please try again later.'
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

