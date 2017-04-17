import { gameSettings } from '../initial-state';

const fire = {};

// effects of cards with type = 'discard'
fire.golden_goose = (consumer) => {
  consumer.stats.points += 2;
};

fire.demolished_treasury = (consumer) => {
  consumer.stats.points += 3;
};

fire.gobbler = (consumer) => {
  consumer.stats.energy += 4;
};

fire.power_up = (consumer) => {
  consumer.stats.energy += 8;
};

fire.super_saiyan = (consumer) => {
  consumer.stats.energy += 12;
};

fire.triple_bird = (consumer) => {
  consumer.stats.health -= 3;
  consumer.stats.points += 3;
};
// heal cards need to max health at 10
fire.heal = (consumer) => {
  const newHealth = Math.min(consumer.stats.health + 2, gameSettings.maxHealth);
  consumer.stats.health = newHealth;
};

fire.miracle = (consumer) => {
  const newHealth = Math.min(consumer.stats.health + 5, gameSettings.maxHealth);
  consumer.stats.health = newHealth;
};

fire.quake = (consumer, room) => {
  const players = room.players;
  for (const key in players) {
    if (players[key].uid !== consumer.uid) {
      players[key].stats.health -= 1;
    }
  }
};

fire.apocalypse = (consumer, room) => {
  const players = room.players;
  for (const key in players) {
    if (players[key].uid !== consumer.uid) {
      players[key].stats.health -= 3;
    }
  }
};

fire.savant = () => {
  console.log('savant fired but not implemented!');
};

fire.siphon = (consumer, room) => {
  if (consumer.uid === room.king.uid) {
    const players = room.players;
    let dmgDealt = 0;
    for (const key in players) {
      if (players[key].uid !== consumer.uid) {
        players[key].stats.health -= 1;
        dmgDealt += 1;
      }
    }
    const newHealth = Math.min(consumer.stats.health + dmgDealt, gameSettings.maxHealth);
    consumer.stats.health = newHealth;
  }
};
fire.pax_romana = (consumer = null, room) => {
  const players = room.players;
  for (const key in players) {
    players[key].stats.health = Math.min(players[key].stats.health += 3, gameSettings.maxHealth);
  }
};

// effects of cards with type = 'keep'

// effect on dice submission
fire.boost = () => {
  console.log('roar fired but not implemented!');
};
fire.shield = () => {
  console.log('savant fired but not implemented!');
};
fire.swift = () => {
  console.log('swift fired but not implemented!');
};
fire.brain_growth = () => {
  console.log('brain_growth fired but not implemented!');
};
fire.singularity = () => {
  console.log('singularity fired but not implemented!');
};

// effect on end_turn (self-referential effects)
fire.symbiosis_x = (consumer) => {
  consumer.stats.health -= 1;
  consumer.stats.energy += 1;
};

fire.symbiosis_z = (consumer) => {
  if (consumer.stats.energy > 0 && consumer.stats.health < gameSettings.maxHealth) {
    consumer.stats.energy -= 1;
    consumer.stats.health += 1;
  }
};

fire.symbiosis_super = (consumer) => {
  consumer.stats.points += 1;
  consumer.stats.health -= 2;
};

export default fire;
