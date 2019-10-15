<template>
  <div class="projects__header">
    <span class="projects__title">{{ projectTitle }}</span>
    <span class="projects__title">{{ projectDuration }}</span>
    <span class="projects__title">{{ projectYear }}</span>
    <!-- <span class="nobr italic">{{ projectSecondary }}</span> -->
  </div>
</template>

<script>
  export default {
    name: 'ProjectHeader',
    props: ['project'],
    computed: {
      projectTitle () {
        return this.project.content.title
      },
      projectDuration () {
        return this.project.content.duration
      },
      projectYear () {
        return this.project.content.year
      },
      projectSecondary () {
        if(this.project.content.client && this.project.content.client !== this.project.title) {
          return this.project.content.client
        }
      }
    }
  }
</script>

<style lang="sass">
  .projects__header
    display: flex
    font-weight: bold
    justify-content: space-between
    padding-bottom: 10px
</style>

