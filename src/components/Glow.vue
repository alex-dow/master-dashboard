<template>
<div class="glow">
  <svg width="100%" height="100%"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100% 100%">
    <defs>
      <radialGradient id="myGradient">
        <stop offset="1%" stop-color="#14fdce" />
        <!--<stop offset="5%" stop-color="#ffffff" />-->
        <stop offset="80%" stop-color="#031e11"/>
        <stop offset="100%" stop-color="#000000"/>
      </radialGradient>
    </defs>
    <!-- using my linear gradient -->
    <rect x="0" y="0" width="100%" height="100%" fill="url('#myGradient')" />
  </svg>
</div>
</template>
<style lang="scss">
.glow {
  //background: radial-gradient(circle at center, rgba(15, 177, 69, 1), ease-in-out, rgba(10, 23, 12, 0));
  //opacity: 0.15;
  opacity: 0.15;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  // filter: blur(4px);
}
</style>