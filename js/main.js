let inpNumberX = document.querySelector('.number_for-x');
let inpNumberY = document.querySelector('.number_for-y');

let button = document.querySelector('.submit');
let tableContainer = document.querySelector('.table-container'); // Убедитесь, что этот элемент существует

let arrX = [];
let arrY = [];

// Функция для вычисления натурального логарифма
const ln = (n) => Math.log(n);

// Функция для суммирования значений в массиве
const sum = (arr) => arr.reduce((a, b) => a + b, 0);

// Функция для вычисления среднего значения массива
const average = (arr) => arr.length > 0 ? sum(arr) / arr.length : 0;

// Функция для форматирования числа до 3 знаков после запятой
const format = (num) => Number(num.toFixed(3));

// Функция для обновления таблицы
const updateTable = () => {
  // Проверяем, существует ли tableContainer
  if (!tableContainer) {
      console.error("Table container not found.");
      return; // Если не найден, прекращаем выполнение функции
  }

  // Очищаем существующую таблицу
  tableContainer.innerHTML = '';

  // Создаем контейнер для прокрутки
  const scrollContainer = document.createElement('div');
  scrollContainer.style.overflowX = 'auto'; // Прокрутка по горизонтали
  scrollContainer.style.width = '100%'; // Ширина 100% от родителя

  // Создаем таблицу
  const table = document.createElement('table');
  table.style.width = 'max-content'; // Таблица будет шире, чем контейнер
  table.style.borderCollapse = 'collapse'; // Убираем двойные границы

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>X</th><th>Y</th><th>ln(X)</th><th>ln(Y)</th><th>ln(X * Y)</th><th>ln(X^2)</th><th>ln(Y^2)</th>';
  table.appendChild(headerRow);

  // Вычисляем натуральные логарифмы и значения
  let lnX = arrX.map(ln);
  let lnY = arrY.map(ln);
  
  // Корректно вычисляем ln(X * Y)
  let lnXY = arrX.map((val, index) => ln(val) * lnY[index]); // Используем ln для X и Y
  
  // Возводим логарифмы в квадрат
  let lnX2 = lnX.map((val) => val ** 2);
  let lnY2 = lnY.map((val) => val ** 2);

  // Заполняем таблицу значениями
  for (let i = 0; i < arrX.length; i++) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${format(arrX[i])}</td>
          <td>${format(arrY[i])}</td>
          <td>${format(lnX[i])}</td>
          <td>${format(lnY[i])}</td>
          <td>${format(lnXY[i])}</td>
          <td>${format(lnX2[i])}</td>
          <td>${format(lnY2[i])}</td>
      `;
      table.appendChild(row);
  }

  // Добавляем строку для суммы
  const sumRow = document.createElement('tr');
  sumRow.innerHTML = `
      <td><strong>Сумма</strong></td>
      <td><strong>${format(sum(arrY))}</strong></td>
      <td><strong>${format(sum(lnX))}</strong></td>
      <td><strong>${format(sum(lnY))}</strong></td>
      <td><strong>${format(sum(lnXY))}</strong></td>
      <td><strong>${format(sum(lnX2))}</strong></td>
      <td><strong>${format(sum(lnY2))}</strong></td>
  `;
  table.appendChild(sumRow);

  // Добавляем строку для средних значений
  const averageRow = document.createElement('tr');
  averageRow.innerHTML = `
      <td><strong>Среднее</strong></td>
      <td><strong>${format(average(arrY))}</strong></td>
      <td><strong>${format(average(lnX))}</strong></td>
      <td><strong>${format(average(lnY))}</strong></td>
      <td><strong>${format(average(lnXY))}</strong></td>
      <td><strong>${format(average(lnX2))}</strong></td>
      <td><strong>${format(average(lnY2))}</strong></td>
  `;
  table.appendChild(averageRow);

  // Добавляем таблицу в прокручиваемый контейнер
  scrollContainer.appendChild(table);
  // Добавляем прокручиваемый контейнер в основной контейнер
  tableContainer.appendChild(scrollContainer);
};



button.addEventListener('click', (e) => {
  e.preventDefault();

  if (inpNumberX.value === '' || inpNumberY.value === '') {
    console.log('Please enter values for both X and Y');
  } else {
    // Преобразуем значения из input к числовому типу, заменяя запятые на точки и разбивая по запятой
    let xValues = inpNumberX.value.split(',').map(num => parseFloat(num.replace(',', '.')));
    let yValues = inpNumberY.value.split(',').map(num => parseFloat(num.replace(',', '.')));

    // Проверяем на корректность введенных данных
    if (xValues.some(isNaN) || yValues.some(isNaN)) {
      console.log('Invalid input: Please enter valid numbers separated by commas.');
      return;
    }

    // Добавляем в массивы
    arrX.push(...xValues);
    arrY.push(...yValues);

    // Вычисляем натуральные логарифмы для всех значений в массивах
    let lnX = arrX.map(ln);
    let lnY = arrY.map(ln);

    // Корректно вычисляем ln(X * Y) через сумму логарифмов
    let lnXY = lnX.map((val, index) => val *   lnY[index]);

    // Возводим логарифмы в квадрат для всех элементов массива
    let lnX2 = lnX.map((val) => val ** 2);
    let lnY2 = lnY.map((val) => val ** 2);

    // Выводим результаты для всех элементов
    console.log("ln(X) sum:", format(sum(lnX)));
    console.log("ln(Y) sum:", format(sum(lnY)));
    console.log("ln(X*Y) sum:", format(sum(lnXY)));
    console.log("ln(X^2) sum:", format(sum(lnX2)));
    console.log("ln(Y^2) sum:", format(sum(lnY2)));

    // Выводим средние значения
    console.log("ln(X) average:", format(average(lnX)));
    console.log("ln(Y) average:", format(average(lnY)));
    console.log("ln(X*Y) average:", format(average(lnXY)));
    console.log("ln(X^2) average:", format(average(lnX2)));
    console.log("ln(Y^2) average:", format(average(lnY2)));

    // Обновляем таблицу
    updateTable();
  }

  // Очищаем input поля после ввода
  inpNumberX.value = '';
  inpNumberY.value = '';
});
