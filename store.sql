-- MySQL dump 10.13  Distrib 5.7.25, for Linux (x86_64)
--
-- Host: localhost    Database: store
-- ------------------------------------------------------
-- Server version	5.7.25-0ubuntu0.18.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Admin One','adminone@mail.com','$2b$10$t3u3mRXsdzl.zk.8MPh4zu2t4tItcUa0Dzj2.g8./G9z.aJviOTzS',NULL,'2019-02-21 04:58:18','2019-02-01 17:59:43'),(2,'Admin One','adminone@mail.com','$2b$10$6AhvRFHfDtBDRzvMx3TkceW/uoLbJly8rBnq.ndZUxT6rawHLBU.6',NULL,'2019-02-21 04:58:18','2019-02-03 02:26:36');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Category Two',NULL,NULL,'2019-02-21 04:58:18',NULL),(3,'Category Three',NULL,NULL,'2019-02-21 04:58:18',NULL),(4,'Category Four',NULL,NULL,'2019-02-21 04:58:18',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `township_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` float NOT NULL,
  `sub_total` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,8,6,695854,4175120,'2019-02-21 04:58:20',NULL,'2019-02-16 10:51:11'),(2,2,7,4,5990,23960,'2019-02-21 04:58:20',NULL,'2019-02-16 10:51:11'),(3,2,3,2,1300,2600,'2019-02-21 04:58:20',NULL,'2019-02-16 10:51:11'),(4,3,8,6,695854,4175120,'2019-02-21 04:58:20',NULL,'2019-02-17 08:53:02'),(5,3,7,4,5990,23960,'2019-02-21 04:58:20',NULL,'2019-02-17 08:53:02'),(6,3,3,2,1300,2600,'2019-02-21 04:58:20',NULL,'2019-02-17 08:53:03'),(7,4,6,3,699,2097,'2019-02-21 07:06:39',NULL,'2019-02-21 07:06:39'),(8,5,7,13,5990,77870,'2019-02-21 07:46:12',NULL,'2019-02-21 07:46:12'),(9,6,7,13,5990,77870,'2019-02-21 07:59:32',NULL,'2019-02-21 07:59:32'),(10,7,7,13,5990,77870,'2019-02-21 08:00:23',NULL,'2019-02-21 08:00:23'),(11,8,9,3,1200,3600,'2019-02-21 08:54:45',NULL,'2019-02-21 08:54:45');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `total_amount` float NOT NULL,
  `discount` float DEFAULT NULL,
  `payment_method` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,1,4201680,NULL,1,NULL,'2019-02-21 04:58:19','2019-02-16 10:51:10'),(3,1,4201680,NULL,1,NULL,'2019-02-21 04:58:19','2019-02-17 08:53:02'),(4,1,2097,NULL,1,NULL,'2019-02-21 07:06:39','2019-02-21 07:06:39'),(5,1,77870,NULL,1,NULL,'2019-02-21 07:46:12','2019-02-21 07:46:12'),(6,1,77870,NULL,2,NULL,'2019-02-21 07:59:32','2019-02-21 07:59:32'),(7,1,77870,NULL,2,NULL,'2019-02-21 08:00:23','2019-02-21 08:00:23'),(8,1,3600,NULL,1,NULL,'2019-02-21 08:54:45','2019-02-21 08:54:45');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Product One Edit Two',2,'62d3358b64d163aa19962b5ef3a8d790','Product one description . Edit to two',120012,NULL,'2019-02-21 04:58:20','2019-01-29 15:02:43'),(3,'Product Three',2,'41d74c0e3870628e408a59c047f0c6f9','Product three description',1300,NULL,'2019-02-21 04:58:20','2019-01-29 15:11:46'),(4,'Product Four',4,'f558db81146e33b25dece05d4256e377','Product Four Description',1400,NULL,'2019-02-21 04:58:20','2019-01-29 15:27:29'),(5,'Product Test One',3,'e0caf5bbbb57538f1ec3e9858bf7f5eb','Good Test One',1500,NULL,'2019-02-21 04:58:20','2019-02-01 18:51:19'),(6,'Pagination test Two',4,'53198505ed8ac4cb698dbe11a1b41566','Good Pagination test two',699,NULL,'2019-02-21 04:58:20','2019-02-01 18:53:13'),(7,'Pagination test Three',3,'fd29ed2c27945dfefe2f4676ce29a003','Good Test three',5990,NULL,'2019-02-21 04:58:20','2019-02-01 18:53:52'),(8,'Pg Test Four',3,'628672ba75ac3e2a72214e8b3b298388','Pg test Description',695854,NULL,'2019-02-21 04:58:20','2019-02-01 18:58:59'),(9,'Note Book',3,'a197cfc5b9782219a698961bb51fbc5d','Very Good',1200,NULL,'2019-02-21 07:09:44','2019-02-21 07:09:44'),(10,'Goods One',2,'8fa44ec2768d6fc4a8d96a3da0561d01','Goods',400,NULL,'2019-02-21 08:55:35','2019-02-21 08:55:35');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `townships`
--

DROP TABLE IF EXISTS `townships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `townships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `townships`
--

LOCK TABLES `townships` WRITE;
/*!40000 ALTER TABLE `townships` DISABLE KEYS */;
INSERT INTO `townships` VALUES (2,'Township One',NULL,'2019-02-21 04:58:20','2019-02-01 16:00:44'),(3,'Township Two',NULL,'2019-02-21 04:58:20','2019-02-01 16:12:24'),(4,'Township Three',NULL,'2019-02-21 04:58:20','2019-02-01 16:12:44');
/*!40000 ALTER TABLE `townships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` longtext COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ra Wai','123123','rawaikyaw@gmail.com','$2b$10$5ln8YysDzeAx50fCoa0PzeaJjZ4m8lyWQ12XE4n5JEs1zYKXWBT3W','Hpa-an, Kayin , Myanmar',NULL,NULL,'2019-03-01 06:59:04','2019-03-01 06:59:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-01 17:07:58
