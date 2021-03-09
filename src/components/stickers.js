export function getImgByTitle(title) {
  return stickers.filter((sticker) => sticker.title === title).map(sticker => sticker.img)[0]
}

const defaultPack = 'Music1';
export function getStickers(datePack) {
  const pack = datePack.includes('/') ? datePack.split('/')[1] : datePack
  const myStickers = stickers.filter(s => s.title.includes(pack.length? pack : defaultPack));
  return  myStickers.length ? myStickers : stickers.filter(s => s.title.includes(defaultPack));
}

export const stickers = [
    {img: require("/stickers/Animal1/Animal1-bat.png"), title: 'Animal1-bat',},
    {img: require("/stickers/Animal1/Animal1-dog.png"), title: 'Animal1-dog',},
    {img: require("/stickers/Animal1/Animal1-hamster.png"), title: 'Animal1-hamster',},
    {img: require("/stickers/Animal1/Animal1-hedgehog.png"), title: 'Animal1-hedgehog',},
    {img: require("/stickers/Animal1/Animal1-panda.png"), title: 'Animal1-panda',},
    {img: require("/stickers/Animal1/Animal1-quail.png"), title: 'Animal1-quail',},
    {img: require("/stickers/Animal1/Animal1-rhino.png"), title: 'Animal1-rhino',},

    {img: require("/stickers/Animal2/Animal2-chameleon.png"), title: 'Animal2-chameleon',},
    {img: require("/stickers/Animal2/Animal2-monkey.png"), title: 'Animal2-monkey',},
    {img: require("/stickers/Animal2/Animal2-moose.png"), title: 'Animal2-moose',},
    {img: require("/stickers/Animal2/Animal2-owl.png"), title: 'Animal2-owl',},
    {img: require("/stickers/Animal2/Animal2-snail.png"), title: 'Animal2-snail',},
    {img: require("/stickers/Animal2/Animal2-turtle.png"), title: 'Animal2-turtle',},
    {img: require("/stickers/Animal2/Animal2-zebra.png"), title: 'Animal2-zebra',},

    {img: require("/stickers/Music1/Music1-accordian.png"), title: 'Music1-accordian',},
    {img: require("/stickers/Music1/Music1-bass.png"), title: 'Music1-bass',},
    {img: require("/stickers/Music1/Music1-boombox.png"), title: 'Music1-boombox',},
    {img: require("/stickers/Music1/Music1-drums.png"), title: 'Music1-drums',},
    {img: require("/stickers/Music1/Music1-french-horn.png"), title: 'Music1-french-horn',},
    {img: require("/stickers/Music1/Music1-piano.png"), title: 'Music1-piano',},
    {img: require("/stickers/Music1/Music1-sax.png"), title: 'Music1-sax',},
];