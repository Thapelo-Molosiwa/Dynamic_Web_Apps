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

const individuals = [
  { name: 'Ashwin', province: 'Western Cape' },
  { name: 'Sibongile', province: 'Gauteng' },
  { name: 'Jan-Hendrik', province: 'Northern Cape' },
  { name: 'Sifso', province: 'Eastern Cape' },
  { name: 'Shailen', province: 'KwaZulu-Natal' },
  { name: 'Frikkie', province: 'Free State' },
];


// Log the boolean array to the console
console.log(containsS);

// Use reduce to convert the individuals array into an object with names as keys and provinces as values
const provinceObject = individuals.reduce((obj, individual) => {
  obj[individual.name] = individual.province;
  return obj;
}, {});

console.log(provinceObject);

// Define the products array
const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

//  Use forEach to console.log each product name
products.forEach((product) => {
  console.log(product.product);
});

// Use filter to filter out products with names longer than 5 characters
const filteredProducts = products.filter(
  (product) => product.product.length <= 5
);
console.log(filteredProducts);

//  Use filter and map to convert string prices to numbers and remove products without prices,
// then use reduce to calculate the combined price of all remaining products
const totalPrice = products
  .filter((product) => product.price !== "" && !isNaN(product.price))
  .map((product) => ({ ...product, price: Number(product.price) }))
  .reduce((sum, product) => sum + product.price, 0);

console.log(totalPrice);

// Use reduce to concatenate all product names into a string
const concatenatedNames = products.reduce((str, product, index) => {
  if (index === products.length - 1) {
    return str + " and " + product.product;
  } else {
    return str + product.product + ", ";
  }
}, "");

console.log(concatenatedNames);

//  Use reduce to calculate the highest and lowest-priced items
const { highest, lowest } = products.reduce(
  (result, product) => {
    if (product.price !== "" && !isNaN(product.price)) {
      const price = Number(product.price);
      if (price > result.highest.price) {
        result.highest = { name: product.product, price };
      }
      if (price < result.lowest.price) {
        result.lowest = { name: product.product, price };
      }
    }
    return result;
  },
  {
    highest: { name: "", price: -Infinity },
    lowest: { name: "", price: Infinity },
  }
);

console.log(`Highest: ${highest.name}. Lowest: ${lowest.name}.`);
