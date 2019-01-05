<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Counter</div>
    </v-ons-toolbar>

    <main class="main-content">
      <div class="counter-area">
        <p>{{ ngWordCount }}</p>
      </div>
      <div class="recognized-result-area">
        <h2 class="header">Last recognized</h2>
        <p class="text">
          <template v-if="sentences.length !== 0">
           {{ sentences[sentences.length-1] }}
          </template>
        </p>
      </div>
      <div class="button-area">
        <a v-if="!recognitionIsActive" class="button" @click="onRecognitionStart">
          <v-ons-icon class="button-icon" icon="fa-microphone" />
          <span class="button-text">Start</span>
        </a>
        <a v-else class="button" @click="onRecognitionStop">
          <v-ons-icon class="button-icon" icon="fa-stop" />
          <span class="button-text">Stop</span>
        </a>
      </div>
    </main>
  </v-ons-page>
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
      recognitionIsActive: false,
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
      this.recognitionIsActive = true
      this.recognition.start()
    },
    onRecognitionStop () {
      this.recognitionIsActive = false
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
      return new Promise((resolve, reject) => {
        if (!this.tokenizer) resolve()
        this.ngWordCount = this.sentences
          .map(sentence => this.tokenizer.tokenize(sentence))
          .map(sentence => sentence
            .map(token => token.basic_form)
            .filter(sentence => ngWordList.indexOf(sentence) !== -1)
            .length
          )
          .reduce((a, b) => a + b)
        resolve()
      })
    }
  }
}
</script>

<style scoped>
.main-content {
  width: 100%;
  height: 100%;
}

.counter-area {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30%;
  font-size: 5rem;
  text-align: center;
}

.recognized-result-area {
  position: absolute;
  top: 30%;
  left: 5%;
  width: 90%;
  height: 50%;
  text-align: center;
}

.recognized-result-area .header {
  font-size: 1.0rem;
  margin-bottom: 0px;
}

.recognized-result-area .text {
  margin-top: 0px;
  padding: 5% 5%;
  text-align: left;
  width: 90%;
  height: 70%;
  background-color: #cccccc;
  border-radius: 10%;
}

.button-area {
  position: absolute;
  top: 80%;
  left: 0px;
  width: 100%;
  height: 20%;
  text-align: center;
}

.button-area .button {
  display: inline-block;
  padding: 10px 20px;
	border-radius: 25px;
  text-decoration: none;
  color: #FFF;
  background-image: -webkit-linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%);
  background-image: linear-gradient(45deg, #FFC107 0%, #ff8b5f 100%);
  transition: .4s;
  width: 70%;
  text-align: center;
}

.button-area .button .button-icon {
  font-size: 1.2rem;
  margin-right: 4px;
  vertical-align: middle;
}

.button-area .button .button-text {
  font-size: 1.5rem;
  vertical-align: middle;
}

.button-area .button:hover {
  background-image: -webkit-linear-gradient(45deg, #FFC107 0%, #f76a35 100%);
  background-image: linear-gradient(45deg, #FFC107 0%, #f76a35 100%);
}
</style>
