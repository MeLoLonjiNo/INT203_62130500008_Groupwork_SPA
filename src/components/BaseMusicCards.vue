<template>
    <div class="border border-gray-50 rounded-2xl shadow p-4 my-8 mx-12 bg-gray-900 w-cardw h-cardh">
        <div class="bg-white p-1">
          <slot name="video"></slot>
        </div>

      <div class="border-t-4 border-b-4 mt-2 border-gray-500 bg-white shadow-inner pl-4 py-0.5 font-extrabold text-xl">
        <slot name="musicname"></slot>
      </div>

      <div class="bg-gray-200 h-56 my-2 pt-4 font-semibold text-base">
        <div class="pl-6">
          <slot name="description"></slot>
        </div>
        <div class="flex mt-10 justify-center space-x-8">
          <slot name="icon"></slot>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  components: {
    
  },

  // data() {
  //   return {
  //     url: 'http://localhost:3000/musicData',
  //     musicData:[]
  //   }
  // },
  // methods: {

  //   async getMusicData(){
  //     try{
  //     const res = await fetch(this.url)
  //     const data = await res.json()
  //     return data
  //     }
  //     catch(error){
  //       console.log(`Could not get! ${error}`)
  //     }
  //   },

    
  // },
  // async created(){
  //     this.musicData = await this.getMusicData();
  //   },
}
</script>