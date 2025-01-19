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