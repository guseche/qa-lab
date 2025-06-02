// Variables del DOM
const taskForm = document.querySelector('.task-input-grid');
const taskList = document.querySelector('.task-list');
const taskTitle = document.querySelector('input[placeholder="Task Title"]');
const taskPriority = document.querySelector('select.input-field');
const taskCategory = document.querySelector('input[placeholder="Category"]');
const taskDescription = document.querySelector('textarea[placeholder="Task description"]');
const taskDate = document.querySelector('input[type="date"]');
const addTaskBtn = document.querySelector('.add-task-button');

//Nivel de productividad
const elementProductivityLevel = document.querySelectorAll('#productivity-level');
const productivityExperience = document.getElementById('productivity-exp');
const levelProgressBar = document.querySelector('.level-progress-bar');
let actualExp = 200;
let productivityLevel = 1;
elementProductivityLevel.forEach(element => {
    element.textContent = `Level ${productivityLevel}`;
});
productivityExperience.textContent = `${actualExp}/${(300 * productivityLevel) + (productivityLevel ** 2)}`;
levelProgressBar.style.width = `${(actualExp / ((300 * productivityLevel) + (productivityLevel ** 2))) * 100}%`;


// Contador de tareas completadas
let completedTasks = 156;
const tasksCompletedCard = document.querySelector('.summary-card.tasks .value');

// Contador de completadas en la semana
let completedTasksWeek = 38;
const tasksCompletedWeekCard = document.getElementById('week-goal');
tasksCompletedWeekCard.textContent = `${completedTasksWeek}/40`;
const progressPercentage = document.querySelector('.progress-percentage');
const progressBarWeek = document.getElementById('progress-bar-week');
progressPercentage.textContent = `${(completedTasksWeek / 40) * 100}%`;
progressBarWeek.style.width = `${(completedTasksWeek / 40) * 100}%`;

// Event listener para agregar nueva tarea
addTaskBtn.addEventListener('click', function (e) {
    e.preventDefault();
    addNewTask();
});

function defaultTask() {
    const title = 'Tarea de ejemplo';
    const priority = 'Alta';
    const category = 'Estudios';
    const description = 'Esta es una tarea de ejemplo para mostrar cómo se verán las tareas en la lista. Puedes modificarla o eliminarla y agregar tus propias tareas.';
    const date = new Date().toISOString().split('T')[0];

    const taskItem = createTaskElement(title, priority, category, description, date);

    taskList.insertBefore(taskItem, taskList.firstChild);
}

// Función para agregar nueva tarea
function addNewTask() {
    const title = taskTitle.value.trim();
    const priority = taskPriority.value;
    const category = taskCategory.value.trim();
    const description = taskDescription.value.trim();
    const date = taskDate.value;

    if (!title) {
        alert('Por favor ingresa un título para la tarea');
        taskTitle.focus();
        return;
    }

    const taskItem = createTaskElement(title, priority, category, description, date);

    taskList.insertBefore(taskItem, taskList.firstChild);

    clearForm();

    showMessage('Tarea agregada exitosamente');
}

// Función para crear elemento de tarea
function createTaskElement(title, priority, category, description, date) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    const displayDate = date ? new Date(date).toLocaleDateString('es-ES') : 'Sin fecha';
    const displayCategory = category || 'General';
    const displayDescription = description || 'Sin descripción';

    taskItem.innerHTML = `
                <input type="checkbox" class="checkbox">
                <div class="task-details">
                    <h4 class="title-medium">${title}</h4>
                    <p class="body-medium" style="color: var(--md-sys-color-on-surface-variant);">${displayDescription}</p>
                    <div class="task-meta">
                        <span>${displayDate}</span>
                        <span class="material-icons" style="font-size: 16px;">timer</span>
                        <span>--</span>
                        <span>${priority.toLowerCase()}</span>
                        <span style="background: #e3f2fd; padding: 2px 8px; border-radius: 12px; font-size: 0.7rem;">${displayCategory}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="icon-btn play-btn" id="start-pomodoro">
                        <span class="material-icons">play_arrow</span>
                    </button>
                    <button class="icon-btn delete-btn">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            `;

    addTaskEventListeners(taskItem);

    return taskItem;
}

// Función para agregar event listeners a una tarea
async function addTaskEventListeners(taskItem) {
    const checkbox = taskItem.querySelector('.checkbox');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    const playBtn = taskItem.querySelector('.play-btn');

    checkbox.addEventListener('change', function () {
        if (this.checked) {
            taskItem.classList.add('completed');
            completedTasks++;
            completedTasksWeek++;
            tasksCompletedWeekCard.textContent = `${completedTasksWeek}/40`;
            tasksCompletedCard.textContent = completedTasks;
            actualExp += 150;

            if (actualExp > (300 * productivityLevel) + (productivityLevel ** 2)) {
                actualExp = actualExp - ((300 * productivityLevel) + (productivityLevel ** 2));
                productivityLevel++;
                elementProductivityLevel.forEach(element => {
                    element.textContent = `Level ${productivityLevel}`;
                });

            }

            productivityExperience.textContent = `${actualExp}/${(300 * productivityLevel) + (productivityLevel ^ 2)}`;
            levelProgressBar.style.width = `${(actualExp / ((300 * productivityLevel) + (productivityLevel ** 2))) * 100}%`;

            progressPercentage.textContent = `${(completedTasksWeek / 40) * 100}%`;
            progressBarWeek.style.width = `${(completedTasksWeek / 40) * 100}%`;

            showMessage('Tarea completada');
        } else {

            taskItem.classList.remove('completed');
            completedTasks--;
            tasksCompletedCard.textContent = completedTasks;
            completedTasksWeek--;
            tasksCompletedWeekCard.textContent = `${completedTasksWeek}/40`;
            actualExp -= 150;

            console.log(actualExp);

            if (actualExp < 0) {
                productivityLevel--;
                actualExp = ((300 * productivityLevel) + (productivityLevel ** 2)) + actualExp;
                elementProductivityLevel.forEach(element => {
                    element.textContent = `Level ${productivityLevel}`;
                });
            }

            productivityExperience.textContent = `${actualExp}/${(300 * productivityLevel) + (productivityLevel ^ 2)}`;
            levelProgressBar.style.width = `${(actualExp / ((300 * productivityLevel) + (productivityLevel ** 2))) * 100}%`;
        
            progressPercentage.textContent = `${(completedTasksWeek / 40) * 100}%`;
            progressBarWeek.style.width = `${(completedTasksWeek / 40) * 100}%`;
        }
    });

    // Botón eliminar
    deleteBtn.addEventListener('click', function () {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            if (taskItem.classList.contains('completed')) {
                completedTasks--;
                tasksCompletedCard.textContent = completedTasks;
            }
            taskItem.remove();
            showMessage('Tarea eliminada');
        }
    });

}

// Función para limpiar formulario
function clearForm() {
    taskTitle.value = '';
    taskPriority.selectedIndex = 1; // Medium Priority
    taskCategory.value = '';
    taskDescription.value = '';
    taskDate.value = '';
}

// Función para mostrar mensajes
function showMessage(message) {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--md-sys-color-primary);
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                animation: slideIn 0.3s ease;
            `;
    messageDiv.textContent = message;

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
    document.head.appendChild(style);

    document.body.appendChild(messageDiv);

    // Remover después de 3 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Establecer fecha actual como valor por defecto
taskDate.valueAsDate = new Date();

defaultTask();

const module = await import(`./pomodoro.js?t=${Date.now()}`);
if (module.init) module.init();