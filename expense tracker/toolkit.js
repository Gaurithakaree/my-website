// Sidebar Functionality
function openSidebar() {
    document.getElementById("tools-sidebar").style.left = "0";
    document.getElementById("main-content").style.marginLeft = "300px";
}

function closeSidebar() {
    document.getElementById("tools-sidebar").style.left = "-300px";
    document.getElementById("main-content").style.marginLeft = "0";
}

// Show/Hide Tool Sections
function showCalculator() { hideAll(); document.getElementById("calculator").style.display = "block"; }
function showNotepad() { hideAll(); document.getElementById("notepad").style.display = "block"; }
function showUnitConverter() { hideAll(); document.getElementById("unit-converter").style.display = "block"; }
function showTemperatureConverter() { hideAll(); document.getElementById("temperature-converter").style.display = "block"; }
function showToDoList() { hideAll(); document.getElementById("todo-list").style.display = "block"; }
function showTimer() { hideAll(); document.getElementById("timer").style.display = "block"; }

function hideAll() {
    const sections = document.querySelectorAll('.tool-section');
    sections.forEach(section => section.style.display = 'none');
}

// Calculator Logic
function appendNumber(number) {
    const display = document.getElementById("calc-display");
    display.value += number;
}

function appendOperator(operator) {
    const display = document.getElementById("calc-display");
    const lastChar = display.value[display.value.length - 1];

    // Prevent adding multiple operators in succession
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1);
    }
    display.value += ' ' + operator + ' ';
}

function appendFunction(func) {
    const display = document.getElementById("calc-display");
    if (func === 'sqrt') {
        display.value += 'Math.sqrt(';
    } else if (func === 'sqr') {
        display.value += '**2'; // Change to use ** for exponentiation
    } else if (func === 'exp') {
        display.value += 'Math.exp(';
    } else if (func === 'log') {
        display.value += 'Math.log(';
    } else if (func === 'ln') {
        display.value += 'Math.log('; // Natural log
    }
}

function clearDisplay() {
    document.getElementById("calc-display").value = '';
}

function deleteLast() {
    const display = document.getElementById("calc-display");
    display.value = display.value.trim().split(' ').slice(0, -1).join(' ') + ' ';
}

function calculateResult() {
    const display = document.getElementById("calc-display");
    try {
        const result = eval(display.value.replace(/Math.sqrt/g, 'Math.sqrt').replace(/[^0-9+\-*/().% ]/g, ''));
        display.value = result;
    } catch (e) {
        alert("Invalid expression");
        display.value = '';
    }
}

// Notepad Logic
function saveNotes() {
    const content = document.getElementById("notepad-content").value;
    if (content) {
        const savedNotes = document.getElementById("saved-notes");
        const noteItem = document.createElement("div");
        noteItem.textContent = content;
        savedNotes.appendChild(noteItem);
        document.getElementById("notepad-content").value = ""; // Clear input
    } else {
        alert("Please write something to save.");
    }
}

// Unit Converter Logic
function convertLength() {
    const lengthValue = parseFloat(document.getElementById("length-input").value);
    const lengthUnit = document.getElementById("length-unit").value;
    let convertedValue;

    switch (lengthUnit) {
        case "meters":
            convertedValue = {
                kilometers: lengthValue / 1000,
                miles: lengthValue / 1609.34,
                feet: lengthValue * 3.28084
            };
            break;
        case "kilometers":
            convertedValue = {
                meters: lengthValue * 1000,
                miles: lengthValue / 1.60934,
                feet: lengthValue * 3280.84
            };
            break;
        case "miles":
            convertedValue = {
                meters: lengthValue * 1609.34,
                kilometers: lengthValue * 1.60934,
                feet: lengthValue * 5280
            };
            break;
        case "feet":
            convertedValue = {
                meters: lengthValue / 3.28084,
                kilometers: lengthValue / 3280.84,
                miles: lengthValue / 5280
            };
            break;
    }

    document.getElementById("length-output").textContent = `Converted: ${convertedValue.meters.toFixed(2)} meters, ${convertedValue.kilometers.toFixed(2)} kilometers, ${convertedValue.miles.toFixed(2)} miles, ${convertedValue.feet.toFixed(2)} feet`;
}

function convertWeight() {
    const weightValue = parseFloat(document.getElementById("weight-input").value);
    const weightUnit = document.getElementById("weight-unit").value;
    let convertedValue;

    switch (weightUnit) {
        case "kilograms":
            convertedValue = {
                grams: weightValue * 1000,
                pounds: weightValue * 2.20462,
                ounces: weightValue * 35.274
            };
            break;
        case "grams":
            convertedValue = {
                kilograms: weightValue / 1000,
                pounds: weightValue / 453.592,
                ounces: weightValue / 28.3495
            };
            break;
        case "pounds":
            convertedValue = {
                kilograms: weightValue / 2.20462,
                grams: weightValue * 453.592,
                ounces: weightValue * 16
            };
            break;
        case "ounces":
            convertedValue = {
                kilograms: weightValue / 35.274,
                grams: weightValue * 28.3495,
                pounds: weightValue / 16
            };
            break;
    }

    document.getElementById("weight-output").textContent = `Converted: ${convertedValue.kilograms.toFixed(2)} kg, ${convertedValue.grams.toFixed(2)} g, ${convertedValue.pounds.toFixed(2)} lb, ${convertedValue.ounces.toFixed(2)} oz`;
}

// Temperature Converter Logic
function convertTemperature() {
    const tempValue = parseFloat(document.getElementById("temp-input").value);
    const tempUnit = document.getElementById("temp-unit").value;
    let convertedValue;

    if (tempUnit === "C") {
        convertedValue = (tempValue * 9 / 5) + 32; // Celsius to Fahrenheit
        document.getElementById("temp-output").textContent = `Converted: ${convertedValue.toFixed(2)} °F`;
    } else if (tempUnit === "F") {
        convertedValue = (tempValue - 32) * 5 / 9; // Fahrenheit to Celsius
        document.getElementById("temp-output").textContent = `Converted: ${convertedValue.toFixed(2)} °C`;
    } else if (tempUnit === "K") {
        convertedValue = tempValue - 273.15; // Kelvin to Celsius
        document.getElementById("temp-output").textContent = `Converted: ${convertedValue.toFixed(2)} °C`;
    }
}

// To-Do List Logic
function addTask() {
    const taskInput = document.getElementById("todo-input");
    const taskValue = taskInput.value;
    const taskList = document.getElementById("task-list");

    if (taskValue) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskValue;
        taskItem.onclick = function() { this.classList.toggle("completed"); }
        taskList.appendChild(taskItem);
        taskInput.value = ""; // Clear input
    } else {
        alert("Please enter a task.");
    }
}

// Timer Logic
let timerInterval;

function startTimer() {
    const minutes = parseInt(document.getElementById("timer-input").value);
    const timerOutput = document.getElementById("timer-output");

    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes.");
        return;
    }

    let time = minutes * 60; // Convert minutes to seconds
    timerOutput.textContent = formatTime(time);

    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            timerOutput.textContent = "00:00";
            return;
        }
        time--;
        timerOutput.textContent = formatTime(time);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer-output").textContent = "";
    document.getElementById("timer-input").value = "";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
