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