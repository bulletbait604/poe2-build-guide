# PoE2 Build Guide

A browser guide for Path of Exile 2. Pick a class, pick an ascendancy, then follow one route through Acts 1–4, the three interludes, and maps. Each route also has a checkpoint about every five levels.

Sign in with a Path of Exile account to jump from your own characters into the matching route.

## Run it

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). Path of Exile does not accept `localhost` as a login redirect.

## Sign in

1. Create an application at [pathofexile.com/developer](https://www.pathofexile.com/developer).
2. For this computer, use a public client. Set the redirect to `http://127.0.0.1:3000/api/auth/callback`.
3. Request the scopes `account:profile` and `account:characters`.
4. Copy `.env.example` to `.env.local` and set `POE_CLIENT_ID`.
5. Restart `npm run dev` and use **Sign in with Path of Exile**.

The app sends you to Grinding Gear Games to approve access. It stores the resulting token in an httpOnly cookie. It asks for your profile and your PoE2 characters. It does not ask for stash access.

Live ladder ranks need a confidential client, `POE_CLIENT_SECRET`, and the scopes `service:leagues` and `service:leagues:ladder`. That kind of client needs a real https redirect, so local sign-in and the live ladder are separate registrations. Without the secret, the build list still shows the written route.

## What the data is

- Your characters come from `https://api.pathofexile.com` after you sign in.
- Ladder counts come from the official league ladder when a service token is configured.
- A public profile lookup uses the same character window Path of Building uses, and only when you ask for one account.
- Unique pictures and divine prices come from the documented poe.ninja economy API, cached for an hour. Item art is the official CDN URL from that response.
- The steps themselves are original. Other sites are linked, not copied.

This is an unofficial fan project. It is not affiliated with Grinding Gear Games.
