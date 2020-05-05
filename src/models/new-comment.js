export default class NewCommentModel {
  static toRAW(data) {
    return {
      "comment": data.text,
      "date": data.date,
      "emotion": data.emoji
    };
  }
}
