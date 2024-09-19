<template>
  <div class="task-board">
    <div
      class="column"
      v-for="status in statuses"
      :key="status"
      @dragover.prevent
      @drop="(event) => handleDrop(status, event)" 
    >
      <h2>{{ status }}</h2>
      <TaskCard
        v-for="task in filteredTasks(status)"
        :key="task.id"
        :task="task"
      />
      <button @click="showCreateModal = true">Добавить задачу</button>
      <CreateTaskModal :show="showCreateModal" @close="showCreateModal = false" />
    </div>

  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks';
import TaskCard from '@/components/TaskCard.vue';
import { ref } from 'vue';
import CreateTaskModal from '@/components/CreateTaskModal.vue';

const taskStore1 = useTaskStore();

onMounted(() => {
  taskStore1.init(); // Инициализируйте хранилище при загрузке компонента
});

const showCreateModal = ref(false);

const taskStore = useTaskStore();
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
