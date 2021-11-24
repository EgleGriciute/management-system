const navigateToUsers = document.querySelector('li');

navigateToUsers.addEventListener('click', () => {
    window.location.href = './membership_management.html'
});

const newUserBtn = document.querySelector('#new-user');

newUserBtn.addEventListener('click', () => {
    window.location.href = './create_user.html'
});

renderUsers = async () => {
    const usersResponse = await fetch('http://localhost:3000/users', {method: "GET"});
    const responseJSON = await usersResponse.json();

    const wrapper = document.querySelector('main');

    const userElements = responseJSON.forEach((userObject) => {
       const divCard = document.createElement('div');
       divCard.classList.add('card');
       
        const div = document.createElement('div');
        div.classList.add('card-title');

        const name = document.createElement('h4');
        name.classList.add('card-title__caption');
        name.textContent = `${userObject.name} ${userObject.surname}`;

        const email = document.createElement('h5');
        email.innerText = 'Email Address: ';

        const highlightEmail = document.createElement('span');
        highlightEmail.classList.add('email');
        highlightEmail.textContent = `${userObject.email}`;
        
        email.append(highlightEmail);

        const membership = document.createElement('h5');
        membership.innerText = 'Membership: ';

        const highlightMembership = document.createElement('span');
        highlightMembership.classList.add('membership');

        highlightMembership.textContent = `${userObject.membership}`;
        
        membership.append(highlightMembership);

        const ip = document.createElement('h5');
        ip.textContent = `ip: ${userObject.service_id}`;

        div.append(name, email, membership, ip);

        divCard.append(div);

        wrapper.append(divCard);

    })
}

renderUsers();

// const sortUpBtn = document.querySelector('.fas.fa-sort-up');
// const sortDownBtn = document.querySelector('.fas.fa-sort-down');



// let sort = "ASC";

// sortUpBtn.addEventListener("click", () => {
//     if (sort == "ASC") {
//         sort = "DSC";
//         renderUsers();
//     } else {
//         sort == "DESC";
//         renderUsers();
//     }
// });

// async function getUsers(sort) {
//     const query = new URLSearchParams();
//     query.set("order", sort);
//     const response = await fetch("http://localhost:3000/users?"+query.toString());
//     const json = await response.json();
//     return json;
// }
