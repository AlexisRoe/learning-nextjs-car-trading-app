-- Up

CREATE TABLE Person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email  TEXT,
    password TEXT
);

CREATE TABLE Vehicle ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model Text, 
    ownerID INTEGER REFERENCES Person(id)
);

-- INSERT INTO Person (name, email) values ("bruno", "bruno@something.pt");
-- INSERT INTO Person (name, email) values ("jack", "jack@something.pt");

-- INSERT INTO Vehicle (brand, model, ownerID) values ("mercedes", "GT 500", 1);
-- INSERT INTO Vehicle (brand, model, ownerID) values ("audi", "R8", 2);

-- Down

DROP TABLE Person;
DROP TABLE Vehicle;