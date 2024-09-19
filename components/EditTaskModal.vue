<template>
    <div v-if="localShow" class="modal">
      <div class="modal-content">
        <h2>Редактировать задачу</h2>
        <form @submit.prevent="saveTask">
          <div>
            <label>Название:</label>
            <input v-model="editedTask.title" required />
          </div>
          <div>
            <label>Описание:</label>
            <textarea v-model="editedTask.description"></textarea>
          </div>
          <div>
            <label>Исполнитель:</label>
            <input v-model="editedTask.assignee" />
          </div>
          <div>
            <label>Приоритет:</label>
            <select v-model="editedTask.priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button type="submit">Сохранить</button>
          <button type="button" @click="cancelEdit">Отмена</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue';
  import { useTaskStore } from '@/stores/tasks';
  
  const props = defineProps({
    task: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  const taskStore = useTaskStore();
  
  // Локальное состояние для управления видимостью модального окна
  const localShow = ref(props.show);
  
  // Слежение за изменением свойства show
  watch(() => props.show, (newValue) => {
    localShow.value = newValue;
  });
  
  // Локальное состояние для редактируемой задачи
  const editedTask = reactive({ ...props.task });
  
  const saveTask = () => {
    taskStore.updateTask(editedTask);
    emit('close'); // Закрыть модальное окно после сохранения
  };
  
  const cancelEdit = () => {
    emit('close'); // Закрыть модальное окно без сохранения
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
  