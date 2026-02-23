# correct-horse-gpt

Generate secure, `correct-horse-battery-staple` style passphrase and compromise said passphrase with not-so-secure LLM telling you how to memorize it, because why not.

Supports Korean and English.

## Technologies used

- Sveltekit
- Bun.js
- Cloudflare Pages / Worker & Cloudflare Turnstile
- Tailwind CSS
- Google Gemini 2.5 Flash

## Why?

I can slap `AI` on my resume now.

## Development

```
bun run dev
```

You will also have to set [`GEMINI_MODEL_NAME`](https://ai.google.dev/gemini-api/docs/models), `TURNSTILE_API_KEY` and `GEMINI_API_KEY` as environment variables. It's best you create `.env` file and for Cloudflare Pages, use `Variables and Secrets` option. Obviously, you would want to set API keys as secret. Model name can be plaintext.

Turnstile site key is hardcoded in the code. You should change that as well.

## Credits

- English words list directly from [quantum5/correcthorsebatterystaple](https://github.com/quantum5/correcthorsebatterystaple)
- Korean words from [국립국어원](https://www.korean.go.kr/front/etcData/etcDataView.do?mn_id=46&etc_seq=71) (preprocessed)
