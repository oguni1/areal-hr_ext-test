<template>
  <div id="app">
    <nav class="nav-bar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/organizations">Organizations</router-link></li>
        <li><router-link to="/roles">Roles</router-link></li>
        <li><router-link to="/departments">Departments</router-link></li>
        <li><router-link to="/employees">Employees</router-link></li>
        <li><router-link to="/files">Files</router-link></li>
        <li><router-link to="/operation-history">Operation History</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
