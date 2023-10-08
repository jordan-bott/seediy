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
        "type": string,
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

<details><summary>Create an Admin Account</summary>

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

- Response: Created Admin Account
- Response shape (JSON):
  """
  	{
		"id": int,
        "type": string,
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

<details><summary>Update an Account</summary>

```
- Endpoint path: /api/users/{id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "username": string,
        "email": string,
        "zip_code": string,
        "units": string
        "high_temp": string,
        "low_temp": string
  	}
  	"""

- Response: Updated Account
- Response shape (JSON):
  """
  	{
		"id": int,
        "type": string,
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

<details><summary>Update Account Password</summary>

```
- Endpoint path: /api/users/{id}/password
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "password": string,
        "password_confirmation": string
  	}
  	"""

- Response: Updated Account
- Response shape (JSON):
  """
  	{
		"id": int,
        "type": string,
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

<details><summary>Update Account to Admin</summary>

```
- Endpoint path: /api/users/{id}/admin
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "type": string
  	}
  	"""

- Response: Updated Account
- Response shape (JSON):
  """
  	{
		"id": int,
        "type": string,
		"username": string,
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

<details><summary>Delete A User</summary>

```
* Endpoint path: /api/users/{user_id}
* Endpoint method: DELETE
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: Boolean
* Response shape (bool):
    """
	bool
    """
```

</details>

<details><summary>Get List of Users</summary>

```
* Endpoint path: /api/users
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: View Users
* Response shape (JSON):
    """
		[
			{
			"id": int,
            "type": string,
            "username": string,
            "email": string,
            "zip_code": string,
            "posts": int,
            "sprouts": int,
            "date_created": date
			}
		]
    	"""
```

</details>

<details><summary>Get one User</summary>

```
* Endpoint path: /api/users/{user_id}
* Endpoint method: GET
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: View User
* Response shape (JSON):
    """
		{
		"id": int,
        "type": string,
		"username": string,
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

## Seed Endpoints

<details><summary>Create a Seed</summary>

```
- Endpoint path: /api/seeds
- Endpoint method: POST

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "notes": string
  	}
  	"""

- Response: Created Seed
- Response shape (JSON):
  """
  	{
		"id": int,
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "planted": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "on_list": boolean,
        "notes": string
  	}
	"""
```

</details>

<details><summary>Update a Seed</summary>

```
- Endpoint path: /api/seeds/{seed_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "notes": string
  	}
  	"""

- Response: Updated Seed
- Response shape (JSON):
  """
  	{
		"id": int,
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "planted": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "on_list": boolean,
        "notes": string
  	}
	"""
```

</details>

<details><summary>Update a Seed to Planted</summary>

```
- Endpoint path: /api/seeds/{seed_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "planted": boolean
  	}
  	"""

- Response: Updated Seed
- Response shape (JSON):
  """
  	{
		"id": int,
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "planted": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "on_list": boolean,
        "notes": string
  	}
	"""
```

</details>

<details><summary>Update a Seed to On List</summary>

```
- Endpoint path: /api/seeds/{seed_id}
- Endpoint method: PUT

- Headers:

  - Authorization: Bearer token

- Request shape (JSON):

  """
  	{
        "on_list": boolean
  	}
  	"""

- Response: Updated Seed
- Response shape (JSON):
  """
  	{
		"id": int,
        "user_id": int,
        "name" string,
        "nickname": string,
        "quantity": int,
        "days_to_harvest": int,
        "frost_hardy": string,
        "planted": string,
        "season": string,
        "water_needs": int,
        "rating": int,
        "brand": string,
        "url": string,
        "plant_type_id": int,
        "category": string,
        "seed_storage_id": int,
        "on_list": boolean,
        "notes": string
  	}
	"""
```

</details>

<details><summary>Delete A Seed</summary>

```
* Endpoint path: /api/seeds/{seed_id}
* Endpoint method: DELETE
* Query parameters:
  * user_id: user_id

* Headers:
  * Authorization: Bearer token

* Response: Boolean
* Response shape (bool):
    """
	bool
    """
```

</details>

<details><summary>Get List of User Seeds</summary>

```
* Endpoint path: /api/users/{user_id}/seeds
* Endpoint method: GET


* Headers:
  * Authorization: Bearer token

* Response: View Users
* Response shape (JSON):
    """
		[
			{
				"id": int,
                "user_id": int,
                "name" string,
                "nickname": string,
                "quantity": int,
                "days_to_harvest": int,
                "frost_hardy": string,
                "planted": string,
                "season": string,
                "water_needs": int,
                "rating": int,
                "brand": string,
                "url": string,
                "plant_type_id": int,
                "category": string,
                "seed_storage_id": int,
                "on_list": boolean,
                "notes": string
			}
		]
    	"""
```

</details>
