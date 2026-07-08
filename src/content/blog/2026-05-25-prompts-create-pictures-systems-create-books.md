---
title: "Prompts Create Pictures. Systems Create Books."
description: "What creating a personalized children's book taught me about visual consistency, shared state, reference material, and treating creative AI projects like software systems."
publishDate: "2026-05-25"
slug: "prompts-create-pictures-systems-create-books"
topic: "ai"
tags: ["AI", "AI agents", "Image Generation", "Codex", "Creative Workflows"]
draft: false
featured: false
---

I wanted to create a personalized children's picture book as a gift for my friends' daughter.

This sounds like exactly the kind of project AI should be great at. I briefly discussed with ChatGPT how one would create a children's book and then switched to Codex for implementation. I organized everything into folders and files: the story lived in Markdown `story.md`, illustrations for every page were stored in `illustration.md`, and the general `agent.md` would provide the overall illustration style, character descriptions, and technical details (e.g. image size, fonts, etc.).

The first version felt magical.

Within minutes I had a complete children's book that simply had not existed before. The story was heartwarming, the illustrations were beautiful, and the characters immediately resembled the real family. It had exactly the feeling that so many AI demos have today: this should not have been possible five minutes ago.

Then I started looking more closely.

One illustration placed a paddle inside the boat instead of in the water. Another had someone's leg hanging outside the boat. Clothes slightly changed, small details like a picnic blanket changed color. The boat quietly changed shape from page to page. Even the illustration style drifted over time.

<figure class="post-figure post-figure--small">
  <img loading="lazy" decoding="async" src="/post/prompts-create-pictures-systems-create-books/paddle-position-first-attempt.jpg" alt="An early illustration of a family in a rowing boat with a problematic paddle position">
  <figcaption>An early attempt: charming at first glance, but the paddle position did not make physical sense.</figcaption>
</figure>

Nothing was dramatically wrong.

But everything was just inconsistent enough that it stopped feeling like a real book. AI had created the impression of a finished artifact much faster than it could create a coherent one.

## Regression Bugs Everywhere

The first version got me surprisingly far.

The remaining work looked completely different.

Every correction fixed one problem while introducing another.

I would fix the paddle.

The next version changed the boat.

I would fix the boat.

The next version changed the composition.

I would fix the composition.

Someone's leg ended up outside the boat.

<figure class="post-figure post-figure--pair">
  <div class="post-image-grid">
    <img loading="lazy" decoding="async" src="/post/prompts-create-pictures-systems-create-books/leg-outside-boat.jpg" alt="A generated boat scene with the woman's leg hanging over the side">
    <img loading="lazy" decoding="async" src="/post/prompts-create-pictures-systems-create-books/leg-outside-boat-variation.jpg" alt="Another generated boat scene with the woman's leg outside the boat">
  </div>
  <figcaption>Two attempts at fixing the scene, both with the same continuity problem in a different form.</figcaption>
</figure>

Looking back through the generated images almost felt like scrolling through a Git history full of regressions. Every version was an improvement in one area while quietly becoming worse in another.

The project stopped feeling like image generation.

It started feeling like maintaining a software system.

## Better Prompts Helped. They Did Not Solve the Problem.

My first instinct was to improve the instructions. I expanded them, described recurring characters in much more detail, specified clothing, personalities, and illustration style, and even added explicit checks such as:

* Every object must physically interact correctly with the environment.
* Characters must sit inside boats, chairs, beds, etc., not float above or clip through them.
* Hands must properly hold objects like paddles, ropes, books, cups, or treasure maps.
* Paddles must touch the hands and align naturally with arm positions.
* Feet and legs must connect naturally to bodies and rest realistically.
* Avoid floating objects, disconnected limbs, merged fingers, duplicated body parts, or impossible poses.

<figure class="post-figure post-figure--small">
  <img loading="lazy" decoding="async" src="/post/prompts-create-pictures-systems-create-books/impossible-boat-position.jpg" alt="A generated illustration with awkward knees and an impossible seating position in the boat">
  <figcaption>More detailed instructions still produced impossible body and boat geometry.</figcaption>
</figure>

The results improved, and the physical mistakes became less frequent. But every improvement seemed to introduce a new inconsistency somewhere else. The model might preserve the clothing but slightly change the boat. It might keep the boat but drift toward a different illustration style. It could satisfy today's constraints while quietly breaking yesterday's. I added more and more constraints and tests.

<figure class="post-figure post-figure--small">
  <img loading="lazy" decoding="async" src="/post/prompts-create-pictures-systems-create-books/legs-inside-weird-paddles.jpg" alt="A later illustration with everyone inside the boat but physically implausible paddles">
  <figcaption>The legs were finally inside the boat, but the paddles became the next regression.</figcaption>
</figure>

Eventually I realized the problem was not that Codex ignored my instructions, and better instructions would not help.

I was trying to describe an entire visual world with words. But words are often surprisingly ambiguous for visual work.

I was missing shared state. I needed to add references to be more explicit.

A sentence like "sit naturally in a rowing boat" leaves enormous room for interpretation. A single image removes almost all of that ambiguity.

Instead of describing how people should sit naturally in a rowing boat, I showed the model a photograph. Instead of repeatedly describing characters, I created character sheets. Instead of hoping the illustration style remained stable, I collected visual references that represented the look I wanted.

## The Project Needed Better Structure

Although I had started with folders and Markdown files from day one, I gradually realized they were not organized around the problem I was actually solving. The challenge was maintaining consistency.

As the project grew, so did the amount of information that needed to stay synchronized. The story evolved. Illustration prompts changed. I accumulated continuity notes, character descriptions, style references, and corrections from previous iterations. At one point, Codex even started generating infographic-like pages that clearly belonged to an entirely different project.

I needed a clearer structure:

- Technical details (format, etc.) stayed in `agent.md`
- The storyline stayed in its own Markdown file, `story.md`
- Characters had dedicated reference sheets in `character_references.md`
- Recurring objects, such as the boat, had canonical reference images and were added to an object reference sheet, `object_references.md`
- Style references were stored in the `illustration_style` folder
- Illustration prompts stayed in `illustration.md` and referenced the character, object, and style references

That improved the project far more than any individual prompt ever did.

## The Problems Started Feeling Familiar

The more I worked on the book, the more familiar the problems became.

Visual consistency was really a state management problem.

Reference sheets became canonical versions of shared objects.

Continuity issues became bugs.

Editing a single illustration often reminded me of patching production code without running the full test suite. Every local change looked correct, but the overall system slowly became less consistent.

None of these felt like artistic problems. Instead, I ended up rediscovering many of the same principles that make software projects successful: reference data, shared state, canonical assets, review loops, and carefully managing change.

## If I Started Again Today

Generating an artifact is easy. Maintaining consistency across many iterations is the hard part. If I were creating another AI children's book from scratch, this is probably the workflow I would use.

1. Write the story first. Do not generate illustrations until the story is stable.
2. Create character sheets for every recurring character. Include reference images, clothing, and a short description of their personality.
3. Create reference sheets for recurring objects and places. If the family rows the same boat throughout the story, that boat should have a canonical version.
4. Keep the story and illustration prompts separate. The story describes what happens. The illustration prompt describes how to visualize it.
5. Use reference images whenever possible. One photograph often communicates more than several paragraphs of description.
6. Generate one page at a time. Review continuity before moving on to the next page.
7. Treat continuity issues like bugs. If a character changes clothes or the boat changes shape, fix it before generating the next illustration.
8. Start fresh when the project becomes noisy. A clean context is often more valuable than another page of instructions.

None of these ideas are particularly sophisticated.

Together, they made a much bigger difference than switching models or writing longer prompts.

I learned that once an AI project becomes large enough, many of the same engineering principles that help us build software also help us build creative projects with AI.
