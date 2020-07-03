<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/sign-in">Sign In</router-link> |
      <router-link to="/sign-up">Sign Up</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #78c2ad;
}

/* animations */
@keyframes wiggle {
  0% {
    transform: translateX(0px);
  }
  33% {
    transform: translateX(10px);
  }
  66% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
