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