<template>
<div v-if="addingState==true">
    
    <div class="grid justify-items-center bg-gray-800 text-white py-6">
        <form @submit.prevent="submitForm">
        <div class="flex flex-col space-y-4 justify-center">
        <p class="text-4xl font-bold">Add a music card</p>
        <div>
            <label class="label" for="name">Music Name : </label>
            <input
                class="input w-full text-black"
                :class="{ 'bg-red-50': invalidNameInput }"
                id="name"
                type="text"
                v-model.trim="enteredName"
                @blur="validateName"
            />
            <p v-if="invalidNameInput" class="text-red-500">
                Please enter music name!
            </p>
        </div>
        <div>
            <label class="label" for="artist">Artist Name : </label>
            <input
                class="input w-full text-black"
                :class="{ 'bg-red-50': invalidArtistInput }"
                id="artist"
                type="text"
                v-model.trim="enteredArtist"
                @blur="validateArtist"
            />
            <p v-if="invalidArtistInput" class="text-red-500">
                Please enter artist name!
            </p>
        </div>
        <div>
            <label class="label" for="src">Source Code : </label>
            <input
                class="input w-full text-black"
                :class="{ 'bg-red-50': invalidSrcInput }"
                id="src"
                type="text"
                v-model.trim="enteredSrc"
                @blur="validateSrc"
            />
            <p v-if="invalidSrcInput" class="text-red-500">
                Please enter source code!
            </p>
        </div>
        <div class="flex justify-center space-x-8">
        <base-button class="w-1/3 bg-green-500 hover:bg-green-600"> Submit </base-button>
        <base-button v-on:click="clearData" class="w-1/3 bg-gray-400 hover:bg-gray-600"> Clear </base-button>
        <base-button v-on:click="closeAddingState" class="w-1/3 bg-red-500 hover:bg-red-600"> Close </base-button>
        </div>
        
        </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  props:{
        addingState: Boolean
        },
  components: {
    
  },

  data() {
    return {
        enteredName: '',
        enteredArtist: '',
        enteredSrc: '',
        invalidNameInput: false,
        invalidArtistInput: false,
        invalidSrcInput: false,
    }
  },
  methods: {
      validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false
    //   console.log(`name: ${this.invalidNameInput}`)
    },
    validateArtist() {
      this.invalidArtistInput = this.enteredArtist === '' ? true : false
    //   console.log(`name: ${this.invalidArtistInput}`)
    },
    validateSrc() {
      this.invalidSrcInput = this.enteredSrc === '' ? true : false
    //   console.log(`name: ${this.invalidSrcInput}`)
    },
    clearData(){
        this.enteredName = '',
        this.enteredArtist = '',
        this.enteredSrc = '',
        this.invalidNameInput = false,
        this.invalidArtistInput = false,
        this.invalidSrcInput = false
    },
    closeAddingState(){
        this.clearData()
        this.$emit('adding-state', false);
    },
    submitForm() {
      if(this.enteredName !== '' && this.enteredArtist !== '' && this.enteredSrc != ''){
        this.$emit('adding-musiccard', ({name:this.enteredName,artist:this.enteredArtist,src:this.enteredSrc}))
        this.closeAddingState
      }
    },
    },
}
</script>
