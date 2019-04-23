Dungeon
===

## About
This is a dungeon crawler written in AngularJS

## Build
Run `ng build`. The build artefacts will be stored in the `dist/` directory.

## Running tests
Run `ng test` and `ng e2e`

## Local deploy
Run `ng serve`. `http://localhost:4200/`

## Prod deploy
Push to GitHub, then CircleCI will detect the changes, run the tests and deploy. S3: `http://welcometothedungeon.s3-website.eu-central-1.amazonaws.com`. CloudFront: `http://d244gfx0zgow1.cloudfront.net/`


## First prod deploy
- Create AWS S3 bucket
- Enable the bucket property for static website hosting
- Add bucket permissions policy as... effect:"allow", principle: "*", action: "s3:GetObject", resource: "arn:aws:s3:::bucketname/*"
- Create AWS IAM User with full s3 access
- Create CloudFront distribution to the bucket, with 'Default Root Object' as index.html
- Create CircleCI project
- Save the new user AWS key/secret into CircleCI project AWS permissions
- Ensure config.yml has correct bucket name

## Todo
- make enemy panel handle more enemies than space
- save and load state (in cookies)
- dialog as lightbox (and improve scaling)
- prettify ui (redo all images)
- create more levels
- complete game
- fix format on mobile
- tune difficulty
- show in contact enemies on enemy component (with direction icon) (including diagonals)
- keyboard arrows input?
- improve performance of action
- intro (backstory?) and gameplay explanation 
- about page?
- enter name at beginning, and store topscore when dead or restart/end? and show
- change character face based on health and death
- animate ui (animate movement/animate fight/animate enemy sort/animate character stat changes/animate enemy stat changes)(block ui for animations)
- favicon
- wrap for android (ionic?)