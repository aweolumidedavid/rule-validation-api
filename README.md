# rule-validation-api

WORK TITLE: Flutterwave NodeJs Dev Intern Entry Submission


The task:
Create a simple rule-validation API with two routes:
    -  HTTP GET "/"
    -  HTTP POST "/validate-rule"
       Note: The second route should accept JSON data containing a rule and data field to validate the rule against.

Technology Used: NodeJs and Heroku for deployment

How to test
 - With Postman

API endpoints
    - GET request: https://rule-validation-deploy.herokuapp.com/
    - POST request: https://rule-validation-deploy.herokuapp.com/validate-rule

= EX1 =
{
  "rule": {
    "field": "missions"
    "condition": "gte",
    "condition_value": 30
  },
  "data": {
    "name": "James Holden",
    "crew": "Rocinante",
    "age": 34,
    "position": "Captain",
    "missions": 45
  }
}

Response: (HTTP 200)
{
  "message": "field missions successfully validated."
  "status": "success",
  "data": {
    "validation": {
      "error": false,
      "field": "missions",
      "field_value": 45,
      "condition": "gte",
      "condition_value: 30
    }
  }
}


