async function editFormHandler(event) {
    
    event.preventDefault();

    const joke = document.querySelector('#ejoke').value;
    const zinger = document.querySelector('#ezinger').value;
    const id = document.querySelector('#ejoke-id').value;
    console.log(`This is a test ${id}`);

    const response = await fetch(`/api/jokes/${id}`, {
        method: 'PUT',
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

function setupedit() {

    console.log(document.querySelector('#development-card'));
    document.querySelector('#development-card').style.display='none';
    document.querySelector('#edit-card').style.display='block';

    document.querySelector('#ejoke').value = this.parentElement.parentElement.querySelector('.mainjoke').textContent;
    document.querySelector('#ezinger').value = this.parentElement.parentElement.querySelector('.jokezinger').textContent;
    document.querySelector('#ejoke-id').value = this.getAttribute('data-id');
}

let letsgetallthejokestoedit = document.querySelectorAll('.edit-joke');
for (var i = 0; i < letsgetallthejokestoedit.length; i++) {
    letsgetallthejokestoedit[i].addEventListener('click', setupedit, false);
}
document.querySelector('#edit-joke').addEventListener('submit', editFormHandler, false);