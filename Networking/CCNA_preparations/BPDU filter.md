




### if a BPDU Filter port receive a BPDU:
it depende on configuration level (interface level/global level)

| Configuration                 | Receives BPDU                           |
| ----------------------------- | --------------------------------------- |
| `bpdufilter enable`           | 🚫 BPDU is filtered/dropped             |
| `portfast bpdufilter default` | ⚠️ Filtering stops and STP processes it |
