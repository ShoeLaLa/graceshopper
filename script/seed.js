'use strict'

const db = require('../server/db')
const {User, Product, Size, ProductSize} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'air ones',
      price: 100,
      picture: '/pictures/airJordan.jpg'
    }),
    Product.create({
      name: 'Kyrie',
      price: 200,
      picture: '/pictures/footLocker.jpg'
    }),
    Product.create({
      name: 'Clown Shoes',
      price: 150,
      picture: '/pictures/clown-shoes-red-and-yellow.jpg'
    }),
    Product.create({
      name: 'DRose',
      price: 250,
      picture: '/pictures/drose.jpg'
    }),
    Product.create({
      name: 'Crocs',
      price: 40,
      picture: '/pictures/crocs.jpg'
    }),
    Product.create({
      name: 'Flip Flops',
      price: 250,
      picture: '/pictures/flipflops.jpg'
    }),
    Product.create({
      name: 'Yeezys',
      price: 10000,
      picture: '/pictures/yeezy.jpg'
    })
  ])
  const sizes = await Promise.all([
    Size.create({
      size: 7
    }),
    Size.create({
      size: 8
    }),
    Size.create({
      size: 9
    }),
    Size.create({
      size: 10
    }),
    Size.create({
      size: 11
    }),
    Size.create({
      size: 12
    })
  ])
  const inventoryWithSize = await Promise.all([
    ProductSize.create({
      inventory: 0,
      size: 7,
      productId: 1
    }),
    ProductSize.create({
      inventory: 4,
      size: 8,
      productId: 1
    }),
    ProductSize.create({
      inventory: 5,
      size: 9,
      productId: 1
    }),
    ProductSize.create({
      inventory: 2,
      size: 10,
      productId: 1
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 1
    }),
    ProductSize.create({
      inventory: 1,
      size: 12,
      productId: 1
    }),
    ProductSize.create({
      inventory: 3,
      size: 7,
      productId: 2
    }),
    ProductSize.create({
      inventory: 5,
      size: 8,
      productId: 2
    }),
    ProductSize.create({
      inventory: 2,
      size: 9,
      productId: 2
    }),
    ProductSize.create({
      inventory: 1,
      size: 10,
      productId: 2
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 2
    }),
    ProductSize.create({
      inventory: 4,
      size: 12,
      productId: 2
    }),
    ProductSize.create({
      inventory: 1,
      size: 7,
      productId: 3
    }),
    ProductSize.create({
      inventory: 2,
      size: 8,
      productId: 3
    }),
    ProductSize.create({
      inventory: 6,
      size: 9,
      productId: 3
    }),
    ProductSize.create({
      inventory: 6,
      size: 10,
      productId: 3
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 3
    }),
    ProductSize.create({
      inventory: 0,
      size: 12,
      productId: 3
    }),
    ProductSize.create({
      inventory: 1,
      size: 7,
      productId: 4
    }),
    ProductSize.create({
      inventory: 2,
      size: 8,
      productId: 4
    }),
    ProductSize.create({
      inventory: 6,
      size: 9,
      productId: 4
    }),
    ProductSize.create({
      inventory: 6,
      size: 10,
      productId: 4
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 4
    }),
    ProductSize.create({
      inventory: 0,
      size: 12,
      productId: 4
    }),
    ProductSize.create({
      inventory: 1,
      size: 7,
      productId: 5
    }),
    ProductSize.create({
      inventory: 2,
      size: 8,
      productId: 5
    }),
    ProductSize.create({
      inventory: 6,
      size: 9,
      productId: 5
    }),
    ProductSize.create({
      inventory: 6,
      size: 10,
      productId: 5
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 5
    }),
    ProductSize.create({
      inventory: 0,
      size: 12,
      productId: 5
    }),
    ProductSize.create({
      inventory: 1,
      size: 7,
      productId: 6
    }),
    ProductSize.create({
      inventory: 2,
      size: 8,
      productId: 6
    }),
    ProductSize.create({
      inventory: 6,
      size: 9,
      productId: 6
    }),
    ProductSize.create({
      inventory: 6,
      size: 10,
      productId: 6
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 6
    }),
    ProductSize.create({
      inventory: 0,
      size: 12,
      productId: 6
    }),
    ProductSize.create({
      inventory: 1,
      size: 7,
      productId: 7
    }),
    ProductSize.create({
      inventory: 2,
      size: 8,
      productId: 7
    }),
    ProductSize.create({
      inventory: 6,
      size: 9,
      productId: 7
    }),
    ProductSize.create({
      inventory: 6,
      size: 10,
      productId: 7
    }),
    ProductSize.create({
      inventory: 3,
      size: 11,
      productId: 7
    }),
    ProductSize.create({
      inventory: 0,
      size: 12,
      productId: 7
    }),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${sizes.length} sizes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
