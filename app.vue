<template>
  <VueTerminal
    :intro="intro"
    console-sign="$"
    allow-arbitrary
    height="500px"
    @command="onCliCommand"
  ></VueTerminal>
</template>

<script>
import VueTerminal from "vue-terminal-ui";

export default {
  name: "App",
  data() {
    return {
      intro: "Welcome to vue-terminal demo"
    };
  },
  methods: {
    onCliCommand(data, resolve, reject) {
      console.log(data);
      setTimeout(() => {
        resolve("");
      }, 300);
    }
  },
  components: {
    VueTerminal
  }
};
</script>
