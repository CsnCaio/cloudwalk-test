# Explaining folder structure

Like always, I've tried to create my project the more organized, reusable and flexible as possible.
So, let me explain what I did:

## Handlers

This folder is responsible for store the application handlers, there are three classes, that is:

- **FileHandler (File.js)**
  - Responsible for handle all the actions that we do in file like read, write, append and etc. Today, for this task, I just needed the read function. But, it's prepared to have more methods.

- **LogHandler (Log.js)**
  - Responsible for handle all the actions that we do in log like analyze an event (line), get details about this event (who killed who and the death cause) and manipulate, remap or create reports (that is a log too).

- **ReportHandler (Report.js)**
  - Responsible for handle all with the report, that is the structure that we'll send to client in the response. This is the biggest class in project and have methods to manipulate (increase and remove points of players, etc.) the report until the entire log is analyzed.

## Logs

This folder is responsible for store the logs that we want to analyze. I've created this to organize and because I was trying to download more logs to analyze and test the project, but I couldn't.

## Test

One of the most cool parts of the project. I was doing unit tests while I was developing the algorithm and my idea was to evidence that the API is working, task by task.

Just for aknowledge, I used Mocha and Chai, one of the most used tools to do unit tests in JS Ecossystem.

## At least, index.js

The root of the project.
My programming style is evident here (It's not "mine", I read Clean Code a lot :) ). I like to abstract the whole process in some large steps, trying to separate and categorize the different processes that all the applications do.

So, as we see, the index have the steps:

1. readFile()

2. createBasicReport
   - The game report is required. So, the "basic" report is always generated.

3. createRanking
   - If the client pass a **queryUrlParam** saying that he wants to get the ranking, this method will get and accumulate players points and list in descending order.

**Obs:** The "deathCause" group, quoted in "PLUS" task is also there. It isn't a method, cause the app get the death cause when it's analyzing a kill. So just like ranking, it's passed via URL and added to report.