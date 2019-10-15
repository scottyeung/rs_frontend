<template>
  <div class="project__details">
    <p class="project__description">{{ projectDescription }}</p>
    <h1 v-if="projectScreening" class="project__section">Screening</h1>
    <p class="project__screening">{{ projectScreening }}</p>
    <h1 v-if="projectOnline" class="project__section">Online</h1>
    <p class="project__screening" v-html="projectOnline" />
    <!-- <span class="nobr italic">{{ projectSecondary }}</span> -->
  </div>
</template>

<script>
  export default {
    name: 'ProjectDetails',
    props: ['project'],
    computed: {
      projectOnline () {
        return this.project.content.online
      },
      projectScreening () {
        return this.project.content.screening
      },
      projectDescription () {
        return this.project.content.description
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
  .project__details
    text-align: left
    .project__section
      font-weight: bold
    .project__screening
      padding-bottom: 20px
      white-space: pre-wrap
    .project__description
      margin-top: 10px
      margin-bottom: 20px


</style>

