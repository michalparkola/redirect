# redirect
A simple url shortcut / redirect service using Node.js

# Plans

## Next

* Write some automated tests
* Allow the user to register new redirects (but not overwrite)

## Someday/Maybe

* Set up some performance tests and visualize stats
* Set up real time server monitoring and visualize stats

## Rebuild docker image

docker build -t mparkola/redirect .

# Development Log

## 2018-01-22 Monday

* Create docker container

## 2016-12-25 Sunday, Christmas Day (Location: Madeira, Portugal)

* Correctly wired database query using callbacks
* Created a git repo and stored it on Github

## 2016-12-18 Sunday (Location: Warsaw, Poland)

* Created a basic Node.js HTTP server
* Set up redirections based on hardcoded shortcuts
* Created an sqlite3 database to store shortcuts

## 2017-06-22

* Used setcap 'cap_net_bind_service=+ep' /use/bin/nodejs to allow node to serve port 80
