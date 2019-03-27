<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row border-bottom pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>My Questions</h3>
          </div>
          <div>
            <router-link  to="/questions/ask" class="btn btn-outline-primary ml-auto">Ask Question</router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(question, index) in questions" :key="index" class="row border-bottom pt-3">
      <div class="col-sm-12 col-md-2">
        <div class="row text-center">
          <div class="col-sm-6">
            <h5>{{ question.upvote - question.downvote }}</h5>
            <p>
              <span>votes</span>
            </p>
          </div>
          <div class="col-sm-6">
            <h5 class="text-center">{{ question.answers.length }}</h5>
            <p>
              <span class="text-center">answers</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-9 offset-md-1">
        <div class="row">
          <div class="col-sm-9">
            <router-link :to="'/questions/' + question._id " class="text-primary">
              <p>{{ question.title }}</p>
            </router-link>
          </div>
          <div class="col-sm-3 text-right d-flex justify-content-end">
            <router-link :to="'/questions/' + question._id + '/edit'" class="btn btn-outline-info mr-3"><i class="fas fa-edit"></i>Edit</router-link>
            <button @click="confirmDelete(question._id)" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i>Delete</button>
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
    this.getMyQuestion();
  },
  data() {
    return {
      loading: false,
      questions: [],
    };
  },
  methods: {
    timeAgo(second) {
      const seconds = Math.floor((new Date(Date.now()) - new Date(second)) / 1000);
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        return `${interval} year${interval === 1 ? '' : 's'} ago`;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        return `${interval} month${interval === 1 ? '' : 's'} ago`;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        return `${interval} day${interval === 1 ? '' : 's'} ago`;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        return `${interval} hour${interval === 1 ? '' : 's'} ago`;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        return `${interval} minute${interval === 1 ? '' : 's'} ago`;
      }
      if (!+seconds || seconds < 30) {
        return 'a moment ago';
      }
      return `${Math.floor(seconds)} seconds ago`;
    },
    getMyQuestion() {
      this.loading = !this.loading;
      const token = localStorage.getItem('token');
      this.$axios
        .get('/questions/user', {
          headers: {
            token: token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.questions = data;
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirmDelete(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this question and all answer related to this question will be deleted too.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.deleteMyQuestion(id)
        }
      });
    },
    deleteMyQuestion(id) {
      const token = localStorage.getItem('token');
      this.loading = true;
      
      this.$axios
        .delete(`/questions/${id}`, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = false;
          this.questions.splice(this.questions.indexOf(data._id), 1)
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
