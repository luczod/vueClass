<template>
  <footer>
    <h3>Party Time &copy; 2023</h3>
    <p>O melhor local para compartilhar seus eventos!</p>
  </footer>
</template>

<style scoped>
footer {
  background-color: #25282e;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

footer h3 {
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 300;
  font-size: 1.6rem;
}

footer p {
  color: #c1b696;
}
</style>

<script lang="js">
export default {
  name: 'FooterFn',
};
</script>
