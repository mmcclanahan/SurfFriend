CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  sessiontoken VARCHAR(255),
)
CREATE TABLE userStatus (
  id SERIAL PRIMARY KEY,
  status INTEGER NOT NULL,
  location VARCHAR(255),
  rating INTEGER,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
)
CREATE TABLE friends (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
  friendId INTEGER REFERENCES users(id) ON DELETE CASCADE,
  accepted BOOLEAN NOT NULL,
)

CREATE INDEX idx_userStatus_userId ON userStatus(userId);
CREATE INDEX idx_friends_userId ON friends(userId);
