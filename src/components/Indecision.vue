<template>
  <!-- <img src="https://stickerly.pstatic.net/sticker_pack/4LRevtriqE5N13OuYyntUg/0EMLYD/3/62304888-19f6-4ecc-a740-89144a388e48.png" alt="bg"> -->
  <img v-if="img" :src="img" alt="bg">

  <div class="bg-dark"></div>

  <div class="indecision-container">

    <input 
    type="text" 
    placeholder="Hazme una pregunta" 
    v-model="question"
    >

    <p>Recuerda terminar con un signo de interrogación (?)</p>

    <div v-if="isValidQuestion">
      <h2>{{question}}</h2>
      <h1>{{ answer }}</h1>
    </div>

  </div>

</template>


<script>
export default {
  data() {
    return{
      question: null,
      answer: null,
      img: null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer() {

      try {
        this.answer = 'Pensando...'
        const {answer, image} = await fetch ('https://yesno.wtf/api').then( r => r.json() )
        
        // console.log(answer)
        this.answer = answer === 'yes' ? 'Si!' : 'No!'
        this.img = image

      } catch (error) {
        console.log( 'Indecision Componet', error )
        this.answer = 'No se pudo cargar del API'
        this.img = null

      }
    }
  },
  watch: {
    question( value, oldValue ) {

      this.isValidQuestion = false

      console.log({ value })

      if( !value.includes('?') ) return
      console.log({ value })

      this.isValidQuestion = true

      // TODO: Realizar peticion http
      this.getAnswer()
    }
  }
  }
</script>

<style>

  img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>