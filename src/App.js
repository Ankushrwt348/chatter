import { app } from './firebase';
import Message from './Message';
import { useEffect, useRef, useState } from 'react';

import {
  Box,
  Container,
  VStack,
  Button,
  Input,
  HStack,
  
} from '@chakra-ui/react';

import {
  signOut,
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import    { getFirestore
  , addDoc
  , collection
  , serverTimestamp
  , onSnapshot
  ,query,orderBy
 } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const loginHandler = () => {
  const provider    = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logOut = () => signOut(auth);

function App() {
  
   const divForScroll = useRef(null);
  const [user, setUser] = useState(null);   
  const [message, setMessage] = useState('');
  const [Messages, setMessages] = useState([]);
 const q = query(collection(db, 'Messages'),orderBy("timestamp","asc"))
  const submitHandler = async (e) => {

    e.preventDefault();
    if (message.trim() === '') {
      alert('Please enter a message.');
      return;
    }

    try {
      setMessage("");
      await addDoc(collection(db, 'Messages'), {        
        text: message,
        uid: user.uid,
        uri: user.photoURL, 
        timestamp: serverTimestamp(),
      });

   divForScroll.current.scrollIntoView({behaviour:"smooth"})
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

   const unsubscribeForMessage = onSnapshot(q,(snap)=>{
     setMessages(snap.docs.map((item)=>{
    const id=item.id;
    return {id ,...item.data()};
   }))     
    })
    return () => {unsubscribe(); 
      unsubscribeForMessage();
    };
  }, []);

  return (
    <Box bg={'red.100'}>
      <Container h={'100vh'} bg={'white'}  >
        {user ? (
          <VStack h={'full'} paddingY={'4'}>
            <Button colorScheme='red' w={'full'} onClick={logOut}>
              Logout
            </Button>

            <VStack h={'full'} w={'full'} overflowY={'auto'} 
           css={{"&::webkit-scrollbar":{display:"none"}}}
           >
              {Messages.map((item) => (
                <Message
                  key={item.id}
                  uri={item.uri}
                  text={item.text}
                  user={item.uid === user.uid ? 'me' : 'other'}
                />
              ))}
             < div ref={divForScroll}></div>
            </VStack>

            <form onSubmit={submitHandler} style={{ width: '100%' }}>
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Enter a message...'   
                />
                <Button type='submit' colorScheme='purple'>   
                  submit
                </Button>
              </HStack>
            </form>
          </VStack>
        ) : (
          <VStack h={'100vh'} justifyContent={'center'}>
            <Button colorScheme='blue' onClick={loginHandler}>
              Sign up using google
            </Button>
          </VStack>
        )}
      </Container>
    </Box>
  );
}

export default App;
