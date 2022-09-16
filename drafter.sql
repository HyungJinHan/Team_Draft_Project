create table leader_tbl (
leader_name 		varchar(20) primary key,
leader_pw 		varchar(20) not null,
leader_hope		varchar(20) not null,
leader_grade		varchar(20) not null,
leader_class		varchar(20) not null
);

create table member_tbl (
member_name 		varchar(20) primary key,
member_pw 		varchar(20) not null,
member_hope		varchar(20) not null,
member_class		varchar(20) not null
);