import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json' with { type: 'json' };
import { EXACT_MEETINGS_CJR } from '../src/context/cjrMeetingsData';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function syncCjrMeetings() {
  console.log('--- INICIANDO SINCRONIZAÇÃO DAS 8 REUNIÕES DA CJR NO FIRESTORE ---');
  for (const m of EXACT_MEETINGS_CJR) {
    console.log(`Sincronizando: ${m.id} | Data: ${m.date} | Pauta: ${m.topic}`);
    await setDoc(doc(db, 'meetings', m.id), m);
  }
  console.log('--- TODAS AS 8 REUNIÕES DA CJR FORAM SINCRONIZADAS COM SUCESSO! ---');
  process.exit(0);
}

syncCjrMeetings().catch((err) => {
  console.error('Erro na sincronização:', err);
  process.exit(1);
});
