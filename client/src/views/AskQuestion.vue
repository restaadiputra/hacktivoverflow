<template>
  <div class="container">
    <Loading v-if="loading" />
    <div v-if="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
      {{ alertMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="row border-bottom pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>Add Question</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="addQuestion">
          <div class="form-group">
            <input
              v-model="question.title"
              type="text"
              class="form-control"
              id="title"
              placeholder="Your title for your question"
            >
          </div>
          <div class="form-group">
            <ckeditor class="ck-content" :editor="editor" v-model="question.content" :config="editorConfig" tag-name="textarea"></ckeditor>
          </div>

          <button type="submit" class="btn btn-primary">Post Your Question</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from '@/components/Loading.vue';

export default {
  name: 'question-editor',
  components: {
    Loading,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {},
      question: {
        title: '',
        content: '',
      },
      loading: false,
      alert: false,
    };
  },
  methods: {
    addQuestion() {
      const token = localStorage.getItem('token');
      this.loading = !this.loading;
      this.alert = false,
      this.alertMessage = '';
      this.$axios
        .post('/questions', this.question, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          this.$router.push({
            path: '/users/questions',
          });
        })
        .catch((err) => {
          this.loading = !this.loading;
          console.log(err);
        });
    },
    clearForm() {
      this.question = {
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
