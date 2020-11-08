<template>
  <div class="login">
    <LoginCompo />
    <v-footer app dark>
      <v-flex class='text-xs-center'> © 2020. All rights reserved.</v-flex>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginCompo from "@/components/LoginCompo.vue";

export default {
  name: "Login",
  components: {
    LoginCompo
  }
};
</script>