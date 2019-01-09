# What is this repository?
This is a prototype of application which check how many time you speak 'Um', 'Ah', and 'You Know' in your presentation.
This prototype works only wiith Google Chrome.

# Installation
Clone this repository and execute commands shown below.

```sh
npm install
npm run dev   # launch development server
npm run build # production build
```

# Setting
This prototype is optimzed for Japanese and count the word below.

- あー
- うー
- えー
- えーと
- おー

To customize for other word lists, you can fix them in `components/pages/counter-page.vue`.
Set the words you want to recognize in ngWordList.

```js
// example
const ngWordList = [
  'あー',
  'うー',
  'えー',
  'えーと',
  'おー',
]
```
