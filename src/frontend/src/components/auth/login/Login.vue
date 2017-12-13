<template>
  <div class="login">
    <h2>Welcome!</h2>
    
    <form @submit.prevent="validateBeforeSubmit" name="login">

        <div class="form-group" :class="{ 'has-error': $v.email.$error }">
          <div class="input-group">
            <input type="text" id="email" v-model.trim="email" @input="$v.email.$touch()">
            <label for="email" class="control-label">Email</label>
            <i class="bar"></i>

            <p class="text-danger" v-show="$v.email.$error">{{ vmsgEmail }}</p>
          </div>
        </div>

        <div class="form-group" :class="{ 'has-error': $v.password.$error }">
          <input id="password"
                 v-model="password"
                 @input="$v.password.$touch()"
                type="password">
                <label class="control-label" for="password">Password</label>
           <i class="bar"></i>
          <p class="text-danger" v-show="$v.password.$error">{{ vmsgPassword }}</p>
        </div>

        <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between down-container">
          <button class="btn btn-primary" type="submit">
            Log In
          </button>
        </div>

      </form>

  </div>
</template>

<script>
  import vh, { email, password } from '@/helpers/validators'
  import { mapMutations } from 'vuex'
  import axios from 'axios'
  import store from 'vuex-store'
  
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email: vh.vrules(email),
      password: vh.vrules(password)
    },
    computed: {
      vmsgEmail () { return vh.vmsg(this.$v.email, email) },
      vmsgPassword () { return vh.vmsg(this.$v.password, password) }
    },
    methods: {
      ...mapMutations('notification', ['notify']),
      validateBeforeSubmit () {
        this.$v.$touch()
        if (this.$v.$invalid) return
        this.submitForm()
      },
      async submitForm () {
        try {
          await this.$store.dispatch('auth/login', { ...this.$data })

          axios.defaults.headers.common['Authorization'] = store.getters['auth/token']

          this.notify({ msg: 'You have been looged in.', type: 'info' })
          this.$router.push('/dashboard')
        } catch (e) {
          this.notify({ msg: 'You have failed to log in. Try again with another credentials.', type: 'danger' })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../sass/variables';
  @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
  @import '../../../../node_modules/bootstrap/scss/variables';
  .login {
    @include media-breakpoint-down(md) {
      width: 100%;
      padding-right: 2rem;
      padding-left: 2rem;
      .down-container {
        .link {
          margin-top: 2rem;
        }
      }
    }

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 3.125rem;
    }

    .btn-primary {
      width: 100%
    }
  }
</style>
