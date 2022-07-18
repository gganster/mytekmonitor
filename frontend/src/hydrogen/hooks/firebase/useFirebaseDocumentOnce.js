import {useState, useEffect} from "react";

const useFirebaseDocumentOnce = (path, defaultValue) => {
  const [data, setData] = useState(defaultValue ?? []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    //TODO
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
  const remove = async (docId) => {
    try {
      await path.doc(docId).delete();
    } catch (e) {
      setError(e.message);
    }
  }
  return {data, error, loading, update, set, remove};
}

export default useFirebaseDocumentOnce;