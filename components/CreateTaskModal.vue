<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h2>Создать задачу</h2>
        <el-form @submit.prevent="createTask">
    <el-form-item label="Title" required>
      <el-input v-model="newTask.title" />
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" v-model="newTask.description" />
    </el-form-item>
    <el-form-item label="Assignee">
      <el-input v-model="newTask.assignee" />
    </el-form-item>
    <el-form-item label="Priority">
      <el-select v-model="newTask.priority">
        <el-option label="Low" value="Low" />
        <el-option label="Medium" value="Medium" />
        <el-option label="High" value="High" />
      </el-select>
    </el-form-item>
    <el-form-item label="Status">
      <el-select v-model="newTask.status">
        <el-option label="TODO" value="TODO" />
        <el-option label="In Progress" value="In Progress" />
        <el-option label="Done" value="Done" />
      </el-select>
    </el-form-item>
    <el-button type="primary" @click="createTask">Create</el-button>
    <el-button @click="cancelCreate">Cancel</el-button>
  </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTaskStore } from '@/stores/tasks';
  import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElRow, ElCol } from 'element-plus';

  
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
  