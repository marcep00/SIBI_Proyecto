<template>
  <div class="home">
    <HomeCompo :usuario='$route.params.usuario'/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeCompo from "@/components/HomeCompo.vue";

export default {
  name: "Home",
  components: {
    HomeCompo
  }
};
</script>