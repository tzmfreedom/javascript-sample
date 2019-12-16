const btn = document.getElementById('modal-button');
const modal = document.getElementById('modal-background');
btn.onclick = () => {
  modal.style.display = 'block';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  } else if (event.target === modal2) {
    modal2.style.display = 'none';
  } else {
    // console.log(event);
  }
};

const btn2 = document.getElementById('draggable-modal-button');
const modal2 = document.getElementById('draggable-modal-background');
btn2.onclick = () => {
  modal2.style.display = 'block';
};

const mouseupOriginal = document.onmouseup;
const mousemoveOriginal = document.onmousemove;

dragElement(document.getElementById('draggable-modal-content'));

function dragElement(elm) {
  let x, y = 0;
  elm.onmousedown = (e) => {
    e.preventDefault();
    x = e.clientX;
    y = e.clientY;
    document.onmouseup = () => {
      document.onmouseup = mouseupOriginal;
      document.onmousemove = mousemoveOriginal;
    };

    document.onmousemove = (e) => {
      const moveY = e.clientY - y;
      const moveX = e.clientX - x;
      x = e.clientX;
      y = e.clientY;
      elm.style.top = (elm.offsetTop + moveY) + 'px';
      elm.style.left = (elm.offsetLeft + moveX) + 'px';
    };
  };
}


const calendarBtn = document.getElementById('calendar-button');
const inputDate = document.getElementById('input-date')
const calendarUi = document.getElementById('calendar-ui');
const calendarUiBody = document.getElementById('calendar-ui-body');
const calendarPrevious = document.getElementById('calendar-previous');
const calendarNext = document.getElementById('calendar-next');
const calendarTitle = document.getElementById('calendar-title');

let currentYear = (new Date()).getFullYear();
let currentMonth = (new Date()).getMonth();

inputDate.onfocus = (e) => {
  calendarUi.style.left = (inputDate.offsetLeft) + 'px';
  calendarUi.style.top = (inputDate.offsetTop + inputDate.offsetHeight) + 'px';
  calendarUi.style.display = 'block';
};

inputDate.onblur = (e) => {
  calendarUi.style.display = 'none';
};

calendarBtn.onclick = (e) => {
  calendarUi.style.left = (inputDate.offsetLeft) + 'px';
  calendarUi.style.top = (inputDate.offsetTop + inputDate.offsetHeight) + 'px';
  calendarUi.style.display = 'block';
};

calendarPrevious.onclick = (e) => {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
  showCalendar(currentYear, currentMonth);
};

calendarNext.onclick = (e) => {
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
  } else {
    currentMonth++;
  }
  showCalendar(currentYear, currentMonth);
};

const daysInMonth = (year, month) => {
  return 32 - new Date(year, month, 32).getDate();
};

const showCalendar = (year, month) => {
  calendarTitle.textContent = `${year}-${(month+1).toString().padStart(2, '0')}`;

  const firstDay = (new Date(year, month)).getDay();
  let row = document.createElement('tr');
  const days = daysInMonth(year, month);
  for (let i = 0; i < firstDay; i++) {
    const col = document.createElement('td');
    row.append(col);
  }
  calendarUiBody.textContent = '';
  for (let i = 0; i < days; i++) {
    const col = document.createElement('td');
    col.className = 'day';
    col.textContent = (i+1).toString();
    col.onmousedown = () => {
      // debugger;
      inputDate.value = `${year}-${(month+1).toString().padStart(2, '0')}-${col.textContent.padStart(2, '0')}`;
      calendarUi.style.display = 'none';
    };
    row.append(col);
    if ((i + firstDay) % 7 === 6) {
      calendarUiBody.append(row);
      row = document.createElement('tr');
    }
  }
  calendarUiBody.append(row);
}

showCalendar(currentYear, currentMonth);

const ondragstart = (e) => {
  e.target.classList.add("drag-active");
};
const ondrag = (e) => {
  e.preventDefault();
  const x = e.clientX;
  const y = e.clientY;
  const selectedItem = e.target;
  const list = selectedItem.parentNode;
  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);
  if (list === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextElementSibling ? swapItem : swapItem.nextElementSibling;
    if (selectedItem !== swapItem) {
      console.log(selectedItem)
      console.log(swapItem)
      list.insertBefore(selectedItem, swapItem);
    }
  }
};
const ondragover = (e) => e.preventDefault();
const ondrop = (e) => {
  e.preventDefault();
  e.target.classList.remove("drag-active");
};

const draggableList = document.getElementById('draggable-list');
Array.from(draggableList.children).forEach((child) => {
  child.setAttribute('draggable', 'true');
  child.ondragstart = ondragstart;
  child.ondrag = ondrag;
  child.ondragover = ondragover;
  child.ondragend = ondrop;
});


const dropArea = document.getElementById('file-drop-area');
dropArea.ondragenter = (e) => {
  e.preventDefault();
  e.target.classList.add('active');
};
dropArea.ondragleave = (e) => {
  e.target.classList.remove('active');
}
dropArea.ondragover = (e) => e.preventDefault();
dropArea.ondrop = (e) => {
  e.preventDefault();
  e.target.classList.remove('active');
  const fr = new FileReader();
  fr.onload = (e) => {
    const content = document.getElementById('file-content');
    content.textContent = e.target.result;
    content.style.display = 'block';
  };
  fr.readAsText(e.dataTransfer.files[0]);
};
