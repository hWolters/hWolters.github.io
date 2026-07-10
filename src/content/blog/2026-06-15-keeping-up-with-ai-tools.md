---
title: "Keeping up with AI Tools"
description: "As a developer, I used to know how to keep up with technology. AI changed that."
publishDate: "2026-06-15"
slug: "keeping-up-with-ai-tools"
topic: "ai"
tags: ["AI", "AI agents", "Engineering Management", "Developer Tools", "Workflows"]
draft: false
featured: true
---

## Keeping Up with AI

I used to know what keeping up with technology meant. In Python or data science, it meant reading release notes, trying a few libraries, following a few people whose judgment I trusted and occasionally reading a paper that seemed relevant. There was always more to learn, but the shape of the work was understandable. Most changes were incremental. The important developments were usually visible. If I fell behind for a few weeks, I could catch up.

AI broke that rhythm.

Suddenly there were new models, coding agents, IDEs, browser agents, MCP servers, memories, hooks and entirely new ways to connect AI to repositories, databases, browsers and local files. Every week seemed to bring another announcement that promised to change everything. I had that uncomfortable feeling that maybe I could not keep up by simply reading more.

That feeling is real. But I think the common reaction to it is wrong. The relevant skill is not tracking every model release, collecting clever prompts or memorizing every new tool. The relevant skill is learning how to design work so that humans and AI agents can succeed together.

That sounds abstract, but the difference is practical. It changes what you pay attention to. Instead of asking, "What is the best model?" or "What is the best prompt?", the more useful question becomes:

> What information, tools, feedback and constraints need to exist before the agent starts working?

That question has improved my results more than most individual model releases.

## Prompting Was The First Tempting Answer

My first AI workflow looked like many people's first workflow. I copied a function into ChatGPT, asked a question, copied the answer back into my editor and repeated the process whenever I got stuck.

It was useful, but it was still basically a better Stack Overflow. The AI answered isolated questions. I remained responsible for the system, the context, the constraints and the judgment.

So it was natural to think prompting was the skill to master. Better wording produced better answers. More context produced better answers. Clearer constraints produced better answers. That lesson is still true. But prompting has a ceiling.

A brilliant prompt cannot compensate for missing repository context. The best instruction cannot make a model reason about a database schema it cannot inspect. A carefully worded request cannot tell an agent whether a frontend change actually looks correct in the browser. Once the work becomes larger than a single question, the prompt is only one part of the system around the agent.

That became obvious when coding agents started working directly inside repositories. The useful questions changed from:

> Why does this function fail?

to questions that sounded much closer to the ones I would ask an experienced engineer:

- Where is this problem already solved?
- Which parts of the system make this change risky?
- What should I understand before touching this code?
- What tests or checks would tell us whether this worked?

As a Director of Engineering, that shift mattered. I was not trying to replace developers or have AI implement every feature. I was trying to understand unfamiliar parts of large systems quickly enough to ask better questions, review proposals more effectively and support teams without constantly interrupting them. Prompting helped. But the bigger change was that the agent could finally see more of the work.

## Model Choice Was The Second Tempting Answer

The next tempting answer was model choice. Like many others, I spent a while switching between GPT, Claude, Gemini, Qwen and whatever had just been released. Sometimes one model really was noticeably better for a specific task. Sometimes I switched because another model had a larger context window, supported a new capability, or simply because I had exhausted my token limit somewhere else.

Those differences are real. If I am working on something important, I care which model I use. Model quality matters for hard reasoning, architecture, security-sensitive work and tasks where a weak answer can quietly create a lot of damage.

But for many everyday engineering tasks, the difference between a good workflow and a mediocre workflow is often larger than the difference between major models.

I noticed this while building a spaced repetition feature for my Spanish vocabulary app. I asked several models how they would approach the algorithm. I expected sharply different answers. Instead, they mostly converged on the same basic structure: increase review intervals after successful recalls, shorten them after failures, track due dates and account for repeated mistakes.

If I asked in isolation, I got a generic spaced repetition explanation. If the agent could inspect my existing data model, current vocabulary records, UI flow and test setup, the answer became much more useful. It could tell me where the feature should live, what migration was needed, how existing review history would be affected and what edge cases I should test. The model still mattered. But the workflow changed the quality of the question.

## The Real Unit Of Improvement Is The Workflow

Once I started looking for it, the pattern appeared everywhere.

For frontend work, screenshots became part of the iteration loop. A coding agent can write CSS, but it cannot know whether the page looks right unless something shows it the rendered result. Once browser screenshots became part of the review loop, the agent could catch obvious layout problems before I looked at them.

For database work, connecting the agent to the schema changed the conversation. Without that context, I had to describe tables and columns from memory. With direct access, the agent could inspect the structure, find relationships and ask more specific questions.

For larger refactorings, breaking the work into small reviewable tickets produced better results than asking an agent to "improve the application." A broad request invited broad changes. A narrow request with clear boundaries made the result easier to review and safer to merge.

Even in creative work, the same lesson held. When I generated illustrations for a children's book, longer prompts helped a little. Character sheets, style references and canonical object references helped much more. The problem was not only description. It was shared state.

None of these improvements came from a magic prompt. They came from changing the system around the agent:

- what it could see
- what tools it could use
- what feedback it received
- how large the task was
- what constraints limited the solution
- how the result would be reviewed

## Watching People Work Beats Reading Feature Lists

I still read release notes and product announcements. They help me understand what capabilities are becoming available. But most of my practical improvement has come from watching experienced people use AI tools, not from reading about the tools themselves.

Documentation tells me what a feature does. Watching someone work shows me why they use it, when they use it and, just as importantly, when they do not.

I pay much less attention to the exact prompts than I used to. Instead, I watch the operational habits:

- How do they break a large task into smaller pieces?
- When do they interrupt an agent instead of letting it continue?
- Which parts do they always review manually?
- Which checks have they automated?
- When do they start a fresh conversation because the existing context has become noisy?
- How do they decide what the agent is allowed to change?

Those habits are hard to learn from a feature announcement. They are also much more durable than most feature announcements.

## This Is Why AI Work Feels Like Management

After several months, working with AI agents started to feel less like learning a new programming tool and more like practicing a strange form of management.

As an engineering manager and director of engineering, I rarely spend my day doing every task myself. I define goals, provide context, break large projects into manageable pieces, review progress, catch misunderstandings early and decide whether the result is good enough or needs another iteration.

That is very close to the shape of effective AI work.

The analogy has limits, and they matter. AI agents do not need motivation, coaching, trust, psychological safety or career development. They are not people. They can sound confident while being completely wrong. They do not deserve trust in the human sense; they require verification.

But the overlap is still useful because the hard part is often not typing the instruction. The hard part is designing the task:

- Define the goal clearly.
- Provide enough context to make good decisions.
- Break large work into reviewable pieces.
- Give actionable feedback.
- Decide what should not be delegated.
- Build checks that catch predictable mistakes.
- Review the output with judgment instead of hope.

These are management-shaped skills applied to technical work. They do not replace engineering skill. They depend on it. You can only set useful constraints if you understand the system. You can only review the result if you know what good looks like. You can only decide what not to delegate if you understand the risk.

That is why the "AI will make engineering management less relevant" story feels backwards to me. AI makes delegation cheaper. That makes task design and verification more important, not less.

## A Better Way To Keep Up

If someone asked me how to keep up with AI while only spending a few hours each week, I would not tell them to follow every model benchmark.

I would suggest picking one serious environment, whether that is Codex, Claude Code, Cursor or something similar, and using it to build real projects. The goal is not to become an expert in every tool. It is to become fluent enough with one environment that you can notice where the workflow changes.

Then I would use a simple checklist before giving important work to an agent:

1. Goal: What should be true when this is done?
2. Context: What files, schemas, screenshots, logs or examples does the agent need?
3. Tools: What can the agent inspect or operate directly?
4. Constraints: What should it avoid changing?
5. Feedback: How will it know whether the result is wrong?
6. Review: What must a human still verify?

That checklist sounds basic. But most bad AI work I have seen fails one of those points. The goal is vague. The context is missing. The task is too large. The agent cannot run the relevant checks. The human review happens too late. Or nobody decided which parts required human judgment.

The models will continue to improve. The tools will continue to change. New workflows will emerge that make today's best practices look incomplete.

But I increasingly suspect that the lasting skill is not keeping up with every announcement. It is learning how to design work so that both humans and AI agents can do their best work together.
