async function deleteFormHandler(event) {

    event.preventDefault();

    const id = this.getAttribute('data-id');
    const response = await fetch(`/api/jokes/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

let letsgetallthejokes = document.querySelectorAll('.delete-joke');
for (var i = 0; i < letsgetallthejokes.length; i++) {
    letsgetallthejokes[i].addEventListener('click', deleteFormHandler, false);
}