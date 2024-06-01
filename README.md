# Elite Power Rankings

This is the frontend for the Elite Power Rankings project. The backend is at https://github.com/johnestes4/aew-backend.

It's an Angular application that queries the backend API, lightly processes the returned data, and displays the current AEW champions and the top ten ranked for men's, women's, and tag team divisions.

Power levels are determined through science. More specifically, Elo ratings (https://en.wikipedia.org/wiki/Elo_rating_system), modified by win/loss streaks and a decay system that degrades each match's contribution to an overall score over time. As it's currently balanced, the rankings skew heavily towards recent results - as intended - but still allows wrestlers with long histories of winning to more easily maintain a position at the top.

Right now there's just the main rankings page and an admin page I use to add new shows to the database and edit wrestlers' information.

This is a backend-heavy project, but I'll get around to more frontend features sooner or later - visible win/loss records are high on my list.

The alpha is currently hosted on https://aew-frontend.onrender.com/. I'm not paying Render yet, so it'll probably take a minute to spin up the back and front ends before it actually lets you see anything. Once I get a domain and feel confident everything's working without bugs I'll upgrade the instances and it'll become more usable.
