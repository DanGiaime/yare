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