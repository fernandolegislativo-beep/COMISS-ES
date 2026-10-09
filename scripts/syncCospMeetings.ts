import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };
import { EXACT_MEETINGS_COSP } from '../src/context/cospMeetingsData';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function syncCospMeetings() {
  console.log('--- INICIANDO GRAVAÇÃO E SINCRONIZAÇÃO DAS 2 REUNIÕES DA COSP NO FIRESTORE ---');
  
  // Remove any previously created test or incorrect meetings for COSP if any exist
  const meetsSnap = await getDocs(collection(db, 'meetings'));
  for (const docSnap of meetsSnap.docs) {
    const data = docSnap.data();
    if (data.committeeId === 'com-cosp') {
      console.log(`Limpando registro existente da COSP: ${docSnap.id}`);
      await deleteDoc(doc(db, 'meetings', docSnap.id));
    }
  }

  // Insert the 2 verified meetings
  for (const m of EXACT_MEETINGS_COSP) {
    console.log(`Gravando Reunião COSP: ${m.id} | Data: ${m.date} | Pauta: ${m.topic}`);
    await setDoc(doc(db, 'meetings', m.id), m);
  }

  console.log('--- AS 2 REUNIÕES DA COSP FORAM GRAVADAS COM SUCESSO NO BANCO DE DADOS! ---');
  process.exit(0);
}

syncCospMeetings().catch((err) => {
  console.error('Erro na sincronização da COSP:', err);
  process.exit(1);
});
