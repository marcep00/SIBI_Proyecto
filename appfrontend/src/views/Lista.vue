<template>
  <div class="lista">
    <ListaCompo :usuario='$route.params.usuario'/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListaCompo from "@/components/ListaCompo.vue";

export default {
  name: "Lista",
  components: {
    ListaCompo
  }
};
</script>