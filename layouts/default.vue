<template>
  <nuxt/>
</template>

<style>
</style>

<script>
export default {
  computed: {
    tags () {
      const keywords = this.$store.state.siteInfo.content.tags
      const tags = []
      keywords.forEach((keyword, index) => {
        tags.push(keyword.value)
      })
      return tags.join(', ')
    }
  },
  head() {
    return {
      title: this.$store.state.siteInfo.title,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.siteInfo.metadescription },
        { hid: 'keywords', name: 'keywords', content: this.$store.state.siteInfo.tags }
      ]
    }
  }
}
</script>


