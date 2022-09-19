<template>
  <b-form-group
    :label="label"
    :invalid-feedback="invalidFeedback"
    :state="state">
    <b-input-group :class="{ 'has-prepend': prepend, 'has-append': append }">
      <span class="prepend" v-if="prepend" v-html="prepend"></span>
      <b-form-input
        v-model="value"
        :maxlength="maxLength"
        :placeholder="placeholder"
        @input="validateInput"
        ></b-form-input>
      <span class="append" v-if="append" v-html="append"></span>
    </b-input-group>
    <span class="form-text ly-row ly-spacebetween-center">
      <div class="messages">
        <span class="text-dark-muted" v-if="description">{{ description }}</span>
      </div>
      <span v-if="maxLength">{{ value.length }}/{{ maxLength }}</span>
    </span>
  </b-form-group>
</template>

<script>
export default {
  name: 'LpInput',
  props: {
    label: {
      type: String,
      default: '',
      required: false,
      note: 'Form input label'
    },
    description: {
      type: String,
      default: '',
      required: false,
      note: 'Form input description'
    },
    placeholder: {
      type: String,
      required: false,
      note: 'Input placeholder'
    },
    type: {
      type: String,
      required: false,
      note: 'Input type'
    },
    prepend: {
      type: String,
      required: false,
      note: 'Prepended label'
    },
    append: {
      type: String,
      required: false,
      note: 'Appended label'
    },
    maxLength: {
      type: Number,
      required: false,
      note: 'Form input max length'
    }
  },
  computed: {
    state() {
      if (this.maxLength) {
        return this.value.length <= this.maxLength
      }
      return false
    },
    invalidFeedback() {
      if (this.type === 'number' &&
          isNaN(parseFloat(this.value)) &&
          !isFinite(this.value)) {
        return 'Input is not valid'
      }
      return ''
    }
  },
  methods: {
    validateInput(value) {
      if (!this.invalidFeedback) {
        this.$emit('update:modelValue', value)
      } else {
        this.$emit('update:modelValue', '')
      }
    },
    validateValue: function(evt) {
      if (this.type === 'number') {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    }
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  
  $clr-blue: #1a62ff;

  .lp {
    fieldset {
      margin-bottom: 0 !important;
      .input-group {
        position: relative;
        .form-control {
          border: 2px solid transparent;
          border-radius: 5px !important;
          box-shadow: 0 0 0 0 white, 0 0 0 0 $clr-blue;
          margin: 0 !important;
          padding: 10px !important;
          transition: text-indent 0.3s ease;
          &:hover {
            border-color: rgba(0, 0, 0, 0.05);
          }
          &:focus {
            border-color: $clr-blue !important;
            box-shadow: 0 0 0 1px white, 0 0 0 3px $clr-blue;
            &:placeholder-shown {
              text-indent: 5px;
            }
            &:not(:placeholder-shown) {
              text-indent: 0;
              transition: text-indent 0s ease;
            }
          }
        }
        .prepend, .append {
          align-items: center;
          bottom: 0;
          display: flex;
          font-size: 14px;
          font-weight: 700;
          justify-content: center;
          position: absolute;
          top: 0;
          width: 28px;
          z-index: 8;
        }
        .prepend {
          left: 0;
        }
        .append {
          right: 0;
        }
        &.has-prepend {
          .form-control {
            padding-left: 28px !important;
          }
        }
        &.has-append {
          .form-control {
            padding-right: 28px !important;
          }
        }
      }
      .form-text {
        align-items: flex-start;
        .messages {
          display: flex;
          flex-direction: column;
        }
      }
      :deep(.invalid-feedback) {
        display: block;
        font-size: 12px;
        margin-top: 0;
      }
    }
  }
</style>
