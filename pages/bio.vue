<template>
  <div class="container bio">
    <Menu/>
    <div class="bio__inner">
      <div class="bio__column">
        <ul 
          v-for="(list, index) of bio"
          :key="index"
          class="bio__box"
        >  
          <li 
            v-for="(item, index) of list"
            :key="index"
            v-html="item.content"
          /> 
        </ul> 
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '~/components/Menu.vue'

  export default {
    name: 'Bio',
    components: {
      Menu
    },
    data() {
      return {
        activeTrailer: -1
      }
    },
    computed: {
      bio () {
        return this.$store.state.bio.bio.reduce((arr, item) => {
            if (item.type == 'h1') arr.push([])
            arr[arr.length - 1].push(item)
            return arr
        }, [])
      }
    },
    head () {
      return {
        titleTemplate: '%s: Bio',
        meta: [
          { name: 'format-detection', content: 'telephone=no' },
        ]
      }
    },
  }
</script>

<style lang="sass" scoped>
  .bio
    background: black
    color: white
    &__inner
      position: relative
      overflow: scroll
      display: flex
      flex-direction: column
      width: 100%
      height: 100vh
    &__column
      display: flex
      flex-wrap: wrap
      margin: 0 auto
      width: 50vw
      flex-direction: column
    &__box
      padding: 20px
      height: auto
      font-size: 14px
      word-wrap: break-word
      li:first-child
        list-style: none
        margin-bottom: 5px
        font-weight: bold
        font-size: .9rem
      li:not(:first-child)
        padding-bottom: 30px
      li
        white-space: pre-wrap
        a
          color: #0027FF
      img
        width: 100%
        height: auto
    &--block
      margin-bottom: $lh-m

  @media (max-width: $tablet-ls)
    .bio
      &__inner
        display: block
      &__address
        padding-top: 12px
      &__column
        width: 100%
        padding: 0 $mp-c/2
        &:first-child
          padding: 0 $mp-c/2 $lh-m $mp-c/2

  @media (max-width: $phone-pt)
    .bio
      &__column
        flex-direction: column
        flex-wrap: nowrap
        width: 80vw
</style>

