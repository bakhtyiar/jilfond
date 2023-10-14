<template>
  <AHeader />
  <router-view />
</template>

<script>
import AHeader from "@/components/blocks/AHeader";
export default {
  components: { AHeader },
};
</script>

<style lang="scss">
@font-face {
  font-family: "Montserrat";
  src: url("./../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf")
    format("truetype");
  font-weight: 125 950;
  font-stretch: 75% 125%;
  font-style: oblique 0deg 12deg;
}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  box-sizing: border-box;
  scrollbar-width: auto;
  scrollbar-color: #8c8c8c #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #ffffff;
}

*::-webkit-scrollbar-thumb {
  background-color: #8c8c8c;
  border-radius: 10px;
  border: 4px solid #ffffff;
}

#app {
  font-family: Montserrat, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 1260px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
</style>
