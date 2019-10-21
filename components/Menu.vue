<template>
  <nav class="menu__wrapper">
    <ol class="menu__list">
      <li class="menu__nav">
        <h1 class="menu__nav--title">
          <nuxt-link
            class="menu__nav--name"
            to="/">Rebecca Salvadori</nuxt-link>
        </h1>
      </li>
      <li class="menu__nav">
        <nuxt-link
          class="menu__nav--projects"
          to="/bio"
        >Exhibition</nuxt-link>
        <nuxt-link
          class="menu__nav--projects"
          to="/bio"
        >Screenings</nuxt-link>
        <nuxt-link
          class="menu__nav--projects"
          to="/trailers"
        >Euroemptiness</nuxt-link>
        <nuxt-link
          class="menu__nav--about"
          to="/about"
        >About</nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'Menu',

    methods: {
      ...mapMutations([
        'changeMenu'
      ]),
    }
  }
</script>

<style lang="sass" scoped>
  .menu
    &__wrapper
      width: 100vw
      padding: 10px 16px 5px 16px
      z-index: 99
      position: sticky
    &__list
      list-style: none
      display: flex
      flex-wrap: wrap
      justify-content: space-between
    &__nav
      &--name
        font-style: inherit
      &--title
        margin-right: $mp-c
      &--projects
        &:after
          content: ", "

  @media (max-width: $phone-pt)
    .menu
      &__nav
        &--title
          margin-right: 0
        &:nth-child(2)
          margin: $mp-a 0 0 1px
          width: 100%
</style>

