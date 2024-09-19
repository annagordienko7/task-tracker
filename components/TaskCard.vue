<template>
  <div>
    <el-card class="task-card" draggable="true" @dragstart="onDragStart">
      <h3>{{ task.title }}</h3>
      <p v-if="task.description">{{ task.description }}</p>
      <p><strong>Assignee:</strong> {{ task.assignee }}</p>
      <p v-if="Array.isArray(task.performers) && task.performers.length">
        <strong>Performers:</strong> {{ task.performers.join(', ') }}
      </p>
      <p><strong>Status:</strong> {{ task.status }}</p>
      <p><strong>Priority:</strong> {{ task.priority }}</p>
      <el-button type="primary" @click="editTask">Edit</el-button>
      <el-button type="danger" @click="deleteTask">Delete</el-button>
    </el-card>
    <EditTaskModal
      :task="currentTask"
      :show="showEditModal"
      @close="showEditModal = false"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import EditTaskModal from '@/components/EditTaskModal.vue';
import { useTaskStore } from '@/stores/tasks';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElRow, ElCol,ElCard } from 'element-plus';


const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const taskStore = useTaskStore();
const showEditModal = ref(false);
const currentTask = ref(props.task);

const onDragStart = (event) => {
  event.dataTransfer.setData('task-id', props.task.id);
  console.log('Drag started for task:', props.task.id); // Лог для отладки
};

const editTask = () => {
  currentTask.value = { ...props.task }; // Убедитесь, что текущая задача скопирована
  showEditModal.value = true; // Показать окно редактирования
};

const deleteTask = () => {
  taskStore.deleteTask(props.task.id);
};
</script>

<style scoped>
.task-card {
  margin-bottom: 20px;
}
</style>
