import { getTime } from '../../../../helper/dateFormat';

class Message {
  constructor(content, author, date, type) {
    this.content = content;
    this.author = author;
    this.date = date;
    this.type = type;
    Object.freeze(this);
  }

  formattedDate() {
    return getTime(this.date);
  }
}

export default Message;
