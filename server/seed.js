const mongoose = require("mongoose");
const Question = require("./models/Question");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quizapp";

const sampleQuestions = [
  // HTML Questions
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language",
    category: "html",
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["h1", "h2", "h6", "head"],
    correctAnswer: "h1",
    category: "html",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<br>", "<lb>", "<break>", "<tr>"],
    correctAnswer: "<br>",
    category: "html",
  },
  {
    question: "Choose the correct HTML element to define important text",
    options: ["<strong>", "<b>", "<important>", "<i>"],
    correctAnswer: "<strong>",
    category: "html",
  },
  {
    question: "Choose the correct HTML element to define emphasized text",
    options: ["<em>", "<i>", "<italic>", "<strong>"],
    correctAnswer: "<em>",
    category: "html",
  },
  {
    question: "Which character is used to indicate an end tag?",
    options: ["/", "*", "^", "<"],
    correctAnswer: "/",
    category: "html",
  },
  {
    question: "How can you open a link in a new tab/browser window?",
    options: ["<a href='url' target='_blank'>", "<a href='url' new>", "<a href='url' target='new'>", "<a href='url' window='_new'>"],
    correctAnswer: "<a href='url' target='_blank'>",
    category: "html",
  },
  {
    question: "Which of these elements are all <table> elements?",
    options: ["<table><tr><td>", "<table><head><tfoot>", "<thead><body><tr>", "<table><tr><tt>"],
    correctAnswer: "<table><tr><td>",
    category: "html",
  },
  {
    question: "How can you make a numbered list?",
    options: ["<ol>", "<ul>", "<dl>", "<list>"],
    correctAnswer: "<ol>",
    category: "html",
  },
  {
    question: "How can you make a bulleted list?",
    options: ["<ul>", "<ol>", "<list>", "<dl>"],
    correctAnswer: "<ul>",
    category: "html",
  },

  // CSS Questions
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
    correctAnswer: "Cascading Style Sheets",
    category: "css",
  },
  {
    question: "Where in an HTML document is the correct place to refer to an external style sheet?",
    options: ["In the <head> section", "In the <body> section", "At the end of the document", "You can't refer to an external style sheet"],
    correctAnswer: "In the <head> section",
    category: "css",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>", "<link>"],
    correctAnswer: "<style>",
    category: "css",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "font", "styles"],
    correctAnswer: "style",
    category: "css",
  },
  {
    question: "Which is the correct CSS syntax?",
    options: ["body {color: black;}", "{body:color=black;}", "body:color=black;", "{body;color:black;}"],
    correctAnswer: "body {color: black;}",
    category: "css",
  },
  {
    question: "How do you insert a comment in a CSS file?",
    options: ["/* this is a comment */", "// this is a comment", "// this is a comment //", "' this is a comment"],
    correctAnswer: "/* this is a comment */",
    category: "css",
  },
  {
    question: "Which property is used to change the background color?",
    options: ["background-color", "color", "bgcolor", "background"],
    correctAnswer: "background-color",
    category: "css",
  },
  {
    question: "How do you add a background color for all <h1> elements?",
    options: ["h1 {background-color:#FFFFFF;}", "all.h1 {background-color:#FFFFFF;}", "h1.all {background-color:#FFFFFF;}", "h1 {bgcolor:#FFFFFF;}"],
    correctAnswer: "h1 {background-color:#FFFFFF;}",
    category: "css",
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    options: ["color", "text-color", "fgcolor", "font-color"],
    correctAnswer: "color",
    category: "css",
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-size", "text-size", "font-style", "text-style"],
    correctAnswer: "font-size",
    category: "css",
  },

  // JavaScript Questions
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<scripting>"],
    correctAnswer: "<script>",
    category: "javascript",
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: ["<script src='xxx.js'>", "<script href='xxx.js'>", "<script name='xxx.js'>", "<link src='xxx.js'>"],
    correctAnswer: "<script src='xxx.js'>",
    category: "javascript",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["alert('Hello World');", "msgBox('Hello World');", "msg('Hello World');", "alertBox('Hello World');"],
    correctAnswer: "alert('Hello World');",
    category: "javascript",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"],
    correctAnswer: "function myFunction()",
    category: "javascript",
  },
  {
    question: "How do you call a function named 'myFunction'?",
    options: ["myFunction()", "call function myFunction()", "call myFunction()", "execute myFunction()"],
    correctAnswer: "myFunction()",
    category: "javascript",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    options: ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if i = 5"],
    correctAnswer: "if (i == 5)",
    category: "javascript",
  },
  {
    question: "How does a WHILE loop start?",
    options: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "while (i = 0; i <= 10)"],
    correctAnswer: "while (i <= 10)",
    category: "javascript",
  },
  {
    question: "How does a FOR loop start?",
    options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", "for (i <= 5; i++)"],
    correctAnswer: "for (i = 0; i <= 5; i++)",
    category: "javascript",
  },
  {
    question: "How can you add a comment in a JavaScript?",
    options: ["//This is a comment", "<!--This is a comment-->", "'This is a comment", "/*This is a comment*/"],
    correctAnswer: "//This is a comment",
    category: "javascript",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onclick", "onmouseclick", "onchange", "onmouseover"],
    correctAnswer: "onclick",
    category: "javascript",
  },
];

(async () => {
  try {
    await mongoose.connect(uri);
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log(`Seeded ${sampleQuestions.length} questions.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
