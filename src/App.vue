<template>
  <v-app>
    <v-app-bar app color="primary white--text">
      <v-app-bar-title>
        <span class="display-1">Good Start</span>
        <v-divider inset vertical class="mx-1"></v-divider>
        <v-span>Championship of Players</v-span>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn plain to="/home" color="white">Home</v-btn>
      <v-btn plain to="/tournaments" color="white">Tournaments</v-btn>
      <v-btn plain to="/about" color="white">Profile</v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>

</style>

