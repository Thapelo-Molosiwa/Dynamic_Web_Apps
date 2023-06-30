//@ts-check

const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

// Iterate over each element in the provinces array and log the name
names.forEach((name) => {
  console.log(name);
});

// Iterate over each element in the names array and log the name along with the matching province
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Use the map method to loop over all province names and convert them to uppercase
const uppercaseProvinces = provinces.map((province) => {
  return province.toUpperCase();
});

// Log the new array with uppercase province names to the console
console.log(uppercaseProvinces);

// Use the map method to create a new array with the number of characters in each name
const nameLengths = names.map((name) => {
  // Get the length of the current name
  return name.length;
});

// Log the new array with name lengths to the console
console.log(nameLengths);

// Use the sort method to sort the provinces array alphabetically
provinces.sort();

// Log the sorted array to the console
console.log(provinces);

// Use the filter method to remove provinces that contain the word "Cape"
const filteredProvinces = provinces.filter((province) => {
  // Return true for provinces that do not contain the word "Cape"
  return !province.includes("Cape");
});

// Get the count of remaining provinces
const remainingProvincesCount = filteredProvinces.length;

// Log the count of remaining provinces to the console
console.log(remainingProvincesCount);

// Use map and some to create a boolean array indicating whether a name contains an 'S' character
const containsS = names.map((name) => {
  // Use the some method to check if the name contains an 'S' character
  return name.split("").some((char) => char.toLowerCase() === "s");
});

// Log the boolean array to the console
console.log(containsS);
