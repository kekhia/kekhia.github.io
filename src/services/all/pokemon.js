export const pokemon = {
  getImage,
}

function getImage() {
  let random = Math.floor(Math.random() * Math.floor(100))
  if (random == 0) random += 1
  if (random < 10) {
    random = '00' + random
  }
  if (random > 9) {
    random = '0' + random
  }

  return `${import.meta.env.VITE_POKEMON}${random}.png`
}
