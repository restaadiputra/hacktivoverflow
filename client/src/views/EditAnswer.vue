<template>
  <div class="container">
    <Loading v-if="loading" />
  
    <div v-if="answer !== null">
    <div class="row border-bottom pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>Question</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <router-link :to="'/questions/' + answer.questionId._id " class="text-primary">
          <h4>{{ answer.questionId.title }}</h4>
        </router-link>
        <span class="text-muted">
          <i>posted {{ timeAgo(answer.questionId.created_at) }}</i>
        </span>
        <hr>
        <div class="col-sm-12">
          <div class="row d-flex justify-content-start">
            <div v-html="answer.questionId.content"></div>
          </div>
          <div class="row d-flex justify-content-end">
            <span class="text-muted align-self-end">
              <i>asked by {{ answer.questionId.createdBy.fullname }}</i>
            </span>
          </div>
        </div>
    

      </div>
    </div>

    <div class="row border-bottom pt-5 pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>Edit Answer</h3>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="editAnswer">
          <div class="form-group">
            <input
              v-model="answer.title"
              type="text"
              class="form-control"
              id="title"
              disabled
            >
          </div>
          <div class="form-group">
            <ckeditor class="ck-content" :editor="editor" v-model="answer.content" :config="editorConfig" tag-name="textarea"></ckeditor>
          </div>

          <button type="submit" class="btn btn-primary">Edit answer</button>
        </form>
      </div>
    </div>
    </div>

  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from '@/components/Loading.vue';

export default {
  name: 'answer-editor',
  components: {
    Loading,
  },
  created() {
    this.loading = true;
    const token = localStorage.getItem('token');
    this.$axios
      .get(`/answers/${this.$route.params.id}`, {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        this.loading = false;
        this.answer = data;
        this.answer.created_at = this.timeAgo(data.created_at);
      })
      .catch((err) => {
        this.loading = false;
        console.log(err.response);
      });
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      answer: null,
      loading: false,
    };
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
    editAnswer() {
      const token = localStorage.getItem('token');
      this.loading = !this.loading;
      
      this.$axios
        .put(`/answers/${this.answer._id}`, {
          content: this.answer.content
        }, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.$router.push({
            path: `/questions/${this.answer.questionId._id}`,
          });
          this.clearForm();
        })
        .catch((err) => {
          this.loading = !this.loading;
          console.log(err.response.data)
          this.$swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            button: "close",
          });
        });
    },
    clearForm() {
      this.answer = {
        _id:'',
        title: '',
        content: '',
      };
    },
  },
};
</script>
<style>
  .ck-content {
    height:200px;
  }
</style>
