import shuffle from 'lodash/shuffle';

// dummyCards for testing
const cards = [
  // bellow are cards with type='discard'
  // note: these cards do not need a 'window' key
  // since their effect is immediately implemented after being bought
  {
    title: 'Golden Goose',
    cost: 4,
    type: 'Discard',
    ability: 'Gain 2 pts',
    effect: 'golden_goose',
  },
  {
    title: 'Demolished Treasury',
    cost: 6,
    type: 'Discard',
    ability: 'Gain 3 pts',
    effect: 'demolished_treasury',
  },
  {
    title: 'Quake',
    cost: 3,
    type: 'Discard',
    ability: 'deal 1 dmg to all other players',
    effect: 'quake',
  },
  {
    title: 'Apocalypse',
    cost: 7,
    type: 'Discard',
    ability: 'deal 3 dmg to all other players',
    effect: 'apocalypse',
  },
  {
    title: 'Gobbler',
    cost: 3,
    type: 'Discard',
    ability: '+4 energy',
    effect: 'gobbler',
  },
  {
    title: 'PowerUp!',
    cost: 6,
    type: 'Discard',
    ability: '+8 energy',
    effect: 'power_up',
  },
  {
    title: 'Super Saiyan!',
    cost: 8,
    type: 'Discard',
    ability: '+12 energy',
    effect: 'super_saiyan',
  },
  {
    title: 'Heal',
    cost: 2,
    type: 'Discard',
    ability: 'Gain 2 health',
    effect: 'heal',
  },
  {
    title: 'Miracle',
    cost: 7,
    type: 'Discard',
    ability: 'Gain 5 health',
    effect: 'miracle',
  },
  {
    title: 'Savant',
    cost: 8,
    type: 'Discard',
    ability: 'Take another turn after this one',
    effect: 'savant',
  },
  // bellow are cards with type='keep'
  {
    title: 'Boost!',
    cost: 3,
    type: 'Keep',
    ability: 'Deal +1 when you attack',
    effect: 'boost',
  },
  {
    title: 'Shield',
    cost: 4,
    type: 'Keep',
    ability: 'All dmg to you -1',
    effect: 'shield',
  },
  {
    title: 'Brain Growth',
    cost: 2,
    type: 'Keep',
    ability: 'Add a 1 to your dice on submission',
    effect: 'brain_growth',
  },
  {
    title: 'Singularity',
    cost: 7,
    type: 'Keep',
    ability: 'Add a 3 to your dice on submission',
    effect: 'brain_growth',
  },
  // effect on end turn
  {
    title: 'Symbiosis X',
    cost: 3,
    type: 'Keep',
    ability: 'End turn: -1 health, +1 energy',
    effect: 'symbiosis_x',
    window: 'end_turn',
  },
  {
    title: 'Symbiosis Z',
    cost: 3,
    type: 'Keep',
    ability: 'End turn: -1 energy, +1 health',
    effect: 'symbiosis_z',
    window: 'end_turn',
  },
  {
    title: 'Symbiosis Super',
    cost: 3,
    type: 'Keep',
    ability: 'End turn: -2 health, +1 point',
    effect: 'symbiosis_super',
    window: 'end_turn',
  },
];
// dummyCards for testing

const market = {
  deck: shuffle(cards),
  face_up: [],
  discarded: [],
};

export default market;
