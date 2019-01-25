
// This will control our client-side js needs

// TODO add modal functionality for empty strings

// Event Delegation
document.addEventListener('click', (event) => {
    if(event.target.id === 'add-submit') {
        event.preventDefault();
    }
    const id = event.target.id;
    const data = event.target.dataset.id; 
    switch(id) {
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
                console.log(res);
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