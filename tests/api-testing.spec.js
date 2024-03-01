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

// This test is currently skipped. See FIXME notes inside test.
// fixme() is used to skip test
test.fixme('POST restful-api.dev api', async ({ request }) => {
  const postObject = await request.post("https://api.restful-api.dev/objects", {
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
  expect(postObject.ok()).toBeTruthy();
  expect(postObject.status()).toBe(200);
  expect(await postObject.json()).toEqual(expect.objectContaining({
    // FIXME: 2 things:
    // 1. id is generated with each POST call so it changes.
    //    Need to find a way to make this value dynamic.
    //    Maybe just check to see if it is a String?
    // 2. createdAt timestamp does not quite match because of the time it takes for the 
    //    request to be called and the response to be recieved. 
    //    Also, the formatting is slightly off.
    //    Example:
    //      expected: "createdAt": "2024-02-29T04:11:00.000Z",
    //      received: "createdAt": "2024-02-29T04:11:00.355+00:00",
    id: "ff8081818de9f8bf018df29614f2072d",
    name: "Apple MacBook Pro 16",
    data: {
        year: 2019,
        price: 1849.99,
        CPU_model: "Intel Core i9",
        Hard_disk_size: "1 TB"
    }, 
    createdAt: new Date(Date()).toJSON()
    // createdAt: "2024-02-29T01:43:21.657+00:00"
  }));
});