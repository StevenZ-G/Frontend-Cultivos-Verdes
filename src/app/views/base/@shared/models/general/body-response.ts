export class BodyResponse<key_type> {
  public data: key_type | any;

  constructor() {
    this.data = null;
  }
}
