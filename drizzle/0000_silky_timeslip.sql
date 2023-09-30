CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`first_name` varchar(256),
	`last_name` varchar(256),
	`date_of_birth` date,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
