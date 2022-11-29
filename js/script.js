import {calories} from "./utils.js";

const form = document.counter   //querySelector('.counter__form');

const resultField = document.querySelector('.counter__result');
const result = document.querySelector('.counter__result');

// поля для ввода и выбор пола
const age = form.age;        // querySelector('#age');
const height = form.height;  //querySelector('#height');
const weight = form.weight;  //querySelector('#weight');
const gender = form.gender;  //form.querySelector('input[name="gender"]:checked');

// радиокнопки активности
const radios = form.querySelectorAll('input[name="activity"]');
// выбранный  коэфициент активности
let coefChoused = form.querySelector('input[name="activity"]:checked');

// кнопки расчета и сброса
const button = form.submit;
const reset = form.reset;

const coefActive = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9
}

// значения внути полей ввода
const inputs = [].slice.call(document.querySelectorAll('input[type="text"]'))

inputs.forEach(function (el) {
    el.addEventListener('input', checkInputs, false);
});

//активация кнопки расчета, если все поля заполненны
function checkInputs() {
    const empty = inputs.filter(function (el) {
        return el.value.trim() === '';
    }).length;
    button.disabled = empty !== 0;
}

inputs.forEach(function (elem) {
    elem.addEventListener('input', oneFieldFill);
});

// активация кнопки сброса, если хотя бы одно поле заполненно
function oneFieldFill() {
    if (age.value.trim() !== 0 || height.value.trim() !== 0 || weight.value.trim() !== 0) {
        reset.disabled = false;
    }
}

radios.forEach(function (radio) {
    radio.addEventListener('input', checkActivityBlock);
});

// нахождение выбранной физ. активности
function checkActivityBlock(key, value) {
    for (let radio of radios) {
        if (radio.checked) {
            coefChoused = radio;
        }
    }
}

reset.addEventListener('click', resetData)

// приведение данных к дефолтному виду, блокировка кнопок
function resetData() {
    age.value = 0;
    height.value = 0;
    weight.value = 0;
    gender.value = 'male'
    coefChoused.value = 'min';
    form.activity.value = 'min';
    reset.disabled = true;
    button.disabled = true;
    resultField.classList.add('counter__result--hidden');
}

const calculate = () => {
    return calories(age.value, height.value, weight.value, gender.value, coefActive[coefChoused.value])
}

button.addEventListener('click', show);

// отображение полученных результатов
function show(evnt) {
    evnt.preventDefault();

    const normCalories = calculate().toFixed(2);
    result.querySelector('#calories-norm').textContent =  normCalories;
    result.querySelector('#calories-minimal').textContent  = (normCalories * 0.85).toFixed(2);
    result.querySelector('#calories-maximal').textContent =  (normCalories * 1.15).toFixed(2);
    resultField.classList.remove('counter__result--hidden');
}
