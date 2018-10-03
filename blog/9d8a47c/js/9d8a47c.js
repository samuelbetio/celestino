let login = prompt('Please Log In');

if (login === null || login === '') {
    alert('Canceled');
} else if (login.length < 4) {
    alert("I don't know any users having name length less than 4 symbols");
} else if (login !== 'User') {
    alert("I don't know you!");
} else if (login === 'User') {
    password();
}

function password() {
    let password = prompt('Please enter password');
    if (password === 'SuperUser') {
        getHours();
    } else if (password === null || password === '') {
        alert('Canceled');
    } else if (password !== 'SuperUser') {
        alert('Wrong Password');
    }
}

function getHours() {
    let a = new Date().getHours();
    if (a < 20) {
        alert('Good day sir!');
    } else {
        alert('Good evening!');
    }
}
