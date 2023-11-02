steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            type VARCHAR(100) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(1000) UNIQUE NOT NULL,
            verified BOOLEAN DEFAULT FALSE,
            posts INTEGER NOT NULL DEFAULT 0,
            sprouts INTEGER NOT NULL DEFAULT 0,
            likes INTEGER NOT NULL DEFAULT 0,
            instaseeds INTEGER NOT NULL DEFAULT 0,
            date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            password_hash VARCHAR(2000) NOT NULL,
            units VARCHAR(100) NOT NULL DEFAULT 'imperial',
            zipcode VARCHAR(100) NOT NULL,
            lon VARCHAR(100) NOT NULL,
            lat VARCHAR(100) NOT NULL,
            zone VARCHAR(100) NOT NULL,
            first_frost TIMESTAMP NOT NULL,
            last_frost TIMESTAMP NOT NULL,
            high_temp INT NOT NULL DEFAULT 95,
            low_temp INT NOT NULL DEFAULT 38
        );
        """,
        """
        DROP TABLE users;
        """
    ],
    [
        """
        CREATE TABLE plant_types (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(1000) NOT NULL
        );
        """,
        """
        DROP TABLE plant_types;
        """
    ],
    [
        """
        CREATE TABLE seed_storages (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(1000) NOT NULL,
            color VARCHAR(10) NOT NULL,
            notes TEXT
        );
        """,
        """
        DROP TABLE seed_storage;
        """
    ],
    [
        """
        CREATE TABLE seeds (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(1000) NOT NULL,
            nickname VARCHAR(100) NOT NULL,
            quantity INTEGER NOT NULL,
            days_to_harvest INTEGER NOT NULL,
            frost_hardy BOOLEAN NOT NULL,
            planted BOOLEAN DEFAULT FALSE,
            season VARCHAR(100) NOT NULL,
            water_needs INTEGER NOT NULL,
            rating INTEGER NOT NULL,
            brand VARCHAR(1000) NOT NULL,
            url VARCHAR(2000) NOT NULL,
            category VARCHAR(100) NOT NULL,
            plant_type_id INTEGER REFERENCES plant_types(id) ON DELETE SET NULL,
            seed_storage_id INTEGER REFERENCES seed_storages(id) ON DELETE SET NULL,
            on_list BOOLEAN DEFAULT FALSE,
            notes TEXT
        );
        """,
        """
        DROP TABLE seeds;
        """
    ],
    [
        """
        CREATE TABLE plants (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            seed_id INTEGER REFERENCES seeds(id) ON DELETE CASCADE,
            date_planted TIMESTAMP NOT NULL,
            location VARCHAR(1000) NOT NULL,
            currently_planted BOOLEAN DEFAULT TRUE,
            harvest_date TIMESTAMP,
            notes TEXT
        );
        """,
        """
        DROP TABLE plants;
        """
    ],
    [
        """
        CREATE TABLE water_logs (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            plant_id INTEGER REFERENCES plants(id) ON DELETE CASCADE,
            date TIMESTAMP NOT NULL
        );
        """,
        """
        DROP TABLE water_logs;
        """
    ],
    [
        """
        CREATE TABLE topics (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) UNIQUE NOT NULL,
            color VARCHAR(10) NOT NULL
        );
        """,
        """
        DROP TABLE topics;
        """
    ],
    [
        """
        CREATE TABLE instaseeds (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            location VARCHAR(1000) NOT NULL,
            season VARCHAR(1000) NOT NULL,
            likes INTEGER NOT NULL DEFAULT 0
        );
        """,
        """
        DROP TABLE instaseeds;
        """
    ],
    [
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            post_id INTEGER REFERENCES instaseeds(id) ON DELETE CASCADE,
            UNIQUE (user_id, post_id)
        );
        """,
        """
        DROP TABLE likes;
        """
    ],
    [
        """
        CREATE TABLE blogs (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            topic INTEGER REFERENCES topics(id) ON DELETE SET NULL,
            text TEXT NOT NULL
        );
        """,
        """
        DROP TABLE blogs;
        """
    ],
    [
        """
        CREATE TABLE blog_comments (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
            parent_comment INTEGER REFERENCES blog_comments(id) ON DELETE CASCADE,
            text TEXT NOT NULL
        );
        """,
        """
        DROP TABLE blog_comments;
        """
    ],
    [
        """
        CREATE TABLE sprouts (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE sprouts;
        """
    ]
]
