<template>
  <div class="container trailer">
    <Menu/>
    <div class="trailer__inner">
      <div class="trailer__column">
        <div 
          v-for="(project, index) of projects"
          :key="index"
          :class="{ 'active': activeTrailer == index }"
          class="trailer__box"
          @click="isActive(index)"
        >  
          <img
            :src="project.content.cover[0].medium"
          >
          <VideoPlayer
            v-if="activeTrailer == index && project.content.dropbox.length"
            :options="trailerOptions"
            :url="project.content.dropbox"
            class="trailer__video"
          />
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '~/components/Menu.vue'
  import VideoPlayer from '~/components/VideoPlayer.vue'

  export default {
    name: 'Trailers',
    components: {
      Menu,
      VideoPlayer
    },
    data() {
      return {
        activeTrailer: -1,
        trailerOptions: {
          autoplay: true,
          controls: false
        }
      }
    },
    computed: {
      projects () {
        console.log(this.$store.state.projects)
        return this.$store.state.projects
      }
    },
    head () {
      return {
        titleTemplate: '%s: About',
        meta: [
          { name: 'format-detection', content: 'telephone=no' },
        ]
      }
    },
    methods: {
      isActive (index) {
        if(this.activeTrailer !== index)
          this.activeTrailer = index
        else
          this.activeTrailer = -1
      }
    }
  }
</script>

<style lang="sass" scoped>
  .trailer
    background: black
    color: white
    &__inner
      width: 100%
      padding: $mp-a + $mp-a 0 $mp-c/2 0
      display: flex
    &__column
      display: flex
      flex-wrap: wrap
      margin: 0 auto
      max-width: 80vw
    &__box
      &.active
        order: -1
        flex: 0 100%
        img
          display: none
      padding: 20px
      height: auto
      flex: 0 33%
      img
        width: 100%
        height: auto
      &:first-child
        padding: 0
    &__video
      width: 50vw
      margin: 0 auto
    &--block
      margin-bottom: $lh-m

  video
    width: 100%
    max-height: 500px

  @media (max-width: $tablet-ls)
    .trailer
      &__inner
        padding-top: $mp-d
        display: block
      &__address
        padding-top: 12px
      &__column
        width: 100%
        padding: 0 $mp-c/2
        &:first-child
          padding: 0 $mp-c/2 $lh-m $mp-c/2

  @media (max-width: $phone-pt)
    .trailer
      &__column
        flex-direction: column
</style>

