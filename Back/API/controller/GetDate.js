const dateNow = () => {
  var today = new Date();
  datee =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() + 1);
  console.log("dateeee " + datee);
  return datee;
};

const HeureNow = () => {
  var today = new Date();

  heure =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log("heure " + heure);
  return heure;
};
