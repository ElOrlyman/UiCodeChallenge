<template>
  <form action="" class="lp">
    <div class="ly-even-2">
      <div class="pb-2">
        <LpSelect
          label="Select a Fruit"
          v-model="result1"
          :options="dropdownOptions1"
          @selected="onResult1Selected" />
      </div>
      <div class="pb-2">
        <LpSelect
          label="Select a Food Item"
          v-model="result2"
          :options="dropdownOptions2"
          :search="true"
          @selected="onResult2Selected" />
      </div>
    </div>
    <div class="ly-even-2">
      <div class="pb-2">
        <LpInput
          label="Favorite Food"
          v-model="result3"
          description="E.g. Seafood Pizza."
          :maxLength="80" />
      </div>
      <div class="pb-2">
        <LpInput
          label="Food Budget"
          v-model="result4"
          prepend="<i class='bi bi-currency-dollar'></i>"
          type="number" />
      </div>
    </div>
    <div class="results-list">
      <h4>Results</h4>
      <ul>
        <li>Input 1: <span class="text-success">{{ JSON.stringify(result1, null, 2) }}</span></li>
        <li>Input 2: <span class="text-success">{{ JSON.stringify(result2, null, 2) }}</span></li>
        <li>Input 3: <span class="text-success">{{ JSON.stringify(result3) }}</span></li>
        <li>Input 4: <span class="text-success">{{ result4 }}</span></li>
      </ul>
    </div>
  </form>
</template>

<script>
import LpInput from './shared/LpInput.vue'
import LpSelect from './shared/LpSelect.vue'

export default {
  name: 'FormModal',
  components: {
    LpInput,
    LpSelect
  },
  props: {
    id: {
      type: String,
      required: true,
      note: 'Form id'
    }
  },
  emits: ["updateSubmitButton"],
  methods: {
    onResult1Selected(value) {
      this.result1 = value
    },
    onResult2Selected(value) {
      this.result2 = value
    }
  },
  created() {
    this.$emit('updateSubmitButton', this.isFormValidRes);
  },
  computed: {
    isFormValidRes() {
      return  (this.result1 !== {}) &&
              (this.result2 !== {}) &&
              (this.result3 !== '') &&
              (this.result4 !== '')
    }
  },
  watch: {
    isFormValidRes() {
      this.$emit('updateSubmitButton', this.isFormValidRes);
    }
  },
  data: () => ({
    result1: {},
    result2: {},
    result3: '',
    result4: '',
    isFormValid: false,
    dropdownOptions1: [
      { id: 'a', name: 'Watermelon' },
      { id: 'b', name: 'Orange' },
      { id: 'c', name: 'Banana' },
      { id: 'c', name: 'Kiwi' }
    ],
    dropdownOptions2: [
      {
        label: 'Fruits',
        options: [
          { id: 'a', name: 'Watermelon' },
          { id: 'b', name: 'Orange' },
          { id: 'c', name: 'Banana' },
          { id: 'c', name: 'Kiwi' }
        ]
      },
      {
        label: 'Vegetables',
        options: [
          { id: '1', name: 'Lettuce' },
          { id: '2', name: 'Cucumber' },
          { id: '3', name: 'Cabbage' },
          { id: '4', name: 'Tomato' }
        ]
      }
    ]
  })
}
</script>

<style lang="scss" scoped>

  $clr-blue: #1a62ff;

  ::v-deep .col-form-label {
    font-size: 13px;
  }
  ::v-deep .form-text {
    font-size: 12px;
    margin-left: 0 !important;
    margin-top: 8px;
  }
  .lp {
    .ly-even-2 {
      @media screen and (max-width: 420px) {
        display: block;
      }
      .pb-2 {
        padding-bottom: 24px !important;
      }
    }
    .results-list {
      h4 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      ul {
        list-style: none;
        padding-left: 10px;
      }
    }
  }
</style>
