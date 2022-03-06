CREATE DATABASE test;


CREATE TABLE company(id SERIAL PRIMARY KEY,
                                       company_name VARCHAR(255),
                                                    company_name_katakana VARCHAR(255),
                                                                          address VARCHAR(255),
                                                                                  postal_code VARCHAR(255),
                                                                                              phone_number VARCHAR(255),
                                                                                                           email VARCHAR(255),
                                                                                                                 website VARCHAR(255),
                                                                                                                         date_of_establishment DATE, remark VARCHAR(255),
                                                                                                                                                            profile_image VARCHAR(255),
                                                                                                                                                                          UNIQUE(email));


INSERT into company(company_name, company_name_katakana, address, postal_code, phone_number, email, website, date_of_establishment, remark, profile_image)
VALUES ('company_01',
        'カイシャ',
        'address',
        '000-0000',
        '090102030405',
        'company_01@gmail.com',
        'www.company_01.com',
        '2022-01-01',
        'remark',
        'https://i.pravatar.cc/300');


CREATE TABLE account(id SERIAL PRIMARY KEY,
                                       name VARCHAR(255),
                                            name_katakana VARCHAR(255),
                                                          employee_number INT, department VARCHAR(255),
                                                                                          email VARCHAR(255),
                                                                                                phone_number VARCHAR(255),
                                                                                                             address VARCHAR(255),
                                                                                                                     postal_code VARCHAR(255),
                                                                                                                                 date_of_birth DATE, remark VARCHAR(255),
                                                                                                                                                            password TEXT, profile_image VARCHAR(255),
                                                                                                                                                                                         type VARCHAR(255),
                                                                                                                                                                                              UNIQUE(email),
                                                                                                                                                                                              CONSTRAINT check_type CHECK (type IN ('system admin',
                                                                                                                                                                                                                                    'admin',
                                                                                                                                                                                                                                    'user')));


INSERT into account(name, name_katakana, employee_number, department, email, phone_number, address, postal_code, date_of_birth, remark, password, profile_image, type)
VALUES ('user_01',
        'user_01',
        '101',
        'department',
        'user_01@gmail.com',
        '090102030405',
        'address',
        '000-0000',
        '2022-01-01',
        'remark',
        'password',
        'https://i.pravatar.cc/300',
        'system admin');