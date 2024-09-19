<template>
  <div class="task-board">
    <el-row :gutter="20">
      <el-col class="grid-content ep-bg-purple" :span="8"
        v-for="status in statuses"
        :key="status"
        @dragover.prevent
        @drop="(event) => handleDrop(status, event)"
      >
        <el-card>
          <h2>{{ status }}</h2>
          <TaskCard
            v-for="task in filteredTasks(status)"
            :key="task.id"
            :task="task"
          />
          <el-button type="primary" class="btn" @click="showCreateModal = true">Add task</el-button>
        </el-card>
      </el-col>
    </el-row>

    <CreateTaskModal :show="showCreateModal" @close="showCreateModal = false" />
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import TaskCard from '@/components/TaskCard.vue';
import { ref, onMounted } from 'vue';
import CreateTaskModal from '@/components/CreateTaskModal.vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElRow, ElCol } from 'element-plus';


const taskStore = useTaskStore();

onMounted(() => {
  taskStore.init(); // Инициализируйте хранилище при загрузке компонента
});

const showCreateModal = ref(false);
const statuses = ['TODO', 'In Progress', 'Done'];

const filteredTasks = (status) => {
  return taskStore.tasks.filter(task => task.status === status);
};

const handleDrop = (newStatus, event) => {
  event.preventDefault();
  const taskId = event.dataTransfer.getData('task-id');
  console.log("Task ID on drop:", taskId); // Лог для отладки
  if (taskId) {
    taskStore.changeTaskStatus(parseInt(taskId), newStatus);
  } else {
    console.error('No task ID found in dataTransfer');
  }
};
</script>

<style scoped>
.task-board {
  max-width: 1200px; /* или другое значение */
  margin: 0 auto; /* центрирование */
  .btn {
    margin-top: 10px;
  }
}
</style>

