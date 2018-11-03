<<<<<<< HEAD
import { getTime } from '../../../../helper/dateFormat';
=======
import { getTime } from '../../../helper/dateFormat';
>>>>>>> e7c6a4c47281a2ff81148d1af4a289d3aef8ab9e

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
