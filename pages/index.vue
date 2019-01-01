<template>
  <div>
    <div>
      <h2>Text Input</h2>
      <input type="text" v-model="textInput" />
      <button @click="onClick">add</button>
    </div> 
    <div>
      <h2>Speech Recognition</h2>
      <button @click="onRecognitionStart">start</button>
      <button @click="onRecognitionStop">stop</button>
    </div>
    <div>
      <h2>Speech Recognition Result</h2>
      <ul>
        <li v-for="(sentence, index) in sentences" :key="index">{{ sentence }}</li>
      </ul>
    </div>
    <div>
      <h2>NG Word Count</h2>
      <p>{{ ngWordCount }} times</p>
    </div>
  </div>
</template>

<script>
import * as kuromoji from 'kuromoji'

const ngWordList = [
  'あー',
  'うー',
  'えー',
  'えーと',
  'おー',
]

export default {
  data () {
    return {
      recognition: null,
      tokenizer: null,
      textInput: '',
      sentences: [],
      ngWordCount: 0
    }
  },
  created () {
    // initialize speech recognition
    this.recognition = new webkitSpeechRecognition()
    this.recognition.lang = 'ja'
    this.recognition.continuous = true
    this.recognition.onresult = this.onRecognitionFinished

    // initialize kuromoji
    kuromoji.builder({
      dicPath: 'dict'
    }).build((err, tokenizer) => {
      if (err) {
        console.error(err)
        return
      }
      this.tokenizer = tokenizer
    })
  },
  methods: {
    onRecognitionStart () {
      this.recognition.start()
    },
    onRecognitionStop () {
      this.recognition.stop()
    },
    onRecognitionFinished (e) {
      let sentences = []
      for (let i=0; i<e.results.length; i++) {
        let result = e.results[i]
        for (let j=0; j<result.length; j++) {
          let alternative = result[j]
          sentences.push(alternative.transcript)
        }
      }
      this.sentences = sentences
      this.countNgWord()
    },
    onClick () {
      this.sentences.push(this.textInput)
      this.textInput = ''
      this.countNgWord()
    },
    countNgWord () {
      if (!this.tokenizer) return []
      this.ngWordCount = this.sentences
        .map(sentence => this.tokenizer.tokenize(sentence))
        .map(sentence => sentence
          .map(token => token.basic_form)
          .filter(sentence => ngWordList.indexOf(sentence) !== -1)
          .length
        )
        .reduce((a, b) => a + b)
    }
  }
}
</script>
