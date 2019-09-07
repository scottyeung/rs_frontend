<template>
  <div class="container">
    <div class="scroller">
      <div
        v-for="(project, index) of projects"
        v-if="project.randomImage"
        :key="index"
        class="projects__block"
        @mouseover="selectIndex(index);"
        @mouseout="itemIndex = null;"
      >
        <nuxt-link
          ref="link"
          :to="{path: '/' + project.id }"
          :name="project.content.title"
          class="projects__block-img"
        >
          <ProjectsCaption
            v-if="'height' in project.randomImage"
            ref="caption"
            :project="project"
          />
        </nuxt-link>
      </div>
    </div>
    <div class="projects">
      <div
        v-for="(project, index) of projects"
        v-if="project.randomImage && itemIndex == index"
        :class="[
          project.randomImage.orientation
        ]"
        :key="index"
        class="projects__preview"
      >
        <img
          v-if="project.content.video.length == 0"
          ref="image"
          :alt="project.content.title"
          :src="project.randomImage.url"
          :srcset="getSrcSet(project.randomImage)"
          class="projects__img"
        >
        <video
          v-if="project.content.video.length > 0"
          ref="video"
          :src="project.content.video[0].url"
          width="700"
          class="projects__video" 
          muted loop playsinline autoplay
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectsCaption from '~/components/ProjectsCaption.vue'

  export default {
    name: 'ProjectsCards',
    components: {
      ProjectsCaption,
    },
    data () {
      return {
        itemIndex: null
      }
    },
    computed: {
      projects () {
        return this.$store.state.projects
      },
      loadCounter () {
        return _.filter(this.projects, { randomImage: { load: true } }).length
      }
    },
    created () {
      this.randomImage()
    },
    mounted () {
      this.preloadImages();
      window.addEventListener('resize', this.resizeListener)
      const links = this.$refs.link
      if (links.length > this.loadCounter) {
        window.addEventListener('scroll',  this.scrollListener)
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.resizeListener)
      window.removeEventListener('scroll', this.scrollListener)
    },
    methods: {
      selectIndex (index) {
        this.itemIndex = index
      },
      randomImage () {
        if(process.browser && !this.$store.state.projects[0].randomImage) {
          this.projects.forEach( async (project, index) => {

            // Choose random image
            let randomImage = project.content.cover[0]
            await this.$set(project, 'randomImage', randomImage)
            this.setHeight(project.randomImage, index)
          })
        }
      },
      getSrcSet (img) {
        return img.small + ' 600w, ' + img.medium + ' 900w, ' + img.large + ' 1200w, ' + img.url + ' ' + img.width + 'w'
      },
      setHeight (randomImage, index) {
        const links = this.$refs.link
        if (links) {
          const link = links[index].$el
          const width = link.offsetWidth
          const ratio = randomImage.ratio
          const height = (width / ratio) + 'px'
          this.$set(this.projects[index].randomImage, 'height', height)
        }
      },
      preloadImages () {
        const links = this.$refs.link

        // Remove scrollListener after all images are loaded
        if(this.loadCounter === links.length) {

          window.removeEventListener('scroll', this.scrollListener)

        } else if (links.length > this.loadCounter) {

          this.projects.forEach((project, index) => {
            if (!('load' in project.randomImage)) {
              const link = links[index].$el
              const boundingBox = link.getBoundingClientRect()
              if (boundingBox.height > 0) {
                const top = parseFloat(boundingBox.top)
                const bottom = parseFloat(boundingBox.bottom)
                if (top <= window.innerHeight * 2 && bottom >= window.innerHeight * - 1) {
                  this.$set(project.randomImage, 'load', true)
                }
              }
            }
          })

        }
      },
      resizeListener () {
        this.projects.forEach( (project, index) => {
          this.setHeight(project.randomImage, index)
        })
      },
      scrollListener: _.throttle( function () {
        this.preloadImages()
      }, 500)
    }
  }
</script>

<style lang="sass" scoped>
  .container
    display: flex
  .scroller
    width: 50vw
  .projects
    @include center
    display: flex
    justify-content: center
    margin-left: $mp-c/2 * -1
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%);
    &__block
      padding: $mp-s
      display: block
      vertical-align: bottom
      width: 30%
      &-img
        will-change: contents, scroll-position
        &.loaded
          will-change: auto
      a
        display: block
    &__preview
      padding: $mp-a
      display: block
      vertical-align: middle
      &-img
        will-change: contents, scroll-position
        &.loaded
          will-change: auto
      a
        display: block
      &.portrait
        width: 60.5%
      &.medium.portrait
        width: 25%
      &.large.portrait
        width: 50.5%
      &.landscape, &.square
        width: 65%
      &.medium.landscape, &.medium.square
        width: 80%
      &.large.landscape, &.large.square
        width: 95%
    &__img
      width: 100%
      vertical-align: top
      &__wrapper
        display: block
    &__video
      transform: translate(-50%, -50%)
      position: fixed
      height: 65vh
      top: 50%
      left: 50%

  @media (max-width: $tablet-ls)
    .projects
      width: calc(100vw + 10px)
      margin-left: -5px
      &__block
        padding: $mp-b
        &.small.portrait
          width: 25%
        &.medium.portrait
          width: 30%
        &.large.portrait
          width: 32.5%
        &.small.landscape, &.small.square
          width: 40%
        &.medium.landscape, &.medium.square
          width: 45%
        &.large.landscape, &.large.square
          width: 50%

  @media (max-width: $tablet-pt)
    .projects
      &__block
        &.small.portrait
          width: 50%
        &.medium.portrait
          width: 50%
        &.large.portrait
          width: 50%
        &.small.landscape, &.small.square
          width: 50%
        &.medium.landscape, &.medium.square
          width: 50%
        &.large.landscape, &.large.square
          width: 50%

    @media (max-width: $phone-ls)
      .projects
        width: calc(100vw - 15px)
        margin-bottom: $mp-a
        margin-left: 7.5px
        &__block
          width: 100%
          padding: $mp-a/4
      .scroller
        width: 100vw
</style>

