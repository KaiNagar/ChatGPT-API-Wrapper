data = [
     {
        "path": "temperature",
        "args": [
            {
                "name": "date",
                "type": "date-time"
            },
            {
                "name": "location",
                "type": "string"
            },
        ],
        "prompt": {
            "messages": [
                {
                    "role": "system",
                    "content": "You are the temperature service. Please provide the temperature for {location} on {date}."
                },
                {"role": "user", "content": "Can you please provide the temperature in {location} on {date}"}

            ]
        }
    },
    {
        "path": "weather",
        "args": [
            {
                "name": "location",
                "type": "string"
            },
            {
                "name": "date",
                "type": "date-time"
            }
        ],
        "prompt": {
            "messages": [
                {
                    "role": "system",
                    "content": "You are the weather service. Please provide the weather for {location} on {date}."
                },                {
                    "role": "user", "content": "Can you please provide the weather in {location} on {date}"}

            ]
        }
    },
    {
        "path": "game",
        "args": [
            {
                "name": "team",
                "type": "string"
            },
            {
                "name": "date",
                "type": "date-time"
            },
            {
                "name":"won",
                "type":"boolean"
            }
        ],
        "prompt": {
            "messages": [
                {
                    "role": "system",
                    "content": "You are the game service. Please provide the game status for {team} on {date}."
                },                {
                    "role": "user", "content": "Can you please provide the game status for {team} on {date}"}

            ]
        }
    }
   
]
