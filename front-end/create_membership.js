// nav navigation
const navigateToUsers = document.querySelectorAll('li')[1];
navigateToUsers.addEventListener('click', () => {
    window.location.href = './user_management.html';
});

// select a form in order to get input data
const pageForm = document.querySelector('form');

// select a button in order to create a new membership
const newMembershipBtn = document.querySelector('.form-button__right');

newMembershipBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    // get input data 
    const formData = new FormData(pageForm);

    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');

    const id = Date.now();

    const membershipObject = {
        id,
        name,
        price,
        description
    };

    // send data to database and relocate the page
        await fetch('http://localhost:3000/memberships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(membershipObject)
        });

        window.location.href = "./membership_management.html";
    }); 

// relocate the page back on a cancel click
const cancelBttn = document.querySelector('.form-button__left');

cancelBttn.addEventListener('click', () => {
    window.location.href = "./membership_management.html";
});

