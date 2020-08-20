class Api {
  path = "";
  constructor({path}) {
    this.path = path;
  }
  async run(callback) {
    const res = await fetch(this.path);
    const json = await res.json();
    return callback(json);
  }
}
export default Api;
