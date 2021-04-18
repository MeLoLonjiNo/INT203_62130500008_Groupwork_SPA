<template >
<div v-if="addingState==true || editingState==true" >
    <div  class="grid justify-items-center bg-gray-800 text-white py-6">
        <form @submit.prevent="submitForm">
        <div class="flex flex-col space-y-3 justify-center">
            <p v-if="addingState==true" class="text-4xl font-bold text-center">Add a music card</p>
            <p v-if="editingState==true" class="text-4xl font-bold text-center">Edit a card ID {{editingCard.id}}</p>
        <p v-if="editingState==true" class="font-semibold text-gray-200 pt-4">Old Music Name : {{editingCard.name}}</p>
        <div>
            <label class="label" for="name">Music Name : </label>
            <input v-on:click="showName"
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
        <p v-if="editingState==true" class="font-semibold text-gray-200 pt-4">Old Artist Name : {{editingCard.artist}}</p>
        <div>
            <label class="label" for="artist">Artist Name : </label>
            <input v-on:click="showArtist"
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
        <p v-if="editingState==true" class="font-semibold text-gray-200 pt-4">Old Music Source Code : {{editingCard.shortSrc}}</p>
        <div>
            <label class="label" for="src">Source Code : </label>
            <input v-on:click="showSrc"
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
        <base-button v-on:click="closeForm" class="w-1/3 bg-red-500 hover:bg-red-600"> Close </base-button>
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
        addingState: Boolean,
        editingState: Boolean,
        editingCard: Object
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
    
    closeForm(){
        this.clearData()
        this.$emit('adding-state', false);
        this.$emit('editing-state',(false,null));
        // console.log(this.addingState,this.editingState,this.editingCard)
    },
    submitForm() {
      if(this.enteredName !== '' && this.enteredArtist !== '' && this.enteredSrc != ''){
          if(this.editingState == true){
              console.log(this.editingCard.id,this.enteredName,this.enteredArtist,this.enteredSrc)
              this.$emit('editing-musiccard', 
              ({id:this.editingCard.id,name:this.enteredName,artist:this.enteredArtist,src:this.enteredSrc}))
          } else {
              this.$emit('adding-musiccard', 
              ({name:this.enteredName,artist:this.enteredArtist,src:this.enteredSrc}))
          }
        // this.closeForm()
        this.clearData()
      }
    },
    showName(){
            this.enteredName = this.editingCard.name
    },
    showArtist(){
            this.enteredArtist = this.editingCard.artist
    },
    showSrc(){
            this.enteredSrc = this.editingCard.shortSrc
    }
    }
}
</script>
