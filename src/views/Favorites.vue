<template>
 <div><img class="w-screen" src="../assets/MusiccardsProjectWallpaper.png"></div>
<div id="editZone"></div>
  <base-searchbar 
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
  :addCardPrivilage="false"
  @adding-state='changeAddingState' 
  @delete-musiccard='deleteMusicCard'
  @edit-state='changeEditingState'
  @jump-editzone='jumpToEditZone'
  >
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
      musicData:[],
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

    clickFavorite(favoriteCard){
      if (favoriteCard.favorite == false){
        this.editMusicCard(favoriteCard, true)
      } else {
        this.editMusicCard(favoriteCard, false)
      }
    },

    async editMusicCard(editingCard,boolean){
      // console.log(editingCard,boolean)
      try{
        const res = await fetch(`${this.url}/${editingCard.id}`,{
          method: 'PUT',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            id: editingCard.id,
            name: editingCard.name,
            artist: editingCard.artist,
            shortSrc: editingCard.shortSrc,
            url:  "https://youtu.be/"+editingCard.shortSrc,
            src: "https://www.youtube-nocookie.com/embed/"+editingCard.shortSrc,
            favorite: boolean
          })
        })
        const data = await res.json()
        this.musicData = this.musicData.map(card => 
        card.id === editingCard.id ?
        {...card,
                  id: data.id,
                  name: data.name, 
                  artist: data.artist, 
                  shortSrc: data.shortSrc, 
                  url: data.url,
                  src: data.src,
                  favorite: data.favorite
        } : card)
        if (this.editingState == true){
        alert("Your Editing has been complete !")
        }
        // console.log(data)
        this.editingState = false
        this.editingCard = null
      }
      catch(error){
        console.log(`Could not edit! ${error}`)
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
          id: this.findMissingID(),
          name: newCard.name,
          artist: newCard.artist,
          shortSrc: newCard.shortSrc,
          url: "https://youtu.be/" + newCard.shortSrc,
          src: "https://www.youtube-nocookie.com/embed/" + newCard.shortSrc,
          favorite: false
        })
      })
      const data = await res.json()
      this.musicData = [...this.musicData, data]
      alert("Add card succeed !")
      location.reload();
      }
      }
      catch(error){
        console.log(`Could not save! ${error}`)
      }
    },

    async deleteMusicCard(cardId){
      try{
        await fetch(`${this.url}/${cardId}`,{
          method: 'DELETE'
        })
        this.musicData = this.musicData.filter(card=>card.id !== cardId)
      }
      catch(error){
        console.log(`Could not delete! ${error}`)
      }
    },

    jumpToEditZone(){
      var go = document.getElementById("editZone");
      go.scrollIntoView();
    },

    findMissingID(){
      let i;
      var missingID;
      for (i=0; i<this.musicData.length;i++){
        if(i+1 != this.musicData[i].id){
          // console.log(i)
          missingID = i+1
          // console.log(missingID)
          return missingID
        }
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
      let data = await this.getMusicData(this.url);
      let i;
      for (i=0; i < data.length; i++){
        if(data[i].favorite == true){
          this.musicData.push(data[i])
        }
      }
      this.musicData = this.musicData.sort((a, b) => (a.id > b.id) ? 1 : -1)
      // console.log(data)
      // console.log(this.musicData)
    },
}
</script>
