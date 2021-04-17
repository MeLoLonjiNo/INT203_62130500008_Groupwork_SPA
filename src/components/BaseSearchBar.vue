<template>
    <div class="flex justify-center my-8 space-x-3">
    <span class="flex justify-center">
        <span class=" material-icons text-4xl">
            search
        </span>

        <span class="text-base font-semibold my-auto">
            Search By :
        </span>

        <span v-if="searchOption== 'name'">
            <base-button class="bg-green-500 border-green-500 text-white" v-on:click="searchByName">Name</base-button>
            <base-button v-on:click="searchByArtist">Artist</base-button>
        </span>
        <span v-else-if="searchOption== 'artist'">
            <base-button v-on:click="searchByName">Name</base-button>
            <base-button class="bg-green-500 border-green-500 text-white" v-on:click="searchByArtist">Artist</base-button>
        </span>
    </span>

        <input v-model="inputSearch" @input="searchText"
            class=" p-1 w-80 placeholder-gray-500 placeholder-opacity-50  focus:outline-none text-black rounded border-gray-300 border-2
            transition hover:border-gray-500 duration-500"
            type="text" placeholder="Please enter text for searching cards"
        >
        
        <base-button v-on:click="cancleSearch" 
            class=" bg-blue-500 border-blue-500 text-white 
            transition hover:bg-red-600 hover:border-red-600 duration-500">
                Cancel
        </base-button>
    </div>
</template>

<script>

export default {
  components: {
    
  },

  data() {
    return {
      inputSearch: '',
      searchOption: "name"
    }
  },
  methods: {
    cancleSearch(){
        this.inputSearch = '';
        this.$emit('search-text', this.inputSearch);
    },

    searchText() {
      this.$emit('search-text', this.inputSearch);
    },
    searchByName(){
        this.searchOption = "name"
        this.$emit('search-option', this.searchOption);
    },
    searchByArtist(){
        this.searchOption = "artist"
        this.$emit('search-option', this.searchOption);
    }
  }
}
</script>