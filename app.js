const months = Array.from({ length: 12 }, (e, i) => {
  return new Date(null, i + 1, null).toLocaleDateString('en', { month: 'long' });
});
const shuffle = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[r]] = [newArr[r], newArr[i]];
  }
  return newArr;
};

const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-btn');

const monthsList = [];
let dragStartIndex;

const createList = () => {
  const tempMonths = shuffle(months);
  tempMonths.forEach((month, index) => {
    const item = document.createElement('li');
    item.setAttribute('data-index', index);
    item.innerHTML = `
    <span class='number'>${index + 1}</span>
    <div class='draggable' draggable='true'>
      <p class='month'>${month}</p>
      <span>📅</span>
    </div>
    `;
    monthsList.push(item);
    draggableList.appendChild(item);

    addEventListeners();
  });
};

const dragStart = (e) => {
  dragStartIndex = Number(e.currentTarget.closest('li').getAttribute('data-index'));
  e.target.classList.add('hold');
};
const dragEnd = (e) => {
  e.target.classList.remove('hold');
};
const dragOver = (e) => e.preventDefault();
const dragDrop = (e) => {
  const dragEndIndex = Number(e.currentTarget.getAttribute('data-index'));
  swap(dragStartIndex, dragEndIndex);
  e.currentTarget.classList.remove('over');
};
const dragEnter = (e) => {
  e.currentTarget.classList.add('over');
};
const dragLeave = (e) => {
  e.currentTarget.classList.remove('over');
};

const swap = (from, to) => {
  const itemOne = monthsList[from].querySelector('.draggable');
  const itemTwo = monthsList[to].querySelector('.draggable');
  monthsList[from].appendChild(itemTwo);
  monthsList[to].appendChild(itemOne);
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((item) => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};
createList();

const checkOrder = () => {
  monthsList.forEach((item, index) => {
    if (item.querySelector('.month').textContent === months[index]) {
      item.classList.remove('wrong');
      item.classList.add('right');
    } else {
      item.classList.add('wrong');
    }
  });
};
checkBtn.addEventListener('click', checkOrder);
