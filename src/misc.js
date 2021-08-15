bigboi = () => {
  var starPos = [0, 0];
  for (i = 1; i < my_spirits.length; i++){ 
    my_spirits[i].move(my_spirits[0].position);
    my_spirits[i].merge(my_spirits[0]);
  }
  my_spirits[0].move(starPos);
  my_spirits[0].energize(my_spirits[0]);
}