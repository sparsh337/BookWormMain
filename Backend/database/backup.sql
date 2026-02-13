-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: bookworm_master
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attribute_master`
--

DROP TABLE IF EXISTS `attribute_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_master` (
  `attribute_id` int NOT NULL AUTO_INCREMENT,
  `attribute_desc` varchar(50) NOT NULL,
  PRIMARY KEY (`attribute_id`),
  UNIQUE KEY `UK_1uju6ylnq2sj3iv6i8tn3vb2x` (`attribute_desc`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_master`
--

LOCK TABLES `attribute_master` WRITE;
/*!40000 ALTER TABLE `attribute_master` DISABLE KEYS */;
INSERT INTO `attribute_master` VALUES (3,'Duration'),(4,'File Size'),(1,'Format'),(2,'Pages'),(5,'Quality');
/*!40000 ALTER TABLE `attribute_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `author_mail` varchar(100) NOT NULL,
  `author_name` varchar(80) NOT NULL,
  `biography` text,
  `created_at` datetime(6) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `UK_bh2rb1mttobvuxiv1hyafy900` (`author_mail`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (1,'orwell@books.com','George Orwell','British novelist, essayist, and critic.',NULL,'101',NULL),(2,'rahul@history.in','Rahul Sankrityayan','The Father of Indian Travelogue.',NULL,'102',NULL),(3,'tagore@literature.in','Rabindranath Tagore','Nobel laureate and creator of Gitanjali.',NULL,'103',NULL),(4,'bard@stratford.com','William Shakespeare','The greatest dramatist and poet.',NULL,'104',NULL),(5,'sane@marathi.in','Sane Guruji','Marathi author known for Shyamachi Aai.',NULL,'105',NULL),(6,'shrenik@horror.in','Shrenik Sarde','Contemporary Marathi horror writer.',NULL,'106',NULL),(7,'suraj@literature.in','Suraj Gatade','Author of Rahee.',NULL,'107',NULL),(8,'sachin@stories.in','Sachin Kulli','Regional Marathi author.',NULL,'108',NULL),(9,'katherine@audio.com','Katherine Applegate','American children\'s author.',NULL,'109',NULL),(10,'michelle@audio.com','Michelle Hodkin','Author of Mara Dyer trilogy.',NULL,'110',NULL),(11,'gregg@thriller.com','Gregg Hurwitz','Suspense and thriller novelist.',NULL,'111',NULL);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficiary_master`
--

DROP TABLE IF EXISTS `beneficiary_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficiary_master` (
  `ben_id` int NOT NULL AUTO_INCREMENT,
  `account_no` varchar(20) NOT NULL,
  `account_type` varchar(20) DEFAULT NULL,
  `bank_branch` varchar(100) DEFAULT NULL,
  `bank_name` varchar(100) NOT NULL,
  `ben_name` varchar(100) NOT NULL,
  `ben_contact_no` varchar(15) DEFAULT NULL,
  `ben_email` varchar(100) DEFAULT NULL,
  `ifsc` varchar(15) NOT NULL,
  `pan` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ben_id`),
  UNIQUE KEY `UK_das5el8nn7q65h26ii3gc8n6` (`ben_email`),
  UNIQUE KEY `UK_gcnbymnp1035ghb3tre63qt6` (`pan`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiary_master`
--

LOCK TABLES `beneficiary_master` WRITE;
/*!40000 ALTER TABLE `beneficiary_master` DISABLE KEYS */;
INSERT INTO `beneficiary_master` VALUES (1,'ACCT-1001','SAVINGS','Main Branch','ICICI Bank','Bookworm Holdings Ltd.','9999999991','finance@bookworm.com','ICIC0001','PAN-BW01'),(2,'ACCT-1002','CURRENT','Creative Branch','HDFC Bank','Author Royalty Fund','9999999992','royalty@writers.in','HDFC0002','PAN-AF02'),(3,'ACCT-1003','SAVINGS','Delhi Branch','SBI','Literature Foundation','9999999993','contact@litfound.org','SBIN0003','PAN-LF03'),(4,'ACCT-1004','CURRENT','Digital Branch','Axis Bank','Digital Rights Collective','9999999994','admin@drc.com','AXIS0004','PAN-DR04'),(5,'ACCT-1005','SAVINGS','Kolkata Branch','Standard Chartered','The Tagore Estate','9999999995','trustee@tagore.in','SCBL0005','PAN-TE05');
/*!40000 ALTER TABLE `beneficiary_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `added_at` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `rent_days` int DEFAULT NULL,
  `tran_type` char(1) NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `library_package_id` int DEFAULT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `FKgol9os2lyo1m4bu3aa5rg7jyl` (`user_id`),
  KEY `FKob00ccu2ah9ddh7gwjo972afn` (`product_id`),
  KEY `FKn3ooxk5u7f36oradamhrj17dq` (`library_package_id`),
  CONSTRAINT `FKgol9os2lyo1m4bu3aa5rg7jyl` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`),
  CONSTRAINT `FKn3ooxk5u7f36oradamhrj17dq` FOREIGN KEY (`library_package_id`) REFERENCES `library_package` (`package_id`),
  CONSTRAINT `FKob00ccu2ah9ddh7gwjo972afn` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_name` varchar(80) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_15te7pnyam7yyif34eumhp2j6` (`user_mail`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'2026-01-29 07:45:17.534111','$2a$10$Cu2GY/ZTCoFvm3j6AVIe5ObaMZEQTLpDEvty.mtl9Pk2GMlBEjl6e','7856941230',NULL,'ROLE_ADMIN','admin@mail.com','admin'),(2,'2026-01-29 07:52:22.210898','$2a$10$lnI4qhDhX6fK/Pazl1QlfeLyyjGEtFkxwinp00O0XLonLP/WAnCVC','9874563210',NULL,'ROLE_USER','sparsh@test.com','Sparsh'),(3,'2026-01-29 08:47:37.416794','$2a$10$mx90nQIzZZPE84FF7Liw4.KQyPGm62e.gzRyxkfW6rRN83Ii0Zk8S',NULL,'https://lh3.googleusercontent.com/a/ACg8ocIw0gFxqn1sPatBg2FaQmI2I0gkkl_mKgTG5ombAUCnISR2lw6ayg=s96-c','ROLE_USER','spdoshi337@gmail.com','Sparsh Doshi'),(4,'2026-01-29 17:52:08.720776','$2a$10$Cty7b6JdlHuDXRxvzhG1gOZPrl1EX5UWKi44IJMzu30bkG7xnQ7gq','9564871230',NULL,'ROLE_USER','test@mail.com','test'),(5,'2026-02-02 03:50:59.814486','$2a$10$E8iK8rkarqXGKO0k74QLhuZjRskoXU0GjjpLt8Rdf2YQqjbpmCrYO','9981483978',NULL,'ROLE_USER','tushar@gmail.com','tushar gupta'),(6,'2026-02-03 08:21:11.838182','$2a$10$8QhgqPfJ7h7GmgXpKvgQE.5ZFcHLPAG6bC.FdyYo/TXXiODzPOqnG','7896532140',NULL,'ROLE_USER','madhurac1330@gmail.com','Madhura'),(7,'2026-02-03 11:24:33.287527','$2a$10$e4p9VBECp2IoF.5PPDh./uo8ehz/glw7urBeRB0IaQJXx7wTfEMZ2','8291102059',NULL,'ROLE_USER','harshjaiswar68102@gmail.com','Harsh Jaiswar'),(8,'2026-02-04 15:50:11.145171','$2a$11$CGdp2F1depby7/5pUc68weIeRuvo0dLg.YM7Gj7uXD/nwQPobMbe.','7859874560',NULL,'ROLE_USER','om123@gmail.com','om'),(9,'2026-02-05 14:57:50.574707','$2a$10$FqzqGwHIRxPe7P3x9YGtCO1xepiL.HAbPJohdipn3XYU4q20bM4.6','7895647321',NULL,'ROLE_USER','sparshwork37@gmail.com','John Doe');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_master`
--

DROP TABLE IF EXISTS `genre_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_master` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `genre_desc` varchar(50) NOT NULL,
  `language_id` int DEFAULT NULL,
  PRIMARY KEY (`genre_id`),
  KEY `FKr1acc4hd88a76kguh611nrowi` (`language_id`),
  CONSTRAINT `FKr1acc4hd88a76kguh611nrowi` FOREIGN KEY (`language_id`) REFERENCES `language_master` (`language_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_master`
--

LOCK TABLES `genre_master` WRITE;
/*!40000 ALTER TABLE `genre_master` DISABLE KEYS */;
INSERT INTO `genre_master` VALUES (1,'Classic',1),(2,'Horror',2),(3,'Children',2),(4,'Novel',2),(5,'History',1),(6,'Biography',1),(7,'Drama',1),(8,'Social',3),(9,'Thriller',1);
/*!40000 ALTER TABLE `genre_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `invoice_id` int NOT NULL AUTO_INCREMENT,
  `invoice_amount` decimal(12,2) DEFAULT NULL,
  `invoice_date` date NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (1,0.00,'2026-01-29',2),(2,0.00,'2026-01-29',2),(3,21.00,'2026-01-29',2),(4,0.00,'2026-01-29',2),(5,0.00,'2026-01-29',2),(6,399.00,'2026-01-29',2),(7,149.00,'2026-01-29',3),(8,84.00,'2026-01-29',3),(9,249.00,'2026-01-29',3),(10,21.00,'2026-01-29',3),(11,35.00,'2026-01-29',3),(12,199.00,'2026-01-29',3),(13,0.00,'2026-01-29',3),(14,199.00,'2026-01-29',1),(15,598.00,'2026-01-29',1),(16,14.00,'2026-01-29',1),(17,199.00,'2026-01-29',3),(18,42.00,'2026-01-29',3),(19,0.00,'2026-01-29',3),(20,198.00,'2026-01-29',3),(21,0.00,'2026-01-29',4),(22,147.00,'2026-01-29',4),(23,149.00,'2026-01-29',4),(24,22.00,'2026-01-30',3),(25,199.00,'2026-01-30',3),(26,0.00,'2026-01-30',3),(27,50.01,'2026-01-30',3),(28,50.01,'2026-01-30',3),(31,199.00,'2026-02-02',5),(32,149.00,'2026-02-02',5),(33,33.34,'2026-02-02',5),(34,350.00,'2026-02-02',5),(35,120.00,'2026-02-02',3),(36,149.00,'2026-02-02',3),(37,28.00,'2026-02-03',3),(38,105.00,'2026-02-03',3),(39,898.00,'2026-02-03',6),(40,35.00,'2026-02-03',6),(41,967.01,'2026-02-03',7),(42,264.34,'2026-02-04',6),(43,16.67,'2026-02-04',6),(44,199.00,'2026-02-04',6),(45,49.00,'2026-02-04',3),(46,28.00,'2026-02-04',3),(47,284.00,'2026-02-04',8),(48,50.00,'2026-02-04',8),(49,50.00,'2026-02-04',8),(50,149.00,'2026-02-04',8),(51,56.00,'2026-02-04',8),(52,35.00,'2026-02-04',8),(53,50.00,'2026-02-05',3),(54,56.00,'2026-02-05',3),(55,56.00,'2026-02-05',6),(56,70.00,'2026-02-05',6),(57,50.01,'2026-02-05',6),(58,50.01,'2026-02-05',9),(59,134.00,'2026-02-05',9);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_detail`
--

DROP TABLE IF EXISTS `invoice_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_detail` (
  `inv_dtl_id` int NOT NULL AUTO_INCREMENT,
  `base_price` decimal(10,2) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  `rent_days` int DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `tran_type` char(1) NOT NULL,
  `invoice_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`inv_dtl_id`),
  KEY `FKit1rbx4thcr6gx6bm3gxub3y4` (`invoice_id`),
  KEY `FKbg5ko4eg8ngijc0mmbshx244m` (`product_id`),
  CONSTRAINT `FKbg5ko4eg8ngijc0mmbshx244m` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`),
  CONSTRAINT `FKit1rbx4thcr6gx6bm3gxub3y4` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_detail`
--

LOCK TABLES `invoice_detail` WRITE;
/*!40000 ALTER TABLE `invoice_detail` DISABLE KEYS */;
INSERT INTO `invoice_detail` VALUES (1,0.00,'Tagore Anthology',1,0,0.00,'L',1,3),(2,0.00,'Manav Samaj',1,0,0.00,'L',1,4),(3,0.00,'The Voyage of the Norman D.',1,0,0.00,'L',1,7),(4,0.00,'Romeo and Juliet',1,0,0.00,'L',2,5),(5,3.00,'Meri Europe Yatra',1,7,21.00,'R',3,2),(6,0.00,'Ambulancing On the French Front',1,0,0.00,'L',4,1),(7,0.00,'Theodosia Ernest',1,0,0.00,'L',5,8),(8,0.00,'The Voyage of the Norman D.',1,0,0.00,'L',5,7),(9,399.00,'The Nowhere Man',1,0,399.00,'P',6,17),(10,149.00,'Meri Europe Yatra',1,0,149.00,'P',7,2),(11,12.00,'The Nowhere Man',1,7,84.00,'R',8,17),(12,249.00,'Kalokh',1,0,249.00,'P',9,18),(13,3.00,'Meri Europe Yatra',1,7,21.00,'R',10,2),(14,5.00,'Ambulancing On the French Front',1,7,35.00,'R',11,1),(15,199.00,'Secrets of Crewe House',1,0,199.00,'P',12,6),(16,0.00,'Romeo and Juliet',1,0,0.00,'L',13,5),(17,0.00,'Theodosia Ernest',1,0,0.00,'L',13,8),(18,0.00,'Shyamachi Aai',1,0,0.00,'L',13,12),(19,199.00,'Ambulancing On the French Front',1,0,199.00,'P',14,1),(20,399.00,'Manav Samaj',1,0,399.00,'P',15,4),(21,199.00,'Secrets of Crewe House',1,0,199.00,'P',15,6),(22,2.00,'The Voyage of the Norman D.',1,7,14.00,'R',16,7),(23,199.00,'Rahee',1,0,199.00,'P',17,10),(24,6.00,'Rahee',1,7,42.00,'R',18,10),(25,0.00,'Rahee',1,0,0.00,'L',19,10),(26,0.00,'Romeo and Juliet',1,0,0.00,'L',20,5),(27,99.00,'Shyamachi Aai',1,0,99.00,'P',20,12),(28,99.00,'Baal Goshti',1,0,99.00,'P',20,13),(29,0.00,'Ambulancing On the French Front',1,0,0.00,'L',21,1),(30,0.00,'Tagore Anthology',1,0,0.00,'L',21,3),(31,0.00,'Manav Samaj',1,0,0.00,'L',21,4),(32,3.00,'Meri Europe Yatra',1,16,48.00,'R',22,2),(33,99.00,'Shyamachi Aai',1,0,99.00,'P',22,12),(34,149.00,'Meri Europe Yatra',1,0,149.00,'P',23,2),(35,2.00,'The Voyage of the Norman D.',1,11,22.00,'R',24,7),(36,199.00,'Ambulancing On the French Front',1,0,199.00,'P',25,1),(37,0.00,'Romeo and Juliet',1,0,0.00,'L',26,5),(38,0.00,'Theodosia Ernest',1,0,0.00,'L',26,8),(39,0.00,'Rahee',1,0,0.00,'L',26,10),(40,16.67,'Romeo and Juliet',1,0,16.67,'L',27,5),(41,16.67,'Theodosia Ernest',1,0,16.67,'L',27,8),(42,16.67,'Rahee',1,0,16.67,'L',27,10),(43,16.67,'Romeo and Juliet',1,0,16.67,'L',28,5),(44,16.67,'Theodosia Ernest',1,0,16.67,'L',28,8),(45,16.67,'Rahee',1,0,16.67,'L',28,10),(46,199.00,'Ambulancing On the French Front',1,0,199.00,'P',31,1),(47,149.00,'Meri Europe Yatra',1,0,149.00,'P',32,2),(48,16.67,'Manav Samaj',1,0,16.67,'L',33,4),(49,16.67,'The Voyage of the Norman D.',1,0,16.67,'L',33,7),(50,350.00,'Tagore Anthology',1,0,350.00,'P',34,3),(51,8.00,'Manav Samaj',1,15,120.00,'R',35,4),(52,149.00,'Meri Europe Yatra',1,0,149.00,'P',36,2),(53,4.00,'Rowdy Ganpat',1,7,28.00,'R',37,11),(54,8.00,'Manav Samaj',1,7,56.00,'R',38,4),(55,5.00,'Bhhoot',1,7,35.00,'R',38,9),(56,2.00,'The Voyage of the Norman D.',1,7,14.00,'R',38,7),(57,350.00,'Tagore Anthology',1,0,350.00,'P',39,3),(58,149.00,'Meri Europe Yatra',1,0,149.00,'P',39,2),(59,399.00,'Manav Samaj',1,0,399.00,'P',39,4),(60,5.00,'Ambulancing On the French Front',1,7,35.00,'R',40,1),(61,16.67,'Mounaat Arth Saare',1,0,16.67,'L',41,16),(62,399.00,'Wishtree',1,0,399.00,'P',41,14),(63,16.67,'Shyamachi Aai',1,0,16.67,'L',41,12),(64,149.00,'Meri Europe Yatra',1,0,149.00,'P',41,2),(65,5.00,'Ambulancing On the French Front',1,7,35.00,'R',41,1),(66,5.00,'Bhhoot',1,7,35.00,'R',41,9),(67,16.67,'Manav Samaj',1,0,16.67,'L',41,4),(68,299.00,'The Unbecoming of Mara Dyer',1,0,299.00,'P',41,15),(69,5.00,'Ambulancing On the French Front',1,8,40.00,'R',42,1),(70,16.67,'Romeo and Juliet',1,0,16.67,'L',42,5),(71,16.67,'The Voyage of the Norman D.',1,0,16.67,'L',42,7),(72,6.00,'Rahee',1,7,42.00,'R',42,10),(73,149.00,'Rowdy Ganpat',1,0,149.00,'P',42,11),(74,16.67,'Shyamachi Aai',1,0,16.67,'L',43,12),(75,199.00,'Ambulancing On the French Front',1,0,199.00,'P',44,1),(76,99.00,'Romeo and Juliet',1,NULL,49.00,'P',45,5),(77,175.00,'Rowdy Ganpat',1,7,4.00,'R',46,11),(78,299.00,'Ambulancing On the French Front',1,NULL,16.67,'L',47,1),(79,450.00,'Tagore Anthology',1,NULL,16.67,'L',47,3),(80,500.00,'Manav Samaj',1,NULL,16.67,'L',47,4),(81,250.00,'Secrets of Crewe House',1,NULL,199.00,'P',47,6),(82,199.00,'Bhhoot',1,7,5.00,'R',47,9),(83,299.00,'Ambulancing On the French Front',1,NULL,16.67,'L',48,1),(84,450.00,'Tagore Anthology',1,NULL,16.67,'L',48,3),(85,500.00,'Manav Samaj',1,NULL,16.67,'L',48,4),(86,299.00,'Ambulancing On the French Front',1,NULL,16.67,'L',49,1),(87,450.00,'Tagore Anthology',1,NULL,16.67,'L',49,3),(88,500.00,'Manav Samaj',1,NULL,16.67,'L',49,4),(89,199.00,'Meri Europe Yatra',1,NULL,149.00,'P',50,2),(90,399.00,'The Unbecoming of Mara Dyer',1,7,8.00,'R',51,15),(91,299.00,'Ambulancing On the French Front',1,7,5.00,'R',52,1),(92,450.00,'Tagore Anthology',1,NULL,16.67,'L',53,3),(93,180.00,'The Voyage of the Norman D.',1,NULL,16.67,'L',53,7),(94,220.00,'Theodosia Ernest',1,NULL,16.67,'L',53,8),(95,500.00,'Manav Samaj',1,7,8.00,'R',54,4),(96,250.00,'Secrets of Crewe House',1,7,4.00,'R',55,6),(97,149.00,'Baal Goshti',1,7,2.00,'R',55,13),(98,180.00,'The Voyage of the Norman D.',1,7,2.00,'R',55,7),(99,180.00,'The Voyage of the Norman D.',1,7,2.00,'R',56,7),(100,250.00,'Rahee',1,7,6.00,'R',56,10),(101,149.00,'Baal Goshti',1,7,2.00,'R',56,13),(102,16.67,'Shyamachi Aai',1,0,16.67,'L',57,12),(103,16.67,'Mounaat Arth Saare',1,0,16.67,'L',57,16),(104,16.67,'Kalokh',1,0,16.67,'L',57,18),(105,16.67,'Wishtree',1,0,16.67,'L',58,14),(106,16.67,'Shyamachi Aai',1,0,16.67,'L',58,12),(107,16.67,'Mounaat Arth Saare',1,0,16.67,'L',58,16),(108,99.00,'Baal Goshti',1,0,99.00,'P',59,13),(109,5.00,'Ambulancing On the French Front',1,7,35.00,'R',59,1);
/*!40000 ALTER TABLE `invoice_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `language_master`
--

DROP TABLE IF EXISTS `language_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language_master` (
  `language_id` int NOT NULL AUTO_INCREMENT,
  `language_desc` varchar(50) NOT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`language_id`),
  KEY `FKjsk2oy39x5e0lm5mhhongfvoa` (`type_id`),
  CONSTRAINT `FKjsk2oy39x5e0lm5mhhongfvoa` FOREIGN KEY (`type_id`) REFERENCES `product_type_master` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `language_master`
--

LOCK TABLES `language_master` WRITE;
/*!40000 ALTER TABLE `language_master` DISABLE KEYS */;
INSERT INTO `language_master` VALUES (1,'English',1),(2,'Marathi',1),(3,'Hindi',1);
/*!40000 ALTER TABLE `language_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_package`
--

DROP TABLE IF EXISTS `library_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_package` (
  `package_id` int NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `max_selectable_books` int NOT NULL,
  `package_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `validity_days` int NOT NULL,
  PRIMARY KEY (`package_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_package`
--

LOCK TABLES `library_package` WRITE;
/*!40000 ALTER TABLE `library_package` DISABLE KEYS */;
INSERT INTO `library_package` VALUES (1,_binary '',3,'30 Days / 3 Books',50.00,30),(2,_binary '',5,'45 Days / 5 Books',120.00,45),(3,_binary '',10,'90 Days / 10 Books',500.00,90);
/*!40000 ALTER TABLE `library_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_package_product`
--

DROP TABLE IF EXISTS `library_package_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_package_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `package_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7disctodyeme47atpifhd8iq8` (`package_id`),
  KEY `FKmgrgp7mayrepmj35ooppialig` (`product_id`),
  CONSTRAINT `FK7disctodyeme47atpifhd8iq8` FOREIGN KEY (`package_id`) REFERENCES `library_package` (`package_id`),
  CONSTRAINT `FKmgrgp7mayrepmj35ooppialig` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_package_product`
--

LOCK TABLES `library_package_product` WRITE;
/*!40000 ALTER TABLE `library_package_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `library_package_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_shelf`
--

DROP TABLE IF EXISTS `my_shelf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_shelf` (
  `shelf_id` int NOT NULL AUTO_INCREMENT,
  `expiry_date` date DEFAULT NULL,
  `tran_type` char(1) NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`shelf_id`),
  KEY `FKfh26p3kj7hk39mr0jrepq4sqv` (`product_id`),
  CONSTRAINT `FKfh26p3kj7hk39mr0jrepq4sqv` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_shelf`
--

LOCK TABLES `my_shelf` WRITE;
/*!40000 ALTER TABLE `my_shelf` DISABLE KEYS */;
INSERT INTO `my_shelf` VALUES (5,'2026-01-10','R',2,2),(6,'2026-01-10','L',2,1),(7,'2026-01-10','L',2,8),(8,'2026-01-10','L',2,7),(9,'2026-01-10','P',2,17),(12,'2026-01-10','P',3,18),(15,'2026-01-10','P',3,6),(19,'2026-01-10','P',1,1),(20,'2026-01-10','P',1,4),(21,'2026-01-10','P',1,6),(27,'2026-01-10','P',3,12),(28,'2026-01-10','P',3,13),(34,'2026-01-10','P',4,2),(36,'2026-01-10','P',3,1),(46,'2026-01-10','P',5,1),(47,'2026-01-10','P',5,2),(48,'2026-01-10','L',5,4),(49,'2026-01-10','L',5,7),(50,'2026-01-10','P',5,3),(52,'2026-01-10','P',3,2),(55,'2026-02-10','R',3,9),(57,NULL,'P',6,3),(58,NULL,'P',6,2),(59,NULL,'P',6,4),(61,'2026-03-05','L',7,16),(62,NULL,'P',7,14),(63,'2026-03-05','L',7,12),(64,NULL,'P',7,2),(65,'2026-02-10','R',7,1),(66,'2026-02-10','R',7,9),(67,'2026-03-05','L',7,4),(68,NULL,'P',7,15),(73,NULL,'P',6,11),(75,NULL,'P',6,1),(76,NULL,'P',3,5),(77,'2026-02-11','R',3,11),(81,NULL,'P',8,6),(82,'2026-02-11','R',8,9),(89,NULL,'P',8,2),(90,'2026-02-04','R',8,15),(91,'2026-02-11','R',8,1),(93,'2026-03-07','L',3,7),(94,'2026-03-07','L',3,8),(99,'2026-02-12','R',6,7),(100,'2026-02-12','R',6,10),(101,'2026-02-12','R',6,13),(102,'2026-03-07','L',6,12),(103,'2026-03-07','L',6,16),(104,'2026-03-07','L',6,18),(105,'2026-03-07','L',9,14),(106,'2026-03-07','L',9,12),(107,'2026-03-07','L',9,16),(108,NULL,'P',9,13),(109,'2026-02-12','R',9,1);
/*!40000 ALTER TABLE `my_shelf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_attribute`
--

DROP TABLE IF EXISTS `product_attribute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attribute` (
  `prod_att_id` int NOT NULL AUTO_INCREMENT,
  `attribute_value` varchar(255) NOT NULL,
  `attribute_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`prod_att_id`),
  KEY `FKi1ys4wa8e12ujvxihva030iuq` (`attribute_id`),
  KEY `FK7fpmqn73o75lqbsidrck4lun4` (`product_id`),
  CONSTRAINT `FK7fpmqn73o75lqbsidrck4lun4` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`),
  CONSTRAINT `FKi1ys4wa8e12ujvxihva030iuq` FOREIGN KEY (`attribute_id`) REFERENCES `attribute_master` (`attribute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attribute`
--

LOCK TABLES `product_attribute` WRITE;
/*!40000 ALTER TABLE `product_attribute` DISABLE KEYS */;
INSERT INTO `product_attribute` VALUES (1,'PDF',1,1),(2,'PDF',1,2),(3,'PDF',1,3),(4,'PDF',1,4),(5,'PDF',1,5),(6,'PDF',1,6),(7,'PDF',1,7),(8,'PDF',1,8),(9,'PDF',1,9),(10,'PDF',1,10),(11,'PDF',1,11),(12,'PDF',1,12),(13,'MP3',1,13),(14,'MP3',1,14),(15,'MP3',1,15),(16,'MP3',1,16),(17,'MP3',1,17),(18,'MP3',1,18);
/*!40000 ALTER TABLE `product_attribute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_author`
--

DROP TABLE IF EXISTS `product_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_author` (
  `author_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`author_id`,`product_id`),
  KEY `FKhxms6w8e2lipbonp6xrfkxv5i` (`product_id`),
  CONSTRAINT `FK39un5opw2olk56m8kde9fcw3a` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`),
  CONSTRAINT `FKhxms6w8e2lipbonp6xrfkxv5i` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_author`
--

LOCK TABLES `product_author` WRITE;
/*!40000 ALTER TABLE `product_author` DISABLE KEYS */;
INSERT INTO `product_author` VALUES (1,1),(2,2),(3,3),(2,4),(4,5),(10,6),(9,7),(1,8),(6,9),(7,10),(8,11),(5,12),(3,13),(9,14),(10,15),(7,16),(11,17),(6,18);
/*!40000 ALTER TABLE `product_author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ben_master`
--

DROP TABLE IF EXISTS `product_ben_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ben_master` (
  `prod_ben_id` int NOT NULL AUTO_INCREMENT,
  `percentage` decimal(5,2) NOT NULL,
  `ben_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`prod_ben_id`),
  KEY `FK67vjqlpb8evq2d6l7juctel44` (`ben_id`),
  KEY `FKaxr42wc7mtm3lx1whmfdw5usu` (`product_id`),
  CONSTRAINT `FK67vjqlpb8evq2d6l7juctel44` FOREIGN KEY (`ben_id`) REFERENCES `beneficiary_master` (`ben_id`),
  CONSTRAINT `FKaxr42wc7mtm3lx1whmfdw5usu` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ben_master`
--

LOCK TABLES `product_ben_master` WRITE;
/*!40000 ALTER TABLE `product_ben_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_ben_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_master`
--

DROP TABLE IF EXISTS `product_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_master` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `base_price` decimal(10,2) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `is_library` bit(1) DEFAULT NULL,
  `long_desc` text,
  `min_rent_days` int DEFAULT NULL,
  `offer_expiry_date` date DEFAULT NULL,
  `offer_price` decimal(10,2) DEFAULT NULL,
  `product_english_name` varchar(150) DEFAULT NULL,
  `product_name` varchar(150) NOT NULL,
  `rent_per_day` decimal(8,2) DEFAULT NULL,
  `is_rentable` bit(1) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `sp_cost` decimal(10,2) DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  `language_id` int DEFAULT NULL,
  `type_id` int DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `UK_k37wgo5xlxbk7mafqntxvyq6i` (`isbn`),
  KEY `FKceskcho96iufjsecekgohckua` (`genre_id`),
  KEY `FK98ccg011o5dskuffl8qf7o7kk` (`language_id`),
  KEY `FKkqx9yklv6gwn0rx53udabv5bd` (`type_id`),
  KEY `FKhntus6ubujgdfdbuan71pt4ia` (`publisher_id`),
  CONSTRAINT `FK98ccg011o5dskuffl8qf7o7kk` FOREIGN KEY (`language_id`) REFERENCES `language_master` (`language_id`),
  CONSTRAINT `FKceskcho96iufjsecekgohckua` FOREIGN KEY (`genre_id`) REFERENCES `genre_master` (`genre_id`),
  CONSTRAINT `FKhntus6ubujgdfdbuan71pt4ia` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`publisher_id`),
  CONSTRAINT `FKkqx9yklv6gwn0rx53udabv5bd` FOREIGN KEY (`type_id`) REFERENCES `product_type_master` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_master`
--

LOCK TABLES `product_master` WRITE;
/*!40000 ALTER TABLE `product_master` DISABLE KEYS */;
INSERT INTO `product_master` VALUES (1,299.00,'ISBN-001',_binary '','Ambulancing On the French Front is a gripping semi-autobiographical narrative that captures the raw reality of war through the eyes of a young volunteer ambulance driver during World War I. The story explores courage, fear, friendship, and the psychological scars left by relentless conflict. Through vivid battlefield scenes and quiet human moments, the book reflects on the futility of war and the endurance of hope. It is both a historical document and a personal journey, offering readers an emotional and thought-provoking experience that remains timeless in its message about humanity under extreme conditions.',7,'2026-12-31',199.00,'Ambulancing On the French Front','Ambulancing On the French Front',5.00,_binary '','Dystopian classic.',150.00,1,1,1,1),(2,199.00,'ISBN-002',_binary '\0','Meri Europe Yatra is a pioneering Indian travelogue written during the early 20th century, offering rare insights into European society, culture, and politics of the time. The author narrates personal experiences, observations, and reflections gathered while journeying across multiple countries. Beyond sightseeing, the book compares Eastern and Western philosophies, social structures, and lifestyles. It remains an important historical record of how an Indian intellectual viewed Europe during a transformative era, blending curiosity, cultural critique, and deep human understanding.',7,'2026-12-31',149.00,'My Europe Journey','Meri Europe Yatra',3.00,_binary '','Classic travelogue.',100.00,8,3,2,1),(3,450.00,'ISBN-003',_binary '','Tagore Anthology is a carefully curated collection of poems, letters, and philosophical writings by Rabindranath Tagore. It highlights his mastery of language, spirituality, and humanism. Each piece reflects themes of love, devotion, freedom, nature, and universal brotherhood. The anthology offers readers both literary beauty and deep introspection. Whether you are new to Tagore or a long-time admirer, this collection provides a meaningful journey through the thoughts of India?s first Nobel Laureate in Literature.',0,'2026-12-31',350.00,'Tagore Anthology','Tagore Anthology',0.00,_binary '\0','Works of Tagore.',200.00,6,1,1,1),(4,500.00,'ISBN-004',_binary '','Manav Samaj presents a detailed exploration of human civilization, tracing the evolution of societies, cultures, and belief systems. Written with scholarly depth yet accessible narration, the book discusses how humanity progressed from primitive communities to complex modern structures. It examines social values, ethics, traditions, and historical transformations. The author invites readers to reflect on where humanity has come from and where it is headed. This work serves as both a sociological study and a philosophical reflection on mankind?s collective journey.',14,'2026-12-31',399.00,'Human Society','Manav Samaj',8.00,_binary '','Social history.',250.00,8,3,1,1),(5,99.00,'ISBN-005',_binary '','Romeo and Juliet is William Shakespeare?s immortal tragedy of love and fate. Set in Verona, the play tells the story of two young lovers whose families are bitter enemies. Their passionate romance blossoms in secrecy but is doomed by misunderstanding and social conflict. Through poetic language, dramatic tension, and emotional depth, Shakespeare explores themes of love, loyalty, destiny, and sacrifice. This timeless masterpiece continues to captivate readers and audiences with its beauty, tragedy, and enduring relevance.',0,'2026-12-31',49.00,'Romeo and Juliet','Romeo and Juliet',0.00,_binary '\0','Stellar tragedy.',10.00,7,1,1,2),(6,250.00,'ISBN-006',_binary '\0','Secrets of Crewe House is a historical war narrative that unfolds within the walls of a mysterious British estate during World War I. The story reveals how information, propaganda, and intelligence operations influenced the outcome of global conflict. With rich period details and suspenseful storytelling, the book explores hidden truths behind public news and political decisions. It is both a wartime thriller and a historical insight into how secrecy and strategy shaped modern warfare.',7,'2026-12-31',199.00,'Secrets of Crewe House','Secrets of Crewe House',4.00,_binary '','War propaganda.',50.00,5,1,1,2),(7,180.00,'ISBN-007',_binary '','The Voyage of the Norman D. is an adventurous sea-faring tale based on the journal of a young explorer. It captures the excitement, danger, and wonder of traveling across vast oceans during an age of discovery. Storms, foreign lands, and unexpected friendships fill the journey with thrilling experiences. The narrative blends exploration with personal growth, as the protagonist learns courage and resilience. It is a classic maritime adventure that inspires curiosity about the world beyond the horizon.',5,'2026-12-31',120.00,'The Voyage of the Norman D.','The Voyage of the Norman D.',2.00,_binary '','Adventure at sea.',40.00,1,1,1,2),(8,220.00,'ISBN-008',_binary '','Theodosia Ernest is a thought-provoking classic that explores religious beliefs, moral dilemmas, and intellectual debate through rich literary storytelling. Set in an era of philosophical questioning, the book examines faith, doubt, and personal conviction. The characters engage in discussions that challenge societal norms and personal identity. Its elegant prose and reflective tone make it a valuable work for readers who enjoy literature that stimulates both emotional and intellectual exploration.',0,'2026-12-31',150.00,'Theodosia Ernest','Theodosia Ernest',0.00,_binary '\0','Classic literature.',60.00,1,1,1,2),(9,199.00,'ISBN-009',_binary '\0','Bhhoot is a spine-chilling Marathi horror novel filled with eerie atmospheres and supernatural encounters. The story blends local folklore with psychological fear, keeping readers on edge through unexpected twists. Haunted places, restless spirits, and human courage intertwine in a narrative that explores fear beyond the physical world. It is not only a ghost story but also a reflection on belief, superstition, and the unknown forces that shape human imagination.',3,'2026-12-31',149.00,'Ghost','Bhhoot',5.00,_binary '','Marathi Horror.',90.00,2,2,1,1),(10,250.00,'ISBN-010',_binary '','Rahee is a deeply emotional Marathi novel that follows the life journey of a traveler seeking meaning and identity. Along the way, the protagonist encounters love, hardship, self-discovery, and philosophical reflection. The narrative beautifully captures rural landscapes, human relationships, and internal struggles. It is a story about moving forward despite uncertainty, making it both inspirational and introspective for readers who enjoy literature rooted in realism and emotional depth.',7,'2026-12-31',199.00,'The Traveler','Rahee',6.00,_binary '','A journey of life.',120.00,4,2,1,3),(11,175.00,'ISBN-011',_binary '\0','Rowdy Ganpat is a fast-paced Marathi action story filled with humor, drama, and street-smart energy. The protagonist is a rebellious yet lovable character who navigates challenges in society with wit and courage. The narrative balances comedy with gritty action, making it highly entertaining. Beneath the fun lies a subtle message about justice, friendship, and standing up against wrongdoing. It is an engaging read for those who enjoy lively regional storytelling.',5,'2026-12-31',149.00,'Rowdy Ganpat','Rowdy Ganpat',4.00,_binary '','Action packed.',80.00,4,2,1,3),(12,150.00,'ISBN-012',_binary '','Shyamachi Aai is a legendary Marathi classic portraying the pure bond between a mother and her son. Through simple yet powerful storytelling, the book explores love, sacrifice, morality, and emotional strength. The mother?s guidance shapes the child?s values and future. It remains one of Maharashtra?s most cherished literary works, touching generations of readers with its warmth, innocence, and timeless portrayal of parental devotion.',0,'2026-12-31',99.00,'Shyams Mother','Shyamachi Aai',0.00,_binary '\0','Iconic Marathi classic.',50.00,1,2,1,3),(13,149.00,'ISBN-013',_binary '','Baal Goshti is a delightful collection of children?s stories designed to educate and entertain young readers. Each tale carries moral lessons, cultural values, and imaginative adventures. The language is simple yet engaging, making it perfect for early learners. Through animals, children, and magical characters, the stories spark curiosity and creativity. It is an ideal audiobook for family listening and nurturing storytelling traditions.',30,'2026-12-31',99.00,'Childrens Stories','Baal Goshti',2.00,_binary '','Kid tales.',50.00,3,2,2,1),(14,499.00,'ISBN-014',_binary '','Wishtree is a heartwarming fantasy narrated from the perspective of an ancient oak tree that watches generations of humans pass by. The story explores friendship, nature, wishes, and the silent wisdom of trees. Through gentle storytelling, it reminds readers about kindness, hope, and environmental respect. Its unique narrative voice and emotional warmth make it a memorable and uplifting tale for listeners of all ages.',7,'2026-12-31',399.00,'Wishtree','Wishtree',10.00,_binary '','Nature fantasy.',200.00,1,1,2,1),(15,399.00,'ISBN-015',_binary '\0','The Unbecoming of Mara Dyer is a psychological thriller that follows a teenage girl haunted by mysterious events after a tragic accident. Strange powers, shifting realities, and dark secrets unfold as she questions her own sanity. The story combines suspense, romance, and supernatural mystery. With unpredictable twists and emotional tension, it keeps listeners engaged while exploring trauma, identity, and hidden truths.',7,'2026-12-31',299.00,'Mara Dyer','The Unbecoming of Mara Dyer',8.00,_binary '','Psychological thriller.',150.00,4,1,2,1),(16,299.00,'ISBN-016',_binary '','Mounaat Arth Saare is an audio adaptation of a poetic Marathi drama that explores meaning through silence and introspection. The narrative focuses on emotional expression, relationships, and philosophical reflection. Its dramatic dialogues and poetic rhythm create a powerful listening experience. It is ideal for those who appreciate theater, literature, and artistic storytelling that touches the soul rather than relying on action.',0,'2026-12-31',199.00,'Meaning in Silence','Mounaat Arth Saare',0.00,_binary '\0','Deep philosophy.',100.00,4,2,2,1),(17,450.00,'ISBN-017',_binary '\0','The Nowhere Man is an intense action-thriller centered around international intelligence operations and covert missions. The protagonist is a skilled agent drawn into dangerous conspiracies that threaten global stability. With high-speed chases, strategic planning, and unexpected betrayals, the narrative keeps listeners on edge. It explores loyalty, morality, and survival in a world where trust is fragile and danger is constant.',3,'2026-12-31',399.00,'The Nowhere Man','The Nowhere Man',12.00,_binary '','Action thriller.',200.00,4,1,2,1),(18,350.00,'ISBN-018',_binary '','Kalokh is an immersive Marathi horror audiobook designed to be experienced in darkness for maximum effect. The story unfolds through eerie soundscapes, chilling voices, and unsettling events. It blurs the line between imagination and reality, drawing listeners deep into fear and suspense. Inspired by folklore and psychological horror, Kalokh offers a unique audio storytelling experience that lingers long after the final scene.',5,'2026-12-31',249.00,'Darkness','Kalokh',7.00,_binary '','Immersive horror.',150.00,2,2,2,1);
/*!40000 ALTER TABLE `product_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type_master`
--

DROP TABLE IF EXISTS `product_type_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type_master` (
  `type_id` int NOT NULL AUTO_INCREMENT,
  `type_desc` varchar(50) NOT NULL,
  PRIMARY KEY (`type_id`),
  UNIQUE KEY `UK_7ld4johjq47be2uifvdnl4j15` (`type_desc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type_master`
--

LOCK TABLES `product_type_master` WRITE;
/*!40000 ALTER TABLE `product_type_master` DISABLE KEYS */;
INSERT INTO `product_type_master` VALUES (2,'AudioBook'),(1,'EBook'),(3,'Music'),(4,'Video');
/*!40000 ALTER TABLE `product_type_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `publisher_id` int NOT NULL AUTO_INCREMENT,
  `address` text,
  `publisher_email` varchar(255) DEFAULT NULL,
  `publisher_name` varchar(255) NOT NULL,
  `publisher_phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`publisher_id`),
  UNIQUE KEY `UK_r71ni5g7t7grhu0aj3auc2ine` (`publisher_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (1,'Mumbai, India','contact@bookworm.com','Bookworm Heritage Press','1234567890'),(2,'Online Library','info@gutenberg.org','Project Gutenberg','00000000'),(3,'Pune, India','sales@popular.in','Popular Prakashan','22222222');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `royalty_transaction`
--

DROP TABLE IF EXISTS `royalty_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `royalty_transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `base_price` decimal(10,2) DEFAULT NULL,
  `qty` int NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `rent_days` int DEFAULT NULL,
  `rent_end_date` datetime(6) DEFAULT NULL,
  `rent_start_date` datetime(6) DEFAULT NULL,
  `royalty_amount` decimal(10,2) DEFAULT NULL,
  `royalty_percent` decimal(5,2) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `tran_type` char(1) NOT NULL,
  `transaction_date` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  `author_id` int NOT NULL,
  `invoice_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkmroqnyoy5q62bh0nnm2smd98` (`author_id`),
  KEY `FKr571um2jt8g37e6ver313gcxf` (`invoice_id`),
  KEY `FKf84ppsqhpxy5kvny2obx7mbhu` (`product_id`),
  CONSTRAINT `FKf84ppsqhpxy5kvny2obx7mbhu` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`),
  CONSTRAINT `FKkmroqnyoy5q62bh0nnm2smd98` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`),
  CONSTRAINT `FKr571um2jt8g37e6ver313gcxf` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `royalty_transaction`
--

LOCK TABLES `royalty_transaction` WRITE;
/*!40000 ALTER TABLE `royalty_transaction` DISABLE KEYS */;
INSERT INTO `royalty_transaction` VALUES (1,299.00,1,NULL,NULL,NULL,NULL,59.80,20.00,199.00,'P','2026-01-29 12:49:44.000000',1,1,NULL,1),(2,10.00,1,NULL,NULL,NULL,NULL,2.00,20.00,10.00,'L','2026-01-29 12:49:44.000000',1,3,NULL,13),(3,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 07:55:24.563597',2,3,NULL,3),(4,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 07:55:24.643926',2,2,NULL,4),(5,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 07:55:24.700033',2,9,NULL,7),(6,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 07:58:26.713265',2,4,NULL,5),(7,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 08:03:41.810650',2,1,NULL,1),(8,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 08:04:14.091764',2,1,NULL,8),(9,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 08:04:14.132439',2,9,NULL,7),(10,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 10:41:14.101709',3,4,NULL,5),(11,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 10:41:14.167578',3,1,NULL,8),(12,NULL,0,'Auto royalty generated',NULL,NULL,NULL,0.83,5.00,16.67,'L','2026-01-29 10:41:14.188727',3,5,NULL,12),(13,NULL,1,'Auto royalty generated',NULL,NULL,NULL,19.90,10.00,199.00,'P','2026-01-29 11:24:06.653632',3,7,NULL,10),(14,NULL,1,'Auto royalty generated',NULL,NULL,NULL,2.10,5.00,42.00,'R','2026-01-29 11:24:57.986348',3,7,NULL,10),(15,NULL,1,'Auto royalty generated',NULL,NULL,NULL,0.33,2.00,16.67,'L','2026-01-29 11:25:40.618976',3,7,NULL,10),(16,16.67,1,'Royalty for Library Access',30,'2026-02-28 12:14:43.083131','2026-01-29 12:14:43.083131',0.33,2.00,16.67,'L','2026-01-29 12:14:43.083131',3,4,20,5),(17,99.00,1,'Royalty for Purchase',NULL,NULL,NULL,9.90,10.00,99.00,'P','2026-01-29 12:14:43.103802',3,5,20,12),(18,99.00,1,'Royalty for Purchase',NULL,NULL,NULL,9.90,10.00,99.00,'P','2026-01-29 12:14:43.114052',3,3,20,13),(19,16.67,1,'Royalty for Library Access',30,'2026-01-29 17:55:06.794039','2026-01-29 17:55:06.794039',0.33,2.00,16.67,'L','2026-01-29 17:55:06.794039',4,1,21,1),(20,16.67,1,'Royalty for Library Access',30,'2026-02-28 17:55:06.831053','2026-01-29 17:55:06.831053',0.33,2.00,16.67,'L','2026-01-29 17:55:06.831053',4,3,21,3),(21,16.67,1,'Royalty for Library Access',30,'2026-02-28 17:55:06.854451','2026-01-29 17:55:06.854451',0.33,2.00,16.67,'L','2026-01-29 17:55:06.854451',4,2,21,4),(22,3.00,1,'Royalty for Rent',16,'2026-02-14 18:06:04.890577','2026-01-29 18:06:04.890577',2.40,5.00,48.00,'R','2026-01-29 18:06:04.890577',4,2,22,2),(23,99.00,1,'Royalty for Purchase',NULL,NULL,NULL,9.90,10.00,99.00,'P','2026-01-29 18:06:04.903932',4,5,22,12),(24,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-01-29 18:08:21.438558',4,2,23,2),(25,2.00,1,'Royalty for Rent',11,'2026-02-10 04:50:50.980529','2026-01-30 04:50:50.980529',1.10,5.00,22.00,'R','2026-01-30 04:50:50.980529',3,9,24,7),(26,199.00,1,'Royalty for Purchase',NULL,NULL,NULL,19.90,10.00,199.00,'P','2026-01-30 06:12:48.597753',3,1,25,1),(27,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:20:54.255054','2026-01-30 06:20:54.255054',0.33,2.00,16.67,'L','2026-01-30 06:20:54.255054',3,4,26,5),(28,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:20:54.301588','2026-01-30 06:20:54.301588',0.33,2.00,16.67,'L','2026-01-30 06:20:54.301588',3,1,26,8),(29,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:20:54.321981','2026-01-30 06:20:54.321981',0.33,2.00,16.67,'L','2026-01-30 06:20:54.321981',3,7,26,10),(30,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:49:36.827490','2026-01-30 06:49:36.827490',0.33,2.00,16.67,'L','2026-01-30 06:49:36.827490',3,4,27,5),(31,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:49:36.862099','2026-01-30 06:49:36.862099',0.33,2.00,16.67,'L','2026-01-30 06:49:36.862099',3,1,27,8),(32,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:49:36.883612','2026-01-30 06:49:36.883612',0.33,2.00,16.67,'L','2026-01-30 06:49:36.883612',3,7,27,10),(33,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:53:09.194115','2026-01-30 06:53:09.194115',0.33,2.00,16.67,'L','2026-01-30 06:53:09.194115',3,4,28,5),(34,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:53:09.221299','2026-01-30 06:53:09.221299',0.33,2.00,16.67,'L','2026-01-30 06:53:09.221299',3,1,28,8),(35,16.67,1,'Royalty for Library Access',30,'2026-03-01 06:53:09.241181','2026-01-30 06:53:09.241181',0.33,2.00,16.67,'L','2026-01-30 06:53:09.241181',3,7,28,10),(36,199.00,1,'Royalty for Purchase',NULL,NULL,NULL,19.90,10.00,199.00,'P','2026-02-02 03:51:48.870991',5,1,31,1),(37,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-02-02 03:52:46.126446',5,2,32,2),(38,16.67,1,'Royalty for Library Access',30,'2026-03-04 03:54:01.482755','2026-02-02 03:54:01.482755',0.33,2.00,16.67,'L','2026-02-02 03:54:01.482755',5,2,33,4),(39,16.67,1,'Royalty for Library Access',30,'2026-03-04 03:54:01.501926','2026-02-02 03:54:01.501926',0.33,2.00,16.67,'L','2026-02-02 03:54:01.501926',5,9,33,7),(40,350.00,1,'Royalty for Purchase',NULL,NULL,NULL,35.00,10.00,350.00,'P','2026-02-02 03:56:38.218888',5,3,34,3),(41,8.00,1,'Royalty for Rent',15,'2026-02-17 03:59:56.683584','2026-02-02 03:59:56.683584',6.00,5.00,120.00,'R','2026-02-02 03:59:56.683584',3,2,35,4),(42,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-02-02 04:02:37.283172',3,2,36,2),(43,4.00,1,'Royalty for Rent',7,'2026-02-10 04:46:35.003747','2026-02-03 04:46:35.003747',1.40,5.00,28.00,'R','2026-02-03 04:46:35.003747',3,8,37,11),(44,8.00,1,'Royalty for Rent',7,'2026-02-10 05:05:00.354123','2026-02-03 05:05:00.354123',2.80,5.00,56.00,'R','2026-02-03 05:05:00.354123',3,2,38,4),(45,5.00,1,'Royalty for Rent',7,'2026-02-10 05:05:00.385341','2026-02-03 05:05:00.385341',1.75,5.00,35.00,'R','2026-02-03 05:05:00.385341',3,6,38,9),(46,2.00,1,'Royalty for Rent',7,'2026-02-10 05:05:00.399459','2026-02-03 05:05:00.399459',0.70,5.00,14.00,'R','2026-02-03 05:05:00.399459',3,9,38,7),(47,350.00,1,'Royalty for Purchase',NULL,NULL,NULL,35.00,10.00,350.00,'P','2026-02-03 08:22:00.864387',6,3,39,3),(48,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-02-03 08:22:00.924728',6,2,39,2),(49,399.00,1,'Royalty for Purchase',NULL,NULL,NULL,39.90,10.00,399.00,'P','2026-02-03 08:22:00.993799',6,2,39,4),(50,5.00,1,'Royalty for Rent',7,'2026-02-10 10:46:04.504217','2026-02-03 10:46:04.504217',1.75,5.00,35.00,'R','2026-02-03 10:46:04.504217',6,1,40,1),(51,16.67,1,'Royalty for Library Access',30,'2026-03-05 11:26:24.347285','2026-02-03 11:26:24.347285',0.33,2.00,16.67,'L','2026-02-03 11:26:24.347285',7,7,41,16),(52,399.00,1,'Royalty for Purchase',NULL,NULL,NULL,39.90,10.00,399.00,'P','2026-02-03 11:26:24.386026',7,9,41,14),(53,16.67,1,'Royalty for Library Access',30,'2026-03-05 11:26:24.410229','2026-02-03 11:26:24.410229',0.33,2.00,16.67,'L','2026-02-03 11:26:24.410229',7,5,41,12),(54,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-02-03 11:26:24.421760',7,2,41,2),(55,5.00,1,'Royalty for Rent',7,'2026-02-10 11:26:24.426267','2026-02-03 11:26:24.426267',1.75,5.00,35.00,'R','2026-02-03 11:26:24.426267',7,1,41,1),(56,5.00,1,'Royalty for Rent',7,'2026-02-10 11:26:24.434374','2026-02-03 11:26:24.434374',1.75,5.00,35.00,'R','2026-02-03 11:26:24.434374',7,6,41,9),(57,16.67,1,'Royalty for Library Access',30,'2026-03-05 11:26:24.442892','2026-02-03 11:26:24.442892',0.33,2.00,16.67,'L','2026-02-03 11:26:24.442892',7,2,41,4),(58,299.00,1,'Royalty for Purchase',NULL,NULL,NULL,29.90,10.00,299.00,'P','2026-02-03 11:26:24.450440',7,10,41,15),(59,5.00,1,'Royalty for Rent',8,'2026-02-12 06:47:11.489087','2026-02-04 06:47:11.489087',2.00,5.00,40.00,'R','2026-02-04 06:47:11.489087',6,1,42,1),(60,16.67,1,'Royalty for Library Access',30,'2026-03-06 06:47:11.614923','2026-02-04 06:47:11.614923',0.33,2.00,16.67,'L','2026-02-04 06:47:11.614923',6,4,42,5),(61,16.67,1,'Royalty for Library Access',30,'2026-03-06 06:47:11.667018','2026-02-04 06:47:11.667018',0.33,2.00,16.67,'L','2026-02-04 06:47:11.667018',6,9,42,7),(62,6.00,1,'Royalty for Rent',7,'2026-02-11 06:47:11.684098','2026-02-04 06:47:11.684098',2.10,5.00,42.00,'R','2026-02-04 06:47:11.684098',6,7,42,10),(63,149.00,1,'Royalty for Purchase',NULL,NULL,NULL,14.90,10.00,149.00,'P','2026-02-04 06:47:11.700800',6,8,42,11),(64,16.67,1,'Royalty for Library Access',30,'2026-03-06 06:48:04.972724','2026-02-04 06:48:04.972724',0.33,2.00,16.67,'L','2026-02-04 06:48:04.972724',6,5,43,12),(65,199.00,1,'Royalty for Purchase',NULL,NULL,NULL,19.90,10.00,199.00,'P','2026-02-04 06:57:26.903611',6,1,44,1),(66,49.00,1,'Royalty for Purchase',0,NULL,NULL,4.90,10.00,49.00,'P','2026-02-04 15:48:44.165984',3,4,NULL,5),(67,4.00,1,'Royalty for Rent',7,'2026-02-11 15:49:18.700620','2026-02-04 15:49:18.700620',1.40,5.00,28.00,'R','2026-02-04 15:49:18.700620',3,8,NULL,11),(68,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:52:12.039777','2026-02-04 15:52:12.039777',0.33,2.00,16.67,'L','2026-02-04 15:52:12.039777',8,1,NULL,1),(69,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:52:12.080348','2026-02-04 15:52:12.080348',0.33,2.00,16.67,'L','2026-02-04 15:52:12.080348',8,3,NULL,3),(70,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:52:12.099695','2026-02-04 15:52:12.099695',0.33,2.00,16.67,'L','2026-02-04 15:52:12.099695',8,2,NULL,4),(71,199.00,1,'Royalty for Purchase',0,NULL,NULL,19.90,10.00,199.00,'P','2026-02-04 15:52:12.114979',8,10,NULL,6),(72,5.00,1,'Royalty for Rent',7,'2026-02-11 15:52:12.126614','2026-02-04 15:52:12.126614',1.75,5.00,35.00,'R','2026-02-04 15:52:12.126614',8,6,NULL,9),(73,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:57:24.785699','2026-02-04 15:57:24.785699',0.33,2.00,16.67,'L','2026-02-04 15:57:24.785699',8,1,NULL,1),(74,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:57:24.877445','2026-02-04 15:57:24.877445',0.33,2.00,16.67,'L','2026-02-04 15:57:24.877445',8,3,NULL,3),(75,16.67,1,'Royalty for Library Access',29,'2026-03-05 15:57:24.907058','2026-02-04 15:57:24.907058',0.33,2.00,16.67,'L','2026-02-04 15:57:24.907058',8,2,NULL,4),(76,16.67,1,'Royalty for Library Access',29,'2026-03-05 16:00:24.043227','2026-02-04 16:00:24.043227',0.33,2.00,16.67,'L','2026-02-04 16:00:24.043227',8,1,NULL,1),(77,16.67,1,'Royalty for Library Access',29,'2026-03-05 16:00:24.071739','2026-02-04 16:00:24.071739',0.33,2.00,16.67,'L','2026-02-04 16:00:24.071739',8,3,NULL,3),(78,16.67,1,'Royalty for Library Access',29,'2026-03-05 16:00:24.091011','2026-02-04 16:00:24.091011',0.33,2.00,16.67,'L','2026-02-04 16:00:24.091011',8,2,NULL,4),(79,149.00,1,'Royalty for Purchase',0,NULL,NULL,14.90,10.00,149.00,'P','2026-02-04 16:00:53.116239',8,2,NULL,2),(80,8.00,1,'Royalty for Rent',7,'2026-02-11 16:01:34.633570','2026-02-04 16:01:34.633570',2.80,5.00,56.00,'R','2026-02-04 16:01:34.633570',8,10,NULL,15),(81,5.00,1,'Royalty for Rent',7,'2026-02-11 19:35:25.939460','2026-02-04 19:35:25.939460',1.75,5.00,35.00,'R','2026-02-04 19:35:25.939460',8,1,NULL,1),(82,16.67,1,'Royalty for Library Access',29,'2026-03-06 10:06:34.719235','2026-02-05 10:06:34.719235',0.33,2.00,16.67,'L','2026-02-05 10:06:34.719235',3,3,NULL,3),(83,16.67,1,'Royalty for Library Access',29,'2026-03-06 10:06:34.819057','2026-02-05 10:06:34.819057',0.33,2.00,16.67,'L','2026-02-05 10:06:34.819057',3,9,NULL,7),(84,16.67,1,'Royalty for Library Access',29,'2026-03-06 10:06:34.844248','2026-02-05 10:06:34.844248',0.33,2.00,16.67,'L','2026-02-05 10:06:34.844248',3,1,NULL,8),(85,8.00,1,'Royalty for Rent',7,'2026-02-12 11:53:28.415879','2026-02-05 11:53:28.415879',2.80,5.00,56.00,'R','2026-02-05 11:53:28.415879',3,2,NULL,4),(86,4.00,1,'Royalty for Rent',7,'2026-02-12 12:21:05.774437','2026-02-05 12:21:05.774437',1.40,5.00,28.00,'R','2026-02-05 12:21:05.774437',6,10,NULL,6),(87,2.00,1,'Royalty for Rent',7,'2026-02-12 12:21:05.861740','2026-02-05 12:21:05.861740',0.70,5.00,14.00,'R','2026-02-05 12:21:05.861740',6,3,NULL,13),(88,2.00,1,'Royalty for Rent',7,'2026-02-12 12:21:05.889049','2026-02-05 12:21:05.889049',0.70,5.00,14.00,'R','2026-02-05 12:21:05.889049',6,9,NULL,7),(89,2.00,1,'Royalty for Rent',7,'2026-02-12 12:25:04.416512','2026-02-05 12:25:04.416512',0.70,5.00,14.00,'R','2026-02-05 12:25:04.416512',6,9,NULL,7),(90,6.00,1,'Royalty for Rent',7,'2026-02-12 12:25:04.496286','2026-02-05 12:25:04.496286',2.10,5.00,42.00,'R','2026-02-05 12:25:04.496286',6,7,NULL,10),(91,2.00,1,'Royalty for Rent',7,'2026-02-12 12:25:04.519925','2026-02-05 12:25:04.519925',0.70,5.00,14.00,'R','2026-02-05 12:25:04.519925',6,3,NULL,13),(92,16.67,1,'Royalty for Library Access',30,'2026-03-07 11:48:52.106891','2026-02-05 11:48:52.106891',0.33,2.00,16.67,'L','2026-02-05 11:48:52.106891',6,5,57,12),(93,16.67,1,'Royalty for Library Access',30,'2026-03-07 11:48:52.160148','2026-02-05 11:48:52.160148',0.33,2.00,16.67,'L','2026-02-05 11:48:52.160148',6,7,57,16),(94,16.67,1,'Royalty for Library Access',30,'2026-03-07 11:48:52.173561','2026-02-05 11:48:52.173561',0.33,2.00,16.67,'L','2026-02-05 11:48:52.173561',6,6,57,18),(95,16.67,1,'Royalty for Library Access',30,'2026-03-07 14:59:04.927047','2026-02-05 14:59:04.927047',0.33,2.00,16.67,'L','2026-02-05 14:59:04.927047',9,9,58,14),(96,16.67,1,'Royalty for Library Access',30,'2026-03-07 14:59:04.978950','2026-02-05 14:59:04.978950',0.33,2.00,16.67,'L','2026-02-05 14:59:04.978950',9,5,58,12),(97,16.67,1,'Royalty for Library Access',30,'2026-03-07 14:59:05.010242','2026-02-05 14:59:05.010242',0.33,2.00,16.67,'L','2026-02-05 14:59:05.010242',9,7,58,16),(98,99.00,1,'Royalty for Purchase',NULL,NULL,NULL,9.90,10.00,99.00,'P','2026-02-05 14:59:54.129562',9,3,59,13),(99,5.00,1,'Royalty for Rent',7,'2026-02-12 14:59:54.141717','2026-02-05 14:59:54.141717',1.75,5.00,35.00,'R','2026-02-05 14:59:54.141717',9,1,59,1);
/*!40000 ALTER TABLE `royalty_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_master`
--

DROP TABLE IF EXISTS `transaction_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_master` (
  `txn_id` int NOT NULL AUTO_INCREMENT,
  `payment_mode` varchar(20) NOT NULL,
  `txn_amount` decimal(10,2) NOT NULL,
  `txn_date` datetime(6) DEFAULT NULL,
  `txn_status` varchar(20) NOT NULL,
  `txn_type` varchar(1) NOT NULL,
  `user_id` int NOT NULL,
  `invoice_id` int NOT NULL,
  `customer_id` int NOT NULL,
  PRIMARY KEY (`txn_id`),
  KEY `FKlxnx1iy5umggugm6buegd69fc` (`user_id`),
  KEY `FK5s6dp7d0jlh7q37cs3po9eycd` (`invoice_id`),
  CONSTRAINT `FK5s6dp7d0jlh7q37cs3po9eycd` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`invoice_id`),
  CONSTRAINT `FKlxnx1iy5umggugm6buegd69fc` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_master`
--

LOCK TABLES `transaction_master` WRITE;
/*!40000 ALTER TABLE `transaction_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_library_book`
--

DROP TABLE IF EXISTS `user_library_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_library_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expiry_date` date NOT NULL,
  `selected_date` date NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `subscription_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqcvl9t68ji4q0arfhdeeqj7qx` (`user_id`),
  KEY `FK1wkf2pinxlqttubyvau66rsyc` (`product_id`),
  KEY `FK2ecwhqs48lavf9h411d5d26rr` (`subscription_id`),
  CONSTRAINT `FK1wkf2pinxlqttubyvau66rsyc` FOREIGN KEY (`product_id`) REFERENCES `product_master` (`product_id`),
  CONSTRAINT `FK2ecwhqs48lavf9h411d5d26rr` FOREIGN KEY (`subscription_id`) REFERENCES `user_library_subscription` (`id`),
  CONSTRAINT `FKqcvl9t68ji4q0arfhdeeqj7qx` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_library_book`
--

LOCK TABLES `user_library_book` WRITE;
/*!40000 ALTER TABLE `user_library_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_library_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_library_subscription`
--

DROP TABLE IF EXISTS `user_library_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_library_subscription` (
  `id` int NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `books_selected_count` int NOT NULL,
  `end_date` date NOT NULL,
  `start_date` date NOT NULL,
  `user_id` int NOT NULL,
  `package_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKlv1cngshbduljtevwmctkt59r` (`user_id`),
  KEY `FKbjm7avtwobrl2mkktdpp9rqhl` (`package_id`),
  CONSTRAINT `FKbjm7avtwobrl2mkktdpp9rqhl` FOREIGN KEY (`package_id`) REFERENCES `library_package` (`package_id`),
  CONSTRAINT `FKlv1cngshbduljtevwmctkt59r` FOREIGN KEY (`user_id`) REFERENCES `customer` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_library_subscription`
--

LOCK TABLES `user_library_subscription` WRITE;
/*!40000 ALTER TABLE `user_library_subscription` DISABLE KEYS */;
INSERT INTO `user_library_subscription` VALUES (2,_binary '',3,'2026-02-28','2026-01-29',2,1),(13,_binary '',2,'2026-03-04','2026-02-02',5,1),(15,_binary '',3,'2026-03-05','2026-02-03',7,1),(16,_binary '\0',3,'2026-02-03','2026-02-04',6,1),(17,_binary '\0',3,'2026-03-06','2026-02-04',8,1),(18,_binary '\0',3,'2026-03-06','2026-02-04',8,1),(19,_binary '\0',3,'2026-03-06','2026-02-04',8,1),(20,_binary '',1,'2026-03-07','2026-02-05',3,1),(22,_binary '',3,'2026-03-07','2026-02-05',6,1),(23,_binary '',3,'2026-03-07','2026-02-05',9,1);
/*!40000 ALTER TABLE `user_library_subscription` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-06 17:43:18
