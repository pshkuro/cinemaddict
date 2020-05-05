export default class CommentModel {
  constructor(data) {
    const {
      id,
      author,
      comment: text,
      date,
      emotion: emoji
    } = data;

    return {
      id,
      author,
      text,
      date,
      emoji
    };
  }

  static toRAW(data) {
    return {
      "id": data.id,
      "comment": data.text,
      "author": data.author,
      "date": data.date,
      "emotion": data.emoji,
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
