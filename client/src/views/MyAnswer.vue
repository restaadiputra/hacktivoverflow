<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row border-bottom pb-3 pt-3 bg-info text-white">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>My Answer</h3>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(answer, index) in answers" :key="index" class="row border-bottom pt-3">
      <div class="col-sm-12 col-md-1">
        <div class="row text-center">
          <div class="col-sm-6">
            <h5>{{ answer.upvote - answer.downvote }}</h5>
            <p>
              <span>votes</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-10 offset-md-1">
        <div class="row">
          <div class="col-sm-9">
            <router-link :to="'/questions/' + answer.questionId " class="text-primary">
              <p>{{ answer.title }}</p>
            </router-link>
          </div>
          <div class="col-sm-3 text-right d-flex justify-content-end">
            <router-link :to="'/answers/' + answer._id + '/edit'" class="btn btn-outline-info mr-3"><i class="fas fa-edit"></i>Edit</router-link>
            <button @click="confirmDelete(answer._id)" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i>Delete</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'question-list',
  components: {
    Loading,
  },
  created() {
    this.getMyAnswers();
  },
  data() {
    return {
      loading: false,
      answers: [],
    };
  },
  methods: {
    getMyAnswers() {
      this.loading = !this.loading;
      const token = localStorage.getItem('token');
      this.$axios
        .get('/answers', {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.answers = data;
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmDelete(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this answer.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteMyAnswer(id)
        }
      });
    },
    deleteMyAnswer(id) {
      const token = localStorage.getItem('token');
      this.loading = true;
      
      this.$axios
        .delete(`/answers/${id}`, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = false;
          this.answers.splice(this.answers.indexOf(data._id), 1)
          swal("Poof! Your question have been deleted.", {
            icon: "success",
          });
        })
        .catch((err) => {
          this.loading = false;
          this.$swal({
            title: "Error",
            text: err.response,
            icon: "error",
            button: "close",
          });
        });
    }
  },
};
</script>
