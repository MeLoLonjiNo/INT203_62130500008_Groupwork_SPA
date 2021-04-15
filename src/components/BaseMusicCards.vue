<template>
  <div  class="flex flex-wrap justify-center">
      <div
      v-for="music in musicData" :key="music.id"
        class="border border-gray-50 rounded-2xl shadow p-4 my-8 mx-12 bg-gray-900 w-cardw h-cardh"
      >
        <div class="bg-white p-1">
          <div>
            <iframe
              width="340"
              height="250"
              :src=  "music.src"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div
          class="border-t-4 border-b-4 mt-2 border-gray-500 bg-white shadow-inner"
        >
          <p style="font-family: 'Roboto', sans-serif;" class="pl-4 py-0.5 font-extrabold text-xl">{{ music.name }}</p>
        </div>
        <div class="bg-gray-200 h-56 my-2 pt-4 font-semibold text-base">
          <div class="pl-6">
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
          </div>
          <div class="flex mt-10 justify-center space-x-8">
            <span class="material-icons text-4xl cursor-pointer"
              >favorite_border</span
            >
            <span class="material-icons text-4xl cursor-pointer"
              >playlist_add</span
            >
            <span class="material-icons text-4xl cursor-pointer">edit</span>
            <span class="material-icons text-4xl cursor-pointer">delete</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  components: {
    
  },

  data() {
    return {
      url: 'http://localhost:3000/musicData',
      musicData:[]
    }
  },
  methods: {

    async getMusicData(){
      try{
      const res = await fetch(this.url)
      const data = await res.json()
      return data
      }
      catch(error){
        console.log(`Could not get! ${error}`)
      }
    },

    
  },
  async created(){
      this.musicData = await this.getMusicData();
    },
}
</script>