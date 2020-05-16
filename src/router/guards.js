import store from '../store/index'

function authenticationGuard(to, from, next) {
  if (store.state.auth.authId) {
    next()
  } else {
    next('/')
  }
}

export { authenticationGuard }
