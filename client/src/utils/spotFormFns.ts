import { SurfSpot } from "../types/types";

export const doesNameExist = (name: string, list: string[]) => {
  const lowerCaseNoSpaceText = name.toLowerCase().replace(/\s+/g, "");
  const existingString = list.find(
    (nameOption: string) =>
      nameOption.toLowerCase().replace(/\s+/g, "") === lowerCaseNoSpaceText
  );
  if (existingString) {
    return true;
  }
  return false;
};

export const checkMatchingText = (originalString: string, list: string[]) => {
  const lowerCaseNoSpaceText = originalString.toLowerCase().replace(/\s+/g, "");
  const existingString = list.find(
    (cityOption: string) =>
      cityOption.toLowerCase().replace(/\s+/g, "") === lowerCaseNoSpaceText
  );
  if (existingString) {
    return existingString;
  }
  return originalString;
};

export const createCityAndSpotNamesObj = (surfSpots: SurfSpot[]) => {
  const returnObj: { [key: string]: string[] } = {};
  surfSpots.forEach((spot) => {
    if (returnObj[spot.city]) {
      returnObj[spot.city].push(spot.spotName);
    } else {
      returnObj[spot.city] = [spot.spotName];
    }
  });
  return returnObj;
};
