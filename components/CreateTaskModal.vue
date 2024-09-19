<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>Создать задачу</h2>
        <form @submit.prevent="createTask">
          <div>
            <label>Название:</label>
            <input v-model="newTask.title" required />
          </div>
          <div>
            <label>Описание:</label>
            <textarea v-model="newTask.description"></textarea>
          </div>
          <div>
            <label>Исполнитель:</label>
            <input v-model="newTask.assignee" />
          </div>
          <div>
            <label>Приоритет:</label>
            <select v-model="newTask.priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label>Статус:</label>
            <select v-model="newTask.status">
              <option>TODO</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <button type="submit">Создать</button>
          <button type="button" @click="cancelCreate">Отмена</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTaskStore } from '@/stores/tasks';
  
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const taskStore = useTaskStore();
  const newTask = ref({
    id: null, // ID будет установлен при создании
    title: '',
    description: '',
    assignee: '',
    priority: 'Low',
    status: 'TODO'
  });
  
  // Генерация уникального ID (можно заменить на более сложный метод, если нужно)
  const generateId = () => Date.now(); // Простая реализация, генерирующая ID на основе текущего времени
  
  const createTask = () => {
    newTask.value.id = generateId(); // Установите уникальный ID
    taskStore.addTask(newTask.value);
    emit('close'); // Закрыть модальное окно после создания
  };
  
  const cancelCreate = () => {
    emit('close'); // Закрыть модальное окно без создания
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  </style>
  