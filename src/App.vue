<template>
  <div id="nav" class="flex space-x-16 justify-center text-lg">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/Favorites">Favorites</router-link>
    <!-- <router-link to="/Decks">Decks</router-link> -->
  </div>
  
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 15px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
