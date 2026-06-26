---
title: "What I Learned Redesigning My Chocolate Database Webapp with AI"
date: 2025-08-11T09:00:00+02:00
draft: true
categories:
- AI
- Web Development
tags:
- AI
- Google Stitch
- Playwright
- FastAPI
- UX
keywords:
- AI web app redesign
- chocolate database
- Google Stitch
- Playwright screenshots
thumbnailImage: /post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/redesigned-search-results-with-stitch.png
thumbnailImagePosition: bottom
coverImage: /post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/redesigned-search-results-with-stitch.png
---

In summer 2020 I had a small Python web app around one of my favorite datasets: a chocolate database with around 300 chocolates, ratings, metadata, and a search interface.

It worked.

It was also ugly. I used Streamlit, so my UI options were limited.

With the help of aider around 2023 and later Codex, the app had grown the usual side-project way: one useful feature after another, no coherent design system, and lots of boxes. Search box. Result boxes. Detail boxes. Filter boxes. Boxes inside boxes. It had the energy of a database admin interface that accidentally became public.

I tried to fix it with AI design prompts. "Make this more modern." "Improve the UX." "Use better spacing." I also tried design-focused coding assistants and design skills. The results were better in the way a cleaned-up spreadsheet is better: less embarrassing, still obviously the same thing.

The game changer was [Google Stitch](https://stitch.withgoogle.com/), an AI tool for generating web and mobile UI from prompts or images. What changed for me was not just the output quality. It was the workflow.

<!--more-->

## The First Mistake: Asking AI To Redesign The Existing App

My first approach was obvious:

> Here is my existing web app. Please redesign it.

This sounds sensible. It preserves the current product. It gives the AI real context. It should reduce hallucination.

In practice, it preserved too much.

The AI kept inheriting the old structure: the same page hierarchy, the same mental model, the same "database table with decoration" feeling. Even when it improved typography and spacing, it stayed trapped inside the original app's assumptions.

![Redesign based on the previous website](/post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/redesign-from-previous-website.png)

I iterated on this for about a week, between other projects. The pages got prettier. They did not get good.

The important lesson was: if your current UI is the problem, giving it as the main source of truth can anchor the redesign to exactly the wrong thing.

## The Better Approach: Describe The Product, Not The Implementation

The second approach was more radical:

> Forget the existing app. Design the best chocolate discovery website for these features.

Instead of feeding Stitch my old UI, I described what I wanted users to do:

- search chocolates
- browse the database
- compare ratings
- inspect chocolate details
- make the site feel more like discovery than administration

You do not even have to write this feature list yourself. A surprisingly useful step is to ask an AI:

> Given this app and dataset, what are the core user journeys? What would make this useful and delightful?

Then review the answer critically.

This produced a much better first draft. The design finally stopped looking like a web form around a CSV file. It became closer to a real product: more visual hierarchy, better emphasis on discovery, clearer entry points, and fewer meaningless containers.

![Redesigned search results with Stitch](/post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/redesigned-search-results-with-stitch.png)

That first Stitch draft became the basis for the current website.

## Playwright Became My Design Review Loop

The next problem was implementation.

AI-generated UI often looks good in the screenshot and then breaks in the browser. Text wraps badly. Cards become uneven. Mobile layouts collapse. Spacing changes when real data arrives.

So I used Playwright as a design review loop.

Not in a fancy way. I used it to open the page, take screenshots, compare desktop and mobile states, and catch the obvious regressions that I would otherwise miss while staring at code. This mattered because the goal was not "does the CSS compile?" The goal was "does this still look like the design I accepted?"

![Summer 2025 search results](/post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/summer-2025-search-results.png)

This is one of my biggest learnings from the project:

> For AI-built frontends, screenshots are tests.

Unit tests will not tell you that your beautiful card grid now has one item with a three-line title pushing everything out of alignment. A browser check will.

## Then I Threw Away The Backend Too

After the frontend redesign worked, I became less attached to the backend.

The old backend had accumulated along with the old UI. I decided to rebuild it from scratch as well, but with one important constraint: releases had to pass a small set of tests.

The stack stayed boring: Python, FastAPI, SQLAlchemy, Postgres, Docker. The AI wrote a lot of code I would not have written by hand as quickly. Some of it I did not fully understand line by line at first.

But I understood the contract:

- the database must initialize
- the app must start
- search must work
- important pages must render
- predictions or data endpoints must keep returning sensible results
- smoke tests must pass before release

That distinction matters. I do not need to lovingly understand every line of framework glue. I do need to know what behavior must never break.

![Summer 2025 best chocolates](/post/what-i-learned-redesigning-my-chocolate-database-webapp-with-ai/summer-2025-best-chocolates-sonnet.png)

## The Uncomfortable Part: You Can Use A Stack You Do Not Know

This project changed my opinion on using unfamiliar tech stacks.

Previously, I would have said: do not ship code you do not understand.

I still mostly believe that. But now I would phrase it differently:

> Do not ship behavior you cannot verify.

There is a difference.

If AI chooses a language or tech stack I would not have chosen myself, that is not automatically a problem. If I cannot test whether authentication, database access, error handling, and page rendering still work, that is a problem.

AI lets you move faster into unfamiliar territory. Testing is what stops that from becoming random wandering.

## The Main Lessons

### 1. Redesigning from the old UI can preserve the wrong assumptions

If the current app is ugly because the underlying mental model is wrong, do not start with screenshots of the current app. Start with the user journeys.

### 2. Design tools are better at product shape than coding agents are

Coding agents can improve CSS, but dedicated design tools like Stitch gave me much better first principles for layout, hierarchy, and visual direction.

### 3. Screenshots are part of the test suite now

For frontend work, Playwright is not only an end-to-end testing tool. It is a way to keep the visual loop honest.

### 4. AI-generated backend code is acceptable only when contracts are explicit

If you let AI rebuild backend code, define the tests first. The tests are your understanding made executable.

### 5. The best prompt is often not "improve this"

The better prompt is:

> Here is the goal. Here are the users. Here are the core workflows. Ignore my current implementation if it gets in the way.

That shift made the biggest difference.

## Conclusion

The surprising thing was not that AI could make my app prettier. I expected that.

The surprising thing was that the best result came from being willing to throw more away.

My old chocolate database app worked, but its structure kept pulling every redesign back toward the same boring interface. Once I described the product I wanted instead of the app I had, the AI became much more useful.

So my current rule is:

> Use AI to explore the product from scratch. Use tests to keep the implementation grounded.

That combination worked much better than asking AI to decorate old boxes.
