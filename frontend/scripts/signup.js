const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await axios.post('http://localhost:4000/user/signup', {
            name,
            email,
            password
        });
        console.log(response.data);
        alert('Signup successful! Please login.');
        
    } catch (error) {
        console.error('Error during signup:', error);
        alert('Signup failed. Please try again.');
    }
});