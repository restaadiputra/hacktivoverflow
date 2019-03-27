<template>
  <div class="mask d-flex align-items-center">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style>
.loader {
  width: 200px;
  height: 100px;
  border-radius: 100%;
  position: relative;
  margin: auto;
}

.loader span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #ffffff;
  margin: 35px 5px;
}

.loader span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}

.loader span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.16s infinite;
}

.loader span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}

.loader span:nth-child(4) {
  animation: bounce 1s ease-in-out 0.50s infinite;
}

.loader span:nth-child(5) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}

.loader span:nth-child(6) {
  animation: bounce 1s ease-in-out 0.83s infinite;
}

@keyframes bounce {
  0%,
  75%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }

  25% {
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
div.mask {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.37);
}
</style>
