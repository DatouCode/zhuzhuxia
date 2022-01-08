<template>
  <div>
    test

    <button @click="refresh">刷新</button>
  </div>
</template>

<script>
export default {
  name: "Test",
  methods: {
    refresh() {
      this.$router.go(0)
    }
  }
}
</script>