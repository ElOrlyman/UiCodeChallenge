<template>
  <b-form-group :label="label">
    <div class="dropdown" v-if="options">
      <input :class="{ 'dropdown-input': true, 'dropdown-open': optionsShown }"
        type="text"
        @click="showOptions()"
        :value="selected.name"
        :placeholder="placeholder"
        readonly />
      <div :class="{ 'dropdown-content': true, 'shadow': true, 'open': optionsShown }"
        v-click-away="exit">

        <div class="search-container" v-if="search">
          <LpInput
            placeholder="Filter options..."
            prepend="<i class='bi bi-search'></i>"
            type="text"
            v-model="searchFilter" />
        </div>

        <div class="items-container thin-scrollbar">

          <template v-if="!groups">
            <div class="dropdown-item" v-for="(option, index) in filteredOptions" :key="index"
              @mousedown="selectOption(option)">
              {{ option.name || option.id || '-' }}
            </div>
          </template>

          <template v-if="groups">
            <div class="dropdown-group" v-for="(option, index) in filteredOptions" :key="index">
              <span class="group-label">{{ option.label }}</span>
              <div class="dropdown-item" v-for="(subOption, subindex) in option.options" :key="subindex"
                @mousedown="selectOption(subOption)">
                {{ subOption.name || subOption.id || '-' }}
              </div>
            </div>
          </template>

        </div>
        
      </div>
    </div>
  </b-form-group>
</template>

<script>
import LpInput from './LpInput.vue'

export default {

  name: 'LpSelect',
  components: {
    LpInput
  },
  props: {
    label: {
      type: String,
      default: '',
      required: false,
      note: 'Component label'
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
      note: 'Options of dropdown. An array of options with id and name',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Select option',
      note: 'Placeholder of dropdown'
    },
    search: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Set a searchbar to filter options'
    }
  },
  data() {
    return {
      selected: {},
      optionsShown: false,
      searchFilter: '',
      groups: false
    }
  },
  created() {
    if (this.options.length && this.options[0].options) {
      this.groups = true
    }
    this.$emit('selected', this.selected);
  },
  computed: {
    filteredOptions() {
      if (this.groups) {
       return this.options.map(group => {
          const filteredOpts = group.options
            .filter(option => option.name.toLowerCase().includes(this.searchFilter.toLowerCase()))
          return { label: group.label, options: filteredOpts };
        }) 
      } else {
        const filteredOpts = this.options
            .filter(option => option.name.toLowerCase().includes(this.searchFilter.toLowerCase()))
        return filteredOpts
      }     
    }    
  },
  methods: {
    selectOption(option) {
      this.searchFilter = option.name;
      this.selected = option;
      this.optionsShown = false;
      this.$emit('selected', this.selected);
    },
    showOptions() {
      this.searchFilter = '';
      setTimeout(() => {
        this.optionsShown = true;
      }, 50);
    },
    keyMonitor: function(event) {
      if (event.key === "Enter" && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    },
    exit() {
      if (this.optionsShown) {
        this.searchFilter = '';
        this.selected = {};
        this.optionsShown = false
      }
    }
  }
}
</script>

<style lang='scss' scoped>

  $clr-blue: #1a62ff;

  .lp fieldset {
    margin-bottom: 0 !important;
  }

  .dropdown {
    position: relative;
    display: block;
    margin: auto;
    .dropdown-input {
      border: 2px solid transparent;
      box-shadow: 0 0 0 0 white, 0 0 0 0 $clr-blue;
      cursor: pointer;
      display: block;
      position: relative;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      &:hover {
        border-color: rgba(0, 0, 0, 0.05);
      }
      &.dropdown-open {
        border-color: $clr-blue;
        box-shadow: 0 0 0 2px white, 0 0 0 4px $clr-blue;
      }
      &:focus-visible {
        border-width: 0 !important;
      }
    }
    .dropdown-content {
      background-color: white;
      border-radius: 5px;
      position: absolute;
      left: 0;
      margin-left: 0;
      max-width: 248px;
      padding: 10px 0;
      right: 0;
      top: calc(100% + 2px);
      z-index: 10;
      visibility: hidden;
      opacity: 0;
      transform: translateY(-10%);
      transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.15s ease;

      .search-container {
        border-bottom: 1px solid #ddd;
        padding: 0 10px 10px;
      }

      .items-container {
        max-height: 150px;
        scrollbar-color: #3b4355 #efefef;
        scrollbar-width: thin;
        overflow: auto;
        .group-label {
          color: #ccc;
          display: block;
          font-size: 13px;
          font-weight: 700;
          padding: 15px 10px 5px;
          text-transform: uppercase;
        }

        .dropdown-item {
          border-left: 4px solid transparent;
          color: #2a2a2a;
          font-size: 13px;
          line-height: 1em;
          padding: 10px;
          text-decoration: none;
          display: block;
          cursor: pointer;
          &:hover {
            background-color: transparentize($clr-blue, 0.6);
            border-color: $clr-blue;
          }
        }
      }
      &.open {
        visibility: visible;
        transform: translateY(0);
        opacity: 1;
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.6s ease;
      }
    }
    &:hover .dropdown-content {
      display: block;
    }
    .thin-scrollbar::-webkit-scrollbar {
      background-color: #efefef;
      height: 8px;
      width: 6px;
    }

    /* Add a thumb */
    .thin-scrollbar::-webkit-scrollbar-thumb {
      background: #3b4355;
    }
  }
</style>
