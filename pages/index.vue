<!-- pages/index.vue -->
<template>
    <div>
      <TaskBoard />
    </div>
  </template>
  
  <script setup>
  import TaskBoard from '@/components/TaskBoard.vue';
  
  </script>
  <style>
  /* Apply a gray background to the entire page */
  body {
    background-color: #d4d4d4;
    font-family: 'Arial', sans-serif;
    font-size: 20px;
    line-height: 35px;
    margin: 0;
    padding: 20px;
  }
  
  /* Ensure default margins and padding are reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  </style>