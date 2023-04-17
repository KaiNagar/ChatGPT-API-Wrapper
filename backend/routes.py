data = [
    {
        "path":"weather",
        "args":[
            {
                "name":"date",
                "type":"date-time"
            }
        ],
        "prompt":{
            "messages": [
                { "role": "system", "content": "You are weather forcasting service" },
                { "role": "user", "content": "Can you please provide the weather in Tel-Aviv on {date}" }
              ]
        } 
    }
]
