# API guidelines

APIs are developers user interfaces, and should be treated as such in order to make them usable
and readable.


## Requirements

All APIs (either internal or external) should be designed so that they can be opened to public in a
matter of hours. This means that the following should be in place:

* Up-to-date documentation
* Versioning
* Authentication
* Ratelimiting


## URLs and actions

API should use REST verbs to provide CRUD actions:

* `GET /tickets` - Retrieves a list of tickets
* `GET /tickets/12` - Retrieves a specific ticket
* `POST /tickets` - Creates a new ticket
* `PUT /tickets/12` - Replace ticket #12
* `PATCH /tickets/12` - Partially updates ticket #12
* `DELETE /tickets/12` - Deletes ticket #12


## Resource relations

When resource can only exist within another resource, they should be mapped together:

* `GET /tickets/12/messages` - Retrieves list of messages for ticket #12
* `GET /tickets/12/messages/5` - Retrieves message #5 for ticket #12
* `POST /tickets/12/messages` - Creates a new message in ticket #12
* `PUT /tickets/12/messages/5` - Replace message #5 for ticket #12
* `PATCH /tickets/12/messages/5` - Partially updates message #5 for ticket #12
* `DELETE /tickets/12/messages/5` - Deletes message #5 for ticket #12


### Difference between PUT and PATCH

__PUT - Replaces the resource with modified version of it__

`GET /tickets/12` response
```json
{
    "id": 12,
    "status": "open"
}
```
`PUT /tickets/12` request body
```json
{
    "status": "closed"
}
```
`GET /tickets/12` response with replaced resource
```json
{
    "status": "closed"
}
```

__PATCH - Applies set of changes to a resource__

`GET /tickets/12` response
```json
{
    "id": 12,
    "status": "open"
}
```
`PATCH /tickets/12` request body
```json
{
    "status": "closed"
}
```
`GET /tickets/12` response with upadated resource
```json
{
    "id": 12,
    "status": "closed"
}
```


## Filtering

Use query parameters for filtering `GET /tickets?state=open`.

NOTE! Some of these parameters can be reserved for utilities like searching and sorting.


## Sorting

Use `sort` query parameter for sorting `GET /tickets?sort=-priority` for descending order of
priority or `GET /tickets?sort=-priority,created_at` for descending order of priority and creation
date.


## Searching

For search queries use `q` query parameter `GET /tickets?q=docker`


## Query aliases for common requests

For ease of use, consider creating aliases for common queries, like `GET /tickets/recently_closed`


## Creation and update should return created/updated resource

In order to avoid consumer to have to hit API again, any POST/PUT requests should also return the
resource in question.


## POST, PUT input

Any POST, PUT input should only take JSON encoded body as input, instead of any urlencoded
parameters as they don't support data types, which forces the API to parse strings to integers
and booleans.

An API that accepts JSON encoded POST, PUT requests should also require the `Content-Type`
header be set to `application/json` or throw a `415 Unsupported Media Type` HTTP status code.


## Authentication

Authentication should be stateless and happen with `apikey` query parameter,
`DELETE /tickets/12/messages/5?apikey=qwertyuiop1234567890`

__Note!__ This is a temporary solution for now. This needs to be refined into key+secret setup
where request are hashed with secret to prevent man-in-the-middle attacks. Also, plain apikeys
will be also stored into access logs.


## Versioning

Every API should be versioned using "year-month-day" dates (with leading zeros, `2017-01-19`)
as major/breaking "version numbers". This enables independent API updates on microservice level
instead of versioning the whole API.

Any date should be accepted, at which point the closest version from the past should be used,
this way the consumer doesn't have to worry about specific versions of each endpoint/microservice
as they can just lock down the API to fe. the current date.

__Example:__

If service has two major api versions: `2017-01-01` and `2016-10-10`, when request is made with
`apiversion=2017-01-19`, the `2017-01-01` version should be used. Likewise, if the request would
be made with `apiversion=2016-12-01`, `2016-10-10` version should be used.

The API version should accepted with either query parameter or custom header.

### Query parameter

`?apiversion=2017-01-19`

```javascript
request.get('http://api.company.com/contents/sdf86s89fosd?apiversion=2017-01-19')
```

### Custom header

`company-apiversion=2017-01-19`

```javascript
request({
  method: 'get',
  uri: 'http://api.company.com/contents/sdf86s89fosd?apiversion=2017-01-19',
  headers: {
    'company-apiversion': '2017-01-19'
  }
})
```

### Breaking changes

All API changes should by default be done in backwards compatible (non-breaking) manner. Any
breaking change should have separate API version.

Breaking changes include:

* Adding new required parameter
* Changing url resources
* Changing response structures

Non-breaking changes include:

* Adding new API resources.
* Adding new optional request parameters to existing API methods.
* Adding new properties to existing API responses.
* Changing the order of properties in existing API responses.
* Changing the length or format of object IDs or other opaque strings.
* Adding new event types. Your webhook listener should gracefully handle unfamiliar events types.


## Errors

In the case of errors, API should always return useful error messages with unique error `code`,
error `message` and optional `description`:

```json
{
  "code" : 1234,
  "message" : "Something bad happened :(",
  "description" : "More details about the error here"
}
```

Validation errors should include field breakdown:

```json
{
  "code" : 1024,
  "message" : "Validation Failed",
  "errors" : [
    {
      "code" : 5432,
      "field" : "first_name",
      "message" : "First name cannot have fancy characters"
    },
    {
       "code" : 5622,
       "field" : "password",
       "message" : "Password cannot be blank"
    }
  ]
}
```

## HTTP status codes

API should always respond with meaningful status code, below is curated list of the most important
status codes:

__2xx success__

* `200 OK` - Standard response for successful HTTP requests.
* `201 Created` - The request has been fulfilled, resulting in the creation of a new resource.
Should also return the newly craeted resource.
* `204 No Content` - The server successfully processed the request and is not returning any
content.

__3xx redirection__

* `304 Not Modified` - Indicates that the resource has not been modified since the version
specified by the request headers If-Modified-Since or If-None-Match. In such case, there is no
need to retransmit the resource since the client still has a previously-downloaded copy.
* `307 Temporary Redirect` - In this case, the request should be repeated with another URI;
however, future requests should still use the original URI. In contrast to how 302 was historically
implemented, the request method is not allowed to be changed when reissuing the original request.
For example, a POST request should be repeated using another POST request.
* `308 Permanent Redirect` - In this case, the request should be repeated with another URI;
however, future requests should still use the original URI. In contrast to how 302 was historically
implemented, the request method is not allowed to be changed when reissuing the original request.
For example, a POST request should be repeated using another POST request.

__Client error__

* `400 Bad Request` - The server cannot or will not process the request due to an apparent client
error (e.g., malformed request syntax, too large size, invalid request message framing, or
deceptive request routing).
* `401 Unauthorized` - Similar to 403 Forbidden, but specifically for use when authentication is
required and has failed or has not yet been provided.
* `403 Forbidden` - The request was a valid request, but the server is refusing to respond to it.
The user might be logged in but does not have the necessary permissions for the resource.
* `404 Not Found` - The requested resource could not be found but may be available in the future.
Subsequent requests by the client are permissible

__Server error__

* `500 Internal Server Error` - A generic error message, given when an unexpected condition was
encountered and no more specific message is suitable

See full list at
[Wikipedia - List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)


## Asynchronous workers

Any significant amount of work, which doesn't expect immediate results (image edits etc.) should
be done through queue-worker patterns.

* Speeds up the primary request path. Since you're only doing a portion of the total work that
needs to get done as part of the request.
* Spreads loads to easy to scale worker processes. Perfect for an auto-scaling setup, where the
number of workers changes dynamically based on available work to be done.
* Reduces error scenarios on the primary service API. When jobs running in async workers fail,
they can be retried behind the scenes without forcing the requesting service to wait.


## Consuming an microservice API

### Timeouts

Timeouts for consuming microservices should be set aggressively in order to avoid
_thundering herds_ and to make it clear when a microservice fails, as requests that are timing
out will immediately point to the failing serice, instead of cascading out.
