const platno = document.querySelector('.platno');
const createBtn = document.querySelector('.create');
const deleteBtn = document.querySelector('.delete');

let resizing = false;
let dragging = false;

let vybrany = null;
let draggedElement = null;
let resizedElement = null;

let offsetX = 0;
let offsetY = 0;
let startWidth = 0;
let startHeight = 0;


load();

createBtn.addEventListener('click', () => {
    const novyStul = document.createElement('div');
    const novyResize = document.createElement('div');


    novyResize.innerText = '◢';

    novyResize.classList.add('resize');
    novyStul.classList.add('desk');

    novyStul.appendChild(novyResize);
    platno.appendChild(novyStul);


    load();
});


deleteBtn.addEventListener('click', () => {
    if (vybrany) {
        vybrany.remove();
        vybrany = null;
    }
});


function load() {
    const stoly = document.querySelectorAll('.desk');

    stoly.forEach(stul => {
        const resizeHandle = stul.querySelector('.resize');

        stul.removeEventListener('mousedown', handleMouseDown);
        resizeHandle.removeEventListener('mousedown', handleResizeMouseDown);

        stul.addEventListener('mousedown', handleMouseDown);
        resizeHandle.addEventListener('mousedown', handleResizeMouseDown);
    });
}

function handleMouseDown(e) {
    e.preventDefault();
    dragging = true;
    draggedElement = e.currentTarget;
    vybrany = e.currentTarget;
    offsetX = e.clientX - draggedElement.getBoundingClientRect().left;
    offsetY = e.clientY - draggedElement.getBoundingClientRect().top;
}

function handleResizeMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    resizing = true;
    resizedElement = e.currentTarget.parentElement;
    offsetX = e.clientX;
    offsetY = e.clientY;
    startWidth = resizedElement.offsetWidth;
    startHeight = resizedElement.offsetHeight;
}


platno.addEventListener('mousemove', (e) => {
    const platnoRect = platno.getBoundingClientRect();

    if (dragging && draggedElement) {
        let newLeft = e.clientX - offsetX - platnoRect.left;
        let newTop = e.clientY - offsetY - platnoRect.top;

        newLeft = Math.max(0, Math.min(newLeft, platnoRect.width - draggedElement.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, platnoRect.height - draggedElement.offsetHeight));

        draggedElement.style.left = newLeft + 'px';
        draggedElement.style.top = newTop + 'px';
    }

    if (resizing && resizedElement) {
        const dx = e.clientX - offsetX;
        const dy = e.clientY - offsetY;

        let newWidth = startWidth + dx;
        let newHeight = startHeight + dy;

        const maxRight = platnoRect.width - resizedElement.getBoundingClientRect().left + platnoRect.left;
        const maxBottom = platnoRect.height - resizedElement.getBoundingClientRect().top + platnoRect.top;

        if (newWidth >= 100 && newWidth <= maxRight && newWidth <= 500) {
            resizedElement.style.width = newWidth + 'px';
        }
        if (newHeight >= 50 && newHeight <= maxBottom && newHeight <= 50) {
            resizedElement.style.height = newHeight + 'px';
        }
    }
});

window.addEventListener('mouseup', () => {
    dragging = false;
    resizing = false;
    draggedElement = null;
    resizedElement = null;
});
