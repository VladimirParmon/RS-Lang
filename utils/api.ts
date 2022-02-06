import { router } from "../navigation/router";
import { slider } from "./slider";
import { storage, WordInfo, ReducedWordInfo, LoginResponse, RegistrationResponse, UserInfo } from "./storage";

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
          if (text.slice(0,1) === 'C') {
            console.log(`Неверное имя пользователя`);
          } else {
            console.log('Неверный пароль');
          }
        })
      }
    })
    .catch(error => {
      console.log('Нет соединения с интернетом или сервер не отвечает');
    })
    return info;
};

export async function authorize (mail: string, password: string) {
  let info!: LoginResponse;
  try {
    info = await loginUser({ "email": mail, "password": password });
  } finally {
    if (info) {
      storage.isAuthorized = true;
      storage.userId = info.userId;
      storage.token = info.token;
      storage.userName = info.name;
      const greeting = document.querySelector('#greeting');
      greeting!.innerHTML = `Привет, ${storage.userName}`;
      const logoutButton = document.querySelector('#auth') as HTMLElement;
      logoutButton!.style.backgroundImage =  'url(../assets/svg/logout.svg)';
      logoutButton.addEventListener('click', () => {
        storage.isAuthorized = false;
        logoutButton.style.backgroundImage = 'url(../assets/svg/person.svg)';
        router('home');
      }, {
        once: true
      })
      slider('command');
    }
  }
}

export async function registerUser (user: UserInfo) {
  const info = await fetch(users, {
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
      } else if (response.status === 417) {
        console.log('Пользователь с таким адресом эл. почты уже существует');
      } else {
        response.text().then(text => {
          if (text.search(/mail/) !== -1) {
            console.log('mail is huinya')
          }
          if (text.search(/name/) !== -1) {
            console.log('name is huinya')
          }
          if (text.search(/password/) !== -1) {
            console.log('password is huinya')
          }
        })
      }
    })
    .catch(error => {
      console.log('Нет соединения с интернетом или сервер не отвечает');
    })
  return info;
}

export async function register (name: string, mail: string, password: string) {
  let info!: RegistrationResponse;
  try {
    info = await registerUser ({ "name": name, "email": mail, "password": password });
  } finally {
    if (info) {
      authorize(mail, password);
    }
  }
}

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
  const mail = mailInput.value;
  const password = passwordInput.value;

  if(action === 'login') {
    authorize(mail, password);
  } else {
    register(name, mail, password);
  }
}