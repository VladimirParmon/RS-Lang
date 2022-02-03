import { slider } from "./slider";
import { storage, WordInfo, ReducedWordInfo, LoginResponse, UserInfo } from "./storage";

const baseURL = 'https://rs-lang-redblooded.herokuapp.com';
export const filesUrl = 'https://raw.githubusercontent.com/vladimirparmon/react-rslang-be/master'

const words = `${baseURL}/words`;
const users = `${baseURL}/users`;
const signIn = `${baseURL}/signin`;

export const getWords = async (group: number, page: number) => {
  const response = await fetch(`${words}?group=${group}&page=${page}`);
  return await response.json();
}

export const getAllWords = async (group: number, single?: string) => {
  let result: ReducedWordInfo[] = [];
  if (!single) {
    for (let i=0; i < storage.totalPages; i++) {
      const info = await getWords(group, i);
      const page = info.map((el: WordInfo) => {
        return {
          id: el.id,
          word: el.word,
          translate: el.wordTranslate,
          audio: el.audio,
          image: el.image,
          transcription: el.transcription
        }
      })
      result.push(...page);
    }
  } else {
    const info = await getWords(group,  storage.bookPage);
    const page = info.map((el: WordInfo) => {
      return {
        id: el.id,
        word: el.word,
        translate: el.wordTranslate,
        audio: el.audio,
        image: el.image,
        transcription: el.transcription
      }
    })
    result.push(...page)
  }

  return result;
}

//======================================================================//

const loginUser = async (user: UserInfo) => {
  const info = await fetch(signIn, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        response.text().then(text => {
          const { email } = user;
          if (text.slice(0,1) === 'C') {
            console.log(`No user with email ${email} was found`)
          } else {
            console.log('Incorrect password')
          }
        })
      }
    })
    .catch(error => {
      console.log('error is:', error)
    })
    return info;
};

export async function authorize (mail: string, password: string) {
  let info!: LoginResponse;
  try {
    info = await loginUser({ "email": mail, "password": password });
  } catch (error) {
    console.log(error);
  } finally {
    if (info) {
      storage.isAuthorized = true;
      storage.userId = info.userId;
      storage.token = info.token;
      slider('command');
    }
  }
}

export async function register(name: string, email: string, password: string) {
  try {
    const rawResponse = await fetch(users, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
    });
    const content = await rawResponse.json();
    console.log(content);
  } catch (error) {
    console.log(error)
  } finally {
    console.log('successfully registered');
    authorize(email, password);
  }

};

// const createUser = async (user: UserInfo) => {
//   const rawResponse = await fetch(users, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(user)
//   });
//   const content = await rawResponse.json();
//   console.log(content);
// };
//createUser({ "email": "hello@user.com", "password": "Gfhjkm_123" });

const deleteUser = async () => {
  const rawResponse = await fetch(`https://rs-lang-redblooded.herokuapp.com/users/${storage.userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${storage.token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });
};

export function handleLogin(action: string) {
  const nameInput = document.querySelector('#name') as HTMLInputElement;
  const mailInput = document.querySelector('#mail') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;

  const name = nameInput.value;
  // const mail = mailInput.value;
  // const password = passwordInput.value;
  const mail = 'hello@user.com';
  const password = 'Gfhjkm_123';

  if(action === 'login') {
    authorize(mail, password);
  } else {
    register(name, mail, password);
  }
}