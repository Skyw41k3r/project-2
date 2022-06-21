async function newJokeFormHandler(event) {
    event.preventDefault();

    const joke = document.querySelector('#njoke').value;
    const zinger = document.querySelector('#nzinger').value;

        const response = await fetch('/api/jokes',{
            method: 'POST',
            body: JSON.stringify({
                joke,
                zinger
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
}

let colorArray = ['text-white bg-primary', 'text-white bg-secondary', 'text-white bg-success', 'text-white bg-danger', 'text-dark bg-warning', 'text-dark bg-info', 'text-dark bg-light', 'text-white bg-dark'];

let jokesArray = document.querySelectorAll('.jokes');
let color = 0;
jokesArray.forEach(function(element, index) {

    if(color === 7) {
        color= 0;
    }

    if(index % 2) {
        element.className = 'card mb-3 jokes float-end ' + colorArray[color];
    }
    else {
        element.className = 'card mb-3 jokes float-start ' + colorArray[color];
    }
    
    color++;
});

document.querySelector('#create-joke').addEventListener('submit', newJokeFormHandler);
