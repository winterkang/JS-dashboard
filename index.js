// 명언
const quotes = [
  {
    quote : 'Success is going from failure to failure without a loss of enthusiasm.',
    author : '- Winston Churchill'
  }, 
  {
    quote : 'Always bear in mind that your own resolution to succeed is more important than any other.',
    author : '- Abraham Lincoln'
  },
  {
    quote : 'Try not to become a man of success but rather try to become a man of value.',
    author : '- Albert Einstein'
  },
  {
    quote : 'We must believe in luck. For how else can we explain the success of those we don’t like? ',
    author : '- Jean Cocteau'
  },
  {
    quote : 'I find that the harder I work, the more luck I seem to have. ',
    author : '- Thomas Jefferson'
  },
  {
    quote : 'Don’t be afraid to give up the good to go for the great.',
    author : '- John D. Rockefeller'
  },
  {
    quote : 'I owe my success to having listened respectfully to the very best advice, and then going away and doing the exact opposite. ',
    author : '- G. K. Chesterton'
  },
  {
    quote : 'All progress takes place outside the comfort zone.',
    author : '- Michael John Bobak'
  },
  {
    quote : 'I never dreamed about success, I worked for it. ',
    author : '- Estee Lauder'
  },
  {
    quote : 'The only thing worse than starting something and failing … is not starting something.',
    author : '- Seth Godin'
  },
]
const colors = [
  '#ee9ca7', '#ffdde1', '#C6FFDD', '#FBD786', '#f7797d', '#6DD5FA', '#FFEFBA', '#FDC830', '#a8c0ff', '#e1eec3', '#ffc3a0'
]
const profile = document.querySelector('.profile')
function randomColor(element){
  const randomColor1 = Math.floor(Math.random() * colors.length)
  const randomColor2 = Math.floor(Math.random() * colors.length)
  element.style.background = `linear-gradient(${colors[randomColor1]}, ${colors[randomColor2]})`
}
document.addEventListener('DOMContentLoaded', () => {
  randomColor(profile);
})


const quoteBox = document.querySelector('.quote-box')
const quote = document.querySelector('.quote-box span:first-child')
const author = document.querySelector('.quote-box span:last-child')
function quoteMaker(){
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]
  quote.innerText = randomQuote.quote
  author.innerText = randomQuote.author
  quoteBox.style.background = '#fff'
}

document.addEventListener('DOMContentLoaded', quoteMaker)

// 시계
const clock = document.querySelector('.clock')
function nowTime(){
  const time = new Date()
  const hours = String(time.getHours()).padStart(2, '0')
  const mins = String(time.getMinutes()).padStart(2, '0')
  const sec = String(time.getSeconds()).padStart(2, '0')

  const formattedTime = `${hours} : ${mins} : ${sec}`
  clock.innerText = formattedTime
}
setInterval(nowTime, 1000) // 실시간
document.addEventListener('DOMContentLoaded', nowTime)

// 날씨

const API_KEY = "fe6747b364df4e73f771db6fb583f92d";

function getWeatherData(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherIcon = data.weather[0].icon;
      const temperature = data.main.temp;
      const city = data.name;

      const weatherIconContainer = document.querySelector('.weather-icon-container');
      const temperatureElement = document.querySelector('.weather span:first-child');
      const cityElement = document.querySelector('.weather span:last-child');

      const iconUrl = `https://openweathermap.org/img/w/${weatherIcon}.png`;
      weatherIconContainer.setAttribute('src', iconUrl);
      temperatureElement.innerText = `${temperature} °C`;
      cityElement.innerText = city;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

function handleLocationError() {
  console.log("Unable to retrieve your location.");
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData, handleLocationError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

getLocation();


// 투두리스트
const toDoForm = document.querySelector('#todo-form');
const toDoList = document.querySelector('#todo-list');
const toDoInput = document.querySelector('#todo-form input');
let todos = [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach((todo) => {
      createToDoItem(todo.todo); // 수정: todo.todo 값을 전달
    });
  }
}

function createToDoItem(todo) {
  const li = document.createElement('li');
  li.style.listStyleType = 'none'; // Remove bullet style

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.addEventListener('click', handleToDoCheck);
  li.appendChild(checkBox);
  li.appendChild(document.createTextNode(todo));
  
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', handleToDoDelete);
  li.appendChild(deleteBtn);
  
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value.trim();
  toDoInput.value = '';

  if (newTodo !== '') {
    todos.push({ todo: newTodo, checked: false });
    createToDoItem(newTodo);
    saveTodos();
  }
}

function handleToDoCheck(event) {
  const checkbox = event.target;
  const li = checkbox.parentNode;
  const todoText = li.childNodes[1];
  const index = Array.from(li.parentNode.children).indexOf(li);

  todos[index].checked = checkbox.checked;

  if (checkbox.checked) {
    todoText.style.textDecoration = 'line-through';
  } else {
    todoText.style.textDecoration = 'none';
  }

  saveTodos();
}

function handleToDoDelete(event) {
  const li = event.target.parentNode;
  const index = Array.from(li.parentNode.children).indexOf(li);

  todos.splice(index, 1);
  li.remove();

  saveTodos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);
loadTodos();

//그림판
const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  let isDrawing = false;

  const colorPicker = document.getElementById('color-picker');
  const clearButton = document.getElementById('clear-button');
  const saveButton = document.getElementById('save-button');

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  clearButton.addEventListener('click', clearCanvas);
  saveButton.addEventListener('click', saveCanvas);

  // 그림 불러오기
  window.addEventListener('load', loadCanvas);

  function startDrawing(event) {
    isDrawing = true;
    const { offsetX, offsetY } = event;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  function draw(event) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = colorPicker.value;
    context.stroke();
  }

  function stopDrawing() {
    isDrawing = false;
  }

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasData('');
  }

  function saveCanvas() {
    const imageData = canvas.toDataURL();
    saveCanvasData(imageData);
  }

  function saveCanvasData(data) {
    localStorage.setItem('canvasData', data);
  }

  function loadCanvas() {
    const savedData = localStorage.getItem('canvasData');
    if (savedData) {
      const image = new Image();
      image.src = savedData;
      image.onload = function () {
        context.drawImage(image, 0, 0);
      };
    }
  }
