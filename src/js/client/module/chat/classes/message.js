import { getTime } from '../../../../helper/dateFormat';

class Message {
  constructor(content, author, date) {
    this.content = content;
    this.author = author;
    this.date = date;
    Object.freeze(this);
  }

  formattedDate() {
    return getTime(this.date);
  }
}

export default Message;
