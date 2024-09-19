<template>
  <div>
    <div
      class="task-card"
      draggable="true"
      @dragstart="onDragStart"
    >
      <h3>{{ task.title }}</h3>
      <p v-if="task.description">{{ task.description }}</p>
      <p><strong>Assignee:</strong> {{ task.assignee }}</p>
      <p v-if="Array.isArray(task.performers) && task.performers.length">
        <strong>Performers:</strong> {{ task.performers.join(', ') }}
      </p>
      <p><strong>Status:</strong> {{ task.status }}</p>
      <p><strong>Priority:</strong> {{ task.priority }}</p>
      <button @click="editTask">Edit</button>
      <button @click="deleteTask">Delete</button>
    </div>
    <EditTaskModal
      :task="currentTask"
      :show="showEditModal"
      @close="showEditModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EditTaskModal from '@/components/EditTaskModal.vue';
import { useTaskStore } from '@/stores/tasks';

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
