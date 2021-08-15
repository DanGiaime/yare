basic_attack = () => {
    for(spirit of my_spirits) {
        spirit.move(enemy_base.position);
        spirit.energize(enemy_base); 
    }
}

// have first spirit attack second spirit by moving to it and energizing it
attackSpirit = (attackingSpirit, spiritToAttack) => {
    // move to spirit
    attackingSpirit.move(spiritToAttack.position);

    // energize spirit
    attackingSpirit.energize(spiritToAttack);
}
// get living enemy spirits
getEnemySpirits = () => {
    return Object.values(spirits).filter(s => s.player_id != this_player_id).filter(s => s.hp > 0);
};

vec = u => typeof u === "number" ? [ u, u ] : u;
add = (u, v) => { v = vec(v); return [ u[0] + v[0], u[1] + v[1] ]; };
sub = (u, v) => { v = vec(v); return [ u[0] - v[0], u[1] - v[1] ]; };
mul = (u, v) => { v = vec(v); return [ u[0] * v[0], u[1] * v[1] ]; };
div = (u, v) => { v = vec(v); return [ u[0] / v[0], u[1] / v[1] ]; };
dot = (u, v) => u[0]*v[0] + u[1]*v[1];
norm = u => Math.sqrt(dot(u, u));
normalize = u => div(u, norm(u));
dist = (u, v) => norm(sub(u, v));

// Take the last "amount" spirits of currently living spirits
// and have each of my spirits attack the nearest enemy spirits to itself
// using getLivingSpirits to get my current living spirits
// using getEnemySpirits to get the enemy's livingspirits
// and using dist to get the distance between two spirits
// amount: how many spirits should attack
attack_enemy_spirits = (amount) => {
    enemy_spirits = getEnemySpirits();

    //get the last six living spirits
    my_spirits = getLivingSpirits();
    my_spirits = my_spirits.slice(my_spirits.length - amount, my_spirits.length);
    
    // my_spirits.sort((a, b) => dist(a.position, b.position));
    for(spirit of my_spirits) {
        nearest_enemy_spirit = enemy_spirits.reduce((nearest, enemy) => {
            distance = dist(spirit.position, enemy.position);
            return distance < nearest.distance ? { distance: distance, spirit: enemy } : nearest;
        }, { distance: Infinity, spirit: null }).spirit;

        // attack nearest_enemy_spirit
        attackSpirit(spirit, nearest_enemy_spirit);
    }
}

// Have all my living spirits attack their nearest enemy spirit
// using getLivingSpirits to get my current living spirits
all_spirits_attack = () => {
        enemy_spirits = getEnemySpirits();
    my_spirits = getLivingSpirits();

    for(spirit of my_spirits) {
        nearest_enemy_spirit = enemy_spirits.reduce((nearest, enemy) => {
            dist = dist(spirit.position, enemy.position);
            return dist < nearest.dist ? { dist: dist, spirit: enemy } : nearest;
        }, { dist: Infinity, spirit: null }).spirit;

        // attack nearest_enemy_spirit
        attackSpirit(spirit, nearest_enemy_spirit);
    }
}

// have the first half of my living spirits attack their nearest enemy spirit
// have the second half of my living spirits attack the enemy base by individually moving to the enemy base position and energizing it
half_attack_enemy_spirits = () => {
    enemy_spirits = getEnemySpirits();

    // get the first half of my livingspirits
    my_spirits = getLivingSpirits();
    my_spirits = my_spirits.slice(0, Math.floor(my_spirits.length/2));

    // my_spirits.sort((a, b) => dist(a.position, b.position));
    for(spirit of my_spirits) {
        nearest_enemy_spirit = enemy_spirits.reduce((nearest, enemy) => {
            distance = dist(spirit.position, enemy.position);
            return distance < nearest.distance ? { distance: distance, spirit: enemy } : nearest;
        }, { distance: Infinity, spirit: null }).spirit;

        // attack nearest_enemy_spirit
        attackSpirit(spirit, nearest_enemy_spirit);
    }

    // get the second half of my livingspirits
    my_spirits = getLivingSpirits();
    my_spirits = my_spirits.slice(Math.floor(my_spirits.length/2), my_spirits.length);

    // my_spirits.sort((a, b) => dist(a.position, b.position));
    for(spirit of my_spirits) {
        spirit.move(enemy_base.position);
        spirit.energize(enemy_base);
    }
}
charge = (x) => {
    var livingSpirits = getLivingSpirits();
    for (i = x; i < livingSpirits.length; i++) {
        charge_unit(livingSpirits[i]);
    }
};

charge_unit = (unit) => {
    if (memory[unit.id] == "charging" 
    && unit.energy < unit.energy_capacity) {
      unit.move(star_zxq.position);
      unit.energize(unit);
    }
    else if(unit.energy == 0) {
        memory[unit.id] = "charging"
        unit.shout("returning to star!");
    }
    else {
        unit.move(base.position);
        unit.energize(base);
        memory[unit.id] = "dumping";
    }
}

charge_and_store = (unit) => {
    if (memory[unit.id] == "charging"
    && unit.energy < unit.energy_capacity) {
        unit.move(star_zxq.position);
        unit.energize(unit);
    }
    else if(unit.energy == 0) {
        memory[unit.id] = "charging"
        unit.shout("charged!");
    }
    else {
        unit.shout("ready to attack");
    }
}


        // else if (livingSpirits[i].energy == livingSpirits[i].energy_capacity) {
//     console.log("full")
//     try {
//         livingSpirits[i].jump(base.position);
//         memory[livingSpirits[i].id] = "dumping";
//     }
//     catch {
//         console.log("bad")
//         livingSpirits[i].move(base.position);
//         livingSpirits[i].energize(base);
//         memory[livingSpirits[i].id] = "dumping";
//     }
// }
charge_line = (star) => {
    var remainder = 0;
    var livingSpirits = getLivingSpirits();
    for(j = 0; j + 3 < livingSpirits.length; j+=3) {
        livingSpirits[j].move(getPosMult(1, star.position));
        if (memory[livingSpirits[j].id] == "charging" 
        && livingSpirits[j].energy < livingSpirits[j].energy_capacity) {
            livingSpirits[j].energize(livingSpirits[j]);
        }
        else if(livingSpirits[j].energy == 0) {
            memory[livingSpirits[j].id] = "charging"
            livingSpirits[j].shout("returning to star!");
        }
        else {
            livingSpirits[j].energize(livingSpirits[j+1]);
            memory[livingSpirits[j].id] = "dumping";
        }

        for(i = 1; i < 3; i++) {
            livingSpirits[j+i].move(getPosMult(i+1, star.position));
            livingSpirits[j+i].energize(livingSpirits[j+i+1]);
        }
        if(livingSpirits.length > j + 2) {
            livingSpirits[j+2].energize(base);
        }
    }
    attack_enemy_spirits();
}

getPosMult = (mult = 1, starpos = star_zxq.position) => {
    // Every star is in a different direction from the base...
    // We want to make a line between base and star always in the correct direction
    let diff = mul(normalize(sub(base.position, starpos)), vec(dist(base.position, starpos)/4));
    return [starpos[0] + diff[0]*mult, starpos[1] + diff[1]*mult]
}
charge_outpost = (leftovers, star) => {
    for(j = 0; j < leftovers.length; j++) {
        leftovers[j].move(getPosMult(1, star.position));
        if (memory[leftovers[j].id] == "charging" 
        && leftovers[j].energy < leftovers[j].energy_capacity) {
            leftovers[j].energize(leftovers[j]);
        }
        else if(leftovers[j].energy == 0) {
            memory[leftovers[j].id] = "charging"
            leftovers[j].shout("returning to star!");
        }
        else {
            leftovers[j].energize(outpost_mdo.position);
            memory[leftovers[j].id] = "dumping";
        }
    }
}

getPosMult = (mult = 1, starpos = star_zxq.position) => {
    // Every star is in a different direction from the base...
    // We want to make a line between base and star always in the correct direction
    let diff = mul(normalize(sub(base.position, starpos)), vec(dist(base.position, starpos)/4));
    return [starpos[0] + diff[0]*mult, starpos[1] + diff[1]*mult]
}
defend = () => {
    if (base.sight.enemies.length > 0){
        for (i = 0; i < my_spirits.length; i++) {
    	    var invader = spirits[base.sight.enemies[0]];
            my_spirits[i].move(invader.position);
		    my_spirits[i].energize(invader);
        }
    }
}
getLivingSpirits = () => {
    livingSpirits = [];
    for(spirit of my_spirits) {
        if(spirit.hp >= 0) {
            livingSpirits.push(spirit);
        }
    }
    return livingSpirits;
}
// Determine if star_p89.active_in is less than 20, 
// if it is, return star_p89, 
// otherwise return star_zxq
getStar = () => {
    return (star_p89.active_in < 20) ? star_p89 : star_zxq;
}
// "Jobs" System
// Instead of dedicated pools create 
// charge up ULTIMAETATAEA POWER 
// Charge all circles from star_zxq in yare.io
kamehame = () => {
    livingSpirits = getLivingSpirits();
    for (i = 0; i < livingSpirits.length; i++) {
        charge_and_store(livingSpirits[i]);
    }
}


// have all living spirits move to enemy_base and energize it
//AND ATTACKKK
HAAAAA = () => {
    livingSpirits = getLivingSpirits();
    for(spirit of livingSpirits) {
        spirit.move(enemy_base.position);
        spirit.energize(enemy_base); 
    }
}
bigboi = () => {
  var starPos = [0, 0];
  for (i = 1; i < my_spirits.length; i++){ 
    my_spirits[i].move(my_spirits[0].position);
    my_spirits[i].merge(my_spirits[0]);
  }
  my_spirits[0].move(starPos);
  my_spirits[0].energize(my_spirits[0]);
}
// while star_p89.active_in > 80, charge_line(star_zxq)
// if star_p89.active_in >40 and <80, charge_outpost()
// if star_p89.active_in <40, charge_line(star_p89)
strategy = () => {
    if (star_p89.active_in > 80) {
        charge_line(star_zxq);
    }
    if (star_p89.active_in > 40 && star_p89.active_in < 80) {
        charge_outpost(getLivingSpirits(), star_p89);
    }
    if (star_p89.active_in < 40) {
        charge_line(star_p89);
    }
};
vec = u => typeof u === "number" ? [ u, u ] : u;
add = (u, v) => { v = vec(v); return [ u[0] + v[0], u[1] + v[1] ]; };
sub = (u, v) => { v = vec(v); return [ u[0] - v[0], u[1] - v[1] ]; };
mul = (u, v) => { v = vec(v); return [ u[0] * v[0], u[1] * v[1] ]; };
div = (u, v) => { v = vec(v); return [ u[0] / v[0], u[1] / v[1] ]; };
dot = (u, v) => u[0]*v[0] + u[1]*v[1];
norm = u => Math.sqrt(dot(u, u));
normalize = u => div(u, norm(u));
dist = (u, v) => norm(sub(u, v));
