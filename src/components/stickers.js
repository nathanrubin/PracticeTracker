export function getImgByTitle(title) {
  return stickers.filter((sticker) => sticker.title === title).map(sticker => sticker.img)[0]
}

export const stickers = [
    {
      img: require("/stickers/Animal1/Animal1-bat.png"),
      title: 'Animal1-bat',
    },
    {
      img: require("/stickers/Animal1/Animal1-dog.png"),
      title: 'Animal1-dog',
    },
    {
      img: require("/stickers/Animal2/Animal2-chameleon.png"),
      title: 'Animal2-chameleon',
    },
    {
      img: require("/stickers/Animal2/Animal2-monkey.png"),
      title: 'Animal2-monkey',
    }
];