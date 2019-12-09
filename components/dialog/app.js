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

calendarBtn.onclick = (e) => {
  calendarUi.style.left = (inputDate.offsetLeft) + 'px';
  calendarUi.style.top = (inputDate.offsetTop + inputDate.offsetHeight) + 'px';
  calendarUi.style.display = 'block';
};

const elems = document.getElementsByClassName('day');
for (let i = 0; i < elems.length; i++) {
  const elm = elems[i];
  elm.onclick = () => {
    inputDate.value = "2017-11-" + elm.textContent.padStart(2, '0');
    calendarUi.style.display = 'none';
  };
}