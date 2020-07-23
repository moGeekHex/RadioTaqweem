window.addEventListener("unhandledrejection", event => {

    event.preventDefault();
console.log(JSON.stringify(event.reason)) // loginFailed
}, false);
Promise.reject('loginFailed')
