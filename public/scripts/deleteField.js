//delete field

const schedule = document.querySelector("#schedule-items");
const deleteField = document.querySelector(".schedule-item .delete");
const fieldItem = document.querySelector(".schedule-item");

    deleteField.addEventListener("click", () => {
        schedule.removeChild(fieldItem);
    });