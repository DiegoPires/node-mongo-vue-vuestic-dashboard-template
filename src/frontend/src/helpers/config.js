export default {
  get apiUrl () {
    return process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:8081'
  }
}
