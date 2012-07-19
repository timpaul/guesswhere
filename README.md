# Guess Where London

'Guess Where London' is an image-based guessing game played via Instagram. People take obscure photos of London and you get points if you guess where they were taken. The code here is for a website that will display stats on who's guessed the most photos etc.

## How to play

### Submitting photos

1. Take photos on Instagram and tag them `#guesswherelondon`
2. If someone guesses one correctly add a comment, like this:
   `#guessedinlondon` by `@user_name`

### Guessing photos

1. Browse for photos tagged `#guesswherelondon` on Instagram or [Twitter](https://twitter.com/#!/search/realtime/guesswherelondon)
2. Add a comment if you think you know where a photo was taken
3. Check on [website] to see who the top players are

### Tips

* iPhone and Android users, if you set up notifications for [@GuessWhereLDN](https://twitter.com/GuessWhereLDN) on Twitter you'll be notified every time someone submits a new photo
* Remember to turn off geotagging before you submit a photo, unless you want to make it _really_ easy. Don't worry, your phone will still geotag the copy of the photo it makes, which is handy if you want to double-check if someone's guessed right.

## Doesn't this already exist on Flickr?

Yes. There's an active '[Guess Where London](http://www.flickr.com/groups/guesswherelondon/)' group on Flickr. It's brilliant and is unashamedly the influence behind this idea. But playing it on Flickr can be a fiddly and frustrating experience, especially on mobile devices. On Instagram it SINGS.

And you get points. Oh yes.


## Contributing

Anyone and everyone is welcome to contribute.

This initial release is a total dogs breakfast and I need all the help I can get. No, really, it's little more than a proof-of-concept. The game logic is incomplete, as will soon become apparent if more than a few people start to play. Currently, all the hard work is done on the client side in JavaScript which is kind of stupid. If anyone wants to recommend a better approach I'm all ears.

# Future plans

It all depends if people start using it or not. I'd like to scale it beyond London - it would be perfectly possible to automatically generate views for other tags ('#guesswheremoscow' etc.) once they'd been used more than a couple of times for example.

The browse/guess mechanism also needs more thought. At the moment I use IFTTT to tweet from @GuessWhereLDN whenever someone tags a photo. This is fine but won't scale well to multiple cities. Also, when you click the image in the tweet on a mobile it just opens it full-screen. What you really want it to do is open the Instagram app so you can add a comment.

Finally, the rather brutal and basic visual style will be addressed at some point. Though I'm slightly loath to follow the 70s retro Instagram style like everyone else seems to.


## Project information

* Source: https://github.com/timpaul/guesswhere
* Web: http://html5boilerplate.com
* Twitter: https://twitter.com/GuessWhereLDN


## License

### Major components:

* HTML5 Boilerplate: Public Domain
* jQuery: MIT/GPL license
* Modernizr: MIT/BSD license
* Normalize.css: Public Domain

### Everything else:

The Unlicense (aka: public domain)
