defend = () => {
    if (base.sight.enemies.length > 0){
        for (i = 0; i < my_spirits.length; i++) {
    	    var invader = spirits[base.sight.enemies[0]];
            my_spirits[i].move(invader.position);
		    my_spirits[i].energize(invader);
        }
    }
}