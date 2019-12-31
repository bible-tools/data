#!/usr/bin/node

const fs = require('fs-extra')

const tmpParentDir = process.argv[2]
const tmpParentDirTwo = `${tmpParentDir}`
const parentDir = tmpParentDirTwo.replace('index.json', '')

let dataSource
try {
  dataSource = require(`${process.cwd()}/${parentDir}index.json`)
} catch(e) {
  console.error('try something like: node reference_maker.js translations/en/KJV/')

  process.exit(1)
}

// setup initial data structure
let mainResult = { books: {} }

dataSource.books.forEach(book => {
  const bookName = book.name

  // add bookNames and initial book structure
  mainResult.books[bookName] = { chapters: {} }

  book.chapters.forEach(chapter => {
    const chapterNumber = chapter.chapter

    // add chapters to each book and initial chapter structure
    mainResult.books[bookName].chapters[chapterNumber] = {
      verses: chapter.verses.length
    }
  })
})

fs.writeJsonSync(`${parentDir}/reference.json`, mainResult)
