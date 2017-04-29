<template>
  <div id="questions">
    <div class="search-container row">
      <b-form-fieldset horizontal label="Filter" class="col-6" :label-size="2">
        <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
      </b-form-fieldset>
      <b-button :size="'sm'" v-on:click="resetForm">
        Reset
      </b-button>
    </div>

    <b-table striped hover :items="questions" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
      <template slot="thumb_url" scope="question">
        <img v-bind:src="question.value">
      </template>
      <template slot="detail" scope="question">
        <b-btn size="sm" @click="details(question); $root.$emit('show::modal','modal-detail')">Details</b-btn>
      </template>
    </b-table>

    <b-modal ref="modal" id="modal-detail" v-bind:title="'Question ' + currentDetail.id" hide-footer close-on-escape>
      <div><strong>Question: </strong>{{ currentDetail.question }}</div>
      <img v-bind:src="currentDetail.image_url" />
      <div><strong>Question date: </strong>{{ currentDetail.published_at }}</div>
      <ul class="row">
        <li v-for="choice in currentDetail.choices" class="col-md-6">
          <div><strong>{{ choice.choice }}</strong>: {{ choice.votes }} votes</div>
          <div></div>
        </li>
      </ul>
      <input v-model="share_email" placeholder="email">
      <b-button :size="'sm'" v-on:click="share">
        Share
      </b-button>
    </b-modal>

    <div class="d-flex justify-content-end">
      <b-pagination size="sm" :total-rows="this.questions.length" :per-page="perPage" v-model="currentPage" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'questions',
    data () {
      return {
        questions: [],
        fields: {
          id: {
            label: 'ID'
          },
          thumb_url: {
            label: 'Thumb'
          },
          question: {
            label: 'Question'
          },
          published_at: {
            label: 'Date'
          },
          detail: {
            label: 'Detail'
          }
        },
        currentPage: 1,
        perPage: 8,
        filter: null,
        currentDetail: [],
        share_email: '',
        share_url: ''
      }
    },
    methods: {
      getQuestions () {
        this.$http
        .get('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/questions')
        .then(response => {
          this.questions = response.body
        })
      },
      fetchQuestion () {
        this.$http
        .get('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/questions/' + this.$route.query.question_id)
        .then(response => {
          this.currentDetail = response.body
          this.$refs.modal.show()
        })
      },
      share () {
        console.log(this.share_email)
        console.log(this.$route.fullPath)
        // this.$http
        // .post('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/share?' + this.share_email + '&' + this.$route.query)
        // .then(response => {
        //   console.log(response)
        // })
      },
      details (question) {
        this.currentDetail = question.item
      },
      resetForm: function (e) {
        this.filter = ''
      }
    },
    created () {
      this.fetchQuestion()
      this.getQuestions()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-container{
    margin-bottom: 20px;
  }
  .form-group{
    margin-bottom: 0;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .modal .modal-body img{
    width: 100%;
    margin: 10px 0 20px;
  }
  .modal .modal-body div{
    margin-bottom: 10px;
  }
  .modal li{
    margin-left: 0;
    margin-right: 0;
  }
</style>
