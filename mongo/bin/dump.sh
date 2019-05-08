#!/bin/bash

# dump $DB_NAME collections
mongodump --db $DATABASE_NAME --out /data/sh

# zip all bson files in one tar.gz
tar -zcvf $DATABASE_NAME.tar.gz $DATABASE_NAME/

# rm unziped bson files
rm -r /data/sh/$DATABASE_NAME




