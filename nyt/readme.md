---
purpose: frontend engineering
---

# New York Times

**Time period:** June 2020 – Aug 2020

**Role:** Software Engineering Intern

**Keywords:** React, Backbone, Rails

I interned on the frontend team of NYT Cooking! I made major improvements to the site footer, both visually and under the hood:

1. Implement design updates
2. Display on Recipe Box page
3. Replatform to React


## Implement design updates
- before
- after


## Display on Recipe Box page
This was an interesting interaction to think about; the recipe box interface (with the fixed sidebar and the recipe cards) was designed to be a full screen experience so there was nowhere to fit the footer. As a result, I ended up using JavaScript to detect when to shift up the sidebar to make space for the footer.
- animation


## Replatform to React
My biggest project this summer was converting this footer to a React component!

The Cooking frontend system is currently a mix of Ruby templates, Backbone.js views, and React components. When updating a piece of the frontend, the engineer first has to figure out what framework that particular UI is written in! The footer was a mix of all of these. It’s also not just a static component, since it also contained the logic for the CCPA opt out notice (the "Do not sell my personal information" stuff).

Throughout this process, I learned a lot about how to structure components, work with a Redux store which I’ve never done before, and how server-side rendering works.

I was also responsible for updating unit tests and functional tests related to the footer.


# Learnings
- getting better at reaching out to people
- reviewing PRs
- recipes
