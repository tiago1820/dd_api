### Location

There is a total of 57 locations sorted by id.

### Location schema

| Key                 | Type           | Description                                                 |
|---------------------|----------------|-------------------------------------------------------------|
| id                  | int            | The id of the location.                                     |
| name                | string         | The name of the location.                                   |
| reformersBornHere   | array (urls)   | List of reformers who were born in this location.           |
| reformersDiedHere   | array (urls)   | List of reformers who were died in this location.           |
| created             | string         | Time at which the location was created in the database.     |


### Get all locations

You can access the list of locations by using the /location endpoint.

```
GET http://localhost:3001/api/location
```
```
{
    "info": {
        "count": 24,
        "pages": 2,
        "next": "http://localhost:3001/api/location?page=2",
        "prev": null
    },
    "results": [
        {
            "id": 2,
            "name": "Campinas, Sao Paulo, Brasil",
            "reformersBornHere": [],
            "reformersDiedHere": [],
            "created": "2025-01-06T19:27:26.410Z"
        }
    // ...
  ]
}
```

### Get a single location

You can get a single location by adding the id as a parameter: /location/3

```
GET http://localhost:3001/api/location/3
```
```
{
    "id": 3,
    "name": "Sao Carlos, Sao Paulo, Brasil",
    "reformersBornHere": [],
    "reformersDiedHere": [
      "http://localhost:3001/api/reformer/14",
      "http://localhost:3001/api/reformer/15",
    // ...
    ],
    "created": "2025-01-06T19:33:42.958Z"
}
```

### Get multiple locations

You can get multiple locations by adding an array of ids as parameter: /location/1,2,3

```
GET http://localhost:3001/api/location/3,11
```
```
[
    {
        "id": 3,
        "name": "Sao Carlos, Sao Paulo, Brasil",
        "reformersBornHere": [],
        "reformersDiedHere": [
            "http://localhost:3001/api/reformer/14",
            "http://localhost:3001/api/reformer/15",
            "http://localhost:3001/api/reformer/22"
        ],
        "created": "2025-01-06T19:33:42.958Z"
    },
    {
        "id": 11,
        "name": "Belo Horizonte, Minas Gerais, Brasil",
        "reformersBornHere": [],
        "reformersDiedHere": [],
        "created": "2025-01-06T19:39:32.755Z"
    }
]
```

### Filter locations

Available parameters:

- name: filter by the given name.

If you want to know how to use queries, [check here](#filter-characters).

---