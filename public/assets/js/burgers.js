
// This will control our client-side js needs

// TODO add modal functionality for empty strings
// TODO add modal functionality for burger update?
// Clear the form values not necessary due to page reload on submission
// TODO after first load, change so page does not continually do the load screen.

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
    title.classList.toggle('fade-out');
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
    };
});

// Function to handle the "Devour it" button click
devourIt = (data) => {
    const url = `/api/burgers/${data}`;
    const status = {'status': 1};
    const sessStatus = sessionStorage.getItem('singleSess');
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
            // Modal for empty field
            return;
        };
    } else {
        // Modal for empty field
        return;
    };
};