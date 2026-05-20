# NeoTaste — Sprint Context for Prototyping

## 1. The Challenge

NeoTaste is a restaurant discovery and deals app where users book tables and redeem offers. The product works well transactionally but lacks a social layer that makes discovery feel alive and personal. The sprint challenge: design a **lightweight social discovery layer** that helps users find restaurants through other people (friends, community, trust signals) without adding complexity to the core booking flow. The two user states that coexist are (a) a **connected user** with 5+ friends on NeoTaste who sees friend-level signals, and (b) a **new user** with 0 friends who needs community and mass signals to feel the app is alive. The design must never show an empty state — signals degrade gracefully across both profiles. North star KPIs: **retention and daily opens**.

---

## 2. Direction and Concept Statement

**Selected concept: #09 — Recency Counter**

> My social layer helps NeoTaste users discover restaurants they don't know by surfacing verified recent activity: the number of people who booked at that restaurant in the last 7 days. This creates an active discovery experience where the user feels the app is showing them something happening *right now* — not a historical rating — and gains confidence to book somewhere they wouldn't have considered on their own.

The Recency Counter is the primary social signal. It is the only one that:
- Works from day 1 in a new city (requires only 7 days of booking data, not 90)
- Updates weekly, giving users a reason to return
- Shows data exclusive to NeoTaste (no other platform can surface this)

**Ideas retained as secondary signals (not prototyped in sprint):**
- `#16 Return Rate` — strongest trust signal but needs ~90 days of data to be credible; candidate for v2 in Restaurant Detail
- `#11 Local area signal` — fallback for new users when counter is below threshold
- `#10 TOP 5 most booked nearby` — map-level context signal

---

## 3. Main User Flow

The flow is scoped to the **new user (0 friends)** as the primary actor. Connected user experience is identical except friend signals appear above the counter.

```
App open
  └─> Discover tab (Map view)
        └─> Map loads in two phases:
              Phase 1: Base map tiles + basic restaurant pins (fast)
              Phase 2: Recency badges appear on qualifying pins (slower)
        └─> User taps a pin
              └─> Peek Card slides up from bottom
                    Shows: photo, name, cuisine, rating, distance
                    Shows: Recency Counter — "23 people booked here this week"
                    (If connected user: friend signal appears above counter)
                    (If counter below threshold: card shows without counter, no empty slot)
              └─> User taps card → Restaurant Detail
                    Shows: full restaurant info, photos, reviews
                    Shows: Recency Counter (same copy as peek card, same 7-day window)
                    Shows: dominant occasion tag (e.g., "Most booked for: date night")
                    Shows: deals / menu
                    └─> User taps deal → Booking flow
                          └─> Confirmation screen
                                Shows: "You're one of the 24 people who booked here this week"
                                (only if counter latency ≤ 1 hour)
```

**Entry points beyond organic open:**
- Push notification: *"31 people booked near you this week"* → lands directly on Map with recency pins visible (primary retention mechanic — fires only when ≥30% variation in nearby restaurants, max 1/week)

---

## 4. Key Design Decisions and Rationale

**Counter does not appear in the map pin, only in the peek card.**
At map zoom level, a number competes with the restaurant name and saturates the view when multiple pins are active. The pin signals "something is here" — the number belongs to the peek card where the user is already engaged.

**7-day rolling window, not a fixed Monday–Sunday week.**
Fixed weeks create a "Monday effect" where the counter resets and restaurants appear to lose momentum. Rolling 7 days are more stable and easier to communicate as "in the last 7 days."

**Minimum threshold of 5 before showing the counter.**
"3 people booked here" weakens rather than strengthens the signal. Below threshold, the counter simply does not appear — no empty slot, no message, layout adapts. Threshold to be reviewed after 60 days of real data.

**Counter copy is identical in peek card and detail.**
Consistency between the two surfaces reinforces the signal rather than creating confusion about data discrepancy.

**Negative variation (counter dropped from last week) is not shown in v1.**
Displaying a drop creates unjustified negative perception for normal fluctuations (holidays, weather). Only explore showing variation in v2, and even then, consider surfacing only positive trends.

**Signal hierarchy never shows an empty state.**
Connected user → Friend signal + counter. New user → Counter (if above threshold). No data → No counter, no message. This is non-negotiable: the design must always have something to show.

**Booking counts as a visit; cancellations do not.**
No-shows are a pending decision dependent on whether check-in data is available. Same user booking twice in 7 days counts twice (two valid entries).

---

## 5. Cold Start Approach

The Recency Counter resolves cold start structurally: it only needs 7 days of booking data to generate a credible signal. From the first week of operation in a new city, any restaurant with recent bookings can show the counter.

**What to show when counter is below threshold (restaurant is new or has low volume):**
- Do not show the counter at all — the card works without it
- Do not show "no data" or placeholder
- At map level, the pin appears without a recency badge

**For the new user with 0 friends:**
The counter serves as the primary social signal. The copy "23 people booked here this week" functions as community proof without requiring any social graph. It's the Strava local segment model applied to restaurants: a small, geographically relevant reference group is more persuasive than a global number.

**The retention loop that activates on second visit:**
The counter changes weekly. The push notification tells the user something has changed. Seeing a different number when returning to the same restaurant teaches the user the system is live. Without the notification, the user has no reason to return to check. The notification is the critical mechanic, not the counter alone.

---

## 6. Constraints and Things to Avoid

**Do not build a separate social tab or activity feed.**
Social signals must live inside the discovery and booking flow — in the map, in the peek card, in the detail before the CTA. A standalone "friends activity" section replicates the Foursquare failure: users don't go there, it dies of disuse.

**Do not use vague urgency copy.**
"Very popular" or "High demand" without a number is perceived as marketing copy, not data. Every social signal must be specific and source-transparent ("booked here this week" = NeoTaste bookings). Booking.com's fake scarcity signals destroyed trust at scale — avoid the pattern entirely.

**Do not show the counter everywhere just because it's technically possible.**
A counter that appears on every restaurant with the same apparent intensity destroys the signal. Variation (some restaurants with high activity, some with low, some with none) is what makes the signal credible and meaningful.

**Do not add social features that require user action beyond booking.**
No post-visit review prompts as the primary signal. No mandatory check-ins. The booking IS the social action. Everything else is a subproduct of the booking. Users of a discovery/booking app are not there to become food critics.

**The "none of your contacts are here yet" screen is a dead end.**
If this empty state appears during onboarding, it must always be followed by a fallback: community signals (recency counter, TOP 5) that provide value while the user builds their network. Never leave the user with a screen that says the app has nothing to offer.

**Resolved decisions:**
- D1: A "visit" = confirmed booking only. Check-in and deal redemption are not required. Cancellations do not count.
- D3: Minimum threshold to show the counter is **dynamic, adjusted by city density** — more permissive in low-density cities, more conservative in dense markets. No fixed number.

**Pending decisions that affect prototype scope (do not resolve by assumption):**
- D6: "You're one of the N people" on confirmation — only implement if counter latency ≤ 1 hour
- D9: No-show handling — depends on availability of check-in data from engineering
- D10: Visual treatment of pin with recency (badge / color / size) — to be defined in visual design phase

---

*Document created during NeoTaste × Yummy Labs Design Sprint — May 2026*
*Primary concept: #09 Recency Counter. Integration points: Discover Map (pin badge + peek card) and Restaurant Detail (counter before booking CTA).*
