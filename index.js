/**
 * Created by mananhora on 2/17/17.
 */
/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

//'use strict';

const Alexa = require('alexa-sdk');
//const Yelp = require('yelp');
const recipes = require('./recipes');

const APP_ID = "amzn1.ask.skill.3d8d344e-2530-45ac-9849-ff1a98aed7d5";// TODO replace with your app ID (OPTIONAL).

// var yelp = new Yelp({
//     consumer_key: '834QJTTdnDY1uYtzMpBrmw',
//     consumer_secret: 'Pn6OEdnN8vDWwhyKdLQZ2xbEDOA',
//     token: 'p7pX7Fm_DU-05kHxfcQlufLatN6zVLB1',
//     token_secret: '-MEEgbv3CDxWJZvUOQUKZnnYT2E',
// });

var cityName = "NYC";

const handlers = {
    'NewSession': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'FoodRecsInCity': function () {

        const citySlot = this.event.request.intent.slots.City;

        if (citySlot && citySlot.value) {
            cityName = citySlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), cityName);
        const myRecipes = this.t('RECIPES');
        const recipe = myRecipes[cityName];



        if (recipe) {
            this.attributes.speechOutput = recipe;
            this.attributes.repromptSpeech = this.t('RECIPE_REPEAT_MESSAGE');
            this.emit(':askWithCard', recipe, this.attributes.repromptSpeech, cardTitle, recipe);
        } else {
            var speechOutput = this.t('RECIPE_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('RECIPE_NOT_FOUND_REPROMPT');
            if (cityName) {
                speechOutput += this.t('RECIPE_NOT_FOUND_WITH_ITEM_NAME', cityName);
            } else {
                speechOutput += this.t('RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
            //this.emit("HELLLLLOOOO");
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

const languageStrings = {

    'en-US': {
        translation: {
            RECIPES: recipes.RECIPE_EN_US,
            SKILL_NAME: 'Amigo',
            New_York: 'Helllllooo',
            WELCOME_MESSAGE: "Hi, I am %s. What can I help you with?",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - %s.',
            HELP_MESSAGE: "",
            HELP_REPROMT: "",
            STOP_MESSAGE: 'Goodbye!',
            RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
            RECIPE_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know ",
            RECIPE_NOT_FOUND_WITH_ITEM_NAME: ' ',
            RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: ' ',
            RECIPE_NOT_FOUND_REPROMPT: 'What else can I help with?',
        },
    },
};



exports.handler = function(event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
