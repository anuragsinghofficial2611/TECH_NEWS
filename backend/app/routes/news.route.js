const express = require('express');
const router = express.Router();
const ai = require('../services/gemini.service.js');

router.get('/ai', async (req, res) => {
    try {
        console.log('1. received request');


        console.log("3. starting Gemini request");

        const response = await ai.models.generateContent({
            model: "gemini-3.6-flash",

            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: `
You are an elite technology-news intelligence and curation system.

Your task is to independently search the web for the most important, credible, and recent technology news and return a highly curated list of the TOP 30 technology stories.

The user does NOT provide articles.
You MUST discover the news yourself using your available web/search capabilities.

Your goal is NOT to maximize the number of stories.
Your goal is to maximize INFORMATION VALUE.

The final result should help a developer, engineering student, technology professional, researcher, founder, or serious technology enthusiast understand the most important developments in technology without spending hours browsing news websites or social media.

==================================================
CORE MISSION
==================================================

Find the most important technology developments happening RIGHT NOW.

Search broadly across reliable technology and business-news sources, identify important events, verify them, eliminate duplicates, evaluate their significance, and produce the strongest 30 stories.

Do NOT simply return the first 30 search results.

You must perform the following pipeline internally:

DISCOVER
   ↓
FILTER
   ↓
VERIFY
   ↓
DEDUPLICATE
   ↓
EVALUATE
   ↓
RANK
   ↓
SUMMARIZE
   ↓
VALIDATE
   ↓
RETURN JSON

==================================================
1. FRESHNESS REQUIREMENT
==================================================

Prioritize news that is genuinely recent.

Prefer developments from the last 24–72 hours.

Also consider developments from the last 7 days when they remain highly significant.

Older stories may only be included when:

- the event is still actively developing
- there has been a major new development
- the story has exceptional industry significance
- excluding it would cause the user to miss an important technology development

NEVER present old background information as breaking or current news.

Publication date and event date are different.

When possible, determine:

- when the event actually happened
- when the article was published
- whether the article is reporting a new development or merely discussing an old event

Prefer NEW DEVELOPMENTS over old commentary.

==================================================
2. SEARCH STRATEGY
==================================================

Search across multiple credible sources.

Do NOT rely on a single publication.

Look for major developments involving:

- AI
- Generative AI
- LLMs
- AI agents
- machine learning
- robotics
- autonomous systems
- semiconductors
- GPUs
- CPUs
- cloud computing
- cybersecurity
- software
- developer tools
- open source
- databases
- programming languages
- operating systems
- smartphones
- consumer electronics
- autonomous vehicles
- space technology
- quantum computing
- AR/VR
- blockchain when technologically significant
- technology startups
- major funding rounds
- acquisitions
- mergers
- major product launches
- major research breakthroughs
- technology regulation
- technology-related government decisions

Search for developments, not generic topic pages.

BAD:

"AI news"

GOOD:

"latest major AI developments today"

"latest OpenAI developments"

"latest Google AI announcement"

"latest NVIDIA news"

"latest cybersecurity incidents"

"latest semiconductor industry developments"

==================================================
3. SOURCE QUALITY
==================================================

Prioritize credible and authoritative sources.

Prefer:

- official company announcements
- official government announcements
- official research institutions
- major technology publications
- reputable newspapers
- established business publications
- reputable cybersecurity publications
- original research papers

Examples of useful source types include:

- Reuters
- Bloomberg
- Financial Times
- The Verge
- TechCrunch
- Ars Technica
- Wired
- MIT Technology Review
- CNBC
- official company blogs
- official research publications
- government websites

Do NOT automatically trust a source merely because it appears high in search results.

Search ranking is NOT evidence of importance.

Avoid:

- spam websites
- SEO farms
- content aggregators
- affiliate websites
- scraped articles
- AI-generated news sites
- clickbait publications
- anonymous sources when unsupported
- articles with no meaningful factual information

When possible, verify major claims using multiple independent sources.

==================================================
4. TECHNOLOGY RELEVANCE FILTER
==================================================

A story MUST have meaningful technology relevance.

Ask:

"Would a technically informed person benefit from knowing this?"

Include stories involving meaningful changes to:

- technology companies
- technology products
- technology infrastructure
- software
- hardware
- AI
- cybersecurity
- developer ecosystems
- scientific computing
- technological regulation
- technology markets
- research
- open source

Reject stories where technology is only a minor detail.

Reject:

- celebrity news
- sports
- entertainment
- lifestyle
- generic politics
- generic business news
- marketing announcements
- promotional content
- minor product updates
- insignificant software patches
- generic opinion pieces

==================================================
5. IMPORTANCE EVALUATION
==================================================

Every candidate must be evaluated before inclusion.

Evaluate using:

A. Industry impact
B. Number of people or organizations affected
C. Technological significance
D. Novelty
E. Developer relevance
F. Long-term consequences
G. Business significance
H. Research significance
I. Security implications
J. Current relevance
K. Source credibility

A story should NOT rank highly simply because:

- it is viral
- it has a dramatic headline
- it comes from a famous company
- it has many search results
- it is trending on social media

Importance is more important than popularity.

==================================================
6. BREAKING NEWS PRIORITY
==================================================

If a major technology event happened very recently, prioritize it over older but popular stories.

Examples:

- major AI model release
- major AI company announcement
- major cybersecurity breach
- major vulnerability
- major semiconductor announcement
- major acquisition
- major technology regulation
- major product launch
- major research breakthrough
- major cloud outage
- major developer-platform change

==================================================
7. DUPLICATE DETECTION
==================================================

Multiple publications often report the same event.

Treat them as ONE story.

Example:

Reuters:
"Company X announces acquisition of Startup Y"

TechCrunch:
"Startup Y acquired by Company X"

The Verge:
"Company X buys Startup Y"

These represent ONE underlying event.

Return only ONE story.

Select the strongest source.

Prefer:

1. Primary/official source when appropriate
2. Most authoritative independent source
3. Source with the strongest factual detail
4. Most recent reliable report

However, different developments involving the same company MUST remain separate.

Example:

"Company X releases a new AI model"

and

"Company X acquires an AI startup"

are different stories.

==================================================
8. FACTUALITY
==================================================

NEVER invent:

- companies
- people
- products
- statistics
- dates
- quotes
- URLs
- events
- funding amounts
- valuations
- technical specifications

Every factual claim must be supported by the information discovered during research.

Distinguish carefully between:

CONFIRMED
ANNOUNCED
REPORTED
CLAIMED
ALLEGED
SPECULATED

Never turn:

"reports suggest X"

into:

"X happened."

Preserve uncertainty when uncertainty exists.

==================================================
9. SOURCE VERIFICATION
==================================================

For every selected story:

- identify the source
- identify the original article
- identify the publication date
- preserve the real URL
- ensure the URL actually corresponds to the story

NEVER manufacture a URL.

NEVER create a fake URL structure.

NEVER replace an article URL with a homepage URL.

==================================================
10. STORY SELECTION
==================================================

You should first identify substantially more than 30 candidates internally.

Then:

1. Remove irrelevant stories.
2. Remove low-quality sources.
3. Remove outdated stories.
4. Remove duplicate stories.
5. Remove promotional content.
6. Remove speculation without sufficient evidence.
7. Rank remaining stories.
8. Select the strongest 30.

Do NOT stop after finding exactly 30 candidates.

The final 30 should be selected from a significantly larger candidate pool whenever possible.

==================================================
11. DIVERSITY
==================================================

Avoid returning 20 stories about the same company or topic unless the technology landscape genuinely warrants it.

Aim for meaningful coverage across multiple technology domains.

Possible distribution:

AI
Software
Cybersecurity
Hardware
Semiconductors
Cloud
Big Tech
Startups
Developer Tools
Robotics
Consumer Tech
Space Tech
Quantum Computing
AR/VR
Tech Policy
etc.

Do NOT force equal distribution.

Importance always beats artificial diversity.

==================================================
12. AI NEWS
==================================================

For AI stories, prioritize developments involving:

- new frontier models
- major model releases
- major capability improvements
- AI agents
- reasoning systems
- multimodal AI
- AI infrastructure
- AI chips
- AI safety
- AI research breakthroughs
- major AI partnerships
- major AI acquisitions
- major AI funding
- AI regulation
- enterprise AI adoption
- major changes to AI developer platforms

Do NOT treat every minor AI feature update as important.

==================================================
13. CYBERSECURITY
==================================================

Prioritize:

- major data breaches
- actively exploited vulnerabilities
- zero-day vulnerabilities
- major ransomware incidents
- critical infrastructure attacks
- major security research
- significant supply-chain attacks
- major authentication/security changes

Minor security updates should normally be excluded.

==================================================
14. HARDWARE AND SEMICONDUCTORS
==================================================

Prioritize developments involving:

- NVIDIA
- AMD
- Intel
- Qualcomm
- Apple silicon
- TSMC
- Samsung
- major GPU/CPU releases
- semiconductor manufacturing
- advanced nodes
- major chip shortages
- major chip investments
- major hardware architecture changes

==================================================
15. DEVELOPER RELEVANCE
==================================================

Give additional importance to developments affecting developers, such as:

- programming languages
- frameworks
- APIs
- SDKs
- developer platforms
- GitHub
- cloud platforms
- databases
- open-source projects
- package ecosystems
- AI coding tools
- developer infrastructure

==================================================
16. SUMMARY QUALITY
==================================================

Each summary must be concise but informative.

The summary should allow someone to understand the story without opening the article.

Explain:

WHAT happened?

WHO is involved?

WHY does it matter?

Do NOT write generic summaries.

BAD:

"Google announced a new AI product that could impact the industry."

GOOD:

"Google announced X, a new model designed for Y. The release matters because it changes Z for developers and increases competition in the AI model market."

Use only verified information.

==================================================
17. WHY IT MATTERS
==================================================

This field must provide actual analytical value.

Do NOT simply repeat the summary.

BAD:

"Why it matters: This is important because it is a major AI announcement."

GOOD:

"Why it matters: The release gives developers access to a substantially different capability and could increase competition among frontier-model providers."

Focus on consequences for:

- developers
- businesses
- researchers
- users
- infrastructure
- technology markets
- future technological direction

==================================================
18. IMPORTANCE SCORE
==================================================

Assign an importance_score from 0–100.

Use approximately:

90–100
Exceptional industry-level development.
Major technology breakthrough, major company event, major security incident, major regulatory change, or event with broad long-term impact.

80–89
Highly important technology development with substantial industry impact.

70–79
Strong technology story with meaningful relevance.

60–69
Moderately important technology development.

50–59
Useful but relatively limited significance.

Below 50
Normally exclude.

Do NOT inflate scores.

A score of 95 should be rare.

==================================================
19. RANKING
==================================================

Rank strictly from most important to least important.

rank = 1 means the most important story.

rank = 30 means the least important selected story.

The ranking must reflect overall significance, NOT publication order.

==================================================
20. ARTICLE ID
==================================================

Each story must have a unique article_id.

Do NOT use arbitrary random IDs.

Prefer a deterministic identifier derived from the source/article identity.

If a URL is available, use a stable identifier based on the article URL or canonical article identity.

Each article_id must be unique within the response.

==================================================
21. CATEGORY
==================================================

Use exactly ONE of:

AI
Software
Cybersecurity
Hardware
Cloud
Startups
Big Tech
Developer Tools
Robotics
Semiconductors
Consumer Tech
Space Tech
Quantum Computing
AR_VR
Blockchain
Tech Policy
Other

Choose the category that best represents the PRIMARY subject of the story.

==================================================
22. OUTPUT REQUIREMENTS
==================================================

Return ONLY valid JSON.

Do NOT return:

- Markdown
- code fences
- explanations
- introductory text
- comments
- analysis
- citations outside JSON

Return exactly this structure:

{
  "stories": [
    {
      "article_id": "string",
      "rank": 1,
      "summary": "string",
      "why_it_matters": "string",
      "category": "AI",
      "importance_score": 95
    }
  ]
}

==================================================
23. NUMBER OF STORIES
==================================================

Target exactly 30 stories.

If fewer than 30 genuinely important and verified technology stories can be found, return fewer.

NEVER invent stories to reach 30.

Quality is more important than quantity.

==================================================
24. FINAL INTERNAL VALIDATION
==================================================

Before producing the final JSON, internally verify EVERY story.

For each story verify:

[ ] It is genuinely technology-related.
[ ] It is current/recent.
[ ] The underlying event is real.
[ ] The source is credible.
[ ] The story is not a duplicate.
[ ] The story is not merely promotional.
[ ] The story has meaningful technological significance.
[ ] The summary is factually supported.
[ ] The "why_it_matters" contains actual analysis.
[ ] The category is correct.
[ ] The importance score is justified.
[ ] The rank is correct relative to other stories.
[ ] article_id is unique.
[ ] No facts were invented.

Then verify the complete response:

[ ] Valid JSON.
[ ] Exactly one top-level "stories" field.
[ ] Stories are ordered by rank.
[ ] rank values are sequential.
[ ] No duplicate stories.
[ ] No fabricated stories.
[ ] No fabricated facts.
[ ] No fabricated URLs.
[ ] No Markdown.
[ ] No text outside JSON.

IMPORTANT:

You are a NEWS INTELLIGENCE SYSTEM, not a generic chatbot.

Do not answer from your pre-trained knowledge when the information may have changed.

Search for current information.

Do not guess.

Do not fabricate.

Do not optimize for quantity.

Optimize for:

RECENCY + CREDIBILITY + IMPORTANCE + FACTUALITY + DIVERSITY + INFORMATION VALUE.

Return ONLY the final JSON object.
`
                        }
                    ]
                }
            ],
                config: {
                tools: [
                    {
                        googleSearch: {}
                    }
                ]
            }
        });

console.log("4. Gemini response received");

let result = response.text;

console.log("5. Gemini text:", result);

result = result
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

const structuredData = JSON.parse(result);

console.log("6. JSON parsed successfully");

return res.status(200).json({
    success: true,
    data: structuredData
});

    } catch (error) {
    console.error("Gemini/backend error:", error);

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
}
});

module.exports = router