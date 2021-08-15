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