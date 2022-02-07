// let storage = {
//   a: 1,
//   b: 2,
//   c: 3
// }

// let storageProxy = new Proxy(storage, {
//   set: function () {
//     localStorage.setItem('myStorage', JSON.stringify(storage))
//     return true;
//   }
// })

// // storageProxy.d = 4;
// // storageProxy.a = 1;
// // console.log(storage, storage.d);

// const root = document.querySelector('body')
// const button = document.createElement('button')
// button.textContent = 'FFFFFFFFFFFF'
// button.style.zIndex = 1000;
// button.style.position = 'absolute';
// button.addEventListener('click', () => {
//   storage.g = 25;
//   storage.a = 42;
//   localStorage.setItem('myStorage', JSON.stringify(storage))
//   console.log(storage)
// })

// root.append(button)