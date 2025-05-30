// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Save a prediction
async function savePrediction(homeTeam, awayTeam) {
  await db.collection("predictions").add({
    homeTeam,
    awayTeam,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Get real-time updates
db.collection("predictions")
  .orderBy("timestamp", "desc")
  .limit(1)
  .onSnapshot((snapshot) => {
    const prediction = snapshot.docs[0]?.data();
    document.getElementById("prediction-result").innerHTML = `
      ${prediction?.homeTeam} vs ${prediction?.awayTeam}
    `;
  });
