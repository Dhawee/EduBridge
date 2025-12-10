const q = query(
  collection(db, "examResults"),
  where("studentId", "==", auth.currentUser.uid)
);
