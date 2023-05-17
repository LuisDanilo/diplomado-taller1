CREATE TABLE "products" (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(50) UNIQUE NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100),
    price INT NOT NULL,
    quantity INT NOT NULL
);

INSERT INTO "products"(uuid, name, description, price, quantity) VALUES ('c3aa7490-c62e-4d8e-a858-fd2d5de1b83f', 'Mentas Chao!', NULL, 150000, 100);
INSERT INTO "products"(uuid, name, description, price, quantity) VALUES ('367568de-9349-4425-a184-c3d52caca7e2', 'Bon Bon Bum', NULL, 130500, 150);
INSERT INTO "products"(uuid, name, description, price, quantity) VALUES ('f747c0d4-a95a-4480-b347-61038e442cb0', 'Papas Yeni', NULL, 101200, 50);
INSERT INTO "products"(uuid, name, description, price, quantity) VALUES ('0cb79493-bb84-496f-a058-4ce6fbf1a14f', 'Galletas Capri', NULL, 230150, 80);
INSERT INTO "products"(uuid, name, description, price, quantity) VALUES ('e093e04d-3607-4d30-82cb-fff9a9f4d458', 'Tostacos', NULL, 500000, 20);