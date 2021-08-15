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