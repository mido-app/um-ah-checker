<template>
  <div>
    <button @click="onRecognitionStart">start</button>
    <button @click="onRecognitionStop">stop</button>
    <h2>Result</h2>
    <ul>
      <li v-for="(sentense, index) in sentenses" :key="index">{{ sentense }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recognition: null,
      sentenses: []
    }
  },
  created () {
    this.recognition = new webkitSpeechRecognition()
    this.recognition.lang = 'ja'
    this.recognition.onresult = this.onRecognitionFinished
  },
  methods: {
   onRecognitionStart () {
     this.recognition.start()
   },
   onRecognitionStop () {
     this.recognition.stop()
   },
   onRecognitionFinished (e) {
    for (let i=0; i<e.results.length; i++) {
      let result = e.results[i]
      for (let j=0; j<result.length; j++) {
        let alternative = result[j]
        console.log(alternative)
        this.sentenses.push(alternative.transcript)
      }
    }
   }
  }
}
</script>
