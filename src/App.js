import "./App.css";
import { useState } from "react";
import { db, auth } from "./util/firebaseSetup";
import {
  signOut,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import LoginForm from "./component/LoginForm";
import DocumentForm from "./component/DocumentForm";
function App() {
  const [userAuth, setUserAuth] = useState(null);
  const handleCreate = async (event, formState) => {
    event.preventDefault();
    try {
      await setDoc(doc(db, "galactic_database", formState["Document Name"]), {
        name: formState["Name"],
        type: formState["Type"],
        quote: formState["Quote"],
        alter_ego: formState["Alter Ego"],
        user_id: userAuth.uid,
      });
      window.alert("Document Created");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleRead = async (event, formState, setFormState) => {
    event.preventDefault();
    const docRef = doc(db, "galactic_database", formState["Document Name"]);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        window.alert("Document Fetched");
        setFormState((prevState) => ({
          ...prevState,
          Name: docSnap.data().name,
          Type: docSnap.data().type,
          Quote: docSnap.data().quote,
          "Alter Ego": docSnap.data().alter_ego,
        }));
      } else {
        window.alert("Document not found");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleUpdate = async (event, formState) => {
    event.preventDefault();
    const docRef = doc(db, "galactic_database", formState["Document Name"]);
    try {
      await setDoc(docRef, {
        name: formState["Name"],
        type: formState["Type"],
        quote: formState["Quote"],
        alter_ego: formState["Alter Ego"],
        user_id: userAuth.uid,
      });
      window.alert("Document Updated");
    } catch (error) {
      window.alert(error.message);
    }
  };
  const handleDelete = async (event, formState) => {
    event.preventDefault();
    const docRef = doc(db, "galactic_database", formState["Document Name"]);
    try {
      await deleteDoc(docRef);
      window.alert("Document Deleted");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleLogin = async (event, formState) => {
    event.preventDefault();
    const { email, password } = formState;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setUserAuth(user);
            window.alert("Login Success");
          })
          .catch((error) => {
            window.alert(error.message);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };
  const handleSignup = async (event, formState) => {
    event.preventDefault();
    const { email, password } = formState;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setUserAuth(user);
            window.alert("Signup Success");
          })
          .catch((error) => {
            window.alert(error.message);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };
  const handleLogout = (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        setUserAuth(null);
        window.alert("Logout Success");
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };
  const documentProps = [handleCreate, handleRead, handleUpdate, handleDelete];
  const loginProps = [handleLogin, handleSignup, handleLogout];
  return (
    <div className="App">
      <div className="form_content">
        <LoginForm authOps={loginProps} />
      </div>
      <div className="form_content">
        <DocumentForm crudOps={documentProps} />
      </div>
    </div>
  );
}

export default App;
