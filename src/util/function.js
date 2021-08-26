export function getInsertPlace(e) {
  const placeInfo = e.target.getBoundingClientRect();
  const placeY = placeInfo.bottom - e.clientY;
  const targetHeight = placeInfo.bottom - placeInfo.top;
  const insertPlace = placeY > targetHeight / 2 ? "beforebegin" : "afterend";

  return insertPlace;
}
