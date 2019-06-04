* Run the project with `docker-compose up`
* Restore db with `./mongorestore`, please be careful of the db directory
* Dump db with `./mongodump`
* Run `chown -R 999:docker olivia` to avoid `permission denied` error when dumping db