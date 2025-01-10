<p align="center">
  <img src="https://www.worldhistory.org/uploads/images/14847.jpg?v=1709243469-0" alt="Descripción de la imagen">
</p>

<p align="center">
  <a href="https://commons.wikimedia.org/wiki/File:ReformationsdenkmalGenf1.jpg">Reformation Wall</a> by <a href="https://www.picswiss.ch/Genf/GE-05-1.jpg">Roland Zumbühl</a>, licensed under <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a>.
</p>

## Documentation

### Introduction

This documentation will help you get familiar with the resources of the Reformers API and show you how to make different queries, so that you can get the most out of it.

### REST
#### Base url: http://localhost:30001/api

The base url contains information about all available API's resources. All responses will return data in json.

```
GET http://localhost:3001/api
```
```
{
  "reformers": "http://localhost:3001/api/reformer",
  "locations": "http://localhost:3001/api/location",
}
```

There are currently three available resources:

- Reformer: used to get all the reformers.
- Location: used to get all the locations.

### Info and Pagination
The API will automatically paginate the responses. You will receive up to 20 documents per page.

Each resource contains an info object with information about the response.


| Key   | Type         | Description                            |
|-------|--------------|----------------------------------------|
| count | int          | The length of the response            |
| pages | int          | The amount of pages                   |
| next  | string (url) | Link to the next page (if it exists)   |
| prev  | string (url) | Link to the previous page (if it exists) |

```
GET http://localhost:3001/api/reformer
```
```
{
  "info": {
    "count": 126,
    "pages": 7,
    "next": "http://localhost:3001/api/reformer/?page=2",
    "prev": null
  },
  "results": [
    // ...
  ]
}
```

You can access different pages with the page parameter. If you don't specify any page, the first page will be shown. For example, in order to access page 2, add ?page=2 to the end of the URL.

```
GET http://localhost:3001/api/reformer/?page=19
```
```
{
  "info": {
    "count": 126,
    "pages": 7,
    "next": "http://localhost:3001/api/reformer/?page=20",
    "prev": "http://localhost:3001/api/reformer/?page=18"
  },
  "results": [
    {
      "id": 2,
      "name": "JosèBonifacio",
      "born": "February 13, 1939",
      "died": "December 14, 2017",
      "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
      "image": null,
      "placeOfBirth": null,
      "placeOfDeath": null,
      "url": "http://localhost:3001/api/reformer/2",
      "created": "2025-01-07T01:53:14.218Z",
   },
    // ...
  ]
}
```

### Reformer

There is a total of 126 reformers sorted by id.

### Reformer schema

```
GET http://localhost:3001/api/reformer
```
```
{
  "info": {
    "count": 126,
    "pages": 7,
    "next": "http://localhost:3001/api/reformer/?page=20",
    "prev": "http://localhost:3001/api/reformer/?page=18"
  },
  "results": [
    {
      "id": 2,
      "name": "JosèBonifacio",
      "born": "February 13, 1939",
      "died": "December 14, 2017",
      "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
      "image": null,
      "placeOfBirth": null,
      "placeOfDeath": null,
      "url": "http://localhost:3001/api/reformer/2",
      "created": "2025-01-07T01:53:14.218Z",
    },
    // ...
  ]
}
```

### Get a single reformer

You can get a single reformer by adding the id as a parameter: /reformer/2

```
GET http://localhost:3001/api/reformer/2
```
```
{
  "id": 2,
  "name": "JosèBonifacio",
  "born": "February 13, 1939",
  "died": "December 14, 2017",
  "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
  "image": null,
  "placeOfBirth": null,
  "placeOfDeath": null,
  "url": "http://localhost:3001/api/reformer/2",
  "created": "2025-01-07T01:53:14.218Z"
}
```

### Get multiple reformers

You can get multiple reformers by adding an array of ids as parameter: /reformer/1,2,3

```
GET http://localhost:3001/api/reformer/1,83
```
```
[
  {
    "id": 2,
    "name": "JosèBonifacio",
    "born": "February 13, 1939",
    "died": "December 14, 2017",
    "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
    "image": null,
    "placeOfBirth": null,
    "placeOfDeath": null,
    "url": "http://localhost:3001/api/reformer/2",
    "created": "2025-01-07T01:53:14.218Z"
  },
  {
    "id": 83,
    "name": "Mario Pedro",
    "born": "February 13, 1939",
    "died": "December 14, 2017",
    "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
    "url": "http://localhost:3001/api/reformer/15",
    "image": null,
    "created": "2025-01-07T01:53:14.218Z",
    "placeOfBirth": {
      "name": "Governador Valadares, Minas Gerais, Brasil",
      "url": "http://localhost:3001/api/location/18"
    },
    "placeOfDeath": {
      "name": "Sao Carlos, Sao Paulo, Brasil",
      "url": "http://localhost:3001/api/location/83"
    }
  }
]
```

### Filter characters

You can also include filters in the URL by including additional query parameters. To start filtering add a ? followed by the query <query>=<value>. If you want to chain several queries in the same call, use & followed by the query.

For example, if you want to check how many Pedro's born in 1939 exist, just add ?name=John&born=February 13, 1939 to the URL.

Available parameters:

- name: filter by the given name.
- born: filter by the given birth date.
- died: filter by the given death date.

```
GET http://localhost:3001/api/reformer/?name=pedro&born=1939
```
```
[
  {
    "id": 15,
    "name": "Mario Pedro",
    "born": "February 13, 1939",
    "died": "December 14, 2017",
    "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
    "createdAt": "2025-01-07T01:53:14.218Z",
    "birthPlace": {
      "id": 18,
	"name": "Governador Valadares, Minas Gerais, Brasil"
    },
    "deathPlace": {
      "id": 3,
      "name": "Sao Carlos, Sao Paulo, Brasil"
    },
    "image": null
  },
  {
    "id": 16,
    "name": "Pedro da Silva",
    "born": "February 13, 1939",
    "died": "December 14, 2017",
    "contribution": "Founder of Ligonier Ministries; educator and author who popularized Reformed Presbyterian theology through books and teachings.",
    "createdAt": "2025-01-07T01:53:14.218Z",
    "birthPlace": null,
    "deathPlace": null,
    "image": null
  }
]
```
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

### Connect with me:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tiago1820/)
[![Support](https://img.shields.io/badge/Support-Donate-ff69b4?style=for-the-badge)](https://buymeacoffee.com/tiago1820)
