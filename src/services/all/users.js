export const user = {
  setUserId,
  getUserId,
  isUser,
  removeUser,
}

function keyGen(length = 48) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let key = ''
  
  for (let i = 0; i < length; i++) {
    // ✅ Correction : pas de +1, index valide entre 0 et 61
    key += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  
  return key
}

function setUserId() {
  const userId = keyGen(48)
  localStorage.setItem('user_id', userId)
  return userId
}

function getUserId() {
  return localStorage.getItem('user_id')
}

function isUser() {
  const userId = getUserId()
  return userId !== null && userId.length === 48
}

function removeUser() {
  localStorage.removeItem('user_id')
}