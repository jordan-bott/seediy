## User Endpoints

<details><summary>Create an Account</summary>

```
- Endpoint path: /api/users
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "username": string,
        "password": string,
        "password_confirmation": string,
        "email": string,
        "zip_code": string
  	}
  	"""

- Response: Created Account
- Response shape (JSON):
  """
  	{
		"id": int,
		"username": string,
        "password_hash": string,
        "email": string,
        "zip_code": string,
        "posts": int,
        "sprouts": int,
        "date_created": date,
        "units": string,
        "lon": string,
        "lat": string,
        "zone": string,
        "first_frost": date,
        "last_frost": date,
        "high_temp": string,
        "low_temp": string
  	}
	"""
```

</details>

<details><summary>Login</summary>

```

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    """
		json
    {
      "account": {
        «key»: type»,
      },
      "token": string
    }
    	"""
```

</details>

<details><summary>Logout</summary>

```

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    """
		json
    true
    	"""
```

</details>

<details><summary>Get Token</summary>

```
* Endpoint path: /token
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    """
		{
			"access_token": string,
			"account": dict
		}
    	"""
```

</details>
