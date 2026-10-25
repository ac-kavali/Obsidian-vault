```
                    Internet
                       │
                       ▼
                 ┌──────────┐
                 │  NGINX   │
                 │ :80/:443 │
                 └────┬─────┘
                      │
                      │ reverse proxy
                      ▼
              ┌────────────────┐
              │ Gunicorn       │
              │ WSGI server    │
              └───────┬────────┘
                      │
                      ▼
              ┌────────────────┐
              │ Flask API      │
              │                │
              │ Auth           │
              │ Users          │
              │ Todos          │
              │ Notes          │
              └───────┬────────┘
                      │
                      ▼
              ┌────────────────┐
              │ PostgreSQL     │
              │                │
              │ users          │
              │ todos          │
              │ notes          │
              └────────────────┘
```

## SQLAchemy
Its the python SQL database toolkit 

--- 
## PostgreSQL
