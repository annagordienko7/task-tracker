<template>
    <div v-if="localShow" class="modal">
      <div class="modal-content">
        <h2>Edit Task</h2>

        <el-form @submit.prevent="saveTask">
    <el-form-item label="Title" required>
      <el-input v-model="editedTask.title" />
    </el-form-item>
    
    <el-form-item label="Description">
      <el-input type="textarea" v-model="editedTask.description" />
    </el-form-item>

    <el-form-item label="Assignee">
      <el-input v-model="editedTask.assignee" />
    </el-form-item>

    <el-form-item label="Priority">
      <el-select v-model="editedTask.priority">
        <el-option label="Low" value="Low" />
        <el-option label="Medium" value="Medium" />
        <el-option label="High" value="High" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="saveTask">Save</el-button>
      <el-button @click="cancelEdit">Cancel</el-button>
    </el-form-item>
  </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue';
  import { useTaskStore } from '@/stores/tasks';
  import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElRow, ElCol } from 'element-plus';

  
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
  