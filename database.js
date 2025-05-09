rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    //––– passwords collection: managed by you, no client read/write
    match /passwords/{pwd} {
      allow read, write: if false;
    }
    //––– votes collection: allow anonymous create only if `password` field matches an existing password doc
    match /votes/{voteId} {
      allow create: if request.resource.data.password is string
        && exists(/databases/$(database)/documents/passwords/$(request.resource.data.password));
      allow read, update, delete: if false;
    }
  }
}
