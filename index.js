
const storageName = "checklistItems";
let initialChecklistItems = [];
let checklistItems = [];

loadInitialChecklistItems();
loadFromStorage();
setCheckboxesChecked();
setCheckboxesTextDecorations();
addEventListenersToCheckBoxes();

function loadInitialChecklistItems() {
    let checkboxLabels = document.querySelectorAll('label');
    for (let i = 0; i < checkboxLabels.length; i++) {
        initialChecklistItems.push({ text: checkboxLabels[i].textContent, isDone: false });
    }
}

function addEventListenersToCheckBoxes() {
    let checkBoxes = document.querySelectorAll('input[type=checkbox]');
    checkBoxes.forEach((checkBox, index) => {
        checkBox.addEventListener('change', function () {
            toggleIsDone(index);
        }, false);
    });
}

function toggleIsDone(index) {
    checklistItems[index].isDone = !checklistItems[index].isDone;
    saveToStorage();
    setCheckboxTextDecoration(index);
    checkIfComplete();
}

function checkIfComplete() {
    let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
    if (checkedBoxes.length === checklistItems.length) {
        document.getElementById('complete').style = 'visibility: visible;';
    }
}

function resetChecklist() {
    for (let i of checklistItems)
        i.isDone = false;

    setCheckboxesChecked();
    setCheckboxesTextDecorations();
    document.getElementById('complete').style = 'visibility: collapse;';
    saveToStorage();
}

function clearCompleted() {
    document.getElementById('complete').style = 'visibility: collapse;';
    checklistItems[checklistItems.length - 1].isDone = false;
    setCheckboxesChecked();
    setCheckboxesTextDecorations();
    saveToStorage();
}

function setCheckboxesChecked() {
    for (let i = 0; i < checklistItems.length; i++) {
        if (checklistItems[i].isDone)
            document.getElementById(`cbx-${i}`).checked = true;
        else
            document.getElementById(`cbx-${i}`).checked = false;
    }
}

function setCheckboxesTextDecorations() {
    for (let i = 0; i < checklistItems.length; i++) {
        if (checklistItems[i].isDone)
            document.getElementById(`lbl-${i}`).style = "text-decoration: line-through;";
        else
            document.getElementById(`lbl-${i}`).style = "text-decoration: undefined;";
    }
}

function setCheckboxTextDecoration(index) {
    if (checklistItems[index].isDone)
        document.getElementById(`lbl-${index}`).style = "text-decoration: line-through;";
    else
        document.getElementById(`lbl-${index}`).style = "text-decoration: undefined;";
}

function loadFromStorage() {
    let checklistItemsFromStorage = localStorage.getItem(storageName);

    if (checklistItemsFromStorage === null)
        checklistItems = initialChecklistItems;
    else
        checklistItems = JSON.parse(checklistItemsFromStorage);

    if (checklistItems.length !== initialChecklistItems.length)
        checklistItems = initialChecklistItems;
}

function saveToStorage() {
    localStorage.setItem(storageName, JSON.stringify(checklistItems));
}
