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
        <img v-bind:src="question.value" class="table-img">
      </template>
      <template slot="detail" scope="question">
        <b-btn size="sm" @click="details(question); $root.$emit('show::modal','modal-detail')">Details</b-btn>
      </template>
    </b-table>

    <b-modal ref="modal" id="modal-detail" v-bind:title="'Question ' + currentDetail.id" hide-footer>
      <div><strong>Question: </strong>{{ currentDetail.question }}</div>
      <img v-bind:src="currentDetail.image_url" />
      <div><strong>Question date: </strong>{{ currentDetail.published_at }}</div>
      <ul class="row">
        <li v-for="choice in currentDetail.choices" class="col-md-6">
          <div><strong>{{ choice.choice }}</strong>: {{ choice.votes }} votes <b-button v-on:click="vote(choice, currentDetail)" class="vote float-right">
            +
          </b-button></div>
        </li>
      </ul>
      
      <!-- <input v-model="share_email" placeholder="email"> -->
      <div><strong>Email</strong></div>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group" :class="{error: validation.hasError('share_email')}">
            <input type="text" class="form-control" v-model="share_email"/>
            <div class="message">{{ validation.firstError('share_email') }}</div>
          </div>
        </div>
        <div class="email-status col-md-1">{{email_status}}</div>
        <div class="col-md-3">
          <div class="form-group">
            <b-button v-on:click="share" class="float-right">
              Share
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>

    <b-modal ref="modal_email" id="modal-email" v-bind:title="'Question ' + currentDetail.id" hide-footer close-on-escape>

    </b-modal>
    <div class="d-flex justify-content-end">
      <b-pagination size="sm" :total-rows="this.questions.length" :per-page="perPage" v-model="currentPage" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  var SimpleVueValidation = require('simple-vue-validator')
  var Validator = SimpleVueValidation.Validator

  Vue.use(SimpleVueValidation)

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
        email_status: '',
        email: ''
      }
    },
    validators: {
      share_email: function (value) {
        return Validator.value(value).email().required()
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
        if (this.$route.query.question_id) {
          this.$http
          .get('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/questions/' + this.$route.query.question_id)
          .then(response => {
            this.currentDetail = response.body
            this.$refs.modal.show()
          })
        }
      },
      share: function () {
        this.$validate()
        .then(success => {
          console.log(success)
          if (success) {
            this.$http
            .post('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/share?' + this.share_email + '&' + this.$route.fullPath)
            .then(response => {
              this.email_status = response.body.status
              var self = this

              setTimeout(function () {
                self.email_status = ''
              }, 5000)
            })
          }
        })
      },
      details (question) {
        this.currentDetail = question.item
        this.$router.replace({ name: 'Questions', query: {question_id: this.currentDetail.id} })
      },
      resetForm: function (e) {
        this.filter = ''
      },
      vote: function (choice, question) {
        this.$http
        .put('https://private-anon-26f4c9d275-blissrecruitmentapi.apiary-mock.com/questions/' + question.id, question)
        .then(response => {
          choice.votes += 1
        })
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
  .email-status{
    margin-top: 8px;
  }
  .vote{
    padding: 4px;
    line-height: 13px;
  }
  .table-img{
    width: 40px;
  }
</style>
