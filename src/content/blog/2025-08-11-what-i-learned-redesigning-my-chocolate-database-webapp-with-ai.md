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
I spent about a week asking AI to redesign my chocolate database webapp. It kept making nicer versions of the same not-good interface. The useful shift came when I stopped showing the AI the app I already had and started describing the dataset, the people using it, and the experience I wanted. That sounds like a small prompting change. For me it changed the whole shape of the result.

This is what I learned from redesigning a small personal app with AI: AI is often better at helping you escape your old implementation than at decorating it. 

## The App I Started With

In summer 2020 I had a small Python web app around one of my favorite datasets: around 300 chocolates that my husband and me had tried over the years. The data had reviews, ratings, cocoa percentage, origin, bean type, tasting notes, photos, and a small machine learning model that predicts how much we may like an unknown chocolate.

Technically, it was a SQLite database with a search interface that was a simple keyword match.

It worked. It was also really ugly. Because I am not a frontend developer, I had happily used Streamlit. That was a good choice for getting something working quickly, but it also meant the interface looked like what it was: a table with some hacky filters on the side.



And yes, I am a little embarrassed to show this screenshot to you.

With the help of aider around 2023 and later Codex, the app had grown the usual side-project way: adding more features like more information about chocolates and an admin interface. However, the design was still terrible: emojis, lots of boxes, and no real idea what the page wanted to be.

I tried to fix it with AI design prompts:

> Make this more modern.
>
> Improve the UX.
>
> Use better spacing.

I also tried design-focused coding assistants and design skills. The result was still inconsistent. In my chocolate search resultlist every field from the SQLite table got its own box. It was not a product page, not a discovery experience and not really a database tool either. It was a database row wearing an ugly jacket.



## The First Mistake: Asking AI To Redesign The Existing App

My first approach was obvious:

> Here is my existing web app. Please redesign it.

This sounds sensible. It preserves the current app. It gives the AI real context. It should reduce hallucination. In practice, it preserved too much.

The AI kept inheriting the old structure: mostly the same page hierarchy, the same mental model, the same "database table with decoration" feeling. The design got slightly better, because there were fewer boxes. But it was still overloaded and buggy.



This was the annoying part: I had given the AI context, but the context was polluted. The old UI was not just an implementation detail but carried assumptions:

- that the search page should behave like an admin table
- that every database field deserved equal visual weight
- that filters were the main interaction
- that reviews were secondary text snippets instead of the heart of the app
- that "better design" meant nicer containers around the same structure

I iterated on this for about a week. The pages got more consistent but they did not get good. The important lesson was: if your current UI is the problem, giving it as the main source of truth can anchor the redesign to exactly the wrong thing.

## The Better Approach: Describe The Dataset, Not The Implementation

The second approach was more useful. I started using [Google Stitch](https://stitch.withgoogle.com/), but the tool was less important than the framing:

> Forget the existing app. Design a small chocolate discovery website around this dataset.

Instead of feeding Stitch my old UI, I described what the data contained and what I wanted a visitor to do:

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

This produced a much better first draft. It did not produce a finished design. The current site is still far from perfect. But it finally stopped looking like a web form around a CSV file.



What changed was not only the styling:


| Area            | Old approach                  | Better approach                         |
| --------------- | ----------------------------- | --------------------------------------- |
| Source of truth | Existing UI                   | Dataset and user journeys               |
| Main shape      | Search table with filters     | Discovery page with cards               |
| Visual priority | Raw fields                    | Photos, ratings, names, notes           |
| Reader question | "What rows match this query?" | "Which chocolate do I want to inspect?" |
| Failure mode    | Looks like database output    | Needs polish and browser review         |


For example, if someone searches for "Peru", the old interface returned rows. The new direction shows product photos, average rating, cocoa percentage, origin, bean variety, category, and a preview of the tasting notes. It becomes possible to scan and compare chocolates instead of reading a table. That first Stitch draft became the basis for the current website. 

## Playwright Became My Design Review Loop

The next problem was implementation. AI-generated UI often looks good in the screenshot and then breaks in the browser. Text wraps badly. Cards become uneven. Mobile layouts collapse. Spacing changes when real data arrives. One long chocolate name is enough to destroy a careful-looking layout.

Instead of reviewing everything myself and adding screenshots of UI problems I added Playwright as a design review loop.  The goal was "does this still look like the design I accepted?" For AI-built frontends, screenshots are part of the test suite now. They are not the whole test suite. Screenshots do not tell you whether the app is usable, accessible, fast, or conceptually right. But they do catch a class of AI-generated frontend mistakes that ordinary tests miss.

Unit tests will not tell you that your beautiful card grid now has one item with a three-line title pushing everything out of alignment. A browser check will.

## Then I Threw Away The Backend Too

After the frontend redesign worked, I became less attached to the backend. The old backend had accumulated along with the old UI. I decided to rebuild it from scratch as well, but with one important constraint: releases had to pass a small set of tests.

The stack stayed boring: Python, FastAPI, SQLAlchemy, Postgres, Docker. The AI wrote a lot of code I would not have written by hand as quickly. But I understood the contract:

- the database must initialize
- the app must start
- keyword search must return expected chocolates for known queries
- important pages must render
- detail pages must keep showing the right metadata and reviews
- smoke tests must pass before release

I do not need to lovingly understand every line of framework glue in a small personal project. I do need to know what behavior must never break.

## The Uncomfortable Part: You Can Use A Stack You Do Not Know

This project changed my opinion on using unfamiliar tech stacks. Previously, I would have said: do not ship code you do not understand. I still mostly believe that, especially for work projects, sensitive data, security-relevant code, or systems where other people need to maintain the result. "AI wrote it and the happy path works" is not a serious engineering standard.

For this small personal app, I would now phrase the rule differently:

> Do not ship behavior you cannot verify.

If AI chooses a framework or library I would not have chosen myself, that is not automatically a problem. If I cannot test whether database access, search, error handling, migrations, and page rendering still work, that is a problem.

This does not remove the need to understand the system. It changes where I spend my attention first. I try to understand the contracts, the data model, the deployment shape and the places where failure would hurt. Then I use tests and browser checks to keep the AI-generated implementation honest.

AI lets you move faster into unfamiliar territory. Testing is what stops that from becoming random wandering.

## The Main Lessons

### 1. Redesigning from the old UI can preserve the wrong assumptions

If the current app is ugly because the underlying mental model is wrong, do not start with screenshots of the current app. Start with the data and the user journeys.

### 2. Design tools are better at experience shape than coding agents are

Coding agents can improve CSS, but dedicated design tools like Stitch gave me much better first principles for layout, hierarchy, and visual direction. It was not magic. I still had to judge the result. But it was a better starting point.

### 3. Screenshots are part of the test suite now

For frontend work, Playwright is not only an end-to-end testing tool. It is a way to keep the visual loop honest.

### 4. AI-generated backend code is acceptable only when contracts are explicit

If you let AI rebuild backend code, define the tests first. The tests are your understanding made executable.

### 5. The best prompt is often not "improve this"

The better prompt is:

> Here is the goal. Here are the users. Here are the core workflows. Ignore my current implementation if it gets in the way.

That shift made the biggest difference.

## Conclusion

My old chocolate database app worked, but its structure kept pulling every redesign back toward the same boring interface. Once I described the dataset and the experience I wanted instead of the app I had, the AI became much more useful.

And in case you're curious what the website looks like today: [Kakaokunde](https://kakaokunde.vercel.app). The design and website are far from perfect, but it finally feels like a small chocolate discovery site instead of a database table with lipstick.