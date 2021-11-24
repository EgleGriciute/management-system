// nav navigation
const navigateToUsers = document.querySelector('li');
navigateToUsers.addEventListener('click', () => {
    window.location.href = './membership_management.html';
});

const pageForm = document.querySelector('form');
const newUserBtn = document.querySelector('.form-button__right');

newUserBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    // get input data 
    const formData = new FormData(pageForm);

    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const membership = formData.get('membership');
    const service_id = (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));

    const usersObject = {
        name,
        surname,
        email,
        membership,
        service_id
    };

        //send data to database and relocate the page
        await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usersObject)
        });

    window.location.href = "./user_management.html";

});

const cancelBtn = document.querySelector('.form-button__left');
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = "./user_management.html";
});










