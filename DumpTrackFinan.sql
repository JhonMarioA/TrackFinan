-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: trackfinan_db
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `account_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `account_type` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (2,1,1,'Cash Account',1200000.00,'2026-04-01 04:16:03'),(4,1,2,'Bank Account',0.00,'2026-04-01 05:00:39'),(5,2,2,'Bancolombia',500000.00,'2026-04-13 01:57:04'),(6,5,2,'Banco Principal',273.00,'2026-04-26 03:16:46'),(7,5,1,'Efectivo',-20.00,'2026-04-26 03:17:01'),(8,6,2,'Banco Principal',-3496910.00,'2026-04-27 04:18:25'),(9,6,1,'Efectivo',-650.00,'2026-04-27 04:18:25');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES (2,'bank'),(1,'cash'),(3,'credit_card');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `budget`
--

DROP TABLE IF EXISTS `budget`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `budget` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `month` tinyint NOT NULL,
  `year` smallint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_2` (`user_id`,`category_id`,`month`,`year`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `budget_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `budget_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `budget_chk_1` CHECK ((`month` between 1 and 12)),
  CONSTRAINT `budget_chk_2` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `budget`
--

LOCK TABLES `budget` WRITE;
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;
INSERT INTO `budget` VALUES (1,1,1,1000000.00,4,2026,'2026-04-01 23:19:23'),(2,5,6,4.00,4,2026,'2026-04-26 03:30:12'),(3,5,9,60.00,4,2026,'2026-04-26 03:30:56'),(4,5,7,60.00,4,2026,'2026-04-26 03:31:33'),(5,5,8,40.00,4,2026,'2026-04-26 03:32:19'),(6,6,12,800.00,4,2026,'2026-04-27 04:38:02'),(7,6,13,500.00,4,2026,'2026-04-27 04:38:25'),(8,6,14,400.00,4,2026,'2026-04-27 04:38:53'),(9,6,15,300.00,4,2026,'2026-04-27 04:39:15');
/*!40000 ALTER TABLE `budget` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `transaction_type_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_2` (`user_id`,`name`),
  KEY `user_id` (`user_id`),
  KEY `transaction_type_id` (`transaction_type_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `category_ibfk_2` FOREIGN KEY (`transaction_type_id`) REFERENCES `transaction_type` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,1,'Services',2),(3,1,'Profits',1),(4,2,'Trabajos personales',1),(5,2,'Comida',2),(6,5,'Comida',2),(7,5,'Transporte',2),(8,5,'Ocio',2),(9,5,'Servicios',2),(10,5,'Salario',1),(11,5,'Freelance',1),(12,6,'Comida',2),(13,6,'Transporte',2),(14,6,'Ocio',2),(15,6,'Servicios',2),(16,6,'Salario',1),(17,6,'Freelance',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`name`),
  CONSTRAINT `payment_method_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method`
--

LOCK TABLES `payment_method` WRITE;
/*!40000 ALTER TABLE `payment_method` DISABLE KEYS */;
INSERT INTO `payment_method` VALUES (1,1,'card'),(4,2,'App'),(5,5,'Efectivo'),(7,5,'Tarjeta Crédito'),(6,5,'Tarjeta Débito'),(8,6,'Efectivo'),(10,6,'Tarjeta Crédito'),(11,6,'Tarjeta Crédito NU'),(9,6,'Tarjeta Débito');
/*!40000 ALTER TABLE `payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction_type`
--

DROP TABLE IF EXISTS `transaction_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction_type`
--

LOCK TABLES `transaction_type` WRITE;
/*!40000 ALTER TABLE `transaction_type` DISABLE KEYS */;
INSERT INTO `transaction_type` VALUES (2,'expense'),(1,'income');
/*!40000 ALTER TABLE `transaction_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `category_id` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `category_id` (`category_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `transactions_ibfk_3` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `transactions_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (2,2,3,1,1200000.00,'Salary','2026-04-01 18:03:12'),(3,5,4,4,1000000.00,'Trabajo PR','2026-04-13 01:59:24'),(4,5,5,4,500000.00,'Alimentación mensual','2026-04-13 02:00:42'),(5,6,10,7,300.00,'Salario Abril','2026-04-26 03:26:08'),(6,6,11,7,100.00,'Proyecto Freelance','2026-04-26 03:26:44'),(7,6,6,5,5.00,'Almuerzo','2026-04-26 03:27:51'),(8,6,7,7,50.00,'Gasolina','2026-04-26 03:28:33'),(9,6,6,7,30.00,'Play 5','2026-04-26 03:29:02'),(10,6,6,7,10.00,'Salchipapa','2026-04-26 03:52:39'),(12,6,6,5,12.00,'Otra salchipapa','2026-04-26 03:55:26'),(13,7,6,5,20.00,'Otra salchipapa','2026-04-26 04:07:02'),(14,6,6,5,20.00,'Empanadas','2026-04-26 04:13:44'),(15,8,16,10,3000.00,'Salario Abril','2026-04-27 04:31:31'),(16,8,17,10,800.00,'Proyecto Freelance','2026-04-27 04:32:05'),(17,9,12,8,150.00,'Almuerzo','2026-04-27 04:33:23'),(18,8,12,10,200.00,'Supermercado','2026-04-27 04:34:04'),(19,9,13,8,100.00,'Bus','2026-04-27 04:34:37'),(20,8,14,10,120.00,'Cine','2026-04-27 04:34:52'),(21,8,15,10,120.00,'Luz','2026-04-27 04:35:56'),(22,8,12,10,180.00,'Cena','2026-04-27 04:36:21'),(23,9,12,8,400.00,'Empanadas con ají','2026-04-27 04:36:45'),(24,8,14,10,90.00,'Salida con amigos','2026-04-27 04:37:30'),(25,8,14,10,3500000.00,'Cumpleaños','2026-04-27 14:48:28');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John Doe','admin@test','$2b$10$lvOnoiHLI3imvkvTIGR5TeNgI4hvfdxayKbBicCF8KMg1lsRi8RIi','2026-03-31 21:20:56'),(2,'Mark','mark1@gmail.com','$2b$10$cjGjyZ8g04T0lgtNcJC8MuIzeHbGnSJ2IQsrFP2dTqWQQeA4gjd/.','2026-04-12 20:56:08'),(3,'Jombi','jhon@gmail.com','$2b$10$m7/.OyLbYUh5efyTb.y33ue7jNBobruF/YwdDiK2LmW1JqBZ7pvoi','2026-04-23 20:43:43'),(4,'Crisitano Ronaldo','cris@utp.edu.co','$2b$10$m6t5Jdbge6gk2Axms5yy0ucfRl9lSgIqpiYTVmrdLeNNTIP40.Y4K','2026-04-23 21:22:58'),(5,'Valderrama','test@gmail.com','$2b$10$9QL5GC0MbC8ozaTUPm79t.M36ha/vI1X1tLg3KaZniS8/Ys2CIC4K','2026-04-25 22:12:01'),(6,'Demo User','demo@test.com','$2b$10$1uyOrX7mn4ja9oMI1m735eZHkUi16FbltbbxnIzGDTQ6RW5vkHW3O','2026-04-26 23:15:16');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-03 19:06:30
