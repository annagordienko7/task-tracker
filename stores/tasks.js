import { defineStore } from 'pinia';

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  actions: {
    init() {
      if (typeof window !== 'undefined') {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
          this.tasks = JSON.parse(savedTasks);
        }
      }
    },
    addTask(task) {
      // Убедитесь, что задача имеет уникальный идентификатор
      task.id = Date.now(); // Используйте уникальный идентификатор
      this.tasks.push(task);
      this.saveTasks();
    },
    changeTaskStatus(taskId, newStatus) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    updateTask(updatedTask) {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = updatedTask;
        this.saveTasks();
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasks();
    },
    saveTasks() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    }
  }
});
