<template>
  <div>
    <!-- #ifdef FLAG-A || FLAG-B -->
    <header>FLAG-A OR FLAG-B</header>
    <!-- #endif -->
    <!-- #ifndef APP-PLUS || MP-WEXIN -->
    <header>NIETHER APP-PLUS NOR MP-WEXIN</header>
    <!-- #endif -->
  </div>
</template>