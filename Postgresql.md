**A manual To type your first command interacting with postgresql**

## Installation 
1) install via CLI:
```sh
sudo apt install postgresql postgresql-contrib
```
2) Start service and check version
```sh
sudo systemctl start postgresql 
psql --version
```


###### Enter psql CLI
```sh
sudo -u postgres psql
```
---
### Show databases
```sql
\l
```
