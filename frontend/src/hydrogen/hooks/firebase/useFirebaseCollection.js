import {useState, useEffect} from "react";
import firebase from "firebase";

const useFirebaseCollection = (path, defaultValue) => {
  const [data, setData] = useState(defaultValue ?? []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = path.onSnapshot(snapshot => {
      let _data = [];
      snapshot.forEach(doc => {
        _data.push({uid: doc.id, ...doc.data()});
      });
      setData(_data);
      setLoading(false);
    }, (error) => setError(error.message));
    return unsubscribe;
  }, [path]);

  const update = async (docId, data) => {
    try {
      await path.doc(docId).update({
        ...data,
        updatedAt : new Date()
      });
    } catch (e) {
      setError(e.message);
    }
  }
  const updateAll = async (data) => {
    try {
      await Promise.all(data.map(async (doc) => {
        await path.doc(doc.uid).update({
          ...data,
          updatedAt: new Date(),
        })
      }))
    } catch (e) {
      setError(e.message);
    }
  }
  const set = async (docId, data) => {
    try {
      await path.doc(docId).set({
        ...data,
        updatedAt : new Date()
      });
    } catch (e) {
      setError(e.message);
    }
  }
  const setAll = async (data) => {
    try {
      await Promise.all(data.map(async (doc) => {
        await path.doc(doc.uid).set({
          ...data,
          updatedAt: new Date(),
        })
      }))
    } catch (e) {
      setError(e.message);
    }
  }
  const remove = async (docId) => {
    try {
      await path.doc(docId).delete();
    } catch (e) {
      setError(e.message);
    }
  }
  const removeAll = async () => {
    try {
      await Promise.all(data.map(async (doc) => {
        await path.doc(doc.uid).delete();
      }))
    } catch (e) {
      setError(e.message);
    }
  }
  const create = async (data) => {
    try {
      await path.add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch (e) {
      setError(e.message);
    }
  }
  return {data, error, loading, update, updateAll, set, setAll, remove, removeAll, create};
}

export default useFirebaseCollection;