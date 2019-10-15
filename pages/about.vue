<template>
  <div class="container information">
    <Menu/>
    <div class="information__inner">
      <div class="information__column">
        <div class="information__address information--block">
          <div class="information__about information--block">
            <p>{{ description }}</p>
          </div>
          <h2>Contact</h2>
          <p>
            <span>{{ street }}</span>
            <span>{{ postcode }} {{ city }}</span>
            <span>{{ country }}</span>
          </p>
          <p>
            <a :href="'tel:' + phone ">{{ phone }}</a>
            <a :href="'mailto:' + email ">{{ email }}</a>
            <a :href="'https://www.instagram.com/' + instagram" target="_blank">Instagram (@{{ instagram }})</a>
          </p>
        </div>
      </div>
      <div class="information__column">
        <div class="information__clients information--block">
          <h2>Commercial Clients</h2>
          <li v-for="client in commercial" :key="client.client">{{ client.client }}</li>
        </div>
        <div class="information__clients information--block">
          <h2>Editorial Clients</h2>
          <li v-for="client in editorial" :key="client.client">{{ client.client }}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Menu from '~/components/Menu.vue'

  export default {
    name: 'About',
    components: {
      Menu
    },
    computed: {
      about () {
        return this.$store.state.about
      },
      images () {
        return this.about.files
      },
      street () {
        return this.about.street
      },
      postcode () {
        return this.about.postcode
      },
      city () {
        return this.about.city
      },
      country () {
        return this.about.country
      },
      email () {
        return this.about.email
      },
      phone () {
        return this.about.phone
      },
      ustid () {
        return this.about.ustid
      },
      taxno () {
        return this.about.taxno
      },
      commercial () {
        return this.about.commercial
      },
      editorial () {
        return this.about.editorial
      },
      legalNotice () {
        return this.$store.state.siteInfo.legal
      },
      copyright () {
        return this.$store.state.siteInfo.copyright
      },
      description () {
        return this.about.about
      },
      instagram () {
        return this.about.instagram
      }
    },
    head() {
      return {
        titleTemplate: '%s: About',
        meta: [
          { name: 'format-detection', content: 'telephone=no' },
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .information
    background: black
    color: white
    height: 100vh
    &__inner
      width: 100%
      padding: $mp-a + $mp-c 0 $mp-c/2 0
      display: flex
    &__column
      max-width: 720px
      width: 50%
      padding: 0 $mp-c/2 0 $mp-c
      &:first-child
        padding: 0 $mp-c 0 $mp-c/2
    &--block
      margin-bottom: $lh-m
    &__image
      width: 100%
    &__about
      @include fs-s()
    &__address
      span
        display: block
      p
        display: inline-block
        line-height: 20px
        margin: 0 $mp-c $lh-m 0
        vertical-align: top
        & > :first-child
          width: 156.56px
        a
          display: block
    &__clients
      li
        list-style: none
        display: inline
        @include nobr()
        &:after
          content: ", "
          white-space: pre-line
        &:last-child:after
          content: ""
    &__legal
      padding: $lh-m 0 0 0
      margin-bottom: 0
      @include fs-s()
      span
        display: block
      p
        margin-bottom: $lh-m
    &__tax
      display: flex
      p
        display: inline-block
        margin: 0 $mp-c 0 0
        span:first-child
          display: block

  @media (max-width: $tablet-ls)
    .information
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
    .information
      &__inner
        padding-top: 0 
      &__address
        padding-top: $mp-a
        p
          margin-right: 0
          width: 100%

</style>

