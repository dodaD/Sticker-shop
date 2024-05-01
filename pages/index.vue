<template>
  <div class="wrapper">
    <div class="navigation">
    </div>

    <div class="banner-image">
      <div class="box-inside-banner">
        Some text
      </div>
    </div>

    <div class="assortiment-wrapper">
    </div>
  </div>
</template>

<script setup lang="ts">
</script>


<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.navigation {
  background-color: Blue;
  height: 10vh;
  width: 100%;
  position: fixed;
  top: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
}

.banner-image {
  background-color: Green;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-inside-banner {
  background-color: Beige;
  width: 550px;
  height: 300px;
  border-radius: 10px;
}

.assortiment-wrapper {
  display: flex;
}
</style>
