# set-game-site

The board game 'Set', digitalized.

## How to run locally

Setting this bad boy up is really simple actually.

```sh
git clone https://github.com/ShadiestGoat/set-game-site.git
cd set-game-site
npm i -D
```
Now you have cloned this repo, and installed all dependoncies. If you will be changing the code to this project, or doing any sort of development, run `npm run dev`, which watches the files for changes. If you want to run this of your website as is, then just:

```sh
npm run build
npm run serve
```

Have fun ^^

## How to play

To play single player go to `<host (eg. https://shadygoat.eu)>/s`. Rules can be found under `<host>/help`, but it is in a todo state a the moment. Here is the basic explanation:

Your goal is to collect all sets possible, as fast as possible. A 'set' is a group of 3 cards that have no odd one out. To figure that out,
you need to look at the 4 properties of the cards: Number, Shape, Color and Filling. The basic rule is that if 2 cards share a property, then
the other one must have that property too. To the right are some examples of the cards.
The cards will be presented on a board 3x4. If there isn't a set within those 12 cards, another row will be added. This means there is always a set,
you just gotta find it!
