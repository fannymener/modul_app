// Загружаем заметки из Local Storage
const loadNotesFromLocalStorage = () =>
    JSON.parse(localStorage.getItem("notes")) || [];

// Рендерим список заметок
const renderNotes = (filteredNotes = null) => {
    const notes = filteredNotes || loadNotesFromLocalStorage();
    const notesListElement = document.querySelector("#notesList");
    notesListElement.innerHTML = "";

    notes.forEach((note, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${note.title}: ${note.content}`;
        
        if (note.date) {
            listItem.textContent += ` (${note.date})`;
        }

        // Добавляем кнопки управления
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.dataset.noteIndex = index;
        deleteButton.onclick = function () {
            removeNote(index);
        };
        listItem.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Редактировать";
        editButton.dataset.noteIndex = index;
        editButton.onclick = function () {
            editNote(index);
        };
        listItem.appendChild(editButton);

        notesListElement.appendChild(listItem);
    });
};

// Сохраняем заметки в Local Storage
const saveToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

// Формируем новые заметки
document.querySelector("#newNoteForm").onsubmit = (event) => {
    event.preventDefault();

    const titleInput = document.querySelector("#noteTitle");
    const contentTextArea = document.querySelector("#noteContent");
    const dateInput = document.querySelector("#noteDate");

    const newNote = {
        title: titleInput.value.trim(),
        content: contentTextArea.value.trim(),
        date: dateInput.value.trim()
    };

    let currentNotes = loadNotesFromLocalStorage();
    currentNotes.push(newNote);
    saveToLocalStorage(currentNotes);

    titleInput.value = "";
    contentTextArea.value = "";
    dateInput.value = "";

    renderNotes();
};

// Функция удаления заметки
const removeNote = (index) => {
    let currentNotes = loadNotesFromLocalStorage();
    currentNotes.splice(index, 1);
    saveToLocalStorage(currentNotes);
    renderNotes();
};

// Фильтрация заметок
const searchNotes = () => {
    const searchValue = document.querySelector("#searchTerm").value.toLowerCase();
    const currentNotes = loadNotesFromLocalStorage();
    const filteredNotes = currentNotes.filter((note) => {
        return (
            note.title.toLowerCase().includes(searchValue) ||
            note.content.toLowerCase().includes(searchValue)
        );
    });

    renderNotes(filteredNotes);
};

// Показываем все заметки
const showAllNotes = () => {
    renderNotes();
};

// Запуск рендера при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
    renderNotes();
});