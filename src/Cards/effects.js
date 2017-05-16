import { gameSettings } from '../initial-state';

const fire = {};

// I. effects of cards with type = 'discard'
fire.golden_goose = (consumer) => {
  consumer.stats.points += 2;
};

fire.demolished_treasury = (consumer) => {
  consumer.stats.points += 3;
};

fire.blue_shell = (consumer, { players }) => {
  let losing = { stats: { points: Infinity } };
  let winning = { stats: { points: -Infinity } };
  for (const key in players) {
    if (players[key].stats.points < losing.stats.points) losing = players[key];
    if (players[key].stats.points > winning.stats.points) winning = players[key];
  }
  if (winning.stats.points >= 2) {
    losing.stats.points += 2;
    winning.stats.points -= 2;
  }
};

fire.gobbler = (consumer) => {
  consumer.stats.energy += 4;
};

fire.power_up = (consumer) => {
  consumer.stats.energy += 8;
};

fire.super_saiyan = (consumer) => {
  consumer.stats.energy += 11;
};

fire.triple_bird = (consumer) => {
  consumer.stats.health -= 3;
  consumer.stats.points += 3;
};

fire.heal = (consumer) => {
  const newHealth = Math.min(consumer.stats.health + 2, gameSettings.maxHealth);
  consumer.stats.health = newHealth;
};

fire.miracle = (consumer) => {
  const newHealth = Math.min(consumer.stats.health + 5, gameSettings.maxHealth);
  consumer.stats.health = newHealth;
};

fire.kamikaze = (consumer, { players, playerPosition }) => {
  consumer.stats.health -= 3;
  for (const key in players) {
    if (players[key].uid !== consumer.uid && playerPosition.indexOf(players[key].uid) !== -1) {
      players[key].stats.health -= 2;
    }
  }
};

fire.quake = (consumer, { players, playerPosition }) => {
  for (const key in players) {
    if (players[key].uid !== consumer.uid && playerPosition.indexOf(players[key].uid) !== -1) {
      players[key].stats.health -= 1;
    }
  }
};

fire.apocalypse = (consumer, { players, playerPosition }) => {
  for (const key in players) {
    if (players[key].uid !== consumer.uid && playerPosition.indexOf(players[key].uid) !== -1) {
      players[key].stats.health -= 3;
    }
  }
};

fire.siphon = (consumer, { players, playerPosition, king }) => {
  if (consumer.uid === king.uid) {
    let dmgDealt = 0;
    for (const key in players) {
      if (players[key].uid !== consumer.uid && playerPosition.indexOf(players[key].uid) !== -1) {
        players[key].stats.health -= 1;
        dmgDealt += 1;
      }
    }
    const newHealth = Math.min(consumer.stats.health + dmgDealt, gameSettings.maxHealth);
    consumer.stats.health = newHealth;
  }
};

fire.pax_romana = (consumer = null, { players, playerPosition }) => {
  for (const key in players) {
    if (playerPosition.indexOf(players[key].uid) !== -1) {
      players[key].stats.health = Math.min(players[key].stats.health += 3, gameSettings.maxHealth);
    }
  }
};

// II. effects of cards with type = 'keep'

// a. effect on dice submission
fire.boost = (diceRoll) => {
  if (diceRoll.attack.length > 0) {
    diceRoll.attack.push('attack');
  }
};

fire.brain_growth = (diceRoll) => {
  if (diceRoll[1]) {
    diceRoll[1].push('1');
  }
};

fire.singularity = (diceRoll) => {
  if (diceRoll[3]) {
    diceRoll[3].push('3');
  }
};

// b. effect on end_turn (self-referential effects)
fire.savant = (consumer, game) => {
  game.savant = true;
};

fire.aura = (consumer) => {
  if (consumer.stats.health < 10) {
    consumer.stats.health += 1;
  }
};

fire.symbiosis_x = (consumer) => {
  if (consumer.stats.health > 0) {
    consumer.stats.health -= 1;
    consumer.stats.energy += 2;
  }
};

fire.symbiosis_z = (consumer) => {
  if (consumer.stats.energy > 1 && consumer.stats.health < gameSettings.maxHealth) {
    consumer.stats.energy -= 2;
    consumer.stats.health += 1;
  }
};

fire.symbiosis_super = (consumer) => {
  if (consumer.stats.energy > 1) {
    consumer.stats.points += 1;
    consumer.stats.energy -= 2;
  }
};

export default fire;
