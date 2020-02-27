<template>
  <div class="container">
    <h1 :class="$style.headerLarge">
      DEWIT
    </h1>
    <p :class="$style.textLarge">
      <!--  -->
      Welcome to the best todo list you have ever seen
    </p>
    <router-link
      to="/todolist"
      :class="$style.link"
    >
      Go to Todo List
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style module>
.headerLarge {
  font-size: 100px;
}

.textLarge {
  font-size: 50px;
}

.link {
  font-size: 40px;
  text-decoration-line: none;
  color: #42b883;
}
</style>