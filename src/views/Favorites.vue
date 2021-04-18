<template>
 <!-- <div><img class="w-screen" src="../assets/MusiccardsProjectWallpaper.png"></div> -->
<div id="editZone"></div>
  <base-searchbar 
  :music="favoritesMusic" 
  @search-text='searchText' 
  @search-option='changeSearchOption'>
  </base-searchbar>
  
  <add-musiccard 
  :addingState="addingState"
  :editingState="editingState"
  :editingCard="editingCard"
  @adding-state='changeAddingState' 
  @adding-musiccard='addMusicCard'
  @editing-state='changeEditingState'
  @editing-musiccard='editMusicCard'>
  </add-musiccard>
  
  <music-cards 
  :searchMusic="searchMusic" 
  :notFound="notFound"
  @adding-state='changeAddingState' 
  @delete-musiccard='deleteMusicCard'
  @edit-state='changeEditingState'
  @jump-editzone='jumpToEditZone'>
  </music-cards>
 
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
      FavoritesUrl: 'http://localhost:3000/favoritesMusic',
      musicData:[],
      favoritesMusic:[],
      inputSearch: "",
      notFound: false,
      searchOption: "name",
      addingState: false,
      editingState: false,
      editingCard: null
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
        if(boolean == true){this.changeEditingState(false,null)}
        this.addingState = boolean
      },

    changeEditingState(boolean,editCard) {
      if(boolean == true){this.changeAddingState(false)}
        this.editingState = boolean
        this.editingCard = editCard
      },

    async getMusicData(url){
      try{
      const res = await fetch(url)
      const data = await res.json()
      return data
      }
      catch(error){
        console.log(`Could not get! ${error}`)
      }
    },

    // async addMusicCard(newCard){
    //   try{
    //   let i;
      
    //   for (i = 0; i < this.musicData.length; i++) {
    //     if (newCard.src == this.musicData[i].shortSrc){
    //       alert("Sorry, This music already exists.")
    //       var isDuplicate = true;
    //     }
    //   }
    //   if (isDuplicate != true){
    //   const res = await fetch(this.url,{
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       id: this.musicData.length + 1,
    //       name: newCard.name,
    //       artist: newCard.artist,
    //       shortSrc: newCard.src,
    //       url: "https://youtu.be/" + newCard.src,
    //       src: "https://www.youtube-nocookie.com/embed/" + newCard.src
    //     })
    //   })
    //   const data = await res.json()
    //   this.musicData = [...this.musicData, data]
    //   alert("Add card succeed !")
    //   }
    //   }
    //   catch(error){
    //     console.log(`Could not save! ${error}`)
    //   }
    // },
    // async deleteMusicCard(cardId){
    //   try{
    //     await fetch(`${this.url}/${cardId}`,{
    //       method: 'DELETE'
    //     })
    //     this.musicData = this.musicData.filter(card=>card.id !== cardId)
    //   }
    //   catch(error){
    //     console.log(`Could not delete! ${error}`)
    //   }
    // },
    // async editMusicCard(editingCard){
    //   try{
    //     const res = await fetch(`${this.url}/${editingCard.id}`,{
    //       method: 'PUT',
    //       headers:{
    //         'content-type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         id: editingCard.id,
    //         name: editingCard.name,
    //         artist: editingCard.artist,
    //         shortSrc: editingCard.src,
    //         url: "https://youtu.be/" + editingCard.src,
    //         src: "https://www.youtube-nocookie.com/embed/" + editingCard.src
    //       })
    //     })
    //     const data = await res.json()
    //     this.musicData = this.musicData.map(card => 
    //     card.id === editingCard.id ?
    //     {...card,
    //               name: data.name, 
    //               artist: data.artist, 
    //               shortSrc: data.shortSrc, 
    //               url: data.url,
    //               src: data.src} : card)
    //     alert("Your Editing has been complete !")
    //     console.log(data)
    //     this.editingState = false
    //     this.editingCard = null
    //     // this.editId = ''
    //     // this.enteredName = ''
    //     // this.rating = ''
    //   }
    //   catch(error){
    //     console.log(`Could not edit! ${error}`)
    //   }
    // },
    jumpToEditZone(){
      var go = document.getElementById("editZone");
      go.scrollIntoView();
    }

  },
  computed: {
    searchMusic() {
      this.changeNotFound(false);
        if (this.inputSearch == "") {
          return this.favoritesMusic.slice();
        } else if (this.searchOption == "name" && this.inputSearch != ""){
            let searching = this.favoritesMusic.filter((m) => 
            m.name.toLowerCase().includes(this.inputSearch.toLowerCase()));
            if (searching == "") {
              this.changeNotFound(true);
            }
            return searching;
        } else if (this.searchOption == "artist" && this.inputSearch != ""){
            let searching = this.favoritesMusic.filter((m) => 
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
      this.musicData = await this.getMusicData(this.url);
       this.favoritesMusic = await this.getMusicData(this.FavoritesUrl);
    //   let favoritesData = await this.getMusicData(this.FavoritesUrl);
    //   let i; let j;
    //   for (j= 0; j < favoritesData.length; j++){
    //     for (i = 0; i < this.musicData.length; i++) {
    //         if (favoritesData[j].favoritesId == this.musicData[i].id){
    //             this.favoritesMusic = this.favoritesMusic + this.musicData[i]
    //             console.log(this.favoritesMusic)
    //         }
    //     }
    //   }
    },
}
</script>
