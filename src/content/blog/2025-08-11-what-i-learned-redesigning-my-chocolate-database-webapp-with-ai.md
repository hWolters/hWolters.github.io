---
title: "What I Learned Redesigning My Chocolate Database Webapp with AI"
description: "What redesigning a chocolate database app with AI taught me about product thinking, UX, prompts, and rebuilding old interfaces."
publishDate: "2025-08-11"
slug: "what-i-learned-redesigning-my-chocolate-database-webapp-with-ai"
topic: "ai"
tags: ["AI","Google Stitch","Playwright","FastAPI","UX"]
draft: false
featured: true
---
Before the AI era started, I had hacked together a chocolate ratings "webapp" without using classic frontend frameworks or libraries. I am definetly not a frontend engineer and it was more of an interface to a database. But with AI it should be possible to get a decent looking webapp, I thought.

So I gave models (gpt, gemini, gwen...) access to my code and asked it to redesign the app. But the models kept producing only slighly nicer looking versions of the same not-so-great interface. 

The big improvement only came when I threw away the existing code and started describing the problem the app should solve: I shared database schemas and the experience I wanted. I took away that LLMs are often better at helping you escape your old implementation than at decorating it. 

## The App I Started With

In summer 2020 I had a small Python web app around one of my favorite datasets: around 300 chocolates that my husband and me had tried over the years. The data had reviews, ratings, cocoa percentage, origin, bean type, tasting notes, photos, and a small machine learning model that predicts how much we may like an unknown chocolate. We used it to check if we had tried a chocolate before or as a decision support system when we were not sure which chocolate to buy. Technically, it was a SQLite database with a search interface that was a simple keyword match and a decision tree model to predict a rating score. 

It worked to find chocolates. But it was also really ugly. With the backend in Python, I had happily used Streamlit for the front end. That was a good choice for getting something working quickly, but it also meant the interface looked like what it was: a table with filters on the side.

And yes, I am a little embarrassed to show this screenshot to you.

With the help of aider around 2023 and later a first version of GPT with IDE access, the app had grown the usual side-project way: adding more features like more information about chocolates and an admin interface to upload new chocoalte ratings. However, the design was still terrible: emojis, lots of boxes and no real idea what the page wanted to be.

I tried to fix it with concrete prompts like 

> Harmonize Fonts and colors. Just use Font XYX
>
> Make this box smaller

## The First Mistake: Asking Models To Redesign The Existing App

Models got better, context windows got bigger and there was not a lot of code. So my next approach was giving the models access to my repository and promting something broad like:

> Here is my existing web app. Please redesign it.

But that also ment, that the models sticked mostly to the current structure: The results had the same page hierarchy, the same mental model and the same "database table with decoration" feeling. 

The old UI carried ancient assumptions. "Better design" meant nicer containers around the same structure. It lacked visual hierarchy and calls to actions. 

I iterated on this for about a week. I tried using design-focused coding assistants and design skills. The result was still inconsistent, AI blurple and full of boxes: Every field from a row in the data base got it's own box somewhere somehow. The pages got more consistent but they did not really get  good. I learned that giving a model access to an old code base as the main source of truth can anchor the redesign too much. 

## The Better Approach: Describe Goal of the App, Not The Implementation

The second approach was more useful. I started using [Google Stitch](https://stitch.withgoogle.com/). Instead of starting with the soon to be legacy code base, I explained what the app should do.  I did not show Stitch my old UI, but described what the data contained and what I wanted a user to do:

- search chocolates
- browse a small database
- compare ratings from two people
- inspect cocoa percentage, origin, bean type, and category
- read tasting notes and reviews
- make the site feel more like discovery than administration

The better prompt was closer to this:

> I have a personal database of chocolates my husband and I reviewed. Each chocolate has a name, brand, cocoa percentage, origin, bean type, category, photos, ratings from two people, average rating, tasting notes, and review text. Design a small website for discovering chocolates, not an admin tool. A visitor should be able to search, browse, compare ratings, and open a chocolate detail page. Ignore my current implementation if it gets in the way.

You do not even have to write this feature list yourself. A surprisingly useful step is to ask an AI:

> Given this app and dataset, what are the core user journeys? What would make this useful and delightful?

Then review the answer critically. The "critically" part matters. AI will also invent nonsense, overcomplicate simple flows, and suggest features that sound good but do not fit the project. 


| Area            | Old approach                  | Better approach                         |
| --------------- | ----------------------------- | --------------------------------------- |
| Source of truth | Existing UI                   | Dataset and user journeys               |
| Main shape      | Search table with filters     | Discovery page with cards               |
| Visual priority | Raw fields                    | Photos, ratings, names, notes           |
| Reader question | "What rows match this query?" | "Which chocolate do I want to inspect?" |
| Failure mode    | Looks like database output    | Needs polish and browser review         |


That first Stitch draft became the basis for the current website. 

## Playwright Became My Design Review Loop

The next problem was implementation. A UI designed on canvas often looks good and then breaks when applied to the actual data. Text wraps badly. Cards become uneven due to different length of text and spacing. 

Instead of reviewing everything myself and adding screenshots of UI problems I added Playwright as a design review loop.  The goal was "does this still look like the design I accepted?" For AI-built frontends, screenshots are part of testing now.  They can if an item suddendly breaks alignement and fix it. 

## Then I Threw Away The Backend Too

After the frontend redesign worked, I became less attached to the backend. The old backend had historically accumulated tech debt along with the old UI. I decided to let a. model rebuild it from scratch as well. 

The stack that the model chose was similar: Python, FastAPI, SQLAlchemy, Postgres, Docker. The model wrote a lot of code I would not have written by hand as quickly.  But I understood the contract and made sure that the app passed some crucial tests:

- the database must initialize
- the app must start
- keyword search must return expected chocolates for known queries
- important pages must render
- detail pages must keep showing the right metadata and reviews
- smoke tests must pass before release

I did not have to understand every line of framework glue in a small personal project. I do need to know when the app behaves not as expected.

## The Uncomfortable Part: You Can Use A Stack You Do Not Know

This project changed my opinion on using unfamiliar tech stacks. Previously, I would have said: do not ship code you do not understand. I still mostly believe that, especially for work projects, sensitive data, security-relevant code, or systems where other people need to maintain the result. "AI wrote it and the happy path works" is not a serious engineering standard.

For this small personal app, I would now phrase the rule differently:

> Do not ship behavior you cannot verify.

If the model chooses a framework or library I would not have chosen myself that is not automatically a dealbreaker. If I cannot test whether database access, search, error handling, migrations, and page rendering still work that is the real problem.

I still need to understand the system. I need to understand the contracts, the data model, the deployment and the places where failure would hurt. Then I use tests and browser tests.

## The Main Lessons

Summarizing my main lessons:

### 1. Redesigning from the old UI can preserve the wrong assumptions

If the current app is ugly because the underlying mental model is wrong, do not start with screenshots of the current app. Start with the data and the user journeys.

### 2. Design tools are better at experience shape than coding agents are

Coding agents can improve CSS, but dedicated design tools like Stitch gave me much better first principles for layout, hierarchy, and visual direction. It was a great starting point and I still had to judge the result. 

### 3. Screenshots are part of the test suite now

For frontend work, Screenshots are a testing tool. 

### 4. AI-generated backend code is acceptable only when contracts are explicit

If you let AI rebuild backend code, define the tests first. The tests are your understanding made executable.

### 5. The best prompt is often not "improve this"

The better prompt is:

> Here is the goal. Here are the users. Here are the core workflows. Ignore my current implementation if it gets in the way.

## Conclusion

My old chocolate database app worked, but its structure kept pulling every redesign attempt back toward a very similar UI. Once I described the dataset and the experience I wanted users to have, the AI became much more useful.

And in case you're curious what the website looks like today: [Kakaokunde](https://kakaokunde.vercel.app). The design and website are far from perfect, but it finally feels like a small chocolate discovery site instead of a database table with lipstick.