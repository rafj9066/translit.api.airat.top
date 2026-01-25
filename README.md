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
{"text":"\u041f\u0440\u0438\u0432\u0435\u0442","translit":"Privet"}
```

### POST

Send `text` as JSON or as plain text.

```bash
curl -X POST 'https://translit.api.airat.top/' \
  -H 'Content-Type: application/json' \
  -d '{"text":"\u041f\u0440\u0438\u0432\u0435\u0442"}'
```

Response:

```json
{"text":"\u041f\u0440\u0438\u0432\u0435\u0442","translit":"Privet"}
```

### Errors

If `text` is missing, the API returns HTTP 400:

```json
{"error":"Missing required parameter: text"}
```

### CORS

CORS is enabled for all origins (`*`).

## Project structure

- `worker.js` - Cloudflare Worker script.

## Deployment

Deploy the `worker.js` script to Cloudflare Workers using the dashboard or Wrangler. If you use Wrangler, add your own `wrangler.toml` to match your account and route.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**AiratTop**

- Website: [airat.top](https://airat.top)
- GitHub: [@AiratTop](https://github.com/AiratTop)
- Email: [mail@airat.top](mailto:mail@airat.top)
- Repository: [translit.api.airat.top](https://github.com/AiratTop/translit.api.airat.top)