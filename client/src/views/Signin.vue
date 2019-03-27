<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="col-sm-12">
      <h3 class="dark-grey text-center">
        <b>Sign In</b>
      </h3>
      <hr>
    </div>
    <div class="col-sm-12 text-left">
      <div class="row border-between">
        <div class="col-lg-6 mb-5">
          <form v-on:submit.prevent="signin">
            <h4 class="dark-grey">Enter your info</h4>
            <hr>
            <div class="form-group">
              <label for="inputUsername">Username</label>
              <input v-model="user.username" type="text" class="form-control" id="inputUsername">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="user.password" type="password" class="form-control" id="inputPassword">
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary">Sign In</button>
            </div>
          </form>
        </div>

        <div class="col-lg-6">
          <h4 class="dark-grey">New Member?</h4>
          <hr>
          <p>Create an account with us and you'll be able to:</p>
          <ul>
            <li>Ask question (as this site purpose)</li>
            <li>Answer funny question</li>
            <li>Up Vote for nice and smart answer</li>
            <li>Down Vote for ridiculous answer</li>
            <li>Track your activity</li>
          </ul>
          <div class="d-flex justify-content-center">
            <router-link class="btn btn-outline-secondary" to="/signup">Create Account</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'signin',
  components: {
    Loading,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  mounted() {
    if(Boolean(this.$router.history.current.query.needed)) {
      this.$swal({
        title: "Error",
        text: 'Login is needed. Please login first.',
        icon: "error",
        button: "close",
      });
    } 
  },
  props: ['needRegister'],
  methods: {
    signin() {
      this.loading = !this.loading;
      this.$axios
        .post('/users/signin', this.user)
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          localStorage.setItem('token', data.token);
          localStorage.setItem('fullname', data.fullname);
          localStorage.setItem('id', data.id)

          this.$store.commit('mutateSigninStatus', {
            signin: true,
            fullname: data.fullname,
          });

          this.$router.push({
            path: '/',
          });
        })
        .catch((err) => {
          this.loading = !this.loading;
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "error",
            button: "close",
          });
        });
    },
    clearForm() {
      this.user = {
        username: '',
        password: '',
      };
    },
  },
};
</script>
