<template>
  <div class="about">
  <div class=" bg-green-100 h-full">
    <p class="text-center pt-8 text-4xl font-semibold">About Me</p>
    <div class="mx-52">
      <div class="flex justify-center">
    <div class=" grid justify-items-end">
    <base-musiccard >
      <template v-slot:video>
        <img src="../assets/melo.jpg" 
          class=" w-videowidth h-videoheight">
      </template>
      <template v-slot:musicname>
        <p style="font-family: 'Roboto', sans-serif;" >Kritsanapon Rakkiatngam</p>
      </template>
      <template v-slot:description>
        <div class="flex flex-col space-y-2">
        <p>Student ID: 62130500008</p>
        <p>Educational: IT25 | SIT | KMUTT</p>
        <div class="flex jus">
          <span class="material-icons text-3xl -mt-2">phone_iphone</span>
          <p>: 080 050 1002</p>
        </div>
        <div class="flex jus">
          <span class="material-icons text-3xl -mt-2">email</span>
          <p>: kritsanapon.melo@mail.kmutt.ac.th</p>
        </div>
        </div>
      </template>
      <template v-slot:icon>
        <div class="flex justify-center space-x-8 -mt-6">
        <a href="https://www.facebook.com/kritsanapon.melolonjino" target="_blank">
          <span class="material-icons text-5xl -mt-1 text-blue-800">facebook</span>
        </a>
        <a href="https://line.me/ti/p/e-DZ-8JOn8" target="_blank">
          <img src="../assets/line.png" class="w-10">
        </a>
        <a href="https://www.instagram.com/melolonjino/" target="_blank">
          <img src="../assets/instagram.png" class="w-10">
        </a>
        </div>
      </template>
    </base-musiccard>
    </div>
    <div class="w-1/2 flex flex-col justify-center px-12 pt-8">
      <p class=" text-3xl font-semibold">Skill</p>
      <div class="flex flex-col space-y-6 my-5 ml-5 font-semibold text-lg">

        <div class="flex space-x-5">
          <div class="flex-col space-y-5">
            <div>Font-End:</div>
            <div>Back-End:</div>
            <div>Database:</div>
            <div>Dev-Op:</div>
            <div>Network:</div>
            <div>UX/UI Design:</div>
          </div>
          <div class="flex-col space-y-4 w-full">
            <div class="box-content bg-green-700 rounded-md w-9/12 h-8"></div>
            <div class="box-content bg-green-500 rounded-md w-7/12 h-8"></div>
            <div class="box-content bg-green-700 rounded-md w-10/12 h-8"></div>
            <div class="box-content bg-yellow-600 rounded-md w-5/12 h-8"></div>
            <div class="box-content bg-red-700 rounded-md w-4/12 h-8"></div>
            <div class="box-content bg-green-700 rounded-md w-full h-8"></div>
          </div>
        </div>
        
      </div>
      <div class="flex mx-auto">
          <a href="https://github.com/MeLoLonjiNo" target="_blank">
          <div class="flex  flex-col justify-center mt-6 ">
            <img src="../assets/GitHub-Mark-120px-plus.png" class="w-20 ml-5">
            <p class="text-2xl font-semibold">My Git Hub</p>
          </div>
          </a>
      </div>
    </div>
    </div>  
    </div>
  </div>

  <div class=" bg-white h-full">
    <p class="text-center pt-8 text-2xl font-medium">---------- Git Repo ----------</p>
    <a href="https://github.com/MeLoLonjiNo/INT203_62130500008_Groupwork_SPA" target="_blank">
      <p class="text-center pt-4 text-4xl font-bold hover:text-blue-800">Project Music Cards</p>
    </a>
  </div>
</div>
</template>

<script>


export default {
  name: 'About',
  props:{},
  components: {
    
    
    
  },

  data() {
    return {
      
    }
  },
  methods: {}
}
</script>
