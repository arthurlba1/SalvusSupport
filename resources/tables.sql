CREATE TABLE profission 
(
	prof_Id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	prof_name VARCHAR NOT NULL
);

CREATE TABLE speciality
(
	specId int GENERATED ALWAYS AS IDENTITY,
	spec_name VARCHAR NOT NULL,
	prof_id_fk int NOT NULL,
	CONSTRAINT profId_spec_fk FOREIGN KEY (prof_id_fk) REFERENCES profission(prof_Id) 
);

CREATE TABLE professional_info
(	
	profId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	prof_id_fk int NOT NULL,
	prof_reg_number VARCHAR NOT NULL,
	prof_number VARCHAR NOT NULL,
	prof_location VARCHAR NOT NULL,
	prof_displacement VARCHAR NOT NULL,
	prof_spec int[],
	CONSTRAINT profId_prof_fk FOREIGN KEY (prof_id_fk) REFERENCES profission(prof_Id) 
);

CREATE TABLE users 
(
	userId int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  
	avatar VARCHAR,
	full_name VARCHAR NOT NULL,
	login VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	pass VARCHAR NOT NULL,
	gender VARCHAR NOT NULL,
	birth_date DATE NOT NULL,
	prof_id_fk int NOT NULL,
	CONSTRAINT prof_id_user FOREIGN KEY (prof_id_fk) REFERENCES professional_info(profId)
);

CREATE TABLE doc_upload
(
	doc_id int GENERATED ALWAYS AS IDENTITY,
	user_id_fk INT NOT NULL,
	file_content VARCHAR,
	file_name VARCHAR NOT NULL,
	CONSTRAINT user_doc FOREIGN KEY (user_id_fk) REFERENCES users(userId) 
);


	