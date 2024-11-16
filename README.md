# All-Universal-Shopping-Mall (AUSM) site

access the site [here](https://ausmlore.github.io/)

## FOR OWNER: how to add files and folder to `dir.json` file

```jsonc
[
    {
        "contents": [
            {
                "name": ".",
                "isdir": false
            },
            {
                "name": "history",
                "isdir": true,
                "contents": [
                {
                    "name": ".",
                    "isdir": false
                },
                {
                    "name": "template.html",
                    "isdir": false
                } //to add a new one, add a comma here and specify the "name" and "isdir" properties (isdir means the file is a folder, if false, it's a file)
                ]
            },
            {
                "name": "fractions",
                "isdir": true // to add the files inside a folder that doesn't have any, add a comma and make the "contents": [] array and add the files inside
            },
            {
                "name": "places",
                "isdir": true
            },
            {
                "name": "characters",
                "isdir": true
            } // to add a folder or file here, do the same thing as adding one inside a folder
        ]
    }
]
```

follow the above format to add files and folders to the `dir.json` file
