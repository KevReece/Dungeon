# Dungeon

## About

This is a dungeon crawler writen in AngularJS

## Build

Run `ng build`. The build artifacts will be stored in the `dist/` directory.

## Running tests

Run `ng test`
Run `ng e2e`

## Local deploy

Run `ng serve`. `http://localhost:4200/`

## Prod deploy

Push to GitHub, then CircleCI will detect the changes, run the tests and deploy. `http://d244gfx0zgow1.cloudfront.net/`

## First prod deploy

Create AWS S3 bucket
Enable the bucket propery for static website hosting
Add bucket permissions policy as... effect:"allow", principle: "*", action: "s3:GetObject", resource: "arn:aws:s3:::bucketname/*"
Create AWS IAM User with full s3 access
Create CloudFront distribution to the bucket, with 'Default Root Object' as index.html
Create CircleCI project
Save the new user AWS key/secret into CircleCI project AWS permissions
Ensure config.yml has correct bucket name

## Todo
- user walk logic
- walking blocked by walls logic
- disable controller button when walking blocked
- show treasure chests ('T')
- open treasure
- drop gold item ('G')(consider ahead that enemies can walk on top of these)
- collect item
- show goblins on map ('E')
- add enemies panel (ordered)
- attack enemies (succeed if: charactor.attack + random[-2:3] > enemy.defence)
- damage multiplier for health taken (add damage stat)(health lost = charactor.damage * random[0.5:1.5].roundup())
- kill enemies (gives xp)
- level up charactor (stats too)
- enemies move (store last direction, initialy random)(random based on ratio 4:forward; 2:left; 2:right; 1:stay; 1:reverse)(don't block for items)
- enemies attack
- treasure chests can drop food ('F')(add max health stat)(food gives 50%)
- kill charactor
- restart/end button
- hole to next level ('O')
- level indicator
- prettify
- other enemies types
- create different levels (progressively harder enemy types)
- loop levels or complete game?
- save and load state (in cookies)
- spawn enemies (every 20 player turns)(gather free spaces into array, then random)
- progress spawned enemies types (levels define base enemy)(spawn 3 from last level, then 3 from current, then 3 from next, etc)
- intro (backstory?) and gameplay explanation 
- about page?
- enter name at beginning, and store topscore when dead or restart/end? and show
- keyboard arrows input?
- random enemy modifiers for spawned enemies (veteran/huge/gigantic/leader/angry/two-headed/vicious/bloodthirsty/stony/ancient/fierce/etc/none)?