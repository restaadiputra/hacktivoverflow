<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row border-bottom pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>New Questions</h3>
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
        <div class="row d-flex justify-content-start">
          <router-link :to="'/questions/' + question._id " class="text-primary">
            <p>{{ question.title }} <span v-if="question.acceptedAnswer" class="badge badge-secondary bg-success">1 accepted answer</span></p>
          </router-link>
        </div>
        <div class="row d-flex justify-content-end">
          <span class="text-muted">
            <i>asked {{ timeAgo(question.created_at) }} by {{ question.createdBy.fullname }}</i>
          </span>
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
    this.getAllQuestion();
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
    getAllQuestion() {
      this.loading = !this.loading;
      this.$axios
        .get('/questions')
        .then(({ data }) => {
          this.loading = !this.loading;
          this.questions = data;
        });
    },
  },
};
</script>
