create table User(
    id bigint not null primary key,
    login varchar(50) not null unique,
    preferred_currency varchar(50) not null
);

create table Product(
    id bigint not null primary key,
    name varchar(50) not null,
    description varchar(255),
    cost_value bigint not null,
    cost_currency varchar(255) not null,
    seller bigint not null,
    foreign key(seller) references User(id)
);

create sequence user_id_sequence start with 1;
create sequence product_id_sequence start with 1;