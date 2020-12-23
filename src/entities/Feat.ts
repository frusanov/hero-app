export default class Feat {
  date: number;
  text: string;

  constructor({ date = Date.now(), text }) {
    this.date = date;
    this.text = text;
  }
}
