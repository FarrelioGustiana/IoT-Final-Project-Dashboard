import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';

const useFirestoreData = (path: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => { 
    const unsub = onSnapshot(collection(db, path as string), (querySnapshot: QuerySnapshot<DocumentData>) => {
      const docsData = querySnapshot.docs.map((doc: DocumentData) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(docsData);
      setLoading(false);
    }, (error: Error) => {
      console.log(error);
      setError(error);
      setLoading(false);
    });

    return () => unsub();
  }, [path]);

  return { data, loading, error };
};

export default useFirestoreData;