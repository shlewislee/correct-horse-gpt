# correct-horse-gpt

Generate secure, `correct-horse-battery-staple` style passphrase and compromise said passphrase with not-so-secure GPT telling you how to memorize it, because why not.

Supports Korean and English.

## Technologies used

- Sveltekit
- Bun.js
- Cloudflare Pages / Worker
- Tailwind CSS
- Google Gemini 1.5 Flash

## Important notice

GPT is powered by Google Gemini 1.5 Flash _free tier_, which means that **all your prompts can(and will) be used by Google to enhance their products**.

You can safely use generated passphrase, as long as you don't use GPT functionality. Every generations happen locally and with `crpyto.getRandomValues()`. **Please do not use post-GPT-compromised passphrase. period. GPT functionality is entirely for entertainment purpose only** (Plus, it doesn't even work that well).

It's one thing to believe that companies will regard your privacy and have decency to not look at your sensitive informations but when Google explicitly tells you that they will use your data, don't go there and put passphrases that you are going to use in production.

## Why?

I can slap `AI` on my resume now.

## Development

```
bun run dev
```

You will also have to set `TURNSTILE_API_KEY` and `GEMINI_API_KEY` as environment variables. It's best you create `.env` file and for Cloudflare Pages, use Secrets(they're just variables).

## Credits

- English words list directly from [quantum5/correcthorsebatterystaple](https://github.com/quantum5/correcthorsebatterystaple)
- Korean words from [국립국어원](https://www.korean.go.kr/front/etcData/etcDataView.do?mn_id=46&etc_seq=71) (processed)
