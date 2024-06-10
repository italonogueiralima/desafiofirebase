const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const admin = require("firebase-admin");
admin.initializeApp();

exports.addPessoa = onRequest(async (req, res) => {
  const name = req.body.name;

  if(!name){
    return res.status(404).send({
      error: "Campo name deve ser informado"
    });
  }

  const writeResult = await admin.firestore()
      .collection("pessoas")
      .add({name});
  res.json({result: `Pessoa with ID: ${writeResult.id} added.`});
});

exports.updateIncrementId = onDocumentCreated("pessoas/{docId}", async (event) => {
  const pessoas = await admin.firestore()
    .collection("pessoas").orderBy('increment_id', 'desc').limit(1).get();
  let increment_id = 0;
  pessoas.forEach(pessoa => {
    increment_id = pessoa.data().increment_id
  });

  increment_id = increment_id + 1

  return event.data.ref.set({increment_id}, {merge: true});
});
