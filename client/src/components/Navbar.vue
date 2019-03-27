<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">
      <i class="far fa-question-circle"></i>
      HacktivOverflow
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul v-if="!getSigninStatus" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/signin">Sign In</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/signup">Sign Up</router-link>
        </li>
      </ul>
      <ul v-if="getSigninStatus" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/users/dashboard">{{ getUserFullname }}</router-link>
        </li>
        <li class="nav-item">
          <a @click="signout" class="nav-link" to="/">Sign out</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'navbar',
  data() {
    return {
      brand: '',
    };
  },
  computed: {
    getSigninStatus() {
      return this.$store.state.signin;
    },

    getUserFullname() {
      return this.$store.state.fullname;
    },
  },
  methods: {
    signout() {
      localStorage.removeItem('token');
      localStorage.removeItem('fullname');
      localStorage.removeItem('id');
      this.$store.commit('mutateSigninStatus', {
        signin: false,
        fullname: '',
      });
      this.$router.push({
        path: '/',
      });
      this.$emit('signout');
      this.$swal({
        title: "Success",
        text: 'Successfully sign out.',
        icon: "success",
        button: "close",
      });
    },
  },
};
</script>
