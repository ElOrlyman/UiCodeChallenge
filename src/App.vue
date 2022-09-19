<template>
  <div class="main">
    <div class="lp">
      <h1>UI Challenge</h1>
      <b-button v-b-modal.modal-1>Show modal</b-button>
      <b-modal
        id="modal-1"
        title="Supermarket Survey!"
        ok-title="Submit"
        @ok="showResult"
        :ok-disabled="disableSubmit" >
        <FormModal
          id="form-1"
          @updateSubmitButton="checkIfValid" />
      </b-modal>
      <span class="text-success block block-new ly-100 mt-3" v-if="success">Form is Valid!</span>
    </div>
  </div>
</template>

<script>
import FormModal from './components/FormModal.vue'

export default {
  name: 'App',
  components: {
    FormModal
  },
  methods: {
    checkIfValid(value) {
      this.disableSubmit = !value
    },
    showResult() {
      this.success = true
    }
  },
  data: () => ({
    showModal: false,
    disableSubmit: false,
    success: false
  })
}
</script>

<style>
  @import 'http://css.loanpro.io/dist/lp.css';

  body {
    font-family: Roboto, Arial, Helvetica, sans-serif !important;
  }

  .modal-backdrop {
    background-color: #2a2a2a !important;
  }

  .main {
    align-items: center;
    background: #E0E4EB;
    display: flex;
    height: 100vh;
    justify-content: center;
    width: 100vw;
  }

  .main > .lp {
    background: white;
    border-radius: 5px;
    max-width: 420px;
    padding: 50px 20px;
    text-align: center;
    width: 100%;
  }

  .modal-content {
    border-radius: 5px !important;
  }

  .modal-header {
    border-bottom: 0 !important;
  }

  .modal-header .modal-title {
    color: #27313f;
    line-height: 1;
  }

  .modal-header .btn-close {
    background-size: contain;
    box-sizing: border-box;
    height: 16px;
    margin-right: calc(var(--bs-modal-header-padding-y) * 0.25) !important;
    width: 16px;
  }

  .modal-body {
    padding: 0 20px !important;
  }

  .modal-footer {
    border-top: none !important;
  }

  .modal-footer .btn {
    font-weight: 700;
  }

  .modal-footer .btn.btn-primary {
    background-color: #1a62ff !important;
  }

  .modal-footer .btn.btn-secondary {
    background-color: transparent !important;
    border-color: #1a62ff !important;
    border-width: 2px;
    color: #1a62ff !important;
  }

  .form-control {
    font-size: 13px !important;
  }
</style>
