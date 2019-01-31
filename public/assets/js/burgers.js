
// This will control our client-side js needs

// TODO add modal functionality for empty strings
// TODO add modal functionality for burger update?

// Evaluate session data, and if the user is still in the same session, do not run the load animations
document.addEventListener('DOMContentLoaded', shouldAnimate = () => {
    const data = sessionStorage.getItem('singleSess');
    if(data !== 'true') {
        setTimeout(fadeClassChange, 4000);
    } else {
        fadeClassChange();
    }
    sessionKeeper();
});

// This will disable our animation by removing classes. Only toggles the first time (so animation will run once)
const fadeClassChange = () => {
    const title = document.getElementById('title');
    const content = document.getElementById('content-container');
    title.style = 'display: none';
    content.classList.toggle('fade-in');
};

// We do not want the title load animations to fire after the user has begun their session, we're going to store a little session data
sessionKeeper = () => {
    const data = sessionStorage.getItem('singleSess');
    if(data === null) {
        sessionStorage.setItem('singleSess', true);
    };
};

// Event Delegation
document.addEventListener('click', (event) => {
    console.log(event.target.id);
    if(event.target.id === 'add-submit') {
        event.preventDefault();
    }
    const buttonClick = () => {
        if(event.target.id === '')
            return event.target.className;
        else {
            return event.target.id;
        };
    };
    const data = event.target.dataset.id; 
    switch(buttonClick()) {
        case('devour-burg'):
        devourIt(data);
        break;
        case('add-submit'):
        addBurger();
        break;
        case('modal-container'):
        toggleModal();
        break;
        case('close-button'):
        toggleModal();
        break;
    };
});

// Function to handle the "Devour it" button click
devourIt = (data) => {
    const url = `/api/burgers/${data}`;
    const status = {'status': 1};
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(status),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        location.reload();
    });
}

// Function to send our new burger data to the database
addBurger = () => {
    const name = document.getElementsByName('burg-name')[0].value;
    const url = '/api/burgers'
    const newBurger = {'name': name};
    if(name !== '') {
        if(name.trim() !== '') {
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(newBurger),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                location.reload()
            })
        } else {
            toggleModal();
            return;
        };
    } else {
        toggleModal();
        return;
    };
    name = '';
};

const toggleModal = () => {
    const modal = document.getElementById('modal-container');
    modal.classList.toggle('modal-display');
}