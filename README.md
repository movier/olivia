# Run the project
1. Run the project with `docker-compose up`
2. Restore db with `./mongorestore`, please be careful of the db directory
3. API: http://localhost:1102, FE http://localhost:8080, BO http://localhost:8080/admin, username: USERNAME, password: PASSWORD

# Others
* Dump db with `./mongodump`
* Run `chown -R 999:docker olivia` to avoid `permission denied` error when dumping db
