<template>
  <div class="container">
    <Loading v-if="loading"/>
    <div v-if="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
      {{ alertMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="col-sm-12">
      <h3 class="dark-grey text-center">Register New User</h3>
      <hr>
    </div>
    <form v-on:submit.prevent="signup">
      <div class="row border-between">
        <div class="col-lg-6 offset-lg-3">
          <div class="form-group">
            <label for="inputName">Fullname</label>
            <input v-model="user.fullname" type="text" class="form-control" id="inputName">
          </div>
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input v-model="user.email" type="email" class="form-control" id="inputEmail">
          </div>
          <div class="form-group">
            <label for="inputUsername">Username</label>
            <input v-model="user.username" type="text" class="form-control" id="inputUsername">
          </div>
          <div class="form-group">
            <label for="inputPassword">Password</label>
            <input v-model="user.password" type="password" class="form-control" id="inputPassword">
          </div>
          <button type="submit" class="btn btn-secondary mx-2">Register</button>
          <router-link class="btn btn-outline-secondary" to="/">Cancel</router-link>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'signup',
  components: {
    Loading,
  },
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        username: '',
        password: '',
      },
      loading: false,
      alert: false,
      alertMessage: '',
    };
  },
  methods: {
    signup() {
      this.loading = !this.loading;
      this.$axios
        .post('/users/register', this.user)
        .then(() => {
          this.loading = !this.loading;
          this.clearForm();
          this.$router.push({
            path: '/signin',
            query: {
              register: 'success',
            },
          });
        })
        .catch((err) => {
          this.loading = !this.loading;
          this.alert = true;
          this.alertMessage = err.response.data.message;
        });
    },
    clearForm() {
      this.user = {
        fullname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
      };
    },
  },
};
</script>
