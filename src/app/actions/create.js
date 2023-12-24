"use server"

// // Import necessary modules
// import { client } from "@/lib/db"
// import { redirect } from "next/navigation"

// // Function to generate a unique book id
// function generateUniqueId() {
//   return Math.floor(Math.random() * 100000).toString() // Converting to string for simplicity
// }

// // Function to check if a book with the given title and author already exists
// async function doesBookExist(title, author) {
//   const bookKeys = await client.keys("books:*")

//   for (const key of bookKeys) {
//     const bookData = await client.hGetAll(key)

//     if (bookData.title === title && bookData.author === author) {
//       return true // Book with the same title and author already exists
//     }
//   }

//   return false // Book does not exist
// }

// // Function to create a new book
// export async function createBook(formData) {
//   const { title, rating, author, blurb } = Object.fromEntries(formData)

//   // Check if the book already exists
//   if (await doesBookExist(title, author)) {
//     console.log("Book already exists")
//     return { error: "That book has already been added." }
//     // Handle the case where the book already exists, you might want to redirect or show an error message
//     // return
//   }

//   // Generate a unique book id
//   const id = generateUniqueId()

//   // Save new hash for the book
//   await client.hSet(`books:${id}`, {
//     title,
//     rating,
//     author,
//     blurb,
//   })

//   redirect("/")
// }

import { client } from "@/lib/db"
import { redirect } from "next/navigation"

export async function createBook(formData) {
  const { title, rating, author, blurb } = Object.fromEntries(formData)

  // create a book id
  const id = Math.floor(Math.random() * 100000)

  // add the book to the sorted set
  const unique = await client.zAdd(
    "books",
    {
      value: title,
      score: id,
    },
    { NX: true }
  )

  if (!unique) {
    return { error: "That book has already been added." }
  }

  // save new hash for the book
  await client.hSet(`books:${id}`, {
    title,
    rating,
    author,
    blurb,
  })

  redirect("/")
}
