const baseUrl = 'http://13.60.5.145:4000';
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post(`${baseUrl}/user/login`, {
            email,
            password
        });
        console.log(response.data);
        alert('Successfully logged In!.');

        localStorage.setItem('token', response.data.token);
        
        window.location.href = "./expense.html";
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
    }
});

