# Defector

This repository contains my bots for **Defector**, a Prisoner's Dilemma-like bot competition by Hack Club.

I created and tested different bot versions while learning how to make a bot predict and adapt to opponent behavior. The project started with a very simple reactive bot and gradually developed into more complex strategies using statistics, pattern detection, and decision trees.

## Submitted Bots

* [Mark3](https://defector.hackclub.com/bot/hqtwo77oya4mg7zdfhk7)
* [Mark3 Test](https://defector.hackclub.com/bot/83r3xxkr7jv2kb9ms3ws)
* [Mark5](https://defector.hackclub.com/bot/vfq4lprc8ly1q2tlwiqa)

## Bot Code

* [Mark1](https://github.com/Arsen-Gevorgyan/defector/blob/main/mark1.js)
* [Mark2](https://github.com/Arsen-Gevorgyan/defector/blob/main/mark2.js)
* [Mark3](https://github.com/Arsen-Gevorgyan/defector/blob/main/mark3.js)
* [Mark4](https://github.com/Arsen-Gevorgyan/defector/blob/main/mark4.js)
* [Mark5](https://github.com/Arsen-Gevorgyan/defector/blob/main/mark5.js)

## Explanation

### Mark 1

Mark 1 was my first bot. I made it mainly to understand how Defector works and to make sure I could write and submit a working bot.

The strategy is very simple. On the first round it cooperates (`C`). After that, it copies the opponent's previous move.

My first test also had a code error, which I fixed. After fixing it, the bot still performed badly because the strategy itself was very simple and predictable.

### Mark 2

Mark 2 was my first attempt to make the bot use more information from the previous rounds.

For the first few rounds, it chooses randomly between cooperation and defection. After that, it counts how many times the opponent cooperated or defected.

If the opponent has always cooperated, the bot cooperates. If the opponent has always defected, the bot defects. Otherwise, it tries to do the opposite of the opponent's previous move.

This was my first step from simply copying the opponent to analyzing their behavior.

### Mark 3

Mark 3 uses a recent history of the opponent's moves instead of only looking at the last move.

It checks the last six rounds and counts cooperation and defection. If the opponent has defected several times, the bot defects. If the opponent has mostly cooperated, the bot usually cooperates but sometimes defects randomly.

For other situations, it follows the opponent's latest move.

I also tested this version against other Defector bots. This helped me see that a simple reactive strategy was not enough against more complex opponents.

### Mark 4

Mark 4 was a bigger change from the previous versions.

It uses several different strategies and selects between them depending on the situation. It looks at the opponent's recent behavior and their overall defection rate.

It also checks how the opponent behaves after my previous cooperation or defection. This gives the bot some information about how the opponent reacts to my moves.

I also started experimenting with pattern detection and different policies instead of relying on one simple rule.

### Mark 5

Mark 5 is my most advanced version in this repository.

It combines several ideas from the previous versions. It has an adaptive strategy, multiple policies, a decision tree, and detection for periodic opponent behavior.

The bot can check the opponent's recent and overall behavior, detect repeated defection, and look for patterns in the opponent's moves. It also uses different policies such as always cooperating, always defecting, copying the opponent, and other adaptive behaviors.

One of the main ideas I experimented with was detecting opponents that repeatedly use a fixed pattern. The bot also has special handling for opponents that defect repeatedly.

Mark 5 was the result of gradually improving the bot through testing and experimenting with different strategies.

## What I Learned

During this project I learned more about:

* JavaScript functions and arrays
* Working with game history
* Designing rule-based strategies
* Using statistics to make decisions
* Detecting patterns in sequential data
* Testing bots against different opponents
* Improving a strategy based on test results
* Using Git and GitHub to keep the development history

## Defector

* [Defector website](https://defector.hackclub.com/)
* [My Defector submissions](https://defector.hackclub.com/submissions)
* [Mark Catalog](https://defector.hackclub.com/submission/15z2yd26t1w4y9hx321r)