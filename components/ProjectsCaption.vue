<template>
  <div class="projects__caption">
    <span class="projects__title">{{ projectTitle }}</span>
    <span class="nobr italic projects__subtitle">{{ projectSubtitle }}</span>
  </div>
</template>

<script>
  export default {
    name: 'ProjectsCaption',
    props: ['project'],
    computed: {
      projectTitle () {
        return this.project.content.title
      },
      projectSubtitle () {
        return this.project.content.subtitle
      },
      projectSecondary () {
        if(this.project.content.client && this.project.content.client !== this.project.title) {
          return this.project.content.client
        }
      }
    },
    methods: {
      mouseOver: function() {
        this.active = !this.active
      }
    }
  }
</script>

<style lang="sass">
  .projects__caption
    .projects__subtitle
      font-size: 14px
      white-space: pre-wrap
    @include left()
    @include fs-m()
    padding: $mp-a/2 0 0 0
    span
      display: block;

</style>

