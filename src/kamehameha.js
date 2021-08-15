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