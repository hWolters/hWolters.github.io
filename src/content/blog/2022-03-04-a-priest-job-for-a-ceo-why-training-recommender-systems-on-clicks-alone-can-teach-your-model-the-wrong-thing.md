---
title: "A Priest Job for a CEO - Why Training Recommender Systems on Clicks Alone Can Teach Your Model the Wrong Thing"
description: "Clicks are not preferences. A lesson from job recommendations about why implicit feedback can reinforce the very behavior a recommender system should remove."
publishDate: "2022-03-04"
slug: "a-priest-job-for-a-ceo-why-training-recommender-systems-on-clicks-alone-can-teach-your-model-the-wrong-thing"
topic: "data"
tags: ["recommender systems", "machine learning", "implicit feedback"]
relatedSlugs: ["biases-in-learning-to-rank-models-and-three-approaches-to-deal-with-them"]
draft: false
featured: false
---

Most machine learning models are only as good as the data they learn from. That sounds obvious, but it is surprisingly easy to forget once you have millions of data points and a model that performs well on your offline metrics.

My job is to work on job recommendations. At XING, we have user profiles and job postings from companies and need to match them. One of our projects started with a simple observation.

We occasionally recommended priest jobs to CEOs. We also recommended captain positions to data scientists. I know because I received one myself.

People clicked these recommendations. That was exactly the problem. **Clicks are not preferences.**

Most recommender systems cannot rely on explicit feedback. Few people rate products on Amazon. Few people rate a movie they watch on Netflix. Most users simply interact with whatever is shown to them. Instead of asking users what they like, we can often only observe behavior such as clicks or bookmarks and infer their preferences.

Large parts of our job recommender relied on this idea. Like many production recommender systems, it combined several recommendation approaches before filtering and ranking the final results. Much of the training and evaluation relied on implicit feedback such as clicks and bookmarks.

In an analysis, we looked more closely at some of these clicks.

## "What the hell is this?"

Imagine you are the CEO of a large company. One day, your job recommender suggests a position as a priest. Would you click? Probably.

But not because you are considering a career change. You click because you want to understand how the recommender managed to produce such a strange recommendation. That single click tells a very different story from the one the model assumes.

The model learns: "CEOs like priest jobs."

The user actually meant: "What the hell is this recommendation?"

Those are two very different signals. The metrics looked great. This made the problem difficult to spot: if you evaluate a recommender using clicks, these recommendations look successful. People interacted with them. Some were even bookmarked because users wanted to show them to colleagues or friends. From the perspective of the model, everything looked positive.

The data silently reinforced the very behavior we wanted to remove. This is one of the dangers of implicit feedback. Users rarely tell you what they mean. You have to infer it from behavior, and behavior often has multiple explanations.

## Looking beyond clicks

Instead of looking only at clicks, we combined them with negative feedback. Users could delete recommendations or explicitly indicate that they did not want to see similar jobs again. Suddenly, certain job combinations stood out. They received an unusually large number of clicks. They also received an unusually large number of deletes and negative-feedback signals.

Looking at clicks alone, they appeared highly relevant. Looking at clicks together with deletes revealed that people were mostly clicking because the recommendation looked absurd. This gave us a much better signal than clicks alone.

## Fixing the recommender

Our first thought was to teach the model these bad combinations.

That turned out to be difficult. Fortunately, these combinations were relatively rare. Unfortunately, that also meant there was little training data. Even worse, the existing data contained many clicks, making these examples appear attractive to the model.

Instead, we built an additional filtering layer for our hybrid recommender. We identified job-role combinations that consistently generated many clicks but also many deletes or explicit negative-feedback signals. We then combined these signals with semantic similarity between job roles to distinguish genuine career transitions from obviously implausible recommendations. The filter removed these combinations before they reached the user. It was a relatively simple solution, but it significantly improved recommendation quality.

## Think about what your labels actually mean

Whenever we train a model, we make assumptions about what our data represents.

A click is positive.

A purchase means satisfaction.

A long reading time means interest.

Sometimes these assumptions are correct. Sometimes they are completely wrong. If the labels do not mean what we think they mean, the model will faithfully learn the wrong thing. Before building a more sophisticated model, it is often worth asking a simpler question:

**What does this data actually tell us about the user?**
