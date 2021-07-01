<template>
  <span v-html="mensagem"></span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ToastAction",
  props: {
    mensagem: {
      type: String,
      default: "Substitua esta mensagem.<br>Pode ser?",
    },
  },
});
</script>

