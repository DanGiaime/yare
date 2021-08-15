getLivingSpirits = () => {
    livingSpirits = [];
    for(spirit of my_spirits) {
        if(spirit.hp >= 0) {
            livingSpirits.push(spirit);
        }
    }
    return livingSpirits;
}