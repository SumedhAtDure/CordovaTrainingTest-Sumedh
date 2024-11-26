
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function renderContacts() {
    contactList.innerHTML = '';
    if (contacts.length >= 1) {
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="details">
                <h3 class="contact-name">${contact.name}</h3>
                <h4 class="contact-phone">${contact.phone}</h4>
            </div>
            <div>
                <button class="contact-call" onclick="callContact(${contact.phone})">Call</button>
                <button class="contact-delete" onclick="deleteContact(${index})">Delete</button>
            </div>
            `;
            contactList.appendChild(li);
        });
    } else {

        const li = document.createElement('li');
        li.innerHTML = `
                No Contacts Added!
            `;
        contactList.appendChild(li);

    }

}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name && phone) {
        contacts.push({ name, phone });

        localStorage.setItem('contacts', JSON.stringify(contacts));

        nameInput.value = '';
        phoneInput.value = '';

        renderContacts();
    }
});

function deleteContact(index) {
    contacts.splice(index, 1);

    localStorage.setItem('contacts', JSON.stringify(contacts));

    renderContacts();
}

function onSuccess(result) {
    console.log("Success:" + result);
}

function onError(result) {
    console.log("Error:" + result);
}

function callContact(number) {

    window.plugins.CallNumber.callNumber(onSuccess, onError, number, 1);

}

renderContacts();
