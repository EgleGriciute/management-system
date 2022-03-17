// nav navigation
const navigateToUsers = document.querySelector("li");

navigateToUsers.addEventListener("click", () => {
  window.location.href = "./membership_management.html";
});

// select a button in order to create new users
const newUserBtn = document.querySelector("#new-user");

newUserBtn.addEventListener("click", () => {
  window.location.href = "./create_user.html";
});

renderUsers = async () => {
  const usersResponse = await fetch("http://localhost:3000/users", {
    method: "GET",
  });
  const responseJSON = await usersResponse.json();

  const wrapper = document.querySelector("main");

  responseJSON.forEach((userObject) => {
    const divCard = document.createElement("div");
    divCard.classList.add("card");

    const div = document.createElement("div");
    div.classList.add("card-title");

    const name = document.createElement("h4");
    name.classList.add("card-title__caption");
    name.textContent = `${userObject.name} ${userObject.surname}`;

    const email = document.createElement("h5");
    email.innerText = "Email Address: ";

    const highlightEmail = document.createElement("span");
    highlightEmail.classList.add("email");
    highlightEmail.textContent = `${userObject.email}`;

    email.append(highlightEmail);

    const membership = document.createElement("h5");
    membership.innerText = "Membership: ";

    const highlightMembership = document.createElement("span");
    highlightMembership.classList.add("membership");

    highlightMembership.textContent = `${userObject.membership}`;

    membership.append(highlightMembership);

    const ip = document.createElement("h5");
    ip.textContent = `ip: ${userObject.service_id}`;

    div.append(name, email, membership, ip);

    divCard.append(div);

    wrapper.append(divCard);
  });
};

renderUsers();
