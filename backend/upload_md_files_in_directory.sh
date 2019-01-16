#!/bin/sh

for f in `find . -type f -name "*.md"`
do
  curl -F 'avatar=@/Users/movier/blog/source/_posts/'$f http://localhost:8000/profile
  echo '\n'
done