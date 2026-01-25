# translit.api.airat.top

Tiny Cloudflare Worker that transliterates Russian Cyrillic to Latin.

Live endpoint: https://translit.api.airat.top

## API

### GET

```
GET /?text=...
```

Example:

```bash
curl 'https://translit.api.airat.top/?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82'
```

Response:

```json
{"text":"Привет","translit":"Privet"}
```

Test in browser: [https://translit.api.airat.top/?text=Привет](https://translit.api.airat.top/?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82)

### POST

Send `text` as JSON or as plain text.

```bash
curl -X POST 'https://translit.api.airat.top/' \
  -H 'Content-Type: application/json' \
  -d '{"text":"Привет"}'
```

Response:

```json
{"text":"Привет","translit":"Privet"}
```

### Errors

If `text` is missing, the API returns HTTP 400:

```json
{"error":"Missing required parameter: text"}
```

### CORS

CORS is enabled for all origins (`*`).

## Privacy

No analytics or request logs are collected by this project.

## Monitoring

Health check endpoint:

```
GET /health
```

Response:

```json
{"status":"ok"}
```

Test in browser: https://translit.api.airat.top/health

## Project structure

- `worker.js` - Cloudflare Worker script.

## Deployment

Deploy with Wrangler (the repo already includes `wrangler.toml`):

```bash
npx wrangler deploy
```

If you use Cloudflare Workers Builds (GitHub integration), set the deploy command to `npx wrangler deploy` and keep the root path at `/`.

To serve it on a custom domain, add the domain in **Workers & Pages → Domains & Routes**. Cloudflare will create the DNS record and issue SSL automatically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**AiratTop**

- Website: [airat.top](https://airat.top)
- GitHub: [@AiratTop](https://github.com/AiratTop)
- Email: [mail@airat.top](mailto:mail@airat.top)
- Repository: [translit.api.airat.top](https://github.com/AiratTop/translit.api.airat.top)
