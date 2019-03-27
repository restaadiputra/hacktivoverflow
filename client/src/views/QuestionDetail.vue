<template>
  <div class="container">
    <Loading v-if="loading"/>
    <div v-if="question !== null" class="row">
      <div class="col-sm-12">
        <h4>{{ question.title }}</h4>
        <span class="text-muted">
          <i>posted {{ question.created_at }}</i>
        </span>
        <hr>

        <div class="row  mb-3">
          <div class="col-sm-1">
            <div class="row text-center">
              <div class="col-sm-12">
                <a v-on:click="setUpvote">
                  <i class="fas fa-caret-up fa-3x  text-muted"></i>
                </a>
              </div>

              <div class="col-sm-12">
                <h3 class="text-muted">{{ question.upvote - question.downvote }}</h3>
              </div>

              <div class="col-sm-12">
                <a v-on:click="setDownvote">
                  <i class="fas fa-caret-down fa-3x "></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-sm-11">
            <div class="row d-flex justify-content-start">
              <div v-html="question.content"></div>
            </div>
            <div class="row d-flex justify-content-end">
              <span class="text-muted align-self-end">
                <i>asked by {{ question.createdBy.fullname }}</i>
              </span>
            </div>
            <div class="row d-flex justify-content-end mt-3">
              <router-link v-if="question.createdBy._id === getId" :to="'/questions/' + question._id + '/edit'" class="btn btn-outline-info"><i class="fas fa-edit"></i>Edit this question</router-link>
            </div>
          </div>
        </div>

       

        <div class="mt-5">
          <h5>{{ question.answers.length }} Answers</h5>
          <hr>
          <div v-for="(answer, index) in question.answers" :key="index" class="row mb-5">
            <div class="col-sm-1">
              <div class="row text-center">
                <div class="col-sm-12">
                  <a v-on:click="setAnswerUpvote(answer._id)">
                    <i class="fas fa-caret-up fa-3x text-muted"></i>
                  </a>
                </div>

                <div class="col-sm-12">
                  <h3 class="text-muted">{{ answer.upvote - answer.downvote }}</h3>
                </div>

                <div class="col-sm-12">
                  <a v-on:click="setAnswerDownvote(answer._id)">
                    <i class="fas fa-caret-down fa-3x text-muted"></i>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-11">
              <div class="row d-flex justify-content-start">
                <div v-html="answer.content"></div>
              </div>
              <div class="row d-flex justify-content-end">
                <span class="text-muted">
                  <i>answered by {{ answer.createdBy.fullname }}</i>
                </span>
              </div>
              <div class="row d-flex justify-content-end mt-3">
                <router-link v-if="answer.createdBy._id === getId"  :to="'/answers/' + answer._id + '/edit'" class="btn btn-outline-info"><i class="fas fa-edit"></i> Edit</router-link>
                
                <button v-on:click="confirmAccepted(answer._id)" v-if="answer.createdBy._id !== getId && getAccepted" class="btn btn-outline-success"><i class="fas fa-vote-yea"></i> Accept this answer</button>
                
                <button v-if="!getAccepted && String(answer._id) === String(question.acceptedAnswer)" class="btn btn-success" disabled><i class="fas fa-vote-yea"></i> Accepted answer</button>
              </div>
            <hr>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="col-sm-12">
      <p>Your Answer</p>
      <form @submit.prevent="addAnswer">
        <div class="form-group">
          <ckeditor
            class="ck-content"
            :editor="editor"
            v-model="answer.content"
            :config="editorConfig"
            tag-name="textarea"
          ></ckeditor>
        </div>
        <button type="submit" class="btn btn-primary">Post Your Answer</button>
      </form>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'question-detail',
  components: {
    Loading,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      answer: {
        content: '',
      },
      loading: false,
      question: null,
    };
  },
  created() {
    this.getQuestionDetail();
  },
  computed: {
    getId() {
      console.log(localStorage.getItem('id'))
      return localStorage.getItem('id')
    },
    getAccepted() {
      return this.question.acceptedAnswer === undefined;
    }
  },
  methods: {
    timeAgo(second) {
      const seconds = Math.floor(
        (new Date(Date.now()) - new Date(second)) / 1000,
      );
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
    getQuestionDetail() {
      this.loading = !this.loading;
      const token = localStorage.getItem('token');
      this.$axios
        .get(`/questions/${this.$route.params.id}`, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.question = data;
          this.question.created_at = this.timeAgo(data.created_at);
        })
        .catch((err) => {
          this.loading = !this.loading;
          console.log(err.response.data.message);
        });
    },
    setUpvote() {
      const token = localStorage.getItem('token');
      this.$axios
        .post(
          `/questions/${this.$route.params.id}/upvote`,
          {},
          {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          this.question.upvote = data.upvote;
          this.question.downvote = data.downvote;
        })
        .catch((err) => {
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "warning",
            button: "close",
          });
          console.log(err.response.data.message);
        });
    },
    setDownvote() {
      const token = localStorage.getItem('token');
      this.$axios
        .post(
          `/questions/${this.$route.params.id}/downvote`,
          {},
          {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          this.question.upvote = data.upvote;
          this.question.downvote = data.downvote;
        })
        .catch((err) => {
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "warning",
            button: "close",
          });
          console.log(err.response.data.message);
        });
    },
    addAnswer() {
      const token = localStorage.getItem('token');
      const newAnswer = {
        questionId: this.$route.params.id,
        title: `Answer No. ${this.question.answers.length + 1} of ${
          this.question.title
        }`,
        content: this.answer.content,
      };
      this.answer.title = `Answer of ${this.question.title}`;
      this.$axios
        .post('answers', newAnswer, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          console.log(data)
          this.question.answers.push(data);
          this.clearAnswer();
        })
        .catch((err) => {
          if(err.response.status === 401) {
            this.$swal({
              title: "Error",
              text: err.response.data.message,
              icon: "error",
              button: "close",
            });
          }
        });
    },
    clearAnswer() {
      this.answer = {
        content: '',
      };
    },
    setAnswerUpvote(id) {
      const token = localStorage.getItem('token');
      this.$axios
        .post(
          `/answers/${id}/upvote`, {}, {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          const index = this.question.answers.findIndex(answer => answer._id === id);

          this.question.answers[index].upvote = data.upvote;
          this.question.answers[index].downvote = data.downvote;
        })
        .catch((err) => {
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "warning",
            button: "close",
          });
          console.log(err.response.data.message);
        });
    },
    setAnswerDownvote(id) {
      console.log('masuk')
      const token = localStorage.getItem('token');
      this.$axios
        .post(
          `/answers/${id}/downvote`, {}, {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          const index = this.question.answers.findIndex(answer => answer._id === id);

          this.question.answers[index].upvote = data.upvote;
          this.question.answers[index].downvote = data.downvote;
        })
        .catch((err) => {
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "warning",
            button: "close",
          });
          console.log(err.response.data.message);
        });
    },
    confirmAccepted(id) {
      swal({
        title: "Are you sure?",
        text: "Do you want to accept this answer as the best answer?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.acceptAnswer(id)
        }
      });
    },
    acceptAnswer(id) {
      const token = localStorage.getItem('token');
      this.$axios
        .patch(`/questions/${this.$route.params.id}`, {id}, {
            headers: {
              token,
            },
          },
        )
        .then(({ data }) => {
          this.question.acceptedAnswer = data.acceptedAnswer
          this.$swal({
              title: "Accepted",
              text: 'One of these answer has been selected to be the accepted answer.',
              icon: "success",
              button: "close",
            });
        })
        .catch((err) => {
          this.$swal({
            title: "Warning",
            text: err.response.data.message,
            icon: "warning",
            button: "close",
          });
          console.log(err.response.data.message);
        });
    }
  },
};
</script>
<style>
.ck-content {
  height: 200px;
}
</style>
