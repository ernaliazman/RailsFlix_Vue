<!-- src/pages/MovieList.vue -->
<template>
    <div>
      <h1>Movie List</h1>
      <TableLayout :tableData="wideTableData" :columns="columns" />
    </div>
  </template>
  
  <script>
  import TableLayout from '../../components/TableLayout.vue';
  
  export default {
    components: {
      TableLayout,
    },
    data() {
      return {
        // Define the table data
        wideTableData: [
          { name: 'John Doe', email: 'john@example.com', title: 'Engineer', status: 'Active', role: 'Owner' },
          { name: 'Jane Smith', email: 'jane@example.com', title: 'Manager', status: 'Inactive', role: 'Admin' },
        ],
        // Define the columns dynamically
        columns: [
          { label: 'Name', field: 'name' },
          { label: 'Email', field: 'email' },
          { label: 'Title', field: 'title' },
          { label: 'Status', field: 'status' },
          { label: 'Role', field: 'role' },
        ],
      };
    },
  };
  </script>
  