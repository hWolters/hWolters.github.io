---
title: "Keeping up with AI Tools"
description: "As a developer, I used to know how to keep up with technology. AI broke that."
publishDate: "2026-06-15"
slug: "keeping-up-with-ai-tools"
pillar: "leadership-management"
tags: ["AI", "AI agents", "Engineering Management", "Developer Tools", "Workflows"]
draft: false
featured: true
---

# Keeping Up with AI

As a developer, I used to know how to keep up with technology.

In Python or data science, it meant reading release notes, trying a few new libraries and occasionally diving into a paper that seemed relevant. There was always more to learn, but it felt manageable because the changes were incremental and the important developments were relatively easy to identify.

AI broke that rhythm.

Suddenly there were new models, coding agents, IDEs, browser agents, MCP servers, memories, hooks and entirely new ways to connect AI to repositories, databases, browsers and local files. Every week seemed to bring another announcement that promised to change everything and for the first time in my career I genuinely felt like it might be impossible to keep up.

## First I thought prompting was the skill to master

Like many people, my first workflow was fairly simple. I copied a function into ChatGPT, asked a question, copied the answer back into my editor and repeated the process whenever I got stuck.

It was genuinely useful, but it still felt like a better Stack Overflow. The AI answered isolated questions, while I remained responsible for understanding the bigger picture.

The first real shift happened when coding agents started working directly inside repositories and context windows became large enough to reason about an entire codebase instead of a single function.

Instead of asking *"Why doesn't this function work?"*, I found myself asking questions that were much closer to the ones I would ask an experienced engineer:

- Where is this problem already solved?
- Why is this migration difficult?
- Which parts of the system make this feature risky?
- What should I understand before I start changing this code?

As a Director of Engineering, that turned out to be surprisingly valuable. I was not trying to replace developers or have AI implement every feature. I was trying to understand unfamiliar parts of large systems quickly enough to ask better questions, review proposals more effectively and support teams without constantly interrupting them.

## Then I thought choosing the best model is the relevant skill!

Like many others, I spent quite a while switching between GPT, Claude, Gemini, Qwen and whatever had just been released. Sometimes one model really was noticeably better for a specific task. Sometimes I switched because another model had a larger context window, supported a new capability, or simply because I had exhausted my token limit somewhere else.

Those differences are real and they still matter. If I am working on something important, I absolutely care which model I am using. But for many of the engineering tasks I was doing every day, the difference between a good workflow and a mediocre workflow was often larger than the difference between the major models themselves.

One small example was implementing a spaced repetition algorithm for my Spanish vocabulary app. I asked several different models how they would approach it, expecting very different answers. Instead, they all converged on roughly the same solution: increase review intervals after successful recalls, shorten them after failures, track due dates and account for repeated mistakes.

The interesting question stopped being:

> Which model gives the best answer?

Instead, it became:

> Have I structured the work so that almost any good model has enough information to succeed?

## The skill is prompting, tools and workflow!

None of this means that prompting suddenly became irrelevant.

Writing clear instructions is still a skill. Giving good context, defining constraints, explaining what success looks like and asking for the right output format consistently leads to better results than vague requests. Likewise, the growing ecosystem of AI tools genuinely expands what an agent can do. Knowing when to use browser automation, an MCP server, repository access, screenshots, or local files changes the kinds of problems an agent can realistically solve.

But I slowly realized that prompts, models and tools are only individual pieces of a much larger system.

A brilliant prompt cannot compensate for missing context. The best model in the world cannot reason about a database schema it cannot see. And even the most capable coding agent struggles when the task itself is poorly structured.

The biggest improvements in my own projects almost never came from finding a magic prompt or switching to the newest model. They came from improving the workflow around the agent.

For frontend work, screenshots became part of every iteration so the agent could review its own changes before I looked at them. For database work, connecting a Postgres MCP server meant I no longer had to remember every table and column before asking useful questions. For larger refactorings, breaking work into small reviewable tickets consistently produced better results than asking an agent to "improve the application." Even when generating illustrations for a children's book, keeping character sheets and reference images produced far better results than trying to describe everything in one enormous prompt.

Looking back, I realized that I had quietly stopped asking:

> How should I prompt the model?

and started asking:

> What information, tools, feedback and constraints should exist before the agent even starts?

That question has had a much bigger impact on my results than any individual model release.

Watching people work taught Me more than release notes. I still enjoy reading release notes and product announcements because they help me understand what new capabilities are becoming available. But if I think about where most of my practical improvements have come from, it is probably from watching experienced people use these tools rather than reading about them.

Documentation tells me what a feature does. Watching someone work shows me why they use it, when they use it and just as importantly, when they don't.

I pay much less attention to the prompts themselves than I used to. Instead, I find myself observing how people structure their work. How do they break a large task into smaller ones? When do they interrupt an agent instead of letting it continue? Which parts do they always review manually? Which checks have they automated? When do they deliberately start a fresh conversation because the existing context has become noisy?

Those operational habits have probably improved my own workflow more than any individual prompt ever has. And I started to notice one thing:

## Working with AI started to feel surprisingly similar to Management

After several months, something started feeling strangely familiar. Working with AI agents reminded me less of programming and much more of management.

As an engineering manager and a director of engineering I rarely spend my day doing every task myself. Instead, I define goals, provide context, break large projects into manageable pieces, review progress, try to catch misunderstandings early and decide whether the result is good enough or needs another iteration.

Of course, the analogy has limits. AI agents do not need motivation, coaching, trust or career development and they can sound remarkably confident while being completely wrong. AI is still a tool, not a human being.

Yet many of the skills needed overlap with management skills:

- Be explicit about expectations
- Give actionable feedback
- Provide enough context to make good decisions
- Break large pieces of work into smaller reviewable units
- Define clear goals
- Know which work should never be delegated
...

Those skills consistently produced better outcomes than trying to write increasingly clever prompts.

## The relevant skill is learning how to design work so that both humans and AI agents can do their best work together.

If someone asked me how I keep up with AI while only spending a few hours each week, I would not tell them to follow every model release or benchmark.

Instead, I would suggest picking one environment, whether that is Codex, Claude Code, Cursor or something similar and using it to build real projects. The goal is not to become an expert in every new capability. It's to become fluent enough with one set of tools that you begin to notice where they genuinely change the way you work.

I would also spend time watching experienced people use these tools. Not because they have secret prompts, but because they have developed habits that are difficult to learn from documentation alone. Watching how someone structures a problem, reviews an agent's work or decides when to intervene often teaches much more than copying the exact prompt they happened to type.

Finally, I would spend less time trying to memorize features and more time practicing the skills that remain valuable regardless of which model happens to be leading the benchmarks.

- Can you clearly define a goal?
- Can you provide the context someone needs to do good work?
- Can you break a complex project into smaller pieces that can be reviewed independently?
- Can you recognize which tasks should be delegated and which ones require human judgment?

Those are rather management skills, not technical skills. The models will continue to improve. The tools will continue to change. New workflows will emerge that make today's best practices look outdated.

But I increasingly suspect that the lasting skill is not keeping up with every model announcement. 

Ironically, the biggest thing AI has taught me over the past year is not how to write better prompts. It's why good management will continue to matter.