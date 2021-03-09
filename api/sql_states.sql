CREATE TABLE photography (photo_id int NOT NULL AUTO_INCREMENT, title varchar(255), slug varchar(255), description text, image_name varchar(255), PRIMARY KEY (photo_id));

INSERT INTO photography (title, slug, description, image_name) VALUES ("Waves at Jenny Lake", "wave-at-jenny-lake", "Waves left over from the ferry that crosses Jenny Lake.", "0000811_0000811-R1-014-5A");