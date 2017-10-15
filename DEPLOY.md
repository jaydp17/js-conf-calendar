# How to Deploy?

[Fact Skill Tutorial](https://developer.amazon.com/alexa-skills-kit/tutorials/fact-skill-1) is a great place to start if you've never created an Alexa Skill

### [Optional] if you've already deployed the skill clone it
```sh
$ yarn ask:clone

# now select the skill you wanna clone
# let's say it cloned the project in ./JS_Conf_Calendar

# we only need the two things from there
$ mv ./JS_Conf_Calendar/.ask ./.ask
$ mv ./JS_Conf_Calendar/skill.json skill.json

# remove ./JS_Conf_Calendar
$ rm -rf ./JS_Conf_Calendar
```

Now make your necessary changes

### Push updates

```sh
# update skill
$ yarn deploy:skill

# update lambda
$ yan deploy:lambda
```
