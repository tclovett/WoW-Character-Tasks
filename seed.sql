CREATE TABLE users (
userID INT,
username TEXT,
password TEXT
);
CREATE TABLE character (
charID INT,
charname TEXT,
dailies BOOLEAN,
mythic INT,
raid INT,
userID INT
);

INSERT INTO users VALUES (1, 'Sio', '$S72t*8"X&VcDGmM'),(2, 'Lovix', '~rMdJZzxdR+<r;7q'),(3, 'Mave', 'CF-Q?/anFNL.Y83;');
INSERT INTO character VALUES (1, 'Siochi', 'true', 4, 2, 1),(2, 'Siodies', 'false', 2, 8, 1),(3, 'Lovixx', 'true', 1, 2, 2),(4, 'Mavern', 'false', 8, 1, 3),
(5, 'Mavix', 'true', 5, 4, 3);
