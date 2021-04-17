<template>
 <div><img class="w-screen" src="../assets/MusiccardsProjectWallpaper.png"></div>

  <base-searchbar :music="musicData" @search-text='searchText' @search-option='changeSearchOption'></base-searchbar>
  
  <add-musiccard :addingState="addingState" @adding-state='changeAddingState' @adding-musiccard='addMusicCard'></add-musiccard>
  
  <music-cards :searchMusic="searchMusic" :notFound="notFound" @adding-state='changeAddingState'></music-cards>
 
</template>

<script>
import MusicCards from '../components/MusicCards.vue';

export default {
  name: 'Home',
  props:{},
  components: {
    MusicCards
    
  },

  data() {
    return {
      url: 'http://localhost:3000/musicData',
      musicData:[],
      inputSearch: "",
      notFound: false,
      searchOption: "name",
      addingState: false
    }
  },
  methods: {

    searchText(searchText) {
      this.inputSearch = searchText;
    },

    changeNotFound(boolean) {
      this.notFound = boolean;
    },

    changeSearchOption(option) {
      this.searchOption = option;
    },

    changeAddingState(boolean) {
        this.addingState = boolean
      },

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

    async addMusicCard(newCard){
      try{
      let i;
      
      for (i = 0; i < this.musicData.length; i++) {
        if (newCard.src == this.musicData[i].shortSrc){
          alert("Sorry, This music already exists.")
          var isDuplicate = true;
        }
      }
      if (isDuplicate != true){
      const res = await fetch(this.url,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          id: this.musicData.length + 1,
          name: newCard.name,
          artist: newCard.artist,
          shortSrc: newCard.src,
          url: "https://youtu.be/" + newCard.src,
          src: "https://www.youtube-nocookie.com/embed/" + newCard.src
        })
      })
      const data = await res.json()
      this.musicData = [...this.musicData, data]
      alert("Add card succeed !")
      }
      }
      catch(error){
        console.log(`Could not save! ${error}`)
      }
    }

  },
  computed: {
    searchMusic() {
      this.changeNotFound(false);
        if (this.inputSearch == "") {
          return this.musicData.slice();
        } else if (this.searchOption == "name" && this.inputSearch != ""){
            let searching = this.musicData.filter((m) => 
            m.name.toLowerCase().includes(this.inputSearch.toLowerCase()));
            if (searching == "") {
              this.changeNotFound(true);
            }
            return searching;
        } else if (this.searchOption == "artist" && this.inputSearch != ""){
            let searching = this.musicData.filter((m) => 
            m.artist.toLowerCase().includes(this.inputSearch.toLowerCase()));
            if (searching == "") {
              this.changeNotFound(true);
            }
            return searching;
        } else {
          return "Error";
        }
    },
  },
  async created(){
      this.musicData = await this.getMusicData();
    },
}
</script>
