const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('http://localhost:4000/user/login', {
            email,
            password
        });
        console.log(response.data);
        alert('Successfully logged In!.');
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
    }
});

