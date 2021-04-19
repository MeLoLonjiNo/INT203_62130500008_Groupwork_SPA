<template>

  <div  class="flex flex-wrap justify-center ">

      <div v-if="notFound == true" class="border border-gray-50 rounded-2xl shadow p-4 my-8 mx-12 bg-red-700 w-cardw h-cardh cursor-pointer">
        <div class="material-icons text-9xl flex justify-center my-center cursor-pointer text-gray-200">
          sentiment_very_dissatisfied
        </div>
        <div class="text-gray-200 font-extrabold text-3xl text-center -mt-40">
          <p> Sorry, Not have any card that match with your search !</p><p class="mt-6"> Please try again.</p>
        </div>
      </div>
    <div v-if="addCardPrivilage == true">
      <div v-on:click="addingState" class="border border-gray-50 rounded-2xl shadow p-4 my-8 mx-12 bg-gray-900 w-cardw h-cardh cursor-pointer">
        <div class="material-icons text-9xl flex justify-center my-center cursor-pointer text-gray-200">
          add_circle_outline
        </div>
        <div>
          <p class="text-gray-200 font-extrabold text-4xl text-center -mt-40">Add a card</p>
        </div>
      </div>
    </div>
      <div v-for="music in searchMusic" :key="music.id">
        <base-musiccard>
          <template v-slot:video>
          <div>
            <iframe
              width="340"
              height="250"
              :src= "music.src"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          </template>

          <template v-slot:musicname>  
            <p style="font-family: 'Roboto', sans-serif;" >{{ music.name }}</p>
          </template>

          <template v-slot:description>
            <p>Music Card ID : {{ music.id }}</p>
            <p>Artist : {{ music.artist}}</p>
            <p>
              Link :
              <a
                class="link"
                :href="music.url"
                target="_blank"
                >{{ music.url }}</a
              >
            </p>
          </template>
          
          <template v-slot:icon>
            <span v-if="music.favorite == false" @click="favoritesCard(music)" class="material-icons text-4xl cursor-pointer">favorite_border</span>
           <span v-if="music.favorite == true" @click="favoritesCard(music)" class="material-icons text-4xl cursor-pointer text-red-500">favorite</span>
            <!-- <span class="material-icons text-4xl cursor-pointer">playlist_add</span> -->
            <span @click="editCard(music)" class="material-icons text-4xl cursor-pointer">edit</span>
            <span @click="deleteCard(music.id)" class="material-icons text-4xl cursor-pointer">delete</span>
          </template>
        </base-musiccard>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props:{
        searchMusic: {
            type: Array,
            require: true
        },
        notFound: Boolean,
        addCardPrivilage: Boolean
        
    },
  components: {
    
  },

  data() {
    return {
      isAddingState: false
    }
  },
  methods: {
      addingState(){
        this.$emit('adding-state', true);
        this.$emit('jump-editzone')
      },
      deleteCard(cardID) {
        this.$emit('delete-musiccard', cardID)
      },
      editCard(card) {
        this.$emit('edit-state',true,card)
        this.$emit('jump-editzone')
      },
      favoritesCard(card) {
        this.$emit('favorite-card',card)
      }
    }

}
</script>