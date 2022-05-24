// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

const auth = admin.auth();

exports.agregarAdministrador = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "solo admin puede modificar" };
  }

  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, { admin: true });
    })
    .then(() => {
      return { message: "se creó con éxito el administrador" };
    })
    .catch((error) => error);
});

exports.eliminarAdministrador = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "solo admin puede modificar" };
  }

  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, { admin: false });
    })
    .then(() => {
      return { message: "el usuario ya no es administrador" };
    })
    .catch((error) => {
      return { error: error };
    });
});

exports.crearAutor = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "solo admin puede modificar" };
  }

  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, { autor: true });
    })
    .then(() => {
      return { message: "el usuario ya es autor" };
    })
    .catch((error) => {
      return { error: error };
    });
});

exports.eliminarAutor = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { error: "solo admin puede modificar" };
  }

  return auth
    .getUserByEmail(data.email)
    .then((user) => {
      return auth.setCustomUserClaims(user.uid, { autor: false });
    })
    .then(() => {
      return { message: "el usuario ya no es autor" };
    })
    .catch((error) => {
      return { error: error };
    });
});
