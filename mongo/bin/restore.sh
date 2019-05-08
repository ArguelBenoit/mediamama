#!/bin/bash

# unzip bson files in $DB_NAME.tar.gz
tar -zxvf $DATABASE_NAME.tar.gz

# delete old $DB_NAME collections
mongo $DATABASE_NAME --eval "db.dropDatabase()"

# restore dump $DB_NAME
mongorestore --db $DATABASE_NAME $DATABASE_NAME

# remove unziped bson files
rm -rf $DATABASE_NAME