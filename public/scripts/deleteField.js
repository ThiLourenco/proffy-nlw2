const schedule = document.querySelector("#schedule-items");
const fieldItem = document.querySelector(".schedule-item");
const deleteField = document.querySelector(".delete-time");

    deleteField.addEventListener('click', e => {
        fieldItem.parentNode.removeChild(fieldItem);

    });
