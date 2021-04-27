export function getImgByTitle(title) {
  return stickers.filter((sticker) => sticker.title === title).map(sticker => sticker.img)[0]
}

export const availablePacks = ['Music1', 'Music2', 'Animal1', 'Animal2', 'Space2', 'Cat2', 'Dog2', 'Winter1'];
export function getStickers(datePack) {
  const pack = datePack && datePack.includes('/') ? datePack.split('/')[1] : datePack
  const myStickers = stickers.filter(s => s.title.includes(pack.length? pack : availablePacks[0]));
  return  myStickers.length ? myStickers : stickers.filter(s => s.title.includes(availablePacks[0]));
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

    {img: require("/stickers/Space2/Space2-Astronaut.png"), title: 'Space2-Astronaut',},
    {img: require("/stickers/Space2/Space2-Jar.png"), title: 'Space2-Jar',},
    {img: require("/stickers/Space2/Space2-Moon.png"), title: 'Space2-Moon',},
    {img: require("/stickers/Space2/Space2-Planet.png"), title: 'Space2-Planet',},
    {img: require("/stickers/Space2/Space2-Rocket.png"), title: 'Space2-Rocket',},
    {img: require("/stickers/Space2/Space2-Shootingstar.png"), title: 'Space2-Shootingstar',},
    {img: require("/stickers/Space2/Space2-UFO.png"), title: 'Space2-UFO',},

    {img: require("/stickers/Cat2/Cat2-2.png"), title: 'Cat2-2',},
    {img: require("/stickers/Cat2/Cat2-3.png"), title: 'Cat2-3',},
    {img: require("/stickers/Cat2/Cat2-4.png"), title: 'Cat2-4',},
    {img: require("/stickers/Cat2/Cat2-5.png"), title: 'Cat2-5',},
    {img: require("/stickers/Cat2/Cat2-6.png"), title: 'Cat2-6',},
    {img: require("/stickers/Cat2/Cat2-7.png"), title: 'Cat2-7',},
    {img: require("/stickers/Cat2/Cat2-9.png"), title: 'Cat2-9',},

    {img: require("/stickers/Dog2/Dog2-dog8.png"), title: 'Dog2-dog8',},
    {img: require("/stickers/Dog2/Dog2-dog9.png"), title: 'Dog2-dog9',},
    {img: require("/stickers/Dog2/Dog2-dog10.png"), title: 'Dog2-dog10',},
    {img: require("/stickers/Dog2/Dog2-dog11.png"), title: 'Dog2-dog11',},
    {img: require("/stickers/Dog2/Dog2-dog12.png"), title: 'Dog2-dog12',},
    {img: require("/stickers/Dog2/Dog2-dog13.png"), title: 'Dog2-dog13',},
    {img: require("/stickers/Dog2/Dog2-dog14.png"), title: 'Dog2-dog14',},

    {img: require("/stickers/Winter1/Winter1-Fox.png"), title: 'Winter1-Fox',},
    {img: require("/stickers/Winter1/Winter1-Hedgehog.png"), title: 'Winter1-Hedgehog',},
    {img: require("/stickers/Winter1/Winter1-Moose.png"), title: 'Winter1-Moose',},
    {img: require("/stickers/Winter1/Winter1-Penguin.png"), title: 'Winter1-Penguin',},
    {img: require("/stickers/Winter1/Winter1-Polar-Bear.png"), title: 'Winter1-Polar-Bear',},
    {img: require("/stickers/Winter1/Winter1-Raccoon.png"), title: 'Winter1-Raccoon',},
    {img: require("/stickers/Winter1/Winter1-Squirrel.png"), title: 'Winter1-Squirrel',},

    {img: require("/stickers/Teacher/Teacher-100.png"), title: 'Teacher-100',},
    {img: require("/stickers/Teacher/Teacher-awesome.png"), title: 'Teacher-awesome',},
    {img: require("/stickers/Teacher/Teacher-brilliant.png"), title: 'Teacher-brilliant',},
    {img: require("/stickers/Teacher/Teacher-cool.png"), title: 'Teacher-cool',},
    {img: require("/stickers/Teacher/Teacher-dinomite.png"), title: 'Teacher-dinomite',},
    {img: require("/stickers/Teacher/Teacher-eggcellent.png"), title: 'Teacher-eggcellent',},
    {img: require("/stickers/Teacher/Teacher-excellent.png"), title: 'Teacher-excellent',},
    {img: require("/stickers/Teacher/Teacher-excellentjob.png"), title: 'Teacher-excellentjob',},
    {img: require("/stickers/Teacher/Teacher-goodwork.png"), title: 'Teacher-goodwork',},
    {img: require("/stickers/Teacher/Teacher-great.png"), title: 'Teacher-great',},
    {img: require("/stickers/Teacher/Teacher-great2.png"), title: 'Teacher-great2',},
    {img: require("/stickers/Teacher/Teacher-greatjob.png"), title: 'Teacher-greatjob',},
    {img: require("/stickers/Teacher/Teacher-greatwork.png"), title: 'Teacher-greatwork',},
    {img: require("/stickers/Teacher/Teacher-greatwork2.png"), title: 'Teacher-greatwork2',},
    {img: require("/stickers/Teacher/Teacher-greatwork3.png"), title: 'Teacher-greatwork3',},
    {img: require("/stickers/Teacher/Teacher-greatwork4.png"), title: 'Teacher-greatwork4',},
    {img: require("/stickers/Teacher/Teacher-magical.png"), title: 'Teacher-magical',},
    {img: require("/stickers/Teacher/Teacher-nicejob.png"), title: 'Teacher-nicejob',},
    {img: require("/stickers/Teacher/Teacher-outofthisworld.png"), title: 'Teacher-outofthisworld',},
    {img: require("/stickers/Teacher/Teacher-pawsome.png"), title: 'Teacher-pawsome',},
    {img: require("/stickers/Teacher/Teacher-purrfect.png"), title: 'Teacher-purrfect',},
    {img: require("/stickers/Teacher/Teacher-sharp.png"), title: 'Teacher-sharp',},
    {img: require("/stickers/Teacher/Teacher-smartcookie.png"), title: 'Teacher-smartcookie',},
    {img: require("/stickers/Teacher/Teacher-snailedit.png"), title: 'Teacher-snailedit',},
    {img: require("/stickers/Teacher/Teacher-souperwork.png"), title: 'Teacher-souperwork',},
    {img: require("/stickers/Teacher/Teacher-super.png"), title: 'Teacher-super',},
    {img: require("/stickers/Teacher/Teacher-super2.png"), title: 'Teacher-super2',},
    {img: require("/stickers/Teacher/Teacher-superduper.png"), title: 'Teacher-superduper',},
    {img: require("/stickers/Teacher/Teacher-toadallyterrific.png"), title: 'Teacher-toadallyterrific',},
    {img: require("/stickers/Teacher/Teacher-unbeelieveable.png"), title: 'Teacher-unbeelieveable',},
    {img: require("/stickers/Teacher/Teacher-welldone.png"), title: 'Teacher-welldone',},
    {img: require("/stickers/Teacher/Teacher-wow.png"), title: 'Teacher-wow',},
    {img: require("/stickers/Teacher/Teacher-wow2.png"), title: 'Teacher-wow2',},

];