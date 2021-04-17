<template>
 <div><img class="w-screen" src="../assets/MusiccardsProjectWallpaper.png"></div>

  <div  class="flex flex-wrap justify-center">
      <div v-for="music in musicData" :key="music.id">
        <base-musiccard>
          <template v-slot:video>
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
          </template>

          <template v-slot:musicname>  
            <p style="font-family: 'Roboto', sans-serif;" class="pl-4 py-0.5 font-extrabold text-xl">{{ music.name }}</p>
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
            <span class="material-icons text-4xl cursor-pointer">favorite_border</span>
            <span class="material-icons text-4xl cursor-pointer">playlist_add</span>
            <span class="material-icons text-4xl cursor-pointer">edit</span>
            <span class="material-icons text-4xl cursor-pointer">delete</span>
          </template>
        </base-musiccard>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
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
