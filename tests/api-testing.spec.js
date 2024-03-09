// @ts-check
const { test, expect } = require('@playwright/test');

test('GET anapioficeandfire api', async ({ request }) => {
  const getCharacter = await request.get("https://anapioficeandfire.com/api/characters/581");
  expect(getCharacter.ok()).toBeTruthy();
  expect(getCharacter.status()).toBe(200);
  expect(await getCharacter.json()).toEqual(expect.objectContaining({
    url: "https://anapioficeandfire.com/api/characters/581",
    name: "Jon Penrose",
    gender: "Male",
    culture: "",
    born: "",
    died: "",
    titles: [ "Ser" ],
    aliases: [ "" ],
    father: "",
    mother: "",
    spouse: "",
    allegiances: [ "https://anapioficeandfire.com/api/houses/300" ],
    books: [ "https://anapioficeandfire.com/api/books/4" ],
    povBooks: [],
    tvSeries: [ "" ],
    playedBy: [ "" ]
    }));
});

test('POST restful-api.dev api', async ({ request }) => {
  const responseBody = await request.post("https://api.restful-api.dev/objects", {
    data: {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        CPU_model: "Intel Core i9",
        Hard_disk_size: "1 TB"
      }
   }
  });
  expect(responseBody.ok()).toBeTruthy();
  expect(responseBody.status()).toBe(200);
  expect(await responseBody.json()).toEqual(expect.objectContaining({
    // The id: is returned as some dynamic string so to best option is to
    // confirm that the value returned here is a String.
    id: expect.any(String),
    name: "Apple MacBook Pro 16",
    data: {
        year: 2019,
        price: 1849.99,
        CPU_model: "Intel Core i9",
        Hard_disk_size: "1 TB"
    }, 
    // I can't get the expected timestamp format to match what is actually coming back
    // AND having a hard time figuring out how to "freeze" time during the test.
    // Example:
    //   expected: "createdAt": "2024-02-29T04:11:00.000Z",
    //   received: "createdAt": "2024-02-29T04:11:00.355+00:00",
    // Using expect.any(String) to confirm what is returned is a String because
    // the timestamp for createdAt is a String in the JSON.
    createdAt: expect.any(String)
  }));

  // A second way to do the assertions in the reponse body.
  // const responseBody = await postObject.json();
  // expect(responseBody.data).toHaveProperty("year", 2019);
  // expect(responseBody.data).toHaveProperty("price", 1849.99);
  // expect(responseBody.data).toHaveProperty("CPU_model", "Intel Core i9");
  // expect(responseBody.data).toHaveProperty("Hard_disk_size", "1 TB");
});

test('PUT dummyjson.com api', async ({ request }) => {
  const responseBody = await request.put("https://dummyjson.com/products/1", {
    data: {
      title: "iPhone 12 Pro",
      price: 999,
      rating: 4.9,
      stock: 100
    }
  });
  expect(responseBody.ok()).toBeTruthy();
  expect(responseBody.status()).toBe(200);
  expect(await responseBody.json()).toEqual({
    id: 1,
    title: "iPhone 12 Pro",
    description: "An apple mobile which is nothing like apple",
    price: 999,
    rating: 4.9,
    stock: 100,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
    ]
  });
});
