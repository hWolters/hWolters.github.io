---
title: Trying to Keep Up With AI
description: My reflections on the seemingly impossible task of keeping up with AI. From prompts and model choice to workflows and the skills that actually make humans better at working with AI.
publishDate: "2026-06-15"
slug: "keeping-up-with-ai-tools"
topic: "ai"
tags: ["AI", "AI agents", "Engineering Management", "Developer Tools", "Workflows"]
draft: false
featured: true
---

I used to know what keeping up with technology meant. In Python or data science, it meant reading release notes, trying a few libraries, following a few people whose judgment I trusted and occasionally reading a paper that seemed relevant. There was always more to learn, but the shape of the work was understandable. Most changes were incremental. The important developments were usually visible. If I fell behind for a few weeks, I could catch up. 

With "AI" it was different: Suddenly there were new models, coding agents, IDEs, browser agents, MCP servers, memories, hooks and entirely new ways to connect AI to repositories, databases, browsers and local files. Every week seemed to bring another major announcement that promised to change everything. I had that uncomfortable feeling that maybe I could not keep up by simply reading more.

That feeling is real. But I think the common reaction to it is wrong. The relevant skill is not tracking every model release, collecting clever prompts or memorizing every new tool. The relevant skill is learning how to design work so that humans and AI agents can succeed together.

That sounds abstract, but the difference is practical. It changes what you pay attention to. Instead of asking, "What is the best model?" or "What is the best prompt?", the more useful question becomes:

> What information, tools, feedback and constraints need to exist before the agent starts working?



## Prompting as a Skill

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

As a Director of Engineering, that shift mattered. I was trying to understand unfamiliar parts of large systems quickly enough to ask better questions, review proposals more effectively and support teams without constantly interrupting them. Prompting helped. But the bigger change was that the agent could finally see more of the work.

## When Model Choice Matters

The next tempting answer was model choice. Like many others, I spent a while reading release notes and switching between GPT, Claude, Gemini, Qwen and whatever had just been released and scored higher on the benchmarks. Sometimes one model really was noticeably better for a specific task. Sometimes I switched because another model had a larger context window, supported a new capability or simply because I had exhausted my token limit somewhere else.

If I am working on something important or something very specific, I still care which model provider I use.  But for many everyday engineering tasks, the difference between a good workflow and a mediocre workflow is often larger than the difference between major models.

I noticed this while building a spaced repetition feature for my Spanish vocabulary app. I asked several models how they would approach the algorithm. I expected different answers. Instead, they mostly converged on the same basic structure with some minor differences.

If I have a very specific or complicated use case, I start a discussion with agents which model could solve my issue best. I often try multiple models and then choose one. But I stopped trying to chase every model release from every model provider to always know which models solve which problems according to some benchmarks without actually having one of these problems to solve. 

## Workflow Improvements Matter

The longer I worked with LLMs, the more i noticed that tool usage and **how** I work with these tools really matter. For frontend work, screenshots became part of the iteration loop. A coding agent can write CSS, but it cannot know whether the page looks right unless something shows it the rendered result. Once browser screenshots became part of the review loop, the agent could catch obvious layout problems before I looked at them.

For database work, connecting the agent to the schema changed the conversation. Without that context, I had to describe tables and columns from memory. With direct access, the agent could inspect the structure, find relationships and ask more specific questions.

For larger refactorings, breaking the work into small reviewable tickets using tk produced better results than asking an agent to "improve the application." A broad request invited broad changes. A narrow request with clear boundaries made the result easier to review and safer to merge.

Even in creative work, the workflow mattered more than prompts and model choice: When I generated illustrations for a children's book, longer prompts helped a little. Character sheets, style references and canonical object references helped much more. 

The major improvements came from changing the system around the agent:

- what it could see
- what tools it could use
- what feedback it received
- how large the task was
- what constraints limited the solution
- how the result would be reviewed

Most of my workflow improvements came from watching experienced people work with AI. I learn a lot by seeing how they use it, what they use it for and where they apply human judgement. I try to take some of the operational habits that seem usful to me, for example:

- How do they break a large task into smaller pieces?
- When do they interrupt an agent instead of letting it continue?
- Which parts do they always review manually?
- Which checks have they automated?
- When do they start a fresh conversation because the existing context has become noisy?
- How do they decide what the agent is allowed to change?



## This Is Why AI Work Feels Like Management

After several months, working with AI agents started to feel less like learning a new programming tool and more like practicing a strange form of management. As an engineering manager and director of engineering, I rarely spend my day doing every task myself. I define goals, provide context, break large projects into manageable pieces, review progress, catch misunderstandings early and decide whether the result is good enough or needs another iteration. That is very close to the shape of effective AI work.

The analogy has limits. AI agents do not need motivation, coaching, trust, psychological safety or career development goals. They are not people and they can sound very confident while being completely wrong. We still need the human in the loop. The human still has to do the hard parts:

- Define the goal clearly.
- Provide enough context to make good decisions.
- Break large work into reviewable pieces.
- Give actionable feedback.
- Decide what should not be delegated.
- Build checks that catch predictable mistakes.
- Review the output with judgment instead of hope.

These are management skills applied to an agent. You can only set useful instructions and constraints if you understand the system. You can only review the result if you know what good looks like. You can only decide what not to delegate if you understand the risk.

That is why the "AI will make engineering management less relevant" story feels backwards to me. AI makes delegation cheaper and makes giving tasks and setting goals and result verification more important.

## A Better Way To Keep Up

If someone asked me how to keep up with AI while only spending a few hours each week, I would not tell them to follow every model benchmark. I would suggest picking one environment, whether that is Codex, Claude Code, Cursor or something similar, and using it to build real projects. The goal is to become "fluent" with one environment that you can notice where the workflow changes.

Then I would use a simple checklist before giving important work to an agent:

1. Goal: What should be true when this is done?
2. Context: What files, schemas, screenshots, logs or examples does the agent need?
3. Tools: What can the agent inspect or operate directly?
4. Constraints: What should it avoid changing?
5. Feedback: How will it know whether the result is wrong?
6. Review: What must a human still verify?

That checklist sounds basic. But most bad AI work I have seen fails one of those points. The goal is vague. The context is missing. The task is too large. The agent cannot run the relevant checks. The human review happens too late. Or nobody decided which parts required human judgment.

The models will continue to improve. The tools aound these models will continue to change. New workflows will emerge that will make your work even more efficient. I increasingly suspect that the lasting skill is not keeping up with every announcement. It is learning how to design work so that both humans and AI agents can do their best work together.
