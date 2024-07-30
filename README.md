# My Website

My own person website. It contains habit tracker and blogs.

## Deploying to GitHub Pages

First, build the app by running `npm run build`.

Then, run `npm run deploy` to deploy the app to GitHub Pages.

## Tools

Here are a list of tools that I used to built this webpage: 

- [SvelteKit-Github-Pages](https://metonym.github.io/sveltekit-gh-pages/)
- [Cal-Heatmap](https://github.com/wa0x6e/cal-heatmap)
- [JSON-Rules-Engine](https://github.com/CacheControl/json-rules-engine)
- [JSON Rule Editor](https://www.json-rule-editor.com/#/home)

## Things to remember:

*For the JSON Rule, how do I set the priority of a rule?*

> You can set it based on the params.value.

*For the JSON Rule, how do I set interval bounds?*

```json
{
    "conditions":{
        "all":[
            {
                "fact":"dailyPuzzle",
                "operator":"equal",
                "value":true
            },
            {
                "fact":"studying",
                "operator":"equal",
                "value":false
            },
            {
                "fact":"numberOfExercises",
                "operator":"equal",
                "value":0
            },
            {
                "fact":"numberOfGames",
                "operator":"equal",
                "value":0
            },
            {
                "fact":"date",
                "operator":"withinDatesRange",
                "value":['2024-07-01', '2024-07-29']
            },
        ]
    },
    "event":{
        "type":"red",
        "params":{
            "color":"red",
            "value": 7
        }
    }
}
```

*When getting Strava data, what permission should you pick when getting an athletic's activities?*

> activity:read_all. Keep in mind you can only use one scopes at a time.

*How do you add another label to the calendar?*

> See [here](https://cal-heatmap.com/docs/plugins/calendarLabel#position).