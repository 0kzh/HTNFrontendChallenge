# Hack the North Frontend Challenge

## Installation
To get running with the repository, run
```bash
npm install
```

And then run

```bash
npm run start
```

## Features
- Custom Gantt chart component for displaying events
- Ability to filter events by type
- Auth-protected events
- Links for specific events
- Compatible with multiple timezones
- Responsive and mobile compatible
## Design Decisions
### Technology
These are the dependencies I used:

- React and TypeScript
- graphql-request
- Heroicons
- Styled Components
- moment.js

I decided to use graphql-request because it's more lightweight than Apollo and gets the job done.

I chose Heroicons because it fits well with the design aesthetic I was going for - I also just really like rounded icons :)

Styled Components is something I always use because it prevents the main component from being cluttered with CSS styles, provides a layer of abstraction, and you can easily build atomic components that will only be used in a single file.

Moment.js is used for timezone conversions and date calculations.

### Displaying Events
Initially I was considering a couple of options to display the event data.

1. Using a list view of cards
2. Using a standard calendar view (like the current my.hackthenorth.com)

I wanted to get a better sense of what the data looked like so I started by running a [python script](https://github.com/0kzh/HTNFrontendChallenge/blob/master/times.py) that pretty prints the events in the form of a table. This made me realize that a lot of events overlapped, and displaying that would be a challenge. After more thought, I decided to go with

3. A [Gantt chart](https://en.wikipedia.org/wiki/Gantt_chart)

Stacking events vertically fixes the clutter of the calendar view and also make it easier to use on mobile (we can now scroll instead of trying to click on independent events). I took inspiration from Notion's timeline view when working on my implementation.

The Gantt chart component itself is built off of CSS grids which seemed like the most intuitive way to layout such events, although it proved to be a challenge since I'm pretty new to them and usually just use flexbox. I ended up getting it to work by having a column for each half-hour and having helper functions that determine the start column and span for each event.

There was also the problem of overlapping events, which needed to be displayed on different rows. I added a new property, `row`, to the `TEvent` type and dynamically generated it by [tracking the events on a heap](https://github.com/0kzh/HTNFrontendChallenge/blob/26de56133151fcd06e2d51ac58e7da82176c9d2c/src/util/helper.ts#L130) and using the heap size as the row (this idea actually came from a [Leetcode Problem](https://www.lintcode.com/problem/meeting-rooms-ii/) - who would've thought?)

Finally, the last issue was continuity. I noticed that some events were from January 12/13 and others were on Nov 30/31. Since there was a big gap between the two, scrolling between them didn't make much sense so I split them up into "Gear Up" and "Hack the North" categories that is similar to the existing implementation. I added arrows to move between dates and disabled them at the edges to prevent showing days with no events.
### Login

I'm not sure if we were supposed to build an entire login screen, but I already spent a lot of time on displaying the events so I decided to keep this simple. It's just a button that updates LocalStorage. 

### Event Links
Since this is the only page, I thought React Router would be overkill. JavaScript has a [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) interface which I used instead. I just read the URL on load and display the appropriate event if `event` is set.

### Accessibility
The app is compatible in every timezone 🎉

One thing I'm proud of is making this app to be fully responsive and easy to use on mobile. The event filters are grouped under [a component](https://github.com/0kzh/HTNFrontendChallenge/blob/master/src/components/common/DynamicFlexLayout.tsx) that changes its layout depending on the user's device. Modals and everything else play nicely too.

I was also building this on my laptop and came to realize that horizontal scrolling would be a problem with a mouse, so I made the horizontal scrollbar permanently visible.


## Improvements
- Making the entire calendar to be draggable by mouse.
- Having an sweeping line indicator on the calendar showing current time. It would also be nice to automatically scroll to the current time, instead of defaulting to midnight.
- Centralizing colors inside a separate file
- Having a "view" toggle that allows users to switch between list, calendar, and timeline view
- Downloading .ics files for calendar invites for each event
- Allow scrolling between multiple dates (ex. between January 12/13)
- Adding speaker profiles to the modal popup
- Caching API responses so if it goes down there's still data
