import firebase from '../util/firebase';

const db = firebase.ref('/dojava');
let dojava = [];

class FirebaseService {
  
  addDojava = (dojava) => {
    db.push(dojava);
  };

  getAll() {
    return db;
  }

  get(key) {
    return db.child(key);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }
}

export default new FirebaseService();