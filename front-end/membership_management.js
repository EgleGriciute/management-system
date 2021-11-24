  // nav navigation
  const navigateToUsers = document.querySelectorAll('li')[1];

  navigateToUsers.addEventListener('click', () => {
      window.location.href = './user_management.html'; 
  });
  
  // render dynamically created memberships
   renderMemberships = async () => {
    const membershipsResponse = await fetch('http://localhost:3000/memberships', {method: "GET"});
    const responseJSON = await membershipsResponse.json();

    const wrapper = document.querySelector('main');

       responseJSON.forEach((membershipObject) => {
       const divCard = document.createElement('div');
       divCard.classList.add('card');
       
        const div = document.createElement('div');
        div.classList.add('card-title');

        const price = (Number(membershipObject.price));
        const newPrice = price.toFixed(2);  

        const h1 = document.createElement('h1');
        h1.classList.add('card-title__caption');
        h1.textContent = `$${newPrice} ${membershipObject.name}`;

        const h5 = document.createElement('h5');
        h5.textContent = `${membershipObject.description}`;

        div.append(h1, h5);

        const hr = document.createElement('hr');

        const button = document.createElement('button');
        button.classList.add('card-button');

        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-trash');

        button.append(i);

        divCard.append(div, hr, button);

        wrapper.append(divCard);

        button.addEventListener('click', () => {
          // delete memberships on a button click
            deleteMemberships(membershipObject.id);
            renderMemberships();
            wrapper.innerHTML = "";
        });
    });
}

renderMemberships();

   async function deleteMemberships(id) {
        const deleteMemberships = await fetch ("http://localhost:3000/memberships/" + id.toString(),
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const json = await deleteUsers.json();
        return json;
      };


// navigate back to create_membership.html on a cancel click event

const navigateBtn = document.querySelector('#navigate');
navigateBtn.addEventListener('click', () => {
    window.location.href = './create_membership.html';
});



