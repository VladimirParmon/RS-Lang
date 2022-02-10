import { router } from "../navigation/router";
import { hideLoader, showLoader } from "./loader";
import { slider } from "./slider";
import { storage, WordInfo, ReducedWordInfo, LoginResponse, RegistrationResponse, UserInfo, storageT } from "./storage";
import { adjustLoginButton } from "../master";

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
    for (let i=0; i < storageT.totalPages; i++) {
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
  const errorSpan = document.querySelector('#errorSpan');
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
            displayError('Неверный адрес эл. почты');
          } else {
            displayError('Неверный пароль');
          }
        })
      }
    })
    .catch(error => {
      displayError('Нет соединения с интернетом или сервер не отвечает');
    })
    return info;
};

export async function authorize (mail: string, password: string) {
  let info!: LoginResponse;
  showLoader();
  try {
    info = await loginUser({ "email": mail, "password": password });
  } finally {
    if (info) {
      hideLoader();
      storage.isAuthorized = true;
      storage.userId = info.userId;
      storage.token = info.token;
      storage.userName = info.name;
      const greeting = document.querySelector('#greeting');
      greeting!.innerHTML = `Привет, ${storage.userName}`;
      adjustLoginButton();
      slider('main');
    }
  }
}

export async function registerUser (user: UserInfo) {
  const errorSpan = document.querySelector('#errorSpan');
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
        displayError('Адрес эл. почты уже занят');
      } else {
        response.text().then(text => {
          if (text.search(/mail/) !== -1) {
            displayError('Адрес эл. почты должен быть валидным');
          } else if (text.search(/name/) !== -1) {
            displayError('Имя не должно быть пустым');
          } else if (text.search(/password/) !== -1) {
            displayError('Пароль не должен быть короче 8 символов');
          }
        })
      }
    })
    .catch(error => {
      displayError('Нет соединения с интернетом или сервер не отвечает');
    })
  return info;
}

export async function register (name: string, mail: string, password: string) {
  let info!: RegistrationResponse;
  showLoader();
  try {
    info = await registerUser ({ "name": name, "email": mail, "password": password });
  } finally {
    if (info) {
      hideLoader();
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

function displayError(info: string) {
  const errorSpan = document.querySelector('#errorSpan') as HTMLElement;
  errorSpan!.textContent = info;
  errorSpan.style.opacity = '1';
  setTimeout(() => {
    errorSpan.style.opacity = '0';
  }, 1000)
  hideLoader();
}

export async function getQuotes() {
  const quote = document.querySelector('#quoteSpan');
  const author = document.querySelector('#authorSpan');
  const changeQ = document.querySelector('#change-quote');
  const quotes = 'https://favqs.com/api/qotd';
  const res = await fetch(quotes);
  const data = await res.json(); 
  if(quote && author) {
    quote.textContent = data.quote.body;
    author.textContent = data.quote.author;
  }
  changeQ?.addEventListener('click', ()=> {
    getQuotes();
  }, {
    once: true
  })
}