export class Story {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.image = data.image // 👈 API field name
  }

  get coverUrl() {
    return this.image
  }
}