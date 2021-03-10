export function getImgByTitle(title) {
  return stickers.filter((sticker) => sticker.title === title).map(sticker => sticker.img)[0]
}

const defaultPack = 'Music1';
export function getStickers(datePack) {
  const pack = datePack && datePack.includes('/') ? datePack.split('/')[1] : datePack
  const myStickers = stickers.filter(s => s.title.includes(pack.length? pack : defaultPack));
  return  myStickers.length ? myStickers : stickers.filter(s => s.title.includes(defaultPack));
}

export const stickers = [
    {img: require("/stickers/Animal1/Animal1-Bat.png"), title: 'Animal1-Bat',},
    {img: require("/stickers/Animal1/Animal1-Dog.png"), title: 'Animal1-Dog',},
    {img: require("/stickers/Animal1/Animal1-Hamster.png"), title: 'Animal1-Hamster',},
    {img: require("/stickers/Animal1/Animal1-Hedgehog.png"), title: 'Animal1-Hedgehog',},
    {img: require("/stickers/Animal1/Animal1-Panda.png"), title: 'Animal1-Panda',},
    {img: require("/stickers/Animal1/Animal1-Quail.png"), title: 'Animal1-Quail',},
    {img: require("/stickers/Animal1/Animal1-Rhino.png"), title: 'Animal1-Rhino',},

    {img: require("/stickers/Animal2/Animal2-Chameleon.png"), title: 'Animal2-Chameleon',},
    {img: require("/stickers/Animal2/Animal2-Monkey.png"), title: 'Animal2-Monkey',},
    {img: require("/stickers/Animal2/Animal2-Moose.png"), title: 'Animal2-Moose',},
    {img: require("/stickers/Animal2/Animal2-Owl.png"), title: 'Animal2-Owl',},
    {img: require("/stickers/Animal2/Animal2-Snail.png"), title: 'Animal2-Snail',},
    {img: require("/stickers/Animal2/Animal2-Turtle.png"), title: 'Animal2-Turtle',},
    {img: require("/stickers/Animal2/Animal2-Zebra.png"), title: 'Animal2-Zebra',},

    {img: require("/stickers/Music1/Music1-Accordian.png"), title: 'Music1-Accordian',},
    {img: require("/stickers/Music1/Music1-Bass.png"), title: 'Music1-Bass',},
    {img: require("/stickers/Music1/Music1-Boombox.png"), title: 'Music1-Boombox',},
    {img: require("/stickers/Music1/Music1-Drums.png"), title: 'Music1-Drums',},
    {img: require("/stickers/Music1/Music1-French-Horn.png"), title: 'Music1-French-Horn',},
    {img: require("/stickers/Music1/Music1-Piano.png"), title: 'Music1-Piano',},
    {img: require("/stickers/Music1/Music1-Sax.png"), title: 'Music1-Sax',},

    {img: require("/stickers/Music2/Music2-Keyboard.png"), title: 'Music2-Keyboard',},
    {img: require("/stickers/Music2/Music2-Record-Player.png"), title: 'Music2-Record-Player',},
    {img: require("/stickers/Music2/Music2-Tambourine.png"), title: 'Music2-Tambourine',},
    {img: require("/stickers/Music2/Music2-Tape.png"), title: 'Music2-Tape',},
    {img: require("/stickers/Music2/Music2-Trumpet.png"), title: 'Music2-Trumpet',},
    {img: require("/stickers/Music2/Music2-Violin.png"), title: 'Music2-Violin',},
    {img: require("/stickers/Music2/Music2-Xyla.png"), title: 'Music2-Xyla',},
];