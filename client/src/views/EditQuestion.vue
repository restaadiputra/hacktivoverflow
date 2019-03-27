<template>
  <div class="container">
    <Loading v-if="loading" />
  
    <div class="row border-bottom pb-3">
      <div class="col-sm-12">
        <div class="d-flex justify-content-between">
          <div>
            <h3>Edit Question</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12">
        <form @submit.prevent="editQuestion">
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

          <button type="submit" class="btn btn-primary">Edit Question</button>
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
  created() {
    this.loading = true;
    const token = localStorage.getItem('token');
    this.$axios
      .get(`/questions/${this.$route.params.id}`, {
        headers: {
          token,
        },
      })
      .then(({ data }) => {
        console.log(data)
        this.loading = false;
        this.question = data;
        this.question.created_at = this.timeAgo(data.created_at);
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
      question: {
        _id: '',
        title: '',
        content: '',
      },
      loading: false,
    };
  },
  methods: {
    editQuestion() {
      const token = localStorage.getItem('token');
      this.loading = !this.loading;
      
      this.$axios
        .put(`/questions/${this.question._id}`, {
          title: this.question.title,
          content: this.question.content
        }, {
          headers: {
            token,
          },
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.$router.push({
            path: `/questions/${this.question._id}`,
          });
          this.clearForm();
        })
        .catch((err) => {
          this.loading = !this.loading;
          this.$swal({
            title: "Error",
            text: err.response,
            icon: "error",
            button: "close",
          });
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
