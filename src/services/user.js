import { auth, database } from '../firebase'; // Import your Firebase auth instance
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database'; // For Realtime Database

export const loginWithUsername = async (username, password) => {
    try {
        // Get a reference to the database
        const db = getDatabase();
        const userRef = ref(db, 'users'); // Reference to the users in the database

        // Fetch all users to find the email associated with the username
        const snapshot = await get(userRef);

        let userEmail = null;
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.username === username) {
                    userEmail = userData.email; // Get email associated with the username
                }
            });
        } else {
            return false;
        }

        if (userEmail) {
            // If user found, sign in with email and password
            await signInWithEmailAndPassword(auth, userEmail, password);
            console.log('Logged in successfully');
            return true;
        } else {
            console.error('Username not found');
            return false;
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        return false;
    }
};

export const registerUser = async (username, email, password) => {
    try {
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get a reference to the database
        const db = getDatabase();
        try {
            // Store the username with the user's UID
            await set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
            });
        } catch (error) {
            console.error('Error22222 registering user:', error.message);
        }


        database.ref(`users/${user.uid}`).once('value').then((snapshot) => {
            const data = snapshot.val();
        });

        console.log('User registered successfully');
        return true;
    } catch (error) {
        console.error('Error registering user:', error.message);
        return false;
    }
};
